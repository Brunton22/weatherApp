angular.module('WeatherCtrl', []).controller('WeatherController', ['$scope','$interval','Weather', function($scope,$interval,Weather) {

	$scope.get_curr_time = function() {
		var curr_date = new Date();
		var curr_date_ms = curr_date.getTime();
		$scope.unix_time = curr_date_ms / 1000;
		return $scope.unix_time;
	}

	$scope.clock_started = false;
	$scope.weather_called = true;
	$scope.input = document.getElementById('get-location-form');
	$scope.autocomplete = new google.maps.places.Autocomplete($scope.input);

	$scope.get_location = function() {

		$scope.lat = $scope.autocomplete.getPlace().geometry.location.lat();
		$scope.lng = $scope.autocomplete.getPlace().geometry.location.lng();
		$scope.time_unix = $scope.get_curr_time();
		console.log($scope.time_unix);

		Weather.get_time($scope.time_unix, $scope.lat, $scope.lng)
		.then(function(data){
			$scope.location_unix_time = $scope.time_unix + data.data.dstOffset + data.data.rawOffset;
			$scope.location_unix_date = new Date($scope.location_unix_time * 1000);
			$scope.seconds = $scope.location_unix_date.getSeconds();
			$scope.minutes = $scope.location_unix_date.getMinutes();
			$scope.hours = $scope.location_unix_date.getHours();

			function add_zero_to_mins() {
				if ( $scope.minutes.toString().length == 1 ) {
					console.log('1');
					$scope.minutes = '0' + $scope.minutes;
				};
			}

			function secondTick () {
				$scope.clock_started = true;
   				setTimeout(function () {
   					$scope.$apply(function () {
	      					$scope.seconds++;
	      					if ($scope.seconds < 60) {
	      						console.log($scope.seconds);
	         						secondTick();
	      					}

	      					else {
	      						$scope.seconds = new Date().getSeconds();
	      						$scope.minutes++;
	      						console.log('2')
	      						if ( $scope.minutes < 60 ) {
	      							console.log($scope.minutes);
	      							add_zero_to_mins();
	      							secondTick();
	      						}

	      						else { 
	      							console.log('3')
	      							$scope.minutes = 0;
								add_zero_to_mins();
								$scope.hours++;
	      							if ( $scope.hours < 24 ) { console.log('4')
	      								secondTick();
	      							}

	      							else { 
	      								console.log('5')
	      								$scope.hours = 0;
	      								secondTick();
	      							};
	      						};
	      					};
	      				});
   				}, 1000);
			};

			add_zero_to_mins();
			if ( $scope.clock_started == false ) {
				secondTick();
			};
			/*$interval( function() {
				while ( $scope.seconds < 60 ) {
					console.log('hello');
					$scope.seconds++;
					console.log($scope.seconds);
				}
			}, 1000 );*/

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
			$scope.weather_called = false;
			console.log($scope.weather_icon);

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
	};

	$scope.clear_form = function() {
		$scope.location_text = '';
	}
}]);