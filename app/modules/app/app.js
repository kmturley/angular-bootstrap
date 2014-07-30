/**
 * @file App
 * @summary First module loaded
 */

/*globals window, angular, document */

angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'items'
]).
    config(function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('app', {
                url: '',
                views: {
                    'main': {
                        templateUrl: 'modules/app/app.html'
                    }
                }
            })
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
    });