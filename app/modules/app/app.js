/**
 * @file App
 * @summary First module loaded
 */

/*globals window, angular, document */

angular.module('app', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'item',
    'item-new',
    'items',
    'overlay'
])

    .config(function ($stateProvider) {
        'use strict';

        $stateProvider
            .state('app', {
                url: '',
                views: {
                    'main': {
                        templateUrl: 'modules/app/app.html'
                    }
                }
            });
    })

    .controller('app', function ($rootScope, $scope, $state, Data) {
        'use strict';
        
        $scope.data = Data;
        $scope.loggedIn = false;
        $scope.navbarCollapsed = true;
        $scope.username = 'admin';

        $scope.login = function () {
            $scope.data.get({section: 'users', id: $scope.username}, function (data) {
                $rootScope.user = data;
                $scope.loggedIn = true;
                $state.go('items');
            });
        };
        
        $scope.logout = function () {
            $scope.loggedIn = false;
            $state.go('app');
        };
    })

    .factory('Data', function ($resource) {
        'use strict';
        return {
            get: function (params, callback) {
                var me = this,
                    actions = {
                        get: {
                            method: 'GET',
                            params: params,
                            isArray: params.id ? false : true
                        }
                    },
                    url = params.id ? 'data/:section/:id.json' : 'data/:section.json',
                    key = params.id ? params.section + '_detail' : params.section;

                $resource(url, null, actions).get(params, function (value) {
                    me[key] = me[key] || {};
                    if (params.id) {
                        me[key][params.id] = value;
                    } else {
                        me[key] = value;
                    }
                    if (callback) {
                        callback(value);
                    }
                });
            },
            post: function (params, callback) {
                var me = this,
                    actions = {
                        post: {
                            method: 'POST',
                            params: params,
                            isArray: params.id ? false : true
                        }
                    },
                    url = params.id ? 'data/:section/:id.json' : 'data/:section.json',
                    key = params.id ? params.section + '_new' : params.section;
                
                console.log(actions, url, key, me[key]);

                $resource(url, null, actions).post(me[key], function (value) {
                    if (callback) {
                        callback(value);
                    }
                });
            }
        };
    });