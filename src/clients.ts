import { mapData, defaultToEmpty } from './utils.js';
import type TogglClient from './client.js';
import type { Client, Project } from './types.js';

/**
 * Access clients. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md
 */
class Clients {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Gets a list of clients
   */
  async list(): Promise<Client[]> {
    return await this.client.get<Client[]>('clients');
  }

  /**
   * Creates a new client
   */
  async create(client: Partial<Client>): Promise<Client | undefined> {
    const res = await this.client.post('clients', { client });
    return mapData<Client>(res);
  }

  /**
   * Gets a client by id
   */
  async get(id: number | string): Promise<Client | undefined> {
    return await this.client.get<Client>(`clients/${id}`);
  }

  /**
   * Updates a client
   */
  async update(id: number | string, client: Partial<Client>): Promise<Client | undefined> {
    const res = await this.client.put(`clients/${id}`, { client });
    return mapData<Client>(res);
  }

  /**
   * Deletes a client by id
   */
  async delete(id: number | string): Promise<void> {
    await this.client.delete(`clients/${id}`);
  }

  /**
   * Lists projects associated with the given client
   */
  async projects(id: number | string, active?: boolean | string): Promise<Project[]> {
    return defaultToEmpty(
      await this.client.get<Project[]>(`clients/${id}/projects`, {
        active: active === undefined ? true : active,
      }),
    );
  }
}

export default Clients;
