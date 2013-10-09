var map;
var hasStarted = false; // if hasStarted is true, user can now input amenities choices
var choices_latlon = []; // User's input of amenities location in lat and lon
var houses_latlon = []; // Houses' lat and lon that are scraped
var selections = 0;
var results = 0;
var imp = 0;
var houseObjectsArray = new Array();
var myLocationsArray = new Array();
var sliderValues = Array();
var index = 0;
var start = 10;
var stop = 20;

/** START CONTROL BUTTON */
function StartControl(controlDiv, map) {

	controlDiv.style.padding = '3px';
	controlDiv.style.backgroundColor = 'white';

	// Set CSS for the Start button border
	var controlUI = document.createElement('div');
	controlUI.setAttribute ("id", "start-button");

	/* unnecessary now, all in css
	   controlUI.style.backgroundColor = 'white';
	   controlUI.style.borderStyle = 'dotted';
	   controlUI.style.borderWidth = '2px';
	   controlUI.style.opacity = '0.7';
	   controlUI.style.cursor = 'pointer';
	   controlUI.style.textAlign = 'center';
	 */

	controlUI.title = 'Click to start adding points';
	controlDiv.appendChild(controlUI);

	// Set CSS for the Start button text
	var controlText = document.createElement('div');
	controlText.setAttribute ("id", "start-button-smaller");

	/* unnecessary now, all in css
	   controlText.style.fontFamily = 'Arial,sans-serif';
	   controlText.style.fontSize = '14px';
	   controlText.style.paddingLeft = '4px';
	   controlText.style.paddingRight = '4px';
	 */

	controlText.innerHTML = '<b>Start</b>';
	controlUI.appendChild(controlText);

	// Setup the click event listeners
	google.maps.event.addDomListener(controlUI, 'click', function() {
			if (!hasStarted) {
			controlText.innerHTML = '<b>End</b>';
			}
			else {
			controlText.innerHTML = '<b>Start</b>';
			// After clicking end the panel of suggested locations will slide out from the side
			}
			hasStarted = !hasStarted;
			});

	google.maps.event.addDomListener(controlUI, 'mouseover', function() {
			controlUI.style.opacity = '1.0';
			});

	google.maps.event.addDomListener(controlUI, 'mouseout', function() {
			controlUI.style.opacity = '0.7';
			});
}

/** PLACE MARKER MODE */
function placeMarker(position, map) {
	if (hasStarted) {
		var marker = new google.maps.Marker({
position: position,
map: map,
draggable: false,
animation: google.maps.Animation.DROP
});
map.panTo(position);
choices_latlon.push(position);
}
}

/** DISPLAY HOUSE MARKER */
function displayHouseMarker(position, map) {
	var marker = new google.maps.Marker({
position: position,
map: map
});
}


function getAddresses(){

	/** GEOCODING OF SCRAPED DATA */
	d3.csv("data/Detailed.csv", function(housedata) {

			// As of now, we will read in data from a file. We hope to do it from the server.
			for (var i = 0; i < housedata.length; i++) {
			var geocoder = new google.maps.Geocoder();
			var address = housedata[i].address + ", Pennsylvania";
			var myHouse = new Object();
			myHouse.address = address;

				var latitude = housedata[i].lat;
				var longitude = housedata[i].lon;

				myHouse.lat = latitude;
				myHouse.lng = longitude;
				myHouse.add = housedata[i].address;
				myHouse.features = housedata[i].features;
				myHouse.price = housedata[i].price;
				myHouse.gender = housedata[i].gender;
				myHouse.listed = housedata[i].listed;
				myHouse.expires = housedata[i].expires;
				myHouse.desiredLocations = [];
				myHouse.edgeWeight = 0;
				myHouse.rank = 0;
				houseObjectsArray.push(myHouse);

				var house_position = new google.maps.LatLng(latitude,longitude);
				//displayHouseMarker(house_position, map);

				houses_latlon.push(house_position);
			
		
			}
	});
}




getAddresses();


