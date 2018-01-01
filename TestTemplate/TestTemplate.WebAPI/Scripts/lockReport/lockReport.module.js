(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.lockReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('lockReport',
            {
                url: '/lockReport',
                templateUrl: 'Scripts/lockReport/lockReport.html',
                controller: 'LockReportCtrl',
                controllerAs: 'LockReportCtrl',

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