import { NavGroup } from "@/types/content";

// Sample navigation structure - will be generated from content later
export function getNavigation(locale: string): NavGroup[] {
  // For now, return static navigation
  // TODO: Generate this from content directory
  
  const translations = {
    en: {
      gettingStarted: 'Getting Started',
      welcome: 'Welcome',
      dailyGuide: 'Rules',
      eventCenter: 'Event Center',
      fullPreparedness: 'Full Preparedness',
      allianceDuel: 'Alliance Duel',
      report: 'Report',
      autoClicker: 'AutoClicker Setup'
    },
    fr: {
      gettingStarted: 'Commencer',
      welcome: 'Bienvenue',
      dailyGuide: 'Règles',
      eventCenter: 'Événements',
      fullPreparedness: 'Armements globaux',
      allianceDuel: "Duel d'Alliance",
      report: 'Rapport',
      autoClicker: 'Config. AutoClicker'
    },
    de: {
      gettingStarted: 'Erste Schritte',
      welcome: 'Willkommen',
      dailyGuide: 'Regeln',
      eventCenter: 'Eventzentrum',
      fullPreparedness: 'Totale Bewaffnung',
      allianceDuel: 'Allianz-Duell',
      report: 'Bericht',
      autoClicker: 'AutoClicker Einr.'
    },
    it: {
      gettingStarted: 'Per Iniziare',
      welcome: 'Benvenuto',
      dailyGuide: 'Regole',
      eventCenter: 'Centro Eventi',
      fullPreparedness: 'Preparazione alla Guerra',
      allianceDuel: "Duello dell'Alleanza",
      report: 'Rapporto',
      autoClicker: 'Config. AutoClicker'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  
  // Custom hero faction names (not translated yet for simplicity, or add to translations)
  const heroTranslations = {
    en: { heroes: 'Heroes', upgrading: 'Upgrading Heroes', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' },
    fr: { heroes: 'Héros', upgrading: 'Amélioration des Héros', bloodRose: 'Paradis du chaos', wingsOfDawn: "Ailes de l'aube", guardOfOrder: 'Volonté de la liberté' },
    de: { heroes: 'Helden', upgrading: 'Helden aufwerten', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' },
    it: { heroes: 'Eroi', upgrading: 'Potenziamento Eroi', bloodRose: 'Blood Rose', wingsOfDawn: 'Wings of Dawn', guardOfOrder: 'Guard of Order' }
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
        },
        {
          title: t.autoClicker,
          slug: 'autoclicker',
          href: `/${locale}/docs/autoclicker`
        }
      ]
    },
    {
      group: ht.heroes,
      links: [
        {
          title: ht.upgrading,
          slug: 'heroes/upgrading-heroes',
          href: `/${locale}/docs/heroes/upgrading-heroes`
        },
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
