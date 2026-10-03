[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Clients

# Class: Clients

Defined in: [clients.ts:8](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L8)

Access clients. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/clients.md

## Constructors

### Constructor

> **new Clients**(`client`): `Clients`

Defined in: [clients.ts:11](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L11)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Clients`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [clients.ts:9](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L9)

## Methods

### create()

> **create**(`client`): `Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>

Defined in: [clients.ts:25](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L25)

Creates a new client

#### Parameters

##### client

`Partial`\<[`Client`](../interfaces/Client.md)\>

#### Returns

`Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>

***

### delete()

> **delete**(`id`): `Promise`\<`void`\>

Defined in: [clients.ts:48](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L48)

Deletes a client by id

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`id`): `Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>

Defined in: [clients.ts:33](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L33)

Gets a client by id

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>

***

### list()

> **list**(): `Promise`\<[`Client`](../interfaces/Client.md)[]\>

Defined in: [clients.ts:18](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L18)

Gets a list of clients

#### Returns

`Promise`\<[`Client`](../interfaces/Client.md)[]\>

***

### projects()

> **projects**(`id`, `active?`): `Promise`\<[`Project`](../interfaces/Project.md)[]\>

Defined in: [clients.ts:55](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L55)

Lists projects associated with the given client

#### Parameters

##### id

`string` \| `number`

##### active?

`string` \| `boolean`

#### Returns

`Promise`\<[`Project`](../interfaces/Project.md)[]\>

***

### update()

> **update**(`id`, `client`): `Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>

Defined in: [clients.ts:40](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/clients.ts#L40)

Updates a client

#### Parameters

##### id

`string` \| `number`

##### client

`Partial`\<[`Client`](../interfaces/Client.md)\>

#### Returns

`Promise`\<[`Client`](../interfaces/Client.md) \| `undefined`\>
