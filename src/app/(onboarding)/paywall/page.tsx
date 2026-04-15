import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const features = [
  "Full AI-generated Personal Year Report",
  "Unlimited daily Oracle chat",
  "Monthly cosmic breakdown",
  "Save & export your report",
];

export default function PaywallPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20">
          <span className="text-3xl text-gold">✦</span>
        </div>
        <h1 className="text-2xl font-light tracking-wide">Your Report is Ready</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlock the full depth of your cosmic journey with Fatum Premium.
        </p>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-3">
        {/* Annual — highlighted */}
        <div className="relative rounded-xl border border-gold/40 bg-gold/5 p-5 flex flex-col gap-3">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-gold text-primary-foreground text-xs tracking-widest uppercase px-3 py-1 rounded-full font-medium">
              Best Value
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium">Annual</p>
              <p className="text-xs text-muted-foreground">$3.33 / month</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-light text-gold">$39.99</p>
              <p className="text-xs text-muted-foreground">/ year</p>
            </div>
          </div>
        </div>

        {/* Monthly */}
        <div className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Monthly</p>
            <p className="text-xs text-muted-foreground">Billed each month</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-light">$6.99</p>
            <p className="text-xs text-muted-foreground">/ month</p>
          </div>
        </div>
      </div>

      {/* Features list */}
      <ul className="flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="text-gold text-xs">✦</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          className={buttonVariants({ size: "lg", className: "w-full tracking-widest uppercase text-sm" })}
        >
          Start 3-Day Free Trial
        </button>
        <Link
          href="/dashboard"
          className="text-center text-xs text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-4 tracking-wide"
        >
          Continue with free plan
        </Link>
      </div>
    </div>
  );
}
