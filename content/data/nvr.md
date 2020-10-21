---
Title: Naturvårdsregistret, NVR
Date: 2020-10-12
Description: API for data from the official list of protected nature sites in Sweden
Tags: ["API", "GEO"]
Draft: false
---

# NVR

The official list of protected nature sites in Sweden (Naturvårdsregistret, NVR)

... TBD

## License & conditions

The data is licensed under [Creative Commons Zero, CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Our APIs and data are provided "as is" without guarantees concerning potential errors in the data, availability and performance of the API and similar.  We reserve the right to block individual IP addresses or, alternatively, to completely shut down services in the event of obvious abuse.

## Data model

To better understand this data, the following model covers the basic parts:

{{< figure src="/nvrmodel.png" alt="NVR data model" >}}


| Entity  | Endpoint  |
|---|---|
| Site  | /omrade  |
| Environmental objectives  | /miljomal  |
| Regulations  | /foreskriftstyper and /foreskriftssubtyper  |
| Purposes  | /syften  |
| NMD classes  | /nmdklass  |

## Distributions
The OpenApi specification and examples below describe a REST API that exposes the whole data model, but has some limitations in the spatial, e.g. geometries are only available in WKT format and there is no possibility to filter the results spatially. 

However, a subset of this data is exposed through OGC Standard Compliant WMS and WFS services, as well as ArcGIS Server REST API. If your use case requires spatial operations we recommend combining this API with either OGC services or the Esri ArcGIS REST API.

For more information regarding the data and the OGC services, see [this document](https://gpt.vic-metria.nu/data/land/Leder_och_friluftsanordningar_beskrivning_av_oppna_data.pdf) (Swedish)

The WMS service is available at
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv/MapServer/WMSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv/MapServer/WMSServer

The WFS service is available at
* https://nvpub.vic-metria.nu/arcgis/services/Anordningar_friluftsliv_WFS/MapServer/WFSServer
* https://nvpub.vic-metria.nu/arcgis/services/Leder_friluftsliv_WFS/MapServer/WFSServer

The ArcGIS Server REST API is available at
* https://nvpub.vic-metria.nu/arcgis/rest/services/Naturvardsregistret/MapServer
* https://nvpub.vic-metria.nu/arcgis/rest/services/Naturvardsregistret_WFS/MapServer 

See the API [Trails and devices in outdoor life](/data/trails-and-devices-in-outdoor-life) for a description, links and example based on the ArcGIS Server REST API.
  
### REST API

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/nvr_api.yaml)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/nvr_api.yaml)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/nvr_api.yaml" height="1000" >}}

## Example usage

The example below show national parks and when clicking on the features in the map a call is made to the NVR REST API to get information about the national environmental quality objectives.

Geometries for the parks are downloaded from https://gpt.vic-metria.nu/data/land/NP.zip, converted to geojson using QGIS and loaded directly from github for brevity of this example (this could be achieved in code by calling a WFS or ArcGIS REST API service or by utilizing a getFeatureInfo-request on a WMS layer, see *Distributions* for more information.)

{{< jsfiddle id="pj8otq1L" color="light" view="result,js,html,css" height="500" >}}