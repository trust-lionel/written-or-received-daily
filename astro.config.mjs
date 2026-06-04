import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://wordcards.co',
  output: 'hybrid',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) =>
        // Exclude individual private postcard URLs from sitemap
        // Public pool postcards at /p/ are excluded — too dynamic
        !page.includes('/p/'),
    }),
  ],
  adapter: netlify(),
});
