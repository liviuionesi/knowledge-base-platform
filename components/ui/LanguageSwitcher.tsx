"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { FlagGB, FlagFR, FlagDE, FlagIT } from "@/components/icons/Flags";

export function LanguageSwitcher() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const locales = ["en", "fr", "de", "it"];
    const currentIndex = locales.indexOf(locale);
    const nextLocale = locales[(currentIndex + 1) % locales.length];
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const getFlag = () => {
    switch (locale) {
      case "fr": return <FlagFR className="w-full h-full object-cover scale-150" />;
      case "de": return <FlagDE className="w-full h-full object-cover scale-150" />;
      case "it": return <FlagIT className="w-full h-full object-cover scale-150" />;
      default: return <FlagGB className="w-full h-full object-cover scale-150" />;
    }
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
        {getFlag()}
      </div>
    </button>
  );
}
