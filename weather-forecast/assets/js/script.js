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

	// To display full country name
	function countryName(code) {
		let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
		country_name = regionNames.of(code);
		return country_name;
	}

	weatherConditions.onload = function() {
		if (weatherConditions.status===200) {
			cObj = JSON.parse(weatherConditions.responseText);
			document.title = `Weather Forecast | ${cObj.name}, ${countryName(cObj.sys.country)}`;
			document.getElementById("location").innerHTML='<i class="fas fa-map-marker-alt"></i> '+cObj.name+', '+cObj.sys.country;
			document.getElementById("temperature").innerHTML=Math.floor(cObj.main.temp)+"&deg; C";
			document.getElementById("weather").innerHTML=cObj.weather[0].description;
			document.getElementById("desc").innerHTML='<i class="fas fa-wind"></i> '+cObj.wind.speed+" m/s";
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
				$("body").addClass('dark').removeClass('light');
			} else if(pod=="d") {
				$("body").addClass('light').removeClass('dark');
			} 
			
			//Current Date
			let date_raw=fObj.list[0].dt_txt;
			let date =  new Date(date_raw);
			let formatted_date = date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, ' ');
			let formatted_weekday = date.toLocaleDateString('en-GB', {weekday: 'long'});
			document.getElementById("r1c1").innerHTML="<strong>"+formatted_weekday+"</strong><br/>"+formatted_date;
			let iconcode = fObj.list[0].weather[0].icon;
			let iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r1c2").src = iconpath;
			document.getElementById("r1c3").innerHTML=Math.floor(cObj.main.temp)+"&deg; C";
			
			//After One Day 
			date_raw=fObj.list[8].dt_txt;
			date =  new Date(date_raw);
			formatted_date = date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, ' ');
			formatted_weekday = date.toLocaleDateString('en-GB', {weekday: 'long'});
			document.getElementById("r2c1").innerHTML="<strong>"+formatted_weekday+"</strong><br/>"+formatted_date;
			iconcode = fObj.list[8].weather[0].icon;
			iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r2c2").src = iconpath;
			document.getElementById("r2c3").innerHTML=Math.floor(fObj.list[8].main.temp_min)+"&deg; C";
			
			//After Two Days 
			date_raw=fObj.list[16].dt_txt;
			date =  new Date(date_raw);
			formatted_date = date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, ' ');
			formatted_weekday = date.toLocaleDateString('en-GB', {weekday: 'long'});
			document.getElementById("r3c1").innerHTML="<strong>"+formatted_weekday+"</strong><br/>"+formatted_date;
			iconcode = fObj.list[16].weather[0].icon;
			iconpath = "assets/images/" +iconcode+ ".gif";
			document.getElementById("r3c2").src = iconpath;
			document.getElementById("r3c3").innerHTML=Math.floor(fObj.list[16].main.temp_min)+"&deg; C";
		} //end if
	} //end function
	temptxt.value=''; // Clear input field
}
