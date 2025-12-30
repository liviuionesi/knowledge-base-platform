"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NavGroup } from "@/types/content";
import Image from "next/image";

interface MobileNavProps {
  navigation: NavGroup[];
  locale: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ navigation, locale, isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isOpen) return null;

  const selectedCss = "block w-full py-2 pl-3.5 pr-3 text-base font-semibold leading-7 text-[var(--phenix-blue)] bg-[var(--phenix-blue)]/10 rounded-lg";
  const blankCss = "block w-full py-2 pl-3.5 pr-3 text-base font-semibold leading-7 text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-lg transition-colors";

  return (
    <div className="lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-[var(--background)]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-y-0 left-0 z-[100] w-full overflow-y-auto bg-[var(--background)] px-6 py-6 sm:max-w-sm border-r border-[var(--border)] shadow-xl ring-1 ring-gray-900/10 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center gap-2" onClick={onClose}>
            <div className="relative h-8 w-8">
              <Image 
                src="/phenix-logo.png" 
                alt="Phenix Wiki Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--foreground)]">PHENIX</span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-[var(--foreground)] hover:text-[var(--phenix-blue)] transition-colors"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-[var(--border)]">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <div key={item.group} className="py-2">
                  <h3 className="mb-2 px-3 text-sm font-semibold tracking-wider text-[var(--foreground)]/60 uppercase">
                    {item.group}
                  </h3>
                  <div className="space-y-1">
                    {item.links.map((child) => (
                      <Link
                        key={child.slug}
                        href={child.href}
                        className={pathname === child.href ? selectedCss : blankCss}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
