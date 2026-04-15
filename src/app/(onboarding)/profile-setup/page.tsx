import { buttonVariants } from "@/components/ui/button";

export default function ProfileSetupPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-muted-foreground tracking-widest uppercase">
          <span>Your Profile</span>
          <span>1 of 1</span>
        </div>
        <div className="h-0.5 w-full bg-border rounded-full">
          <div className="h-full w-3/4 bg-gold rounded-full transition-all" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-light tracking-wide">Tell us about yourself</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your name and birth details unlock your Personal Year Number and cosmic report.
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Full Name</label>
          <input
            type="text"
            placeholder="As it appears on your birth certificate"
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Date of Birth</label>
          <input
            type="date"
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Birth City</label>
          <input
            type="text"
            placeholder="City where you were born"
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <button
          type="submit"
          className={buttonVariants({ size: "lg", className: "w-full tracking-widest uppercase text-sm mt-2" })}
        >
          Reveal My Numbers
        </button>
      </form>
    </div>
  );
}
