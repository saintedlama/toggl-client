import dayjs from 'dayjs';
import type TogglClient from './client.js';
import type { ReportParams, WeeklyReportParams, DetailedReportParams, SummaryReportParams, ReportResult } from './types.js';

function timeout(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeoutMs));
}

/**
 * Access Toggl Reports API v3.
 *
 * @see https://developers.track.toggl.com/docs/reports
 */
class Reports {
  client: TogglClient;

  constructor(client: TogglClient) {
    this.client = client;
  }

  /**
   * Fetch a weekly report for a workspace.
   *
   * @see https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Optional weekly report parameters (defaults to start of current week)
   */
  async weekly<T = unknown>(workspaceId: number, params?: WeeklyReportParams): Promise<ReportResult<T>> {
    const searchParams = {
      start_date: dayjs().startOf('week').format('YYYY-MM-DD'),
      ...params,
    };
    return await this.requestReport<T>(`workspace/${workspaceId}/weekly/time_entries`, workspaceId, searchParams);
  }

  /**
   * Fetch all entries of a weekly report.
   *
   * @see https://developers.track.toggl.com/docs/reports/weekly_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Optional weekly report parameters
   */
  async weeklyAll<T = unknown>(workspaceId: number, params?: WeeklyReportParams): Promise<T[]> {
    const result = await this.weekly<T>(workspaceId, params);
    if (Array.isArray(result)) {
      return [...(result as unknown as T[])];
    }
    if (result && Array.isArray((result as Record<string, unknown>).data)) {
      return [...((result as Record<string, unknown>).data as T[])];
    }
    return [];
  }

