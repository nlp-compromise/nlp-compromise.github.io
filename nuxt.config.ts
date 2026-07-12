// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // the whole site runs off the `nlp` global (unpkg script tags), so no server-rendering
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  imports: {
    transform: {
      // don't inject auto-imports into the bundled UMD build of codemirror
      exclude: [/lib\/CodeMirror\/lib\.js/],
    },
  },
  css: ['~/assets/css/site.css'],
  app: {
    head: {
      title: 'Compromise',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      ],
      link: [
        { rel: 'stylesheet', href: '/build/main.css' },
        { rel: 'icon', type: 'image/ico', href: '/build/favicon.ico' },
      ],
      // these were per-page <script src=..> tags - loaded synchronously,
      // before the app bundle, so `nlp` + plugins exist as globals everywhere
      script: [
        { src: 'https://unpkg.com/compromise' },
        { src: 'https://unpkg.com/compromise-dates' },
        { src: 'https://unpkg.com/compromise-speech' },
        { src: 'https://unpkg.com/compromise-stats' },
        { src: 'https://unpkg.com/compromise-wikipedia' },
        { src: 'https://unpkg.com/es-compromise' },
        { src: 'https://unpkg.com/fr-compromise' },
        { src: 'https://unpkg.com/it-compromise' },
        { src: 'https://unpkg.com/de-compromise' },
      ],
    },
  },
  compatibilityDate: '2026-07-12',
})
