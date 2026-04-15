const settingGroups = [
  {
    title: "Account",
    items: [
      { label: "Full Name", value: "Alexandra Chen" },
      { label: "Email", value: "alexandra@email.com" },
      { label: "Date of Birth", value: "June 15, 1990" },
      { label: "Birth City", value: "New York" },
    ],
  },
  {
    title: "Subscription",
    items: [
      { label: "Plan", value: "Free" },
      { label: "Trial", value: "Not started" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "Daily email insights", value: "On" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 px-5 pt-8 pb-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">Account</p>
        <h1 className="text-2xl font-light">Settings</h1>
      </div>

      {/* Upgrade banner */}
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gold">Upgrade to Premium</p>
          <p className="text-xs text-muted-foreground mt-0.5">Unlock full report & unlimited chat</p>
        </div>
        <button className="text-xs tracking-widest uppercase text-primary-foreground bg-gold hover:bg-gold/90 px-3 py-1.5 rounded-lg font-medium transition-colors">
          Upgrade
        </button>
      </div>

      {/* Setting groups */}
      {settingGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">{group.title}</p>
          <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-4 py-3">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <button className="mt-2 text-sm text-destructive hover:text-destructive/80 underline underline-offset-4 self-start">
        Sign Out
      </button>
    </div>
  );
}
