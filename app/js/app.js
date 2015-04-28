'use strict';

var myFoursquareApp = angular.module('myFoursquareApp', ['foursquareService']);

myFoursquareApp.controller('VenueListCtrl', ['$scope','geolocation','foursquare', function($scope, geolocation, foursquareAPI) {
    $scope.searchText = '';
    $scope.coords = null;
    $scope.searchResult = [];

    $scope.requestParams = {
        clientId: "",
        clientSecret: "",
        version: "20150425",
        baseUrl: "https://api.foursquare.com/v2/venues/search?"
    };

    //Get current location from geolocationService
    geolocation.getCurrentPosition(function(position){
        $scope.coords = position;
    },function(error){
        //alert("Location is not available!");
    });

    //Get venues from foursquare
    $scope.search = function () {
        if($scope.searchText.length > 0 && $scope.coords) {
            foursquareAPI.search({
                v: $scope.requestParams.version,
                client_id: $scope.requestParams.clientId,
                client_secret: $scope.requestParams.clientSecret,
                ll: $scope.coords.coords.latitude + "," + $scope.coords.coords.longitude,
                query: $scope.searchText
            }, function (result) {
                if(result) {
                    $scope.searchResult = result;
                } else {
                    $scope.searchResult = [];
                }
            })
        } else {
            $scope.searchResult = [];
        }
    };
}]);
