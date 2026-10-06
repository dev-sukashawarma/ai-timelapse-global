import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

// Helper: convert base64 data URL to inline image part for Gemini
const base64ToImagePart = (dataUrl) => {
  const [header, data] = dataUrl.split(',');
  const match = header?.match(/:(.*?);/);
  if (!match) throw new Error('Invalid image format or not a valid data URL.');
  const mimeType = match[1];
  return { inlineData: { data, mimeType } };
};

// Initialize the API dynamically based on localStorage key
const getGenAI = () => {
  if (typeof window === 'undefined') return null;
  const apiKey = localStorage.getItem('GEMINI_API_KEY');
  if (!apiKey) throw new Error("API Key not found. Please set your Gemini API key.");
  return new GoogleGenerativeAI(apiKey);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isTransientError = (msg) => {
  return msg.includes('503') || msg.includes('high demand') || msg.includes('overloaded') || msg.includes('UNAVAILABLE');
};

// Helper: Intercept and translate Gemini API errors
const handleGeminiError = (error, language = 'en') => {
  const msg = error?.message || "";

  if (msg.startsWith("All available")) {
    throw error;
  }

  if (msg.includes('429') || msg.includes('Quota exceeded') || msg.includes('RESOURCE_EXHAUSTED')) {
    if (msg.includes('free_tier') || msg.includes('Free Tier')) {
      throw new Error("Free Tier quota limit reached on your Gemini API key (HTTP 429). Google AI Studio limits requests per minute. Please wait ~60 seconds before trying again, or use a paid API key.");
    } else {
      throw new Error("Rate limit or quota reached (HTTP 429). Google AI Studio allows limited requests per minute on free keys. Please wait 30-60 seconds and try again.");
    }
  }

  if (msg.includes('503') || msg.includes('high demand') || msg.includes('overloaded') || msg.includes('UNAVAILABLE')) {
    throw new Error("Google Gemini servers are temporarily experiencing high demand (HTTP 503). Please retry in a few seconds.");
  }

  if (msg.includes('API_KEY_INVALID') || msg.includes('INVALID_ARGUMENT') || msg.includes('API key not valid')) {
    throw new Error("Invalid Gemini API Key. Please verify you copied the complete key correctly from Google AI Studio without extra spaces.");
  }

  if (msg.includes('SAFETY') || msg.includes('blocked') || msg.includes('candidate was blocked')) {
    throw new Error("The prompt was blocked by Google AI content safety filters. Please adjust the description or reference image.");
  }

  throw error;
};

// Helper: JSON string repair in case of LLM response truncation
const repairJson = (jsonString) => {
  let cleaned = jsonString.trim();
  
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  
  cleaned = cleaned.trim();
  
  let inString = false;
  let isEscaped = false;
  const stack = [];
  
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    
    if (isEscaped) {
      isEscaped = false;
      continue;
    }
    
    if (char === '\\') {
      isEscaped = true;
      continue;
    }
    
    if (char === '"') {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '{' || char === '[') {
        stack.push(char);
      } else if (char === '}') {
        if (stack.length > 0 && stack[stack.length - 1] === '{') {
          stack.pop();
        }
      } else if (char === ']') {
        if (stack.length > 0 && stack[stack.length - 1] === '[') {
          stack.pop();
        }
      }
    }
  }
  
  let repaired = cleaned;
  
  if (inString) {
    if (repaired.endsWith('\\')) {
      repaired = repaired.slice(0, -1);
    }
    repaired += '"';
  }
  
  while (stack.length > 0) {
    const lastOpen = stack.pop();
    if (lastOpen === '{') {
      repaired = repaired.trim();
      if (repaired.endsWith(',')) {
        repaired = repaired.slice(0, -1);
      }
      repaired += '}';
    } else if (lastOpen === '[') {
      repaired = repaired.trim();
      if (repaired.endsWith(',')) {
        repaired = repaired.slice(0, -1);
      }
      repaired += ']';
    }
  }
  
  return repaired;
};

