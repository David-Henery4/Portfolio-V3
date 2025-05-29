// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";


export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
        port: "8000",
      },
    ],
  },

  adapter: node({
    mode: "standalone",
  }),
});