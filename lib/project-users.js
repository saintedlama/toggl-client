import { mapData } from './utils.js';

/**
 * Access project users. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
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
   * Gets a project user by id
   *
   * @param {(number|string)} id
   */
  async get(id) {
    return await this.client.get(`project_users/${id}`);
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
