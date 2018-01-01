(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.threejs', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('threejs',
            {
                url: '/threejs',
                templateUrl: 'Scripts/threejs/threejs.html',
                controller: 'ThreejsCtrl',
                controllerAs: 'threejsCtrl',

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