# Editorial events and source-derived boundaries

This is a 12-event starter selection for 552–1923, not an exhaustive history.
Turkish and English text is original editorial summary. Bibliographic links in
`sources.ts` were checked against the cited TDV encyclopedia and TBMM pages on
2026-10-04. These 12 narrative references support event accounts, not boundary
geometry. CShapes 2.0 is a separate 13th source record. No source images or long
quotations are redistributed; the boundary subset is redistributed under its
own data license.

`Period` records are contiguous editorial reading chapters. Their boundaries
must not be labelled as the founding or dissolution dates of individual states.
Several states and cultures coexisted within these chapters.

## Historical boundary pilot

The previous hand-authored schematic regions have been removed. `Territory`
now represents **source-derived generalized state boundaries** with
`status: 'generalized'`, a source ID, source validity dates, display-year coverage,
Polygon/MultiPolygon geometry and bilingual explanatory notes.

The pilot contains only Ottoman state records from CShapes 2.0, sampled on
January 1 of each year from **1886 through 1914**. Source records valid on the
selected January 1 supply the geometry; this does not imply unchanged boundaries
throughout that year. No boundary is drawn outside that coverage, including in 1453. No previous/nearest year or fabricated interpolation is substituted.

CShapes uses generalized coding rules; these boundaries are not exact actual
control, wartime fronts, or a complete depiction of dependencies. Extrusion is
a visual distinction, not a measure of power, population, area or elevation.
Natural Earth supplies only the public-domain land basemap.

The CShapes-derived subset is licensed under **CC BY-NC-SA 4.0**, separately from
MIT application code. Preserve attribution, license and changes notice; commercial
reuse requires separate permission or compatible replacement data. See
[boundary-provenance.md](boundary-provenance.md) for publication attribution,
official download, license, pinned source hash, extraction and coding limitations.

## Events and validation

Event coordinates are geographic reference points, not precise military
positions. Each record also carries an editorial footprint: approximate radius,
elongation, direction, edge roughness and a translated explanation derived from
the cited narrative. The renderer turns that metadata into a deterministic,
irregular area following the globe surface. Selecting an event adds a smaller,
lighter second relief above it so the active location reads in depth. Both
layers are independent of the boundary dataset; they are not exact borders,
troop positions, physical topography or quantities.

An empty result from `getEventsForYear` means this selection has no event for
that year. It does not mean no historical events occurred. The selector must
not substitute a previous event as though it occurred in the selected year.

The shared Zod schema validates translations, dates, IDs, references, coordinate
ranges, footprint constraints, closed non-degenerate rings, and chapter consistency. Verification must
cover editorial periods across selectable years, exact-year event semantics,
January 1 boundary lookup, multipart geometry and missing-boundary years.
Technical validation checks data integrity, not independent historical accuracy.
Further editorial review and broader source coverage are needed as the atlas
grows. Current check outcomes belong in `tasks/todo.md`, not inferred from earlier
prototype results.
