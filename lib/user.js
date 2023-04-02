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

  // /**
  //  *
  //  * @param {*} user See https://developers.track.toggl.com/docs/api/me#put-me
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
