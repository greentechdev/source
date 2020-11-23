---
Title: "Air quality measurements"
Description: "Near real-time national air quality data from measuring stations - the air quality data provides information on the levels of various air pollutants, including particles, nitrogen dioxide and ground-level ozone, in Swedish cities and in rural areas."
Tags: ["air","geo"]
Draft: false
---

# Air quality measurements

Near real-time national air quality data from measuring stations - the air quality data provides information on the levels of various air pollutants, including particles, nitrogen dioxide and ground-level ozone, in Swedish cities and in rural areas. The data is made available via a HTTP/REST API with various usage examples.

The data is provided in cooperation with [SMHI](https://smhi.se).

See [Luftkvaliteten i realtid och preliminär statistik](https://www.naturvardsverket.se/Sa-mar-miljon/Klimat-och-luft/Statistik-om-luft/Luftkvaliteten-i-realtid/) for more information (Swedish).

## Data quality

No information.

## License & conditions 

{{< license-cc0 >}}

## Data model

The data is based on the [Observations & Measurements](https://en.wikipedia.org/wiki/Observations_and_Measurements) model, and was originally made available via a [Sensor Observation Service (SOS)](https://en.wikipedia.org/wiki/Sensor_Observation_Service). The central terms to be aware of are therefore:

{{< figure src="/airqualitymodel.png" alt="Air quality model" >}}

* Feature of interest (station) - the geographical location where measured
* Phenomenon - the thing measured, e.g. the gas NO2
* Procedure - metadata about the sensor or process the generates the data
* Offering - categories of data offered by the service, e.g. satellite or station observations

## Distributions

The data is made available via a HTTP/REST API.

### REST API

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/air_quality_api.yaml)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/air_quality_api.yaml)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/air_quality_api.yaml" height="1000" >}}

## Example usage

See the following example for an illustration of how to use the API and data. It's written in JavaScript, so it's easy to try without downloading or installing anything. Click the button _"Try it!"_ below each block of code, or the link _"Edit in JSFiddle"_ in the top right corner of the live example to edit, run and play with them further.

### Chart last 24h of NO2 at Hornsgatan

Say we're looking to chart the levels of NO2 (nitrogen dioxide) at Hornsgatan, Stockholm for the last 24 hours and compare it to the the threshold value from the [environmental quality standards](https://www.naturvardsverket.se/Stod-i-miljoarbetet/Vagledningar/Luft-och-klimat/Miljokvalitetsnormer-for-utomhusluft/Gransvarden-malvarden-utvarderingstrosklar/). Something like

{{< jsfiddle id="0dax5c3L" color="light" view="result" height="380" >}}

So in three simple steps:

1) Using the Search-resource to find the NO2 phenomenon:

    ```js
    //make a search query for our term NO2
    fetch("https://datavardluft.smhi.se/52North/api/v1/search?q=NO2")
      .then(response => response.json())
      .then(data => document.getElementById("results").innerHTML = JSON.stringify(data, null, 2));
    ```
    {{< fiddle printResults="true" displayChart="false" >}}

    in the resultset we have a match - the NO2 phenomenon has the ID = 8  
    ```js  
    {
      "id": "8",
      "label": "NO2",
      "href": "./phenomena/8",
      "type": "phenomenon"
    }
    ```

1) Using the Station-resource to find a station monitoring our phenomena close to Hornsgatan


    ```js
    //URL to find stations filtered by our phenomenon ID 
    var url = "https://datavardluft.smhi.se/52North/api/v1/stations/?phenomena=8";
    
    //Using the "near"-parameter in the API to filter the list of stations by closeness to a point on a map we pick 
    var nearFilter = {
        "center": {
          "type": "Point",
          "coordinates": [18.0486603472042, 59.3172224331124] //Lon-Lat for a point close to Hornsgatan (easy to get from Google maps or similar)
        },
        "radius": 1 //search radius in kilometers
      }

    //Prepare the parameter for use in the URL
    nearFilter = encodeURIComponent(JSON.stringify(nearFilter));

    //Append our near filter to the URL   
    url += "&near=" + nearFilter;
    
    //Fetch the filtered list of stations
    fetch(url)
      .then(response => response.json())
      .then(data => document.getElementById("results").innerHTML = JSON.stringify(data, null, 2));
    ```
    {{< fiddle printResults="true" displayChart="false" >}}
    
    in the resultset we pick this station:

    ```js
    {
      "type": "Feature",
      "id": "115",
      "properties": {
        "id": "115",
        "label": "Stockholm Hornsgatan 108 Gata - 115"
      }
      ...
    }
    ```
