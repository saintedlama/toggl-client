import fs from 'node:fs';
import path from 'node:path';

const DOCS_URL = 'https://engineering.toggl.com/docs/track/openapi/';
const BASE_URL = 'https://engineering.toggl.com';
const SPEC_DIR = path.resolve('spec');

async function fetchSpecs() {
  console.log(`Fetching OpenAPI documentation from: ${DOCS_URL}`);
  const response = await fetch(DOCS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch Toggl documentation page: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const fileRegex = /href="([^"]*\/assets\/files\/[^"]+\.json)"/g;
  let match;
  const links = [];
  while ((match = fileRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  if (links.length === 0) {
    throw new Error('No Swagger JSON specification links found on documentation page');
  }

  const specMapping = [
    { pattern: /api-[^/]+\.json$/, target: 'track-api.json', name: 'Toggl Track Core API' },
    { pattern: /reports-[^/]+\.json$/, target: 'reports-api.json', name: 'Toggl Reports API' },
    { pattern: /webhooks-[^/]+\.json$/, target: 'webhooks-api.json', name: 'Toggl Webhooks API' },
  ];

  if (!fs.existsSync(SPEC_DIR)) {
    fs.mkdirSync(SPEC_DIR, { recursive: true });
  }

  for (const mapping of specMapping) {
    const link = links.find((l) => mapping.pattern.test(l));
    if (!link) {
      console.warn(`Warning: Could not find link for ${mapping.name}`);
      continue;
    }

    const downloadUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;
    console.log(`Downloading ${mapping.name} from: ${downloadUrl}`);
    const specRes = await fetch(downloadUrl);
    if (!specRes.ok) {
      console.error(`Failed to download ${mapping.name}: ${specRes.status}`);
      continue;
    }

    const json = await specRes.json();
    const targetFile = path.join(SPEC_DIR, mapping.target);
    fs.writeFileSync(targetFile, JSON.stringify(json, null, 2) + '\n', 'utf8');
    console.log(`Successfully updated ${mapping.target} (${Object.keys(json.paths || {}).length} paths)`);
  }
}

fetchSpecs().catch((err) => {
  console.error('Error fetching Toggl specs:', err);
  process.exit(1);
});
