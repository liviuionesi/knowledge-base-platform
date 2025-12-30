import { NavGroup } from "@/types/content";

// Sample navigation structure - will be generated from content later
export function getNavigation(locale: string): NavGroup[] {
  // For now, return static navigation
  // TODO: Generate this from content directory
  return [
    {
      group: locale === 'fr' ? 'Commencer' : 'Getting Started',
      links: [
        {
          title: locale === 'fr' ? 'Introduction' : 'Introduction',
          slug: 'introduction',
          href: `/${locale}/docs/introduction`
        }
      ]
    },
    {
      group: locale === 'fr' ? 'Héros' : 'Heroes',
      links: [
        {
          title: locale === 'fr' ? 'Aperçu' : 'Overview',
          slug: 'heroes',
          href: `/${locale}/docs/heroes`
        }
      ]
    },
    {
      group: locale === 'fr' ? 'Événements' : 'Events',
      links: [
        {
          title: locale === 'fr' ? 'Préparation Complète' : 'Full Preparedness',
          slug: 'full-preparedness',
          href: `/${locale}/docs/full-preparedness`
        }
      ]
    },
    {
      group: locale === 'fr' ? 'Tactiques' : 'Tactics',
      links: [
        {
          title: locale === 'fr' ? 'Capital Clash' : 'Capital Clash',
          slug: 'capital-clash',
          href: `/${locale}/docs/capital-clash`
        }
      ]
    }
  ];
}
