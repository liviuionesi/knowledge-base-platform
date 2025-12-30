"use client";

export function FireBirdBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[var(--background)]">
      {/* Gradient background - Dark mode only */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-[var(--background)] via-[#131b2e] to-[var(--background)]" />
      
      {/* Animated fire bird effect - Dark mode only */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] opacity-20 hidden dark:block">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--phenix-orange)]/40 via-[var(--phenix-orange)]/20 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
      
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] opacity-15 hidden dark:block">
        <div className="absolute inset-0 bg-gradient-radial from-[var(--phenix-orange)]/30 via-[var(--phenix-orange)]/15 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>
      
      {/* Grid pattern overlay - Dark mode only */}
      <div className="absolute inset-0 hidden dark:block bg-grid-pattern opacity-[0.15]" />
    </div>
  );
}
