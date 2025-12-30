"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("Navigation");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/en/login");
      router.refresh(); // Ensure middleware re-runs
    } catch (error) {
      console.error("Logout failed", error);
      // Fallback
      router.push("/en/login");
    }
  };

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
