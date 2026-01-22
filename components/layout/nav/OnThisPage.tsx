"use client";

import { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/types/content";

import { useTranslations } from "next-intl";

export function OnThisPage() {
  const t = useTranslations("Navigation");
  const [headings, setHeadings] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const updateHeadings = () => {
      const elements = Array.from(document.querySelectorAll("article h2, article h3"));
      const items: TableOfContentsItem[] = elements
        .map((element, index) => ({
          id: element.id || `heading-${index}`,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1))
        }))
        .filter((item) => item.text.trim().length > 0 && item.id);
      setHeadings(items);
      return elements;
    };

    const initialElements = updateHeadings();

    // Intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    initialElements.forEach((element) => observer.observe(element));

    // Mutation observer to handle dynamic content (e.g., HeroList)
    const targetNode = document.querySelector("article");
    if (targetNode) {
      const mutationObserver = new MutationObserver(() => {
        const newElements = updateHeadings();
        newElements.forEach((element) => observer.observe(element));
      });
      mutationObserver.observe(targetNode, { childList: true, subtree: true });
      
      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:sticky xl:top-0 xl:block xl:h-screen xl:flex-none xl:overflow-y-auto xl:py-8 xl:pr-6 bg-[var(--sidebar-bg)] border-l border-[var(--border)]">
      <nav className="w-56 pl-6">
        <h2 className="font-display text-sm font-semibold text-[var(--foreground)]">
          {t('onThisPage')}
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {headings.map((heading, idx) => (
            <li
              key={`${heading.id}-${idx}`}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              <a
                href={`#${heading.id}`}
                className={`block ${
                  activeId === heading.id
                    ? "text-[var(--phenix-blue)] font-semibold"
                    : "text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