// Helper: robust JSON parser with automatic extraction and repair fallback
const parseWithRepair = (text) => {
  let cleaned = text.trim();
  
  // Strip code block fences with any trailing text
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```[\s\S]*$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```[\s\S]*$/, "");
  }
  cleaned = cleaned.trim();

  // 1. Try direct parse
  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    // 2. Extract outermost JSON structure if there is text before or after
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');

    let startIdx = -1;
    let isObject = true;
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startIdx = firstBrace;
      isObject = true;
    } else if (firstBracket !== -1) {
      startIdx = firstBracket;
      isObject = false;
    }

    if (startIdx !== -1) {
      const lastChar = isObject ? '}' : ']';
      const lastIdx = cleaned.lastIndexOf(lastChar);
      if (lastIdx > startIdx) {
        const extracted = cleaned.substring(startIdx, lastIdx + 1);
        try {
          return JSON.parse(extracted);
        } catch {
          try {
            return JSON.parse(repairJson(extracted));
          } catch {
            // continue to whole text repair
          }
        }
      }
    }

    // 3. Fallback: repair on cleaned text
    try {
      const repaired = repairJson(cleaned);
      return JSON.parse(repaired);
    } catch (eFinal) {
      console.error("[JSON] All repair attempts failed:", eFinal.message);
      throw e1;
    }
  }
};

const isAuthError = (err) => {
  const m = err.message || '';
  return m.includes('API_KEY_INVALID') || m.includes('INVALID_ARGUMENT');
};

export const UNIVERSAL_NEGATIVE_PROMPT = 
  "blurry, out of focus, abrupt jump cuts, morphing, asset popping, camera jitter, shaky tripod, distorted architecture, melting concrete, deformed perspective, oversaturated colors, flickering sunlight, ghosting artifacts, low resolution, unnatural teleportation of objects";

// Ordered model fallback chain prioritizing active models recommended by Google API
const FALLBACK_CHAIN = [
  'gemini-2.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro-preview',
  'gemini-2.5-flash',
];

