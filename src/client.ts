import got, { type Got, type OptionsInit, type Response } from 'got';
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
import Preferences from './preferences.js';
import type { ClientOptions } from './types.js';

const debug = debugClient('toggl-client');

/**
 * Access Toggl Track API
 */
class TogglClient {
  options: ClientOptions;
  clients: Clients;
  groups: Groups;
  tags: Tags;
  projectUsers: ProjectUsers;
  projects: Projects;
  timeEntries: TimeEntries;
  workspaces: Workspaces;
  reports: Reports;
  user: User;
  preferences: Preferences;
  httpClient: Got;

  /**
   * Create TogglClient
   *
   * @param [options] Options for client
   * @param [options.apiToken] Toggl API token (defaults to process.env.TOGGL_API_TOKEN)
   * @param [options.baseUrl] Toggl Track API base URL (defaults to process.env.TOGGL_BASE_URL or https://api.track.toggl.com/api/v9)
   * @param [options.reportsUrl] Toggl Reports API base URL (defaults to process.env.TOGGL_REPORTS_URL or https://api.track.toggl.com/reports/api/v3)
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
    this.preferences = new Preferences(this);

    this.options.baseUrl = this.options.baseUrl || process.env.TOGGL_BASE_URL || 'https://api.track.toggl.com/api/v9';
    this.options.reportsUrl = this.options.reportsUrl || process.env.TOGGL_REPORTS_URL || 'https://api.track.toggl.com/reports/api/v3';

    this.httpClient = got.extend({
      prefixUrl: this.options.baseUrl,
      username: this.options.apiToken,
      password: 'api_token',
      throwHttpErrors: false,
      headers: {
        'content-type': 'application/json',
      },
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

  async requestRaw(path: string, options: OptionsInit): Promise<Response<string>> {
    debug(options.method, path, options.searchParams, options.json);
    const response = await this.httpClient(path, options);

    if (response.statusCode >= 400) {
      debug(response.statusCode, response.statusMessage, response.body);
      throw new Error(response.body as string);
    }

    return response;
  }

  async request<T = unknown>(path: string, options: OptionsInit): Promise<T> {
    const response = await this.requestRaw(path, options);

    if (!response.body) {
      return undefined as T;
    }

    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      return JSON.parse(response.body as string) as T;
    }

    return response.body as T;
  }
}

export default TogglClient;
