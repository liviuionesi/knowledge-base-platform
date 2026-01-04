import { NavGroup } from "@/types/content";

// Sample navigation structure - will be generated from content later
export function getNavigation(locale: string): NavGroup[] {
  // For now, return static navigation
  // TODO: Generate this from content directory
  
  const translations = {
    en: {
      gettingStarted: 'Getting Started',
      welcome: 'Welcome',
      eventCenter: 'Event Center',
      fullPreparedness: 'Full Preparedness'
    },
    fr: {
      gettingStarted: 'Commencer',
      welcome: 'Bienvenue',
      eventCenter: 'Événements',
      fullPreparedness: 'Armements globaux'
    },
    de: {
      gettingStarted: 'Erste Schritte',
      welcome: 'Willkommen',
      eventCenter: 'Eventzentrum',
      fullPreparedness: 'Totale Bewaffnung'
    },
    it: {
      gettingStarted: 'Per Iniziare',
      welcome: 'Benvenuto',
      eventCenter: 'Centro Eventi',
      fullPreparedness: 'Preparazione alla Guerra'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return [
    {
      group: t.gettingStarted,
      links: [
        {
          title: t.welcome,
          slug: 'introduction',
          href: `/${locale}/docs/introduction`
        }
      ]
    },
    {
      group: t.eventCenter,
      links: [
        {
          title: t.fullPreparedness,
          slug: 'full-preparedness',
          href: `/${locale}/docs/full-preparedness`
        }
      ]
    }
  ];
}
