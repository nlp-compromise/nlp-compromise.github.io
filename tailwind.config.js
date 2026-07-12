/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './pages/**/*.vue',
    './lib/**/*.vue',
    './home/**/*.vue',
    './one/**/*.vue',
    './two/**/*.vue',
    './three/**/*.vue',
  ],
  corePlugins: {
    // the site's element styling lives in public/build/main.css -
    // tailwind's reset would clobber it
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
