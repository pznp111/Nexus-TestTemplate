(function () {
    'use strict';

    angular.module('erp.customer').controller('CustomerDashboardCtrl', CustomerDashboardCtrl);

    CustomerDashboardCtrl.$inject = ['$scope','repo'];

    function CustomerDashboardCtrl($scope,repo) {
        repo.customer.getDashboard().then(function (dashboardData) {
            $scope.dashboardData = dashboardData;
        });
    }
})();