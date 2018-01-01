(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.scrapReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('scrapReport',
            {
                url: '/scrapReport',
                templateUrl: 'Scripts/scrapReport/scrapReport.html',
                controller: 'ScrapReportCtrl',
                controllerAs: 'ScrapReportCtrl',

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