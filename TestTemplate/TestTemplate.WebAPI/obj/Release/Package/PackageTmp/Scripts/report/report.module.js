(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.report', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('report',
            {
                url: '/report',
                templateUrl: 'Scripts/report/report.html',
                controller: 'ReportCtrl',
                controllerAs: 'reportCtrl',

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