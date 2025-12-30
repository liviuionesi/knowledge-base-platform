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

import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { LogoutButton } from "@/components/ui/LogoutButton";
import Image from "next/image";

export function WikiShell({ children, navigation, locale }: WikiShellProps) {
  return (
    <div className="relative flex w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8 h-16 border-b border-[var(--border)] bg-[var(--background)] transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="font-semibold text-lg flex items-center gap-2 text-[var(--foreground)]">
            <div className="relative h-8 w-8">
               <Image 
                 src="/phenix-logo.png" 
                 alt="Phenix Wiki Logo" 
                 fill
                 className="object-contain"
               />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="h-6 w-px bg-[var(--border)]" />
          <ThemeToggle />
          <div className="h-6 w-px bg-[var(--border)]" />
          <LogoutButton />
        </div>
      </header>

      {/* Main content with 3-column layout */}
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center">
        <LeftNav navigation={navigation} locale={locale} />
        
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16 border-x border-[var(--border)] bg-[var(--background)]">
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            {children}
          </article>
        </div>
        
        <OnThisPage />
      </div>
    </div>
  );
}
