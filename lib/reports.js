import dayjs from 'dayjs';
import debugClient from 'debug';

const debug = debugClient('toggl-client-reports');


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
   * 
   * @deprecated use weekly() instead.
   */
  async weeklyAll(workspaceId, params) {
    params = { start_date: dayjs().startOf('week').format('YYYY-MM-DD'), ...params };
    return await this.requestReport(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report 
   * 
   * This returns the report details _but only the first page_!!!
   * This response is paginated, but we've been lucky that the data fits in one page...
   * 
   * URL: POST https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async details(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    // TODO add pagination checks.
    return await this.requestReport(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report containing all pages fetched with wait time between requests of 1010ms URL: 
   * 
   * Returns time entries for detailed report according to the given filters. Supports pagination via X-Next-ID and X-Next-Row-Number headers returned in the response.
   * 
   * POST https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://engineering.toggl.com/docs/reports/detailed_reports/index.html#post-search-time-entries
   * params must include start_date
   */
  async detailsAll(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    // TODO - fix this for the pages from the header
    return await this.requestReportPages(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Summary report 
   * https://engineering.toggl.com/docs/reports/summary_reports#post-search-time-entries
   * 
   * POST https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/summary/time_entries
   * This is using the search time entries to limit data
   */
  async summary(workspaceId, params) {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }


  async requestReportPages(path, workspace_id, params) {
    const report = [];
    let reportPage = { hasNextPage: true, nextPage: 1 };

    while (reportPage.hasNextPage) {
      reportPage = await this.requestReport(path, workspace_id, pageParams(params, reportPage.nextPage));
      // TODO - something is going wrong here. Add some debug...
      // Supports pagination via X-Next-ID and X-Next-Row-Number headers returned in the response. 
      // See Overview https://developers.track.toggl.com/docs/reports_start#detailed-reports
      debug(reportPage)
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
