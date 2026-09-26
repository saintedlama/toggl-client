import type TogglClient from './client.js';
import type { Preferences as PreferencesType } from './types.js';

/**
 * Access user preferences. See https://developers.track.toggl.com/docs/api/preferences
 */
class Preferences {
  client: TogglClient;
  endpoint: string;

  constructor(client: TogglClient) {
    this.client = client;
    this.endpoint = 'me/preferences';
  }

  /**
   * Gets preferences for the current user.
   * See https://developers.track.toggl.com/docs/api/preferences#get-preferences-for-the-current-user
   */
  async current(): Promise<PreferencesType> {
    return await this.client.get<PreferencesType>(this.endpoint);
  }

  /**
   * Updates preferences for the current user.
   * See https://developers.track.toggl.com/docs/api/preferences#update-the-preferences-for-the-current-user
   */
  async update(preferences: Partial<PreferencesType>): Promise<string> {
    return await this.client.post<string>(this.endpoint, preferences);
  }

  /**
   * Gets preferences for a specific client of the current user.
   * See https://developers.track.toggl.com/docs/api/preferences#get-preferences-for-an-specific-client-of-the-current-user
   */
  async currentForClient(clientType: 'desktop' | 'web', since?: number): Promise<PreferencesType> {
    const searchParams = since ? { since } : undefined;
    return await this.client.get<PreferencesType>(`${this.endpoint}/${clientType}`, searchParams);
  }

  /**
   * Updates preferences for a specific client of the current user.
   * See https://developers.track.toggl.com/docs/api/preferences#update-the-preferences-for-an-specific-client-of-the-current-user
   */
  async updateForClient(clientType: 'desktop' | 'web', preferences: Partial<PreferencesType>): Promise<string> {
    return await this.client.post<string>(`${this.endpoint}/${clientType}`, preferences);
  }
}

export default Preferences;
