(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.operatorReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('operatorReport',
            {
                url: '/operatorReport',
                templateUrl: 'Scripts/operatorReport/operatorReport.html',
                controller: 'OperatorReportCtrl',
                controllerAs: 'OperatorReportCtrl',

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