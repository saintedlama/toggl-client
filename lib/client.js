import got from 'got';
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

const debug = debugClient('toggl-client');

/**
 * Main class to interact with the toggl API.
 * Calling `togglClient({ apiToken: YOUR_API_TOKEN });` returns an instance of this class.
 *
 * @property {Workspaces} workspaces
 * @property {Projects} projects
 * @property {TimeEntries} timeEntries
 * @property {Clients} clients
 * @property {Groups} groups
 * @property {Tags} tags
 * @property {ProjectUsers} projectUsers
 * @property {User} user
 * @class TogglClient
 */
class TogglClient {
  /**
   * Creates an instance of TogglClient.
   * @param {*} options
   * @memberof TogglClient
   */
  constructor(options) {
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

    this.httpClient = got.extend({
      prefixUrl: 'https://api.track.toggl.com/api/v9',
      username: this.options.apiToken,
      password: 'api_token',
      throwHttpErrors: false,
    });
  }

  async get(path, searchParams) {
    return await this.request(path, { method: 'GET', searchParams });
  }

  async put(path, json) {
    return await this.request(path, { method: 'PUT', json });
  }

  async post(path, json) {
    return await this.request(path, { method: 'POST', json });
  }

  async delete(path) {
    return await this.request(path, { method: 'DELETE' });
  }

  async request(path, options) {
    debug('requesting toggl API path %s with options %o', path, options);

    const response = await this.httpClient(path, options);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`Toggl API responded with status code ${response.statusCode}. Response: ${response.body}`);
    }

    return JSON.parse(response.body);
  }
}

export default TogglClient;
