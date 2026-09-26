[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Groups

# Class: Groups

Defined in: [groups.ts:7](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L7)

Access groups. See https://developers.track.toggl.com/docs/api/groups

## Constructors

### Constructor

> **new Groups**(`client`): `Groups`

Defined in: [groups.ts:10](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L10)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Groups`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [groups.ts:8](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L8)

## Methods

### create()

> **create**(`workspaceIdOrGroup`, `group?`): `Promise`\<[`Group`](../interfaces/Group.md)\>

Defined in: [groups.ts:48](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L48)

Creates a new group in a workspace.

Supports both `(workspaceId, group)` and `({ workspace_id, name, ... })` calling styles.
See https://developers.track.toggl.com/docs/api/groups#post-workspace-group

#### Parameters

##### workspaceIdOrGroup

`number` \| `Partial`\<[`Group`](../interfaces/Group.md)\>

Workspace ID or group object with workspace_id

##### group?

`Partial`\<[`Group`](../interfaces/Group.md)\>

Group data when workspaceId is passed as first parameter

#### Returns

`Promise`\<[`Group`](../interfaces/Group.md)\>

The created group

***

### createInOrganization()

> **createInOrganization**(`organizationId`, `group`): `Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)\>

Defined in: [groups.ts:117](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L117)

Creates a group in an organization.

See https://developers.track.toggl.com/docs/api/groups#post-organization-group

#### Parameters

##### organizationId

`number`

ID of the organization

##### group

[`OrganizationGroupPayload`](../interfaces/OrganizationGroupPayload.md)

Group payload (name, users, workspaces)

#### Returns

`Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)\>

The created organization group

***

### delete()

> **delete**(`workspaceId`, `groupId`): `Promise`\<`void`\>

Defined in: [groups.ts:91](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L91)

Deletes a group from a workspace.

See https://developers.track.toggl.com/docs/api/groups#delete-workspace-group

#### Parameters

##### workspaceId

`number`

ID of the workspace

##### groupId

`string` \| `number`

ID of the group to delete

#### Returns

`Promise`\<`void`\>

***

### deleteInOrganization()

> **deleteInOrganization**(`organizationId`, `groupId`): `Promise`\<`void`\>

Defined in: [groups.ts:149](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L149)

Deletes a group from an organization.

See https://developers.track.toggl.com/docs/api/groups#delete-organization-group

#### Parameters

##### organizationId

`number`

ID of the organization

##### groupId

`string` \| `number`

ID of the group to delete

#### Returns

`Promise`\<`void`\>

***

### list()

> **list**(`workspaceId`): `Promise`\<[`Group`](../interfaces/Group.md)[]\>

Defined in: [groups.ts:34](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L34)

Lists groups in a workspace.

See https://developers.track.toggl.com/docs/api/groups#get-workspace-groups

#### Parameters

##### workspaceId

`number`

ID of the workspace

#### Returns

`Promise`\<[`Group`](../interfaces/Group.md)[]\>

Array of groups in the workspace

***

### listInOrganization()

> **listInOrganization**(`organizationId`, `params?`): `Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)[]\>

Defined in: [groups.ts:104](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L104)

Lists groups in an organization with user and workspace assignments.

See https://developers.track.toggl.com/docs/api/groups#get-organization-groups

#### Parameters

##### organizationId

`number`

ID of the organization

##### params?

[`OrganizationGroupParams`](../interfaces/OrganizationGroupParams.md)

Optional query parameters (name, workspace)

#### Returns

`Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)[]\>

Array of organization groups

***

### update()

> **update**(`workspaceId`, `groupId`, `group`): `Promise`\<[`Group`](../interfaces/Group.md)\>

Defined in: [groups.ts:78](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L78)

Updates an existing group in a workspace.

See https://developers.track.toggl.com/docs/api/groups#put-workspace-group

#### Parameters

##### workspaceId

`number`

ID of the workspace

##### groupId

`string` \| `number`

ID of the group to update

##### group

`Partial`\<[`Group`](../interfaces/Group.md)\>

Group payload with updated name

#### Returns

`Promise`\<[`Group`](../interfaces/Group.md)\>

The updated group

***

### updateInOrganization()

> **updateInOrganization**(`organizationId`, `groupId`, `group`): `Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)\>

Defined in: [groups.ts:132](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L132)

Updates a group in an organization.

See https://developers.track.toggl.com/docs/api/groups#put-organization-group

#### Parameters

##### organizationId

`number`

ID of the organization

##### groupId

`string` \| `number`

ID of the group to update

##### group

[`OrganizationGroupPayload`](../interfaces/OrganizationGroupPayload.md)

Updated group payload

#### Returns

`Promise`\<[`OrganizationGroup`](../interfaces/OrganizationGroup.md)\>

The updated organization group

***

### validateGroup()

> **validateGroup**(`group`): `void`

Defined in: [groups.ts:20](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/groups.ts#L20)

Validates that a group contains a name property.

#### Parameters

##### group

The group object to validate

###### name?

`string`

#### Returns

`void`

#### Throws

'The group must include name'
