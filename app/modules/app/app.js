/**
 * @file App
 * @summary First module loaded
 */

/*globals window, angular, document */

angular.module('app', [
    'ngResource',
    'ui.router',
    'item',
    'items'
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