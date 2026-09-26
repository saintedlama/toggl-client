import { mapData } from './utils.js';
import type TogglClient from './client.js';
import type { Group } from './types.js';

/**
 * Access groups. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/groups.md
 */
class Groups {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Creates a group
   */
  async create(group: Partial<Group>): Promise<Group | undefined> {
    const res = await this.client.post('groups', { group });
    return mapData<Group>(res);
  }

  /**
   * Updates a group
   */
  async update(id: number | string, group: Partial<Group>): Promise<Group | undefined> {
    const res = await this.client.put(`groups/${id}`, { group });
    return mapData<Group>(res);
  }

  /**
   * Deletes a group
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete(`groups/${id}`);
  }
}

export default Groups;
