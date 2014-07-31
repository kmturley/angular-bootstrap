/**
 * @file Item
 * @summary Item module
 */

/*globals window, angular, document */

angular.module('item', [
    'ui.router'
])
    .controller('item', function ($rootScope, $scope, $stateParams, Data) {
        'use strict';
        $scope.data = Data;
        $scope.editable = false;
        
        if ($stateParams.id) {
            $rootScope.id = Number($stateParams.id);
            $scope.data.get({section: 'items', id: $rootScope.id}, function (data) {
                $scope.item = data;
            });
        }
        
        $scope.edit = function () {
            $scope.editable = true;
        };
        
        $scope.save = function () {
            $scope.isDisabled = true;
            $scope.data.post({section: 'items', id: $rootScope.id}, function (data) {
                $scope.isDisabled = false;
                $scope.editable = false;
            });
        };
    });