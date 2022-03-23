import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import path from 'path'

const watch = process.argv.find(str => str === '-w')

let dir = process.argv[4] || '.'

let out = path.join(dir, `./build/bundle.js`)
let input = path.join(dir, `./main.js`)
const production = !Boolean(watch)
if (production) {
  console.log(`building ${dir} -> ${out}`)
}

function serve() {
  let server
  if (!watch) {
    return {}
  }

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      if (dir === '.') {
        dir = './'
      }
      server = require('child_process').spawn('npm', ['run', 'start', dir, '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      })

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: input,
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'app',
    file: out,
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload(dir),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
