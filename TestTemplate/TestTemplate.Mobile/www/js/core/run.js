(function () {
    'use strict';
    angular.module('erp.core').run(run);

    run.$inject = ['$rootScope', 'authService', '$state', 'authValidator'];


    function run($rootScope, authService, $state, authValidator) {

        $rootScope.$state = $state;
       

        $rootScope.$on('$stateChangeStart', function (event, next, prev) {

            // Get user data using authService
            var currentUser = authService.fillAuthData();

            // Validate user sitemap on page navigation or url change
            authValidator.validateSiteMap(currentUser, next.name, event, $state);
        });
    }
})();