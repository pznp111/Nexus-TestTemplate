(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.rework', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('rework',
            {
                url: '/rework',
                templateUrl: 'Scripts/rework/rework.html',
                controller: 'ReworkCtrl',
                controllerAs: 'reworkCtrl',

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