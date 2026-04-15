const sections = [
  {
    title: "What This Year Means",
    preview:
      "Your Personal Year 4 is a year of building — laying down the foundations that will support your future. The universe calls for patience, discipline, and a methodical approach to everything you touch.",
    locked: false,
  },
  {
    title: "Love & Relationships",
    preview:
      "In relationships, Year 4 energy asks you to invest in depth over breadth. Existing bonds deepen when nurtured with consistency...",
    locked: false,
  },
  {
    title: "Career & Purpose",
    preview:
      "This is your most productive year for career advancement. The work you put in now — the skills you sharpen, the systems you build...",
    locked: false,
  },
  {
    title: "Challenges & Growth",
    preview: "Unlock to reveal your key challenges and how to transform them into your greatest strengths.",
    locked: true,
  },
  {
    title: "Monthly Breakdown",
    preview: "A month-by-month cosmic guide to navigate 2026 with clarity and intention.",
    locked: true,
  },
];

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-6 px-5 pt-8 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Your Cosmic Report</p>
        <h1 className="text-2xl font-light">Personal Year <span className="text-gold">4</span></h1>
        <p className="text-sm text-muted-foreground">Foundation & Discipline · 2026</p>
      </div>

      {/* Numerology badge */}
      <div className="flex items-center gap-4 rounded-xl border border-gold/20 bg-card p-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/20 shrink-0">
          <span className="text-3xl font-light text-gold">4</span>
        </div>
        <div>
          <p className="text-sm font-medium">The Builder</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Structure · Stability · Hard Work · Legacy
          </p>
        </div>
      </div>

      {/* Report sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`rounded-xl border bg-card p-5 flex flex-col gap-3 ${
              section.locked ? "border-border/40 opacity-70" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-wide">{section.title}</h2>
              {section.locked && (
                <span className="text-xs tracking-widest uppercase text-muted-foreground border border-border rounded-full px-2 py-0.5">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.preview}</p>
            {section.locked && (
              <button className="self-start text-xs text-gold hover:text-gold/80 underline underline-offset-4 tracking-wide">
                Unlock with Premium →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
