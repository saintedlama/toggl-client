const { mapData } = require('./client');

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
   * Creates a new tag
   *
   * @param {*} tag
   * @returns Tag created
   * @memberof Tags
   */
  async create(tag) {
    return mapData(await this.client.post('tags', { tag }));
  }

  /**
   * Updates an existing tag
   *
   * @param {(number|string)} id Id of the tag to be updated
   * @param {*} tag
   * @returns Updated tag
   * @memberof Tags
   */
  async update(id, tag) {
    return mapData(await this.client.put(`tags/${id}`, { tag }));
  }

  /**
   * Deletes an existing tag
   *
   * @param {(number|string)} id If of the tag to be deleted
   * @memberof Tags
   */
  async delete(id) {
    await this.client.delete(`tags/${id}`);
  }
}

module.exports = Tags;
