import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import debugClient from 'debug';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debugClient('toggl-client-tests-preferences');

describe('preferences', () => {
  let client: TogglClient;

  beforeAll(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the tests');
      process.exit(1);
    }

    client = togglClient();
  });

  // Add a delay of 1 second between each test case to avoid rate limiting
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should get current user preferences', async () => {
    const preferences = await client.preferences.current();

    debug(preferences);

    expect(preferences).to.exist.to.be.an('object');
    expect(preferences).to.have.property('date_format');
    expect(preferences).to.have.property('timeofday_format');
  });

  it('should update current user preferences and restore them', async () => {
    // Read current preferences
    const current = await client.preferences.current();
    debug('current preferences:', current);

    const originalFormat = current.timeofday_format || 'H:mm';
    const newFormat = originalFormat === 'H:mm' ? 'h:mm A' : 'H:mm';

    // Update preferences
    const result = await client.preferences.update({
      timeofday_format: newFormat,
    });
    debug('update result:', result);
    expect(result).to.exist;

    if (process.env.TOGGL_E2E) {
      const updated = await client.preferences.current();
      debug('verified updated preferences:', updated);
      expect(updated.timeofday_format).to.equal(newFormat);
    }

    // Restore original preferences
    const restoreResult = await client.preferences.update({
      timeofday_format: originalFormat,
    });
    debug('restore result:', restoreResult);
    expect(restoreResult).to.exist;
  });

  it('should get preferences for a specific client', async () => {
    const preferences = await client.preferences.currentForClient('web');

    debug(preferences);

    expect(preferences).to.exist.to.be.an('object');
  });

  it('should update preferences for a specific client and restore them', async () => {
    // Read current web preferences
    const current = await client.preferences.currentForClient('web');
    debug('current web preferences:', current);

    const originalFormat = current.timeofday_format || 'H:mm';
    const newFormat = originalFormat === 'H:mm' ? 'h:mm A' : 'H:mm';

    // Update client preferences
    const result = await client.preferences.updateForClient('web', {
      timeofday_format: newFormat,
    });
    debug('update client result:', result);
    expect(result).to.exist;

    if (process.env.TOGGL_E2E) {
      const updated = await client.preferences.currentForClient('web');
      debug('verified updated web preferences:', updated);
      expect(updated.timeofday_format).to.equal(newFormat);
    }

    // Restore original preferences
    const restoreResult = await client.preferences.updateForClient('web', {
      timeofday_format: originalFormat,
    });
    debug('restore client result:', restoreResult);
    expect(restoreResult).to.exist;
  });
});
