//Declaring global variables    
var map;
var locationTorrance = {
    lat: 33.840763,
    lng: -118.345413
}
var markers = [];
var id = 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN';
var secret = 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC';
var locations = [{
        id: "40a2ba80f964a5200ef31ee3",
        title: "Amoeba Music",
        location: { lat: 34.09775400505154, lng: -118.32916083276535 },
        address: "6400 W Sunset Blvd"
    },
    {
        id: "4cd5d0e6a5b34688825e9050",
        title: "Marshall Music",
        location: { lat: 33.842546296746306, lng: -118.31940650939941 },
        address: "503 Van Ness Ave"
    },
    {
        id: "4a8f4f4df964a520d61420e3",
        title: "Music Center Plaza",
        location: { lat: 34.05724717903184, lng: -118.24826493859291 },
        address: "135 N Grand Ave"
    },
    {
        id: "4db054515da32cf2df474cbb",
        title: "El Camino College Music Bldg",
        location: { lat: 33.88214104781043, lng: -118.33166081909974 },
        address: "16007 Crenshaw Blvd"
    },
    {
        id: "4ab7a17ef964a520437a20e3",
        title: "Universal Music Group",
        location: { lat: 34.02772170662276, lng: -118.47425842299482 },
        address: "2220 Colorado Ave"
    },
    {
        id: "4f8a33a1e4b0abaa036d61d8",
        title: "Break On Through Music",
        location: { lat: 33.8460531413308, lng: -118.33942880568925 },
        address: "2903 Oregon Ct."
    },
    {
        id: "4b5bbbd5f964a520121329e3",
        title: "Sam Ash Music Store",
        location: { lat: 34.09782849037464, lng: -118.35100307101429 },
        address: "7360 W Sunset Blvd"
    },
    {
        id: "4b69b26ff964a5204eae2be3",
        address: "445 Charles E Young Dr E",
        location: { lat: 34.07106303759325, lng: -118.44027162607146 },
        title: "UCLA Schoenberg Music Building"
    },
    {
        id: "4b5df7ebf964a5209f7629e3",
        title: "Bob Cole Conservatory of Music",
        location: { lat: 33.787280005659326, lng: -118.11114485701484 },
        address: "1250 N Bellflower Blvd"
    },
    {
        id: "4a984658f964a520472b20e3",
        title: "Truetone Music",
        location: { lat: 34.019005879432655, lng: -118.49188776799747 },
        address: "714 Santa Monica Blvd"
    }
];
//Function that send request to foursquare for information about the locations
function apiRequest(lat, lng, th) {
    $.ajax({
        url: "https://api.foursquare.com/v2/venues/search",
        dataType: 'json',
        data: 'limit=50' +
            '&radius = 100' +
            '&ll=' + lat + ',' + lng +
            '&client_id=' + 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN' +
            '&client_secret=' + 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC' +
            '&v=20171101' +
            '&query=music' +
            '&m=foursquare'
            // async: true
    }).done(function(data) {
        th.id = data.response.venues[0].id;
        th.title = data.response.venues[0].name;
        th.address = data.response.venues[0].location.address;
    }).fail(function() {
        alert("There is a problem with your request!");
    });
};
//When you click the marker the function fill the infowindow with information from our data and add an animation to //our pins
function populateInfowindow(that, data) {
    that.htmlContent = '<h3 class="infoTitles">' + data.title + '</h3>' + '<h6 class="infoTitles">' + data.address + '</h6>';
    that.largeInfowindow.setContent(that.htmlContent);
    that.largeInfowindow.open(map, that.marker);
    that.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        that.marker.setAnimation(null);
    }, 1000);
    setTimeout(function() {
        that.largeInfowindow.close();
    }, 1000)
}

//Create new Venue-location and use api request to fetch data
var Venue = function(data) {
    var that = this;
    this.id = data.id;
    this.title = data.title;
    this.lat = data.location.lat;
    this.lng = data.location.lng;
    this.address = data.address;
    this.visible = ko.observable(true);
    //Send request to the Foursquare API
    apiRequest(this.lat, this.lng, that);
    this.htmlContent = '<h3>' + that.title + '</h3>' + '<h6>' + that.address + '</h6>';
    this.largeInfowindow = new google.maps.InfoWindow({ content: this.htmlContent });
    this.marker = new google.maps.Marker({
        map: map,
        position: data.location,
        title: data.title,
        animation: google.maps.Animation.DROP,
    });
    markers.push(this.marker);

    //Check if the markershould be visible - if its not we pass null to the setMap() method and the marker doesn't //show up on the map
    this.markerVisible = ko.computed(function() {
        if (this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);
    //Add event listener to the marker and call a function that create an infowindow
    this.marker.addListener("click", function() {
        populateInfowindow(that, data);
    });
    this.bounce = function(place) {
        google.maps.event.trigger(that.marker, 'click');
    };
};
//Create a viewmodel
function ViewModel() {
    //keep instance of this for the callback functions
    var that = this;
    this.search = ko.observable("");
    this.locationArray = ko.observableArray([]);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: locationTorrance,
        styles: mapStyle,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        fullscreenControl: false,
    });
    locations.forEach(function(location) {
        that.locationArray.push(new Venue(location));
    });
    this.filterArray = ko.computed(function() {
        var filter = that.search().toLowerCase();
        if (!filter) {
            that.locationArray().forEach(function(location) {
                location.visible(true);
            });
            return that.locationArray();
        } else {
            return ko.utils.arrayFilter(that.locationArray(), function(location) {
                var string = location.title.toLowerCase();
                var result = (string.search(filter) >= 0);
                location.visible(result);
                return result;
            });
        }
    }, that);

}

//Adjust the map depends of the position of the markers
function fitMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }

    map.fitBounds(bounds);
}
//Use knockout.js for 2-way data binding
function initMap() {
    ko.applyBindings(new ViewModel());
    fitMarkers();
}

//Add event listener for the EXPLORE button - the code toggle a class that closes and opens the sidebar
var closeSideBar = function() {
    document.getElementById("closeBar").addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(".sidebar").classList.toggle("toggle-bar"); //some array
    });
};
closeSideBar();