var layers = {
  inbound: new L.LayerGroup(),
  outbound: new L.LayerGroup()
};

// Create our initial map object
var myMap = L.map("migrationmapid", {
    center: [38.5003668,-99.5509956],
    zoom: 5,
    layers: [
      layers.inbound,
      layers.outbound,
    ]
  });


// Add a tile layer to map (background map image)
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/light-v9',
    accessToken: API_KEY
}).addTo(myMap);

// Style object
var mapStyleIn = {
  color: "black",
  fillColor: "blue",
  fillOpacity: 0.5,
  weight: 1.5
};

var mapStyleOut = {
  color: "black",
  fillColor: "red",
  fillOpacity: 0.5,
  weight: 1.5
};

// Map legend
var legend = L.control({ position: "bottomright"});
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Magnitude</h4>"
    div.innerHTML += '<i style="background: #00ff00"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: #ccff66"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #ffcc66"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #ffcc00"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #ff9900"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #ff3300"></i><span>90+</span><br>';

    return div;
};
legend.addTo(myMap)

///////////////////////////////////////////////////////////////////
// Keep Keep Keep
// Need to get state boundaries. Read from JSON (GeoJSON better),
// then combine into one interactive visualization.
// Load dataset first, then load boundary data
/*
d3.json(url_1).then(data => {
  d3.json(states_url).then(states_data =>{
    states_data.forEach(d => {
      d.extra = data.features.map(x => x.name=d.name)
    });

  });

});
*/
///////////////////////////////////////////////////////////////////

stateBoundaries = "https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/5m/2019/state.json";
migCsv = "../Data/Justin/top5_in_out.csv"



var overlays = {
  "Inbound Migration": layers.inbound,
  "Outbound Migration": layers.outbound,
}
L.control.layers(null, overlays).addTo(myMap)


/////////// Ex from k

///////// Test for matching ex from k
d3.json(stateBoundaries, function(boundaries) {
  console.log(boundaries)
  var stateFeature = boundaries.features
  // console.log(stateFeature)
  //// CSV dataset////
  d3.csv(migCsv, function(migData) {
    // Iterate through boundary data
    console.log(migData)
    top5In = migData.filter(m => m.indicator==="in")
    top5Out = migData.filter(m => m.indicator==="out")
    console.log(top5In)
    console.log(top5Out)
    top5In.forEach(element => {
      var filteredStates = stateFeature.filter(d => d.properties["NAME"]===element.state)
      console.log(filteredStates)
      L.geoJSON(filteredStates, {
        style: mapStyleIn,
      }).addTo(layers["inbound"]);})
    top5Out.forEach(element => {
        var filteredStates = stateFeature.filter(d => d.properties["NAME"]===element.state)
        console.log(filteredStates)
        L.geoJSON(filteredStates, {
          style: mapStyleOut,
        }).addTo(layers['outbound']);
    })
  


    
    // boundaries.features.forEach(d => {
    //   var extra = boundaries.features.properties.map(x => x.name=d.name)
    //   console.log(d)
    })
    
      
  // }).addTo(myMap)
      // Store as list of dictionaries, then .forEach add to map
      // var stateName = boundaries.features.properties.stateName
      // var bBox = boundaries.features
});
///////// Test for matching ex from k




//////////////////// KEEP: Shows pins on map
//// Boundary////
/*
d3.json(stateBoundaries, function(boundaries) {

  //// CSV dataset////
  d3.csv(migCsv, function(migData) {
    console.log(migData)
    // Iterate through boundary data
    cities.forEach(d => {
      var thisMarker = L.marker(d.location, {
        title: "This is " + d.name
      }).addTo(myMap)
      // Store as list of dictionaries, then .forEach add to map
      // var stateName = boundaries.features.properties.stateName
      // var bBox = boundaries.features
    })
  })
})
*/
//////////////////// Shows pins on map


// L.geoJson(data, {style: style}).addTo(map);


////////////////////////////////////////////////////
/*/* D3 using geoJson layer /*/
// d3.json(link, function(data) {
//     // Creating a geoJSON layer with the retrieved data
//     L.geoJson(data, {
//       // Passing in our style object
//       style: mapStyle
//     }).addTo(myMap);
//   });
/////////////////////////////////////////////////////
