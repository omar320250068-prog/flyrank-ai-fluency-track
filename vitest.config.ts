import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  test: {
    environment: 'happy-dom',
    exclude: ['node_modules', '.next', 'e2e/**']
  }
});
