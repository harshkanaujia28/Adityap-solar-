import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true, // 👈 Force Nitro for Vercel

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});