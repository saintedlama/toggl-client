[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / ProjectUsers

# Class: ProjectUsers

Defined in: [project-users.ts:7](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L7)

Access project users. See https://developers.track.toggl.com/docs/api/projects

## Constructors

### Constructor

> **new ProjectUsers**(`client`): `ProjectUsers`

Defined in: [project-users.ts:10](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L10)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`ProjectUsers`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [project-users.ts:8](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L8)

## Methods

### create()

> **create**(`workspace_id`, `project_user`): `Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>

Defined in: [project-users.ts:17](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L17)

Creates a new project user

#### Parameters

##### workspace\_id

`number`

##### project\_user

`Partial`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>

#### Returns

`Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>

***

### delete()

> **delete**(`workspace_id`, `project_user_id`): `Promise`\<`void`\>

Defined in: [project-users.ts:38](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L38)

Delete a project user for a given workspace.

#### Parameters

##### workspace\_id

`number`

##### project\_user\_id

`string` \| `number`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`workspace_id`): `Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)[]\>

Defined in: [project-users.ts:24](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L24)

List all project users for a given workspace.

#### Parameters

##### workspace\_id

`number`

#### Returns

`Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)[]\>

***

### update()

> **update**(`workspace_id`, `project_user_id`, `project_user`): `Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>

Defined in: [project-users.ts:31](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/project-users.ts#L31)

Update the data for a project user for a given workspace.

#### Parameters

##### workspace\_id

`number`

##### project\_user\_id

`string` \| `number`

##### project\_user

`Partial`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>

#### Returns

`Promise`\<[`ProjectUser`](../interfaces/ProjectUser.md)\>
