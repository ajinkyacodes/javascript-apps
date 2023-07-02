const weatherConditions = new XMLHttpRequest();
const weatherForecast = new XMLHttpRequest();
const form = document.getElementById('weatherInfoForm');
let cObj;
let fObj;
let temptxt=document.getElementById("inpcity");
let inpcity="Mumbai, India"; //Default City

loadWeather();

temptxt.addEventListener("keyup", () => {
	inpcity=temptxt.value;
});

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(inpcity!=''){
	loadWeather();
	}
	else { alert("Please enter a valid city name"); }
});

function loadWeather(){
	//GET THE CONDITIONS
	weatherConditions.open("GET","https://api.openweathermap.org/data/2.5/weather?q="+inpcity+",in&appid=c4132be239a3abe3afd09029b5089c61&units=Metric",true);
	weatherConditions.responseType='text';
	weatherConditions.send(null);

	weatherConditions.onload = function() {
		if (weatherConditions.status===200) {
			cObj = JSON.parse(weatherConditions.responseText);
			document.getElementById("location").innerHTML="Location: "+cObj.name;
			document.getElementById("weather").innerHTML="Weather Condition: "+cObj.weather[0].description;
			document.getElementById("temperature").innerHTML="Temperature: "+cObj.main.temp+" &deg;C";
			document.getElementById("desc").innerHTML="Wind Speed: "+cObj.wind.speed+" meter/sec";
		} //end if
	} //end function

	//GET THE FORECAST
	weatherForecast.open("GET","https://api.openweathermap.org/data/2.5/forecast?q="+inpcity+",in&appid=c4132be239a3abe3afd09029b5089c61&units=Metric",true);
	weatherForecast.responseType='text';
	weatherForecast.send(null);

	weatherForecast.onload = function() {
		if (weatherForecast.status===200) {
			fObj = JSON.parse(weatherForecast.responseText);
			
			let pod = fObj.list[0].sys.pod;		
			let body = document.getElementsByTagName('body');
			if(pod=="n") {
				$("body").css("background-color", "#00041d");
				$(".weatherdetails").css("background-color", "rgba(255,255,255,0.1)");
				$("p, span").css("color", "#fff");
			} else if(pod=="d") {
				$("body").css("background-color", "#669acc"); 
				$(".weatherdetails").css("background-color", "rgba(255,255,255,0.5)");
				$("p, span").css("color", "#000");
			} 
			
			//Current Date
			let date_raw=fObj.list[0].dt_txt;
			let date =  new Date(date_raw);
			let formatted_date = date.toDateString();
			date_raw=formatted_date;
			document.getElementById("r1c1").innerHTML="<strong>(Today)</strong><br/>"+date_raw;
			let iconcode = fObj.list[0].weather[0].icon;
			let iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r1c2").src = iconpath;
			document.getElementById("r1c3").innerHTML="Min: "+fObj.list[0].main.temp_min+"&deg;C";
			document.getElementById("r1c4").innerHTML="Max: "+fObj.list[0].main.temp_max+"&deg;C";
			
			//After One Day 
			date_raw=fObj.list[8].dt_txt;
			date =  new Date(date_raw);
			formatted_date = date.toDateString();
			date_raw=formatted_date;
			document.getElementById("r2c1").innerHTML="<strong>(Tomorrow)</strong><br/>"+date_raw;
			iconcode = fObj.list[8].weather[0].icon;
			iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r2c2").src = iconpath;
			document.getElementById("r2c3").innerHTML="Min: "+fObj.list[8].main.temp_min+"&deg;C";
			document.getElementById("r2c4").innerHTML="Max: "+fObj.list[8].main.temp_max+"&deg;C";
			
			//After Two Days 
			date_raw=fObj.list[16].dt_txt;
			date =  new Date(date_raw);
			formatted_date = date.toDateString();
			date_raw=formatted_date;
			document.getElementById("r3c1").innerHTML="<strong>(Day after tomorrow)</strong><br/>"+date_raw;
			iconcode = fObj.list[16].weather[0].icon;
			iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r3c2").src = iconpath;
			document.getElementById("r3c3").innerHTML="Min: "+fObj.list[16].main.temp_min+"&deg;C";
			document.getElementById("r3c4").innerHTML="Max: "+fObj.list[16].main.temp_max+"&deg;C";
		} //end if
	} //end function
}
