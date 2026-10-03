[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / TogglClient

# Class: TogglClient

Defined in: [client.ts:40](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L40)

Access Toggl Track API

## Constructors

### Constructor

> **new TogglClient**(`options?`): `TogglClient`

Defined in: [client.ts:61](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L61)

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

Defined in: [client.ts:42](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L42)

***

### groups

> **groups**: [`Groups`](Groups.md)

Defined in: [client.ts:43](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L43)

***

### options

> **options**: [`ClientOptions`](../interfaces/ClientOptions.md)

Defined in: [client.ts:41](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L41)

***

### preferences

> **preferences**: [`Preferences`](Preferences.md)

Defined in: [client.ts:51](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L51)

***

### projects

> **projects**: [`Projects`](Projects.md)

Defined in: [client.ts:46](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L46)

***

### projectUsers

> **projectUsers**: [`ProjectUsers`](ProjectUsers.md)

Defined in: [client.ts:45](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L45)

***

### reports

> **reports**: [`Reports`](Reports.md)

Defined in: [client.ts:49](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L49)

***

### tags

> **tags**: [`Tags`](Tags.md)

Defined in: [client.ts:44](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L44)

***

### timeEntries

> **timeEntries**: [`TimeEntries`](TimeEntries.md)

Defined in: [client.ts:47](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L47)

***

### user

> **user**: [`User`](User.md)

Defined in: [client.ts:50](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L50)

***

### workspaces

> **workspaces**: [`Workspaces`](Workspaces.md)

Defined in: [client.ts:48](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L48)

## Methods

### delete()

> **delete**\<`T`\>(`path`): `Promise`\<`T`\>

Defined in: [client.ts:100](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L100)

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

Defined in: [client.ts:84](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L84)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### searchParams?

`Record`\<`string`, `unknown`\> \| `URLSearchParams`

#### Returns

`Promise`\<`T`\>

***

### patch()

> **patch**\<`T`\>(`path`, `json?`): `Promise`\<`T`\>

Defined in: [client.ts:96](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L96)

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

Defined in: [client.ts:92](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L92)

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

Defined in: [client.ts:88](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L88)

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

> **request**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

Defined in: [client.ts:167](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L167)

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md) = `{}`

#### Returns

`Promise`\<`T`\>

***

### requestRaw()

> **requestRaw**(`path`, `options?`): `Promise`\<[`ClientResponse`](../interfaces/ClientResponse.md)\>

Defined in: [client.ts:104](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/client.ts#L104)

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md) = `{}`

#### Returns

`Promise`\<[`ClientResponse`](../interfaces/ClientResponse.md)\>
