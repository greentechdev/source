---
Title: Trails and devices in outdoor life
Date: 2020-10-06
Description: Trails and devices (e.g. toilets, parking lots) in national parks or other nature areas
Tags: ["API", "GEO"]
Draft: false
---

# Trails and devices in outdoor life

Trails and devices (e.g. toilets, parking lots) in national parks or other nature areas...

## License & conditions

The data is licensed under [Creative Commons Zero, CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Our APIs and data are provided "as is" without guarantees concerning potential errors in the data, availability and performance of the API and similar.  We reserve the right to block individual IP addresses or, alternatively, to completely shut down services in the event of obvious abuse.

## Data model

...

## Distributions

This data is exposed though OGC Standard Compliant WMS and WFS services as well as ArcGIS Server REST API. The OpenApi specification and examples below use the ArcGIS Server REST API. (Even though the URL includes "WFS" it is not a WFS service.)

For more information regarding the OGC services, see [this document](https://gpt.vic-metria.nu/data/land/Leder_och_friluftsanordningar_beskrivning_av_oppna_data.pdf) (Swedish)

The WMS service is available at 
https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv/MapServer/WMSServer
https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv/MapServer/WMSServer

The WFS service is available at
https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv_WFS/MapServer/WFSServer
https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv_WFS/MapServer/WFSServer

### REST API

The OpenApi specification below describes two endpoints from the ArcGIS Server REST API that can be called to retrieve data for devices (anordningar) and trails (leder) from the service.

For the complete documentation of this API, please refer to
https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
and
https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm


The API provides two means of filtering of data: attribute based (using the 'where' parameter) or spatial (using the 'geometry' and 'spatialRel' parameters).

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/n2000_api.json)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/n2000_api.json)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/outdoorlife_api.yaml" height="1000" >}}

https://nvpub.vic-metria.nu/arcgis/rest/services/Anordningar_friluftsliv_WFS/MapServer/0/query?where=SKYDDATOMRADE%3D%27Stenshuvud%27&outFields=*&f=geojson

## Example usage

The example below uses the attribute based filtering. For an example using spatial filtering see [https://developers.arcgis.com/labs/rest/query-a-feature-layer/](https://developers.arcgis.com/labs/rest/query-a-feature-layer/).

...
Exempel där OSM visas med leder och anordningar (filtrerat på ingångar och parkeringsplatser) för kontroll av data i OSM, leaflet + 50% transparens på. Utgå från NVR-exemplet.
