export interface ClientOptions {
  apiToken?: string;
  baseUrl?: string;
  reportsUrl?: string;
}

export interface Workspace {
  id: number;
  name: string;
  profile?: number;
  premium?: boolean;
  admin?: boolean;
  default_hourly_rate?: number;
  default_currency?: string;
  only_admins_may_create_projects?: boolean;
  only_admins_see_billable_rates?: boolean;
  only_admins_see_team_dashboard?: boolean;
  rounding?: number;
  rounding_minutes?: number;
  at?: string;
  logo_url?: string;
  ical_url?: string;
  ical_enabled?: boolean;
  [key: string]: unknown;
}

export interface Client {
  id: number;
  wid?: number;
  name: string;
  at?: string;
  notes?: string;
  archived?: boolean;
  [key: string]: unknown;
}

export interface Project {
  id: number;
  workspace_id: number;
  client_id?: number | null;
  name: string;
  is_private?: boolean;
  active?: boolean;
  at?: string;
  created_at?: string;
  color?: string;
  billable?: boolean | null;
  auto_estimates?: boolean | null;
  estimated_hours?: number | null;
  rate?: number | null;
  currency?: string | null;
  description?: string;
  [key: string]: unknown;
}

export interface TimeEntry {
  id: number;
  workspace_id: number;
  project_id?: number | null;
  task_id?: number | null;
  billable?: boolean;
  start: string;
  stop?: string | null;
  duration: number;
  description?: string | null;
  tags?: string[] | null;
  tag_ids?: number[] | null;
  duronly?: boolean;
  at?: string;
  server_deleted_at?: string | null;
  user_id?: number;
  uid?: number;
  wid?: number;
  pid?: number;
  created_with?: string;
  [key: string]: unknown;
}

export interface TimeEntryInput {
  workspace_id: number;
  start: string;
  stop?: string;
  duration?: number;
  description?: string;
  project_id?: number;
  task_id?: number;
  billable?: boolean;
  tags?: string[];
  tag_ids?: number[];
  duronly?: boolean;
  created_with?: string;
  [key: string]: unknown;
}

export interface TimeEntriesQueryParams {
  start_date: string;
  end_date: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Tag {
  id: number;
  workspace_id: number;
  name: string;
  at?: string;
  deleted_at?: string | null;
  [key: string]: unknown;
}

export interface Group {
  id: number;
  workspace_id?: number;
  name: string;
  at?: string;
  [key: string]: unknown;
}

export interface ProjectUser {
  id: number;
  project_id: number;
  user_id: number;
  workspace_id: number;
  manager?: boolean;
  rate?: number | null;
  at?: string;
  [key: string]: unknown;
}

export interface Task {
  id: number;
  name: string;
  project_id: number;
  workspace_id: number;
  user_id?: number | null;
  estimated_seconds?: number;
  active?: boolean;
  at?: string;
  tracked_seconds?: number;
  [key: string]: unknown;
}

export interface User {
  id: number;
  api_token?: string;
  email: string;
  fullname: string;
  timezone?: string;
  default_workspace_id?: number;
  beginning_of_week?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  country_id?: number;
  at?: string;
  [key: string]: unknown;
}

export interface UserUpdateInput {
  country_id?: number;
  current_password?: string;
  default_workspace_id?: number;
  email?: string;
  fullname?: string;
  name?: string;
  password?: string;
  timezone?: string;
  timeofday_format?: string;
  dateFormat?: string;
  [key: string]: unknown;
}

export interface ReportParams {
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
  [key: string]: unknown;
}

export interface WeeklyReportParams extends ReportParams {
  start_date?: string;
}

export interface DetailedReportParams extends ReportParams {
  start_date: string;
}

export interface SummaryReportParams extends ReportParams {
  start_date: string;
}

export interface ReportPagination {
  page: number;
  per_page: number;
  total_count: number;
  hasNextPage: boolean;
  nextPage?: number;
}

export type ReportResult<T = unknown> = T & {
  page?: number;
  per_page?: number;
  total_count?: number;
  hasNextPage?: boolean;
  nextPage?: number;
};
