    var map;
    var markers = [];
    var myLocation = {
        lat: 33.840763,
        lng: -118.345413
    }
    var id = 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN';
    var secret = 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC';
    var locs = []
    $.ajax({
        url: "https://api.foursquare.com/v2/venues/search",
        dataType: 'json',
        data: 'll=' + myLocation.lat + ',' + myLocation.lng +
            '&client_id=' + 'JUJC3IUTWGW2ZNGTETECIJKDYPHLFANSWNS4AHU2CCWZQFXN' +
            '&client_secret=' + 'CBBJUWHNQ0D4RV13I5255DVD335PSAM2I5WCQSRGJ5KHZFMC' +
            '&v=20171101' +
            '&query=food' +
            '&m=foursquare',
        async: true,
        success: function(data) {
            for (var i = 0; i < data.response.venues.length; i++) {
                locs.push({ title: data.response.venues[i].name, location: { lat: data.response.venues[i].location.lat, lng: data.response.venues[i].location.lng } })
            }
            initMap();
            ko.applyBindings({ locs });
        }
    });
    var locations = [{
        title: "24 Hours Fitness",
        location: {
            lat: 33.791779,
            lng: -118.332360
        }
    }, {
        title: "Big 5 Sporting Goods",
        location: {
            lat: 33.793426,
            lng: -118.333777
        }
    }, {
        title: "Islands Restaurant",
        location: {
            lat: 33.792181,
            lng: -118.330380
        }
    }, {
        title: "Tilly's",
        location: {
            lat: 33.791987,
            lng: -118.330823
        }
    }, {
        title: "Whole Foods Market",
        location: {
            lat: 33.792306,
            lng: -118.331187
        }
    }, {
        title: "Mimi's Cafe",
        location: {
            lat: 33.793902,
            lng: -118.331010
        }
    }, {
        title: "The Coffee Bean & Tea Leaf",
        location: {
            lat: 33.793406,
            lng: -118.331630
        }
    }, {
        title: "Trader Joe's",
        location: {
            lat: 33.790641,
            lng: -118.330191
        }
    }, {
        title: "Veggie Grill",
        location: {
            lat: 33.791197,
            lng: -118.328998
        }
    }, {
        title: "Mercedes-Benz of South Bay",
        location: {
            lat: 33.801039,
            lng: -118.343252
        }
    }, {
        title: "Vons",
        location: {
            lat: 33.805180,
            lng: -118.330549
        }
    }, {
        title: "Del Amo Fashion Center",
        location: {
            lat: 33.830766,
            lng: -118.349413
        }
    }, {
        title: "SEPHORA",
        location: {
            lat: 33.828587,
            lng: -118.350065
        }
    }, {
        title: "Griffith Adult Center",
        location: {
            lat: 33.825852,
            lng: -118.320962
        }
    }, {
        title: "South Bay Galleria",
        location: {
            lat: 33.871275,
            lng: -118.355042
        }
    }, {
        title: "UFC GYM",
        location: {
            lat: 33.850804,
            lng: -118.352378
        }
    }];

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
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8ec3b9"
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1a3646"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#64779e"
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#4b6878"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#334e87"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#283d6a"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#6f9ba5"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#023e58"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#3C7680"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#304a7d"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2c6675"
                }, {
                    "weight": 3
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#4072a5"
                }, {
                    "weight": 2.5
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "weight": 0.5
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#b0d5ce"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#023e58"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#98a5be"
                }]
            }, {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#1d2c4d"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#283d6a"
                }]
            }, {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#3a4762"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#0e1626"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#4e6d70"
                }]
            }]
        });



        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < locs.length; i++) {
            var position = locs[i].location;
            var title = locs[i].title;
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