var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;
var inpcity="Mumbai, India";

loadWeather();

var temptxt=document.getElementById("inpcity");
temptxt.addEventListener("keyup",function(){
	inpcity=this.value;
});
var citytextbtn=document.getElementById("citytextbtn");
citytextbtn.addEventListener("click", function(){
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
		
		// var pod = fObj.list[0].sys.pod;
		// console.log("POD = "+pod);
		// var body = document.getElementsByTagName('body');
		// if(pod=="n") {
		// 	body.style.background-color = "#ff0";
		// }
		
		//Current Date
		var date_raw=fObj.list[0].dt_txt;
		var date =  new Date(date_raw);
      	var formatted_date = date.toDateString();
		date_raw=formatted_date;
		document.getElementById("r1c1").innerHTML="<strong>(Today)</strong><br/>"+date_raw;
		var iconcode = fObj.list[0].weather[0].icon;
		var iconpath = "assets/images/" +iconcode+ ".gif";
		document.getElementById("r1c2").src = iconpath;
		document.getElementById("r1c3").innerHTML="Min: "+fObj.list[0].main.temp_min+"&deg;C";
		document.getElementById("r1c4").innerHTML="Max: "+fObj.list[0].main.temp_max+"&deg;C";
		
		//After One Day 
		var date_raw=fObj.list[8].dt_txt;
		var date =  new Date(date_raw);
      	var formatted_date = date.toDateString();
		date_raw=formatted_date;
		document.getElementById("r2c1").innerHTML="<strong>(Tomorrow)</strong><br/>"+date_raw;
		var iconcode = fObj.list[8].weather[0].icon;
		var iconpath = "assets/images/" +iconcode+ ".gif";
		document.getElementById("r2c2").src = iconpath;
		document.getElementById("r2c3").innerHTML="Min: "+fObj.list[8].main.temp_min+"&deg;C";
		document.getElementById("r2c4").innerHTML="Max: "+fObj.list[8].main.temp_max+"&deg;C";
		
		//After Two Days 
		var date_raw=fObj.list[16].dt_txt;
		var date =  new Date(date_raw);
      	var formatted_date = date.toDateString();
		date_raw=formatted_date;
		document.getElementById("r3c1").innerHTML="<strong>(Day after tomorrow)</strong><br/>"+date_raw;
		var iconcode = fObj.list[16].weather[0].icon;
		var iconpath = "assets/images/" +iconcode+ ".gif";
		document.getElementById("r3c2").src = iconpath;
		document.getElementById("r3c3").innerHTML="Min: "+fObj.list[16].main.temp_min+"&deg;C";
		document.getElementById("r3c4").innerHTML="Max: "+fObj.list[16].main.temp_max+"&deg;C";
	} //end if
} //end function

}

