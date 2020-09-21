<!doctype html>
<!-- If multi-language site, reconsider usage of html lang declaration here. -->
<html lang="en"> 
<head>
	<meta charset="utf-8">
	<!-- Setting the viewport for Media Query -->
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
	<title>Weather Forecast</title>
	<!-- Place favicon.ico in the root directory: mathiasbynens.be/notes/touch-icons -->
	<link rel="icon" href="weather-favicon.png" type="image/gif" sizes="16x16">
	<!-- Adding jQuery Weather Animation Links  -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="assets/vendor/font/fontawesome-all.css">
	<!-- Default style-sheet is for 'media' type screen (color computer display).  -->
	<link rel="stylesheet" media="screen" href=<?php 
	$cssfile = "assets/css/style.css";
	$timestamp = "?".time();
	echo $cssfile.$timestamp;
	?>>
</head>
<body id="weather-background" class="default-weather">
	<div class="container">
		<!-- Start of the header -->
		<header>
		</header>
		<!-- end of header -->
		<!-- Start of main -->
		<main>			
			<div class="inputdetails">
				<form action="#WeatherInfo" method="GET">
					<input type="search" id="inpcity" placeholder="City, Country"><button type="submit" id="citytextbtn">Weather Info</button>
				</form>
			</div>
			<div class="weatherdetails">
				<div id="WeatherInfo" class="weather-info">
					<h2>Weather Information</h2>
					<p id="location">City, Country</p>
					<p id="weather">Cloudy</p>
					<p id="temperature">31 &deg;</p>
					<p id="desc">Description</p>
				</div>			
				<div id="WeatherForecast" class="weather-forecast">
					<h2>Weather Forecast</h2>
					<div>
						<span class="weather-pts" id="r1c1">XXX</span>
						<span class="weather-pts wptsimg"><img id="r1c2"></span>
						<span class="weather-pts" id="r1c3">XXX</span>
						<span class="weather-pts" id="r1c4">XXX</span>
					</div>
					<div>
						<span class="weather-pts" id="r2c1">XXX</span>
						<span class="weather-pts wptsimg"><img id="r2c2"></span>
						<span class="weather-pts" id="r2c3">XXX</span>
						<span class="weather-pts" id="r2c4">XXX</span>
					</div>
					<div>
						<span class="weather-pts" id="r3c1">XXX</span>
						<span class="weather-pts wptsimg"><img id="r3c2"></span>
						<span class="weather-pts" id="r3c3">XXX</span>
						<span class="weather-pts" id="r3c4">XXX</span>
					</div>
				</div>
			</div>					
		</main>
		<!-- End of main -->
		<!-- start of footer -->
		<footer>			
		</footer>
		<!-- end of footer -->
	</div>
	<!-- External Script for animated background -->
	<script src="assets/vendor/jquery-1.8.3.min.js"></script>
	<script src=<?php 
	$jsfile = "assets/js/script.js";
	$timestamp = "?".time();
	echo $jsfile.$timestamp;
	?>></script>
</body>
</html>