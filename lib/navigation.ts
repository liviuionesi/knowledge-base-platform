import { NavGroup } from "@/types/content";

// Sample navigation structure - will be generated from content later
export function getNavigation(locale: string, isAuthenticated: boolean = false): NavGroup[] {
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
      autoClicker: 'AutoClicker Setup',
      automationApp: 'Evelyn',
      day1: 'Monday',
      day2: 'Tuesday',
      day3: 'Wednesday',
      day4: 'Thursday',
      day5: 'Friday',
      day6: 'Saturday'
    },
    fr: {
      gettingStarted: 'Commencer',
      welcome: 'Bienvenue',
      dailyGuide: 'Règles',
      eventCenter: 'Événements',
      fullPreparedness: 'Armements globaux',
      allianceDuel: "Duel d'Alliance",
      report: 'Rapport',
      autoClicker: 'Config. AutoClicker',
      automationApp: 'Evelyn',
      day1: 'Lundi',
      day2: 'Mardi',
      day3: 'Mercredi',
      day4: 'Jeudi',
      day5: 'Vendredi',
      day6: 'Samedi'
    },
    de: {
      gettingStarted: 'Erste Schritte',
      welcome: 'Willkommen',
      dailyGuide: 'Regeln',
      eventCenter: 'Eventzentrum',
      fullPreparedness: 'Totale Bewaffnung',
      allianceDuel: 'Allianz-Duell',
      report: 'Bericht',
      autoClicker: 'AutoClicker Einr.',
      automationApp: 'Evelyn',
      day1: 'Montag',
      day2: 'Dienstag',
      day3: 'Mittwoch',
      day4: 'Donnerstag',
      day5: 'Freitag',
      day6: 'Samstag'
    },
    it: {
      gettingStarted: 'Per Iniziare',
      welcome: 'Benvenuto',
      dailyGuide: 'Regole',
      eventCenter: 'Centro Eventi',
      fullPreparedness: 'Preparazione alla Guerra',
      allianceDuel: "Duello dell'Alleanza",
      report: 'Rapporto',
      autoClicker: 'Config. AutoClicker',
      automationApp: 'Evelyn',
      day1: 'Lunedì',
      day2: 'Martedì',
      day3: 'Mercoledì',
      day4: 'Giovedì',
      day5: 'Venerdì',
      day6: 'Sabato'
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

  const gettingStartedLinks = [
    {
      title: t.welcome,
      slug: 'introduction',
      href: `/${locale}/docs/introduction`
    },
    // Daily Guide (Rules) is protected
    ...(isAuthenticated ? [
      {
        title: t.dailyGuide,
        slug: 'daily-guide',
        href: `/${locale}/docs/daily-guide`
      },
      {
        title: t.automationApp,
        slug: 'automation-app',
        href: `/${locale}/docs/automation-app`
      }
    ] : []),
    {
      title: t.autoClicker,
      slug: 'autoclicker',
      href: `/${locale}/docs/autoclicker`
    }
  ];

  const allianceDuelLinks = isAuthenticated ? [
    {
      title: t.day1,
      slug: 'alliance-duel/day-1',
      href: `/${locale}/docs/alliance-duel/day-1`
    },
    {
      title: t.day2,
      slug: 'alliance-duel/day-2',
      href: `/${locale}/docs/alliance-duel/day-2`
    },
    {
      title: t.day3,
      slug: 'alliance-duel/day-3',
      href: `/${locale}/docs/alliance-duel/day-3`
    },
    {
      title: t.day4,
      slug: 'alliance-duel/day-4',
      href: `/${locale}/docs/alliance-duel/day-4`
    },
    {
      title: t.day5,
      slug: 'alliance-duel/day-5',
      href: `/${locale}/docs/alliance-duel/day-5`
    },
    {
      title: t.day6,
      slug: 'alliance-duel/day-6',
      href: `/${locale}/docs/alliance-duel/day-6`
    },
    {
      title: t.report,
      slug: 'alliance-duel',
      href: `/${locale}/alliance-duel`
    }
  ] : [];

  const navGroups: NavGroup[] = [
    {
      group: t.gettingStarted,
      links: gettingStartedLinks
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
    }
  ];

  if (allianceDuelLinks.length > 0) {
    navGroups.push({
      group: t.allianceDuel,
      links: allianceDuelLinks
    });
  }

  return navGroups;
}
