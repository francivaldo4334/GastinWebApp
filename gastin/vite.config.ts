import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from "path"
//@ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  server: {
    port: 3000,
    watch: {
      ignored: ["**/*.svg", "**/*.md", "**/*.json", "**/node_modules/**"]
    },
    fs: {
      strict: true,
    }
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
});
