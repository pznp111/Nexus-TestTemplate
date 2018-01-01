(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.reworkReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('reworkReport',
            {
                url: '/reworkReport',
                templateUrl: 'Scripts/reworkReport/reworkReport.html',
                controller: 'ReworkReportCtrl',
                controllerAs: 'ReworkReportCtrl',

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