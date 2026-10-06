'use client';

import { useState, useRef, useCallback, useEffect } from "react";
import ApiKeyInput from "@/components/ApiKeyInput";
import TemplateGrid from "@/components/TemplateGrid";
import PromptBox from "@/components/PromptBox";
import ImageUpload from "@/components/ImageUpload";
import { translations } from "@/lib/translations";
import {
  generateSceneSuggestions,
  generateSequencePrompts,
  analyzeImageForTimelapse,
  generateImageTimelapsePrompts,
  UNIVERSAL_NEGATIVE_PROMPT,
} from "@/lib/gemini";
import {
  Sparkles, ArrowRight, Loader2, ArrowRightLeft,
  ScanSearch, Globe, HelpCircle, Check, Copy, Download,
  SlidersHorizontal, Video, Layers, X, ShieldAlert, MonitorPlay,
  ChevronDown
} from "lucide-react";

export default function Home() {

  // ── Language State ──────────────────────────────────────────────────────────
  const [language, setLanguage] = useState('en'); // Default to English

  useEffect(() => {
    const saved = localStorage.getItem('TIMELAPSE_LANG');
    if (saved && (saved === 'en' || saved === 'id')) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('TIMELAPSE_LANG', newLang);
  };

  const t = translations[language] || translations.id;

  // ── Beginner Guide Modal ────────────────────────────────────────────────────
  const [showGuide, setShowGuide] = useState(false);

  // ── Input Mode ──────────────────────────────────────────────────────────────
  const [inputMode, setInputMode] = useState('text'); // 'text' | 'image'
  const [imageFrameIndex, setImageFrameIndex] = useState(1);

  // ── Text mode state ──────────────────────────────────────────────────────────
  const [idea, setIdea] = useState("");

  // ── Image mode state ─────────────────────────────────────────────────────────
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageHint, setImageHint] = useState('');
  const [detectedSubject, setDetectedSubject] = useState('');

  // ── Quality & Camera Settings ────────────────────────────────────────────────
  const [aspectRatio, setAspectRatio] = useState('16:9'); // '16:9' | '9:16' | '1:1'
  const [visualStyle, setVisualStyle] = useState('Ultra-Photorealistic 8K');
  const [cameraMotion, setCameraMotion] = useState('static'); // 'static' | 'push_in'
  const [sequenceCount, setSequenceCount] = useState(2);
  const [showSettings, setShowSettings] = useState(false);

  // ── Shared state ──────────────────────────────────────────────────────────────
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('');

  // step: 'input' → 'suggestions' → 'generating' → 'result'
  const [step, setStep] = useState('input');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedScene, setSelectedScene] = useState(null);
  const [prompts, setPrompts] = useState(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);
  const [copyNegativeStatus, setCopyNegativeStatus] = useState(false);

  const resultRef = useRef(null);

  const totalFrames = sequenceCount + 1;
  const clampedImageFrame = Math.min(imageFrameIndex, totalFrames);
  const imagePosition = clampedImageFrame === 1 ? 'start' : clampedImageFrame === totalFrames ? 'end' : 'middle';

  const parameters = {
    aspectRatio,
    resolution: "8K UHD",
    style: visualStyle,
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleKeySaved = useCallback((key) => setHasKey(!!key), []);

  // TEXT mode → generate suggestions
  const handleGenerateSuggestions = async (e) => {
    e?.preventDefault();
    if (!idea.trim() || !hasKey) return;
    setLoading(true);
    setLoadingLabel(language === 'en' ? 'Analyzing your story concept...' : 'Menganalisis konsep cerita kamu...');
    try {
      const results = await generateSceneSuggestions(idea, language);
      setSuggestions(results);
      setStep('suggestions');
    } catch (error) {
      console.error(error);
      const fallbackMsg = language === 'en' ? 'Please check your API key.' : 'Periksa API Key kamu.';
      alert(`Error: ${error.message || fallbackMsg}`);
    } finally {
      setLoading(false);
      setLoadingLabel('');
    }
  };

  // IMAGE mode → analyze with Gemini Vision
  const handleAnalyzeImage = async () => {
    if (!uploadedImage || !hasKey) return;
    setLoading(true);
    setLoadingLabel(language === 'en' ? 'AI Vision is inspecting your photo...' : 'AI Vision sedang memeriksa foto kamu...');
    try {
      const results = await analyzeImageForTimelapse(
        uploadedImage,
        imageHint,
        imagePosition,
        clampedImageFrame,
        totalFrames,
        language
      );
      if (results?.[0]?.detectedSubject) {
        setDetectedSubject(results[0].detectedSubject);
      }
      setSuggestions(results);
      setStep('suggestions');
    } catch (error) {
      console.error(error);
      const fallbackMsg = language === 'en' ? 'Please check your API key.' : 'Periksa API Key kamu.';
      alert(`Error: ${error.message || fallbackMsg}`);
    } finally {
      setLoading(false);
      setLoadingLabel('');
    }
  };

  const handleSelectTemplate = async (template) => {
    setSelectedScene({ title: template.title, description: template.description });
    setStep('generating');
    await handleGeneratePrompts(template, sequenceCount);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedScene(suggestion);
    setStep('generating');
    if (inputMode === 'image' && uploadedImage) {
      handleGenerateImagePrompts(suggestion);
    } else {
      handleGeneratePrompts(suggestion, sequenceCount);
    }
  };

  const handleGenerateImagePrompts = async (scene) => {
    setLoading(true);
    setLoadingLabel(language === 'en' ? 'Generating seamless construction keyframes & transitions...' : 'AI menyusun prompt gambar acuan & video transisi tanpa patah...');
    try {
      const result = await generateImageTimelapsePrompts(
        uploadedImage,
        scene,
        parameters,
        sequenceCount,
        cameraMotion,
        imagePosition,
        clampedImageFrame,
        imageHint,
        language
      );
      setPrompts(result);
      setStep('result');
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 120);
    } catch (error) {
      console.error(error);
      const fallbackMsg = language === 'en' ? 'Please check your API key.' : 'Periksa API Key kamu.';
      alert(`Error: ${error.message || fallbackMsg}`);
      setStep('suggestions');
    } finally {
      setLoading(false);
      setLoadingLabel('');
    }
  };

  const handleGeneratePrompts = async (scene, count) => {
    setLoading(true);
    setLoadingLabel(language === 'en' ? 'Crafting cinematic timelapse prompts...' : 'Menyusun prompt sinematik anti-patah...');
    try {
      const result = await generateSequencePrompts(scene, parameters, count, cameraMotion, language);
      setPrompts(result);
      setStep('result');
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 120);
    } catch (error) {
      console.error(error);
      const fallbackMsg = language === 'en' ? 'Please check your API key.' : 'Periksa API Key kamu.';
      alert(`Error: ${error.message || fallbackMsg}`);
      setStep('suggestions');
    } finally {
      setLoading(false);
      setLoadingLabel('');
    }
  };

  const reset = () => {
    setStep('input');
    setIdea('');
    setUploadedImage(null);
    setImageHint('');
    setDetectedSubject('');
    setImageFrameIndex(1);
    setSuggestions([]);
    setSelectedScene(null);
    setPrompts(null);
  };

  // Copy all prompts to clipboard formatted
  const handleCopyAll = async () => {
    if (!prompts) return;
    const isEn = language === 'en';
    let text = `========================================\nAI TIMELAPSE GENERATOR PROMPT BUNDLE\nScene: ${selectedScene?.title || ''}\nFormat: ${aspectRatio} | Style: ${visualStyle}\n========================================\n\n`;

    text += isEn 
      ? `--- PART 1: KEYFRAME IMAGE PROMPTS (IMAGEN / MIDJOURNEY) ---\n\n`
      : `--- LANGKAH 1: GAMBAR ACUAN (KEYFRAMES) ---\n\n`;
    prompts.frames?.forEach((f, i) => {
      text += `[KEYFRAME ${i + 1}]\n${f}\n\n`;
    });

    text += isEn
      ? `--- PART 2: VIDEO TRANSITION PROMPTS (VEO 3 / KLING / SORA) ---\n\n`
      : `--- LANGKAH 2: VIDEO TRANSISI (VEO 3 / KLING) ---\n\n`;
    prompts.transitions?.forEach((tr, i) => {
      text += isEn
        ? `[TRANSITION ${i + 1} (Frame ${i + 1} -> Frame ${i + 2})]\n${tr}\n\n`
        : `[TRANSISI ${i + 1} (Frame ${i + 1} -> Frame ${i + 2})]\n${tr}\n\n`;
    });

    if (prompts.negative_prompt) {
      text += `--- UNIVERSAL NEGATIVE PROMPT ---\n${prompts.negative_prompt}\n\n`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyAllStatus(true);
      setTimeout(() => setCopyAllStatus(false), 2500);
    } catch {
      alert(isEn ? 'Failed to copy automatically. Please copy items one by one.' : 'Gagal menyalin otomatis. Silakan salin satu per satu.');
    }
  };

  // Download .txt file
  const handleDownloadTxt = () => {
    if (!prompts) return;
    let content = `AI TIMELAPSE GENERATOR GUIDE & PROMPTS\n`;
    content += `Generated: ${new Date().toLocaleString()}\n`;
    content += `Title: ${selectedScene?.title || 'Timelapse'}\n`;
    content += `Description: ${selectedScene?.description || ''}\n`;
    content += `Aspect Ratio: ${aspectRatio} | Camera: ${cameraMotion}\n\n`;

    content += `==============================================\n`;
    content += `PART 1: KEYFRAME IMAGE PROMPTS (Imagen / Midjourney)\n`;
    content += `==============================================\n\n`;
    prompts.frames?.forEach((f, i) => {
      content += `[FRAME ${i + 1} PROMPT]\n${f}\n\n`;
    });

    content += `==============================================\n`;
    content += `PART 2: VEO 3 VIDEO TRANSITION PROMPTS (Veo / Kling / Sora)\n`;
    content += `==============================================\n\n`;
    prompts.transitions?.forEach((tr, i) => {
      content += `[TRANSITION ${i + 1} (From Frame ${i + 1} to Frame ${i + 2})]\n${tr}\n\n`;
    });

    content += `==============================================\n`;
    content += `PART 3: UNIVERSAL NEGATIVE PROMPT\n`;
    content += `==============================================\n`;
    content += `${prompts.negative_prompt || UNIVERSAL_NEGATIVE_PROMPT}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timelapse-prompts-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const canGenerate = hasKey && (
    (inputMode === 'text' && idea.trim()) ||
    (inputMode === 'image' && uploadedImage)
  );


  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-14 relative overflow-hidden flex flex-col items-center bg-ambient-cinema">
      {/* Ultra-Smooth Seamless Ambient Lighting (Zero Hard Edges) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Top-Center Symmetrical Glow */}
        <div
          className="absolute -top-[20vw] left-1/2 -translate-x-1/2 w-[110vw] h-[65vw] max-w-[1400px] max-h-[850px] rounded-full blur-[130px] opacity-75"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.20) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 75%)' }}
        />
        {/* Soft Left Ambient Drift */}
        <div
          className="absolute top-[40%] -left-[10vw] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[140px] opacity-35"
          style={{ background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, transparent 70%)' }}
        />
        {/* Soft Right Ambient Drift */}
        <div
          className="absolute top-[35%] -right-[10vw] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] opacity-30"
          style={{ background: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.12) 0%, transparent 70%)' }}
        />
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center">

        {/* ── TOP NAV BAR ────────────────────────────────────────────────────── */}
        <nav className="w-full flex items-center justify-between pb-6 border-b border-white/5 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary tracking-wide">
              {t.nav.badge}
            </div>
            <span className="inline-block text-[11px] font-medium text-muted-foreground/60 px-2 py-0.5 rounded-md bg-secondary">
              {t.nav.version}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-secondary/80 backdrop-blur-md p-0.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground shadow-xs font-extrabold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('id')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-primary text-primary-foreground shadow-xs font-extrabold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Ganti ke Bahasa Indonesia"
              >
                ID
              </button>
            </div>

            {/* Beginner Guide Button */}
            <button
              type="button"
              onClick={() => setShowGuide(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <HelpCircle size={14} />
              <span>{t.nav.helpBtn}</span>
            </button>
          </div>
        </nav>

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <header className="text-center mb-8 pt-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-tight sm:leading-none">
            <span className="block bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              {t.header.title1}
            </span>
            <span className="block bg-gradient-to-r from-primary via-[#adc6ff] to-[#005bc1] bg-clip-text text-transparent">
              {t.header.title2}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.header.subtitle}
          </p>
        </header>

        {/* ── STEP PROGRESS TRACKER ─────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-8 flex items-center justify-center gap-2 sm:gap-4 text-xs">
          <div className={`flex items-center gap-1.5 font-medium transition-colors ${
            hasKey ? 'text-green-400' : 'text-primary'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              hasKey
                ? 'bg-green-400/20 text-green-400 border border-green-400/40'
                : 'bg-primary/20 text-primary border border-primary/40'
            }`}>
              {hasKey ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">{hasKey ? t.steps.step1Active : t.steps.step1Idle}</span>
          </div>
          <span className="text-muted-foreground/30 text-sm">—</span>
          <div className={`flex items-center gap-1.5 transition-colors ${
            step === 'input' ? 'text-foreground font-semibold' : 'text-muted-foreground/60'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              step === 'input' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-secondary border border-border'
            }`}>
              2
            </span>
            <span className="hidden sm:inline">{t.steps.step2}</span>
          </div>
          <span className="text-muted-foreground/30 text-sm">—</span>
          <div className={`flex items-center gap-1.5 transition-colors ${
            step === 'suggestions' ? 'text-foreground font-semibold' : 'text-muted-foreground/60'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              step === 'suggestions' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-secondary border border-border'
            }`}>
              3
            </span>
            <span className="hidden sm:inline">{t.steps.step3}</span>
          </div>
          <span className="text-muted-foreground/30 text-sm">—</span>
          <div className={`flex items-center gap-1.5 transition-colors ${
            step === 'result' ? 'text-green-400 font-semibold' : 'text-muted-foreground/40'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              step === 'result' ? 'bg-green-400/20 text-green-400 border border-green-400/40' : 'bg-secondary border border-border'
            }`}>
              4
            </span>
            <span className="hidden sm:inline">{t.steps.step4}</span>
          </div>
        </div>

        {/* ── STEP 1: INPUT & SETTINGS ───────────────────────────────────────── */}
        {step === 'input' && (
          <div className="w-full animate-in fade-in duration-400">

            {/* API Key Box */}
            <div className="max-w-3xl mx-auto mb-6">
              <ApiKeyInput onKeySaved={handleKeySaved} language={language} />
            </div>

            <div className="max-w-3xl mx-auto flex flex-col gap-5">

              {/* Input Mode Selector Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => { setInputMode('text'); setImageFrameIndex(1); }}
                  className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer group ${
                    inputMode === 'text'
                      ? 'border-primary/60 bg-primary/10 shadow-lg scale-[1.005]'
                      : 'border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl block mb-2">✍️</span>
                  <div className={`font-bold text-sm sm:text-base mb-1 transition-colors ${
                    inputMode === 'text' ? 'text-primary' : 'text-foreground'
                  }`}>
                    {t.inputTabs.textTitle}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {t.inputTabs.textDesc}
                  </div>
                  {inputMode === 'text' && (
                    <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setInputMode('image'); setImageFrameIndex(1); }}
                  className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer group ${
                    inputMode === 'image'
                      ? 'border-primary/60 bg-primary/10 shadow-lg scale-[1.005]'
                      : 'border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl block mb-2">📸</span>
                  <div className={`font-bold text-sm sm:text-base mb-1 transition-colors ${
                    inputMode === 'image' ? 'text-primary' : 'text-foreground'
                  }`}>
                    {t.inputTabs.imageTitle}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {t.inputTabs.imageDesc}
                  </div>
                  {inputMode === 'image' && (
                    <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </button>
              </div>

              {/* ── SETTINGS DRAWER / ACCORDION ── */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-primary" />
                    <span className="text-sm font-bold text-foreground">{t.settings.panelTitle}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                    {aspectRatio} · {visualStyle.split(',')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {/* Aspect Ratio */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      📐 {t.settings.aspectRatioTitle}
                    </label>
                    <div className="flex gap-1.5">
                      {[
                        { id: '16:9', label: '16:9', desc: 'YouTube' },
                        { id: '9:16', label: '9:16', desc: 'Reels/TikTok' },
                        { id: '1:1', label: '1:1', desc: 'Square' },
                      ].map((ar) => (
                        <button
                          key={ar.id}
                          type="button"
                          onClick={() => setAspectRatio(ar.id)}
                          className={`flex-1 py-2 px-1 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            aspectRatio === ar.id
                              ? 'bg-primary/20 border-primary text-primary font-bold'
                              : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <div>{ar.label}</div>
                          <div className="text-[9px] opacity-70">{ar.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Style Preset */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      🎨 {t.settings.styleTitle}
                    </label>
                    <div className="relative">
                      <select
                        value={visualStyle}
                        onChange={(e) => setVisualStyle(e.target.value)}
                        className="w-full glass-input text-xs pl-3.5 pr-9 py-2.5 rounded-xl border border-border appearance-none cursor-pointer truncate"
                      >
                        <option value="Ultra-Photorealistic 8K, Masterpiece Lighting" className="bg-[#1c1b1b]">
                          {t.settings.stylePhotoreal}
                        </option>
                        <option value="Cinematic Golden Hour, Warm Volumetric Sunbeams" className="bg-[#1c1b1b]">
                          {t.settings.styleCinematic}
                        </option>
                        <option value="Architectural Documentary, High Contrast Crisp Focus" className="bg-[#1c1b1b]">
                          {t.settings.styleArchitectural}
                        </option>
                        <option value="Lush Organic Nature, Vivid Ambient Colors" className="bg-[#1c1b1b]">
                          {t.settings.styleNature}
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/70">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Camera Motion */}
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      🎥 {t.settings.cameraTitle}
                    </label>
                    <div className="relative">
                      <select
                        value={cameraMotion}
                        onChange={(e) => setCameraMotion(e.target.value)}
                        className="w-full glass-input text-xs pl-3.5 pr-9 py-2.5 rounded-xl border border-border appearance-none cursor-pointer truncate"
                      >
                        <option value="static" className="bg-[#1c1b1b]">
                          {t.settings.cameraStatic}
                        </option>
                        <option value="push_in" className="bg-[#1c1b1b]">
                          {t.settings.cameraMotion}
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/70">
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Number of Transitions Selector */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold text-foreground">
                        {t.settings.transitionsTitle}
                      </span>
                      <p className="text-[10px] text-muted-foreground">
                        {t.settings.transitionsDesc}
                      </p>
                    </div>
                    <span className="text-xs text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                      {t.settings.transitionsSummary.replace('{seq}', sequenceCount).replace('{frames}', totalFrames)}
                    </span>
                  </div>
                  <div className="flex flex-wrap bg-secondary/60 p-1 rounded-xl gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSequenceCount(num)}
                        className={`flex-1 min-w-[9%] py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          sequenceCount === num
                            ? 'bg-primary text-primary-foreground shadow-sm font-bold'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {num}<span className="block text-[8px] opacity-70">{num + 1}F</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── TEXT MODE FORM ── */}
              {inputMode === 'text' && (
                <form onSubmit={handleGenerateSuggestions} className="animate-in fade-in duration-300 flex flex-col gap-3">
                  <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-3">
                    <textarea
                      rows={2}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleGenerateSuggestions(e);
                        }
                      }}
                      placeholder={t.textForm.placeholder}
                      className="w-full bg-transparent text-sm sm:text-base px-2 py-1 text-foreground placeholder:text-muted-foreground/60 focus:outline-none resize-none leading-relaxed"
                      disabled={!hasKey || loading}
                    />

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 border-t border-white/5 gap-3">
                      <span className="text-[11px] text-muted-foreground/60 hidden sm:inline">
                        {language === 'en' ? '💡 Tip: Press Enter to generate' : '💡 Tip: Tekan Enter untuk langsung generate'}
                      </span>
                      <button
                        type="submit"
                        disabled={!canGenerate || loading}
                        className="w-full sm:w-auto px-6 py-3 btn-glow text-primary-foreground font-bold rounded-xl disabled:opacity-40 disabled:animate-none flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md transition-all hover:scale-[1.01]"
                      >
                        {loading ? (
                          <><Loader2 className="animate-spin" size={17} /> {loadingLabel || (language === 'en' ? 'Generating...' : 'Memproses...')}</>
                        ) : (
                          <><Sparkles size={16} /> {t.textForm.submitBtn}</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* ── IMAGE MODE FORM ── */}
              {inputMode === 'image' && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                  <ImageUpload
                    onImageReady={setUploadedImage}
                    onHintChange={setImageHint}
                    hint={imageHint}
                    language={language}
                  />

                  {/* Photo Position Selector */}
                  <div className="glass-panel p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        📍 {t.settings.photoPositionTitle}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {/* START */}
                      <button
                        type="button"
                        onClick={() => setImageFrameIndex(1)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all cursor-pointer ${
                          clampedImageFrame === 1
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 font-bold'
                            : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="text-lg">🏁</span>
                        <span className="text-xs">{t.settings.posStart}</span>
                        <span className="text-[9px] opacity-70 text-center leading-tight">{t.settings.posStartSub}</span>
                      </button>

                      {/* MIDDLE */}
                      <button
                        type="button"
                        onClick={() => setImageFrameIndex(Math.ceil(totalFrames / 2))}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all cursor-pointer ${
                          clampedImageFrame > 1 && clampedImageFrame < totalFrames
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 font-bold'
                            : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="text-lg">📍</span>
                        <span className="text-xs">{t.settings.posMid}</span>
                        <span className="text-[9px] opacity-70 text-center leading-tight">{t.settings.posMidSub}</span>
                      </button>

                      {/* END */}
                      <button
                        type="button"
                        onClick={() => setImageFrameIndex(totalFrames)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all cursor-pointer ${
                          clampedImageFrame === totalFrames
                            ? 'bg-green-500/20 border-green-500/50 text-green-300 font-bold'
                            : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="text-lg">🏠</span>
                        <span className="text-xs">{t.settings.posEnd}</span>
                        <span className="text-[9px] opacity-70 text-center leading-tight">{t.settings.posEndSub}</span>
                      </button>
                    </div>

                    {/* Recommendation Notice */}
                    {clampedImageFrame === totalFrames && (
                      <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-xs text-green-300 font-semibold mb-0.5">{t.settings.posEndTipTitle}</p>
                        <p className="text-[11px] text-green-200/80 leading-relaxed">{t.settings.posEndTipDesc}</p>
                      </div>
                    )}
                    {clampedImageFrame === 1 && (
                      <div className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-xs text-blue-300 font-semibold mb-0.5">{t.settings.posStartTipTitle}</p>
                        <p className="text-[11px] text-blue-200/80 leading-relaxed">{t.settings.posStartTipDesc}</p>
                      </div>
                    )}
                    {clampedImageFrame > 1 && clampedImageFrame < totalFrames && (
                      <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <p className="text-xs text-orange-300 font-semibold mb-0.5">{t.settings.posMidTipTitle}</p>
                        <p className="text-[11px] text-orange-200/80 leading-relaxed">{t.settings.posMidTipDesc}</p>
                        {sequenceCount < 4 && (
                          <button
                            type="button"
                            onClick={() => setSequenceCount(4)}
                            className="mt-1 text-[11px] font-semibold text-orange-300 underline cursor-pointer hover:text-orange-200"
                          >
                            {t.settings.autoUpgradeSeq}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleAnalyzeImage}
                    disabled={!canGenerate || loading}
                    className="w-full flex items-center justify-center gap-2 py-4 btn-glow text-primary-foreground font-bold rounded-2xl disabled:opacity-40 disabled:animate-none cursor-pointer text-base shadow-lg"
                  >
                    {loading
                      ? <><Loader2 className="animate-spin" size={20} /> {loadingLabel}</>
                      : <><ScanSearch size={20} /> {t.imageForm.submitBtn}</>
                    }
                  </button>
                </div>
              )}

              {!hasKey && (
                <p className="text-center text-xs text-amber-400 font-medium bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                  {t.apiKey.requiredNotice}
                </p>
              )}
            </div>

            {/* ── CURATED TEMPLATES ── */}
            {inputMode === 'text' && (
              <div className="mt-12 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(75,142,255,0.25))' }} />
                  <span className="text-xs sm:text-sm text-muted-foreground px-2 whitespace-nowrap font-medium">
                    {t.templates.divider}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(75,142,255,0.25))' }} />
                </div>
                <TemplateGrid onSelect={handleSelectTemplate} language={language} />
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: SUGGESTIONS ────────────────────────────────────────────── */}
        {step === 'suggestions' && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-400">
            <button
              onClick={reset}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 cursor-pointer font-medium"
            >
              {t.suggestions.backBtn}
            </button>

            {/* AI Vision Badge */}
            {inputMode === 'image' && detectedSubject && (
              <div className="flex flex-col sm:flex-row gap-4 mb-6 glass-panel p-4 rounded-2xl border border-primary/20">
                {uploadedImage && (
                  <div className="w-28 h-20 rounded-xl overflow-hidden border border-white/10 relative shrink-0">
                    <img src={uploadedImage} alt={language === 'en' ? 'Reference preview' : 'Gambar referensi'} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 text-center text-[9px] bg-black/70 text-white py-0.5">
                      Frame {clampedImageFrame}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ScanSearch size={14} className="text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{t.suggestions.detectedTitle}</span>
                  </div>
                  <p className="text-sm font-semibold">{detectedSubject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.suggestions.detectedSubtitle.replace('{curr}', clampedImageFrame).replace('{total}', totalFrames)}
                  </p>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-1">{t.suggestions.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t.suggestions.subtitle.replace('{seq}', sequenceCount).replace('{frames}', totalFrames)}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSuggestion(sug)}
                  className="glass-panel text-left p-5 rounded-2xl hover:border-primary/60 transition-all group cursor-pointer flex flex-col border border-white/10 hover:bg-white/5"
                >
                  <span className="text-3xl mb-3 block">{sug.emoji}</span>
                  <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                    {sug.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex-grow leading-relaxed">
                    {sug.description}
                  </p>

                  {(sug.suggestedStart || sug.suggestedEnd) && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                      {sug.suggestedStart && (
                        <p className="text-[11px] text-muted-foreground">
                          <span className="font-bold text-primary/80">{t.suggestions.startLabel}</span> {sug.suggestedStart}
                        </p>
                      )}
                      {sug.suggestedEnd && (
                        <p className="text-[11px] text-muted-foreground">
                          <span className="font-bold text-primary/80">{t.suggestions.endLabel}</span> {sug.suggestedEnd}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-4 text-xs font-semibold text-primary/80 group-hover:text-primary flex items-center gap-1">
                    {t.suggestions.selectBtn}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: GENERATING ─────────────────────────────────────────────── */}
        {step === 'generating' && (
          <div className="w-full py-28 flex flex-col items-center justify-center animate-in fade-in duration-400">
            <div className="w-16 h-16 relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
              <Sparkles className="text-primary animate-pulse" size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2">{t.generating.title}</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {loadingLabel || t.generating.subtitleDefault}
            </p>
          </div>
        )}

        {/* ── STEP 4: RESULT ─────────────────────────────────────────────────── */}
        {step === 'result' && prompts && (
          <div ref={resultRef} className="w-full animate-in fade-in slide-in-from-bottom-6 duration-600">
            {/* Result Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 glass-panel p-6 rounded-3xl border border-primary/20">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                  <Sparkles size={12} /> {t.result.badge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1">{selectedScene?.title || 'Timelapse Project'}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">{selectedScene?.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  {copyAllStatus ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copyAllStatus ? t.result.copyAllSuccess : t.result.copyAll}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-secondary hover:bg-secondary/80 border border-white/10 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
                >
                  <Download size={15} />
                  <span>{t.result.downloadTxt}</span>
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="px-3.5 py-2.5 bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  {t.result.backBtn}
                </button>
              </div>
            </div>

            {/* Storyboard Flow Visualizer */}
            <div className="glass-panel rounded-3xl p-6 mb-8 border border-white/10 overflow-x-auto shadow-lg">
              <h3 className="text-base sm:text-lg font-bold mb-1 flex items-center gap-2">
                <ArrowRightLeft size={18} className="text-primary" />
                {t.result.storyboardTitle.replace('{total}', totalFrames)}
              </h3>
              <p className="text-xs text-muted-foreground mb-5">{t.result.storyboardDesc}</p>

              <div className="flex items-center gap-3 min-w-max pb-3">
                {prompts.frames?.map((_, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-background/70 rounded-2xl p-3.5 border border-border w-48 shrink-0 relative shadow-sm">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        {idx === 0
                          ? t.result.startFrameThumb
                          : idx === prompts.frames.length - 1
                            ? t.result.endFrameThumb
                            : `${t.result.midFrameThumb} ${idx}`}
                      </div>
                      {/* Photo Thumbnail */}
                      {inputMode === 'image' && uploadedImage && idx === clampedImageFrame - 1 ? (
                        <div className="w-full aspect-video rounded-xl overflow-hidden border border-primary/40 relative shadow">
                          <img src={uploadedImage} alt={language === 'en' ? 'Reference photo' : 'Foto referensi'} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-primary/10 flex items-end p-1">
                            <span className="text-[9px] bg-primary text-primary-foreground font-bold px-1.5 py-0.5 rounded shadow">
                              {t.result.yourPhotoThumb}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full aspect-video bg-secondary/40 rounded-xl flex items-center justify-center border border-dashed border-border/80 text-muted-foreground/50">
                          <span className="text-2xl">🖼️</span>
                        </div>
                      )}
                    </div>
                    {idx < prompts.frames.length - 1 && (
                      <div className="flex flex-col items-center text-muted-foreground shrink-0 w-24">
                        <ArrowRight size={20} className="text-primary" />
                        <span className="text-[10px] mt-1 text-center font-medium">
                          {t.result.transitionArrow.replace('{idx}', idx + 1)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {prompts.key_differences && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                    {t.result.differencesTitle}
                  </div>
                  <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {prompts.key_differences.map((diff, i) => (
                      <li key={i}>{diff}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ── BAGIAN 1: Keyframe Image Prompts ── */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-3 border-b border-border pb-4">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="text-xl font-bold leading-none">{t.result.step1Title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {t.result.step1Desc}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prompts.frames?.map((framePrompt, idx) => {
                  const totalF = prompts.frames.length;
                  const isFirst = idx === 0;
                  const isLast = idx === totalF - 1;

                  const isStartFrameFromPhoto = isFirst && inputMode === 'image' && uploadedImage && clampedImageFrame === 1;
                  const isEndFrameFromPhoto = isLast && inputMode === 'image' && uploadedImage && clampedImageFrame === totalF;
                  const isMidFrameFromPhoto = inputMode === 'image' && uploadedImage && !isFirst && !isLast && idx === clampedImageFrame - 1;

                  const frameLabel = isFirst
                    ? t.result.frameFirst
                    : isLast
                      ? t.result.frameLast
                      : t.result.frameMid.replace('{idx}', idx).replace('{num}', idx + 1);

                  const helperText = (isStartFrameFromPhoto || isEndFrameFromPhoto || isMidFrameFromPhoto)
                    ? t.result.photoUsedNote
                    : `Google Imagen 3 / Nano Banana / Midjourney`;

                  const referenceNote = isStartFrameFromPhoto
                    ? t.result.photoHelperStart
                    : isEndFrameFromPhoto
                      ? t.result.photoHelperEnd
                      : isMidFrameFromPhoto
                        ? t.result.photoHelperMid.replace('{num}', clampedImageFrame)
                        : isFirst
                          ? t.result.genHelperFirst
                          : isLast
                            ? t.result.genHelperLast
                            : t.result.genHelperMid.replace('{num}', idx + 1);

                  return (
                    <div key={idx} className="h-full">
                      <PromptBox
                        label={frameLabel}
                        prompt={framePrompt}
                        helperText={helperText}
                        referenceNote={referenceNote}
                        referenceImage={(isEndFrameFromPhoto || isMidFrameFromPhoto || isStartFrameFromPhoto) ? uploadedImage : null}
                        language={language}
                        isTransition={false}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ── BAGIAN 2: Veo Video Prompts ── */}
              <div className="flex items-start gap-3 border-b border-border pb-4 mt-12">
                <span className="text-2xl">🎬</span>
                <div>
                  <h3 className="text-xl font-bold leading-none">{t.result.step2Title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {t.result.step2Desc}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prompts.transitions?.map((transPrompt, idx) => {
                  const fromFrame = idx + 1;
                  const toFrame = idx + 2;
                  const totalF = prompts.frames.length;

                  const fromLabel = idx === 0 ? 'Frame 1 (Start)' : `Frame ${fromFrame}`;
                  const toLabel = toFrame === totalF ? `Frame ${totalF} (End)` : `Frame ${toFrame}`;

                  return (
                    <div key={idx} className="h-full">
                      <PromptBox
                        label={t.result.transLabel.replace('{idx}', idx + 1).replace('{from}', fromFrame).replace('{to}', toFrame)}
                        prompt={transPrompt}
                        helperText={t.result.transHelper}
                        referenceNote={t.result.transRefNote.replace('{fromName}', fromLabel).replace('{toName}', toLabel)}
                        language={language}
                        isTransition={true}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ── UNIVERSAL NEGATIVE PROMPT CARD ── */}
              <div className="glass-panel p-5 rounded-2xl border border-white/10 mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-destructive" />
                    <span className="text-sm font-bold text-foreground">{t.result.negativePromptTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(prompts.negative_prompt || UNIVERSAL_NEGATIVE_PROMPT);
                      setCopyNegativeStatus(true);
                      setTimeout(() => setCopyNegativeStatus(false), 2000);
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25 transition-all cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                  >
                    {copyNegativeStatus ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copyNegativeStatus ? t.result.copiedBtn : t.result.copyNegativeBtn}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-muted-foreground/90 bg-black/30 p-3 rounded-xl border border-white/5">
                  {prompts.negative_prompt || UNIVERSAL_NEGATIVE_PROMPT}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL: PANDUAN PEMULA / BEGINNER GUIDE ───────────────────────────── */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">💡</span>
              <h3 className="text-xl sm:text-2xl font-bold">{t.guide.modalTitle}</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              {t.guide.modalSubtitle}
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-secondary/40 p-4 rounded-2xl border border-white/5">
                <div className="font-bold text-foreground mb-1 text-primary">{t.guide.step1Title}</div>
                <p className="text-muted-foreground leading-relaxed">{t.guide.step1Desc}</p>
              </div>

              <div className="bg-secondary/40 p-4 rounded-2xl border border-white/5">
                <div className="font-bold text-foreground mb-1 text-primary">{t.guide.step2Title}</div>
                <p className="text-muted-foreground leading-relaxed">{t.guide.step2Desc}</p>
              </div>

              <div className="bg-secondary/40 p-4 rounded-2xl border border-white/5">
                <div className="font-bold text-foreground mb-1 text-primary">{t.guide.step3Title}</div>
                <p className="text-muted-foreground leading-relaxed">{t.guide.step3Desc}</p>
              </div>

              <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                <div className="font-bold text-blue-300 mb-1">{t.guide.tipTitle}</div>
                <p className="text-blue-200/80 leading-relaxed text-xs">{t.guide.tipDesc}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full py-3.5 btn-glow font-bold text-primary-foreground rounded-xl cursor-pointer text-sm"
            >
              {t.guide.closeBtn}
            </button>
          </div>
        </div>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="mt-14 pb-6 text-center text-xs text-muted-foreground/60 w-full z-10 relative">
        <p>{t.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
      </footer>
    </main>
  );
}
