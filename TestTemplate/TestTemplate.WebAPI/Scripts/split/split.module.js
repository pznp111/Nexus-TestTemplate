(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.split', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('split',
            {
                url: '/split',
                templateUrl: 'Scripts/split/split.html',
                controller: 'SplitCtrl',
                controllerAs: 'splitCtrl',

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