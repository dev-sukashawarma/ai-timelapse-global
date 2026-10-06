'use client';

import { useState, useRef, useCallback } from 'react';
import { ImageIcon, X, UploadCloud, Lightbulb, CheckCircle2 } from 'lucide-react';
import { translations } from '@/lib/translations';

const MAX_SIZE_MB = 10;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function ImageUpload({ onImageReady, onHintChange, hint, language = 'en' }) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const t = translations[language] || translations.id;

  const processFile = useCallback((file) => {
    setError('');
    if (!file) return;

    if (!ACCEPTED.includes(file.type)) {
      setError(language === 'en' ? 'Unsupported format. Use JPG, PNG, or WebP.' : 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(language === 'en' ? `File too large. Maximum ${MAX_SIZE_MB}MB.` : `Ukuran file terlalu besar. Maksimal ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreview(dataUrl);
      onImageReady(dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageReady, language]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleFileChange = (e) => processFile(e.target.files?.[0]);

  const handleClear = () => {
    setPreview(null);
    setError('');
    onImageReady(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const chips = [
    t.imageUpload.chip1,
    t.imageUpload.chip2,
    t.imageUpload.chip3,
    t.imageUpload.chip4,
    t.imageUpload.chip5,
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Drop Zone */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200
            flex flex-col items-center justify-center gap-3 py-10 px-6 text-center
            ${dragOver
              ? 'border-primary bg-primary/10 scale-[1.01]'
              : 'border-white/15 bg-white/3 hover:border-primary/50 hover:bg-white/5'
            }
          `}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-md
            ${dragOver ? 'bg-primary/30 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
            <UploadCloud size={28} />
          </div>
          <div>
            <p className="font-semibold text-sm sm:text-base text-foreground">
              {dragOver ? t.imageUpload.dragTitle : t.imageUpload.browseTitle}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t.imageUpload.subtitle}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload-input"
          />
        </div>
      ) : (
        /* Preview */
        <div className="relative rounded-2xl overflow-hidden border border-white/15 group shadow-xl">
          <img
            src={preview}
            alt={language === 'en' ? 'Uploaded image preview' : 'Preview gambar'}
            className="w-full max-h-80 object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur rounded-xl text-sm font-medium hover:bg-white/25 transition-colors cursor-pointer text-white"
            >
              <ImageIcon size={15} /> {t.imageUpload.changePhoto}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-destructive/25 backdrop-blur rounded-xl text-sm font-medium text-destructive hover:bg-destructive/40 transition-colors cursor-pointer"
            >
              <X size={15} /> {t.imageUpload.removePhoto}
            </button>
          </div>
          {/* Status Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-[11px] font-semibold text-green-400 flex items-center gap-1.5 shadow">
            <CheckCircle2 size={12} /> {t.imageUpload.readyBadge}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-destructive text-xs flex items-center gap-1.5 font-medium">
          ⚠ {error}
        </p>
      )}

      {/* Optional hint input — shown after image is uploaded */}
      {preview && (
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
          <div>
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>{t.imageUpload.contextTitle}</span>
              <span className="text-muted-foreground text-xs font-normal">{t.imageUpload.contextOptional}</span>
            </label>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {t.imageUpload.contextSubtitle}
            </p>
          </div>
          <div className="relative">
            <Lightbulb size={15} className="absolute left-3 top-3.5 text-amber-400/80 pointer-events-none" />
            <input
              type="text"
              value={hint}
              onChange={(e) => onHintChange(e.target.value)}
              placeholder={t.imageUpload.contextPlaceholder}
              className="w-full glass-input text-sm px-4 py-3 pl-9 rounded-xl"
            />
          </div>
          {/* Example chips */}
          <div className="flex flex-wrap gap-1.5">
            {chips.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onHintChange(hint ? `${hint}, ${example}` : example)}
                className="text-[11px] px-3 py-1 rounded-full bg-secondary/80 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all cursor-pointer"
              >
                + {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