  /**
   * Fetch a detailed time entries report.
   *
   * @see https://developers.track.toggl.com/docs/reports/detailed_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Detailed report parameters (must include start_date)
   */
  async details<T = unknown>(workspaceId: number, params: DetailedReportParams): Promise<ReportResult<T>> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport<T>(`workspace/${workspaceId}/search/time_entries`, workspaceId, params);
  }

  /**
   * Fetch all pages of a detailed report with rate-limiting pauses between requests.
   *
   * @see https://developers.track.toggl.com/docs/reports/detailed_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Detailed report parameters (must include start_date)
   * @param maxPages - Optional maximum number of pages to fetch (default: 100)
   */
  async detailsAll<T = unknown>(workspaceId: number, params: DetailedReportParams, maxPages = 100): Promise<T[]> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    const allEntries: T[] = [];
    let currentParams: DetailedReportParams = { ...params };
    let hasNextPage = true;
    const seenNextIds = new Set<string>();
    let pageCount = 0;

    while (hasNextPage && pageCount < maxPages) {
      pageCount++;
      const pageResult = await this.details<T>(workspaceId, currentParams);
      if (Array.isArray(pageResult)) {
        allEntries.push(...(pageResult as unknown as T[]));
      } else if (pageResult && Array.isArray((pageResult as Record<string, unknown>).data)) {
        allEntries.push(...((pageResult as Record<string, unknown>).data as T[]));
      }

      hasNextPage = Boolean(pageResult.hasNextPage);
      if (hasNextPage) {
        const nextIdStr = pageResult.nextId != null ? String(pageResult.nextId) : undefined;
        if (nextIdStr) {
          if (seenNextIds.has(nextIdStr)) {
            // Detected cycle (e.g. mock server returning static X-Next-ID)
            break;
          }
          seenNextIds.add(nextIdStr);
          const parsedNextId = Number(pageResult.nextId);
          const parsedNextRow = pageResult.nextRowNumber ? Number(pageResult.nextRowNumber) : undefined;
          if (Number.isInteger(parsedNextId)) {
            currentParams = {
              ...currentParams,
              first_id: parsedNextId,
              first_row_number: Number.isInteger(parsedNextRow) ? parsedNextRow : undefined,
            };
          } else {
            // Non-integer nextId (e.g. mock server placeholder string)
            break;
          }
        } else if (pageResult.nextPage) {
          currentParams = {
            ...currentParams,
            page: pageResult.nextPage,
          };
        } else {
          break;
        }
        await timeout(1010);
      }
    }

    return allEntries;
  }

  /**
   * Fetch a summary report.
   *
   * @see https://developers.track.toggl.com/docs/reports/summary_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Summary report parameters (must include start_date)
   */
  async summary<T = unknown>(workspaceId: number, params: SummaryReportParams): Promise<ReportResult<T>> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport<T>(`workspace/${workspaceId}/summary/time_entries`, workspaceId, params);
  }

  /**
   * Fetch all groups of a summary report.
   *
   * @see https://developers.track.toggl.com/docs/reports/summary_reports#post-search-time-entries
   * @param workspaceId - Workspace ID
   * @param params - Summary report parameters (must include start_date)
   */
  async summaryAll<T = unknown>(workspaceId: number, params: SummaryReportParams): Promise<T[]> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    const result = await this.summary<T>(workspaceId, params);
    if (Array.isArray(result)) {
      return [...(result as unknown as T[])];
    }
    if (result && Array.isArray((result as Record<string, unknown>).groups)) {
      return [...((result as Record<string, unknown>).groups as T[])];
    }
    if (result && Array.isArray((result as Record<string, unknown>).data)) {
      return [...((result as Record<string, unknown>).data as T[])];
    }
    return [];
  }

  /**
   * Load totals for a detailed report.
   *
   * @see https://developers.track.toggl.com/docs/reports/detailed_reports#post-load-totals-detailed-report
   * @param workspaceId - Workspace ID
   * @param params - Detailed report parameters (must include start_date)
   */
  async totals<T = unknown>(workspaceId: number, params: DetailedReportParams): Promise<T> {
    if (!params || !Object.prototype.hasOwnProperty.call(params, 'start_date')) {
      throw new Error('The parameters must include start_date');
    }
    return await this.requestReport<T>(`workspace/${workspaceId}/search/time_entries/totals`, workspaceId, params);
  }

  /**
   * List project users summary.
   *
   * @see https://developers.track.toggl.com/docs/reports/projects_reports
   * @param workspaceId - Workspace ID
   * @param params - Optional report parameters
   */
  async projectsSummary<T = unknown>(workspaceId: number, params?: ReportParams): Promise<T> {
    return await this.requestReport<T>(`workspace/${workspaceId}/projects/summary`, workspaceId, params);
  }

  /**
   * Load project summary for a specific project.
   *
   * @see https://developers.track.toggl.com/docs/reports/projects_reports
   * @param workspaceId - Workspace ID
   * @param projectId - Project ID
   * @param params - Optional report parameters
   */
  async projectSummary<T = unknown>(workspaceId: number, projectId: number, params?: ReportParams): Promise<T> {
    return await this.requestReport<T>(`workspace/${workspaceId}/projects/${projectId}/summary`, workspaceId, params);
  }

  /**
   * Helper to execute a POST report request against the Reports API v3.
   *
   * @param path - Sub-path on Reports API
   * @param workspace_id - Workspace ID
   * @param params - Query/body parameters
   */
  async requestReport<T = unknown>(path: string, workspace_id: number, params?: ReportParams): Promise<ReportResult<T>> {
    const searchParams = Object.assign(
      {
        user_agent: 'npm-toggl-client/1.0.0 (https://github.com/saintedlama/toggl-client)',
        workspace_id,
      },
      params || { page: 1 },
    );

    const response = await this.client.requestRaw(path, {
      prefixUrl: this.client.options.reportsUrl || 'https://api.track.toggl.com/reports/api/v3',
      method: 'POST',
      json: searchParams,
    });

    let report: Record<string, unknown> | unknown[];
    if (response.body) {
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        report = JSON.parse(response.body);
      } else {
        report = response.body as unknown as Record<string, unknown>;
      }
    } else {
      report = {};
    }

    if (typeof report === 'object' && report !== null) {
      const reportWithPagination = report as ReportResult<T>;

      // Attach pagination metadata
      reportWithPagination.page = (searchParams.page as number) || 1;

      const perPage = (reportWithPagination.per_page as number) || (searchParams.page_size as number) || 0;
      const totalCount = (reportWithPagination.total_count as number) || 0;
      const nextId = response.headers['x-next-id'] as string | undefined;
      const nextRowNumber = response.headers['x-next-row-number'] as string | undefined;

      if (nextId) {
        reportWithPagination.hasNextPage = true;
        reportWithPagination.nextId = nextId;
        reportWithPagination.nextRowNumber = nextRowNumber;
      } else if (perPage > 0 && totalCount > 0 && perPage * reportWithPagination.page < totalCount) {
        reportWithPagination.hasNextPage = true;
        reportWithPagination.nextPage = reportWithPagination.page + 1;
      } else {
        reportWithPagination.hasNextPage = false;
      }

      return reportWithPagination;
    }

    return report as ReportResult<T>;
  }
}

export default Reports;
