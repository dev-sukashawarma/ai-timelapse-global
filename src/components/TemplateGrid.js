'use client';
import { translations } from "@/lib/translations";

export default function TemplateGrid({ onSelect, language = 'en' }) {
  const t = translations[language] || translations.en;
  const templates = t.templates.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          type="button"
          onClick={() => onSelect(tpl)}
          className="glass-panel text-left p-5 rounded-2xl hover:bg-white/5 transition-all group border border-white/5 hover:border-primary/50 cursor-pointer flex flex-col"
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{tpl.emoji}</span>
              <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                {tpl.category}
              </span>
            </div>
            {tpl.veoTag && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 tracking-wide">
                ⚡ {tpl.veoTag}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
            {tpl.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-grow">
            {tpl.description}
          </p>

          {/* CTA */}
          <div className="mt-3 pt-3 border-t border-white/5 text-xs text-primary/60 group-hover:text-primary transition-colors font-medium">
            {t.templates.useTemplate}
          </div>
        </button>
      ))}
    </div>
  );
}
