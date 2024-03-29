/**
 * Access projects. See https://developers.track.toggl.com/docs/api/projects
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
   * @param {(number)} workspace_id Id of the workspace to be updated
   * @param {*} project
   * @returns Project created
   * @memberof Projects
   */
  async create(workspace_id, project) {
    return await this.client.post(`workspaces/${workspace_id}/projects`, project);
  }

  /**
   * Gets an existing project by id
   *
   * @param {(number)} workspace_id Id of the project to get
   * @param {(number)} project_id Id of the project to get
   * @returns Project if a project with the specified id exists, othererwise undefined
   * @memberof Projects
   */
  async get(workspace_id, project_id) {
    return await this.client.get(`workspaces/${workspace_id}/projects/${project_id}`);
  }

  /**
   * Gets all projects
   *
   * @param {(number)} workspace_id Id of the project to get
   * @param {(number)} project_id Id of the project to get
   * @returns Project if a project with the specified id exists, othererwise undefined
   * @memberof Projects
   */
  async list(workspace_id) {
    return await this.client.get(`workspaces/${workspace_id}/projects`);
  }

  /**
   * Updates an existing project
   *
   * @param {(number)} workspace_id Id of the workspace to be updated
   * @param {(number)} project_id Id of the project to be updated
   * @param {*} project
   * @returns The updated project
   * @memberof Projects
   */
  async update(workspace_id, project_id, project) {
    return await this.client.put(`workspaces/${workspace_id}/projects/${project_id}`, project);
  }

  /**
   * Deletes an existing project
   *
   * @param {(number)} id Id of the project to be deleted
   * @memberof Projects
   */
  async delete(workspace_id, project_id) {
    await this.client.delete(`workspaces/${workspace_id}/projects/${project_id}`);
  }

  /**
   * Gets tasks associated with the given project
   *
   * @param {(number)} id Id of the project
   * @returns Array of tasks associated with the project
   * @memberof Projects
   */
  async tasks(workspace_id, project_id) {
    return await this.client.get(`workspaces/${workspace_id}/projects/${project_id}/tasks`);
  }
}

export default Projects;
