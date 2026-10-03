import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { debuglog } from 'node:util';
import togglClient, { type TogglClient, offsetDate, formatDate } from '../src/index.js';

const debug = debuglog('toggl-client-tests-time-entries');

describe('time-entries', () => {
  let workspace_id: number;
  let timeEntryId: number;
  let client: TogglClient;

  beforeAll(async () => {
    client = togglClient();
    const query = {
      start_date: offsetDate(new Date(), { months: -3 }),
      end_date: offsetDate(new Date(), { days: 1 }),
    };
    const timeEntries = await client.timeEntries.list(query);
    const index = Math.floor(timeEntries.length / 2); // get the middle entry
    timeEntryId = timeEntries[index].id;
    debug('%d', timeEntryId);
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  // Add a delay of 1 second between each test case
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should get a time entry by id', async () => {
    const client = togglClient();
    const timeEntry = await client.timeEntries.get(timeEntryId);
    debug('%o', timeEntry);
    expect(timeEntry).to.be.an('object');
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
    expect(timeEntry).to.have.property('id').equal(timeEntryId);
  });

  it('should get the current running time entry', async () => {
    const timeEntry = await client.timeEntries.current();
    debug('%o', timeEntry);
    expect(typeof timeEntry).to.be.oneOf(['undefined', 'object']);
    if (timeEntry) {
      expect(timeEntry).to.have.property('workspace_id');
      expect(timeEntry).to.have.property('project_id');
    }
  });

  it('should list time entries', async () => {
    const query = {
      start_date: offsetDate(new Date(), { months: -3 }),
      end_date: offsetDate(new Date(), { days: 1 }),
    };
    const timeEntries = await client.timeEntries.list(query);
    debug('%o', timeEntries);
    expect(timeEntries).to.be.an('array');
    const index = Math.floor(timeEntries.length / 2); // get the middle entry
    debug('%d', index);
    const timeEntry = timeEntries[index];
    debug('%o', timeEntry);

    expect(timeEntry).to.be.an('object');
    expect(timeEntry).to.have.property('workspace_id');
    expect(timeEntry).to.have.property('project_id');
  });

  it('should error if parameters are not included with list', async () => {
    try {
      await client.timeEntries.list();
      expect.fail('Expected an error to be thrown');
    } catch (e: any) {
      expect(e.message).to.equal('The parameters must include start_date');
    }

    try {
      await client.timeEntries.list({ start_date: '2023-02-04' } as any);
      expect.fail('Expected an error to be thrown');
    } catch (e: any) {
      expect(e.message).to.equal('The parameters must include end_date');
    }
  });

  it('should require a workspace id when creating time entry', async () => {
    const timeEntry = {
      description: `testing-${Date.now()}`,
    };

    try {
      await client.timeEntries.start(timeEntry as any);
      expect.fail('Expected an error to be thrown');
    } catch (e: any) {
      expect(e.message).to.equal('The parameters must include workspace_id');
    }
  });

  it('should create, update and delete a time entry', async () => {
    const timeEntry = {
      description: `testing-${Date.now()}`,
      workspace_id,
      start: new Date().toISOString(),
    };
    debug('%o', timeEntry);

    const createdTimeEntry = await client.timeEntries.start(timeEntry);
    debug('createdTimeEntry %o', createdTimeEntry);
    expect(createdTimeEntry).to.be.an('object');
    if (process.env.TOGGL_E2E) {
      expect(createdTimeEntry).to.have.property('description').equal(timeEntry.description);
    } else {
      expect(createdTimeEntry).to.have.property('description').that.is.a('string');
    }
    expect(createdTimeEntry).to.have.property('at');
    expect(createdTimeEntry).to.have.property('workspace_id');
    expect(createdTimeEntry).to.have.property('id');

    const updatedTimeEntryDescription = (createdTimeEntry.description || 'entry') + '-updated';
    const updatedTimeEntry = await client.timeEntries.update(createdTimeEntry.id, {
      description: updatedTimeEntryDescription,
      workspace_id,
    });
    debug('updatedTimeEntry %o', updatedTimeEntry);
    expect(updatedTimeEntry).to.be.an('object');
    if (process.env.TOGGL_E2E) {
      expect(updatedTimeEntry).to.have.property('description').equal(updatedTimeEntryDescription);
    } else {
      expect(updatedTimeEntry).to.have.property('description').that.is.a('string');
    }
    expect(updatedTimeEntry).to.have.property('at');
    expect(updatedTimeEntry).to.have.property('workspace_id');
    expect(updatedTimeEntry).to.have.property('id');

    await client.timeEntries.delete(workspace_id, createdTimeEntry.id);

    const today = formatDate(new Date());
    const timeEntriesList = await client.timeEntries.list({
      start_date: today,
      end_date: today,
    });
    debug('timeEntriesList %o', timeEntriesList);
    expect(timeEntriesList).to.be.an('array');
    if (process.env.TOGGL_E2E) {
      expect(timeEntriesList).to.be.empty;
    }
  });
});
