import { expect } from 'chai';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-time-entries');

describe.only('time-entries', async () => {
  it.skip('should get a time entry by id', async () => {
    const client = togglClient();
    const timeEntry = await client.timeEntries.get(42);
    debug(timeEntry);
  });

  it('should get the current running time entry', async () => {
    const client = togglClient();
    const timeEntry = await client.timeEntries.current();
    debug(timeEntry);
    expect(timeEntry).to.be.an('object'); // FIXME this fails if there is no running time entry
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
  });

  it('should list time entries', async () => {
    const client = togglClient();
    const query = {
      start_date: '2023-02-04',
      end_date: '2023-02-08',
    }
    const timeEntries = await client.timeEntries.list(query);
    debug(timeEntries);
    expect(timeEntries).to.be.an('array')
    const index = Math.floor(timeEntries.length / 2); // get the middle entry
    debug(index)
    const timeEntry = timeEntries[index];
    debug(timeEntry);

    expect(timeEntry).to.be.an('object');
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
  });

  it('should error if parameters are not included with list', async () => {
    const client = togglClient();
    try {
      await client.timeEntries.list();
      expect.fail('Expected an error to be thrown');
    } catch (e) {
      expect(e.message).to.equal('The parameters must include start_date');
    }

    try {
      await client.timeEntries.list({ start_date: '2023-02-04' });
      expect.fail('Expected an error to be thrown');
    } catch (e) {
      expect(e.message).to.equal('The parameters must include end_date');
    }
  });

  it.skip('should create, update and delete a time-entry', async () => {
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
    debug('updatedTag');
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
