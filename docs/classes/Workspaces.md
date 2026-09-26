[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Workspaces

# Class: Workspaces

Defined in: [workspaces.ts:8](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L8)

Access workspaces. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md

## Constructors

### Constructor

> **new Workspaces**(`client`): `Workspaces`

Defined in: [workspaces.ts:11](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L11)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Workspaces`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [workspaces.ts:9](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L9)

## Methods

### clients()

> **clients**(`id`): `Promise`\<[`Client`](../interfaces/Client.md)[]\>

Defined in: [workspaces.ts:47](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L47)

Gets a list of clients associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Client`](../interfaces/Client.md)[]\>

***

### get()

> **get**(`id`): `Promise`\<[`Workspace`](../interfaces/Workspace.md) \| `undefined`\>

Defined in: [workspaces.ts:25](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L25)

Gets a workspace by id

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Workspace`](../interfaces/Workspace.md) \| `undefined`\>

***

### groups()

> **groups**(`id`): `Promise`\<[`Group`](../interfaces/Group.md)[]\>

Defined in: [workspaces.ts:54](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L54)

Gets a list of groups associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Group`](../interfaces/Group.md)[]\>

***

### list()

> **list**(): `Promise`\<[`Workspace`](../interfaces/Workspace.md)[]\>

Defined in: [workspaces.ts:18](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L18)

Lists all workspaces

#### Returns

`Promise`\<[`Workspace`](../interfaces/Workspace.md)[]\>

***

### projects()

> **projects**(`id`): `Promise`\<[`Project`](../interfaces/Project.md)[]\>

Defined in: [workspaces.ts:61](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L61)

Gets a list of projects associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md)[]\>

***

### tags()

> **tags**(`id`): `Promise`\<[`Tag`](../interfaces/Tag.md)[]\>

Defined in: [workspaces.ts:75](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L75)

Gets a list of tags associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Tag`](../interfaces/Tag.md)[]\>

***

### tasks()

> **tasks**(`id`): `Promise`\<[`Task`](../interfaces/Task.md)[]\>

Defined in: [workspaces.ts:68](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L68)

Gets a list of tasks associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Task`](../interfaces/Task.md)[]\>

***

### update()

> **update**(`id`, `workspace`): `Promise`\<[`Workspace`](../interfaces/Workspace.md)\>

Defined in: [workspaces.ts:33](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L33)

Updates an existing workspace

#### Parameters

##### id

`string` \| `number`

##### workspace

`Partial`\<[`Workspace`](../interfaces/Workspace.md)\>

#### Returns

`Promise`\<[`Workspace`](../interfaces/Workspace.md)\>

***

### users()

> **users**(`id`): `Promise`\<[`UserProfile`](../interfaces/UserProfile.md)[]\>

Defined in: [workspaces.ts:40](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/workspaces.ts#L40)

Gets a list of users associated with the workspace

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`UserProfile`](../interfaces/UserProfile.md)[]\>
