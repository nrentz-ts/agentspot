"use client";

export function WelcomeCard() {
  const hour = new Date().getHours();

  const emoji =
    hour < 12 ? "🌅" : hour < 17 ? "☀️" : "🌙";

  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const headline = "What would you like to get done?";

  return (
    <div className="space-y-1">
      <p className="text-[14px] font-medium text-foreground/60">
        {emoji} {greeting}, Sarah
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {headline}
      </h1>
    </div>
  );
}
