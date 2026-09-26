import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debugClient('toggl-client-tests');

describe('smoke test', () => {
  let client: TogglClient;
  let workspace_id: number;
  beforeAll(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  // Add a delay of 1 second between each test case
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should list workspaces', async () => {
    const workspaces = await client.workspaces.list();

    debug(workspaces);
    expect(workspaces).to.be.an('array').that.is.not.empty;
  });

  it('should list projects in a workspace', async () => {
    const workspaces = await client.workspaces.list();

    for (const workspace of workspaces) {
      const projects = await client.workspaces.projects(workspace.id);
      debug(projects);

      expect(projects).to.be.an('array');
    }
  });

  it('should get a details report', async () => {
    const detailsReport = await client.reports.details(workspace_id, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(detailsReport);
    expect(detailsReport).to.be.an('array');
    expect(detailsReport).to.have.property('page');
    expect(detailsReport).to.have.property('hasNextPage');
  });

  it('should throw an error if a start date is not provided with a details report', async () => {
    try {
      await client.reports.details(workspace_id);
      expect.fail('Expected an error to be thrown');
    } catch (e: any) {
      expect(e.message).to.equal('The parameters must include start_date');
    }
  });

  it('should get a weekly report', async () => {
    const weeklyReport = await client.reports.weekly(workspace_id);
    debug(weeklyReport);
    expect(weeklyReport).to.exist.to.be.an('array');
    expect(weeklyReport).to.have.property('page');
    expect(weeklyReport).to.have.property('hasNextPage');
  });

  it('should get a summary report', async () => {
    const summaryReport = await client.reports.summary(workspace_id, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });
    debug(summaryReport);
    expect(summaryReport).to.exist.to.be.an('object');
    expect(summaryReport).to.have.property('groups');
    expect((summaryReport as any).groups).to.be.an('array');
  });

  it('should throw an error if a start date is not provided with a summary report', async () => {
    try {
      await client.reports.summary(workspace_id, undefined as any);
      expect.fail('Expected an error to be thrown');
    } catch (e: any) {
      expect(e.message).to.equal('The parameters must include start_date');
    }
  });

  it('should throw an error if current password not supplied', async () => {
    const user = {
      password: 'foo',
    };
    await expect(client.user.update(user)).rejects.toThrow('To change the password you must include the current password');
  });

  it.skip('should generate time entries', async () => {
    for (let i = 0; i < 52; i++) {
      const timeEntryCreated = await client.timeEntries.create({
        workspace_id,
        duration: 1200, // 20min
        start: new Date().toISOString(),
        description: 'Test Entry',
      });

      debug(timeEntryCreated);

      await timeout();
    }
  });

  it('should list a users tags', async () => {
    const tags = await client.workspaces.tags(workspace_id);
    debug(tags);
    expect(tags).to.exist.to.be.an('array');
    expect(tags[0].name).to.exist;
  });
});

async function timeout() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 500);
  });
}
