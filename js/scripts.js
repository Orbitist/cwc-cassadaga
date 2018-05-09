mapboxgl.accessToken = 'pk.eyJ1IjoiY2hxd2MiLCJhIjoiY2pkamJ1aXdyMWlrNjJ3bjlibzZhbjQ0aCJ9.2TTcJmqyGXtbzjQEl3OWwg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chqwc/cjgyj4bui000c2ss9bjo6ve7z',
    center: [-79.3163256, 42.3565894],
    zoom: 16,
    minZoom: 10
});

map.on('load', function () {

  map.addLayer({
    "id": "Illustration",
    "type": "raster",
    "source": {
      type: 'raster',
      url: 'mapbox://chqwc.3xel4wos'
    }
  });

  map.addLayer({
    "id": "Panoramas",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                    "content": "",
                    "icon": "theatre"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-79.316538, 42.354815]
                }
              }
            ]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true
    }
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', 'Panoramas', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var content = e.features[0].properties.content;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'Panoramas', function () {
      map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Panoramas', function () {
      map.getCanvas().style.cursor = '';
  });

});


// Contol the menu
var toggleableLayerIds = [ 'Illustration', 'Panoramas' ];

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
