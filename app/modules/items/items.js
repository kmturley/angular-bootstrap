/**
 * @file Items
 * @summary Items module
 */

/*globals window, angular, document */

angular.module('items', [
    'ui.router'
])
    .controller('items', function ($scope, $stateParams) {
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
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' },
            { id: 1, name: 'The Beatles', category: 'music', date: '2014-05-24T18:21:40.38' },
            { id: 2, name: 'Shawshank Redemption', category: 'film', date: '2014-06-24T11:26:00.00' },
            { id: 3, name: 'Big Bang Theory', category: 'tv', date: '2014-07-24T14:43:23.32' }
        ];
        
        $scope.findById = function (id, items) {
            var i = 0;
            for (i = 0; i < items.length; i += 1) {
                if (id === items[i].id) {
                    return items[i];
                }
            }
        };
        
        $scope.filterChange = function () {
            $scope.setPage(1);
        };

        $scope.setPage = function (num) {
            $scope.totalItems = $scope.items.length;
            $scope.currentPage = num;
            $scope.pageSize = 5;
            console.log($scope.currentPage, $scope.totalItems);
        };
        
        $scope.setPage(1);
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