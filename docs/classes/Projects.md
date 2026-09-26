[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Projects

# Class: Projects

Defined in: [projects.ts:7](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L7)

Access projects. See https://developers.track.toggl.com/docs/api/projects

## Constructors

### Constructor

> **new Projects**(`client`): `Projects`

Defined in: [projects.ts:10](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L10)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Projects`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [projects.ts:8](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L8)

## Methods

### create()

> **create**(`workspace_id`, `project`): `Promise`\<[`Project`](../interfaces/Project.md)\>

Defined in: [projects.ts:17](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L17)

Creates a new project

#### Parameters

##### workspace\_id

`number`

##### project

`Partial`\<[`Project`](../interfaces/Project.md)\>

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md)\>

***

### delete()

> **delete**(`workspace_id`, `project_id`): `Promise`\<`void`\>

Defined in: [projects.ts:45](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L45)

Deletes an existing project

#### Parameters

##### workspace\_id

`number`

##### project\_id

`string` \| `number`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`workspace_id`, `project_id`): `Promise`\<[`Project`](../interfaces/Project.md) \| `undefined`\>

Defined in: [projects.ts:24](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L24)

Gets an existing project by id

#### Parameters

##### workspace\_id

`number`

##### project\_id

`string` \| `number`

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md) \| `undefined`\>

***

### list()

> **list**(`workspace_id`): `Promise`\<[`Project`](../interfaces/Project.md)[]\>

Defined in: [projects.ts:31](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L31)

Gets all projects in a workspace

#### Parameters

##### workspace\_id

`number`

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md)[]\>

***

### tasks()

> **tasks**(`workspace_id`, `project_id`): `Promise`\<[`Task`](../interfaces/Task.md)[]\>

Defined in: [projects.ts:52](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L52)

Gets tasks associated with the given project

#### Parameters

##### workspace\_id

`number`

##### project\_id

`string` \| `number`

#### Returns

`Promise`\<[`Task`](../interfaces/Task.md)[]\>

***

### update()

> **update**(`workspace_id`, `project_id`, `project`): `Promise`\<[`Project`](../interfaces/Project.md)\>

Defined in: [projects.ts:38](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/projects.ts#L38)

Updates an existing project

#### Parameters

##### workspace\_id

`number`

##### project\_id

`string` \| `number`

##### project

`Partial`\<[`Project`](../interfaces/Project.md)\>

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md)\>
