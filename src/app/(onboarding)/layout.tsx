export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col px-6 py-8 max-w-lg mx-auto w-full">
      {children}
    </div>
  );
}
