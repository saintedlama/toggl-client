import { describe, it, expect, beforeAll } from 'vitest';
import { debuglog } from 'node:util';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debuglog('toggl-client-tests-user');

describe('user', () => {
  let client: TogglClient;
  beforeAll(async () => {
    client = togglClient();
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

  it('should update a user', async () => {
    // get current user
    const user = await client.user.current();
    debug(user);
    const updatedFullname = user.fullname + ' updated';

    // update the fullname name
    let updatedUser = await client.user.update({ fullname: updatedFullname });
    debug(updatedUser);
    expect(updatedUser).to.exist.to.be.an('object');

    // put the fullname back
    updatedUser = await client.user.update({ fullname: user.fullname });
    debug(updatedUser);
    expect(updatedUser).to.exist.to.be.an('object');
    expect(updatedUser).to.have.property('fullname');
  });

  it('should get a new API token', async () => {
    const newToken = await client.user.resetToken();
    debug(newToken);
    expect(newToken).to.exist.to.be.a('string');
  });
});
