import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server.js';

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
