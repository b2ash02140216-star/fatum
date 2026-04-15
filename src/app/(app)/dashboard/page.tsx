import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardPage() {
  // Placeholder data — will come from Supabase
  const user = { name: "Alexandra" };
  const personalYearNumber = 4;
  const dailyTheme = "Foundation & Discipline";
  const dailyMessage =
    "Today, the universe calls you to build with intention. Focus on the structures that support your long-term vision — every small, deliberate action compounds into something enduring.";

  return (
    <div className="flex flex-col gap-6 px-5 pt-8 pb-6">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Good morning</p>
        <h1 className="text-2xl font-light">
          {user.name} <span className="text-gold">✦</span>
        </h1>
      </div>

      {/* Personal Year Card */}
      <div className="relative rounded-2xl border border-gold/20 bg-card overflow-hidden glow-violet">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[oklch(0.48_0.12_285/6%)]"
        />
        <div className="relative p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">2026 Personal Year</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-6xl font-light text-gold glow-gold">{personalYearNumber}</span>
                <span className="text-lg text-muted-foreground">{dailyTheme}</span>
              </div>
            </div>
          </div>
          <Link
            href="/report"
            className={buttonVariants({ variant: "outline", size: "sm", className: "self-start tracking-widest uppercase text-xs border-gold/30 text-gold hover:bg-gold/10" })}
          >
            View Full Report →
          </Link>
        </div>
      </div>

      {/* Daily Oracle Card */}
      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gold text-xs">✦</span>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Today's Cosmic Guidance</p>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed italic">"{dailyMessage}"</p>
        <div className="h-px bg-border" />
        <Link
          href="/chat"
          className={buttonVariants({ size: "sm", className: "self-start tracking-widest uppercase text-xs" })}
        >
          Ask Fatum →
        </Link>
      </div>

      {/* Quick nav hints */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/report"
          className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2 hover:border-gold/30 transition-colors"
        >
          <span className="text-gold text-base">📜</span>
          <p className="text-xs font-medium tracking-wide">Your Report</p>
          <p className="text-xs text-muted-foreground">Personal Year deep dive</p>
        </Link>
        <Link
          href="/chat"
          className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2 hover:border-gold/30 transition-colors"
        >
          <span className="text-gold text-base">💬</span>
          <p className="text-xs font-medium tracking-wide">Oracle Chat</p>
          <p className="text-xs text-muted-foreground">Ask anything</p>
        </Link>
      </div>
    </div>
  );
}
