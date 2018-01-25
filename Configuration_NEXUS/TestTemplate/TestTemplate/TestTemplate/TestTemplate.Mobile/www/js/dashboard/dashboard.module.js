(function () {
    'use strict';

    angular.module('erp.dashboard', [])
   .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'js/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            });
    }

})();