---
Title: National Protected Sites Registry (Naturvårdsregistret, NVR)
Date: 2020-10-12
Description:
Tags: ["API", "GEO"]
Draft: false
---

# NVR

... TBD NAPS?

## License & conditions

The data is licensed under [Creative Commons Zero, CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Our APIs and data are provided "as is" without guarantees concerning potential errors in the data, availability and performance of the API and similar.  We reserve the right to block individual IP addresses or, alternatively, to completely shut down services in the event of obvious abuse.

## Data model

TBD

omraden - beslutsdokument - miljomal* - foreskriftstyper* - foreskriftssubtyper* - foreskriftsomrade - nmdklass* - syfte - syften*

* = code list

Difference 
​/nmdklass​/{nvrId}​/{beslutsstatus}​/{nmdKlassKod} and /omrade/{id}/{beslutsstatus}/nmdklasser?

## Distributions

Parts of this data (e.g. the "sites" part of the data model) is also exposed though OGC Standard Compliant WMS and WFS services as well as ArcGIS Server REST API.

For more information regarding the OGC services, see [this document](https://gpt.vic-metria.nu/data/land/Leder_och_friluftsanordningar_beskrivning_av_oppna_data.pdf) (Swedish, TBD)

The WMS service is available at
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv/MapServer/WMSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv/MapServer/WMSServer

The WFS service is available at
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv_WFS/MapServer/WFSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv_WFS/MapServer/WFSServer

ArcGIS Server REST API
* TBD
  
### REST API

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/nvr_api.json)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/nvr_api.json)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/nvr_api.json" height="1000" >}}

## Example usage

TBD

{{< jsfiddle id="pj8otq1L" color="light" view="result" height="380" >}}