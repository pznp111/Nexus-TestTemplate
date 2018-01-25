(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.review', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('review',
            {
                url: '/review',
                templateUrl: 'Scripts/review/review.html',
                controller: 'ReviewCtrl',
                controllerAs: 'reviewCtrl',

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