import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      exclude: undefined,
      includePublic: true,
      logStats: true,
      png: { quality: 85 },
      jpeg: { quality: 85 },
      jpg: { quality: 85 },
      tiff: { quality: 85 },
      gif: {},
      webp: { lossless: false, quality: 85 },
      avif: { quality: 70 },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default', params: { overrides: { cleanupNumericValues: false, removeViewBox: false } } },
          'sortAttrs',
          { name: 'addAttributesToSVGElement', params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] } },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
