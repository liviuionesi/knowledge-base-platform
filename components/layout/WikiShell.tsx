import { ReactNode } from "react";
import { LeftNav } from "./nav/LeftNav";
import { OnThisPage } from "./nav/OnThisPage";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavGroup } from "@/types/content";
import Link from "next/link";

interface WikiShellProps {
  children: ReactNode;
  navigation: NavGroup[];
  locale: string;
}

export function WikiShell({ children, navigation, locale }: WikiShellProps) {
  return (
    <div className="relative flex w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="font-semibold text-lg flex items-center gap-2">
            <span className="text-phenix-orange">🔥</span>
            <span>Phenix Wiki</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main content with 3-column layout */}
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center">
        <LeftNav navigation={navigation} locale={locale} />
        
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            {children}
          </article>
        </div>
        
        <OnThisPage />
      </div>
    </div>
  );
}
