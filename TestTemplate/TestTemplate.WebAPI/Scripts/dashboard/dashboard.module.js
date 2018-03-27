(function () {
    'use strict';

    angular.module('erp.dashboard', [])
   .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Scripts/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'DashboardCtrl',
                ncyBreadcrumb: {
                    label: 'Home'
                }
                ,
                //*********
                resolve: {
                    tenant: function ($stateParams, repo) {
                        return repo.tenant.getTenant();
                    }
                }
                //********
            });
    }

})();