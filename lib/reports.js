import dayjs from 'dayjs';

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
   * Weekly report
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weekly(workspaceId, params) {
    params = { start_date: dayjs().startOf('week').format('YYYY-MM-DD'), ...params };
    return await this.requestReport(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, params);
  }

  /**
   * Weekly report containing all pages fetched with wait time between requests of 1010ms
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weeklyAll(workspaceId, params) {
    params = { start_date: dayjs().startOf('week').format('YYYY-MM-DD'), ...params };
    return await this.requestReport(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async details(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report containing all pages fetched with wait time between requests of 1010ms URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async detailsAll(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReportPages(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Summary report URL: POST https://engineering.toggl.com/docs/reports/summary_reports#post-search-time-entries
   * This is using the search time entries to limit data
   */
  async summary(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }

  /**
   * Summary report containing all pages fetched with wait time between requests of 1010ms URL: POST https://engineering.toggl.com/docs/reports/summary_reports#post-search-time-entries
   */
  async summaryAll(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReportPages(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
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
      prefixUrl: 'https://api.track.toggl.com/reports/api/v3',
      method: 'POST',
      body: JSON.stringify(searchParams),
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
