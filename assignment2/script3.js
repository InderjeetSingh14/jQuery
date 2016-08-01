(function(angular) {
    'use strict';
    angular.module('myApp', [])
        .controller('myController', ['$rootScope', '$scope', '$http', '$log', function($rootScope, $scope, $http, $log) {
            $scope.start = 0;
            $scope.refresh = function() {
                $log.log("hahahhhahha" + $scope.order);
                var reval = function() {
                    return $http({
                        method: 'GET',
                        url: '/addresses?_start=' + $scope.start + '&_limit=20&_order=' + $scope.order + '&_sort=' + $scope.sortby
                    }).then(function successCallback(response) {
                            $log.log("hahahhhahha respond" + JSON.stringify(response));
                            $scope.addresses = response.data;
                            $scope.keys = Object.keys(response.data[0]);
                        },
                        function errorCallback(response) {
                            alert("not get");
                        });
                };
                reval();
            }
            $scope.nextPage = function() {
                $scope.start += 20;
                $scope.refresh();
            }
            $scope.previousPage = function() {
                $scope.start -= 20;
                $scope.refresh();
            }
            $scope.refresh();

        }]);
})(window.angular);
