import { mapData } from './utils.js';

/**
 * Access project users. See https://developers.track.toggl.com/docs/api/projects
 *
 * @class ProjectUsers
 */
class ProjectUsers {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new project user
   *
   * @param {*} project_user
   * @returns project user created
   * @memberof ProjectUsers
   */
  async create(project_user) {
    return mapData(await this.client.post('project_users', { project_user }));
  }

  /**
   * List all projects users for a given workspace.
   *
   * @param {number} workspace_id
   * @returns projectUsers[]
   */
  async get(workspace_id) {
    return await this.client.get(`workspaces/${workspace_id}/project_users`);
  }

  /**
   * Updates an existing project user
   * @param {(number|string)} id Id of the project user to update
   * @param {*} project_user
   */
  async update(id, project_user) {
    return mapData(await this.client.put(`project_users/${id}`, { project_user }));
  }

  /**
   * Deletes an existing project user
   * @param {(number|string)} id
   */
  async delete(id) {
    await this.client.delete(`project_users/${id}`);
  }
}

export default ProjectUsers;
