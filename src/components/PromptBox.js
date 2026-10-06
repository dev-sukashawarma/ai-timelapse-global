'use client';
import { useState } from 'react';
import { Copy, Check, Info, ImageIcon, Sparkles } from 'lucide-react';
import { translations } from '@/lib/translations';

export default function PromptBox({
  label,
  prompt,
  helperText,
  referenceNote,
  referenceImage,
  language = 'en',
  isTransition = false,
}) {
  const [copied, setCopied] = useState(false);
  const t = translations[language] || translations.id;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const el = document.createElement('textarea');
      el.value = prompt;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-primary/30 transition-all shadow-md group">
      {/* Header */}
      <div className="bg-secondary/60 px-4 py-3 flex justify-between items-center border-b border-border/80 gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {isTransition ? (
              <span className="text-primary font-bold text-xs">🎬</span>
            ) : (
              <span className="text-primary font-bold text-xs">🖼️</span>
            )}
            <h4 className="font-semibold text-sm text-foreground truncate">{label}</h4>
          </div>
          {helperText && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{helperText}</p>
          )}
        </div>

        {/* Copy Button */}
        {prompt && (
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-primary/15 text-primary hover:bg-primary/25 border border-primary/20'
            }`}
            title={copied ? t.result.copiedBtn : t.result.copyPromptBtn}
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span>{t.result.copiedBtn}</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>{t.result.copyPromptBtn}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Reference Guidance Note */}
      {referenceNote && (
        <div className="px-4 py-2.5 bg-primary/10 border-b border-primary/20 flex items-start gap-2">
          <Info size={13} className="text-primary shrink-0 mt-0.5" />
          <p className="text-[11px] text-primary/90 leading-relaxed font-medium">{referenceNote}</p>
        </div>
      )}

      {/* Reference Image Box (when this frame IS the user's photo) */}
      {referenceImage ? (
        <div className="flex flex-col flex-grow">
          <div className="relative flex-grow min-h-52 bg-black/40">
            <img
              src={referenceImage}
              alt={language === 'en' ? 'Original reference photo' : 'Foto referensi asli'}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg">
              <ImageIcon size={12} /> {t.result.photoUsedNote}
            </div>
          </div>

          {/* Optional collapse view of the raw prompt */}
          {prompt && (
            <div className="border-t border-border/60 bg-black/30">
              <details className="group/details">
                <summary className="px-4 py-2.5 text-[11px] text-muted-foreground cursor-pointer hover:text-foreground select-none list-none flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={11} className="text-primary" /> {t.result.optionalPromptToggle}
                  </span>
                  <span className="group-open/details:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-xs font-mono text-muted-foreground/90 break-words whitespace-pre-wrap leading-relaxed select-all">
                    {prompt}
                  </p>
                </div>
              </details>
            </div>
          )}
        </div>
      ) : (
        /* Normal text prompt display */
        <div className="p-4 flex-grow bg-black/30 flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-mono text-muted-foreground/90 break-words whitespace-pre-wrap leading-relaxed select-all">
            {prompt}
          </p>
        </div>
      )}
    </div>
  );
}
