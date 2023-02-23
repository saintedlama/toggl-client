import { mapData, defaultToEmpty } from './utils.js';

/**
 * Access clients. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md
 *
 * @class Clients
 */
class Clients {
  constructor(client) {
    this.client = client;
  }

  /**
   * Gets a list of clients
   *
   * @returns an array of clients
   * @memberof Clients
   */
  async list() {
    return await this.client.get('clients');
  }

  /**
   * Creates a new client
   *
   * @param {*} client
   * @returns Created client
   * @memberof Clients
   */
  async create(client) {
    return mapData(await this.client.post('clients', { client }));
  }

  /**
   * Gets a client by id
   *
   * @param {(number|string)} id
   * @returns client or undefined if no client with specified id was found
   * @memberof Clients
   */
  async get(id) {
    return await this.client.get(`clients/${id}`);
  }

  /**
   * Updates a client
   *
   * @param {(number|string)} id
   * @returns updated client
   * @memberof Clients
   */
  async update(id, client) {
    return mapData(await this.client.put(`clients/${id}`, { client }));
  }

  /**
   * Deletes a client by id
   *
   * @param {(number|string)} id
   * @memberof Clients
   */
  async delete(id) {
    await this.client.delete(`clients/${id}`);
  }

  /**
   * Lists projects associated with the given client
   *
   * @param {(number|string)} id
   * @param String active filter active clients by specifying true/false/both
   * @memberof Clients
   */
  async projects(id, active) {
    return defaultToEmpty(
      await this.client.get(`clients/${id}/projects`, {
        active: active === undefined ? true : active,
      }),
    );
  }
}

export default Clients;
