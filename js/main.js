var map;
var infoWindow;
var request;
var service;
var autocomplete;
var markers = [];

function init() {
  initializeMap();
  initializeAutoComplete();
};

function initializeMap() {
  var center = new google.maps.LatLng(22.7196, 75.8577);
  var mapOptions = {
    center: center,
    zoom: 13,
    mapTypeControl:false
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  request = {
    location: center,
    radius: 8000,
    types:['cafe']
  };

  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, 'dblclick', function(event) {
    moveToNewLocation(event.latLng);
  });
};

function moveToNewLocation(location) {
  clearMarkers();
  map.setCenter(location);
  var newRequest = {
    location: location,
    radius: 8000,
    types:['cafe']
  };

  service.nearbySearch(newRequest, callback);
};

function initializeAutoComplete() {
  var locationFilter = document.querySelector('.location-filter');
  autocomplete = new google.maps.places.Autocomplete(locationFilter);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    moveToNewLocation(autocomplete.getPlace().geometry.location);
  });

  document.querySelector('.location-filter-btn').addEventListener('click', function() {
    moveToNewLocation(autocomplete.getPlace().geometry.location);
  });
};

function callback(results,status){
  if(status === google.maps.places.PlacesServiceStatus.OK){
    for(var i=0;i<results.length;i++){
      createMarker(results[i]);
    }
  }
};

function clearMarkers() {
  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
};

function createMarker(place){
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position:place.geometry.location
  });

  google.maps.event.addListener(marker,'click',function(){
    infoWindow.setContent(place.name);

    infoWindow.open(map,this);
  });
  return marker;
};
