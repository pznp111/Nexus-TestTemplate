(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.dispatch', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('dispatch',
            {
                url: '/dispatch',
                templateUrl: 'Scripts/dispatch/dispatch.html',
                controller: 'DispatchCtrl',
                controllerAs: 'DispatchCtrl',

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