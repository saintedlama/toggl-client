const { mapData } = require('./utils');

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
    const time_entry_id = time_entry.id
    return await this.client.patch(`workspaces/${workspace_id}/time_entries/${time_entry_id}/stop`);
  }

  async get(id) {
    return mapData(await this.client.get(`time_entries/${id}`));
  }

  async current() {
    return await this.client.get(`me/time_entries/current`);
  }

  async update(id, time_entry) {
    return mapData(await this.client.put(`time_entries/${id}`, { time_entry }));
  }

  async delete(id) {
    await this.client.delete(`time_entries/${id}`);
  }
}

module.exports = TimeEntries;
