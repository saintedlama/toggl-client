import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debugClient('toggl-client-tests-reports');

describe('reports', () => {
  let client: TogglClient;
  let workspaceId: number;

  beforeAll(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspaceId = workspaces[0].id;
  });

  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should get a details report', async () => {
    const details = await client.reports.details(workspaceId, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(details);
    expect(details).to.be.an('array');
    expect(details).to.have.property('page');
    expect(details).to.have.property('hasNextPage');
  });

  it('should get all pages of a details report', async () => {
    const allDetails = await client.reports.detailsAll(workspaceId, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(allDetails);
    expect(allDetails).to.be.an('array');
  });

  it('should throw an error if start_date is not provided to details', async () => {
    // @ts-expect-error test invalid param
    await expect(client.reports.details(workspaceId, {})).rejects.toThrow('The parameters must include start_date');
  });

  it('should get a weekly report', async () => {
    const weekly = await client.reports.weekly(workspaceId);

    debug(weekly);
    expect(weekly).to.be.an('array');
    expect(weekly).to.have.property('page');
    expect(weekly).to.have.property('hasNextPage');
  });

  it('should get all entries of a weekly report via weeklyAll', async () => {
    const allWeekly = await client.reports.weeklyAll(workspaceId);

    debug(allWeekly);
    expect(allWeekly).to.be.an('array');
  });

  it('should get a summary report', async () => {
    const summary = await client.reports.summary(workspaceId, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(summary);
    expect(summary).to.be.an('object');
    expect(summary).to.have.property('groups');
    expect((summary as any).groups).to.be.an('array');
  });

  it('should get all summary groups via summaryAll', async () => {
    const allSummary = await client.reports.summaryAll(workspaceId, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(allSummary);
    expect(allSummary).to.be.an('array');
  });

  it('should throw an error if start_date is not provided to summary', async () => {
    // @ts-expect-error test invalid param
    await expect(client.reports.summary(workspaceId, {})).rejects.toThrow('The parameters must include start_date');
  });

  it('should load totals detailed report', async () => {
    const totals = await client.reports.totals(workspaceId, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(totals);
    expect(totals).to.exist;
  });

  it('should list project users summary', async () => {
    const projectUsersSummary = await client.reports.projectsSummary(workspaceId);

    debug(projectUsersSummary);
    expect(projectUsersSummary).to.exist;
  });

  it('should load project summary for a specific project', async () => {
    const projectSummary = await client.reports.projectSummary(workspaceId, 0);

    debug(projectSummary);
    expect(projectSummary).to.exist;
  });
});
