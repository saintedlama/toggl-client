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
    return mapData(
      await this.client.post('time_entries', {
        time_entry: Object.assign({ created_with: 'node-toggle-client' }, time_entry),
      }),
    );
  }

  async start(time_entry) {
    return mapData(
      await this.client.post('time_entries/start', {
        time_entry: Object.assign({ created_with: 'node-toggle-client' }, time_entry),
      }),
    );
  }

  async stop(id) {
    return mapData(await this.client.put(`time_entries/${id}/stop`));
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
