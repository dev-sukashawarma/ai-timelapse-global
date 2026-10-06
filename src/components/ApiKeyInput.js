'use client';
import { useState, useEffect } from 'react';
import { Key, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { translations } from '@/lib/translations';

export default function ApiKeyInput({ onKeySaved, language = 'en' }) {
  const [keyValue, setKeyValue] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [isExpanded, setIsExpanded] = useState(false);

  const t = translations[language] || translations.id;

  useEffect(() => {
    const stored = localStorage.getItem('GEMINI_API_KEY');
    if (stored) {
      setTimeout(() => {
        setKeyValue(stored);
        setStatus('success');
        onKeySaved(stored);
        setIsExpanded(false); // Auto-collapse when key already exists
      }, 0);
    }
  }, [onKeySaved]);

  const handleSave = () => {
    const trimmed = keyValue.trim();
    if (!trimmed) {
      setStatus('error');
      return;
    }
    localStorage.setItem('GEMINI_API_KEY', trimmed);
    setStatus('success');
    setIsExpanded(false);
    onKeySaved(trimmed);
  };

  const handleClear = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setKeyValue('');
    setStatus('idle');
    setIsExpanded(true);
    onKeySaved('');
  };

  // ── Collapsed state (key is active) ──────────────────────────────────────
  if (status === 'success' && !isExpanded) {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-green-500/10 border border-green-500/30 transition-all shadow-sm">
        <div className="flex items-center gap-2.5">
          <CheckCircle size={16} className="text-green-400 shrink-0" />
          <span className="text-sm font-semibold text-green-400">{t.apiKey.activeText}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">{t.apiKey.activeSub}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="text-xs text-primary hover:text-primary/80 font-medium px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer ml-4 shrink-0"
        >
          {t.apiKey.changeBtn}
        </button>
      </div>
    );
  }

  // ── Expanded state (set or change key) ───────────────────────────────────
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 transition-all border border-primary/20 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Key size={13} className="text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground">{t.apiKey.label}</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">{t.apiKey.sublabel}</span>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all shrink-0"
        >
          {t.apiKey.getFree} <ExternalLink size={11} />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="password"
          value={keyValue}
          onChange={(e) => { setKeyValue(e.target.value); setStatus('idle'); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder={t.apiKey.placeholder}
          className="flex-1 glass-input px-4 py-2.5 rounded-xl text-sm min-w-0"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            type="button"
            className="flex-1 sm:flex-none bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
          >
            {t.apiKey.saveBtn}
          </button>
          {status === 'success' && (
            <button
              onClick={() => setIsExpanded(false)}
              type="button"
              className="bg-secondary text-muted-foreground px-3.5 py-2.5 rounded-xl text-sm cursor-pointer hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
          {keyValue && status !== 'success' && (
            <button
              onClick={handleClear}
              type="button"
              className="bg-destructive/15 text-destructive hover:bg-destructive/25 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-colors"
            >
              {t.apiKey.clearBtn}
            </button>
          )}
        </div>
      </div>

      {status === 'error' && (
        <p className="text-destructive text-xs mt-2.5 flex items-center gap-1.5">
          <XCircle size={13} /> {t.apiKey.emptyError}
        </p>
      )}
      {status === 'success' && isExpanded && (
        <p className="text-green-400 text-xs mt-2.5 flex items-center gap-1.5">
          <CheckCircle size={13} /> {t.apiKey.savedSuccess}
        </p>
      )}
    </div>
  );
}
