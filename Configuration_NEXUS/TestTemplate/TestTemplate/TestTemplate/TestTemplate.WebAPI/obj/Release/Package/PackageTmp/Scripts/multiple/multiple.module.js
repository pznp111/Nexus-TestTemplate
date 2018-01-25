(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.multiple', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('multiple',
            {
                url: '/multiple',
                templateUrl: 'Scripts/multiple/multiple.html',
                controller: 'MultipleCtrl',
                controllerAs: 'multipleCtrl',

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