function initialize() {
	var mapOptions = {
zoom: 16,
      center: new google.maps.LatLng(39.9539, -75.1930),
      mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

	// Place Marker event
	google.maps.event.addListener(map, 'click', function(e) {
			if (hasStarted) {
			var myLocation = new Object();
			myLocation.lat = e.latLng.lat();
			myLocation.lng = e.latLng.lng();
			myLocation.latlng = e.latLng;

			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng': e.latLng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
				selections++; 

				var newDiv = "<h3>" +results[1].formatted_address + "</h3><div id = result" + selections +"><p><label id = slidertext"+selections+">Importance:</label></p><div id = slider"+selections+"></div></div>";
				myLocation.address = results[1].formatted_address;
				myLocation.importance = 0;
				myLocationsArray.push(myLocation);



				$('#locationsdiv').append(newDiv);
				$('#locationsdiv').accordion("refresh");
				$("#slidertext" + selections).css({"color": "#f6931f",  "font-weight": "bold"});
				var sliderpointer = $("slider" + selections);
				jQuery.data(sliderpointer, "pointer", { id: selections});
				$("#slider" + selections).slider({
value: 0,
min: 0,
max: 100,
step: 5,
slide: function(event, ui) {
$("#slidertext" + (jQuery.data(sliderpointer, "pointer").id)).text("Importance: " + ui.value);
sliderValues[jQuery.data(sliderpointer, "pointer").id] = ui.value;
}

});

}

} else {
	alert("Geocoder failed due to: " + status);
}
});
}
placeMarker(e.latLng, map);

});

// Start Control Button clicked event
var StartControlDiv = document.createElement('div');
StartControlDiv.setAttribute ("id", "start-button-bigger");
var startControl = new StartControl(StartControlDiv, map);
StartControlDiv.index = 1;
map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(StartControlDiv);


}



function calculate()
{
$("#click").text("Please wait patiently, while our complex algorithm crunches your data...");
	var newLocationsArray = new Array();
	for(var j = 0; j < myLocationsArray.length; j++){

		var newLocation = new Object();
		newLocation.lat = myLocationsArray[j].lat;
		newLocation.lng = myLocationsArray[j].lng;
		newLocation.latlng = myLocationsArray[j].latlng;
		newLocation.address = myLocationsArray[j].address;
		newLocation.importance = sliderValues[j+1];
		newLocationsArray.push(newLocation);
	}
for(var j = 0; j < houseObjectsArray.length; j++){	
			houseObjectsArray[j].desiredLocations = newLocationsArray;   
		}
	var latavg = 0;
	var lngavg = 0;
	for(var j = 0; j < houseObjectsArray[0].desiredLocations.length; j++){	
		latavg +=  houseObjectsArray[0].desiredLocations[j].lat;
		lngavg +=  houseObjectsArray[0].desiredLocations[j].lng;
	}
	latavg /= houseObjectsArray[0].desiredLocations.length;
	lngavg /= houseObjectsArray[0].desiredLocations.length;

	console.log(latavg + ", " + lngavg);

	for(var j = 0; j < houseObjectsArray.length; j++){	
		houseObjectsArray[j].edgeWeight = Math.sqrt(Math.pow((latavg - houseObjectsArray[j].lat),2) + Math.pow((lngavg - houseObjectsArray[j].lng),2)); 
		console.log(houseObjectsArray[j].edgeWeight);  
	}

var swapped;
    do {
        swapped = false;
        for (var i=0; i < houseObjectsArray.length-1; i++) {
            if (houseObjectsArray[i].edgeWeight > houseObjectsArray[i+1].edgeWeight) {
                var temp = houseObjectsArray[i];
                houseObjectsArray[i] = houseObjectsArray[i+1];
                houseObjectsArray[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
  for (var i=0; i < 15; i++) {

				
				
				var newDiv = "<h3>" +houseObjectsArray[i].add+ "</h3><div><h4>Average distance from Preferred Locations</h4><p>"+houseObjectsArray[i].edgeWeight+" miles</p><h4>Features</h4><p>"+houseObjectsArray[i].features+"</p><h4>Price</h4><p>"+houseObjectsArray[i].price+"</p><h4>Gender</h4><p>"+houseObjectsArray[i].gender+"</p><h4>Listed</h4><p>"+houseObjectsArray[i].listed+"</p><h4>Expires</h4><p>"+houseObjectsArray[i].expires+"</p><button onclick = 'displayHouseMarker( new google.maps.LatLng("+houseObjectsArray[i].lat+","+houseObjectsArray[i].lng+"), map)'>Place on map!</button></div>";
				$('#resultsdiv').append(newDiv);
				$('#resultsdiv').accordion("refresh");}

$("#click").text("Hover to the left of your screen for your results!");
	}





google.maps.event.addDomListener(window, 'load', initialize);

