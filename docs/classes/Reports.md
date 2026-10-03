[**toggl-client**](../README.md)

***

[toggl-client](../README.md) / Reports

# Class: Reports

Defined in: [reports.ts:14](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L14)

Access Toggl Reports API v3.

## See

https://developers.track.toggl.com/docs/reports

## Constructors

### Constructor

> **new Reports**(`client`): `Reports`

Defined in: [reports.ts:17](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L17)

#### Parameters

##### client

[`TogglClient`](TogglClient.md)

#### Returns

`Reports`

## Properties

### client

> **client**: [`TogglClient`](TogglClient.md)

Defined in: [reports.ts:15](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L15)

## Methods

### details()

> **details**\<`T`\>(`workspaceId`, `params`): `Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

Defined in: [reports.ts:61](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L61)

Fetch a detailed time entries report.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params

[`DetailedReportParams`](../interfaces/DetailedReportParams.md)

Detailed report parameters (must include start_date)

#### Returns

`Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

#### See

https://developers.track.toggl.com/docs/reports/detailed_reports#post-search-time-entries

***

### detailsAll()

> **detailsAll**\<`T`\>(`workspaceId`, `params`, `maxPages?`): `Promise`\<`T`[]\>

Defined in: [reports.ts:76](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L76)

Fetch all pages of a detailed report with rate-limiting pauses between requests.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params

[`DetailedReportParams`](../interfaces/DetailedReportParams.md)

Detailed report parameters (must include start_date)

##### maxPages?

`number` = `100`

Optional maximum number of pages to fetch (default: 100)

#### Returns

`Promise`\<`T`[]\>

#### See

https://developers.track.toggl.com/docs/reports/detailed_reports#post-search-time-entries

***

### projectsSummary()

> **projectsSummary**\<`T`\>(`workspaceId`, `params?`): `Promise`\<`T`\>

Defined in: [reports.ts:190](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L190)

List project users summary.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params?

[`ReportParams`](../interfaces/ReportParams.md)

Optional report parameters

#### Returns

`Promise`\<`T`\>

#### See

https://developers.track.toggl.com/docs/reports/projects_reports

***

### projectSummary()

> **projectSummary**\<`T`\>(`workspaceId`, `projectId`, `params?`): `Promise`\<`T`\>

Defined in: [reports.ts:202](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L202)

Load project summary for a specific project.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### projectId

`number`

Project ID

##### params?

[`ReportParams`](../interfaces/ReportParams.md)

Optional report parameters

#### Returns

`Promise`\<`T`\>

#### See

https://developers.track.toggl.com/docs/reports/projects_reports

***

### requestReport()

> **requestReport**\<`T`\>(`path`, `workspace_id`, `params?`): `Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

Defined in: [reports.ts:213](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L213)

Helper to execute a POST report request against the Reports API v3.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

Sub-path on Reports API

##### workspace\_id

`number`

Workspace ID

##### params?

[`ReportParams`](../interfaces/ReportParams.md)

Query/body parameters

#### Returns

`Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

***

### summary()

> **summary**\<`T`\>(`workspaceId`, `params`): `Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

Defined in: [reports.ts:138](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L138)

Fetch a summary report.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params

[`SummaryReportParams`](../interfaces/SummaryReportParams.md)

Summary report parameters (must include start_date)

#### Returns

`Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

#### See

https://developers.track.toggl.com/docs/reports/summary_reports#post-search-time-entries

***

### summaryAll()

> **summaryAll**\<`T`\>(`workspaceId`, `params`): `Promise`\<`T`[]\>

Defined in: [reports.ts:152](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L152)

Fetch all groups of a summary report.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params

[`SummaryReportParams`](../interfaces/SummaryReportParams.md)

Summary report parameters (must include start_date)

#### Returns

`Promise`\<`T`[]\>

#### See

https://developers.track.toggl.com/docs/reports/summary_reports#post-search-time-entries

***

### totals()

> **totals**\<`T`\>(`workspaceId`, `params`): `Promise`\<`T`\>

Defined in: [reports.ts:176](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L176)

Load totals for a detailed report.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params

[`DetailedReportParams`](../interfaces/DetailedReportParams.md)

Detailed report parameters (must include start_date)

#### Returns

`Promise`\<`T`\>

#### See

https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report

***

### weekly()

> **weekly**\<`T`\>(`workspaceId`, `params?`): `Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

Defined in: [reports.ts:28](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L28)

Fetch a weekly report for a workspace.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params?

[`WeeklyReportParams`](../interfaces/WeeklyReportParams.md)

Optional weekly report parameters (defaults to start of current week)

#### Returns

`Promise`\<[`ReportResult`](../type-aliases/ReportResult.md)\<`T`\>\>

#### See

https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries

***

### weeklyAll()

> **weeklyAll**\<`T`\>(`workspaceId`, `params?`): `Promise`\<`T`[]\>

Defined in: [reports.ts:43](https://github.com/saintedlama/toggl-client/blob/083663313bdf9055a8a6fcf17bb694827f56aed5/src/reports.ts#L43)

Fetch all entries of a weekly report.

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### workspaceId

`number`

Workspace ID

##### params?

[`WeeklyReportParams`](../interfaces/WeeklyReportParams.md)

Optional weekly report parameters

#### Returns

`Promise`\<`T`[]\>

#### See

https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
