"use client";

import { useState, useRef, useEffect } from "react";

type Phase = "gate" | "calculating" | "oracle";

type Line = {
  id: number;
  text: string;
  type: "data" | "oracle" | "user";
};

const CALC_LINES = [
  "loading pythagorean cipher table ............. OK",
  "parsing birth_date=1990-06-15  birth_time=03:22  lat=40.71  lng=-74.00",
  "computing name vibration: A(1) L(3) E(5) → 35 → 8",
  "computing personal year: (6 + 1+5 + 2+0+2+6) → 22 → 4",
  "cross-referencing master numbers [11, 22] ...... none",
  "loading archetype: THE_BUILDER ............... OK",
  "generating oracle context vector ............. OK",
  "streaming first inference ─────────────────────",
];

let lineCounter = 0;
const mkLine = (text: string, type: Line["type"]): Line => ({
  id: lineCounter++,
  text,
  type,
});

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

export default function FatumConsole() {
  const [phase, setPhase] = useState<Phase>("gate");
  const [showGate, setShowGate] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [calcIndex, setCalcIndex] = useState(0);
  const [chatInput, setChatInput] = useState("");

  // birth form
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [city, setCity] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (showGate) setTimeout(() => nameRef.current?.focus(), 320);
  }, [showGate]);

  useEffect(() => {
    if (phase === "oracle") setTimeout(() => chatRef.current?.focus(), 200);
  }, [phase]);

  // stream calc lines
  useEffect(() => {
    if (phase !== "calculating") return;
    if (calcIndex < CALC_LINES.length) {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, mkLine(CALC_LINES[calcIndex], "data")]);
        setCalcIndex((i) => i + 1);
      }, calcIndex === 0 ? 60 : 130 + Math.random() * 90);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          mkLine(
            "Your Personal Year is 4 — The Year of the Builder. You are being called to lay foundations that will outlast this season. The universe rewards your discipline right now, not your speed. What would you like to understand about this year?",
            "oracle"
          ),
        ]);
        setPhase("oracle");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase, calcIndex]);

  function submitGate(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!name || !dob) return;
    setShowGate(false);
    setTimeout(() => {
      const timeStr = hour && minute ? ` · ${hour}:${minute}` : "";
      const locStr = lat && lng ? ` · ${parseFloat(lat).toFixed(2)},${parseFloat(lng).toFixed(2)}` : city ? ` · ${city}` : "";
      setLines([mkLine(`> ${name} · ${dob}${timeStr}${locStr}`, "user")]);
      setPhase("calculating");
      setCalcIndex(0);
    }, 300);
  }

  function sendChat(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    // Gate: if no profile yet, intercept
    if (phase === "gate") { setShowGate(true); return; }
    const q = chatInput.trim();
    setChatInput("");
    setLines((prev) => [
      ...prev,
      mkLine(`> ${q}`, "user"),
      mkLine(
        "In your Year 4, career decisions carry unusual weight. The structures you put in place between now and December will define your professional reality for the next four years. This is not a year for shortcuts.",
        "oracle"
      ),
    ]);
  }

  return (
    <div className="relative flex flex-col h-screen bg-black font-mono overflow-hidden select-none">

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-center" style={{ paddingTop: "5%" }}>
        <div style={{ width: 560, height: 560, background: "radial-gradient(circle, oklch(0.48 0.12 285 / 10%) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 700, height: 260, background: "radial-gradient(ellipse, oklch(0.78 0.14 88 / 5%) 0%, transparent 70%)", filter: "blur(30px)" }} />

      {/* ── Top-right Sign In button (always visible) ─────────── */}
      <div className="absolute top-5 right-5 z-10">
        <button
          onClick={() => setShowGate(true)}
          className="text-xs tracking-[0.18em] uppercase px-4 py-2 rounded-full border transition-all duration-200 hover:bg-white hover:text-black"
          style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.25)" }}
        >
          Sign In
        </button>
      </div>

      {/* ── GATE PHASE: logo + centered input ─────────────────── */}
      {phase === "gate" && (
        <div className="flex flex-col h-full">
          {/* Logo — upper 55% */}
          <div className="flex flex-col items-center justify-center gap-3" style={{ height: "55%" }}>
            <div
              className="text-[5.5rem] leading-none"
              style={{ color: "oklch(0.78 0.14 88)", filter: "drop-shadow(0 0 32px oklch(0.78 0.14 88 / 50%)) drop-shadow(0 0 80px oklch(0.78 0.14 88 / 20%))" }}
            >
              ✦
            </div>
            <h1 className="text-[3.2rem] sm:text-[4.5rem] font-light tracking-[0.4em] text-white uppercase leading-none">
              FATUM
            </h1>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "oklch(1 0 0 / 20%)" }}>
              numerological oracle · powered by ai
            </p>
          </div>

          {/* Input trigger — center-bottom */}
          <div className="flex flex-col items-center px-5" style={{ height: "45%", paddingTop: "4%" }}>
            <div className="w-full max-w-sm flex flex-col items-center gap-3">
              <ChatBar
                value={chatInput}
                onChange={setChatInput}
                onSubmit={sendChat}
                placeholder="ask the oracle anything..."
                inputRef={chatRef}
              />
              <p className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "oklch(1 0 0 / 14%)" }}>
                your cosmic report awaits
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── ACTIVE PHASES: compact header + terminal + chat ───── */}
      {phase !== "gate" && (
        <>
          <div className="shrink-0 flex items-center gap-3 px-5 sm:px-8 pt-5 pb-4 border-b" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
            <span style={{ color: "oklch(0.78 0.14 88)" }} className="text-base">✦</span>
            <span className="tracking-[0.3em] text-xs uppercase" style={{ color: "oklch(1 0 0 / 35%)" }}>FATUM</span>
            <span className="text-xs ml-auto tracking-wide" style={{ color: "oklch(1 0 0 / 15%)" }}>personal year 4 · 2026</span>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-8 pt-5 pb-2 flex flex-col gap-2.5 max-w-2xl w-full mx-auto">
            {lines.map((line) => (
              <div key={line.id} className="line-in leading-relaxed">
                {line.type === "data" && (
                  <p className="text-[11px] tracking-wide" style={{ color: "oklch(1 0 0 / 18%)" }}>{line.text}</p>
                )}
                {line.type === "user" && (
                  <p className="text-sm" style={{ color: "oklch(1 0 0 / 55%)" }}>{line.text}</p>
                )}
                {line.type === "oracle" && (
                  <div className="mt-3 mb-1 border-l-2 pl-4" style={{ borderColor: "oklch(0.78 0.14 88 / 35%)" }}>
                    <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "oklch(0.78 0.14 88 / 55%)" }}>fatum ✦</p>
                    <p className="text-sm leading-[1.85]" style={{ color: "oklch(1 0 0 / 85%)" }}>{line.text}</p>
                  </div>
                )}
              </div>
            ))}
            {phase === "calculating" && calcIndex < CALC_LINES.length && (
              <p className="text-xs" style={{ color: "oklch(1 0 0 / 15%)" }}><span className="cursor-blink">█</span></p>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="shrink-0 px-5 sm:px-8 py-4 border-t max-w-2xl w-full mx-auto" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
            <ChatBar
              value={chatInput}
              onChange={setChatInput}
              onSubmit={sendChat}
              placeholder={phase === "calculating" ? "calculating..." : "ask anything about your year..."}
              disabled={phase === "calculating"}
              inputRef={chatRef}
            />
          </div>
        </>
      )}

      {/* ── Info gate modal ───────────────────────────────────── */}
      {showGate && (
        <div
          className="absolute inset-0 flex items-center justify-center px-5"
          style={{ background: "oklch(0 0 0 / 72%)", backdropFilter: "blur(10px)", zIndex: 50 }}
          onClick={() => setShowGate(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border p-6 flex flex-col gap-5"
            style={{ background: "oklch(0.11 0.025 285)", borderColor: "oklch(1 0 0 / 10%)", boxShadow: "0 32px 80px oklch(0 0 0 / 60%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={submitGate} className="flex flex-col gap-5">
              <div className="flex flex-col gap-0.5">
                <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "oklch(0.78 0.14 88 / 60%)" }}>fatum ✦</p>
                <h2 className="text-white text-lg font-light tracking-wide">Begin your reading</h2>
                <p className="text-xs" style={{ color: "oklch(1 0 0 / 35%)" }}>Required to generate your Personal Year Number</p>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Name */}
                <Field label="Your Name *">
                  <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name or full name"
                    className="field-input"
                  />
                </Field>

                {/* Date of Birth */}
                <Field label="Date of Birth *">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="field-input"
                    style={{ colorScheme: "dark" }}
                  />
                </Field>

                {/* Birth Time */}
                <Field label="Birth Time">
                  <div className="flex items-center gap-2">
                    <NativeSelect
                      value={hour}
                      onChange={setHour}
                      placeholder="HH"
                      options={HOURS}
                    />
                    <span className="text-white/30 text-base font-light shrink-0">:</span>
                    <NativeSelect
                      value={minute}
                      onChange={setMinute}
                      placeholder="MM"
                      options={MINUTES}
                    />
                  </div>
                </Field>

                {/* Birth City */}
                <Field label="Birth City">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New York"
                    className="field-input"
                  />
                </Field>

              </div>

              <button
                type="submit"
                disabled={!name || !dob}
                className="h-12 w-full rounded-xl text-sm tracking-[0.2em] uppercase font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "oklch(0.78 0.14 88)", color: "oklch(0.08 0.02 285)" }}
              >
                Reveal My Numbers
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "oklch(1 0 0 / 30%)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function NativeSelect({ value, onChange, placeholder, options }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          background: "oklch(1 0 0 / 5%)",
          border: "1px solid oklch(1 0 0 / 8%)",
          borderRadius: "0.75rem",
          height: "2.75rem",
          width: "100%",
          padding: "0 1rem",
          fontSize: "0.875rem",
          color: value ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)",
          outline: "none",
          textAlign: "center",
        }}
      >
        <option value="" disabled style={{ color: "#888", background: "#1a1a2e" }}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ color: "#fff", background: "#1a1a2e" }}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChatBar({
  value, onChange, onSubmit, placeholder, disabled, inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: { preventDefault(): void }) => void;
  placeholder: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-200"
        style={{ background: "oklch(1 0 0 / 4%)", borderColor: "oklch(1 0 0 / 10%)" }}
      >
        <span style={{ color: "oklch(0.78 0.14 88 / 55%)" }} className="text-sm shrink-0 select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-sm disabled:opacity-30"
          style={{ color: "rgba(255,255,255,0.75)", caretColor: "oklch(0.78 0.14 88)" }}
        />
        {value.trim() && !disabled && (
          <button
            type="submit"
            className="shrink-0 text-[10px] tracking-[0.2em] uppercase transition-colors"
            style={{ color: "oklch(0.78 0.14 88 / 70%)" }}
          >
            enter ↵
          </button>
        )}
        {!value && !disabled && (
          <span className="cursor-blink shrink-0 select-none" style={{ color: "oklch(1 0 0 / 15%)" }}>█</span>
        )}
      </div>
    </form>
  );
}
