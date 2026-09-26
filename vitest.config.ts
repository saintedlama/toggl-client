import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.ts'],
    fileParallelism: false,
    testTimeout: 10000,
    include: ['test/**/*.{test,spec}.ts', 'test/**/smoke-test.ts'],
  },
});
