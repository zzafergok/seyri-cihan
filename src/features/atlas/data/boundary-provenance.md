# Ottoman boundary pilot — CShapes 2.0

This layer replaces the removed hand-authored schematic reading regions. It is a
source-derived, generalized representation, not an independently verified atlas
of every historical frontier or battlefield.

## Source and attribution

Schvitz, Guy, Seraina Rüegger, Luc Girardin, Lars-Erik Cederman, Nils Weidmann,
and Kristian Skrede Gleditsch (2022). “Mapping The International System,
1886–2017: The CShapes 2.0 Dataset.” Journal of Conflict Resolution 66(1),144–161.
[Publication](https://doi.org/10.1177/00220027211013563).

- Publisher: ETH Zürich, International Conflict Research.
- [Official source and license](https://icr.ethz.ch/data/cshapes/).
- [Original GeoJSON](https://icr.ethz.ch/data/cshapes/CShapes-2.0.geojson).
- [Codebook](https://icr.ethz.ch/data/cshapes/CShapes-2.0_Codebook.pdf).
- Retrieved: 2026-10-06.
- Original download SHA256: `384b1ea90b9419f30a858d7ec237c85a22c60d1b35b5f85f215a1204f9989d42`.
- Original download size: 26,344,671 bytes; 710 features.

`cshapes-ottoman.json` is distributed under
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/).
The application code's MIT license does not override this data license. Retain
attribution, license, source links and this changes notice with redistribution.
Commercial reuse requires separate permission or a compatible alternative dataset.
No endorsement by ETH Zürich or the authors is implied. Natural Earth is a
separate public-domain basemap and is not the historical-border source.

## Extraction and changes

`scripts/import-cshapes.mjs` downloads and SHA256-checks the original data, filters
Gleditsch–Ward country code640 and selects only records matching January1 of a
year from1886 through1914. It prints the subset as JSON. Applying that output
to `cshapes-ottoman.json` reproduces this extraction. Geometry coordinates,
multipart islands and holes are unchanged; no hand-drawn points, coastline
snapping, simplification or interpolated borders are introduced.

We add Turkish/English names, explanatory text, source identity and a display-year
interval. Original date strings have timezone artifacts; validity is constructed
from explicit `gwsyear/gwsmonth/gwsday` and `gweyear/gwemonth/gweday` fields.
Source intervals are inclusive. D3 winding conversion occurs only at render time.

| Selected January1 years | Source record validity | Polygon parts |
| --- | --- | --- |
| 1886–1912 | 1886-01-01–1912-10-17 | 26 |
| 1913 | 1913-01-01–1913-05-29 | 25 |
| 1914 | 1913-05-30–1914-11-02 | 12 |

This is not a claim that boundaries were unchanged throughout a selected year.
The short October–December1912 record is intentionally absent from January1
sampling. No border is shown outside1886–1914, including1453. No nearest-year
fallback is allowed. Only the Ottoman state record is included; dependencies,
neighbors and a complete political world map are not yet represented.

## Interpretation and limitations

The official codebook uses de jure changes, omits some changes below10,000km²,
excludes certain temporary wartime exchanges/unrecognized entities, and may
default uncertain dates to the first day of a month/year. Undefined or conflicting
historical boundaries may be generalized or backdated under its coding rules.
The layer must not be described as exact actual control or fully verified frontiers.

Technical checks verify source identity, extraction, multipart geometry, temporal
coverage and example positions. They do not replace historical editorial review.
Extrusion is a visual selection aid, not physical terrain height or political power.
