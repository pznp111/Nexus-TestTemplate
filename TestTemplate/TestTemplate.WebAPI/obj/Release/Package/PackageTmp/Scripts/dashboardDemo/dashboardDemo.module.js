(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.dashboardDemo', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('dashboardDemo',
            {
                url: '/dashboardDemo',
                templateUrl: 'Scripts/dashboardDemo/dashboardDemo.html',
                controller: 'DashboardDemoCtrl',
                controllerAs: 'DashboardDemoCtrl',

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