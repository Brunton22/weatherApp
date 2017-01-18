angular.module('WeatherService', []).factory('Weather', ['$http', function($http) {

	return {
    	// call to get current weather from location
    		get : function(lat, lng) {

    			var config = {
		    		params: {
		        		lat: lat,
		        		lon: lng,
		        		//Insert OpenWeather API key here
		        		APPID: '________________,
		        		units: 'metric'
    				}
			}
        //return $http.get('http://api.openweathermap.org/data/2.5/weather?q=Dumfries,uk&APPID=3d7326b33f3211d74c5fbcf692c25c46');
       		return $http.get('http://api.openweathermap.org/data/2.5/weather?', config);
  		},

  		get_time :  function(timestamp, lat, lng){
  			var config = {
  				params: {
  					location: lat + ',' + lng,
  					timestamp: timestamp,
  					//insert google API key here
  					key: '___________'
  				}
  			}
  		return $http.get('https://maps.googleapis.com/maps/api/timezone/json?', config);
  		}

	  // these will work when more API routes are defined on the Node side of things
	  // call to POST and create a new nerd
	  //create : function(nerd_text_box) {
	  //    return $http.post('/api/nerds', nerd_text_box);
	  //},

	  // call to DELETE a nerd
	  //delete : function(id) {
	  //    return $http.delete('/api/nerds/' + id);
	  //},

	  //edit: function(id, nerd_edit_name) {
	  //	return $http.put('/api/nerds/' + id, nerd_edit_name);
	  //}
	}      
}]);