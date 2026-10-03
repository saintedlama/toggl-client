[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / TimeEntries

# Class: TimeEntries

Defined in: [time-entries.ts:8](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L8)

Access time entries. See https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md

## Constructors

### Constructor

> **new TimeEntries**(`client`): `TimeEntries`

Defined in: [time-entries.ts:11](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L11)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`TimeEntries`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [time-entries.ts:9](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L9)

## Methods

### create()

> **create**(`time_entry`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

Defined in: [time-entries.ts:33](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L33)

Creates a new time entry

#### Parameters

##### time\_entry

[`TimeEntryInput`](../type-aliases/TimeEntryInput.md)

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

***

### current()

> **current**(): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md) \| `null`\>

Defined in: [time-entries.ts:87](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L87)

Gets the current running time entry

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md) \| `null`\>

***

### delete()

> **delete**(`workspace_id`, `id?`): `Promise`\<`void`\>

Defined in: [time-entries.ts:104](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L104)

Delete an existing time entry

#### Parameters

##### workspace\_id

`string` \| `number` \| \{ `id`: `string` \| `number`; `workspace_id`: `string` \| `number`; \}

##### id?

`string` \| `number`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`id`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md) \| `undefined`\>

Defined in: [time-entries.ts:75](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L75)

Gets the time entry specified by id. Due to limitations of the v9 API, start_date must not be
earlier than 3 months ago. If you want results further back, use the reports endpoints.

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md) \| `undefined`\>

***

### list()

> **list**(`query?`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)[]\>

Defined in: [time-entries.ts:20](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L20)

Lists time entries. The `query` must include `start_date` and `end_date`. Note that due to
limitations of the v9 API, start_date must not be earlier 3 months ago. If you want results
further back, use the reports endpoints.

#### Parameters

##### query?

[`TimeEntryParams`](../interfaces/TimeEntryParams.md)

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)[]\>

***

### start()

> **start**(`time_entry`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

Defined in: [time-entries.ts:49](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L49)

Starts a new time entry

#### Parameters

##### time\_entry

[`TimeEntryInput`](../type-aliases/TimeEntryInput.md)

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

***

### stop()

> **stop**(`time_entry`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

Defined in: [time-entries.ts:65](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L65)

Stops the current running time entry

#### Parameters

##### time\_entry

###### id

`string` \| `number`

###### workspace_id

`number`

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

***

### update()

> **update**(`id`, `time_entry`): `Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>

Defined in: [time-entries.ts:94](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/time-entries.ts#L94)

Updates an existing time entry

#### Parameters

##### id

`string` \| `number`

##### time\_entry

`Partial`\<[`TimeEntryInput`](../type-aliases/TimeEntryInput.md)\>

#### Returns

`Promise`\<[`TimeEntry`](../interfaces/TimeEntry.md)\>
