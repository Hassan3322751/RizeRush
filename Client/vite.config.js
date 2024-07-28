import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({mode}) => {

  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [
      react(),
    ],  
    server: {
      port: `5173`,
      proxy: {
          '/api/v1': 'http://localhost:4055',
        }
      },
      resolve: {
        alias: {
          '@bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
          '@aos': resolve(__dirname, 'node_modules/aos'),
        },
      },
  })
} 