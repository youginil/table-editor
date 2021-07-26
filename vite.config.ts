import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'TableEditor',
    },
    "sourcemap": true
  },
});
