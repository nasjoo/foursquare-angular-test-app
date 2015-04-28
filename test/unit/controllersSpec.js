describe('controllers test', function() {

    beforeEach(module('myFoursquareApp'));

    describe('VenueListCtrl', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, foursquare) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            ctrl = $controller("VenueListCtrl", { $scope: scope, foursquare: foursquare });
            scope.coords = {"coords":{"longitude":25,"latitude":64}};
            scope.requestParams = {
                clientId: "CLIENT_ID",
                clientSecret: "CLIENT_SECRET",
                version: "0"
            };

            var mock_data = { venues: "test" };
            var url = "https://api.foursquare.com/v2/venues/search?&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&ll=64,25&query=test&v=0";
            $httpBackend.when('GET', url).respond(mock_data);
        }));

        it('should set searchResult on successful search', function() {
            scope.searchText = "test";
            scope.search();
            $httpBackend.flush();
            expect(scope.searchResult.venues).toBe("test");
        });

    });

});
