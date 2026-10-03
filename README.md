# toggl-client

API Client for the Toggl Track API (v9) and Reports API (v3) built for Node.js with TypeScript and `async`/`await` support.

[![npm version](https://badge.fury.io/js/toggl-client.svg)](https://badge.fury.io/js/toggl-client)
[![Node.js CI](https://github.com/saintedlama/toggl-client/actions/workflows/ci.yml/badge.svg)](https://github.com/saintedlama/toggl-client/actions/workflows/ci.yml)

## Features

- Full support for **Toggl Track API v9** and **Reports API v3**
- Written in **TypeScript** with complete type definitions and JSDoc documentation
- Native ES Modules and CommonJS support
- Automated testing with MSW mock stubs based on Toggl OpenAPI specs
- Promise-based API with `async`/`await`

## Installation

```bash
npm install toggl-client
```

## Quick Start

### Authentication

You can authenticate using your Toggl API token, passed explicitly or via the `TOGGL_API_TOKEN` environment variable:

```ts
import togglClient from 'toggl-client';

// Using explicit options
const client = togglClient({ apiToken: 'YOUR_API_TOKEN' });

// Or using environment variable TOGGL_API_TOKEN
const client = togglClient();
```

### Examples

#### Workspaces & Projects

```ts
// List workspaces
const workspaces = await client.workspaces.list();
const workspaceId = workspaces[0].id;

// List projects in a workspace
const projects = await client.workspaces.projects(workspaceId);

// Create a new project
const newProject = await client.projects.create(workspaceId, {
  name: 'My New Project',
  is_private: true,
});
```

#### Time Entries

```ts
// Start a new running time entry
const running = await client.timeEntries.start({
  workspace_id: workspaceId,
  description: 'Working on feature',
});

// Stop a running time entry
const stopped = await client.timeEntries.stop(running);

// Create a completed time entry
const entry = await client.timeEntries.create({
  workspace_id: workspaceId,
  description: 'Meeting',
  start: new Date(Date.now() - 3600000).toISOString(),
  duration: 3600, // duration in seconds
});

// List time entries for a date range
const entries = await client.timeEntries.list({
  start_date: '2026-09-01',
  end_date: '2026-09-26',
});
```

#### Reports (v3)

```ts
// Detailed report
const detailed = await client.reports.details(workspaceId, {
  start_date: '2026-09-01',
  end_date: '2026-09-26',
});

// Summary report
const summary = await client.reports.summary(workspaceId, {
  start_date: '2026-09-01',
  end_date: '2026-09-26',
});

// Weekly report
const weekly = await client.reports.weekly(workspaceId);

// Detailed report totals
const totals = await client.reports.totals(workspaceId, {
  start_date: '2026-09-01',
});

// Projects summary report
const projectsSummary = await client.reports.projectsSummary(workspaceId);
```

#### Groups & Tags

```ts
// Workspace groups
const groups = await client.groups.list(workspaceId);
const newGroup = await client.groups.create(workspaceId, { name: 'Developers' });

// Organization groups
const orgGroups = await client.groups.listInOrganization(organizationId);

// Workspace tags
const tags = await client.workspaces.tags(workspaceId);
```

#### User & Preferences

```ts
// Current user profile
const me = await client.user.current();

// Current user preferences
const preferences = await client.preferences.current();

// Update preferences
await client.preferences.update({
  pomodoro_enabled: true,
  pomodoro_focus_interval_in_minutes: 25,
});
```

## API Documentation

All API documentation and type definitions are auto-generated from source code:

* 📖 **[API Reference Overview](docs/README.md)**

### Classes

| Class | Description |
| :--- | :--- |
| [`TogglClient`](docs/classes/TogglClient.md) | Main client instance and HTTP handling |
| [`Clients`](docs/classes/Clients.md) | Workspace clients management |
| [`Groups`](docs/classes/Groups.md) | Workspace & organization groups |
| [`Preferences`](docs/classes/Preferences.md) | User and client preferences |
| [`Projects`](docs/classes/Projects.md) | Projects, statistics, and project tasks |
| [`ProjectUsers`](docs/classes/ProjectUsers.md) | Workspace project user assignments |
| [`Reports`](docs/classes/Reports.md) | Reports API v3 (detailed, summary, weekly, totals) |
| [`Tags`](docs/classes/Tags.md) | Workspace tags |
| [`TimeEntries`](docs/classes/TimeEntries.md) | Time tracking, start/stop timers, batch operations |
| [`User`](docs/classes/User.md) | Current user profile and token management |
| [`Workspaces`](docs/classes/Workspaces.md) | Workspaces and workspace settings |

### Types & Interfaces

See [docs/README.md#interfaces](docs/README.md#interfaces) for the full list of generated interfaces (`Workspace`, `Project`, `TimeEntry`, `Group`, `OrganizationGroup`, `UserPreferences`, `UserProfile`, etc.).

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run unit tests
npm test

# Auto-generate documentation from TypeScript code
npm run docs

# Lint and fix code
npm run lint:fix
```

## License

[ISC](LICENSE)
