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
   * @returns The current user. By default the request responds with user properties. From the API documentation, to get all the workspaces, clients, projects, tasks, 
   * time entries and tags which the user can see, add the parameter with_related_data=true If you want to retrieve objects which have changed after 
   * certain time, add since parameter to the query. The value should be a unix timestamp (e.g. since=1362579886)
   * @memberof User
   */
  async current(query) {
    return await this.client.get(this.endpoint, query);
  }

  // ! FOR FUTURE USE
  // /**
  //  * 
  //  * @param {*} user See https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#update-user-data
  //  * @returns The updated user.
  //  * @memberof User
  //  */
  // async update(user) {
  //   return await this.client.put(this.endpoint, user);
  // }

  /**
   * Resets API token https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#reset-api-token
   * @returns New API token {String}
   * @memberof User 
   */
  async resetToken() {
    return await this.client.post('reset_token');
  }


}

module.exports = User;
