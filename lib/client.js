const got = require('got');
const debug = require('debug')('togglapi');

module.exports = class TogglClient {
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
};

class TimeEntries {
  constructor(client) {
    this.client = client;
  }

  async list(query) {
    return await this.client.get('time_entries', query);
  }

  async create(time_entry) {
    return mapData(
      await this.client.post('time_entries', {
        time_entry: Object.assign({ created_with: 'node-toggle-client' }, time_entry),
      }),
    );
  }

  async start(time_entry) {
    return mapData(
      await this.client.post('time_entries/start', {
        time_entry: Object.assign({ created_with: 'node-toggle-client' }, time_entry),
      }),
    );
  }

  async stop(id) {
    return mapData(await this.client.put(`time_entries/${id}/stop`));
  }

  async get(id) {
    return mapData(await this.client.get(`time_entries/${id}`));
  }

  async current() {
    return mapData(await this.client.get(`time_entries/current`));
  }

  async update(id, time_entry) {
    return mapData(await this.client.put(`time_entries/${id}`, { time_entry }));
  }

  async delete(id) {
    await this.client.delete(`time_entries/${id}`);
  }
}

class Projects {
  constructor(client) {
    this.client = client;
  }

  async create(project) {
    return mapData(await this.client.post('projects', { project }));
  }

  async get(id) {
    return await this.client.get(`projects/${id}`);
  }

  async update(id, project) {
    return mapData(await this.client.put(`projects/${id}`, { project }));
  }

  async delete(id) {
    await this.client.delete(`projects/${id}`);
  }

  async users(id) {
    return defaultToEmpty(await this.client.get(`projects/${id}/project_users`));
  }

  async tasks(id) {
    return defaultToEmpty(await this.client.get(`projects/${id}/tasks`));
  }
}

class ProjectUsers {
  constructor(client) {
    this.client = client;
  }

  async create(project_user) {
    return mapData(await this.client.post('project_users', { project_user }));
  }

  async get(id) {
    return await this.client.get(`project_users/${id}`);
  }
  async update(id, project_user) {
    return mapData(await this.client.put(`project_users/${id}`, { project_user }));
  }

  async delete(id) {
    await this.client.delete(`project_users/${id}`);
  }
}

class Tags {
  constructor(client) {
    this.client = client;
  }

  async create(tag) {
    return mapData(await this.client.post('tags', { tag }));
  }

  async update(id, tag) {
    return mapData(await this.client.put(`tags/${id}`, { tag }));
  }

  async delete(id) {
    await this.client.delete(`tags/${id}`);
  }
}

class Groups {
  constructor(client) {
    this.client = client;
  }

  async create(group) {
    return mapData(await this.client.post('groups', { group }));
  }

  async update(id, group) {
    return mapData(await this.client.put(`groups/${id}`, { group }));
  }

  async delete(id) {
    await this.client.delete(`groups/${id}`);
  }
}

class Clients {
  constructor(client) {
    this.client = client;
  }

  async list() {
    return await this.client.get('clients');
  }

  async create(client) {
    return mapData(await this.client.post('clients', { client }));
  }

  async get(id) {
    return await this.client.get(`clients/${id}`);
  }

  async update(id, client) {
    return mapData(await this.client.put(`clients/${id}`, { client }));
  }

  async delete(id) {
    await this.client.delete(`clients/${id}`);
  }

  async projects(id, active) {
    return defaultToEmpty(
      await this.client.get(`clients/${id}/projects`, {
        active: active === undefined ? true : active,
      }),
    );
  }
}

class Workspaces {
  constructor(client) {
    this.client = client;
  }

  async list() {
    return await this.client.get('workspaces');
  }

  async get(id) {
    return mapData(await this.client.get(`workspaces/${id}`));
  }

  async update(id, workspace) {
    return await this.client.put(`workspaces/${id}`, { workspace });
  }

  async users(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/users`));
  }

  async clients(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/clients`));
  }

  async groups(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/groups`));
  }

  async projects(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/projects`));
  }

  async tasks(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/tasks`));
  }

  async tags(id) {
    return defaultToEmpty(await this.client.get(`workspaces/${id}/tags`));
  }
}

function defaultToEmpty(data) {
  return data || [];
}

function mapData(res) {
  return (res || {}).data;
}
