'use strict';

var myFoursquareControllers = angular.module('myFoursquareControllers', ['foursquareService']);

myFoursquareControllers.controller('VenueListCtrl', ['$scope','geolocation','foursquare', function($scope,geolocation,foursquare) {
    $scope.venues = [];
    $scope.searchText = '';
    $scope.coords = {};

    updateLocation();

    function updateLocation() {
        //Get current location from geolocationService
        geolocation.getCurrentPosition(function(position){
            $scope.coords = position;
        },function(error){
            alert("Location is not available!");
        });
    }

    //Get venues from foursquareService
    $scope.search = function () {
        if($scope.searchText.length > 0) {
            foursquare.search({
                ll: $scope.coords.coords.latitude + "," + $scope.coords.coords.longitude,
                query: $scope.searchText
            }, function (result) {
                $scope.venues = result.response.venues;
            })
        } else {
            $scope.venues = [];
        }
    };

}]);
