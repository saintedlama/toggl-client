import fs from 'node:fs';
import path from 'node:path';

const TRACK_SPEC_FILE = path.resolve('spec/track-api.json');
const REPORTS_SPEC_FILE = path.resolve('spec/reports-api.json');
const HANDLERS_FILE = path.resolve('test/mocks/handlers.ts');

function normalizePath(p) {
  let clean = p.replace(/^\*\/?/, '/');
  clean = clean.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
  if (!clean.startsWith('/')) clean = '/' + clean;
  return clean;
}

function parseMswHandlers() {
  const code = fs.readFileSync(HANDLERS_FILE, 'utf8');
  const handlerRegex = /http\.(get|post|put|patch|delete)\(\s*'([^']+)'/g;
  const handlers = [];
  let match;
  while ((match = handlerRegex.exec(code)) !== null) {
    handlers.push({
      method: match[1].toLowerCase(),
      rawPath: match[2],
      normalizedPath: normalizePath(match[2]),
    });
  }
  return handlers;
}

function loadSpecs() {
  const trackSpec = fs.existsSync(TRACK_SPEC_FILE) ? JSON.parse(fs.readFileSync(TRACK_SPEC_FILE, 'utf8')) : null;
  const reportsSpec = fs.existsSync(REPORTS_SPEC_FILE) ? JSON.parse(fs.readFileSync(REPORTS_SPEC_FILE, 'utf8')) : null;
  return { trackSpec, reportsSpec };
}

function findSpecOperation(specs, method, normPath) {
  if (specs.trackSpec && specs.trackSpec.paths[normPath] && specs.trackSpec.paths[normPath][method]) {
    return { specName: 'track-api.json', op: specs.trackSpec.paths[normPath][method] };
  }

  if (specs.reportsSpec && specs.reportsSpec.paths[normPath] && specs.reportsSpec.paths[normPath][method]) {
    return { specName: 'reports-api.json', op: specs.reportsSpec.paths[normPath][method] };
  }

  const altReportsPath = normPath.startsWith('/reports/api/v3')
    ? normPath.replace('/reports/api/v3', '')
    : '/reports/api/v3' + normPath;

  if (specs.reportsSpec && specs.reportsSpec.paths[altReportsPath] && specs.reportsSpec.paths[altReportsPath][method]) {
    return { specName: 'reports-api.json', op: specs.reportsSpec.paths[altReportsPath][method] };
  }

  return null;
}

function review() {
  console.log('--- Reviewing MSW Stubs against Toggl Swagger Specifications ---\n');

  const handlers = parseMswHandlers();
  const specs = loadSpecs();

  if (!specs.trackSpec || !specs.reportsSpec) {
    console.error('Specification files not found in spec/. Run fetch-specs.js first.');
    process.exit(1);
  }

  console.log(`Found ${handlers.length} MSW mock handlers in test/mocks/handlers.ts`);
  let matchedCount = 0;
  const unmatched = [];

  for (const h of handlers) {
    const match = findSpecOperation(specs, h.method, h.normalizedPath);
    if (match) {
      matchedCount++;
      const opId = match.op.operationId || '(no operationId)';
      const summary = match.op.summary || match.op.description || '';
      console.log(`  [OK] ${h.method.toUpperCase().padEnd(6)} ${h.rawPath}`);
      console.log(`       -> Matched in ${match.specName}: ${opId}${summary ? ` (${summary})` : ''}`);
    } else {
      unmatched.push(h);
      console.warn(`  [WARN] ${h.method.toUpperCase().padEnd(6)} ${h.rawPath}`);
      console.warn(`         -> No matching path '${h.normalizedPath}' found in Toggl specs`);
    }
  }

  console.log(`\nReview Summary:`);
  console.log(`  Total Handlers: ${handlers.length}`);
  console.log(`  Aligned with Swagger Spec: ${matchedCount}`);
  console.log(`  Unmatched/Custom: ${unmatched.length}`);

  if (unmatched.length > 0) {
    console.warn('\nNotice: The following handlers may be non-standard or using differing path prefixes:');
    for (const u of unmatched) {
      console.warn(`  - ${u.method.toUpperCase()} ${u.rawPath} (${u.normalizedPath})`);
    }
  } else {
    console.log('\nAll MSW handlers are 100% matched and verified against Toggl Swagger specifications!');
  }
}

review();
