
var slider = document.getElementById("myRange");
var output = document.getElementById("sliderTime");
var sun_status = document.getElementById("sun_status");
var condition = document.getElementById("condition");
var sun = document.getElementById("sun");

var step = 10;


// Request for getting data 
// form https://sunrise-sunset.org/api
	function RequestData(){
		var xhr = new XMLHttpRequest(),
		    method = "GET",
	    	url = "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=1";

		xhr.open(method, url, true);
		xhr.onreadystatechange = function () {
	        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
	            Response = JSON.parse(xhr.responseText);
	            console.log(Response.results);
	            
	            return Response.results;
	        };

	    };
		xhr.send();
	}


RequestData(); // look at console


output.innerHTML = slider.value; // Display the default slider value


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
