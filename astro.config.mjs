// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://r2arquitetos.com.br',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
  image: {
    // as fotos são de celular (≤ 2000 px); nunca ampliar acima do original
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } },
  },
});
