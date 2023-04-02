import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-user');

describe.only('user', () => {
  let client, workspace_id;
  before(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  it('should get a user', async () => {
    const user = await client.user.current();

    debug(user);

    expect(user).to.exist.to.be.an('object');
    expect(user.email).to.exist;
    expect(user).to.have.property('email');
    expect(user).to.have.property('fullname');
    expect(user).to.have.property('api_token');
    expect(user).to.have.property('default_workspace_id');
  });

  it('should update a user', async() => {
    // get current user
    const user = await client.user.current();
    debug(user);
    const updatedFullname = user.fullname + ' updated'

    // update the fullname name
    let updatedUser = await client.user.update({fullname: updatedFullname})
    debug(updatedUser)
    expect(updatedUser).to.exist.to.be.an('object');
    expect(updatedUser).to.have.property('fullname').equal(updatedFullname);


    // put the fullname back
    updatedUser = await client.user.update({fullname: user.fullname})
    debug(updatedUser)
    expect(updatedUser).to.exist.to.be.an('object');
    expect(updatedUser).to.have.property('fullname');
    expect(updatedUser).to.have.property('fullname').equal(user.fullname);
  })

  it.skip('should get a new API token', async () => {
    const newToken = await client.user.resetToken();
    debug(newToken);
    expect(newToken).to.exist.to.be.an('string');
  });
})