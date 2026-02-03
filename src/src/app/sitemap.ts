import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.meta.siteUrl;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/case-studies/cursor-hackathon`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/case-studies/smartwealth`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
