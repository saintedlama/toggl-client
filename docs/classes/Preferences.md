[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Preferences

# Class: Preferences

Defined in: [preferences.ts:7](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L7)

Access user preferences. See https://developers.track.toggl.com/docs/api/preferences

## Constructors

### Constructor

> **new Preferences**(`client`): `Preferences`

Defined in: [preferences.ts:11](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L11)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Preferences`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [preferences.ts:8](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L8)

***

### endpoint

> **endpoint**: `string`

Defined in: [preferences.ts:9](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L9)

## Methods

### current()

> **current**(): `Promise`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

Defined in: [preferences.ts:20](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L20)

Gets preferences for the current user.
See https://developers.track.toggl.com/docs/api/preferences#get-preferences-for-the-current-user

#### Returns

`Promise`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

***

### currentForClient()

> **currentForClient**(`clientType`, `since?`): `Promise`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

Defined in: [preferences.ts:36](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L36)

Gets preferences for a specific client of the current user.
See https://developers.track.toggl.com/docs/api/preferences#get-preferences-for-an-specific-client-of-the-current-user

#### Parameters

##### clientType

`"desktop"` \| `"web"`

##### since?

`number`

#### Returns

`Promise`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

***

### update()

> **update**(`preferences`): `Promise`\<`string`\>

Defined in: [preferences.ts:28](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L28)

Updates preferences for the current user.
See https://developers.track.toggl.com/docs/api/preferences#update-the-preferences-for-the-current-user

#### Parameters

##### preferences

`Partial`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

#### Returns

`Promise`\<`string`\>

***

### updateForClient()

> **updateForClient**(`clientType`, `preferences`): `Promise`\<`string`\>

Defined in: [preferences.ts:45](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/preferences.ts#L45)

Updates preferences for a specific client of the current user.
See https://developers.track.toggl.com/docs/api/preferences#update-the-preferences-for-an-specific-client-of-the-current-user

#### Parameters

##### clientType

`"desktop"` \| `"web"`

##### preferences

`Partial`\<[`UserPreferences`](../interfaces/UserPreferences.md)\>

#### Returns

`Promise`\<`string`\>
