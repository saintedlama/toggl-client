import type TogglClient from './client.js';
import type { Group, OrganizationGroup, OrganizationGroupPayload, OrganizationGroupParams } from './types.js';

/**
 * Access groups. See https://developers.track.toggl.com/docs/api/groups
 */
class Groups {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Validates that a group contains a name property.
   *
   * @param group The group object to validate
   * @throws {Error} 'The group must include name'
   */
  validateGroup(group: { name?: string }): void {
    if (!group || !group.name) {
      throw new Error('The group must include name');
    }
  }

  /**
   * Lists groups in a workspace.
   *
   * See https://developers.track.toggl.com/docs/api/groups#get-workspace-groups
   *
   * @param workspaceId ID of the workspace
   * @returns Array of groups in the workspace
   */
  async list(workspaceId: number): Promise<Group[]> {
    return await this.client.get<Group[]>(`workspaces/${workspaceId}/groups`);
  }

  /**
   * Creates a new group in a workspace.
   *
   * Supports both `(workspaceId, group)` and `({ workspace_id, name, ... })` calling styles.
   * See https://developers.track.toggl.com/docs/api/groups#post-workspace-group
   *
   * @param workspaceIdOrGroup Workspace ID or group object with workspace_id
   * @param group Group data when workspaceId is passed as first parameter
   * @returns The created group
   */
  async create(workspaceIdOrGroup: number | Partial<Group>, group?: Partial<Group>): Promise<Group> {
    let workspaceId: number;
    let payload: Partial<Group>;

    if (typeof workspaceIdOrGroup === 'number') {
      workspaceId = workspaceIdOrGroup;
      payload = group || {};
    } else {
      payload = workspaceIdOrGroup;
      workspaceId = payload.workspace_id as number;
    }

    if (workspaceId === undefined || workspaceId === null) {
      throw new Error('The workspace_id must be provided');
    }
    this.validateGroup(payload);

    return await this.client.post<Group>(`workspaces/${workspaceId}/groups`, { name: payload.name });
  }

  /**
   * Updates an existing group in a workspace.
   *
   * See https://developers.track.toggl.com/docs/api/groups#put-workspace-group
   *
   * @param workspaceId ID of the workspace
   * @param groupId ID of the group to update
   * @param group Group payload with updated name
   * @returns The updated group
   */
  async update(workspaceId: number, groupId: number | string, group: Partial<Group>): Promise<Group> {
    this.validateGroup(group);
    return await this.client.put<Group>(`workspaces/${workspaceId}/groups/${groupId}`, { name: group.name });
  }

  /**
   * Deletes a group from a workspace.
   *
   * See https://developers.track.toggl.com/docs/api/groups#delete-workspace-group
   *
   * @param workspaceId ID of the workspace
   * @param groupId ID of the group to delete
   */
  async delete(workspaceId: number, groupId: number | string): Promise<void> {
    await this.client.delete(`workspaces/${workspaceId}/groups/${groupId}`);
  }

  /**
   * Lists groups in an organization with user and workspace assignments.
   *
   * See https://developers.track.toggl.com/docs/api/groups#get-organization-groups
   *
   * @param organizationId ID of the organization
   * @param params Optional query parameters (name, workspace)
   * @returns Array of organization groups
   */
  async listInOrganization(organizationId: number, params?: OrganizationGroupParams): Promise<OrganizationGroup[]> {
    return await this.client.get<OrganizationGroup[]>(`organizations/${organizationId}/groups`, params);
  }

  /**
   * Creates a group in an organization.
   *
   * See https://developers.track.toggl.com/docs/api/groups#post-organization-group
   *
   * @param organizationId ID of the organization
   * @param group Group payload (name, users, workspaces)
   * @returns The created organization group
   */
  async createInOrganization(organizationId: number, group: OrganizationGroupPayload): Promise<OrganizationGroup> {
    this.validateGroup(group);
    return await this.client.post<OrganizationGroup>(`organizations/${organizationId}/groups`, group);
  }

  /**
   * Updates a group in an organization.
   *
   * See https://developers.track.toggl.com/docs/api/groups#put-organization-group
   *
   * @param organizationId ID of the organization
   * @param groupId ID of the group to update
   * @param group Updated group payload
   * @returns The updated organization group
   */
  async updateInOrganization(
    organizationId: number,
    groupId: number | string,
    group: OrganizationGroupPayload,
  ): Promise<OrganizationGroup> {
    this.validateGroup(group);
    return await this.client.put<OrganizationGroup>(`organizations/${organizationId}/groups/${groupId}`, group);
  }

  /**
   * Deletes a group from an organization.
   *
   * See https://developers.track.toggl.com/docs/api/groups#delete-organization-group
   *
   * @param organizationId ID of the organization
   * @param groupId ID of the group to delete
   */
  async deleteInOrganization(organizationId: number, groupId: number | string): Promise<void> {
    await this.client.delete(`organizations/${organizationId}/groups/${groupId}`);
  }
}

export default Groups;
