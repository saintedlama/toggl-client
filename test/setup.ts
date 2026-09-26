if (process.env.TOGGL_E2E) {
  if (!process.env.TOGGL_API_TOKEN) {
    console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the e2e tests');
    process.exit(1);
  }
} else {
  process.env.TOGGL_API_TOKEN = process.env.TOGGL_API_TOKEN || 'mock-api-token';
  process.env.TOGGL_BASE_URL = process.env.TOGGL_BASE_URL || 'http://127.0.0.1:4010';
  process.env.TOGGL_REPORTS_URL = process.env.TOGGL_REPORTS_URL || 'http://127.0.0.1:4011/reports/api/v3';
}
