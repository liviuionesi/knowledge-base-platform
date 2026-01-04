"use client";

import { Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const selectedCss = "block w-full py-2 pl-3.5 pr-3 text-base font-semibold leading-7 text-[var(--phenix-blue)] bg-[var(--phenix-blue)]/10 rounded-lg";
  const blankCss = "block w-full py-2 pl-3.5 pr-3 text-base font-semibold leading-7 text-[var(--foreground)] hover:bg-[var(--muted)]/50 rounded-lg transition-colors";

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[150]" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex z-[150]">
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform flex-col bg-[var(--background)] py-6 shadow-2xl ring-1 ring-white/10 transition-all">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={onClose}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex shrink-0 items-center px-6 gap-2 mb-8">
                 <div className="relative h-8 w-8">
                   <Image 
                     src="/theme/phenix-logo.png" 
                     alt="Phenix Wiki Logo" 
                     fill
                     className="object-contain"
                   />
                 </div>
                 <span className="font-bold text-xl tracking-tight text-[var(--foreground)]">PHENIX</span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-1 flex-col px-6 overflow-y-auto">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {navigation.map((group) => (
                    <li key={group.group}>
                      <div className="text-xs font-semibold leading-6 text-[var(--foreground)]/60 tracking-widest uppercase mb-2">
                        {group.group}
                      </div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {group.links.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={item.href}
                              className={pathname === item.href ? selectedCss : blankCss}
                              onClick={onClose}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
