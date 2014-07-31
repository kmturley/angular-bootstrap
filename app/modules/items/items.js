/**
 * @file Items
 * @summary Items module
 */

/*globals window, angular, document */

angular.module('items', [
    'ui.router'
])
    .controller('items', function ($scope, $stateParams, $filter) {
        'use strict';
        
        $scope.filters = {
            name: '',
            category: '',
            date: ''
        };
        $scope.items = [
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 4, name: 'Quantic', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 5, name: 'Taxi', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 6, name: 'Simpsons', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 7, name: 'Artic Monkeys', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 8, name: 'Oldboy', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 9, name: 'Friends', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 10, name: 'Bonobo', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 11, name: 'Sixth Sense', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 12, name: 'News', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 13, name: 'The Rolling Stones', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 14, name: 'Kill Bill', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 15, name: 'Cheers', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 16, name: 'Coldplay', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 17, name: 'Rear Window', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 18, name: 'Top Chef', category: 'tv', date: '2014-07-24T14:43:23.32' }
        ];
        
        $scope.findById = function (id, items) {
            var i = 0;
            for (i = 0; i < items.length; i += 1) {
                if (id === items[i].id) {
                    return items[i];
                }
            }
        };
        
        $scope.totalItems = $filter('filter')($scope.items, $scope.filters).length;
        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.setPage = function (num) {
            $scope.currentPage = num;
        };
        
        $scope.filter = function (key, value) {
            $scope.filters[key] = value;
            $scope.totalItems = $filter('filter')($scope.items, $scope.filters).length;
        };
        
        $scope.onFilter = function () {
            $scope.setPage(1);
        };
    })
    .controller('item', function ($scope, $stateParams) {
        'use strict';

        if ($stateParams.id) {
            $scope.id = Number($stateParams.id);
            $scope.item = $scope.findById($scope.id, $scope.items);
        }
    })
    .filter('startFrom', function () {
        'use strict';
        
        return function (input, start) {
            return input.slice(start);
        };
    });