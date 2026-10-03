---
name: toggl-specs
description: >-
  Fetch the latest official Toggl Swagger/OpenAPI specs from engineering.toggl.com,
  update local spec files (spec/track-api.json and spec/reports-api.json), and review
  if the mock/stub implementation (test/mocks/handlers.ts) is aligned with the specs.
---

# Toggl Specs Management & Review Skill

This skill provides utilities and guidance to:
1. Fetch and update the official Toggl Track and Reports Swagger 2.0 specifications from `https://engineering.toggl.com/docs/track/openapi/`.
2. Save the specs into [`spec/track-api.json`](file:///C:/p/toggl-client/spec/track-api.json) and [`spec/reports-api.json`](file:///C:/p/toggl-client/spec/reports-api.json).
3. Validate and review that the mock/stub implementation in [`test/mocks/handlers.ts`](file:///C:/p/toggl-client/test/mocks/handlers.ts) matches the endpoints, HTTP methods, parameters, and response schemas defined in the specs.

---

## 1. Updating Swagger Specs

To fetch the latest specifications from Toggl Engineering and update [`spec/`](file:///C:/p/toggl-client/spec/):

```bash
node .agents/skills/toggl-specs/scripts/fetch-specs.js
```

### What this script does:
1. Scrapes the official Toggl Track OpenAPI page (`https://engineering.toggl.com/docs/track/openapi/`).
2. Extracts the current asset links for `api-*.json` (Core Track API) and `reports-*.json` (Reports API v3).
3. Downloads the JSON definitions and formats them with standard 2-space indentation.
4. Atomically updates:
   - `spec/track-api.json`
   - `spec/reports-api.json`
   - `spec/webhooks-api.json`

---

## 2. Reviewing MSW Stubs Against Swagger Specs

To review whether all endpoints in [`test/mocks/handlers.ts`](file:///C:/p/toggl-client/test/mocks/handlers.ts) are declared in the specs and return compliant schema structures:

```bash
node .agents/skills/toggl-specs/scripts/review-stubs.js
```

### What this script reviews:
1. **Endpoint & Method Matching**: Verifies every MSW mock handler in `test/mocks/handlers.ts` exists under `paths` in either `spec/track-api.json` or `spec/reports-api.json`.
2. **Schema Shape Verification**: Cross-references mock responses against Swagger `definitions` to detect any missing required fields or type mismatches.
3. **Diff / Drift Report**: Reports newly added endpoints in Toggl's API that are not yet covered, as well as any deprecated endpoints.

---

## 3. Workflow for Agents

When requested to update specs or review mock alignment:
1. Run `node .agents/skills/toggl-specs/scripts/fetch-specs.js`.
2. Run `git diff spec/` to inspect any upstream schema changes made by Toggl.
3. Run `node .agents/skills/toggl-specs/scripts/review-stubs.js` to see alignment diagnostics.
4. If discrepancies or new fields are identified, update `test/mocks/handlers.ts` and run `npm test` to verify all suites pass.
