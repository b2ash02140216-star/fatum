"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "⌂" },
  { href: "/report", label: "Report", icon: "📜" },
  { href: "/chat", label: "Chat", icon: "✦" },
  { href: "/settings", label: "Settings", icon: "◎" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg border-t border-border bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`text-lg leading-none ${isActive && item.href === "/chat" ? "glow-gold" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-widest uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
