"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh(); // Refresh to update middleware state
        router.push("/");
      } else {
        setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center p-8 text-center pt-12">
          <div className="mb-6 rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
            <Lock className="h-8 w-8 text-orange-600 dark:text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t("description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-0">
          <div className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className="w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-zinc-800 dark:text-zinc-50 dark:focus:border-orange-500"
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-red-500 text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "..." : t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
