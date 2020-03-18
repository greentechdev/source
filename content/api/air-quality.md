---
title: Air quality
weight: 10
categories:
- API
- Air
date: "2019-02-14"
tags:
- Pollution
- Air quality
---

# Air quality

The air quality data provides information on levels of various air pollutants, including particles, nitrogen dioxide and ground-level ozone, in Swedish cities and in rural areas. The data is provided in cooperation with [SMHI](https://smhi.se).

See [Luftkvaliteten i realtid och preliminär statistik](https://www.naturvardsverket.se/Sa-mar-miljon/Klimat-och-luft/Statistik-om-luft/Luftkvaliteten-i-realtid/) for more information (Swedish).

## License & conditions 

The data is licensed under [Creative Commons Zero, CC0](https://creativecommons.org/publicdomain/zero/1.0/).

Our APIs and data are provided "as is" without guarantees concerning potential errors in the data, availability and performance of the API and similar.  We reserve the right to block individual IP addresses or, alternatively, to completely shut down services in the event of obvious abuse.

## Data model

The data is based on the [Observations & Measurements](https://en.wikipedia.org/wiki/Observations_and_Measurements) model, and is made available via a [Sensor Observation Service (SOS)](https://en.wikipedia.org/wiki/Sensor_Observation_Service). The central terms to be aware of are therefore:

{{< figure src="/obsmea.png" alt="Useful terms" >}}

* Feature of interest (station) - the geographical location where measured
* Phenomenon - the thing measured, e.g. the gas NO2
* Procedure - metadata about the sensor or process the generates the data
* Offering - categories of data offered by the service, e.g. satellite or station observations

## Distributions

The data is made available through a HTTP/REST API.

### REST API

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/mitch99/docs/master/airquality.json" height="1000" >}}

## Example usage

As a basic illustration of using the API and data, see the following code example for displaying the last months of NOx (phenomenon) measured at Hornsgatan (feature of interest) in a basic chart.

Use the link "Edit in JSFiddle" in the top right corner of the example to start customising the example and explore further. 

### Chart for NOx measured at Hornsgatan

{{< jsfiddle id="rfep6gmn" rev="4" color="dark" view="result,js,html,css" height="600" >}}
