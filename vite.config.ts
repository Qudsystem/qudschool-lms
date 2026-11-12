import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // GitHub Pages serves this app from the repository root or a custom
      // domain. Keep asset URLs portable for both deployment targets.
      base: env.VITE_BASE_PATH || '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
        // السماح بنطاقات الأنفاق المؤقتة (Cloudflare quick tunnels)
        allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', 'localhost'],
        // HMR عبر النفق
        hmr: {
          clientPort: 443,
          protocol: 'wss',
        },
      },
      plugins: [react(), ...(env.VITE_HTTPS === 'true' ? [basicSsl()] : [])],
      define: {
        // Use import.meta.env for Vite
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Keep for backward compatibility
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) return 'vendor-react';
                if (id.includes('framer-motion')) return 'vendor-motion';
                if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
                if (id.includes('@google/genai')) return 'vendor-genai';
                return 'vendor';
              }
            },
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
          }
        },
        chunkSizeWarningLimit: 800,
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },
    };
});
