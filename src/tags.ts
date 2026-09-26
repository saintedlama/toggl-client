import type TogglClient from './client.js';
import type { Tag } from './types.js';

/**
 * Access Tags. See https://developers.track.toggl.com/docs/api/tags
 */
class Tags {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Validates that a tag contains the name property.
   */
  validateTag(tag: Partial<Tag>): void {
    if (!tag || !tag.name) {
      throw new Error('The tag must include name');
    }
  }

  /**
   * Creates a new tag
   */
  async create(workspace_id: number, tag: Partial<Tag>): Promise<Tag> {
    this.validateTag(tag);
    const payload = { ...tag, workspace_id };
    return await this.client.post<Tag>(`workspaces/${workspace_id}/tags`, payload);
  }

  /**
   * Updates an existing tag
   */
  async update(workspace_id: number, id: number | string, tag: Partial<Tag>): Promise<Tag> {
    this.validateTag(tag);
    return await this.client.put<Tag>(`workspaces/${workspace_id}/tags/${id}`, tag);
  }

  /**
   * Deletes an existing tag
   */
  async delete(workspace_id: number, id: number | string): Promise<void> {
    await this.client.delete(`workspaces/${workspace_id}/tags/${id}`);
  }
}

export default Tags;
