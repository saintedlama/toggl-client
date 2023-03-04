import { mapData } from './utils.js';

/**
 * Access time entries. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md
 *
 * @class TimeEntries
 */
class TimeEntries {
  constructor(client) {
    this.client = client;
  }

  /**
   * Lists time entries
   *
   * @param {*} query
   * @returns List of time entries
   * @memberof TimeEntries
   */
  async list(query) {
    if (!query || !Object.prototype.hasOwnProperty.call(query, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    if (!query || !Object.prototype.hasOwnProperty.call(query, 'end_date')) {
      throw new Error('The parameters must include end_date');
    }
    return await this.client.get('me/time_entries', query);
  }

  /**
   * Creates a new time entry
   *
   * @param {*} time_entry
   * @returns
   * @memberof TimeEntries
   */
  async create(time_entry) {
    return await this.client.post(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'node-toggle-client',
      ...time_entry,
    });
  }

  async start(time_entry) {
    return await this.client.post(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'node-toggle-client',
      ...time_entry,
    });
  }

  async stop(time_entry) {
    const workspace_id = time_entry.workspace_id;
    const time_entry_id = time_entry.id;
    return await this.client.patch(`workspaces/${workspace_id}/time_entries/${time_entry_id}/stop`);
  }

  async get(id) {
    // TODO looks like this endpoint doesn't have a v9 match, at least in the documentation
    return mapData(await this.client.get(`time_entries/${id}`));
  }

  async current() {
    return await this.client.get(`me/time_entries/current`);
  }

  async update(id, time_entry) {
    return await this.client.put(`workspaces/${time_entry.workspace_id}/time_entries/${id}`, time_entry);
  }

  async delete(id) {
    await this.client.delete(`time_entries/${id}`);
  }
}

export default Reports;
