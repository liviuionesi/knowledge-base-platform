import { NavGroup } from "@/types/content";

// Sample navigation structure - will be generated from content later
export function getNavigation(locale: string): NavGroup[] {
  // For now, return static navigation
  // TODO: Generate this from content directory
  
  const translations = {
    en: {
      gettingStarted: 'Getting Started',
      welcome: 'Welcome',
      dailyGuide: 'Daily Guide',
      eventCenter: 'Event Center',
      fullPreparedness: 'Full Preparedness',
      allianceDuel: 'Alliance Duel',
      report: 'Report'
    },
    fr: {
      gettingStarted: 'Commencer',
      welcome: 'Bienvenue',
      dailyGuide: 'Guide quotidien',
      eventCenter: 'Événements',
      fullPreparedness: 'Armements globaux',
      allianceDuel: "Duel d'Alliance",
      report: 'Rapport'
    },
    de: {
      gettingStarted: 'Erste Schritte',
      welcome: 'Willkommen',
      dailyGuide: 'Täglicher Leitfaden',
      eventCenter: 'Eventzentrum',
      fullPreparedness: 'Totale Bewaffnung',
      allianceDuel: 'Allianz-Duell',
      report: 'Bericht'
    },
    it: {
      gettingStarted: 'Per Iniziare',
      welcome: 'Benvenuto',
      dailyGuide: 'Guida Giornaliera',
      eventCenter: 'Centro Eventi',
      fullPreparedness: 'Preparazione alla Guerra',
      allianceDuel: "Duello dell'Alleanza",
      report: 'Rapporto'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  
  // Custom hero faction names (not translated yet for simplicity, or add to translations)
  const heroTranslations = {
    en: { heroes: 'Heroes', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' },
    fr: { heroes: 'Héros', bloodRose: 'Paradis du chaos', wingsOfDawn: "Ailes de l'aube", guardOfOrder: 'Volonté de la liberté' },
    de: { heroes: 'Helden', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' },
    it: { heroes: 'Eroi', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' }
  };
  const ht = heroTranslations[locale as keyof typeof heroTranslations] || heroTranslations.en;

  return [
    {
      group: t.gettingStarted,
      links: [
        {
          title: t.welcome,
          slug: 'introduction',
          href: `/${locale}/docs/introduction`
        },
        {
          title: t.dailyGuide,
          slug: 'daily-guide',
          href: `/${locale}/docs/daily-guide`
        }
      ]
    },
    {
      group: ht.heroes,
      links: [
        {
          title: ht.bloodRose,
          slug: 'heroes/blood-rose',
          href: `/${locale}/docs/heroes/blood-rose`
        },
        {
          title: ht.wingsOfDawn,
          slug: 'heroes/wings-of-dawn',
          href: `/${locale}/docs/heroes/wings-of-dawn`
        },
        {
          title: ht.guardOfOrder,
          slug: 'heroes/guard-of-order',
          href: `/${locale}/docs/heroes/guard-of-order`
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
