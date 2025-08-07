import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { randomBytes } from 'crypto';

// Polyfill for crypto.getRandomValues
if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: (array: Uint8Array) => randomBytes(array.length),
  };
}

export default defineConfig({
  plugins: [react()],
});