import vinext from "vinext";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [vinext()],
  // macOS Seatbelt blocks FSEvents, so local previews need polling for HMR.
  server: process.env.CODEX_SANDBOX === "seatbelt"
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
});
