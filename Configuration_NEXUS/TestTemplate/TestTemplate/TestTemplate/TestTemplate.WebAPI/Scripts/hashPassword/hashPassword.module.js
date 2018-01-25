(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.hashPassword', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('hashPassword',
            {
                url: '/hashPassword',
                templateUrl: 'Scripts/hashPassword/hashPassword.html',
                controller: 'HashPasswordCtrl',
                controllerAs: 'hashPasswordCtrl',


                //url: '/split',
                //templateUrl: 'Scripts/split/split.html',
                //controller: 'SplitCtrl',
                //controllerAs: 'splitCtrl',

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