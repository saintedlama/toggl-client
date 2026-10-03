import { describe, it, expect, beforeAll } from 'vitest';
import { debuglog } from 'node:util';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debuglog('toggl-client-tests-project-users');

describe('projects-users', () => {
  let client: TogglClient;
  let workspace_id: number;
  beforeAll(async () => {
    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
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

  it('should create, update and delete a project-user', async () => {
    const projectUser = {
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

    const updatedProjectUser = await client.projectUsers.update(workspace_id, addedProjectUser.id, {
      manager: true,
    });
    debug('updatedProjectUser');
    debug(updatedProjectUser);
    expect(updatedProjectUser).to.be.an('object');
    expect(updatedProjectUser).to.have.property('workspace_id').equal(workspace_id);
    expect(updatedProjectUser).to.have.property('project_id');
    expect(updatedProjectUser).to.have.property('manager').equal(true);

    await client.projectUsers.delete(workspace_id, addedProjectUser.id);
    const projectusers = await client.projectUsers.get(workspace_id);
    debug('projectusers');
    debug(projectusers);
    expect(projectusers).to.be.an('array');
    expect(projectusers).to.not.include({ id: addedProjectUser.id });
  });
});
