const { mapData } = require('./utils');

/**
 * Access users. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md
 *
 * @class User
 */
class User {
  constructor(client) {
    this.client = client;
    this.endpoint = 'me';
  }

  /**
   * Gets the current user
   *
   * @param {*} query
   * @returns The current user. By default the request responds with user properties. To get all the workspaces, clients, projects, tasks, time entries and tags which the user can see, add the parameter with_related_data=true If you want to retrieve objects which have changed after certain time, add since parameter to the query. The value should be a unix timestamp (e.g. since=1362579886)
   * @memberof User
   */
  async current(query) {
    return await this.client.get(this.endpoint, query);
  }

  /**
   * Creates a new time entry
   *
   * @param {*} time_entry
   * @returns
   * @memberof User
   */


//   async get(id) {
//     return mapData(await this.client.get(`${endpoint}/${id}`));
//   }

//   async current() {
//     return mapData(await this.client.get(`${endpoint}/current`));
//   }

//   async update(id, time_entry) {
//     return mapData(await this.client.put(`${endpoint}/${id}`, { time_entry }));
//   }

//   async delete(id) {
//     await this.client.delete(`${endpoint}/${id}`);
//   }
}

module.exports = User;
