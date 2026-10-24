// Prints a reviewed, reproducible subset to stdout; does not modify files.
// Apply the JSON output to src/features/atlas/data/cshapes-ottoman.json.
import { createHash } from 'node:crypto';

const url = 'https://icr.ethz.ch/data/cshapes/CShapes-2.0.geojson';
const expectedHash =
  '384b1ea90b9419f30a858d7ec237c85a22c60d1b35b5f85f215a1204f9989d42';
const response = await fetch(url);
if (!response.ok) throw new Error(`Download failed: ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
if (createHash('sha256').update(bytes).digest('hex') !== expectedHash)
  throw new Error(
    'Source changed: review upstream before updating the pinned hash.',
  );
const collection = JSON.parse(bytes.toString('utf8'));
const date = (p, prefix) =>
  [p[`${prefix}year`], p[`${prefix}month`], p[`${prefix}day`]]
    .map((value, index) => String(value).padStart(index ? 2 : 4, '0'))
    .join('-');
const selected = collection.features.flatMap((feature) => {
  const p = feature.properties;
  if (p.gwcode !== 640) return [];
  // Do NOT parse gwsdate/gwedate: upstream strings contain timezone offsets.
  const validFrom = date(p, 'gws');
  const validTo = date(p, 'gwe');
  const years = Array.from({ length: 29 }, (_, i) => 1886 + i).filter(
    (year) => validFrom <= `${year}-01-01` && validTo >= `${year}-01-01`,
  );
  if (!years.length) return [];
  return [
    {
      id: `cshapes-640-${validFrom}`,
      periodId: 'reform',
      name: { tr: 'Osmanlı Devleti', en: 'Ottoman Empire' },
      startYear: years[0],
      endYear: years.at(-1),
      validFrom,
      validTo,
      sourceId: 'cshapes-2',
      status: 'generalized',
      note: {
        tr: 'CShapes 2.0 verisine göre genelleştirilmiş devlet sınırları. Fiilî kontrolü, savaş cephelerini ve küçük toprak değişimlerinin tamamını göstermez. Yıllık görünüm 1 Ocak tarihini esas alır.',
        en: 'Generalized state boundaries from CShapes 2.0. Not actual control, battlefronts or every small territorial change. Annual views sample January 1.',
      },
      // Coordinates/rings remain unchanged. D3 winding is adapted only by renderer.
      geometry: feature.geometry,
    },
  ];
});
if (selected.length !== 3)
  throw new Error('Unexpected Ottoman pilot record count.');
process.stdout.write(JSON.stringify(selected) + '\n');
