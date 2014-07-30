/**
 * Test
 **/

/*globals jasmine, describe, beforeEach, afterEach, module, it, inject, expect */

describe('Controllers.Submissions', function () {
    'use strict';
    
    beforeEach(function () {
        module('Services.Login');
        module('Services.Submission');
        module('Services.URL');
        module('Controllers.Submissions');
    });

    describe('SubCtrl', function () {
        var scope,
            controller,
            http;

        beforeEach(inject(function ($rootScope, $controller, $injector) {
            $rootScope.url = '/';
            $rootScope.urlExt = '';
            scope = $rootScope.$new();
            controller = $controller('SubCtrl', {$scope: scope});
            http = $injector.get('$httpBackend');
        }));
        
        afterEach(function () {
            http.verifyNoOutstandingExpectation();
            http.verifyNoOutstandingRequest();
        });

        it('should have fetchSubData', function () {
            expect(scope.fetchSubData).toBeDefined();
            expect(scope.fetchSubData.loadingInd).toBeDefined();
            expect(scope.fetchSubData.loadingInd).toEqual(false);
        });

        it('should have getUsers', function () {
            var feed = { response: 'example' };
            expect(scope.getUsers).toBeDefined();
            http.expectGET('/submissionusers?searchstring=joe');
            http.whenGET('/submissionusers?searchstring=joe').respond(feed);
            scope.getUsers('joe').then(function (data) {
                expect(data).toEqual(feed);
            });
            http.flush();
        });
    });
});