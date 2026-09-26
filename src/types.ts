export interface AlphaFeature {
  code?: string;
  enabled?: boolean;
  [key: string]: unknown;
}

export interface Preferences {
  date_format?: string;
  timeofday_format?: string;
  duration_format?: string;
  beginningOfWeek?: number;
  alpha_features?: AlphaFeature[];
  autotracking_enabled?: boolean;
  collapseTimeEntries?: boolean;
  collapseDetailedReportEntries?: boolean;
  default_project_id?: number;
  default_task_id?: number;
  pomodoro_enabled?: boolean;
  pomodoro_focus_interval_in_minutes?: number;
  pomodoro_break_interval_in_minutes?: number;
  send_product_emails?: boolean;
  send_weekly_report?: boolean;
  send_timer_notifications?: boolean;
  time_entry_display_mode?: string;
  [key: string]: unknown;
}

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
  projects_billable_by_default?: boolean;
  rounding?: number;
  rounding_minutes?: number;
  api_token?: string;
  at?: string;
  ical_enabled?: boolean;
  [key: string]: unknown;
}

export interface Client {
  id: number;
  wid?: number;
  workspace_id?: number;
  name: string;
  at?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface Group {
  id: number;
  workspace_id?: number;
  name: string;
  at?: string;
  has_users?: boolean;
  permissions?: string[];
  users?: number[];
  workspaces?: number[];
  [key: string]: unknown;
}

export interface OrganizationGroupUser {
  user_id: number;
  joined: boolean;
  avatar_url?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export interface OrganizationGroup {
  group_id: number;
  name: string;
  at?: string;
  permissions?: string[];
  users?: OrganizationGroupUser[];
  workspaces?: number[];
  [key: string]: unknown;
}

export interface OrganizationGroupPayload {
  name: string;
  users?: number[];
  workspaces?: number[];
  [key: string]: unknown;
}

export interface OrganizationGroupParams {
  name?: string;
  workspace?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Project {
  id: number;
  workspace_id: number;
  client_id?: number;
  name: string;
  is_private?: boolean;
  active?: boolean;
  at?: string;
  created_at?: string;
  auto_estimates?: boolean;
  estimated_hours?: number;
  color?: string;
  rate?: number;
  currency?: string;
  recurring?: boolean;
  template?: boolean;
  [key: string]: unknown;
}

export interface Task {
  id: number;
  name: string;
  workspace_id: number;
  project_id: number;
  [key: string]: unknown;
}

export interface Tag {
  id: number;
  workspace_id: number;
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
  rate?: number;
  at?: string;
  [key: string]: unknown;
}

export interface TimeEntry {
  id: number;
  workspace_id: number;
  project_id?: number;
  task_id?: number;
  billable?: boolean;
  start: string;
  stop?: string;
  duration: number;
  description?: string;
  tags?: string[];
  tag_ids?: number[];
  duronly?: boolean;
  at?: string;
  server_deleted_at?: string;
  user_id?: number;
  uid?: number;
  wid?: number;
  pid?: number;
  tid?: number;
  [key: string]: unknown;
}

export interface TimeEntryParams {
  start_date?: string;
  end_date?: string;
  meta?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export type TimeEntriesQueryParams = TimeEntryParams;

export interface TimeEntryCreateInput {
  workspace_id: number;
  start: string;
  duration: number;
  description?: string;
  project_id?: number;
  task_id?: number;
  billable?: boolean;
  tags?: string[];
  tag_ids?: number[];
  stop?: string;
  created_with?: string;
  [key: string]: unknown;
}

export type TimeEntryInput = Partial<TimeEntryCreateInput>;

export interface TimeEntryUpdateInput {
  workspace_id: number;
  start?: string;
  duration?: number;
  description?: string;
  project_id?: number;
  task_id?: number;
  billable?: boolean;
  tags?: string[];
  tag_ids?: number[];
  stop?: string;
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
  billable?: boolean;
  client_ids?: number[];
  description?: string;
  group_ids?: number[];
  project_ids?: number[];
  tag_ids?: number[];
  task_ids?: number[];
  time_entry_ids?: number[];
  user_ids?: number[];
  rounding?: number;
  rounding_minutes?: number;
  page?: number;
  per_page?: number;
  page_size?: number;
  first_id?: number;
  first_row_number?: number;
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
  grouping?: string;
  sub_grouping?: string;
  distinguish_rates?: boolean;
}

export interface ReportPagination {
  page?: number;
  per_page?: number;
  total_count?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  nextId?: string | number;
  nextRowNumber?: string | number;
}

export type ReportResult<T = unknown> = T & ReportPagination;
