(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.wotracking', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('wotracking',
            {
                url: '/wotracking',
                templateUrl: 'Scripts/wotracking/wotracking.html',
                controller: 'wotrackingCtrl',
                controllerAs: 'wotrackingCtrl',

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