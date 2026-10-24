import { createHash } from 'node:crypto';
import { rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceUrl =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson';
const expectedHash =
  'e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b';
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(repositoryRoot, 'public/data/atlas-land.json');
const temporaryTarget = `${target}.next`;

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Download failed: ${response.status}`);

const bytes = Buffer.from(await response.arrayBuffer());
const sourceHash = createHash('sha256').update(bytes).digest('hex');
if (sourceHash !== expectedHash)
  throw new Error(
    'Natural Earth source changed: review upstream before updating the pinned hash.',
  );

const collection = JSON.parse(bytes.toString('utf8'));
if (collection.name !== 'ne_50m_land' || !Array.isArray(collection.features))
  throw new Error('Unexpected Natural Earth dataset structure.');

await writeFile(temporaryTarget, bytes);
await rename(temporaryTarget, target);
process.stdout.write(`Updated ${target}\nSHA256 ${sourceHash}\n`);
