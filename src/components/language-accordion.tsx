import React from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";

export function LanguageAccordion({ lang, idx }: { lang: any; idx: number }) {
  const [open, setOpen] = React.useState(false);

  const icon =
    lang.icon === "IN"
      ? (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded border border-[#06B6D4] bg-transparent font-bold text-[#06B6D4] text-xs">
          IN
        </span>
      )
      : lang.icon === "GB"
        ? (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded border border-[#06B6D4] bg-transparent font-bold text-[#06B6D4] text-xs">
            <Globe className="w-5 h-5 text-[#06B6D4]" />
          </span>
        )
        : null;

  return (
    <div className="w-full max-w-[700px] mx-auto mb-4">
      <button
        className={`flex items-center justify-between w-full px-6 py-4 bg-transparent border border-slate-200 dark:border-[#06B6D4]/20 rounded-lg shadow-md focus:outline-none transition-all ${open ? "rounded-b-none" : "rounded-b-lg"}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`lang-panel-${idx}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-semibold text-base text-slate-700 dark:text-[#E5E7EB]">{lang.name}</span>
        </div>
  <span className="ml-auto px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-xs font-semibold bg-transparent">{lang.level}</span>
  <span className="ml-4">{open ? <ChevronUp className="w-5 h-5 text-black dark:text-[#E5E7EB]" /> : <ChevronDown className="w-5 h-5 text-black dark:text-[#E5E7EB]" />}</span>
      </button>
      {open && (
        <div
          id={`lang-panel-${idx}`}
          className="rounded-b-lg bg-transparent border-x border-b border-slate-200 dark:border-[#06B6D4]/20 shadow-md px-6 pt-4 pb-6 text-left"
        >
          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-transparent mb-4">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-border to-border"
              style={{ width: lang.proficiencyBar || '100%' }}
            ></div>
          </div>
          {/* About Section */}
          <div className="text-base font-bold text-slate-700 dark:text-[#E5E7EB] mb-2">
            About {lang.name}:
          </div>
          <div className="text-base text-slate-700 dark:text-[#E5E7EB] mb-4">
            {lang.description}
          </div>
          {/* Learn More Link */}
          {lang.link && (
            <a
              href={lang.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground underline text-xs font-medium hover:text-foreground mb-2"
            >
              Learn more about {lang.name} history
            </a>
          )}
        </div>
      )}
    </div>
  );
}