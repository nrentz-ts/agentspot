"use client";

export function WelcomeCard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">
        {greeting}, Sarah
      </h1>
    </div>
  );
}
