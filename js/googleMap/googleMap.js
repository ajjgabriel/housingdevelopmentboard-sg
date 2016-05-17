// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

function initialize() {


  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	zoom: 11
  });
  
  //Add transit layer
  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  
  // Create the legend and display on the map
  var legendDiv = document.createElement('DIV');
  var legend = new Legend(legendDiv, map);
  legendDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);

  map.setCenter( new google.maps.LatLng(1.352083, 103.81983600000001), 13);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      /*var image = {
        url: "images/Home.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      };*/

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        //icon: image,
        title: place.name,
        position: place.geometry.location
      });

     // markers.push(marker);
  
		drawArea(map, place.geometry.location);
      bounds.extend(place.geometry.location);
    }

  });
  // [END region_getplaces]
	
	
	
  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
  
  
  
}

function Legend(controlDiv, map) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '1px';
  controlUI.title = 'Legend';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control text
  var controlText = document.createElement('DIV');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  
  // Add the text
  controlText.innerHTML = '<b>Distance</b><br />' +
  	'1KM Radius (Inner Circle)<br />' +
  	'2KM Radius (Outer Circle)<br />';
  controlUI.appendChild(controlText);
}

function drawArea(map, latlon){
	  //Add Circle
  	// First, create an object containing LatLng and population for each city.
	var citymap = {};
	citymap['HDBGrant'] = {
	  center: latlon,
	  distance: 1,
	  scEligibleVacancy: 38,
	  sprEligibleVacancy: 3,
	  fillColor: '#1aa3ff'
	};
	citymap['School'] = {
	  center: latlon,
	  distance: 2,
	  scEligibleVacancy: 10,
	  sprEligibleVacancy: 1,
	  fillColor: '#66c2ff'
	};
	
	/*
	citymap['losangeles'] = {
	  center: new google.maps.LatLng(34.052234, -118.243684),
	  distance: 0
	};*/


  for (var city in citymap) {
    var populationOptions = {
      strokeColor: citymap[city].fillColor,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: citymap[city].fillColor,
      fillOpacity: 0.15,
      map: map,
      center: citymap[city].center,
      radius: citymap[city].distance * 1000
    };
    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(populationOptions);
  }
}



google.maps.event.addDomListener(window, 'load', initialize);