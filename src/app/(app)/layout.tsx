export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col max-w-2xl mx-auto w-full font-mono">
      {children}
    </div>
  );
}
