const { mapData, defaultToEmpty } = require('./utils');

/**
 * Access workspaces. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md
 *
 * @class Workspaces
 */
class Workspaces {
  constructor(client) {
    this.client = client;
  }

  /**
   * Lists all workspaces
   *
   * @returns List of workspaces
   * @memberof Workspaces
   */
  async list() {
    return await this.client.get('workspaces');
  }

  /**
   * Gets a workspace by id
   *
   * @param {(number|string)} id if of the workspace
   * @returns Workspace or undefined if the given workspace does not exist
   * @memberof Workspaces
   */
  async get(id) {
    return mapData(await this.client.get(`workspaces/${id}`));
  }

  /**
   * Updates an existing workspace
   *
   * @param {(number|string)} id Id of the workspace to be updated
   * @param {*} workspace
   * @returns The updated workspace
   * @memberof Workspaces
   */
  async update(id, workspace) {
    return await this.client.put(`workspaces/${id}`, { workspace });
  }

  /**
   * Gets a list of users associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of users associated with the workspace
   * @memberof Workspaces
   */
  async users(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/users`));
  }

  /**
   * Gets a list of clients associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of clients associated with the workspace
   * @memberof Workspaces
   */
  async clients(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/clients`));
  }

  /**
   * Gets a list of groups associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of groups associated with the workspace
   * @memberof Workspaces
   */
  async groups(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/groups`));
  }

  /**
   * Gets a list of projects associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of projects associated with the workspace
   * @memberof Workspaces
   */
  async projects(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/projects`));
  }

  /**
   * Gets a list of tasks associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of tasks associated with the workspace
   * @memberof Workspaces
   */
  async tasks(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/tasks`));
  }

  /**
   * Gets a list of tags associated with the workspace
   *
   * @param {(number|string)} id Id of the workspace
   * @returns List of tags associated with the workspace
   * @memberof Workspaces
   */
  async tags(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/tags`));
  }
}

module.exports.Workspaces = Workspaces;
