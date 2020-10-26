---
Title: "Natura 2000 sites"
Date: 2020-06-10
Description: "The Swedish sites as part of the Natura 2000 network of protected sites for rare species or habitat types"
Tags: ["sites"]
Draft: false
---

# {{< param Title >}}

The Swedish sites as part of the EU-wide Natura 2000 network of protected sites for rare species or habitat types (e.g. special types of forest or grasslands). The sites can be both terrestrial and marine protected areas.

European Commission on [Natura 2000](https://ec.europa.eu/environment/nature/natura2000/index_en.htm).

## Data quality

No information.

## License & conditions 

{{< license-cc0 >}}

## Data model

To better understand this data, the following model covers the basic parts:

{{< figure src="/n2000model.png" alt="N2000 data model" >}}

* Site - the geographical area being protected 
* Species - rare species in the site causing it to be protected
* Nature types - rare nature types in the site causing it to be protected
* Documents - mainly maintainance plans for the site

## Distributions

The data is made available via a HTTP/REST API.

### REST API

* [Download OpenAPI specification](https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/n2000_api.yaml)
* [Improve this specification](https://github.com/greentechdev/greentechdev.github.io/edit/master/n2000_api.yaml)

{{< swagger-ui url="https://petstore.swagger.io/?url=https://raw.githubusercontent.com/greentechdev/greentechdev.github.io/master/n2000_api.yaml" height="1000" >}}

## Example usage

See the following example for an illustration of how to use the API and data. It's written in JavaScript, so it's easy to try without downloading or installing anything. Click the button _"Try it!"_ below each block of code, or the link _"Edit in JSFiddle"_ in the top right corner of the live example to edit, run and play with them further.

### Chart protected areas for fish

Here we combine the data from the API with general data about regions to visualize the amount of protected area in relation to the total area of each region. To examplify the filtering capabilities, we narrowed down the protected areas to those that contain the species group 'fish'. End result is: 

{{< jsfiddle id="vzb2qear" rev="5" color="light" view="result" height="380" >}}

So in three simple steps:

1) Compile the reference data:

    ```js
    //Region data from https://sv.wikipedia.org/wiki/Sveriges_l%C3%A4n
    //Transformed into json with e.g. https://www.convertcsv.com/csv-to-json.htm
    var regionData = {"Norrbottens län":{"areaKm2":97239},"Västerbottens län":{"areaKm2":54665},"Jämtlands län":{"areaKm2":48935},"Västernorrlands län":{"areaKm2":21549},"Gävleborgs län":{"areaKm2":18118},"Dalarnas län":{"areaKm2":28029},"Uppsala län":{"areaKm2":8190},"Värmlands län":{"areaKm2":17519},"Västmanlands län":{"areaKm2":5118},"Stockholms län":{"areaKm2":6524},"Örebro län":{"areaKm2":8504},"Södermanlands län":{"areaKm2":6075},"Östergötlands län":{"areaKm2":10559},"Jönköpings län":{"areaKm2":10437},"Västra Götalands län":{"areaKm2":23800},"Gotlands län":{"areaKm2":3135},"Kronobergs län":{"areaKm2":8424},"Kalmar län":{"areaKm2":11165},"Hallands län":{"areaKm2":5427},"Blekinge län":{"areaKm2":2931},"Skåne län":{"areaKm2":10968}};
    ```

    find the species group to filter on:

    ```js
    //make a search query for our term NO2
    fetch("https://nvpub.vic-metria.nu/n2000/rest/artgrupper")
      .then(response => response.json())
      .then(data => document.getElementById("results").innerHTML = JSON.stringify(data, null, 2));
    ```
    {{< fiddle printResults="true" displayChart="false" >}}

    in the resultset we take key: "F - Fiskar" for fish
    ```js  
    {
      "typ": {
        "key": "F - Fiskar",
        "value": "F - Fiskar"
      }
    },
    ```

1) Get the protected sites data and transform it into chartable data

    ```js
    //Region data from https://sv.wikipedia.org/wiki/Sveriges_l%C3%A4n
    //Transformed into json with e.g. https://www.convertcsv.com/csv-to-json.htm
    var regionData = {"Norrbottens län":{"areaKm2":97239},"Västerbottens län":{"areaKm2":54665},"Jämtlands län":{"areaKm2":48935},"Västernorrlands län":{"areaKm2":21549},"Gävleborgs län":{"areaKm2":18118},"Dalarnas län":{"areaKm2":28029},"Uppsala län":{"areaKm2":8190},"Värmlands län":{"areaKm2":17519},"Västmanlands län":{"areaKm2":5118},"Stockholms län":{"areaKm2":6524},"Örebro län":{"areaKm2":8504},"Södermanlands län":{"areaKm2":6075},"Östergötlands län":{"areaKm2":10559},"Jönköpings län":{"areaKm2":10437},"Västra Götalands län":{"areaKm2":23800},"Gotlands län":{"areaKm2":3135},"Kronobergs län":{"areaKm2":8424},"Kalmar län":{"areaKm2":11165},"Hallands län":{"areaKm2":5427},"Blekinge län":{"areaKm2":2931},"Skåne län":{"areaKm2":10968}};

    var fancyColours = ["#C48793","#E8ADAA","#ECC5C0","#EDC9AF","#FDD7E4","#FCDFFF","#FFDFDD","#FBBBB9","#FAAFBE","#FAAFBA","#F9A7B0","#E7A1B0","#E799A3","#E38AAE","#F778A1","#E56E94","#F660AB","#FC6C85","#F6358A","#F52887","#E45E9D","#E4287C","#F535AA","#FF00FF","#E3319D"];

    //Call the API to get the data
    //use /nolinks to avoid retrieving data we won't use
    //filter by species group (i.e. "artgrupp")
    fetch("https://nvpub.vic-metria.nu/n2000/rest/omrade/nolinks?artgrupp=F%20-%20Fiskar")
      .then(response => response.json())
      .then(data => {
        data.forEach(function(item) {
          
          //Sum up sites per region
          if (!regionData[item.omrade.lanAsText].protectedSize) {
            regionData[item.omrade.lanAsText].protectedSize = item.omrade.areaHa;
            regionData[item.omrade.lanAsText].protectedCount = 1;
          } else {
            regionData[item.omrade.lanAsText].protectedSize += item.omrade.areaHa;
            regionData[item.omrade.lanAsText].protectedCount += 1;
          }
        });    
      
        //Create dataset for ChartJs display
        //transform protected area from hectares to km2
        //put region area on x-axis, sum of sites area on the y-axis
        //bubble size set to the count of sites within the region 
        var bubbles = [];
        var i = 0;
        for (var key of Object.keys(regionData)) {
          bubbles.push({
            "label": key,
            "backgroundColor": fancyColours[i],
            "data": [{
              "x": regionData[key].areaKm2,
              "y": Math.round(regionData[key].protectedSize/100),
              "r": regionData[key].protectedCount
            }]
          });
          i++;
        }
        document.getElementById("results").innerHTML = JSON.stringify(bubbles, null, 2);
      });
    ```
    {{< fiddle printResults="true" displayChart="false" >}}
    
