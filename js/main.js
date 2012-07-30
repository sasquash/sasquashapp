/* MAP */
$(document).bind("mobileinit", function() {
    $.mobile.loadingMessage = 'Loading...' ;
});
$(document).ready(function() {
   $('#content').load('index.php');
});

$( '#map' ).live( 'pageinit',function(event){
   //var t = setTimeout("window.location.reload(true)",3000);
});

function onDeviceReady()
{       
    navigator.notification.alert('PhoneGap is working');
}
$('body > *').css({minHeight: window.innerHeight + 'px !important'});

document.addEventListener('deviceready', doDeviceReady, false);

function doDeviceReady ()
{
        // The following tells the app to fade #page1 in after the splash screen
        $('#page1').fadeIn(5000);

    }


    /*CORDOVA*/

    var deviceInfo = function() {
        document.getElementById("platform").innerHTML = device.platform;
        document.getElementById("version").innerHTML = device.version;
        document.getElementById("uuid").innerHTML = device.uuid;
        document.getElementById("name").innerHTML = device.name;
        document.getElementById("width").innerHTML = screen.width;
        document.getElementById("height").innerHTML = screen.height;
        document.getElementById("colorDepth").innerHTML = screen.colorDepth;
    };

    var getLocation = function() {
        var suc = function(p) {
            alert(p.coords.latitude + " " + p.coords.longitude);
        };
        var locFail = function() {
        };
        navigator.geolocation.getCurrentPosition(suc, locFail);
    };

    var beep = function() {
        navigator.notification.beep(2);
    };

    var vibrate = function() {
        navigator.notification.vibrate(0);
    };

    function roundNumber(num) {
        var dec = 3;
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    }

    var accelerationWatch = null;

    function updateAcceleration(a) {
        document.getElementById('x').innerHTML = roundNumber(a.x);
        document.getElementById('y').innerHTML = roundNumber(a.y);
        document.getElementById('z').innerHTML = roundNumber(a.z);
    }

    var toggleAccel = function() {
        if (accelerationWatch !== null) {
            navigator.accelerometer.clearWatch(accelerationWatch);
            updateAcceleration({
                x : "",
                y : "",
                z : ""
            });
            accelerationWatch = null;
        } else {
            var options = {};
            options.frequency = 1000;
            accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
        }
    };

    var preventBehavior = function(e) {
        e.preventDefault();
    };

    function dump_pic(data) {
        var viewport = document.getElementById('viewport');
        console.log(data);
        viewport.style.display = "";
        viewport.style.position = "absolute";
        viewport.style.top = "10px";
        viewport.style.left = "10px";
        document.getElementById("test_img").src = data;
    }

    function fail(msg) {
        alert(msg);
    }

    function show_pic() {
        navigator.camera.getPicture(dump_pic, fail, {
            quality : 50
        });
    }

    function close() {
        var viewport = document.getElementById('viewport');
        viewport.style.position = "relative";
        viewport.style.display = "none";
    }

    function contacts_success(contacts) {
        alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                : ''));
    }

    function get_contacts() {
        var obj = new ContactFindOptions();
        obj.filter = "";
        obj.multiple = true;
        navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
    }

    function check_network() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        confirm('Connection type:\n ' + states[networkState]);
    }

    var watchID = null;

    function updateHeading(h) {
        document.getElementById('h').innerHTML = h.magneticHeading;
    }

    function toggleCompass() {
        if (watchID !== null) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
            updateHeading({ magneticHeading : "Off"});
        } else {        
            var options = { frequency: 1000 };
            watchID = navigator.compass.watchHeading(updateHeading, function(e) {
                alert('Compass Error: ' + e.code);
            }, options);
        }
    }



    function uploadPhoto2(imageURI) {

        var viewport = document.getElementById('viewport');
        console.log(imageURI);
        viewport.style.display = "";
        viewport.style.position = "absolute";
        viewport.style.top = "10px";
        viewport.style.left = "10px";
        document.getElementById("image").src = imageURI;

        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://tumami.es/phonegap/services/upload.php", win, fail, options);
    }

    function takeImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto2, function(message) {
                alert('get picture failed');
            },{
                quality: 50, 
                destinationType: navigator.camera.DestinationType.FILE_URI
            }
            );

        }
        





        function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
                alert('get picture failed');
            },{
                quality: 50, 
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
            );

        }

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://tumami.es/phonegap/services/upload.php", win, fail, options);
        }

        function win(r) {
            var params = {image: r};
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
           
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
        }


