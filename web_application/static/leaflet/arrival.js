//Machine Learning Project - Delay Map by Arrival Airport

//Link to geojson with airport and delay data
var airport_url = "https://dlkennen.github.io/p3/arr_airport.geojson"

//GET request to the url
d3.json(airport_url).then(function(data) {
    createFeatures(data.features);
});

//Function to create map and circle markers
function createFeatures(airportData) {
    function onEachFeature (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.Arr_Airport +
        "</h3><hr><p>" + feature.properties.arr_city_name + "</p>"
        + "<hr><p>" + "Mean Flight Delay:" + Math.round(feature.properties.mean_arr_delay) + "</p>" )
    };

    function scaleSize(x, a, b, min, max){
        var fontSize = ((((b - a) * (x - min)) / (max - min)) + a)*.5;
        return Math.round(fontSize);
    }
    var airports = L.geoJSON(airportData, {
        pointToLayer: function(feature) {
            var latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
            return new L.CircleMarker(latlng, {
              restyle});
        },
        style: restyle,
        onEachFeature: onEachFeature});
    
    createMap(airports);
    
    //Styling the size and color of the circle markers
    function restyle(feature) {
        var size1 = scaleSize(feature.properties.mean_arr_delay, 5, 40, -19, 54);
        if (feature.properties.mean_arr_delay <= 5)
            {return {color: "SkyBlue", radius: [size1]};
        }else if (feature.properties.mean_arr_delay < 20)
            {return {color: "SlateBlue", radius: [size1]};
        }else if (feature.properties.mean_arr_delay < 40)
            {return {color: "Blue", radius: [size1]};
        }else if (feature.properties.mean_arr_delay < 60)
            {return {color: "DarkSlateBlue", radius: [size1]};
        }else {
            return {color: "MidnightBlue", radius: [size1]};
            };
        };

    };

//Creating the map
function createMap(airports) {
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });
    
    var baseMaps = {
        "Light Map": light
    };
    
    var overlayMaps = {
        Airports: airports
    };

    var myMap = L.map("map", {
        center: [
          40, -92
        ],
        zoom: 4,
        layers: [light, airports]
      });
    
    L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(myMap);

    //Creating the color based legend
    var legend = L.control({position: 'bottomright'})
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ["SkyBlue", "SlateBlue", "Blue", "DarkSlateBlue", "MidnightBlue"]
        var labels = []
        var values = ["0-5 min", "6-19 min", "20-39 min", "40-59 min", "60+ min"];
    
        // Add legend title
        var legendInfo = "<h2>Average Flight Delay <hr> by Arrival Airport</h2>"
        div.innerHTML = legendInfo;
    
        for (var i=0; i < 5; i++) {         
            labels.push(`<p> 
            <p style="background-color:${colors[i]}; height: 10px; width: 10px; display: inline; padding: 5px 10px"></p>
            &nbsp; <span>${values[i]}</span> 
            </p> 
            `)
        };

        div.innerHTML += "<div>" + labels.join("") + "</div>";
        return div;
      };
    
    // Adding legend to the map
    legend.addTo(myMap);
    
};