1) Finally create the bubble chart and populate it with the data prepared

    ```js
    //Region data from https://sv.wikipedia.org/wiki/Sveriges_l%C3%A4n
    //Transformed into json with e.g. https://www.convertcsv.com/csv-to-json.htm
    var regionData = {"Norrbottens län":{"areaKm2":97239},"Västerbottens län":{"areaKm2":54665},"Jämtlands län":{"areaKm2":48935},"Västernorrlands län":{"areaKm2":21549},"Gävleborgs län":{"areaKm2":18118},"Dalarnas län":{"areaKm2":28029},"Uppsala län":{"areaKm2":8190},"Värmlands län":{"areaKm2":17519},"Västmanlands län":{"areaKm2":5118},"Stockholms län":{"areaKm2":6524},"Örebro län":{"areaKm2":8504},"Södermanlands län":{"areaKm2":6075},"Östergötlands län":{"areaKm2":10559},"Jönköpings län":{"areaKm2":10437},"Västra Götalands län":{"areaKm2":23800},"Gotlands län":{"areaKm2":3135},"Kronobergs län":{"areaKm2":8424},"Kalmar län":{"areaKm2":11165},"Hallands län":{"areaKm2":5427},"Blekinge län":{"areaKm2":2931},"Skåne län":{"areaKm2":10968}};

    var fancyColours = ["#C48793","#E8ADAA","#ECC5C0","#EDC9AF","#FDD7E4","#FCDFFF","#FFDFDD","#FBBBB9","#FAAFBE","#FAAFBA","#F9A7B0","#E7A1B0","#E799A3","#E38AAE","#F778A1","#E56E94","#F660AB","#FC6C85","#F6358A","#F52887","#E45E9D","#E4287C","#F535AA","#FF00FF","#E3319D"];

    //Call the API to get the data
    //use /nolinks to avoid retrieving data we won't use
    //increase the limit to make sure we get all sites
    //filter by species group (i.e. "artgrupp")
    fetch("https://nvpub.vic-metria.nu/n2000/rest/omrade/nolinks?limit=1000&artgrupp=F%20-%20Fiskar")
      .then(response => response.json())
      .then(data => {
        data.forEach(function(item) {

          //Sum up sites per region
          if (!regionData[item.omrade.lanAsText].protectedSize) {
            regionData[item.omrade.lanAsText].protectedSize = item.omrade.areaHa;
            regionData[item.omrade.lanAsText].protectedCount = 1;
          } else {
            regionData[item.omrade.lanAsText].protectedSize += item.omrade.areaHa;
            regionData[item.omrade.lanAsText].protectedCount += 1;
          }
        });    
      
        //Create dataset for ChartJs display
        //transform protected area from hectares to km2
        //put region area on x-axis, sum of sites area on the y-axis
        //bubble size set to the count of sites within the region 
        var bubbles = [];
        var i = 0;
        for (var key of Object.keys(regionData)) {
          bubbles.push({
            "label": key,
            "backgroundColor": fancyColours[i],
            "data": [{
              "x": regionData[key].areaKm2,
              "y": Math.round(regionData[key].protectedSize/100),
              "r": regionData[key].protectedCount
            }]
          });
          i++;
        }

        // Create the chart
        new Chart(document.getElementById("myChart"), {
          type: 'bubble',
          data: {
            datasets: bubbles
          },
          options: {
            title: {
              display: true,
              text: 'Protected areas for fish - number of sites and comparison with region area'
            },
            legend: { 
              display: false 
            },
            scales: {
              yAxes: [{ 
                scaleLabel: {
                  display: true,
                  labelString: "Protected area (km²)"
                }
              }],
              xAxes: [{ 
                scaleLabel: {
                  display: true,
                  labelString: "Region area (km²)"
                }
              }]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';
                  if (label) {
                    label += ' (sites: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].r + ", protected area: " + tooltipItem.value + ", region area: " + tooltipItem.label;
                }
                        return label;
                    }
                }
            }
          }
        });
      });
    ```
    {{< fiddle printResults="false" displayChart="true" >}}

    Done!