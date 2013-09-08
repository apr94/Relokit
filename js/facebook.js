 var markersArray = [];
 var string_address;
 var religion_keyword;
 var relationship_keyword;
 var hasreligion = false;
 var hasrelationship = false;
 
 
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '626080860765815', // App ID
    channelUrl : 'www.relokit.idealust.me/scripts/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      FBAPI_profile(function(resp) {
       $("religion_text").text(resp.religion); 
       $("relationship_text").text(resp.relationship_status); 
      });
      FBAPI_likes(function(resp) {
      });
	  transition_console();
	  
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Called after login is successful
  /** Mines user's religion and relationship status */ 
  function FBAPI_profile(callback) {
    FB.api('/me', function(response) {
    // Religion
      if (response.religion == "Christian" || response.religion == "Christianity"
      || response.religion == "Catholic" || response.religion == "Catholicism") {
        document.getElementById("fb_religion").style.visibility = "visible";
        religion_keyword = 'church';
		hasreligion = true;
      }
      else if (response.religion == "Muslim" || response.religion == "Islam") {
        document.getElementById("fb_religion").style.visibility = "visible";
        religion_keyword = 'mosque';
		hasreligion = true;
      }
    // Relationship status
      if (response.relationship_status == "In a relationship" || response.relationship_status == "Engaged"
      || response.relationship_status == "Married" || response.relationship_status == "In an open relationship") {
        document.getElementById("fb_relationship").style.visibility = "visible";
        relationship_keyword = 'romance';
		hasrelationship = true;
      }
      else if (response.relationship_status == "Single" || response.relationship_status == "Widowed"
      || response.relationship_status == "Divorced") {
      	document.getElementById("fb_relationship").style.visibility = "visible";
        relationship_keyword = 'dating';
		hasrelationship = true;
      }
      callback(response);
	  slideout();
    });
  }
  
  // Called after login is successful
  /** Mines and analyzes user's likes */ 
  function FBAPI_likes(callback) {
    FB.api('/me?fields=likes', function(response) {
      callback(response);
    });
  }
  

  // METHODS BY LEONARD TO MINE DATA
  /** Add marker from FB */
function addMarker() {

var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': string_address}, function(results, status) {

  		if (status == google.maps.GeocoderStatus.OK) {
   		  var latitude = results[0].geometry.location.lat();
  		  var longitude = results[0].geometry.location.lng();
  		  var position = new google.maps.LatLng(latitude,longitude);
 		 } 
 		 var marker = new google.maps.Marker({
    map: map,
    position: position,
        draggable: false,
    animation: google.maps.Animation.DROP
    
  });
 		 map.panTo(position);
	}); 

  
}

function toggleVisibility(id) {
if (document.getElementById(id).style.visibility == "visible") {
	document.getElementById(id).style.visibility = "hidden";
	removeMarkers();
	}
else { document.getElementById(id).style.visibility = "visible"; }

}


  /** RELIGION */
 
function showMarkers(keyword) {
removeMarkers();
var actual_keyword;
 	if (keyword == 'religion') {
 		actual_keyword = religion_keyword;
 	}
 	if (keyword == 'relationship') {
 		actual_keyword = relationship_keyword;
 	}
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
// Facebook Services
var request = {
        location: new google.maps.LatLng(39.9539, -75.1930),
        bounds: map.getBounds(),
        keyword: actual_keyword
    };
    service.radarSearch(request, callback);
}
function callback(results, status) {
   if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    createMarker(result);
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: "http://maps.google.com/mapfiles/kml/pal2/icon11.png"
  });
markersArray.push(marker);


  google.maps.event.addListener(marker, 'mouseover', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      console.log(result);
      string_address = "" + result.vicinity;
      var phone = "None";
      if (result.formatted_phone_number != undefined) {
      	phone = result.formatted_phone_number;
      }
     infoWindow.setContent('<button class="fb_button" onclick="addMarker()">Place Marker</button><br/><b>' + result.name + '</b><br/>' + '<a href="' + result.website + '">Website</a>' + '<br/>Phone: ' + phone);
      infoWindow.open(map, marker);
    });
  });
}
function removeMarkers() {
for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
    }
}