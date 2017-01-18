angular.module('WeatherCtrl', []).controller('WeatherController', function($scope,Weather) {

		/*Weather.get()
			.then(function(data) {
				$scope.weather = data.data;
			},
			function(data){
				console.log('Error');
			});*/

	var curr_date = new Date();
	var curr_date_ms = curr_date.getTime();
	$scope.unix_time = curr_date_ms / 1000;

	/*var curr_hr = curr_date.getHours();*/

	/*if ( $scope.hour > 18 && $scope.hour < 6 ) {
		$scope.time_of_day = 'bg-night';
	}

	else {
		$scope.time_of_day = 'bg-day';
	}*/

	$scope.weather_called = true;
	$scope.input = document.getElementById('get-location-form');
	$scope.autocomplete = new google.maps.places.Autocomplete($scope.input);

	$scope.get_location = function() {

		$scope.lat = $scope.autocomplete.getPlace().geometry.location.lat();
		$scope.lng = $scope.autocomplete.getPlace().geometry.location.lng();

		Weather.get_time($scope.unix_time, $scope.lat, $scope.lng)
		.then(function(data){
			$scope.location_unix_time = $scope.unix_time + data.data.dstOffset + data.data.rawOffset;
			$scope.location_unix_date = new Date($scope.location_unix_time * 1000);
			$scope.hours = $scope.location_unix_date.getHours();	
			$scope.minutes = $scope.location_unix_date.getMinutes();
			$scope.time = $scope.hours + ':' + $scope.minutes;

			/*if ( ( $scope.hours < 18 ) && ( $scope.hours > 6 ) ) {
				$scope.time_of_day = 'bg-day';
			}
			else {
				$scope.time_of_day = 'bg-night';
			};*/
			console.log($scope.location_unix_date);
			console.log(data.data);
		},
		function(data){
			console.log('Error')
		})

		Weather.get($scope.lat, $scope.lng)
		.then(function(data) {
			$scope.temp = data.data.main.temp;
			$scope.rnd_temp = Math.round($scope.temp);
			$scope.weather = data.data;
			$scope.weather_icon = $scope.weather.weather[0]['icon'];
			console.log($scope.weather_icon);
			$scope.weather_called = false;

			if ( $scope.weather_icon == '01d' ) {
				$scope.weather_bg = 'day-bg';
			}

			else if ( $scope.weather_icon == '01n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '02d' ) {
				$scope.weather_bg = 'day-bg';
			}

			else if ( $scope.weather_icon == '02n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '03d' ) {
				$scope.weather_bg = 'day-bg';
			}

			 else if ( $scope.weather_icon == '03n' ) {
			 	$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '04d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '04n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '09d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '09n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '10d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '10n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '11d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '11n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '13d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '13n' ) {
				$scope.weather_bg = 'night-bg';
			}

			else if ( $scope.weather_icon == '50d' ) {
				$scope.weather_bg = 'dull-bg';
			}

			else if ( $scope.weather_icon == '50n' ) {
				$scope.weather_bg = 'night-bg';
			}
		},
		function(data) {
			console.log('Error');
		});

		//var loc_lat_long = autocomplete.getPlace().geometry.location;
		//alert(loc_lat_long);
	};

	$scope.clear_form = function() {
		$scope.location_text = '';
	}
});