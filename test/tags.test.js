import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-tags');

describe.only('tags', async () => {
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

  it('should update a tag',()=>{
    const tag = {
      "id": 13932456,
      "workspace_id": 403916,
      "name": "testing2",
      "at": "2023-03-12T22:40:33.237553Z"
    };
    debug(tag);
    const client = togglClient();
    // const workspaces = await client.workspaces.list();
    // const workspace_id = workspaces[0].id;
    const workspace_id = tag.workspace_id;
    debug(workspace_id);

    const newName = 'testing-newname'
    const updatedTag = await client.tags.update(workspace_id, {name:newName});
    debug(updatedTag);
    expect(updatedTag).to.be.an('object');
    expect(updatedTag).to.have.property('name').equal(tag.newName);
    expect(updatedTag).to.have.property('at');
    expect(updatedTag).to.have.property('workspace_id');
    expect(updatedTag).to.have.property('id');
  });

  it('should delete a tag');
});
