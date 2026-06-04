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
      filter: (page) => !page.includes('/p/'),
      serialize(item) {
        return {
          url: item.url,
          changefreq: 'daily',
          priority: item.url === 'https://wordcards.co/' ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
        };
      },
    }),
  ],
  adapter: netlify(),
});
