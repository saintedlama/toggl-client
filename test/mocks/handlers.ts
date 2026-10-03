import { http, HttpResponse } from 'msw';

export const handlers = [
  // User endpoints
  http.get('*/me', () => {
    return HttpResponse.json({
      id: 1,
      api_token: 'mock-token',
      default_workspace_id: 1,
      email: 'user@example.com',
      fullname: 'Test User',
      timezone: 'UTC',
    });
  }),

  http.put('*/me', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 1,
      api_token: 'mock-token',
      default_workspace_id: 1,
      email: 'user@example.com',
      fullname: body.fullname || 'Updated User',
      timezone: 'UTC',
      ...body,
    });
  }),

  http.post('*/me/reset_token', () => {
    return HttpResponse.json('new-mock-api-token');
  }),

  // Workspaces
  http.get('*/me/workspaces', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Workspace',
        admin: true,
        role: 'admin',
      },
    ]);
  }),

  http.get('*/workspaces/:workspace_id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.workspace_id) || 1,
      name: 'Test Workspace',
      admin: true,
    });
  }),

  // Projects
  http.get('*/workspaces/:workspace_id/projects', () => {
    return HttpResponse.json([
      {
        id: 101,
        workspace_id: 1,
        name: 'Project Alpha',
        active: true,
        billable: false,
        color: '#0b835c',
        is_private: false,
        at: new Date().toISOString(),
      },
    ]);
  }),

  http.get('*/workspaces/:workspace_id/projects/:project_id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.project_id) || 101,
      workspace_id: Number(params.workspace_id) || 1,
      name: 'Project Alpha',
      active: true,
      billable: false,
      color: '#0b835c',
      is_private: false,
      at: new Date().toISOString(),
    });
  }),

  http.get('*/workspaces/:workspace_id/projects/:project_id/tasks', ({ params }) => {
    return HttpResponse.json([
      {
        id: 801,
        name: 'Mock Task',
        workspace_id: Number(params.workspace_id) || 1,
        project_id: Number(params.project_id) || 101,
        active: true,
      },
    ]);
  }),

  http.get('*/workspaces/:workspace_id/tasks', ({ params }) => {
    return HttpResponse.json([
      {
        id: 801,
        name: 'Mock Task',
        workspace_id: Number(params.workspace_id) || 1,
        active: true,
      },
    ]);
  }),

  http.post('*/workspaces/:workspace_id/projects', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 102,
      workspace_id: Number(params.workspace_id) || 1,
      name: body.name || 'New Project',
      active: true,
      color: '#0b835c',
      is_private: false,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.put('*/workspaces/:workspace_id/projects/:project_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.project_id) || 101,
      workspace_id: Number(params.workspace_id) || 1,
      name: body.name || 'Updated Project',
      active: true,
      color: '#0b835c',
      is_private: false,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/projects/:project_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Project Users
  http.get('*/workspaces/:workspace_id/project_users', () => {
    return HttpResponse.json([
      {
        id: 201,
        project_id: 101,
        user_id: 1,
        workspace_id: 1,
        manager: true,
      },
    ]);
  }),

  http.post('*/workspaces/:workspace_id/project_users', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 202,
      project_id: 101,
      user_id: 1,
      workspace_id: Number(params.workspace_id) || 1,
      manager: false,
      rate: null,
      ...body,
    });
  }),

  http.put('*/workspaces/:workspace_id/project_users/:project_user_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.project_user_id) || 202,
      project_id: 101,
      user_id: 1,
      workspace_id: Number(params.workspace_id) || 1,
      manager: true,
      rate: null,
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/project_users/:project_user_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Clients
  http.get('*/me/clients', () => {
    return HttpResponse.json([
      {
        id: 301,
        name: 'Client Alpha',
        wid: 1,
      },
    ]);
  }),

  http.get('*/workspaces/:workspace_id/clients', () => {
    return HttpResponse.json([
      {
        id: 301,
        name: 'Client Alpha',
        wid: 1,
      },
    ]);
  }),

  http.get('*/workspaces/:workspace_id/clients/:client_id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.client_id) || 301,
      name: 'Client Alpha',
      wid: Number(params.workspace_id) || 1,
    });
  }),

  http.post('*/workspaces/:workspace_id/clients', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 302,
      name: body.name || 'New Client',
      wid: Number(params.workspace_id) || 1,
      ...body,
    });
  }),

  http.put('*/workspaces/:workspace_id/clients/:client_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.client_id) || 301,
      name: body.name || 'Updated Client',
      wid: Number(params.workspace_id) || 1,
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/clients/:client_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get('*/workspaces/:workspace_id/clients/:client_id/projects', () => {
    return HttpResponse.json([
      {
        id: 101,
        name: 'Project Alpha',
        client_id: 301,
        workspace_id: 1,
      },
    ]);
  }),

  // Groups
  http.get('*/workspaces/:workspace_id/groups', () => {
    return HttpResponse.json([
      {
        group_id: 401,
        id: 401,
        name: 'Developers',
        workspace_id: 1,
      },
    ]);
  }),

  http.post('*/workspaces/:workspace_id/groups', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      group_id: 402,
      id: 402,
      name: body.name || 'New Group',
      workspace_id: Number(params.workspace_id) || 1,
      users: [],
      ...body,
    });
  }),

  http.put('*/workspaces/:workspace_id/groups/:group_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      group_id: Number(params.group_id) || 401,
      id: Number(params.group_id) || 401,
      name: body.name || 'Updated Group',
      workspace_id: Number(params.workspace_id) || 1,
      users: [],
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/groups/:group_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.get('*/organizations/:organization_id/groups', () => {
    return HttpResponse.json([
      {
        group_id: 401,
        name: 'Developers',
        organization_id: 1,
        workspaces: [1],
        users: [{ user_id: 1, joined: true }],
      },
    ]);
  }),

  http.post('*/organizations/:organization_id/groups', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      group_id: 402,
      name: body.name || 'New Group',
      organization_id: 1,
      workspaces: body.workspace_ids || [1],
      users: [],
    });
  }),

  http.put('*/organizations/:organization_id/groups/:group_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      group_id: Number(params.group_id) || 401,
      name: body.name || 'Updated Group',
      organization_id: 1,
      workspaces: body.workspace_ids || [1],
      users: [],
    });
  }),

  http.delete('*/organizations/:organization_id/groups/:group_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Tags
  http.get('*/workspaces/:workspace_id/tags', () => {
    return HttpResponse.json([
      {
        id: 501,
        name: 'urgent',
        workspace_id: 1,
        at: new Date().toISOString(),
      },
    ]);
  }),

  http.post('*/workspaces/:workspace_id/tags', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 502,
      name: body.name || 'billing',
      workspace_id: Number(params.workspace_id) || 1,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.put('*/workspaces/:workspace_id/tags/:tag_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.tag_id) || 501,
      name: body.name || 'updated-tag',
      workspace_id: Number(params.workspace_id) || 1,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/tags/:tag_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Preferences
  http.get('*/me/preferences', () => {
    return HttpResponse.json({
      timeofday_format: 'H:mm',
      date_format: 'YYYY-MM-DD',
      duration_format: 'classic',
    });
  }),

  http.post('*/me/preferences', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      timeofday_format: 'H:mm',
      date_format: 'YYYY-MM-DD',
      duration_format: 'classic',
      ...body,
    });
  }),

  http.get('*/me/preferences/:client_type', () => {
    return HttpResponse.json({
      timeofday_format: 'H:mm',
      date_format: 'YYYY-MM-DD',
      duration_format: 'classic',
    });
  }),

  http.post('*/me/preferences/:client_type', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      timeofday_format: 'H:mm',
      date_format: 'YYYY-MM-DD',
      duration_format: 'classic',
      ...body,
    });
  }),

  // Time Entries
  http.get('*/me/time_entries', () => {
    return HttpResponse.json([
      {
        id: 601,
        workspace_id: 1,
        project_id: 101,
        description: 'Working on toggl-client',
        start: '2026-10-01T09:00:00Z',
        duration: 3600,
        at: '2026-10-01T10:00:00Z',
      },
    ]);
  }),

  http.get('*/me/time_entries/current', () => {
    return HttpResponse.json({
      id: 602,
      workspace_id: 1,
      project_id: 101,
      description: 'Current active task',
      start: '2026-10-03T14:00:00Z',
      duration: -1,
      at: '2026-10-03T14:00:00Z',
    });
  }),

  http.post('*/workspaces/:workspace_id/time_entries', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: 603,
      workspace_id: Number(params.workspace_id) || 1,
      description: body.description || 'New Time Entry',
      start: body.start || new Date().toISOString(),
      duration: body.duration !== undefined ? body.duration : 120,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.patch('*/workspaces/:workspace_id/time_entries/:time_entry_id/stop', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.time_entry_id) || 603,
      workspace_id: Number(params.workspace_id) || 1,
      description: 'Stopped Time Entry',
      start: '2026-10-03T14:00:00Z',
      stop: new Date().toISOString(),
      duration: 3600,
      at: new Date().toISOString(),
    });
  }),

  http.put('*/workspaces/:workspace_id/time_entries/:time_entry_id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({
      id: Number(params.time_entry_id) || 601,
      workspace_id: Number(params.workspace_id) || 1,
      description: body.description || 'Updated Time Entry',
      start: '2026-10-01T09:00:00Z',
      duration: 3600,
      at: new Date().toISOString(),
      ...body,
    });
  }),

  http.delete('*/workspaces/:workspace_id/time_entries/:time_entry_id', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // Reports API v3
  http.post('*/reports/api/v3/workspace/:workspace_id/search/time_entries', () => {
    return HttpResponse.json([
      {
        id: 701,
        description: 'Reported Entry 1',
        time_entries: [{ id: 601, duration: 1800 }],
      },
    ]);
  }),

  http.post('*/reports/api/v3/workspace/:workspace_id/weekly/time_entries', () => {
    return HttpResponse.json([
      {
        user_id: 1,
        project_id: 101,
        totals: [1800, 3600, 0, 0, 0, 0, 0],
      },
    ]);
  }),

  http.post('*/reports/api/v3/workspace/:workspace_id/summary/time_entries', () => {
    return HttpResponse.json({
      groups: [
        {
          id: 101,
          sub_groups: [{ id: 1, duration: 3600 }],
        },
      ],
    });
  }),

  http.post('*/reports/api/v3/workspace/:workspace_id/search/time_entries/totals', () => {
    return HttpResponse.json({
      seconds: 7200,
      rates: [{ billable_seconds: 3600, hourly_rate_in_cents: 5000, currency: 'USD' }],
    });
  }),

  http.post('*/reports/api/v3/workspace/:workspace_id/projects/summary', () => {
    return HttpResponse.json([
      {
        user_id: 1,
        billable_seconds: 3600,
      },
    ]);
  }),

  http.post('*/reports/api/v3/workspace/:workspace_id/projects/:project_id/summary', () => {
    return HttpResponse.json({
      project_id: 101,
      tracked_seconds: 7200,
    });
  }),
];
