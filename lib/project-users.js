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
   * @param {number} workspace_id Id of the workspace
   * @param {*} project_user
   * @returns project user created
   * @memberof ProjectUsers
   */
  async create(workspace_id, project_user) {
    return await this.client.post(`workspaces/${workspace_id}/project_users`, project_user);
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
   * Update the data for a project user for a given workspace.
   *
   * @param {number} workspace_id Id of the workspace
   * @param {project_user_id} id Id of the project user to update
   * @param {*} project_user
   */
  async update(workspace_id, project_user_id, project_user) {
    return await this.client.put(`workspaces/${workspace_id}/project_users/${project_user_id}`, project_user);
  }

  /**
   * Delete a project user for a given workspace.
   *
   * @param {number} workspace_id
   * @param {number} project_user_id
   */
  async delete(workspace_id, project_user_id) {
    await this.client.delete(`workspaces/${workspace_id}/project_users/${project_user_id}`);
  }
}

export default ProjectUsers;
