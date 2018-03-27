(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.mctDashboard', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('mctDashboard',
            {
                url: '/mctDashboard',
                templateUrl: 'Scripts/mctDashboard/mctDashboard.html',
                controller: 'mctDashboardCtrl',
                controllerAs: 'mctDashboardCtrl',

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