1) Using the Timeseries-resource to get our measurment data
    ```js
    //With our phenomenon- and station ID - see what timeseries there are  
    fetch("https://datavardluft.smhi.se/52North/api/v1/timeseries/?phenomena=8&station=115")
      .then(response => response.json())
      .then(data => document.getElementById("results").innerHTML = JSON.stringify(data, null, 2));
    ```
    {{< fiddle printResults="true" displayChart="false" >}}
    
    There is one such item - with ID = 59:
    ```js
    {
    "id": "59",
    "label": "NO2 SPP-SE0003A_00008_100_100, Stockholm Hornsgatan 108 Gata - 115, SPP-SE0003A_00008_100_100",
    "uom": "µg/m3",
    ...
    ```
    Now let's get the data for this timeseries (ID = 59) and plot it on a chart. We'll use the "timespan"-parameter to limit the results to a day back from now. This example uses the ChartJS-library.

    ```js
    //Create from and to-dates for the "timespan" API-parameter
    var toDate = new Date();
    var fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 1);

    //Create URL for our timeseries and with the create timespan dates
    var url = "https://datavardluft.smhi.se/52North/api/v1/timeseries/59/getData?timespan=" + fromDate.toISOString() + "/" + toDate.toISOString();

    //Get the data
    fetch(url)
      .then(response => response.json())
      .then(data => {

        //Split timestamp and values into separate arrays to match the chart input
        var labels = []
        var values = [];
        data.values.forEach(function(item) {
          labels.push(new Date(item.timestamp).toLocaleTimeString([], {
            timeStyle: 'short'
          }));
          values.push(parseFloat(item.value));
        });

        //Create threshold data series for comparison, it only needs a start and end value. Source:
        // https://www.naturvardsverket.se/Stod-i-miljoarbetet/Vagledningar/Luft-och-klimat/Miljokvalitetsnormer-for-utomhusluft/Gransvarden-malvarden-utvarderingstrosklar/
        var thresholdHourValue = 90;
        var thresholdHourValues = new Array(values.length - 1);
        thresholdHourValues[0] = thresholdHourValue;
        thresholdHourValues[values.length - 1] = thresholdHourValue;
        var thresholdDayValue = 60;
        var thresholdDayValues = new Array(values.length - 1);
        thresholdDayValues[0] = thresholdDayValue;
        thresholdDayValues[values.length - 1] = thresholdDayValue;

        // Create the chart.js data structure using the labels, values and thresholdValues just created
        var chartData = {
          labels: labels,
          datasets: [{
              label: "NO2",
              data: values,
              borderColor: "#61affe",
              backgroundColor: "rgba(97,175,254,.2)"            },
            {
              label: "Hourly threshold value (90 µg/m3)",
              data: thresholdHourValues,
              fill: '+1',
              spanGaps: true,
              borderColor: "#E8A482",
              backgroundColor: "rgba(232, 164, 130, 0.2)"
            },
            {
              label: "Daily threshold value (60 µg/m3)",
              data: thresholdDayValues,
              fill: false,
              spanGaps: true
            }
          ]
        };

        //Get the context of the canvas element we want to draw the chart on
        var ctx = document.getElementById("myChart").getContext("2d");

        // Instantiate the chart
        var mychart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: {
            title: {
              display: true,
              text: 'Stockholm, Hornsgatan 108, ' + fromDate.toLocaleString() + ' - ' + toDate.toLocaleString(),
            },
            tooltips: {
              enabled: true,
            }
          }
        });
      });


    ```
    {{< fiddle printResults="false" displayChart="true" >}}

    Done!
