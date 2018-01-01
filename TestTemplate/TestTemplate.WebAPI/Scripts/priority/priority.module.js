(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.priority', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('priority',
            {
                url: '/priority',
                templateUrl: 'Scripts/priority/priority.html',
                controller: 'PriorityCtrl',
                controllerAs: 'priorityCtrl',

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