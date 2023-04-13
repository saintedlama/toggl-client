import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-projects');

describe.only('projects', () => {
  let client;
  let workspace_id = 403916; // TODO lookup default workspace
  let project_id = 184680972; // TODO find a sample project id
  before(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
  });

  it('should get a project by id', async () => {
    const project = await client.projects.get(workspace_id,project_id);

    debug(project);

    expect(project).to.exist.to.be.an('object');
    expect(project).to.have.property('name');
    expect(project).to.have.property('id');
    expect(project).to.have.property('workspace_id');
    expect(project).to.have.property('color');
  });

  it('should get all projects', async () => {
    const projects = await client.projects.list(workspace_id)
    debug(projects)

    expect(projects).to.exist.to.be.an('array')
    const project = projects[0]
    expect(project).to.exist.to.be.an('object');
    expect(project).to.have.property('name');
    expect(project).to.have.property('id');
    expect(project).to.have.property('workspace_id');
    expect(project).to.have.property('color');
  })

  it.only('should create, update and delete a project', async () => {
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
    const updatedProject = await client.projects.update(createdProject.id, {
      name: updatedProjectName,
      workspace_id,
    });
    debug('updatedProject');
    debug(updatedProject);
    expect(updatedProject).to.be.an('object');
    expect(updatedProject).to.have.property('description').equal(updatedProjectName);
    expect(updatedProject).to.have.property('at');
    expect(updatedProject).to.have.property('workspace_id');
    expect(updatedProject).to.have.property('id');

    await client.projects.delete(createdProject.id);

    const projectsList = await client.projects.list({
      start_date: dayjs().startOf('day').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('day').format('YYYY-MM-DD'),
    });
    debug('projectsList');
    debug(projectsList);
    expect(projectsList).to.be.an('array');
    expect(projectsList).to.be.empty;
  });

});
