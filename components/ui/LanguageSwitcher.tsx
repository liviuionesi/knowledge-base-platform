"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { FlagUS, FlagFR } from "@/components/icons/Flags";

export function LanguageSwitcher() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="rounded-md p-2 hover:bg-[var(--accent)] transition-colors"
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
    >
      <div className="h-5 w-5 rounded-full overflow-hidden relative shadow-sm">
        {locale === "en" ? (
          <FlagUS className="w-full h-full object-cover scale-150" />
        ) : (
          <FlagFR className="w-full h-full object-cover scale-150" />
        )}
      </div>
    </button>
  );
}
