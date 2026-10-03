import { describe, it, expect, beforeAll } from 'vitest';
import { debuglog } from 'node:util';
import togglClient, { type TogglClient, offsetDate } from '../src/index.js';

const debug = debuglog('toggl-client-tests-reports');

describe('reports', () => {
  let client: TogglClient;
  let workspaceId: number;

  beforeAll(async () => {
    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspaceId = workspaces[0].id;
  });

  it('should get a details report', async () => {
    const details = await client.reports.details(workspaceId, {
      start_date: offsetDate(new Date(), { days: -7 }),
    });

    debug('%o', details);
    expect(details).to.be.an('array');
    expect(details).to.have.property('page');
    expect(details).to.have.property('hasNextPage');
  });

  it('should get all pages of a details report', async () => {
    const allDetails = await client.reports.detailsAll(workspaceId, {
      start_date: offsetDate(new Date(), { days: -7 }),
    });

    debug('%o', allDetails);
    expect(allDetails).to.be.an('array');
  });

  it('should throw an error if start_date is not provided to details', async () => {
    // @ts-expect-error test invalid param
    await expect(client.reports.details(workspaceId, {})).rejects.toThrow('The parameters must include start_date');
  });

  it('should get a weekly report', async () => {
    const weekly = await client.reports.weekly(workspaceId);

    debug('%o', weekly);
    expect(weekly).to.be.an('array');
    expect(weekly).to.have.property('page');
    expect(weekly).to.have.property('hasNextPage');
  });

  it('should get all entries of a weekly report via weeklyAll', async () => {
    const allWeekly = await client.reports.weeklyAll(workspaceId);

    debug('%o', allWeekly);
    expect(allWeekly).to.be.an('array');
  });

  it('should get a summary report', async () => {
    const summary = await client.reports.summary(workspaceId, {
      start_date: offsetDate(new Date(), { days: -7 }),
    });

    debug('%o', summary);
    expect(summary).to.be.an('object');
    expect(summary).to.have.property('groups');
    expect((summary as any).groups).to.be.an('array');
  });

  it('should get all summary groups via summaryAll', async () => {
    const allSummary = await client.reports.summaryAll(workspaceId, {
      start_date: offsetDate(new Date(), { days: -7 }),
    });

    debug('%o', allSummary);
    expect(allSummary).to.be.an('array');
  });

  it('should throw an error if start_date is not provided to summary', async () => {
    // @ts-expect-error test invalid param
    await expect(client.reports.summary(workspaceId, {})).rejects.toThrow('The parameters must include start_date');
  });

  it('should load totals detailed report', async () => {
    const totals = await client.reports.totals(workspaceId, {
      start_date: offsetDate(new Date(), { days: -7 }),
    });

    debug('%o', totals);
    expect(totals).to.exist;
  });

  it('should list project users summary', async () => {
    const projectUsersSummary = await client.reports.projectsSummary(workspaceId);

    debug('%o', projectUsersSummary);
    expect(projectUsersSummary).to.exist;
  });

  it('should load project summary for a specific project', async () => {
    const projectSummary = await client.reports.projectSummary(workspaceId, 0);

    debug('%o', projectSummary);
    expect(projectSummary).to.exist;
  });
});
