const { expect } = require('chai');
const togglClient = require('../');

describe('smoke test', () => {
  it('should list workspaces', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    expect(workspaces).to.be.an('array').that.is.not.empty;
  });

  it('should list projects in a workspace', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    for (const workspace of workspaces) {
      const projects = await client.workspaces.projects(workspace.id);
      expect(projects).to.be.an('array');
    }
  });

  it('should get a details report', async () => {
    const client = togglClient();
    
    const workspaces = await client.workspaces.list();

    const detailsReport = await client.reports.details(workspaces[0].id);

    expect(detailsReport).to.exist.to.be.an('object');
  });
});
