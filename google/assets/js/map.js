var googleURL = "https://maps.googleapis.com/maps/api/js?key=";
var map;
var latitude;
var longitude;
var userLatLng;
var locations = [];

locations = res.businesses.slice();

// Get location using HTML5
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            showMapPosition();
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Show user's home location on map
function showMapPosition() {
    $.ajax({
        url: googleURL,
        method: "GET",
        dataType: "jsonp"
    }).then(function () {
        userLatLng = new google.maps.LatLng(latitude, longitude);

        var myOptions = {
            zoom: 15,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), myOptions);
        var contentString = "Current Location";

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: userLatLng,
            map: map,
            title: "Current Location",
            icon: "http://maps.google.com/mapfiles/kml/paddle/blu-stars.png"
        });
        marker.addListener("click", function () {
            infowindow.open(map, marker);
        });

        showChoicePosition();
    });
}

function showChoicePosition() {
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        //position: 
        //map: map,
        //title: "restaraunt name"
        //icon: "http://maps.google.com/mapfiles/kml/shapes/dining.png"
    });

    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });
}

getLocation();