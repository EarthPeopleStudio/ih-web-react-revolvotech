import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add CSP headers for development
    {
      name: 'configure-csp',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Add CSP headers
          res.setHeader(
            'Content-Security-Policy',
            "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com https://js.stripe.com https://m.stripe.com; connect-src 'self' https://api.web3forms.com https://*.web3forms.com https://www.google-analytics.com https://api.stripe.com https://m.stripe.com https://*.stripe.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://*.stripe.com; frame-src 'self' https://calendly.com https://js.stripe.com https://hooks.stripe.com;"
          );
          next();
        });
      },
    },
  ],
  base: "/",
  server: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com https://js.stripe.com https://m.stripe.com; connect-src 'self' https://api.web3forms.com https://*.web3forms.com https://www.google-analytics.com https://api.stripe.com https://m.stripe.com https://*.stripe.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://*.stripe.com; frame-src 'self' https://calendly.com https://js.stripe.com https://hooks.stripe.com;",
    },
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
