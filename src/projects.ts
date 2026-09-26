import type TogglClient from './client.js';
import type { Project, Task } from './types.js';

/**
 * Access projects. See https://developers.track.toggl.com/docs/api/projects
 */
class Projects {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Creates a new project
   */
  async create(workspace_id: number, project: Partial<Project>): Promise<Project> {
    return await this.client.post<Project>(`workspaces/${workspace_id}/projects`, project);
  }

  /**
   * Gets an existing project by id
   */
  async get(workspace_id: number, project_id: number | string): Promise<Project | undefined> {
    return await this.client.get<Project>(`workspaces/${workspace_id}/projects/${project_id}`);
  }

  /**
   * Gets all projects in a workspace
   */
  async list(workspace_id: number): Promise<Project[]> {
    return await this.client.get<Project[]>(`workspaces/${workspace_id}/projects`);
  }

  /**
   * Updates an existing project
   */
  async update(workspace_id: number, project_id: number | string, project: Partial<Project>): Promise<Project> {
    return await this.client.put<Project>(`workspaces/${workspace_id}/projects/${project_id}`, project);
  }

  /**
   * Deletes an existing project
   */
  async delete(workspace_id: number, project_id: number | string): Promise<void> {
    await this.client.delete(`workspaces/${workspace_id}/projects/${project_id}`);
  }

  /**
   * Gets tasks associated with the given project
   */
  async tasks(workspace_id: number, project_id: number | string): Promise<Task[]> {
    return await this.client.get<Task[]>(`workspaces/${workspace_id}/projects/${project_id}/tasks`);
  }
}

export default Projects;
