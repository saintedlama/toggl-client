import dayjs from 'dayjs';
import type TogglClient from './client.js';
import type { TimeEntry, TimeEntryInput, TimeEntriesQueryParams } from './types.js';

/**
 * Access time entries. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md
 */
class TimeEntries {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Lists time entries. The `query` must include `start_date` and `end_date`. Note that due to
   * limitations of the v9 API, start_date must not be earlier 3 months ago. If you want results
   * further back, use the reports endpoints.
   */
  async list(query?: TimeEntriesQueryParams): Promise<TimeEntry[]> {
    if (!query || !Object.prototype.hasOwnProperty.call(query, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    if (!query || !Object.prototype.hasOwnProperty.call(query, 'end_date')) {
      throw new Error('The parameters must include end_date');
    }
    return await this.client.get<TimeEntry[]>('me/time_entries', query);
  }

  /**
   * Creates a new time entry
   */
  async create(time_entry: TimeEntryInput): Promise<TimeEntry> {
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'start')) {
      throw new Error('The parameters must include start');
    }
    return await this.client.post<TimeEntry>(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'saintedlama/toggl-client',
      ...time_entry,
    });
  }

  /**
   * Starts a new time entry
   */
  async start(time_entry: TimeEntryInput): Promise<TimeEntry> {
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'start')) {
      throw new Error('The parameters must include start');
    }
    return await this.client.post<TimeEntry>(`workspaces/${time_entry.workspace_id}/time_entries`, {
      created_with: 'saintedlama/toggl-client',
      ...time_entry,
    });
  }

  /**
   * Stops the current running time entry
   */
  async stop(time_entry: { workspace_id: number; id: number | string }): Promise<TimeEntry> {
    const workspace_id = time_entry.workspace_id;
    const time_entry_id = time_entry.id;
    return await this.client.patch<TimeEntry>(`workspaces/${workspace_id}/time_entries/${time_entry_id}/stop`);
  }

  /**
   * Gets the time entry specified by id. Due to limitations of the v9 API, start_date must not be
   * earlier than 3 months ago. If you want results further back, use the reports endpoints.
   */
  async get(id: number | string): Promise<TimeEntry | undefined> {
    const timeEntries = await this.client.get<TimeEntry[]>('me/time_entries', {
      start_date: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      end_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    });
    const timeEntry = timeEntries.filter((x) => String(x.id) === String(id))[0];
    return timeEntry;
  }

  /**
   * Gets the current running time entry
   */
  async current(): Promise<TimeEntry | null> {
    return await this.client.get<TimeEntry | null>('me/time_entries/current');
  }

  /**
   * Updates an existing time entry
   */
  async update(id: number | string, time_entry: Partial<TimeEntryInput>): Promise<TimeEntry> {
    if (!time_entry || !Object.prototype.hasOwnProperty.call(time_entry, 'workspace_id')) {
      throw new Error('The parameters must include workspace_id');
    }
    return await this.client.put<TimeEntry>(`workspaces/${time_entry.workspace_id}/time_entries/${id}`, time_entry);
  }

  /**
   * Delete an existing time entry
   */
  async delete(
    workspace_id: number | string | { workspace_id: number | string; id: number | string },
    id?: number | string,
  ): Promise<void> {
    if (typeof workspace_id === 'object' && workspace_id !== null) {
      const entry = workspace_id;
      return await this.client.delete(`workspaces/${entry.workspace_id}/time_entries/${entry.id}`);
    }
    if (id !== undefined) {
      return await this.client.delete(`workspaces/${workspace_id}/time_entries/${id}`);
    }
    return await this.client.delete(`time_entries/${workspace_id}`);
  }
}

export default TimeEntries;
