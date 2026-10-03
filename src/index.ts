import TogglClient, { type RequestOptions, type ClientResponse } from './client.js';
import type { ClientOptions } from './types.js';

export default function connect(options?: ClientOptions): TogglClient {
  return new TogglClient(options);
}

export { connect, TogglClient };
export type { RequestOptions, ClientResponse };
export * from './types.js';
export { default as Clients } from './clients.js';
export { default as Groups } from './groups.js';
export { default as Preferences } from './preferences.js';
export { default as ProjectUsers } from './project-users.js';
export { default as Projects } from './projects.js';
export { default as Reports } from './reports.js';
export { default as Tags } from './tags.js';
export { default as TimeEntries } from './time-entries.js';
export { default as User } from './user.js';
export { default as Workspaces } from './workspaces.js';
export * from './utils.js';
