const { mapData, defaultToEmpty } = require('./utils');

/**
 * Access projects. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md
 *
 * @class Projects
 */
class Projects {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new project
   *
   * @param {*} project
   * @returns Project created
   * @memberof Projects
   */
  async create(project) {
    return mapData(await this.client.post('projects', { project }));
  }

  /**
   * Gets an existing project by id
   *
   * @param {(number|string)} id Id of the project to get
   * @returns Project if a project with the specified id exists, othererwise undefined
   * @memberof Projects
   */
  async get(id) {
    return await this.client.get(`projects/${id}`);
  }

  /**
   * Updates an existing project
   *
   * @param {(number|string)} id Id of the project to be updated
   * @param {*} project
   * @returns The updated project
   * @memberof Projects
   */
  async update(id, project) {
    return mapData(await this.client.put(`projects/${id}`, { project }));
  }

  /**
   * Deletes an existing project
   *
   * @param {(number|string)} id Id of the project to be deleted
   * @memberof Projects
   */
  async delete(id) {
    await this.client.delete(`projects/${id}`);
  }

  /**
   * Gets users associated with the given project
   *
   * @param {(number|string)} id Id of the project
   * @returns Array of users associated with the project
   * @memberof Projects
   */
  async users(id) {
    return defaultToEmpty(await this.client.get(`projects/${id}/project_users`));
  }

  /**
   * Gets tasks associated with the given project
   *
   * @param {(number|string)} id Id of the project
   * @returns Array of tasks associated with the project
   * @memberof Projects
   */
  async tasks(id) {
    return defaultToEmpty(await this.client.get(`projects/${id}/tasks`));
  }
}

module.exports = Projects;
