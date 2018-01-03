(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.qctracking', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('qctracking',
            {
                url: '/qctracking',
                templateUrl: 'Scripts/qctracking/qctracking.html',
                controller: 'qctrackingCtrl',
                controllerAs: 'qctrackingCtrl',

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