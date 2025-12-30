"use client";

export function FireBirdBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-orange-50/30 to-zinc-100 dark:from-zinc-950 dark:via-orange-950/20 dark:to-zinc-900" />
      
      {/* Animated fire bird effect */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] opacity-20 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-phenix-orange/40 via-orange-500/20 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
      
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] opacity-15 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-radial from-orange-600/30 via-red-500/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.02]" />
    </div>
  );
}
