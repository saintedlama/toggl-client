[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Tags

# Class: Tags

Defined in: [tags.ts:7](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L7)

Access Tags. See https://developers.track.toggl.com/docs/api/tags

## Constructors

### Constructor

> **new Tags**(`client`): `Tags`

Defined in: [tags.ts:10](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L10)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Tags`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [tags.ts:8](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L8)

## Methods

### create()

> **create**(`workspace_id`, `tag`): `Promise`\<[`Tag`](../interfaces/Tag.md)\>

Defined in: [tags.ts:26](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L26)

Creates a new tag

#### Parameters

##### workspace\_id

`number`

##### tag

`Partial`\<[`Tag`](../interfaces/Tag.md)\>

#### Returns

`Promise`\<[`Tag`](../interfaces/Tag.md)\>

***

### delete()

> **delete**(`workspace_id`, `id`): `Promise`\<`void`\>

Defined in: [tags.ts:43](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L43)

Deletes an existing tag

#### Parameters

##### workspace\_id

`number`

##### id

`string` \| `number`

#### Returns

`Promise`\<`void`\>

***

### update()

> **update**(`workspace_id`, `id`, `tag`): `Promise`\<[`Tag`](../interfaces/Tag.md)\>

Defined in: [tags.ts:35](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L35)

Updates an existing tag

#### Parameters

##### workspace\_id

`number`

##### id

`string` \| `number`

##### tag

`Partial`\<[`Tag`](../interfaces/Tag.md)\>

#### Returns

`Promise`\<[`Tag`](../interfaces/Tag.md)\>

***

### validateTag()

> **validateTag**(`tag`): `void`

Defined in: [tags.ts:17](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/tags.ts#L17)

Validates that a tag contains the name property.

#### Parameters

##### tag

`Partial`\<[`Tag`](../interfaces/Tag.md)\>

#### Returns

`void`
