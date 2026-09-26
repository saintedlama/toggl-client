[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / TogglClient

# Class: TogglClient

Defined in: [client.ts:20](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L20)

Access Toggl Track API

## Constructors

### Constructor

> **new TogglClient**(`options?`): `TogglClient`

Defined in: [client.ts:42](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L42)

Create TogglClient

#### Parameters

##### options?

[`ClientOptions`](../interfaces/ClientOptions.md)

Options for client

#### Returns

`TogglClient`

## Properties

### clients

> **clients**: [`Clients`](Clients.md)

Defined in: [client.ts:22](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L22)

***

### groups

> **groups**: [`Groups`](Groups.md)

Defined in: [client.ts:23](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L23)

***

### httpClient

> **httpClient**: `Got`

Defined in: [client.ts:32](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L32)

***

### options

> **options**: [`ClientOptions`](../interfaces/ClientOptions.md)

Defined in: [client.ts:21](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L21)

***

### preferences

> **preferences**: [`Preferences`](Preferences.md)

Defined in: [client.ts:31](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L31)

***

### projects

> **projects**: [`Projects`](Projects.md)

Defined in: [client.ts:26](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L26)

***

### projectUsers

> **projectUsers**: [`ProjectUsers`](ProjectUsers.md)

Defined in: [client.ts:25](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L25)

***

### reports

> **reports**: [`Reports`](Reports.md)

Defined in: [client.ts:29](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L29)

***

### tags

> **tags**: [`Tags`](Tags.md)

Defined in: [client.ts:24](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L24)

***

### timeEntries

> **timeEntries**: [`TimeEntries`](TimeEntries.md)

Defined in: [client.ts:27](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L27)

***

### user

> **user**: [`User`](User.md)

Defined in: [client.ts:30](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L30)

***

### workspaces

> **workspaces**: [`Workspaces`](Workspaces.md)

Defined in: [client.ts:28](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L28)

## Methods

### delete()

> **delete**\<`T`\>(`path`): `Promise`\<`T`\>

Defined in: [client.ts:91](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L91)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`T`\>

***

### get()

> **get**\<`T`\>(`path`, `searchParams?`): `Promise`\<`T`\>

Defined in: [client.ts:75](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L75)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### searchParams?

`string` \| `SearchParameters` \| `URLSearchParams`

#### Returns

`Promise`\<`T`\>

***

### patch()

> **patch**\<`T`\>(`path`, `json?`): `Promise`\<`T`\>

Defined in: [client.ts:87](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L87)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### json?

`unknown`

#### Returns

`Promise`\<`T`\>

***

### post()

> **post**\<`T`\>(`path`, `json?`): `Promise`\<`T`\>

Defined in: [client.ts:83](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L83)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### json?

`unknown`

#### Returns

`Promise`\<`T`\>

***

### put()

> **put**\<`T`\>(`path`, `json?`): `Promise`\<`T`\>

Defined in: [client.ts:79](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L79)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### json?

`unknown`

#### Returns

`Promise`\<`T`\>

***

### request()

> **request**\<`T`\>(`path`, `options`): `Promise`\<`T`\>

Defined in: [client.ts:107](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L107)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options

`OptionsInit`

#### Returns

`Promise`\<`T`\>

***

### requestRaw()

> **requestRaw**(`path`, `options`): `Promise`\<`Response`\<`string`\>\>

Defined in: [client.ts:95](https://github.com/saintedlama/toggl-client/blob/41e1594f42c1af54134d3d9f8c39ff393a7eada4/src/client.ts#L95)

#### Parameters

##### path

`string`

##### options

`OptionsInit`

#### Returns

`Promise`\<`Response`\<`string`\>\>
