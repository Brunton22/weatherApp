angular.module('weatherApp').directive('getCurrentLocation', function() {
    return {
        //template: '<span id="get-curr-location" class="input-group-addon glyphicon glyphicon-globe" ng-click="get_curr_location()" data-toggle="tooltip" data-placement="bottom" title="Weather for your location"></span>'
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).hover(function() {
                // on mouseenter
                $(element).tooltip('show');
            }, function() {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    }
});
