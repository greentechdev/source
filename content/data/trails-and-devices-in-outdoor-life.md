---
Title: Trails and devices in outdoor life
Date: 2020-10-06
Description: Trails and devices (e.g. toilets, parking lots) in national parks or other nature areas
Tags: ["API", "GEO"]
Draft: false
---

# Trails and devices in outdoor life

Trails and devices (e.g. toilets, parking lots) in national parks or other nature areas.

## Data quality

See the Swedish EPA's metadata catalogue for details: [Friluftsliv: Leder och anordningar i skyddade områden](https://metadatakatalogen.naturvardsverket.se/metadatakatalogen/GetMetaDataById?id=af2e37d3-45b0-4623-bcf2-0765c8ca7ab5) (Swedish).

## License & conditions 

{{< license-cc0 >}}

## License & conditions

The data is licensed under [Creative Commons Zero, CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Our APIs and data are provided "as is" without guarantees concerning potential errors in the data, availability and performance of the API and similar.  We reserve the right to block individual IP addresses or, alternatively, to completely shut down services in the event of obvious abuse.

## Data model

{{< figure src="/outdoorlifemodel.png" alt="Outdoor life API data model" >}}

The current data model is very basic. There is ongoing work intending to refine this model and the attributes that the public data exposes from the underlying internal data.

## Distributions

This data is exposed though OGC Standard Compliant WMS and WFS services as well as ArcGIS REST API. The OpenApi specification and examples below use the ArcGIS REST API. (Even though the URL includes "WFS" it is not a WFS service.)

For more information regarding the OGC services and the data, see [this document](https://gpt.vic-metria.nu/data/land/Leder_och_friluftsanordningar_beskrivning_av_oppna_data.pdf) (Swedish).

### WMS and WFS services

The WMS service is available at 
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv/MapServer/WMSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv/MapServer/WMSServer

The WFS service is available at
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv_WFS/MapServer/WFSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv_WFS/MapServer/WFSServer

### ArcGIS REST API

The OpenApi specification below describes two endpoints from the ArcGIS REST API that can be called to retrieve data for devices (anordningar) and trails (leder) from the service.

For the complete documentation of this API, please refer to
https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
and
https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm

The API provides two means of filtering of data: attribute based (using the 'where' parameter) or spatial (using the 'geometry' and 'spatialRel' parameters).

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/outdoorlife_api.yaml)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/outdoorlife_api.yaml)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/outdoorlife_api.yaml" height="1000" >}}

## Example usage

The example below calls the two endpoints and filters out some data from "Stora Mosse" national park. The purpose could be to compare the data from service with OpenStreetMap data. When clicking on the features a popup is shown that displays some additional information for the feature.

{{< jsfiddle id="aqmo71s4" color="light" view="result,js,html,css" height="500" >}}

This example uses the attribute based filtering. For an example using spatial filtering see [https://developers.arcgis.com/labs/rest/query-a-feature-layer/](https://developers.arcgis.com/labs/rest/query-a-feature-layer/).