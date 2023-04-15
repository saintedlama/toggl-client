import { expect } from 'chai';
import dayjs from 'dayjs';
import debugClient from 'debug';
import togglClient from '../index.js';

const debug = debugClient('toggl-client-tests-time-entries');

describe('time-entries', async () => {
  let workspace_id, timeEntryId, client;

  before(async () => {
    client = togglClient();
    const query = {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    };
    const timeEntries = await client.timeEntries.list(query);
    const index = Math.floor(timeEntries.length / 2); // get the middle entry
    timeEntryId = timeEntries[index].id;
    debug(timeEntryId);
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  // Add a delay of 1 second between each test case
  beforeEach((done) => {
    setTimeout(done, 1000);
  });

  it('should get a time entry by id', async () => {
    const client = togglClient();
    const timeEntry = await client.timeEntries.get(timeEntryId);
    debug(timeEntry);
    expect(timeEntry).to.be.an('object');
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
    expect(timeEntry).to.have.property('id').equal(timeEntryId);
  });

  it('should get the current running time entry', async () => {
    const timeEntry = await client.timeEntries.current();
    debug(timeEntry);
    expect(typeof timeEntry).to.be.oneOf([null, 'object']);
    if (timeEntry) {
      expect(timeEntry).to.have.property('workspace_id');
      expect(timeEntry).to.have.property('project_id');
    }
  });

  it('should list time entries', async () => {
    const query = {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    };
    const timeEntries = await client.timeEntries.list(query);
    debug(timeEntries);
    expect(timeEntries).to.be.an('array');
    const index = Math.floor(timeEntries.length / 2); // get the middle entry
    debug(index);
    const timeEntry = timeEntries[index];
    debug(timeEntry);

    expect(timeEntry).to.be.an('object');
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
  });

  it('should error if parameters are not included with list', async () => {
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

  it('should require a workspace id when creating time entry', async () => {
    const timeEntry = {
      description: `testing-${Date.now()}`,
    };

    try {
      await client.timeEntries.start(timeEntry);
      expect.fail('Expected an error to be thrown');
    } catch (e) {
      expect(e.message).to.equal('The parameters must include workspace_id');
    }
  });

  it('should create, update and delete a time entry', async () => {
    const timeEntry = {
      description: `testing-${Date.now()}`,
      workspace_id,
      start: new Date().toISOString(),
    };
    debug(timeEntry);

    const createdTimeEntry = await client.timeEntries.start(timeEntry);
    debug('createdTimeEntry');
    debug(createdTimeEntry);
    expect(createdTimeEntry).to.be.an('object');
    expect(createdTimeEntry).to.have.property('description').equal(timeEntry.description);
    expect(createdTimeEntry).to.have.property('at');
    expect(createdTimeEntry).to.have.property('workspace_id');
    expect(createdTimeEntry).to.have.property('id');

    const updatedTimeEntryDescription = createdTimeEntry.description + '-updated';
    const updatedTimeEntry = await client.timeEntries.update(createdTimeEntry.id, {
      description: updatedTimeEntryDescription,
      workspace_id,
    });
    debug('updatedTimeEntry');
    debug(updatedTimeEntry);
    expect(updatedTimeEntry).to.be.an('object');
    expect(updatedTimeEntry).to.have.property('description').equal(updatedTimeEntryDescription);
    expect(updatedTimeEntry).to.have.property('at');
    expect(updatedTimeEntry).to.have.property('workspace_id');
    expect(updatedTimeEntry).to.have.property('id');

    await client.timeEntries.delete(createdTimeEntry.id);

    const timeEntriesList = await client.timeEntries.list({
      start_date: dayjs().startOf('day').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('day').format('YYYY-MM-DD'),
    });
    debug('timeEntriesList');
    debug(timeEntriesList);
    expect(timeEntriesList).to.be.an('array');
    expect(timeEntriesList).to.be.empty;
  });
});
