import dayjs from 'dayjs';

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
   * Lists time entries. The `query` must include `start_date` and `end_date`. Note that due to
   * limitations of the v9 API, start_date must not be earlier 3 months ago. If you want results
   * further back, use the reports endpoints.
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
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'start')) {
      throw new Error('The parameters must include start');
    }
    return await this.client.post(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'saintedlama/toggl-client',
      ...time_entry,
    });
  }

  /**
   * Creates a new time entry
   *
   * @param {*} time_entry
   * @returns
   * @memberof TimeEntries
   */
  async start(time_entry) {
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'start')) {
      throw new Error('The parameters must include start');
    }
    return await this.client.post(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'saintedlama/toggl-client',
      ...time_entry,
    });
  }

  /**
   * Stops the current running time entry
   * @returns
   * @memberof TimeEntries
   */
  async stop(time_entry) {
    const workspace_id = time_entry.workspace_id;
    const time_entry_id = time_entry.id;
    return await this.client.patch(`workspaces/${workspace_id}/time_entries/${time_entry_id}/stop`);
  }

  /**
   * Gets the time entry specified by id. Due to limitations of the v9 API, start_date must not be
   * earlier than 3 months ago. If you want results further back, use the reports endpoints.
   *
   * @param {*} id
   * @returns TimeEntry
   */
  async get(id) {
    const timeEntries = await this.client.get('me/time_entries', {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    });
    const timeEntry = timeEntries.filter((x) => x.id == id)[0];
    return timeEntry;
  }

  /**
   * Gets the current running time entry
   * @returns
   * @memberof TimeEntries
   */
  async current() {
    return await this.client.get(`me/time_entries/current`);
  }

  /**
   * Updates an existing time entry
   *
   * @param {number} id
   * @param {*} time_entry
   * @returns
   * @memberof TimeEntries
   */
  async update(id, time_entry) {
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    return await this.client.put(`workspaces/${time_entry.workspace_id}/time_entries/${id}`, time_entry);
  }

  /**
   * Delete an existing time entry
   *
   * @param {number} id
   */
  async delete(id) {
    await this.client.delete(`time_entries/${id}`);
  }
}

export default TimeEntries;
