(function () {
    'use strict';


    //module is to do routing


    angular.module('erp.backup', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('backup',
            {
                url: '/backup',
                templateUrl: 'Scripts/backup/backup.html',
                controller: 'BackupCtrl',
                controllerAs: 'backupCtrl',

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