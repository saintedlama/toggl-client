import type TogglClient from './client.js';
import type { ProjectUser } from './types.js';

/**
 * Access project users. See https://developers.track.toggl.com/docs/api/projects
 */
class ProjectUsers {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Creates a new project user
   */
  async create(workspace_id: number, project_user: Partial<ProjectUser>): Promise<ProjectUser> {
    return await this.client.post<ProjectUser>(`workspaces/${workspace_id}/project_users`, project_user);
  }

  /**
   * List all project users for a given workspace.
   */
  async get(workspace_id: number): Promise<ProjectUser[]> {
    return await this.client.get<ProjectUser[]>(`workspaces/${workspace_id}/project_users`);
  }

  /**
   * Update the data for a project user for a given workspace.
   */
  async update(workspace_id: number, project_user_id: number | string, project_user: Partial<ProjectUser>): Promise<ProjectUser> {
    return await this.client.put<ProjectUser>(`workspaces/${workspace_id}/project_users/${project_user_id}`, project_user);
  }

  /**
   * Delete a project user for a given workspace.
   */
  async delete(workspace_id: number, project_user_id: number | string): Promise<void> {
    await this.client.delete(`workspaces/${workspace_id}/project_users/${project_user_id}`);
  }
}

export default ProjectUsers;
