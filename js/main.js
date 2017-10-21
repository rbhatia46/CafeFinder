var map;
var infoWindow;
var request;
var service;
var markers=[];
    function initializeMap(){
      var center = new google.maps.LatLng(22.7196,75.8577);
      var mapOptions = {
        center:center,
        zoom:13,
        mapTypeControl:false
      };
      map = new google.maps.Map(document.getElementById('map'),mapOptions);
       request = {
        location:center,
        radius:8000,
        types:['cafe']
      };

      infoWindow = new google.maps.InfoWindow();



       service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request,callback);

      google.maps.event.addListener(map,'dblclick',function(event){
        clearResults(markers);
        map.setCenter(event.LatLng)
          request = {
          location:event.LatLng,
          radius:8000,
          types:['cafe']
        };
        service.nearbySearch(request,callback);
      })

    }

    function callback(results,status){
      if(status==google.maps.places.PlacesServiceStatus.OK){
        for(var i=0;i<results.length;i++){
          createMarker(results[i]);
        }
      }
    }


    function createMarker(place){
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map:map,
        position:place.geometry.location
      });

      google.maps.event.addListener(marker,'click',function(){
        infoWindow.setContent(place.name);

        infoWindow.open(map,this);
      });
      return marker;

    }


  google.maps.event.addDomListener(window,'load',initializeMap);
