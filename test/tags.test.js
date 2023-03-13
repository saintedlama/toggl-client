import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-tags');

// TODO look at beforeAll or beforeEach

describe.skip('tags', async () => {
  it('should create a tag', async () => {
    const tag = { name: `testing-${Date.now()}` };
    debug(tag);
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

  it('should update a tag', async () => {
    // FIXME How to make this idempotent and clean up after itself
    // Check out https://stackoverflow.com/a/21704397
    const tag = {
      id: 13932627,
      workspace_id: 403916,
    };
    const client = togglClient();
    // const workspaces = await client.workspaces.list();
    // const workspace_id = workspaces[0].id;
    const workspace_id = tag.workspace_id;
    debug(workspace_id);

    const newName = 'testing-newname2';
    const updatedTag = await client.tags.update(workspace_id, tag.id, { name: newName });
    debug(updatedTag);
    expect(updatedTag).to.be.an('object');
    expect(updatedTag).to.have.property('name').equal(newName);
    expect(updatedTag).to.have.property('at');
    expect(updatedTag).to.have.property('workspace_id');
    expect(updatedTag).to.have.property('id');
  });

  it.skip('should delete a tag', async () => {
    // FIXME How to make this idempotent and clean up after itself
    const id = 13932627;
    const workspace_id = 403916;
    const client = togglClient();
    // TODO - delete doesn't return any thing. What is there to test?
    await client.tags.delete(workspace_id, id);
  });
});
