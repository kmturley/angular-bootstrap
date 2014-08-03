/**
 * @file Item
 * @summary Item module
 */

/*globals window, angular, document */

angular.module('item-new', [
    'ui.router'
])
    .controller('item-new', function ($rootScope, $scope, $stateParams, Data) {
        'use strict';
        
        $scope.data = Data;
        $scope.editable = true;
        $scope.item = {};

        $scope.save = function () {
            $scope.isDisabled = true;
            $scope.data.post({section: 'items', id: $rootScope.id}, function (data) {
                $scope.isDisabled = false;
            });
        };
    });