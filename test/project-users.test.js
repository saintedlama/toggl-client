import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-project-users');

describe('projects', () => {
  let client;
  let workspace_id;
  before(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  // Add a delay of 1 second between each test case
  beforeEach((done) => {
    setTimeout(done, 1000);
  });

  it('should get project-users by project id', async () => {
    const projectUsers = await client.projectUsers.get(workspace_id);

    debug(projectUsers);

    expect(projectUsers).to.exist.to.be.an('array');
    expect(projectUsers[0]).to.have.property('id');
    expect(projectUsers[0]).to.have.property('project_id');
    expect(projectUsers[0]).to.have.property('user_id');
    expect(projectUsers[0]).to.have.property('workspace_id');
    expect(projectUsers[0]).to.have.property('manager');
  });

  // Unable to test this without additional users
  it.skip('should create, update and delete a project-user', async () => {
    const projectUser = {
      //user_id: ,
      workspace_id,
      manager: false,
    };
    debug(projectUser);
    const addedProjectUser = await client.projectUsers.create(workspace_id, projectUser);
    debug('addedProjectUser');
    debug(addedProjectUser);
    expect(addedProjectUser).to.be.an('object');
    expect(addedProjectUser).to.have.property('workspace_id').equal(workspace_id);
    expect(addedProjectUser).to.have.property('project_id');
    expect(addedProjectUser).to.have.property('manager');

    const updatedProjectUser = await client.projectUsers.update(workspace_id, projectUser.id, {
      manager: true,
    });
    debug('updatedProjectUser');
    debug(updatedProjectUser);
    expect(addedProjectUser).to.be.an('object');
    expect(addedProjectUser).to.have.property('workspace_id').equal(workspace_id);
    expect(addedProjectUser).to.have.property('project_id');
    expect(addedProjectUser).to.have.property('manager').equal(false);

    await client.projectUsers.delete(workspace_id, projectUser.id);
    const projectusers = client.projectUsers.get(workspace_id);
    debug('projectusers');
    debug(projectusers);
    expect(projectusers).to.be.an('array');
    expect(projectusers).to.not.include({ id: projectUser.id });
  });
});
