angular.module('WeatherService', []).factory('Weather', ['$http', function($http) {

	return {
    	// call to get current weather from location
    		get : function(lat, lng) {

    			var config = {
		    		params: {
		        		lat: lat,
		        		lon: lng,
		        		//Insert OpenWeather API key here
		        		APPID: '____________________',
		        		units: 'metric'
    				}
			}

       		return $http.get('http://api.openweathermap.org/data/2.5/weather?', config);
  		},

  		get_time :  function(timestamp, lat, lng){
  			var config = {
  				params: {
  					location: lat + ',' + lng,
  					timestamp: timestamp,
  					//insert google API key here
  					key: '_______________________'
  				}
  			}
  		return $http.get('https://maps.googleapis.com/maps/api/timezone/json?', config);
  		}
	}
}]);
