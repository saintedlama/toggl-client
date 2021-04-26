const { name, version } = require('../package.json');

/**
 * Access reports. See https://github.com/toggl/toggl_api_docs/blob/master/reports.md
 *
 * @class Reports
 */
class Reports {
  constructor(client) {
    this.client = client;
  }

  /**
   * Weekly report URL GET https://api.track.toggl.com/reports/api/v2/weekly
   */
  async weekly(workspaceId) {
    return await this.requestReport('weekly', workspaceId);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v2/details
   */
  async details(workspaceId) {
    return await this.requestReport('details', workspaceId);
  }

  /**
   * Summary report URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summary(workspaceId) {
    return await this.requestReport('summary', workspaceId);
  }

  async requestReport(path, workspace_id) {
    return await this.client.request(path, {
      prefixUrl: 'https://api.track.toggl.com/reports/api/v2',
      searchParams: {
        user_agent: `${name}/${version} (https://github.com/saintedlama/toggl-client)`,
        workspace_id,
      },
    });
  }
}

module.exports = Reports;
