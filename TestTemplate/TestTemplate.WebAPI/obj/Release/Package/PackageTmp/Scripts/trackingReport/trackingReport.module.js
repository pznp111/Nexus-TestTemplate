(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.trackingReport', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('trackingReport',
            {
                url: '/trackingReport',
                templateUrl: 'Scripts/trackingReport/trackingReport.html',
                controller: 'TrackingReportCtrl',
                controllerAs: 'trackingReportCtrl'

                //*********
                //resolve: {
                //    tenant: function ($stateParams, repo) {
                //        return repo.tenant.getTenant();
                //    }
                //}
                //********
            });


    }
})();