// handling document ready and phonegap deviceready
window.addEventListener('load', function () {
	document.addEventListener('deviceready', onDeviceReady, false);

}, false);

$(document).delegate('#map', 'pageshow', function () {
    //Your code for each page load here
    //getPosition();
     
});


// get current position and show map
function getPosition(){	
	//wpid=navigator.geolocation.watchPosition(geo_success, geo_error, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
	wpid=navigator.geolocation.getCurrentPosition(geo_success, geo_error, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
	
}
function watchPosition(){	
	wpid=navigator.geolocation.watchPosition(geo_success, geo_error, {enableHighAccuracy:true,frequency: 4000});
}




function clearWatch() {
      // Cancel the updates when the user clicks a button.
      navigator.geolocation.clearWatch(wpid);
 }

  function geo_success(position) {
    	var geolocation = $('#geolocation');
	geolocation.html('<table></table>');
	var table = geolocation.find('table');
	if(position.coords.latitude)
		table.append('<tr><th>Latitude</th><td>' + position.coords.latitude + '</td></tr>');
	if(position.coords.longitude)
		table.append('<tr><th>Longitude</th><td>' + position.coords.longitude + '</td></tr>');
	if(position.coords.altitude)
		table.append('<tr><th>Altitude</th><td>' + position.coords.altitude + '</td></tr>');
	if(position.coords.accuracy)
		table.append('<tr><th>Accuracy</th><td>' + position.coords.accuracy + '</td></tr>');
	if(position.coords.altitudeAccuracy)
		table.append('<tr><th>Altitude Accuracy</th><td>' + position.coords.altitudeAccuracy + '</td></tr>');
	if(position.coords.heading)
		table.append('<tr><th>Heading</th><td>' + position.coords.heading + '</td></tr>');
	if(position.coords.speed)
		table.append('<tr><th>Speed</th><td>' + position.coords.speed + '</td></tr>');
	if(position.coords.timestamp)
		table.append('<tr><th>Timestamp</th><td>' + new Date(position.timestamp) + '</td></tr>');


   var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    var map = new google.maps.Map(map_canvas, {
        zoom: 18,
        center: position,
        disableDefaultUI:false,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    
    var marker = new google.maps.Marker({
        position: position,
        map: map
    })
    




      }




function geo_error(error){ // geoError
	navigator.notification.alert('error: ' + error.message + '\n' + 'code: ' + error.code);
}



