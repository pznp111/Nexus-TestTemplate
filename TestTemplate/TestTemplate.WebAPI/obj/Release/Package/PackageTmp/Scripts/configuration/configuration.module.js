(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.configuration', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('configuration',
            {
                url: '/configuration',
                templateUrl: 'Scripts/configuration/configuration.html',
                controller: 'ConfigurationCtrl',
                controllerAs: 'configurationCtrl',

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