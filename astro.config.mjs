import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// @astrojs/sitemap is temporarily disabled — incompatible with hybrid output
// in the current version. sitemap.xml is served statically from public/.
// Re-enable once @astrojs/sitemap adds full hybrid support.

export default defineConfig({
  site: 'https://wordcards.co',
  output: 'hybrid',
  integrations: [
    tailwind(),
  ],
  adapter: netlify(),
});
