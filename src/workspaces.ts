import { mapData, defaultToEmpty } from './utils.js';
import type TogglClient from './client.js';
import type { Workspace, User, Client, Group, Project, Task, Tag } from './types.js';

/**
 * Access workspaces. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md
 */
class Workspaces {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Lists all workspaces
   */
  async list(): Promise<Workspace[]> {
    return await this.client.get<Workspace[]>('me/workspaces');
  }

  /**
   * Gets a workspace by id
   */
  async get(id: number | string): Promise<Workspace | undefined> {
    const res = await this.client.get(`workspaces/${id}`);
    return mapData<Workspace>(res);
  }

  /**
   * Updates an existing workspace
   */
  async update(id: number | string, workspace: Partial<Workspace>): Promise<Workspace> {
    return await this.client.put<Workspace>(`workspaces/${id}`, { workspace });
  }

  /**
   * Gets a list of users associated with the workspace
   */
  async users(id: number | string): Promise<User[]> {
    return defaultToEmpty(await this.client.get<User[]>(`workspaces/${id}/users`));
  }

  /**
   * Gets a list of clients associated with the workspace
   */
  async clients(id: number | string): Promise<Client[]> {
    return defaultToEmpty(await this.client.get<Client[]>(`workspaces/${id}/clients`));
  }

  /**
   * Gets a list of groups associated with the workspace
   */
  async groups(id: number | string): Promise<Group[]> {
    return defaultToEmpty(await this.client.get<Group[]>(`workspaces/${id}/groups`));
  }

  /**
   * Gets a list of projects associated with the workspace
   */
  async projects(id: number | string): Promise<Project[]> {
    return defaultToEmpty(await this.client.get<Project[]>(`workspaces/${id}/projects`));
  }

  /**
   * Gets a list of tasks associated with the workspace
   */
  async tasks(id: number | string): Promise<Task[]> {
    return defaultToEmpty(await this.client.get<Task[]>(`workspaces/${id}/tasks`));
  }

  /**
   * Gets a list of tags associated with the workspace
   */
  async tags(id: number | string): Promise<Tag[]> {
    return defaultToEmpty(await this.client.get<Tag[]>(`workspaces/${id}/tags`));
  }
}

export default Workspaces;
