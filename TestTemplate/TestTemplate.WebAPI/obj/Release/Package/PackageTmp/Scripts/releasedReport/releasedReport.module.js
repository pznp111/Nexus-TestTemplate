(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.releasedReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('releasedReport',
            {
                url: '/releasedReport',
                templateUrl: 'Scripts/releasedReport/releasedReport.html',
                controller: 'ReleasedReportCtrl',
                controllerAs: 'ReleasedReportCtrl',

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