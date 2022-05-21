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
  async weekly(workspaceId, params) {
    return await this.requestReport('weekly', workspaceId, params);
  }

  /**
   * Weekly report containing all pages fetched with wait time between requests of 1010ms URL GET https://api.track.toggl.com/reports/api/v2/weekly
   */
  async weeklyAll(workspaceId, params) {
    return await this.requestReportPages('weekly', workspaceId, params);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v2/details
   */
  async details(workspaceId, params) {
    return await this.requestReport('details', workspaceId, params);
  }

  /**
   * Detailed report containing all pages fetched with wait time between requests of 1010ms URL: GET https://api.track.toggl.com/reports/api/v2/details
   */
  async detailsAll(workspaceId, params) {
    return await this.requestReportPages('details', workspaceId, params);
  }

  /**
   * Summary report URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summary(workspaceId, params) {
    return await this.requestReport('summary', workspaceId, params);
  }

  /**
   * Summary report containing all pages fetched with wait time between requests of 1010ms URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summaryAll(workspaceId, params) {
    return await this.requestReportPages('summary', workspaceId, params);
  }

  async requestReportPages(path, workspace_id, params) {
    const report = [];
    let reportPage = { hasNextPage: true, nextPage: 1 };

    while (reportPage.hasNextPage) {
      reportPage = await this.requestReport(path, workspace_id, pageParams(params, reportPage.nextPage));
      report.push(...reportPage.data);

      if (reportPage.hasNextPage) {
        await timeout(1010);
      }
    }

    return report;
  }

  async requestReport(path, workspace_id, params) {
    const searchParams = Object.assign(
      {
        user_agent: `npm-toggl-client/1.0.0 (https://github.com/saintedlama/toggl-client)`,
        workspace_id,
      },
      params || { page: 1 },
    );

    const report = await this.client.request(path, {
      prefixUrl: 'https://api.track.toggl.com/reports/api/v2',
      searchParams,
    });

    report.page = searchParams.page;

    if (report.per_page * report.page < report.total_count) {
      report.hasNextPage = true;
      report.nextPage = report.page + 1;
    } else {
      report.hasNextPage = false;
    }

    return report;
  }
}

function timeout(timeoutMs) {
  return new Promise((resolve) => setTimeout(() => resolve(), timeoutMs));
}

function pageParams(params, page) {
  return Object.assign(params || {}, { page });
}

export default Reports;
