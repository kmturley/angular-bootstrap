/**
 * @file Items
 * @summary Items module
 */

/*globals window, angular, document */

angular.module('items', [
    'ui.router'
])
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
                    key = params.id ? params.section + params.id : params.section;

                me[key] = me[key] || [];
                $resource(url, null, actions).get(params, function (value) {
                    me[key] = value || me[key];
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
                    key = params.id ? params.section + params.id : params.section;

                $resource(url, null, actions).post(me[key], function (value) {
                    if (callback) {
                        callback(value);
                    }
                });
            }
        };
    });