const suggestedQuestions = [
  "What should I focus on this month?",
  "How does my Year 4 affect my career?",
  "What challenges should I prepare for?",
  "Is this a good year for big changes?",
];

const placeholderMessages = [
  {
    role: "assistant",
    content:
      "Greetings, Alexandra. The stars have aligned to bring you to this moment. As you walk through your Personal Year 4, know that every question you carry is a seed waiting for the right soil. What weighs on your heart today?",
  },
];

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex flex-col gap-0.5 px-5 pt-8 pb-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm">✦</span>
          <h1 className="text-sm font-medium tracking-widest uppercase">Oracle Chat</h1>
        </div>
        <p className="text-xs text-muted-foreground pl-5">Free plan · 1 message per day</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-5 py-5">
        {placeholderMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gold/15 text-foreground rounded-br-sm"
                  : "bg-card border border-border text-foreground/90 italic rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Suggested questions */}
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-xs text-muted-foreground tracking-wide">Suggested questions:</p>
          <div className="flex flex-col gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                className="text-left text-xs text-muted-foreground border border-border/50 rounded-lg px-3 py-2 hover:border-gold/30 hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 px-5 py-4 border-t border-border">
        <div className="flex gap-2 items-end">
          <textarea
            rows={1}
            placeholder="Ask the Oracle..."
            className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 min-h-[44px] max-h-32"
          />
          <button className="shrink-0 h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-base hover:bg-primary/90 transition-colors">
            ↑
          </button>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-2 text-center tracking-wide">
          1 free message today · Resets at midnight UTC
        </p>
      </div>
    </div>
  );
}
