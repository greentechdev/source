---
Title: "Environmental indicators"
Date: 2020-05-23
Description: "Indicators and data related to the national environmental objectives (e.g. fresh air)"
Tags: ["indicator"]
Draft: false
---

# Environmental indicators

Indicators and data related to the national environmental objectives (e.g. fresh air), for more informartion see [The environmental objectives system](http://www.sverigesmiljomal.se/environmental-objectives/).

The production of the indicators is a joint effort by eight government agencies and the counties.

## Data quality

No information.  

## License & conditions 

{{< license-cc0 >}}

## Data model

To better understand this data, the following model covers the basic parts

{{< figure src="/indicatormodel.png" alt="Indicator model" >}}

* Indicator - the main information item describing a particular indicator
* Objective - environmental objective the indicator is used to track the state of
* Dataset - grouping of data used for tracking the state of the different phenomena monitored
* Presentationvariable - the dataset's data is split into these
* Presentation - A selection of data combined with textual descriptions to present the state of a phenomena monitored
* Location - geographical coverage of the data and textual descriptions

## Distributions

The data is made available via a HTTP/REST API.

### REST API

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/environmental_indicators_api.yaml)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/environmental_indicators_api.yaml)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/environmental_indicators_api.yaml" height="1000" >}}

## Example usage

Currently the API does not support CORS (to be corrected). Meanwhile no browser demo of example usage is available.
