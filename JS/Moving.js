
var slider = document.getElementById("myRange");
var output = document.getElementById("sliderTime");
var sun_status = document.getElementById("sun_status");
var condition = document.getElementById("condition");
var sun = document.getElementById("sun");

var step = 10;



//Set Slider with current time...
function SetSlider(){

	let curentDate = new Date(); // Create object with type Date
	let h = curentDate.getHours(); // Get current Hours
	let m = curentDate.getMinutes() // Get current minutes

	slider.value = h; // Set slider to current hour

	output.innerHTML = h.toString() + m.toString(); // Display the default slider value
	
}


//Detect location for current user

var l = document.getElementById("local");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    } else {
        l.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	var crd = position.coords;
	var lat = crd.latitude;
    var lon = crd.longitude;
    var result;

    l.innerHTML = lat + "," + lon;
   
    // Sent API request
	url = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon+"&formatted=1";
    result = RequestData(url); 

    console.log(result);
}



function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            l.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            l.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            l.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            l.innerHTML = "An unknown error occurred."
            break;
    }
}


// Request for getting data 
// form https://sunrise-sunset.org/api
function RequestData(url){

	return new Promise (function (resolve, error) {

		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		
		xhr.onload = function () {
	        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {    
	            resolve(this.response);
	        }

	        else{
	        	var error = new Error(this.statusText);
	        	error.code = this.status;
	        	reject(error);
	        }
	    };

	    xhr.onerror = function(){
	    	reject(new Error("Network Error"));
	    };

		xhr.send();
	    });
}


SetSlider();


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {

	if (this.value >= 18 || this.value <= 5) {
		condition.innerHTML = "Night";
		sun_status.checked = false;
	}
	else
	{
		condition.innerHTML = "Day";	
		sun_status.checked = true;
	}

	sun.style.transform = "rotate("+(+this.value * 15 - 90) + "deg)";

	// console.log(this.value);

    output.innerHTML = this.value + "00";
}
