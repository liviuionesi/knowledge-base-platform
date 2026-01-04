import { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://phenix-wiki.vercel.app';
  const locales = routing.locales;
  
  // Static routes that exist for every locale
  const staticRoutes = [
    '',
    '/login',
  ];

  // Documentation content identifiers (slugs)
  // These correspond to the files in content/en (e.g. introduction.md -> introduction)
  const contentSlugs = [
    'introduction',
    'full-preparedness'
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Add static routes
    staticRoutes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1.0 : 0.8,
      });
    });

    // Add documentation routes
    contentSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/docs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  return entries;
}
