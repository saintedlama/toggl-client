[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / User

# Class: User

Defined in: [user.ts:7](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L7)

Access users. See https://developers.track.toggl.com/docs/api/me

## Constructors

### Constructor

> **new User**(`client`): `User`

Defined in: [user.ts:11](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L11)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`User`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [user.ts:8](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L8)

***

### endpoint

> **endpoint**: `string`

Defined in: [user.ts:9](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L9)

## Methods

### current()

> **current**(): `Promise`\<[`UserProfile`](../interfaces/UserProfile.md)\>

Defined in: [user.ts:20](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L20)

Gets the current user
See https://developers.track.toggl.com/docs/api/me#get-me

#### Returns

`Promise`\<[`UserProfile`](../interfaces/UserProfile.md)\>

***

### resetToken()

> **resetToken**(): `Promise`\<`string`\>

Defined in: [user.ts:40](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L40)

Resets API token https://developers.track.toggl.com/docs/api/authentication#post-resettoken

#### Returns

`Promise`\<`string`\>

***

### update()

> **update**(`user`): `Promise`\<[`UserProfile`](../interfaces/UserProfile.md)\>

Defined in: [user.ts:28](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/user.ts#L28)

Updates the user.
See https://developers.track.toggl.com/docs/api/me#put-me

#### Parameters

##### user

`Partial`\<[`UserUpdateInput`](../interfaces/UserUpdateInput.md)\>

#### Returns

`Promise`\<[`UserProfile`](../interfaces/UserProfile.md)\>
