import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { svelte } from '@sveltejs/vite-plugin-svelte'

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
    resolve: { alias: { '@main': resolve(__dirname, 'src/main') } }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: { alias: { '@main': resolve(__dirname, 'src/main') } }
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
    plugins: [svelte()]
  }
})
