import { mapData } from './utils.js';

/**
 * Access Tasgs. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/tags.md
 *
 * @class Tags
 */
class Tags {
  constructor(client) {
    this.client = client;
  }

  /**
   * Validates that a tag contains the name property.
   *
   * @param {Object} tag The tag object to be validated
   * @throws {Error} 'The tag must include name'
   */
  validateTag(tag) {
    if (!tag.name) {
      throw new Error('The tag must include name');
    }
  }

  /**
   * Creates a new tag
   *
   * @param {number} workspace_id Id of the workspace
   * @param {object} tag A tag object with the property `name` and optionally `workspace_id`
   * @returns Tag created
   * @memberof Tags
   */
  async create(workspace_id, tag) {
    this.validateTag(tag);
    tag = { ...tag, workspace_id };
    return mapData(await this.client.post(`workspaces/${workspace_id}/tags`, tag));
  }

  /**
   * Updates an existing tag
   *
   * @param {number} workspace_id Id of the workspace
   * @param {(number|string)} id Id of the tag to be updated
   * @param {object} tag A tag object with the property `name` and optionally `workspace_id`
   * @returns Updated tag
   * @memberof Tags
   */
  async update(workspace_id, id, tag) {
    this.validateTag(tag);
    return await this.client.put(`workspaces/${workspace_id}/tags/${id}`, tag);
  }

  /**
   * Deletes an existing tag
   *
   * @param {number} workspace_id Id of the workspace
   * @param {(number|string)} id If of the tag to be deleted
   * @memberof Tags
   */
  async delete(workspace_id, id) {
    await this.client.delete(`workspaces/${workspace_id}/tags/${id}`);
  }
}

export default Tags;
