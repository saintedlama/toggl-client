import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import debugClient from 'debug';
import togglClient, { type TogglClient } from '../src/index.js';

const debug = debugClient('toggl-client-tests-groups');

describe('groups', () => {
  let client: TogglClient;
  let workspace_id: number;
  const organization_id = 1;

  beforeAll(async () => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }

    client = togglClient();
    const workspaces = await client.workspaces.list();
    workspace_id = workspaces[0].id;
  });

  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('should list groups in a workspace', async () => {
    const groups = await client.groups.list(workspace_id);
    debug(groups);

    expect(groups).to.exist.to.be.an('array');
    if (groups.length > 0) {
      const group = groups[0];
      expect(group).to.have.property('name');
      expect(group).to.have.property('id');
    }
  });

  it('should create, update and delete a workspace group', async () => {
    const groupName = `test-group-${Date.now()}`;
    const createdGroup = await client.groups.create(workspace_id, { name: groupName });
    debug('createdGroup', createdGroup);

    expect(createdGroup).to.exist.to.be.an('object');
    expect(createdGroup).to.have.property('name');
    expect(createdGroup).to.have.property('id');

    const updatedGroupName = `${groupName}-updated`;
    const updatedGroup = await client.groups.update(workspace_id, createdGroup.id, { name: updatedGroupName });
    debug('updatedGroup', updatedGroup);

    expect(updatedGroup).to.exist.to.be.an('object');
    expect(updatedGroup).to.have.property('name');

    await client.groups.delete(workspace_id, createdGroup.id);
  });

  it('should support create with group object containing workspace_id', async () => {
    const groupName = `test-group-${Date.now()}`;
    const createdGroup = await client.groups.create({ workspace_id, name: groupName });
    debug('createdGroup', createdGroup);

    expect(createdGroup).to.exist.to.be.an('object');
    expect(createdGroup).to.have.property('name');
    expect(createdGroup).to.have.property('id');

    await client.groups.delete(workspace_id, createdGroup.id);
  });

  it('should throw an error if name is missing when creating or updating a group', async () => {
    await expect(client.groups.create(workspace_id, {})).rejects.toThrow('The group must include name');
    await expect(client.groups.update(workspace_id, 1, {})).rejects.toThrow('The group must include name');
  });

  it('should throw an error if workspace_id is missing when creating a group without workspaceId argument', async () => {
    await expect(client.groups.create({ name: 'Group Without WID' })).rejects.toThrow('The workspace_id must be provided');
  });

  it('should list groups in an organization', async () => {
    const orgGroups = await client.groups.listInOrganization(organization_id);
    debug('orgGroups', orgGroups);

    expect(orgGroups).to.exist.to.be.an('array');
    if (orgGroups.length > 0) {
      const orgGroup = orgGroups[0];
      expect(orgGroup).to.have.property('name');
    }
  });

  it('should create, update and delete an organization group', async () => {
    const groupName = `test-org-group-${Date.now()}`;
    const created = await client.groups.createInOrganization(organization_id, {
      name: groupName,
      workspaces: [workspace_id],
    });
    debug('createdOrgGroup', created);

    expect(created).to.exist.to.be.an('object');
    expect(created).to.have.property('name');

    const updated = await client.groups.updateInOrganization(organization_id, created.group_id ?? 1, {
      name: `${groupName}-updated`,
    });
    debug('updatedOrgGroup', updated);

    expect(updated).to.exist.to.be.an('object');

    await client.groups.deleteInOrganization(organization_id, created.group_id ?? 1);
  });
});
