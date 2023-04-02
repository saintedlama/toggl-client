/**
 * Access users. See https://developers.track.toggl.com/docs/api/me
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
   * @returns The current user.
   *
   * See https://developers.track.toggl.com/docs/api/me#get-me
   *
   * @memberof User
   */
  async current() {
    return await this.client.get(this.endpoint);
  }

  /**
   * Updates the user. You can only update `country_id`, `current_password`, `default_workspace_id`, `email`, `fullname`,`name`, `password`, `timezone`
   *
   * See https://developers.track.toggl.com/docs/api/me#put-me
   *
   * @param {*} user
   * @returns The updated user.
   * @memberof User
   */
  async update(user) {
    // Check if attempting to change the password
    if (user.password && !user.current_password) {
      throw new Error('To change the password you must include the current password');
    }

    return await this.client.put(this.endpoint, user);
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
