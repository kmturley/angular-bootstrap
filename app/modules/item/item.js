/**
 * @file Item
 * @summary Item module
 */

/*globals window, angular, document */

angular.module('item', [
    'ui.router'
])
    .controller('item', function ($scope, $stateParams) {
        'use strict';
        
        $scope.edit = false;
        
        if ($stateParams.id) {
            $scope.id = Number($stateParams.id);
            $scope.item = $scope.findById($scope.id, $scope.items);
        }
    });