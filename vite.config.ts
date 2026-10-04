// https://vite.dev/config/

import { defineConfig } from 'vitest/config'
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import million from 'million/compiler';

// The React Compiler adds its own cache branches, which v8 counts as uncovered.
// Turn it off for `npm run coverage` so the report measures the true source code.
const isCoverage = process.env.COVERAGE === 'true';

export default defineConfig({
  plugins: [
    // Million wraps dynamic JSX in <slot> elements, which changes the DOM that
    // tests see (e.g. splits "© 2026" across elements), so skip it under Vitest.
    ...(process.env.VITEST ? [] : [million.vite({ auto: true })]),
    react(),
    ...(isCoverage ? [] : [babel({
      presets: [reactCompilerPreset()]
    })]),
    tailwindcss()
  ],
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: "v8",
      reporter: [
        "text",
        "html"
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    }
  }
});