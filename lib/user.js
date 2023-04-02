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

  // /**
  //  *
  //  * @param {*} user See https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#update-user-data
  //  * @returns The updated user.
  //  * @memberof User
  //  */
  async update(user) {
    // Check if attempting to change the password
    if (user.password && !user.current_password) {
      throw new Error('To change the password you must include the current password');
    }

    // check if the time of day format is valid
    const validTimeOfDayFormat = ['H:mm', 'h:mm A'];
    if (user.timeofday_format && !validTimeOfDayFormat.find(user.timeofday_format)) {
      throw new Error('timeofday_format must be one of H:mm or h:mm');
    }

    const validDateFormat = ['YYYY-MM-DD', 'DD.MM.YYYY', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD/MM/YYYY', 'MM-DD-YYYY'];
    if (user.dateFormat && !validDateFormat.find(user.date_format)) {
      throw new Error('date_format must be one of "YYYY-MM-DD", "DD.MM.YYYY", "DD-MM-YYYY", "MM/DD/YYYY", "DD/MM/YYYY", "MM-DD-YYYY"');
    }
    return await this.client.put(this.endpoint, { user: user });
  }

  /**
   * Resets API token https://developers.track.toggl.com/docs/api/authentication#post-resettoken
   * @returns New API token {String}
   * @memberof User
   */
  async resetToken() {
    return await this.client.post('me/reset_token');
  }
}

export default User;
