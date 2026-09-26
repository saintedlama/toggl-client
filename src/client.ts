import got, { type Got, type OptionsInit } from 'got';
import debugClient from 'debug';

import Workspaces from './workspaces.js';
import Clients from './clients.js';
import Groups from './groups.js';
import Tags from './tags.js';
import ProjectUsers from './project-users.js';
import Projects from './projects.js';
import TimeEntries from './time-entries.js';
import Reports from './reports.js';
import User from './user.js';
import type { ClientOptions } from './types.js';

const debug = debugClient('toggl-client');

/**
 * Main class to interact with the toggl API.
 * Calling `togglClient({ apiToken: YOUR_API_TOKEN });` returns an instance of this class.
 */
class TogglClient {
  options: ClientOptions;
  clients: Clients;
  groups: Groups;
  tags: Tags;
  projects: Projects;
  timeEntries: TimeEntries;
  projectUsers: ProjectUsers;
  workspaces: Workspaces;
  reports: Reports;
  user: User;
  httpClient: Got;

  /**
   * Creates an instance of TogglClient.
   */
  constructor(options?: ClientOptions) {
    this.options = options || {};
    this.options.apiToken = this.options.apiToken || process.env.TOGGL_API_TOKEN;

    if (!this.options.apiToken) {
      throw new Error('Required option "apiToken" was not provided');
    }

    this.clients = new Clients(this);
    this.groups = new Groups(this);
    this.tags = new Tags(this);
    this.projects = new Projects(this);
    this.timeEntries = new TimeEntries(this);
    this.projectUsers = new ProjectUsers(this);
    this.workspaces = new Workspaces(this);
    this.reports = new Reports(this);
    this.user = new User(this);

    this.options.baseUrl = this.options.baseUrl || process.env.TOGGL_BASE_URL || 'https://api.track.toggl.com/api/v9';
    this.options.reportsUrl = this.options.reportsUrl || process.env.TOGGL_REPORTS_URL || 'https://api.track.toggl.com/reports/api/v3';

    this.httpClient = got.extend({
      prefixUrl: this.options.baseUrl,
      username: this.options.apiToken,
      password: 'api_token',
      throwHttpErrors: false,
    });
  }

  async get<T = unknown>(path: string, searchParams?: OptionsInit['searchParams']): Promise<T> {
    return await this.request<T>(path, { method: 'GET', searchParams });
  }

  async put<T = unknown>(path: string, json?: unknown): Promise<T> {
    return await this.request<T>(path, { method: 'PUT', json });
  }

  async post<T = unknown>(path: string, json?: unknown): Promise<T> {
    return await this.request<T>(path, { method: 'POST', json });
  }

  async patch<T = unknown>(path: string, json?: unknown): Promise<T> {
    return await this.request<T>(path, { method: 'PATCH', json });
  }

  async delete<T = unknown>(path: string): Promise<T> {
    return await this.request<T>(path, { method: 'DELETE' });
  }

  async request<T = unknown>(path: string, options: OptionsInit): Promise<T> {
    // Disables retry logic following suggestion from https://github.com/sindresorhus/got/issues/1489
    options.retry = { limit: 0 };
    debug('requesting toggl API path %s with options %o', path, options);

    const response = await this.httpClient(path, options);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`Toggl API responded with status code ${response.statusCode}. Response: ${response.body}`);
    }

    const resp = response.body ? (JSON.parse(response.body as string) as T) : ({} as T);
    debug(resp);
    return resp;
  }
}

export default TogglClient;
