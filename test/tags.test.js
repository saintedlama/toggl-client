import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-tags');

describe.only('tags', async () => {
  const tag = { name: `testing-${Date.now()}` };
  debug(tag);

  it('should create a tag', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();
    const workspace_id = workspaces[0].id;
    debug(workspace_id);
    const createdTag = await client.tags.create(workspace_id, tag);
    debug(createdTag);
    expect(createdTag).to.be.an('object');
    expect(createdTag).to.have.property('name').equal(tag.name);
    expect(createdTag).to.have.property('at');
    expect(createdTag).to.have.property('workspace_id');
    expect(createdTag).to.have.property('id');
  });

  it('should update a tag');

  it('should delete a tag');
});
