"use client";

import { LogOut, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface LogoutButtonProps {
  isAuthenticated: boolean;
  locale: string;
}

export function LogoutButton({ isAuthenticated, locale }: LogoutButtonProps) {
  const router = useRouter();
  // Using "Navigation" namespace as before, ensure keys exist or use falback
  const t = useTranslations("Navigation"); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // Redirect to login or home after logout
      router.push(`/${locale}/login`);
      router.refresh(); 
    } catch (error) {
      console.error("Logout failed", error);
      router.push(`/${locale}/login`);
    }
  };

  const handleLogin = () => {
    router.push(`/${locale}/login`);
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="rounded-md p-2 text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
        aria-label="Sign In"
        title="Sign In"
      >
        <div className="h-5 w-5 flex items-center justify-center">
          <LogIn className="h-5 w-5" />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-md p-2 text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
      aria-label={t("logout")}
      title={t("logout")}
    >
      <div className="h-5 w-5 flex items-center justify-center">
        <LogOut className="h-5 w-5" />
      </div>
    </button>
  );
}
