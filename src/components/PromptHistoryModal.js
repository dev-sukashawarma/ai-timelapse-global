'use client';

import { useState } from 'react';
import {
  Clock, X, Trash2, Copy, Check, Download, ExternalLink,
  Layers, Video, Sparkles, ChevronRight, AlertCircle
} from 'lucide-react';

export default function PromptHistoryModal({
  isOpen,
  onClose,
  history = [],
  onRestore,
  onDelete,
  onClearAll,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async (item) => {
    let text = `========================================\nAI TIMELAPSE GENERATOR PROMPT BUNDLE\nScene: ${item.title || 'Timelapse'}\nFormat: ${item.aspectRatio || '16:9'} | Style: ${item.visualStyle || 'Ultra-Photorealistic'}\n========================================\n\n`;

    text += `--- PART 1: KEYFRAME IMAGE PROMPTS (IMAGEN / MIDJOURNEY) ---\n\n`;
    item.prompts?.frames?.forEach((f, i) => {
      text += `[KEYFRAME ${i + 1}]\n${f}\n\n`;
    });

    text += `--- PART 2: VIDEO TRANSITION PROMPTS (VEO 3 / KLING / SORA) ---\n\n`;
    item.prompts?.transitions?.forEach((tr, i) => {
      text += `[TRANSITION ${i + 1} (Frame ${i + 1} -> Frame ${i + 2})]\n${tr}\n\n`;
    });

    if (item.prompts?.negative_prompt) {
      text += `--- UNIVERSAL NEGATIVE PROMPT ---\n${item.prompts.negative_prompt}\n\n`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert('Failed to copy to clipboard.');
    }
  };

  const handleDownload = (item) => {
    let content = `AI TIMELAPSE GENERATOR GUIDE & PROMPTS\n`;
    content += `Generated: ${new Date(item.createdAt).toLocaleString()}\n`;
    content += `Title: ${item.title || 'Timelapse'}\n`;
    content += `Description: ${item.description || ''}\n`;
    content += `Aspect Ratio: ${item.aspectRatio || '16:9'} | Camera: ${item.cameraMotion || 'static'}\n\n`;

    content += `==============================================\n`;
    content += `PART 1: KEYFRAME IMAGE PROMPTS\n`;
    content += `==============================================\n\n`;
    item.prompts?.frames?.forEach((f, i) => {
      content += `[FRAME ${i + 1} PROMPT]\n${f}\n\n`;
    });

    content += `==============================================\n`;
    content += `PART 2: VEO 3 VIDEO TRANSITION PROMPTS\n`;
    content += `==============================================\n\n`;
    item.prompts?.transitions?.forEach((tr, i) => {
      content += `[TRANSITION ${i + 1} (From Frame ${i + 1} to Frame ${i + 2})]\n${tr}\n\n`;
    });

    if (item.prompts?.negative_prompt) {
      content += `==============================================\n`;
      content += `PART 3: UNIVERSAL NEGATIVE PROMPT\n`;
      content += `==============================================\n`;
      content += `${item.prompts.negative_prompt}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `timelapse-history-${item.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-5 sm:p-7 border border-white/15 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                Prompt History
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary border border-white/10 text-muted-foreground">
                  {history.length} {history.length === 1 ? 'project' : 'projects'}
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Your previously generated timelapse prompts are saved here locally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              confirmClear ? (
                <div className="flex items-center gap-1.5 animate-in fade-in">
                  <button
                    type="button"
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-destructive text-destructive-foreground font-semibold hover:opacity-90 cursor-pointer"
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-2 py-1 text-xs rounded-lg bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-secondary/80 hover:bg-destructive/15 text-muted-foreground hover:text-destructive border border-white/5 transition-all cursor-pointer flex items-center gap-1.5"
                  title="Clear all prompt history"
                >
                  <Trash2 size={13} />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              )
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto flex-grow py-4 space-y-3.5 pr-1">
          {history.length === 0 ? (
            <div className="text-center py-16 px-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary/60 flex items-center justify-center text-muted-foreground/50 mb-3 border border-white/5">
                <Clock size={26} />
              </div>
              <h4 className="text-base font-semibold text-foreground mb-1">No prompt history yet</h4>
              <p className="text-xs text-muted-foreground max-w-sm">
                Whenever you generate a timelapse concept, it will be automatically saved here so you can review, copy, or download it anytime.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const frameCount = item.prompts?.frames?.length || (item.sequenceCount ? item.sequenceCount + 1 : 2);
              const transCount = item.prompts?.transitions?.length || item.sequenceCount || 1;

              return (
                <div
                  key={item.id}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-primary/40 transition-all flex flex-col gap-3 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {item.inputMode === 'image' ? '📸 Photo Mode' : '✍️ Text Mode'}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                          {item.aspectRatio || '16:9'}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                          {frameCount} Frames · {transCount} Transitions
                        </span>
                        <span className="text-[11px] text-muted-foreground/60 ml-auto">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Snippet preview */}
                  {item.prompts?.frames?.[0] && (
                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-[11px] font-mono text-muted-foreground line-clamp-2">
                      <span className="text-primary font-bold">Keyframe 1: </span>
                      {item.prompts.frames[0]}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/5 gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onRestore(item);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs"
                      >
                        <Sparkles size={13} />
                        <span>View in Studio</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                          copiedId === item.id
                            ? 'bg-green-500/20 text-green-400 border-green-500/40'
                            : 'bg-secondary text-muted-foreground hover:text-foreground border-white/5 hover:bg-secondary/80'
                        }`}
                      >
                        {copiedId === item.id ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedId === item.id ? 'Copied All!' : 'Copy All'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground hover:text-foreground text-xs font-semibold border border-white/5 transition-all cursor-pointer"
                        title="Download .txt"
                      >
                        <Download size={13} />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-muted-foreground shrink-0">
          <span>Prompts stored locally in your browser</span>
          <button
            type="button"
            onClick={onClose}
            className="text-primary hover:underline cursor-pointer font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
