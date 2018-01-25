(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.routeDetail', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('routeDetail',
            {
                url: '/routeDetail',
                templateUrl: 'Scripts/routeDetail/routeDetail.html',
                controller: 'RouteDetailCtrl',
                controllerAs: 'routeDetailCtrl',

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