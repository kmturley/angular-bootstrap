/**
 * @file Items
 * @summary Items module
 */

/*globals window, angular, document */

angular.module('items', [
    'ui.bootstrap',
    'ui.router'
])

    .config(function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('items', {
                url: '/items',
                views: {
                    'main@': {
                        templateUrl: 'modules/items/items.html'
                    }
                }
            })
            .state('items.view', {
                url: '/:id',
                views: {
                    'sidebar@items': {
                        templateUrl: 'modules/item/item.html',
                        controller: 'item'
                    }
                }
            })
            .state('items.view.overlay', {
                url: '/:template',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'modules/app/' + $stateParams.template + '.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close();
                            };
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    }).result.then(function (e) {
                        window.history.back();
                    }, function (e) {
                        window.history.back();
                    });
                }]
            });
    })
    .controller('items', function ($scope, $stateParams, $filter, Data) {
        'use strict';
        
        $scope.filters = {
            name: '',
            category: '',
            date: ''
        };
        
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.data = Data;
        
        $scope.data.get({section: 'items'}, function (data) {
            $scope.totalItems = $filter('filter')(data, $scope.filters).length;
        });
        
        $scope.filter = function (key, value) {
            $scope.filters[key] = value;
            $scope.totalItems = $filter('filter')($scope.data.items, $scope.filters).length;
        };
    })

    .filter('startFrom', function () {
        'use strict';
        return function (input, start) {
            return input.slice(start);
        };
    });