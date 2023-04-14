import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-projects');

describe.only('projects', () => {
  let client;
  let workspace_id;
  let project_id
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

  it('should get a project by id', async () => {
    const project = await client.projects.get(workspace_id, project_id);

    debug(project);

    expect(project).to.exist.to.be.an('object');
    expect(project).to.have.property('name');
    expect(project).to.have.property('id');
    expect(project).to.have.property('workspace_id');
    expect(project).to.have.property('color');
  });

  it('should get all projects', async () => {
    const projects = await client.projects.list(workspace_id);
    debug(projects);

    expect(projects).to.exist.to.be.an('array');
    const project = projects[0];
    expect(project).to.exist.to.be.an('object');
    expect(project).to.have.property('name');
    expect(project).to.have.property('id');
    expect(project).to.have.property('workspace_id');
    expect(project).to.have.property('color');
  });

  it('should create, update and delete a project', async () => {
    const project = {
      name: `test-project-${Date.now()}`,
      workspace_id,
      start_date: new Date().toISOString(),
    };
    debug(project);

    const createdProject = await client.projects.create(workspace_id, project);
    debug('createdProject');
    debug(createdProject);
    expect(createdProject).to.be.an('object');
    expect(createdProject).to.have.property('name').equal(project.name);
    expect(createdProject).to.have.property('color');
    expect(createdProject).to.have.property('is_private');
    expect(createdProject).to.have.property('workspace_id');

    const updatedProjectName = createdProject.description + '-updated';
    const updatedProject = await client.projects.update(workspace_id, createdProject.id, {
      name: updatedProjectName,
      workspace_id,
    });
    debug('updatedProject');
    debug(updatedProject);
    expect(updatedProject).to.be.an('object');
    expect(updatedProject).to.have.property('name').equal(updatedProjectName);
    expect(createdProject).to.have.property('color');
    expect(createdProject).to.have.property('is_private');
    expect(createdProject).to.have.property('workspace_id');

    await client.projects.delete(workspace_id, createdProject.id);

    const projectsList = await client.projects.list(workspace_id);
    debug('projectsList');
    debug(projectsList);
    expect(projectsList).to.be.an('array');
    expect(projectsList).to.not.include({ id: createdProject.id });
  });

  // I don't have Tasks enabled, so skipping this test
  // Workspace needs to have the Tasks feature enabled
  it.skip('should get tasks associated with a project', async () => {
    const projectTasks = await client.projects.tasks(workspace_id, project_id);
    debug(projectTasks)
    // Not sure what to assert here...
  })
});
