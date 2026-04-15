import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-3xl text-gold">✦</span>
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase">Begin Your Journey</h1>
        <p className="text-sm text-muted-foreground">Free to start — no credit card required</p>
      </div>

      {/* Form skeleton */}
      <form className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <button
          type="submit"
          className={buttonVariants({ size: "lg", className: "w-full tracking-widest uppercase text-sm mt-2" })}
        >
          Create Account
        </button>
      </form>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:text-gold/80 underline underline-offset-4">
          Sign In
        </Link>
      </p>
    </div>
  );
}
