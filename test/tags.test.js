import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-tags');

describe.skip('tags', async () => {
  it('should create, update and delete a tag', async () => {
    const tag = { name: `testing-${Date.now()}` };
    debug(tag);

    const client = togglClient();
    const workspaces = await client.workspaces.list();
    const workspace_id = workspaces[0].id;
    debug(workspace_id);

    const createdTag = await client.tags.create(workspace_id, tag);
    debug('createdTag');
    debug(createdTag);
    expect(createdTag).to.be.an('object');
    expect(createdTag).to.have.property('name').equal(tag.name);
    expect(createdTag).to.have.property('at');
    expect(createdTag).to.have.property('workspace_id');
    expect(createdTag).to.have.property('id');

    const updatedTagName = `${tag.name}-updated`;

    const updatedTag = await client.tags.update(workspace_id, createdTag.id, { name: updatedTagName });
    debug('updatedTag')
    debug(updatedTag);
    expect(updatedTag).to.be.an('object');
    expect(updatedTag).to.have.property('name').equal(updatedTagName);
    expect(updatedTag).to.have.property('at');
    expect(updatedTag).to.have.property('workspace_id');
    expect(updatedTag).to.have.property('id');

    await client.tags.delete(workspace_id, updatedTag.id);
    const tags = await client.workspaces.tags(workspace_id);
    expect(tags).to.not.include.members([updatedTag]);
  });
});
