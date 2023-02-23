import { mapData } from './utils.js';

/**
 * Access groups. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/groups.md
 *
 * @class Groups
 */
class Groups {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a group
   *
   * @param {*} group
   * @returns group created
   * @memberof Groups
   */
  async create(group) {
    return mapData(await this.client.post('groups', { group }));
  }

  /**
   * Updates a group
   *
   * @param {(number|string)} id group id that should be updated
   * @param {*} group
   * @returns result of update operation
   * @memberof Groups
   */
  async update(id, group) {
    return mapData(await this.client.put(`groups/${id}`, { group }));
  }

  /**
   * Deletes a group
   *
   * @param {(number|string)} id group id that should be deleted
   * @memberof Groups
   */
  async delete(id) {
    await this.client.delete(`groups/${id}`);
  }
}

export default Groups;
