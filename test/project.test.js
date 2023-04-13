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

  it('should get all projects')

  // it('should update a user', async () => {
  //   // get current user
  //   const user = await client.user.current();
  //   debug(user);
  //   const updatedFullname = user.fullname + ' updated';

  //   // update the fullname name
  //   let updatedUser = await client.user.update({ fullname: updatedFullname });
  //   debug(updatedUser);
  //   expect(updatedUser).to.exist.to.be.an('object');
  //   expect(updatedUser).to.have.property('fullname').equal(updatedFullname);

  //   // put the fullname back
  //   updatedUser = await client.user.update({ fullname: user.fullname });
  //   debug(updatedUser);
  //   expect(updatedUser).to.exist.to.be.an('object');
  //   expect(updatedUser).to.have.property('fullname');
  //   expect(updatedUser).to.have.property('fullname').equal(user.fullname);
  // });

});
