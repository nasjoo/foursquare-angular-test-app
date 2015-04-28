var foursquareService = angular.module('foursquareService', ['ngResource']);

foursquareService.factory('foursquare', ['$resource', function($resource){
    return $resource('https://api.foursquare.com/v2/venues/search?',{}, {
        search: {
            method: 'GET'
        }
    });
}]);

foursquareService.factory("geolocation", ['$rootScope', function ($rootScope) {
    return {
        checkLocationAvailability: function(){
            if(!navigator.geolocation){
                return false;
            }
            return true;
        },

        getCurrentPosition: function(successCallback, errorCallback, options) {
            if(this.checkLocationAvailability()) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $rootScope.$apply(successCallback(position));
                    }, function (error) {
                        $rootScope.apply(errorCallback(error));
                    },
                    options
                );
            } else {
                alert("Location not available!");
            }
        }
    };
}]);