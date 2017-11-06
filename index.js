//Declaring global variables    
var map;
var markers = [];
var currentLocation = {
    lat: 33.840763,
    lng: -118.345413
}
var id = 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN';
var secret = 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC';
var locations = []

//Ajax request to the Foursquare API
$.ajax({
    url: "https://api.foursquare.com/v2/venues/search",
    dataType: 'json',
    data: 'limit=50' +
        '&radius = 100' +
        '&ll=' + currentLocation.lat + ',' + currentLocation.lng +
        '&client_id=' + 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN' +
        '&client_secret=' + 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC' +
        '&v=20171101' +
        '&query=music' +
        '&m=foursquare',
    async: true,
    success: function(data) {
        for (var i = 0; i < data.response.venues.length; i++) {
            //Create array of objects from the reponse
            locations.push({ id: data.response.venues[i].id, title: data.response.venues[i].name, location: { lat: data.response.venues[i].location.lat, lng: data.response.venues[i].location.lng }, address: data.response.venues[i].location.address });
        }
        //Call the map function
        initMap();
        //Apply bindings using Knockout
        ko.applyBindings(locations);

    }

});



//Create Google map
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 33.840763,
            lng: -118.345413
        },
        zoom: 13,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        fullscreenControl: false,
        //Styling google maps
        styles: mapStyle
    });


    //Create info window for every marker
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        markers.push(marker);
        marker.addListener("click", function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

//Display the markers and the info windows on the map
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
        });
    }
}

//Toggle sidebar menu function
var closeSideBar = function() {
    document.getElementById("closeBar").addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".sidebar").classList.toggle("toggle-bar");
    });
};
closeSideBar();