(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.customisedOperatorReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('customisedOperatorReport',
            {
                url: '/customisedOperatorReport',
                templateUrl: 'Scripts/customisedOperatorReport/customisedOperatorReport.html',
                controller: 'CustomisedOperatorReportCtrl',
                controllerAs: 'CustomisedOperatorReportCtrl',

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