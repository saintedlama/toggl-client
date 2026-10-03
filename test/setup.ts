import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server.js';

if (typeof (Promise as { withResolvers?: unknown }).withResolvers !== 'function') {
  Object.defineProperty(Promise, 'withResolvers', {
    configurable: true,
    writable: true,
    value: function withResolvers<T>() {
      let resolve!: (value: T | PromiseLike<T>) => void;
      let reject!: (reason?: unknown) => void;
      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    },
  });
}

process.env.TOGGL_API_TOKEN = process.env.TOGGL_API_TOKEN || 'mock-api-token';
process.env.TOGGL_BASE_URL = process.env.TOGGL_BASE_URL || 'https://api.track.toggl.com/api/v9';
process.env.TOGGL_REPORTS_URL = process.env.TOGGL_REPORTS_URL || 'https://api.track.toggl.com/reports/api/v3';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
