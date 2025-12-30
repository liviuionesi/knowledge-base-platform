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
          title: locale === 'fr' ? 'Bienvenue' : 'Welcome',
          slug: 'introduction',
          href: `/${locale}/docs/introduction`
        }
      ]
    },
    {
      group: locale === 'fr' ? 'Événements' : 'Event Center',
      links: [
        {
          title: locale === 'fr' ? 'Armements globaux' : 'Full Preparedness',
          slug: 'full-preparedness',
          href: `/${locale}/docs/full-preparedness`
        }
      ]
    }
  ];
}
