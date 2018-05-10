mapboxgl.accessToken = 'pk.eyJ1IjoiY2hxd2MiLCJhIjoiY2pkamJ1aXdyMWlrNjJ3bjlibzZhbjQ0aCJ9.2TTcJmqyGXtbzjQEl3OWwg';

var bounds = [
    [-79.758283, 42.000271], // Southwest coordinates
    [-78.803060, 42.664566]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chqwc/cjgyj4bui000c2ss9bjo6ve7z',
    center: [-79.3163256, 42.3565894],
    zoom: 16,
    minZoom: 10,
    maxBounds: bounds
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

  map.addLayer({
    "id": "Toggle Illustration",
    "type": "raster",
    "source": {
      type: 'raster',
      url: 'mapbox://chqwc.3xel4wos'
    }
  });

  var geojson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
              "content": "<iframe allowfullscreen='true' scrolling='no' src='panoramas/mud_lake.html' style='border:0;'></iframe>"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-79.316538, 42.354815]
          }
        },
        {
          "type": "Feature",
          "properties": {
              "content": "<iframe allowfullscreen='true' scrolling='no' src='panoramas/center_park.html' style='border:0;'></iframe>"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-79.317029, 42.357098]
          }
        },
        {
          "type": "Feature",
          "properties": {
              "content": "<iframe allowfullscreen='true' scrolling='no' src='panoramas/walden.html' style='border:0;'></iframe>"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [-79.318294, 42.357827]
          }
        }
      ]
    };



  // add markers to map
  geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML(marker.properties.content))
    .addTo(map);
  });

});


// Contol the menu
var toggleableLayerIds = [ 'Toggle Illustration' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
