(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.wodetail', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('wodetail',
            {
                url: '/wodetail',
                templateUrl: 'Scripts/wodetail/wodetail.html',
                controller: 'WodetailCtrl',
                controllerAs: 'wodetailCtrl',

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