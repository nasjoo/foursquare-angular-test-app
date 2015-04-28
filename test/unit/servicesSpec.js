'use strict';

describe('Test services availability', function() {

    beforeEach(module('foursquareService'));

    it('check the existence of foursquare factory', inject(function(foursquare) {
        expect(foursquare).toBeDefined();
    }));

    it('check the existence of geolocation factory', inject(function(geolocation) {
        expect(geolocation).toBeDefined();
    }));

});

describe('geolocation service', function () {

    beforeEach(module('foursquareService'));

    var geolocation,$rootScope;
    beforeEach(inject(function (_$rootScope_,_geolocation_) {
        $rootScope = _$rootScope_;
        geolocation = _geolocation_
    }));

    it('should get current location', function () {
        var results;
        var coords = {coords:{latitude:10,longitude:20}};
        spyOn(navigator.geolocation,"getCurrentPosition").andCallFake(function() {
            arguments[0](coords);
        });

        geolocation.getCurrentPosition(function(position){
            results = position;
        },function(error){
            alert("Location is not available!");
        });

        $rootScope.$digest();
        expect(results).toEqual(coords);
    });

});