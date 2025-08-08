import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { paraglideVitePlugin } from '@inlang/paraglide-js'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/migrations',
            dest: '.'
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@main': resolve(__dirname, 'src/main')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve(__dirname, 'src/main')
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        external: ['*.json']
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src/renderer/src')
      }
    },
    plugins: [
      svelte(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/renderer/src/paraglide',
        strategy: ['localStorage', 'preferredLanguage', 'baseLocale']
      })
    ]
  }
})
