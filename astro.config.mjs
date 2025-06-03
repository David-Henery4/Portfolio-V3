// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";


import netlify from "@astrojs/netlify";


export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     pathname: "/**",
    //     port: "8000",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "portfolio-payload-cms.vercel.app",
    //     pathname: "/**",
    //   },
    // ],
    domains: ["portfolio-payload-cms.vercel.app"],
  },

  adapter: netlify({
    imageCDN: false,
  }),
});