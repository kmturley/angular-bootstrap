/**
 * @module App
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

    .config(['$stateProvider', function ($stateProvider) {
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
    }])

    .controller('app', ['$rootScope', '$scope', '$state', 'Data', function ($rootScope, $scope, $state, Data) {
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
            $rootScope.user = {};
            $state.go('app');
        };
    }])

    .factory('Data', ['$rootScope', '$resource', function ($rootScope, $resource) {
        'use strict';
        return {
            resource: $resource('data/:section.json', null, {
                get: { method: 'GET', isArray: false, params: { section: '@section', id: '@id' }, url: 'data/:section/:id.json' },
                post: { method: 'POST', isArray: false, params: { section: '@section', id: '@id' }, url: 'data/:section/:id.json' },
                query: { method: 'GET', isArray: true, params: { section: '@section', id: '@id' } }
            }),
            /**
             * @method get
             * Single item
             */
            get: function (params, callback, error) {
                var me = this;
                //console.log('get', params);
                me.resource.get(params, null, function (value) {
                    me.setData(value, params.section, params.id);
                    if (callback) { callback(value); }
                }, error);
            },
            /**
             * @method post
             * Submit data
             */
            post: function (params, callback, error) {
                var me = this;
                //console.log('post', params);
                me.resource.post(params, me.getData(params.section, params.id), function (value) {
                    //me.setData(value, params.section, params.id); // do not save post data
                    if (callback) { callback(value); }
                }, error);
            },
            /**
             * @method query
             * List of items
             */
            query: function (params, callback, error) {
                var me = this;
                //console.log('query', params);
                me.resource.query(params, null, function (value) {
                    me.setData(value, params.section, params.id);
                    if (callback) { callback(value); }
                }, error);
            },
            /**
             * @method setData
             * Cache the items for sharing between controllers
             */
            setData: function (value, section, id) {
                if (typeof id === 'number') {
                    if (!this[section + '_detail']) {
                        this[section + '_detail'] = {};
                    }
                    this[section + '_detail'][id] = value;
                } else {
                    this[section] = value;
                }
            },
            /**
             * @method getData
             * Get cached data object
             */
            getData: function (section, id) {
                if (typeof id === 'number') {
                    if (id === 0) {
                        return this[section + '_new'];
                    } else {
                        return this[section + '_detail'][id];
                    }
                } else {
                    return this[section];
                }
            }
        };
    }])

    .filter('trusted', ['$sce', function ($sce) {
        'use strict';
        
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

    .directive('selectOnClick', function () {
        'use strict';
        
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    this.select();
                });
            }
        };
    })

    .directive('focusPoint', function () {
        'use strict';
        
        return {
            restrict: 'A',
            replace: true,
            scope: {
                model: '=ngModel'
            },
            template: '<div class="focus-point">' +
                        '<div class="focus-area">' +
                            '<span class="target" style="left: {{ x }}%; top: {{ y }}%"></span>' +
                            '<img src="{{ src }}" alt="" ng-mousemove="onMouseMove($event)" ng-mousedown="onMouseDown($event)" ng-mouseup="onMouseUp($event)" draggable="false" class="selectDisable" />' +
                        '</div>' +
                        '<span style="background-image: url(\'{{ src }}\'); background-position: {{ x }}% {{ y }}%" class="preview-portrait"></span>' +
                        '<span style="background-image: url(\'{{ src }}\'); background-position: {{ x }}% {{ y }}%" class="preview"></span>' +
                        '<span style="background-image: url(\'{{ src }}\'); background-position: {{ x }}% {{ y }}%" class="preview-landscape"></span>' +
                        '<span style="background-image: url(\'{{ src }}\'); background-position: {{ x }}% {{ y }}%" class="preview-wide"></span>' +
                        '<p>{{ x }}% / {{ y }}%</p>' +
                       '</div>',
            link: function (scope, element, attr) {
                var dragging = false;
                scope.src = attr.src;

                scope.onMouseDown = function (e) {
                    scope.update(e);
                    dragging = true;
                };

                scope.onMouseMove = function (e) {
                    if (dragging === true) {
                        scope.update(e);
                    }
                };

                scope.onMouseUp = function (e) {
                    e.preventDefault();
                    dragging = false;
                };
                
                scope.update = function (e) {
                    e.preventDefault();
                    var offset = scope.offset(e.target);
                    scope.x = Math.round(((e.pageX - offset.left) / e.target.clientWidth) * 100);
                    scope.y = Math.round(((e.pageY - offset.top) / e.target.clientHeight) * 100);
                };
                
                scope.offset = function (elm) {
                    try { return elm.offset(); } catch (e) { }
                    var body = document.documentElement || document.body;
                    return {
                        left: elm.getBoundingClientRect().left + (window.pageXOffset || body.scrollLeft),
                        top: elm.getBoundingClientRect().top + (window.pageYOffset || body.scrollTop)
                    };
                };
            }
        };
    });