
/*
 * Retrieve all future events
 */
var myService;
var calendarAddresses = [];
var calendarTitles = [];
var feedUrl = "https://www.google.com/calendar/feeds/leonard.loo.ks%40gmail.com/private-946f52bf8748818ff88222784242c74a/basic";


function getMyFeed() {
  setupMyService();

  myService.getEventsFeed(feedUrl, handleMyFeed, handleError);
}

function setupMyService() {
  myService = new google.gdata.calendar.CalendarService('Relokit');
}


// The callback method that will be called when getEventsFeed() returns feed data
var handleMyFeed = function(result) {       
  
  // Obtain the array of CalendarEventEntry
  var entries = result.feed.entry;    
  
  // Print the total number of events
  console.log('Total of ' + entries.length + ' event(s)');

  for (var i = 0; i < entries.length; i++ ) {
    var eventEntry = entries[i];
    // Parsing it into address format
    var str = eventEntry.content.$t;
    str = str.split("Where: ");
    str = str[1];
    str = str.split("<br />");
    var gcal_address = "" + str[0];
    console.log(gcal_address);
   // calendarAddresses.push(gcal_address);
    var eventTitle = eventEntry.getTitle().getText();
    calendarTitles.push(eventTitle);
    console.log('Event title = ' + eventTitle);
  }    
}

// Error handler to be invoked when getEventsFeed() produces an error
var handleError = function(error) {
  alert(error);
}

function writecalendar() {
var display = document.getElementById("calendar_display");
alert(calendarTitles);
for (var i = 0; i < calendarTitles.length; i++) {
	if (i == calendarTitles.length - 1) {
		display.appendChild(document.createTextNode(calendarTitles[i]));
		} else {
			display.appendChild(document.createTextNode(calendarTitles[i] + " | "));
	}
	
}
}



/*
function fetchAndPlot() {

var geocoder = new google.maps.Geocoder();
	for (var i = 0; i < calendarAddresses.length; i++) {
geocoder.geocode( { 'address': calendarAddresses[i]}, function(results, status) {

  		if (status == google.maps.GeocoderStatus.OK) {
   		 var latitude = results[0].geometry.location.lat();
  		  var longitude = results[0].geometry.location.lng();
  		  var position = new google.maps.LatLng(latitude,longitude);
  		  var infowindow = new google.maps.InfoWindow({
      content: calendarTitles[i]
  });
  
  //alert(calendarTitles[i]);
 		  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
 		 }  
	}); 
	}


}*/


