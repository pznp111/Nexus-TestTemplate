(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.wostatus', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('wostatus',
            {
                url: '/wostatus',
                templateUrl: 'Scripts/wostatus/wostatus.html',
                controller: 'WoStatusCtrl',
                controllerAs: 'WoStatusCtrl',

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