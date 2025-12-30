"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavGroup } from "@/types/content";

interface LeftNavProps {
  navigation: NavGroup[];
  locale: string;
}

export function LeftNav({ navigation, locale }: LeftNavProps) {
  const pathname = usePathname();

  const selectedCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-phenix-orange before:bg-phenix-orange";
  const blankCss = "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-zinc-500 before:hidden before:bg-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:before:block dark:text-zinc-400";

  return (
    <div className="hidden lg:relative lg:block lg:flex-none">
      <div className="sticky top-0 w-64 overflow-y-auto h-screen py-8 pl-0.5">
        <nav className="text-sm">
          <ul className="space-y-9">
            {navigation.map((item) => (
              <li key={item.group}>
                <h2 className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.group}
                </h2>
                <ul className="mt-4 space-y-4 border-l border-zinc-200 dark:border-zinc-800">
                  {item.links.map((child) => (
                    <li className="relative" key={child.slug}>
                      <Link
                        className={
                          pathname === child.href
                            ? selectedCss
                            : blankCss
                        }
                        href={child.href}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
