import dayjs from 'dayjs';
import type TogglClient from './client.js';
import type { ReportParams, WeeklyReportParams, DetailedReportParams, SummaryReportParams, ReportResult } from './types.js';

function timeout(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeoutMs));
}

function pageParams(params: Record<string, unknown> | undefined, page: number): Record<string, unknown> {
  return Object.assign({}, params || {}, { page });
}

/**
 * Access reports. See https://github.com/toggl/toggl_api_docs/blob/master/reports.md
 */
class Reports {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Weekly report
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weekly<T = unknown>(workspaceId: number, params?: WeeklyReportParams): Promise<ReportResult<T>> {
    const searchParams = {
      start_date: dayjs().startOf('week').format('YYYY-MM-DD'),
      ...params,
    };
    return await this.requestReport<T>(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, searchParams);
  }

  /**
   * Weekly report containing all pages fetched with wait time between requests of 1010ms
   * https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   */
  async weeklyAll<T = unknown>(workspaceId: number, params?: WeeklyReportParams): Promise<ReportResult<T>> {
    const searchParams = {
      start_date: dayjs().startOf('week').format('YYYY-MM-DD'),
      ...params,
    };
    return await this.requestReport<T>(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, searchParams);
  }

  /**
   * Detailed report URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async details<T = unknown>(workspaceId: number, params?: DetailedReportParams): Promise<ReportResult<T>> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport<T>(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Detailed report containing all pages fetched with wait time between requests of 1010ms
   * URL: GET https://api.track.toggl.com/reports/api/v3/workspace/{workspace_id}/search/time_entries
   * https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * params must include start_date
   */
  async detailsAll<T = unknown>(workspaceId: number, params?: DetailedReportParams): Promise<T[]> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReportPages<T>(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Summary report URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summary<T = unknown>(workspaceId: number, params?: SummaryReportParams): Promise<ReportResult<T>> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport<T>(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }

  /**
   * Summary report containing all pages fetched with wait time between requests of 1010ms
   * URL: GET https://api.track.toggl.com/reports/api/v2/summary
   */
  async summaryAll<T = unknown>(workspaceId: number, params?: SummaryReportParams): Promise<T[]> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReportPages<T>(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }

  async requestReportPages<T = unknown>(path: string, workspace_id: number, params?: ReportParams): Promise<T[]> {
    const report: T[] = [];
    let reportPage: ReportResult<{ data?: T[] }> = { hasNextPage: true, nextPage: 1 } as ReportResult<{ data?: T[] }>;

    while (reportPage.hasNextPage) {
      reportPage = await this.requestReport<{ data?: T[] }>(
        path,
        workspace_id,
        pageParams(params as Record<string, unknown>, reportPage.nextPage || 1),
      );
      if (Array.isArray(reportPage.data)) {
        report.push(...reportPage.data);
      }

      if (reportPage.hasNextPage) {
        await timeout(1010);
      }
    }

    return report;
  }

  async requestReport<T = unknown>(path: string, workspace_id: number, params?: ReportParams): Promise<ReportResult<T>> {
    const searchParams = Object.assign(
      {
        user_agent: 'npm-toggl-client/1.0.0 (https://github.com/saintedlama/toggl-client)',
        workspace_id,
      },
      params || { page: 1 },
    );

    const report = await this.client.request<ReportResult<T>>(path, {
      prefixUrl: this.client.options.reportsUrl || 'https://api.track.toggl.com/reports/api/v3',
      method: 'POST',
      json: searchParams,
    });

    report.page = (searchParams.page as number) || 1;

    const perPage = (report.per_page as number) || 0;
    const totalCount = (report.total_count as number) || 0;

    if (perPage * report.page < totalCount) {
      report.hasNextPage = true;
      report.nextPage = report.page + 1;
    } else {
      report.hasNextPage = false;
    }

    return report;
  }
}

export default Reports;