const executeWithFallback = async (primaryModel, prompt, language = 'en') => {
  const genAI = getGenAI();
  const chain = [primaryModel, ...FALLBACK_CHAIN.filter(m => m !== primaryModel)];

  let quotaError;
  const attemptErrors = [];

  for (const modelName of chain) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: "application/json" },
          safetySettings,
        });
        const result = await model.generateContent(prompt);
        if (modelName !== primaryModel) {
          console.info(`[API] Success with fallback model: ${modelName}`);
        }
        return parseWithRepair(result.response.text());
      } catch (error) {
        if (isAuthError(error)) handleGeminiError(error, language);
        const msg = error.message || '';

        // If 503 high demand on first attempt, pause 1.2s and retry once before skipping model
        if (attempt === 1 && isTransientError(msg)) {
          console.warn(`[API] Model ${modelName} returned 503 (high demand). Retrying once in 1200ms...`);
          await sleep(1200);
          continue;
        }

        attemptErrors.push(`• ${modelName}: ${msg}`);
        if (msg.includes('429') || msg.includes('Quota') || msg.includes('RESOURCE_EXHAUSTED')) {
          quotaError = error;
        }
        console.warn(`[API] Model ${modelName} failed:`, error.message);
        break;
      }
    }
  }

  if (quotaError) {
    handleGeminiError(quotaError, language);
  }

  const detailedErr = new Error(
    `All available Gemini models failed.\n\nAttempts:\n${attemptErrors.join('\n')}`
  );
  handleGeminiError(detailedErr, language);
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE ANALYSIS — Gemini Vision (Multimodal)
// ─────────────────────────────────────────────────────────────────────────────
export const analyzeImageForTimelapse = async (
  imageDataUrl, 
  userHint = '', 
  imagePosition = 'end', 
  frameIndex = null, 
  totalFrames = 2,
  language = 'id'
) => {
  const genAI = getGenAI();
  const isEn = language === 'en';

  const isMid = imagePosition === 'middle';
  const isStart = imagePosition === 'start';
  const frameLabel = frameIndex 
    ? (isEn ? `Frame ${frameIndex} of ${totalFrames}` : `Frame ${frameIndex} dari ${totalFrames}`)
    : (isStart ? (isEn ? 'First Frame' : 'Frame Pertama') : (isEn ? 'Final Frame' : 'Frame Terakhir'));

  const directionInstruction = isMid
    ? `that have this exact image as FRAME ${frameIndex} (middle keyframe) out of ${totalFrames} total frames. AI will generate progressive scenes BOTH before (frames 1-${frameIndex-1}) AND after (frames ${frameIndex+1}-${totalFrames}) this reference.`
    : isStart
    ? 'that START with this exact image as the initial baseline frame.'
    : 'that END with this exact image as the completed final milestone frame.';

  const langInstruction = isEn
    ? "in English, engaging, cinematic and crisp"
    : "in Indonesian, engaging, cinematic, and easy to understand";

  const textPrompt = `You are a world-class Google Veo 3 / Sora timelapse cinematographer and AI director.

Analyze this uploaded reference image with microscopic attention to architectural geometry, lighting, materials, and context:

${userHint ? `User's extra context/intent: "${userHint}"` : ''}

This image represents ${frameLabel} in a ${totalFrames}-frame timelapse sequence.
Generate exactly 3 distinct, cinematic narrative arcs ${directionInstruction}

For EACH narrative arc provide:
- title: Short cinematic title ${langInstruction} (max 5 words)
- description: 1 vivid sentence ${langInstruction} describing the complete start-to-finish transformation
- category: One of: "Construction", "Nature Growth", "Urban Evolution", "Human Story", "Decay & Renewal", "Industrial"
- emoji: Single most relevant emoji
- detectedSubject: Precise identification ${langInstruction} of the main object/building in the photo
- suggestedStart: Vivid starting condition ${langInstruction} (e.g. ${isEn ? '"muddy excavated foundation with rebars"' : '"tanah galian merah dengan tulangan besi"'})
- suggestedEnd: Vivid ending condition ${langInstruction} (e.g. ${isEn ? '"gleaming finished building in golden hour"' : '"bangunan megah selesai di bawah cahaya sore"'})
- visualDescriptor: A detailed comma-separated technical string of visible attributes to preserve: architectural style, facade textures, material finishes, color palette, window configurations, surroundings, and illumination.

Respond ONLY with valid JSON:
[
  { 
    "title": "...", 
    "description": "...", 
    "category": "...", 
    "emoji": "...", 
    "detectedSubject": "...", 
    "suggestedStart": "...", 
    "suggestedEnd": "...", 
    "visualDescriptor": "..." 
  }
]`;

  const imagePart = base64ToImagePart(imageDataUrl);
  const visionChain = [
    'gemini-2.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
    'gemini-2.5-flash',
  ];
  let quotaErr;
  const attemptErrors = [];
  
  for (const modelName of visionChain) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: 'application/json' },
          safetySettings,
        });
        const result = await model.generateContent([textPrompt, imagePart]);
        return parseWithRepair(result.response.text());
      } catch (err) {
        if (isAuthError(err)) handleGeminiError(err, language);
        const msg = err.message || '';

        // If 503 high demand on first attempt, pause 1.2s and retry once before skipping model
        if (attempt === 1 && isTransientError(msg)) {
          console.warn(`[Vision] Model ${modelName} returned 503 (high demand). Retrying once in 1200ms...`);
          await sleep(1200);
          continue;
        }

        attemptErrors.push(`• ${modelName}: ${msg}`);
        if (msg.includes('429') || msg.includes('Quota') || msg.includes('RESOURCE_EXHAUSTED')) {
          quotaErr = err;
        }
        console.warn(`[Vision] ${modelName} failed:`, err.message);
        break;
      }
    }
  }

  if (quotaErr) {
    handleGeminiError(quotaErr, language);
  }

  const detailedErr = new Error(
    `All available vision models failed.\n\nAttempts:\n${attemptErrors.join('\n')}`
  );
  handleGeminiError(detailedErr, language);
};

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE-ANCHORED TIMELAPSE GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
export const generateImageTimelapsePrompts = async (
  imageDataUrl, 
  scene, 
  parameters = {}, 
  sequenceCount = 1, 
  cameraMotion = 'static', 
  imagePosition = 'end', 
  referenceFrameNum = null, 
  imageHint = '',
  language = 'id'
) => {
  const genAI = getGenAI();
  const aspectRatio = parameters.aspectRatio || '16:9';
  const resolution = parameters.resolution || '8K UHD';
  const stylePreset = parameters.style || 'Ultra-Photorealistic 8K, Masterpiece Lighting';
  const totalFrames = sequenceCount + 1;
  const isEn = language === 'en';

  const refFrame = referenceFrameNum ?? (imagePosition === 'start' ? 1 : totalFrames);
  const isMid = imagePosition === 'middle';
  const isStart = imagePosition === 'start';

  const visualDescriptor = scene.visualDescriptor || scene.description || '';
  const startBoundary = scene.suggestedStart || 'unexcavated ground with survey stakes';
  const endBoundary = scene.suggestedEnd || 'fully realized architectural masterpiece';

  const cameraDesc = cameraMotion === 'static'
    ? 'ROCK-SOLID LOCKED-OFF TRIPOD: Absolute zero panning, zero tilt, zero push-in, zero optical zoom change. Fixed focal length (35mm Cooke anamorphic prime), locked camera base bolted to concrete foundation. Every frame shares the identical camera angle.'
    : 'SLOW CINEMATIC PUSH-IN: A smooth, millimeter-level continuous push-in forward along the central optical axis, moving forward at an imperceptible 1% scale per keyframe.';

  const textPrompt = `You are an elite Google Veo 3 and Google Imagen 3 director specializing in hyper-realistic, artifact-free timelapse production.

REFERENCE IMAGE ATTACHED:
This photo represents FRAME ${refFrame} of ${totalFrames} total frames.
${isMid ? `Create what came BEFORE (Frames 1-${refFrame-1}) AND what happens AFTER (Frames ${refFrame+1}-${totalFrames}).` : ''}
${isStart ? `Create the transformation starting from Frame 1 (this photo) progressing to the end state.` : ''}
${!isMid && !isStart ? `Create the chronological journey leading up to this photo as the final completed Frame ${totalFrames}.` : ''}

PROJECT PARAMETERS:
- Title: "${scene.title}"
- Story: ${scene.description}
- Aspect Ratio: ${aspectRatio}
- Visual Style Preset: ${stylePreset}
- Total Keyframes: ${totalFrames} (Requiring ${sequenceCount} transition video prompts)
- Camera Rig: ${cameraDesc}
${imageHint ? `- User Notes: "${imageHint}"` : ''}

═══════════════════════════════════════════════════════════
PART A: ${totalFrames} KEYFRAME IMAGE PROMPTS (For Google Imagen 3 / Nano Banana / FLUX)
═══════════════════════════════════════════════════════════
Write each keyframe prompt in rich, technical cinematic English using the professional 8-layer architecture:
1. Subject & Structural State (chronological physical progress at this exact frame)
2. Spatial Context & Environment (fixed street, trees, horizon, background buildings)
3. Textures & Materials (wet concrete, raw timber, rebar, glass reflections, dust, surface grit)
4. Optical Camera Specs (ARRI Alexa 65, 35mm f/8 Cooke Anamorphic lens, ultra-sharp focus across entire plane, photorealistic depth)
5. Lighting Physics (5200K natural sunlight, directional cast shadows, realistic sky bounce, volumetric sunbeams)
6. Color Grading (Kodak 5219 film profile, balanced dynamic range, cinematic contrast)
7. Consistency Lock (Strictly freeze background landmarks, neighboring buildings, mountains, curbs across all frames)
8. Frame ${refFrame} Identity Anchor: For Frame ${refFrame}, preserve every architectural element from the reference photo.

═══════════════════════════════════════════════════════════
PART B: ${sequenceCount} VEO 3 VIDEO TRANSITION PROMPTS (SEAMLESS ANTI-JUMP TIMELAPSE)
═══════════════════════════════════════════════════════════
Write each transition prompt in English as a single dense paragraph detailing:
- [OPENING STATE]: Exact physical baseline of Frame N
- [MATERIAL ACCUMULATION]: Explicit physical assembly verbs ("concrete pumped continuously", "rebar ties placed one by one", "masonry layers rise course by course"). NO morphing, NO sudden pop-ins.
- [TIMELAPSE TEMPORAL COMPRESSION]: "Timelapse temporal acceleration, sun sweeps smoothly across the sky in unbroken arcs, shadows stretch and contract dynamically, passing clouds drift swiftly".
- [INTERMEDIATE 50% WAYPOINT]: Explicitly specify the half-way appearance to guarantee zero flickering or teleportation.
- [CLOSING STATE]: Precise visual state matching Frame N+1 opening.
- [CAMERA MOTION]: ${cameraMotion === 'static' ? 'Rigid locked-off camera, zero camera movement, only the scene evolves.' : 'Controlled slow cinematic push-in.'}
- [SEAMLESS CONSTRAINTS]: No sudden cuts, no structural teleportation, continuous deposition, photorealistic motion blur at timelapse speed, ${aspectRatio} frame.

═══════════════════════════════════════════════════════════
OUTPUT JSON FORMAT
═══════════════════════════════════════════════════════════
Respond strictly with valid JSON:
{
  "frames": [
    "Keyframe prompt 1...",
    "...up to keyframe ${totalFrames}"
  ],
  "transitions": [
    "Veo 3 prompt for Sequence 1 (Frame 1 -> Frame 2)...",
    "...up to Sequence ${sequenceCount}"
  ],
  "key_differences": [
    "${isEn ? 'Phase 1 description' : 'Deskripsi fase 1 dalam bahasa Indonesia'}",
    "${isEn ? 'Phase 2 description' : 'Deskripsi fase 2 dalam bahasa Indonesia'}"
  ],
  "negative_prompt": "${UNIVERSAL_NEGATIVE_PROMPT}"
}`;

  const imagePart = base64ToImagePart(imageDataUrl);
  const visionChain = [
    'gemini-2.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
    'gemini-2.5-flash',
  ];
  let quotaErr;
  const attemptErrors = [];

  for (const modelName of visionChain) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: 'application/json' },
          safetySettings,
        });
        const result = await model.generateContent([textPrompt, imagePart]);
        const parsed = parseWithRepair(result.response.text());
        if (!parsed.negative_prompt) parsed.negative_prompt = UNIVERSAL_NEGATIVE_PROMPT;
        return parsed;
      } catch (err) {
        if (isAuthError(err)) handleGeminiError(err, language);
        const msg = err.message || '';

        // If 503 high demand on first attempt, pause 1.2s and retry once before skipping model
        if (attempt === 1 && isTransientError(msg)) {
          console.warn(`[Vision Timelapse] Model ${modelName} returned 503 (high demand). Retrying once in 1200ms...`);
          await sleep(1200);
          continue;
        }

        attemptErrors.push(`• ${modelName}: ${msg}`);
        if (msg.includes('429') || msg.includes('Quota') || msg.includes('RESOURCE_EXHAUSTED')) {
          quotaErr = err;
        }
        console.warn(`[Vision Timelapse] ${modelName} failed:`, err.message);
        break;
      }
    }
  }

  if (quotaErr) {
    handleGeminiError(quotaErr, language);
  }

  const detailedErr = new Error(
    `All available vision models failed.\n\nAttempts:\n${attemptErrors.join('\n')}`
  );
  handleGeminiError(detailedErr, language);
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENE SUGGESTIONS (TEXT MODE)
// ─────────────────────────────────────────────────────────────────────────────
export const generateSceneSuggestions = async (idea, language = 'id') => {
  const isEn = language === 'en';
  const langLabel = isEn ? 'English' : 'Indonesian';

  const prompt = `You are an award-winning Google Veo 3 timelapse director.

Given this user concept: "${idea}"
Generate exactly 3 visually dramatic, highly cinematic timelapse scene concepts.

Requirements:
- Strong start-to-finish transformation (texture, lighting, architectural or organic evolution)
- Smooth temporal continuity suitable for Google Veo 3 interpolation
- Output titles and descriptions in ${langLabel}

For each:
- title: Punchy cinematic title in ${langLabel} (max 5 words)
- description: 1 captivating sentence in ${langLabel} detailing the starting state and final transformation
- category: One of: "Nature", "Urban", "Architecture", "Cosmic", "Industrial", "Weather", "Food", "Human Story"
- emoji: 1 most relevant emoji

Respond ONLY with valid JSON array:
[
  { "title": "...", "description": "...", "category": "...", "emoji": "..." }
]`;

  return executeWithFallback("gemini-2.5-flash-lite", prompt, language);
};

// ─────────────────────────────────────────────────────────────────────────────
// SEQUENCE PROMPTS (TEXT MODE)
// ─────────────────────────────────────────────────────────────────────────────
export const generateSequencePrompts = async (
  scene, 
  parameters = {}, 
  sequenceCount = 1, 
  cameraMotion = 'static',
  language = 'id'
) => {
  const aspectRatio = parameters.aspectRatio || "16:9";
  const resolution = parameters.resolution || "8K UHD";
  const stylePreset = parameters.style || "Ultra-Photorealistic 8K, Masterpiece Lighting";
  const totalFrames = sequenceCount + 1;
  const isEn = language === 'en';

  const cameraDesc = cameraMotion === 'static'
    ? 'ROCK-SOLID LOCKED-OFF TRIPOD: Absolute zero panning, zero tilt, zero camera jitter. Fixed 35mm lens, identical framing across all frames.'
    : 'SLOW CINEMATIC PUSH-IN: A smooth, continuous forward push along the central lens axis, maintaining identical composition.';

  const prompt = `You are an expert Google Veo 3 and Google Imagen 3 director specializing in hyper-realistic timelapse sequences.

Generate:
1. ${totalFrames} KEYFRAME IMAGE PROMPTS (for Google Imagen 3 / Nano Banana / Midjourney)
2. ${sequenceCount} VEO 3 VIDEO TRANSITION PROMPTS (for Google Veo 3 / Kling AI / Sora)

PROJECT CONTEXT:
- Scene: "${scene.title}"
- Narrative: ${scene.description}
- Aspect Ratio: ${aspectRatio}
- Visual Style Preset: ${stylePreset}
- Keyframe Count: ${totalFrames}
- Transition Count: ${sequenceCount}
- Camera Rig: ${cameraDesc}

KEYFRAME IMAGE SPECIFICATIONS:
- Write each in English using the 8-layer architecture (Core Subject, Spatial Context, Micro Textures, Lens & Sensor [ARRI Alexa 65, 35mm f/8], Lighting Physics [5200K sun, ray tracing], Film Color Grade, Background Anchor, Quality Negatives).
- Frame 1 is the anchor. Frames 2 to ${totalFrames} MUST share identical background geometry, surrounding buildings/nature, and lighting setup to avoid jumping. Only the subject evolves.

VEO VIDEO TRANSITION SPECIFICATIONS:
- Write each in English as a single seamless paragraph:
  [OPENING BASELINE] -> [INCREMENTAL PHYSICAL ACCUMULATION using physical verbs (poured, laid, rose, sprouted, formed)] -> [TIMELAPSE ACCELERATION (sun sweeps smoothly, passing shadows, blurred purposeful motion)] -> [INTERMEDIATE 50% WAYPOINT] -> [CLOSING STATE matching next frame] -> [CAMERA: ${cameraMotion === 'static' ? 'locked tripod' : 'slow push-in'}] -> [ANTI-JUMP RULES: no morphs, no sudden teleportation, seamless continuous accumulation, photorealistic ${aspectRatio}].

OUTPUT FORMAT:
Respond with valid JSON only:
{
  "frames": [
    "Keyframe prompt 1...",
    "...up to keyframe ${totalFrames}"
  ],
  "transitions": [
    "Veo 3 prompt for transition 1...",
    "...up to transition ${sequenceCount}"
  ],
  "key_differences": [
    "${isEn ? 'Key change 1' : 'Perubahan utama 1 dalam bahasa Indonesia'}",
    "${isEn ? 'Key change 2' : 'Perubahan utama 2'}"
  ],
  "negative_prompt": "${UNIVERSAL_NEGATIVE_PROMPT}"
}`;

  const result = await executeWithFallback("gemini-2.5-flash-lite", prompt, language);
  if (!result.negative_prompt) result.negative_prompt = UNIVERSAL_NEGATIVE_PROMPT;
  return result;
};
