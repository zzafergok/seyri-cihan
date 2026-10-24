# Atlas base geography

`atlas-land.json` is the unmodified Natural Earth 1:50m physical land GeoJSON,
retrieved on 2026-10-24 from the maintainers' repository:

https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson

The source is pinned by SHA256 in `scripts/import-natural-earth.mjs`. Run
`npm run data:land` to verify and refresh the local copy atomically.

Natural Earth declares all versions of its raster and vector data public domain:
https://www.naturalearthdata.com/about/terms-of-use/

Made with Natural Earth. The application serves this file locally; it makes no
runtime requests to a remote map, tile, texture or geocoding service. These
polygons describe physical land, not historical political boundaries. Raised
historical areas are separately authored and explicitly marked as schematic.
