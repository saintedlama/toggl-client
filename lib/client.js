const got = require('got');
const debug = require('debug')('toggl-client');

const Workspaces = require('./workspaces');
const Clients = require('./clients');
const Groups = require('./groups');
const Tags = require('./tags');
const ProjectUsers = require('./project-users');
const Projects = require('./projects');
const TimeEntries = require('./time-entries');

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
  }

  async get(path, query) {
    return await this.request(path, { method: 'GET', query });
  }

  async put(path, body) {
    return await this.request(path, { method: 'PUT', body });
  }

  async post(path, body) {
    return await this.request(path, { method: 'POST', body });
  }

  async delete(path) {
    return await this.request(path, { method: 'DELETE' });
  }

  async request(path, req) {
    try {
      const response = await got(
        path,
        Object.assign(
          {
            baseUrl: 'https://www.toggl.com/api/v8/',
            json: true,
            auth: `${this.options.apiToken}:api_token`,
          },
          req,
        ),
      );

      return response.body;
    } catch (e) {
      debug(e.body);

      throw e;
    }
  }
}

module.exports = TogglClient;
