const { expect } = require('chai');
const debug = require('debug')('toggl-client-tests');
const togglClient = require('../');
const dayjs = require('dayjs');

describe('smoke test', () => {
  before(() => {
    if (!process.env.TOGGL_API_TOKEN) {
      console.error('Please make sure to set the environment variable "TOGGL_API_TOKEN" before running the smoke tests');
      process.exit(1);
    }
  });

  it('should list workspaces', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    debug(workspaces);
    expect(workspaces).to.be.an('array').that.is.not.empty;
  });

  it('should list projects in a workspace', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    for (const workspace of workspaces) {
      const projects = await client.workspaces.projects(workspace.id);
      debug(projects);

      expect(projects).to.be.an('array');
    }
  });

  it('should get a details report', async () => {
    const client = togglClient();

    const workspaces = await client.workspaces.list();
    const detailsReport = await client.reports.details(workspaces[0].id, {
      start_date: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    });

    debug(detailsReport[0]);
    expect(detailsReport).to.exist.to.be.an('array');
    expect(detailsReport[0]).to.have.property('user_id');
    expect(detailsReport[0]).to.have.property('username');
    expect(detailsReport[0]).to.have.property('project_id');
    expect(detailsReport[0]).to.have.property('task_id');
    expect(detailsReport[0]).to.have.property('description');
    expect(detailsReport[0]).to.have.property('time_entries');
    expect(detailsReport[0]).to.have.property('row_number');
  });

  it.skip('should throw an error if a start date is not provided with a details report', async () => {
    const client = togglClient();

    const workspaces = await client.workspaces.list();
    // FIXME - this assertion is not working
    expect(async function () {
      await client.reports.details(workspaces[0].id);
    }).to.throw('Error: The parameters must include start_date');
  });

  it('should get a weekly report from 7 days ago', async () => {
    const client = togglClient();

    const workspaces = await client.workspaces.list();
    const detailsReport = await client.reports.weekly(workspaces[0].id,{order_by:"date",order_dir:"ASC"});
    debug(detailsReport[0]);
    expect(dayjs(detailsReport[0].time_entries[0].start).toDate()).to.be.greaterThan(dayjs().subtract(8, 'days').toDate())
  });

  it('should get a user', async () => {
    const client = togglClient();
    const user = await client.user.current();
    debug(user);
    expect(user).to.exist.to.be.an('object');
  });

  it.skip('should get a new API token', async () => {
    const client = togglClient();
    const newToken = await client.user.resetToken();
    debug(newToken);
    expect(newToken).to.exist.to.be.an('string');
  });

  it('should throw an error if current password not supplied', async () => {
    const client = togglClient();
    const user = {
      password: 'foo',
    };
    expect(() => client.user.update(user).to.throw('To change the password you must include the current password'));
  });

  it('should throw an error if time of day format is invalid', async () => {
    const client = togglClient();
    const user = {
      timeofday_format: 'foo',
    };
    expect(() => client.user.update(user).to.throw(Error('timeofday_format must be one of H:mm or h:mm')));
  });

  it('should throw an error if date format is invalid', async () => {
    const client = togglClient();
    const user = {
      dateFormat: 'foo',
    };
    expect(() =>
      client.user
        .update(user)
        .to.throw(Error('date_format must be one of "YYYY-MM-DD", "DD.MM.YYYY", "DD-MM-YYYY", "MM/DD/YYYY", "DD/MM/YYYY", "MM-DD-YYYY"')),
    );
  });

  it.skip('should generate time entries', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();

    for (let i = 0; i < 52; i++) {
      const timeEntryCreated = await client.timeEntries.create({
        wid: workspaces[0].id,
        duration: 1200, // 20min
        start: new Date().toISOString(),
        description: 'Test Entry',
      });

      debug(timeEntryCreated);

      await timeout();
    }
  });

  it('should list a users tags', async () => {
    const client = togglClient();
    const workspaces = await client.workspaces.list();
    const tags = await client.workspaces.tags(workspaces[0].id);
    debug(tags);
    expect(tags).to.exist.to.be.an('array');
    expect(tags[0].name).to.exist;
  });
});

async function timeout() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
