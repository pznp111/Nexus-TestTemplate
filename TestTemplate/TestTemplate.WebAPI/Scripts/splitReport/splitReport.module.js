(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.splitReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('splitReport',
            {
                url: '/splitReport',
                templateUrl: 'Scripts/splitReport/splitReport.html',
                controller: 'SplitReportCtrl',
                controllerAs: 'SplitReportCtrl',

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