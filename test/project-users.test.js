import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-project-users');

describe.only('projects', () => {
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

  it('should get a project-users by project id', async () => {
    // TODO get user id dynamically
    const projectUsers = await client.projectUsers.get(403916);

    debug(projectUsers);

    expect(projectUsers).to.exist.to.be.an('array');
    expect(projectUsers[0]).to.have.property('id');
    expect(projectUsers[0]).to.have.property('project_id');
    expect(projectUsers[0]).to.have.property('user_id');
    expect(projectUsers[0]).to.have.property('workspace_id');
    expect(projectUsers[0]).to.have.property('manager');
  });

  it('should create, update and delete a project-user', async () => {
    // const project = {
    //   name: `test-project-${Date.now()}`,
    //   workspace_id,
    //   start_date: new Date().toISOString(),
    // };
    // debug(project);
    // const createdProject = await client.projects.create(workspace_id, project);
    // debug('createdProject');
    // debug(createdProject);
    // expect(createdProject).to.be.an('object');
    // expect(createdProject).to.have.property('name').equal(project.name);
    // expect(createdProject).to.have.property('color');
    // expect(createdProject).to.have.property('is_private');
    // expect(createdProject).to.have.property('workspace_id');
    // const updatedProjectName = createdProject.description + '-updated';
    // const updatedProject = await client.projects.update(workspace_id, createdProject.id, {
    //   name: updatedProjectName,
    //   workspace_id,
    // });
    // debug('updatedProject');
    // debug(updatedProject);
    // expect(updatedProject).to.be.an('object');
    // expect(updatedProject).to.have.property('name').equal(updatedProjectName);
    // expect(createdProject).to.have.property('color');
    // expect(createdProject).to.have.property('is_private');
    // expect(createdProject).to.have.property('workspace_id');
    // await client.projects.delete(workspace_id, createdProject.id);
    // const projectsList = await client.projects.list(workspace_id);
    // debug('projectsList');
    // debug(projectsList);
    // expect(projectsList).to.be.an('array');
    // expect(projectsList).to.not.include({ id: createdProject.id });
  });
});
