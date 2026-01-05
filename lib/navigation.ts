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
      fullPreparedness: 'Full Preparedness',
      allianceDuel: 'Alliance Duel',
      report: 'Report'
    },
    fr: {
      gettingStarted: 'Commencer',
      welcome: 'Bienvenue',
      eventCenter: 'Événements',
      fullPreparedness: 'Armements globaux',
      allianceDuel: "Duel d'Alliance",
      report: 'Rapport'
    },
    de: {
      gettingStarted: 'Erste Schritte',
      welcome: 'Willkommen',
      eventCenter: 'Eventzentrum',
      fullPreparedness: 'Totale Bewaffnung',
      allianceDuel: 'Allianz-Duell',
      report: 'Bericht'
    },
    it: {
      gettingStarted: 'Per Iniziare',
      welcome: 'Benvenuto',
      eventCenter: 'Centro Eventi',
      fullPreparedness: 'Preparazione alla Guerra',
      allianceDuel: "Duello dell'Alleanza",
      report: 'Rapporto'
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
    },
    {
      group: t.allianceDuel,
      links: [
        {
          title: t.report,
          slug: 'alliance-duel',
          href: `/${locale}/alliance-duel`
        }
      ]
    }
  ];
}
