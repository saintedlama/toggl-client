import type TogglClient from './client.js';
import type { User as UserType, UserUpdateInput } from './types.js';

/**
 * Access users. See https://developers.track.toggl.com/docs/api/me
 */
class User {
  client: TogglClient;
  endpoint: string;

  constructor(client: TogglClient) {
    this.client = client;
    this.endpoint = 'me';
  }

  /**
   * Gets the current user
   * See https://developers.track.toggl.com/docs/api/me#get-me
   */
  async current(): Promise<UserType> {
    return await this.client.get<UserType>(this.endpoint);
  }

  /**
   * Updates the user.
   * See https://developers.track.toggl.com/docs/api/me#put-me
   */
  async update(user: Partial<UserUpdateInput>): Promise<UserType> {
    // Check if attempting to change the password
    if (user.password && !user.current_password) {
      throw new Error('To change the password you must include the current password');
    }

    return await this.client.put<UserType>(this.endpoint, user);
  }

  /**
   * Resets API token https://developers.track.toggl.com/docs/api/authentication#post-resettoken
   */
  async resetToken(): Promise<string> {
    return await this.client.post<string>('me/reset_token');
  }
}

export default User;
