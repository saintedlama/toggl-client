# Examples

## Workspaces

### Update

```json
{
  "default_currency": "EUR",
  "default_hourly_rate": 50,
  "name": "John's ws",
  "only_admins_may_create_projects": false,
  "only_admins_see_billable_rates": true,
  "rounding": 1,
  "rounding_minutes": 60
}
```

## Clients

### Create

```json
{
  "name": "A Big Company",
  "wid": 777
}
```

### Update

```json
{
  "name": "Test Client 2",
  "notes": "Test Notes"
}
```

## Groups

### Create

```json
{
  "name": "Developers",
  "wid": 12345
}
```

### Update

```json
{
  "name": "Frontend Developers",
  "wid": 12345
}
```

## Projects

https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#projects

### Create

```json
{
  "name": "An awesome project",
  "wid": 12345,
  "template_id": 10237,
  "is_private": true,
  "cid": 123397
}
```

## Project Users

### Create

```json
{
  "pid": 12345,
  "uid": 123,
  "rate": 4.0,
  "manager": true
}
```

### Update

```json
{
  "manager": false,
  "rate": 15,
  "fields": "fullname"
}
```

## Tags

### Create

```json
{
  "name": "billed",
  "wid": 12345
}
```

## Time Entries

### Create

```json
{
  "description": "Meeting with possible clients",
  "tags": ["billed"],
  "duration": 1200,
  "start": "2013-03-05T07:58:58.000Z",
  "pid": 123,
  "created_with": "curl"
}
```

### Start

```json
{
  "description": "Meeting with possible clients",
  "tags": ["billed"],
  "pid": 123,
  "created_with": "curl"
}
```
