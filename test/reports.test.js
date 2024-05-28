import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-reports');

describe.only('reports', () => {
  let client;
  let workspace_id;
  let project_id;
  before(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
    const projects = await client.projects.list(workspace_id);
    project_id = projects[0].id;
  });

  // Add a delay of 1 second between each test case
  beforeEach((done) => {
    setTimeout(done, 1000);
  });

  it('should get a weekly report', async () => {
    const report = await client.reports.weekly(workspace_id);
    debug(report);
    expect(report).to.exist.to.be.an('array');
    expect(report).to.have.property('page');
    expect(report).to.have.property('hasNextPage');
  });

  it('should all get pages of weekly report', async () => {
    const report = await client.reports.weeklyAll(workspace_id);
    debug(report);
    expect(report).to.exist.to.be.an('array');
    expect(report).to.have.property('page');
    expect(report).to.have.property('hasNextPage');
  });

  it('should get a detailed report', async () => {
    const report = await client.reports.details(workspace_id, { start_date: '2024-02-01' });
    debug(report);
    expect(report).to.exist.to.be.an('array');
    expect(report).to.have.property('0');
    expect(report).to.have.property('page');
    expect(report).to.have.property('hasNextPage');
  });

  it('should get all pages of the detailed report', async () => {
    // FIXME -      TypeError: reportPage.data is not iterable (cannot read property undefined)
    const report = await client.reports.detailsAll(workspace_id, { start_date: '2022-02-01' });
    debug(report);
    expect(report).to.exist.to.be.an('array');
    expect(report).to.have.property('page');
    expect(report).to.have.property('hasNextPage');
  });

  it('should get a summary report', async () => {
    const report = await client.reports.summary(workspace_id, { start_date: '2024-02-01' });
    debug(report);
    expect(report).to.exist.to.be.an('object');
    expect(report).to.have.property('groups');
    expect(report).to.have.property('page');
    expect(report).to.have.property('hasNextPage');
  });

});
