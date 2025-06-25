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
            "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com; connect-src 'self' https://api.web3forms.com https://*.web3forms.com https://www.google-analytics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://calendly.com;"
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
        "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com; connect-src 'self' https://api.web3forms.com https://*.web3forms.com https://www.google-analytics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src 'self' https://calendly.com;"
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
