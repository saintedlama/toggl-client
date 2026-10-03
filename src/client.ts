import { debuglog } from 'node:util';
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

const debug = debuglog('toggl-client');

/**
 * Options for HTTP requests made by TogglClient
 */
export interface RequestOptions {
  method?: string;
  prefixUrl?: string;
  searchParams?: Record<string, unknown> | URLSearchParams;
  json?: unknown;
  headers?: Record<string, string>;
}

/**
 * Raw response returned by TogglClient.requestRaw
 */
export interface ClientResponse {
  statusCode: number;
  statusMessage?: string;
  headers: Record<string, string | string[] | undefined>;
  body: string;
}

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
  }

  async get<T = unknown>(path: string, searchParams?: Record<string, unknown> | URLSearchParams): Promise<T> {
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

  async requestRaw(path: string, options: RequestOptions = {}): Promise<ClientResponse> {
    const baseUrl = options.prefixUrl || this.options.baseUrl || 'https://api.track.toggl.com/api/v9';
    // Ensure baseUrl has a trailing slash and path does not have leading slash so URL constructor resolves properly
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const url = new URL(normalizedPath, normalizedBase);

    if (options.searchParams) {
      if (options.searchParams instanceof URLSearchParams) {
        for (const [key, value] of options.searchParams.entries()) {
          url.searchParams.append(key, value);
        }
      } else {
        for (const [key, value] of Object.entries(options.searchParams)) {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        }
      }
    }

    const auth = Buffer.from(`${this.options.apiToken}:api_token`).toString('base64');
    const headers: Record<string, string> = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const method = (options.method || 'GET').toUpperCase();
    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (options.json !== undefined) {
      fetchOptions.body = JSON.stringify(options.json);
    }

    debug('%s %s %o %o', method, url.toString(), options.searchParams, options.json);

    const response = await fetch(url.toString(), fetchOptions);
    const body = await response.text();

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((val, key) => {
      responseHeaders[key.toLowerCase()] = val;
    });

    const clientResponse: ClientResponse = {
      statusCode: response.status,
      statusMessage: response.statusText,
      headers: responseHeaders,
      body,
    };

    if (!response.ok) {
      debug('%d %s %s', response.status, response.statusText, body);
      throw new Error(body);
    }

    return clientResponse;
  }

  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.requestRaw(path, options);

    if (!response.body) {
      return undefined as T;
    }

    const contentType = response.headers['content-type'];
    if (typeof contentType === 'string' && contentType.includes('application/json')) {
      return JSON.parse(response.body) as T;
    }

    return response.body as unknown as T;
  }
}

export default TogglClient;
