//map.js
//Copyright © 2018 Daisy Zheng <dz994@nyu.edu>
//License: Apache License, Version 2.0

var locations = [
  ['Location 1 Name', "Teller Avenue, Park Avenue, Clay Avenue, East 64 Street", 'Location 1 URL'],
  ['Location 2 Name', "1054 Tinton Ave, Bronx, NY 10456", 'Location 2 URL'],
  ['Location 3 Name', "Crotona Avenue, East 181 Street", 'Location 3 URL']
];

var geocoder;
var map;
var bounds;


function initMap() {
  bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(
    document.getElementById("map"), {
      center: new google.maps.LatLng(37.4419, -122.1419),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  geocoder = new google.maps.Geocoder();

  for (i = 0; i < locations.length; i++) {


    geocodeAddress(locations, i);
  }
}

function geocodeAddress(locations, i) {
  var title = locations[i][0];
  var address = locations[i][1];
  var url = locations[i][2];
  geocoder.geocode({
      'address': locations[i][1]
    },

    function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
          map: map,
          position: results[0].geometry.location,
          title: title,
          animation: google.maps.Animation.DROP,
          address: address,
          url: url
        })
        infoWindow(marker, map, title, address, url);
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
      } else {
        alert("geocode of " + address + " failed:" + status);
      }
    });
}

function infoWindow(marker, map, title, address, url) {
  google.maps.event.addListener(marker, 'click', function() {
    var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
    iw = new google.maps.InfoWindow({
      content: html,
      maxWidth: 350
    });
    iw.open(map, marker);
  });
}

function createMarker(results) {
  var marker = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
    map: map,
    position: results[0].geometry.location,
    title: title,
    animation: google.maps.Animation.DROP,
    address: address,
    url: url
  })
  bounds.extend(marker.getPosition());
  map.fitBounds(bounds);
  infoWindow(marker, map, title, address, url);
  return marker;
}


//
//   var geocoder;
//   var map;
//   var addresses = [
//     "Teller Avenue, Park Avenue, Clay Avenue, East 64 Street",
//     "Tinton Avenue, East 165 Street, Union Avenue, East 166 Street",
//     "Crotona Avenue, East 181 Street",
//     "East 156 Street, Forest Avenue",
//     "3 Avenue, East 144 Street, East 146 Street"
// ];
//   var address = "san jose";
//   function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 8,
//       center: {lat: -34.397, lng: 150.644}
//     });
//     geocoder = new google.maps.Geocoder();
//     codeAddress(geocoder, map);
//   }
//
//   function codeAddress(geocoder, map) {
//     geocoder.geocode({'address': address}, function(results, status) {
//       if (status === 'OK') {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//     geocoder.geocode({'address': address}, function(results, status) {
//       if (status === 'OK') {
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   }
