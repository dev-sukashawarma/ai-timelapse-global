'use client';

import { useState } from 'react';
import {
  AlertTriangle, X, Copy, Check, ExternalLink, RefreshCw,
  HelpCircle, ChevronDown, ChevronUp, ShieldAlert
} from 'lucide-react';

export default function ErrorModal({
  isOpen,
  onClose,
  errorData,
  onRetry,
}) {
  const [copied, setCopied] = useState(false);
  const [showTechnical, setShowTechnical] = useState(true);

  if (!isOpen || !errorData) return null;

  const {
    title = 'Prompt Generation Failed',
    message = 'An unexpected error occurred while communicating with the AI model.',
    raw = '',
    code = 'ERROR',
  } = errorData;

  const handleCopyDetails = async () => {
    const errorLog = `====================================
AI TIMELAPSE GENERATOR - ERROR REPORT
Timestamp: ${new Date().toISOString()}
Code: ${code}
Title: ${title}
Summary: ${message}
Technical Details:
${raw || message}
====================================`;

    try {
      await navigator.clipboard.writeText(errorLog);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      alert('Could not copy automatically. Please copy the text manually.');
    }
  };

  const isRateLimit = message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED');
  const isAuth = message.includes('API Key') || message.includes('INVALID');
  const isServerBusy = message.includes('503') || message.includes('demand');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-5 sm:p-7 border border-red-500/30 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 tracking-wider">
                  {code}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-4 flex-grow pr-1">
          {/* Main Error Message */}
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-200 leading-relaxed font-medium">
            {message}
          </div>

          {/* Contextual Guidance */}
          <div className="p-4 rounded-2xl bg-secondary/40 border border-white/5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <HelpCircle size={14} className="text-primary" />
              <span>Recommended Solutions:</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed pl-1">
              {isRateLimit && (
                <>
                  <li><strong>Wait 30-60 seconds:</strong> Free Gemini API keys have a 15 request/minute limit. Waiting momentarily will reset the window.</li>
                  <li><strong>Multiple Users Sharing Key:</strong> If multiple team members use the same free API key concurrently, they will trigger rate limits faster. Have each member generate their own free key.</li>
                </>
              )}
              {isAuth && (
                <>
                  <li>Check your API key in Google AI Studio to ensure it hasn't expired or had restrictions applied.</li>
                  <li>Re-copy the API key and paste it cleanly without leading or trailing spaces.</li>
                </>
              )}
              {isServerBusy && (
                <li>Google's AI data centers are experiencing temporary high traffic. Clicking <strong>Try Again</strong> in a few moments will typically succeed.</li>
              )}
              {!isRateLimit && !isAuth && !isServerBusy && (
                <>
                  <li>Check your internet connection and verify Google AI Studio is accessible.</li>
                  <li>If uploading an image, ensure it is under 10MB in JPG, PNG, or WebP format.</li>
                </>
              )}
            </ul>
          </div>

          {/* Technical Details (Expandable) */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/40">
            <button
              type="button"
              onClick={() => setShowTechnical(!showTechnical)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <span>Exact Technical Error Log</span>
              {showTechnical ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showTechnical && (
              <div className="px-4 pb-3">
                <pre className="text-[11px] font-mono text-muted-foreground/90 whitespace-pre-wrap break-words bg-black/50 p-3 rounded-xl border border-white/5 max-h-36 overflow-y-auto select-all">
                  {raw || message}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyDetails}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              copied
                ? 'bg-green-500/20 text-green-400 border-green-500/40'
                : 'bg-secondary hover:bg-secondary/80 text-foreground border-white/10'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Error Details Copied!' : 'Copy Error Details'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary/15 text-primary hover:bg-primary/25 text-xs font-semibold border border-primary/25 transition-all"
            >
              <span>Google AI Studio</span>
              <ExternalLink size={12} />
            </a>

            {onRetry && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRetry();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Try Again</span>
              </button>
            )}

            {!onRetry && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
