(function () {
    'use strict';

    angular.module('nexusNg.auth').factory('authValidator', authValidator);

    authValidator.$inject =['nexusConfig'];

    function authValidator(config) {

        return {
            validateSiteMap: validateSiteMap
        }

        function isNoneAuthUrl(nextUrl) {
            return _.includes(config.noneAuthUrls, nextUrl);
        }
        function isNotAuthenticatedUser(currentUser) {
            return !currentUser || !currentUser.isAuth;
        }

        function isAuthenticatedUser(currentUser) {
            return currentUser && currentUser.isAuth;
        }

        function isNotAllowedSiteMap(currentUser, nextUrl) {
            var siteMaps = _.reduce(currentUser.siteMap, function (memo, siteMap) {
                memo.push(siteMap.siteMapUrl);
                return memo;
            }, []);

            var isAllowed = false;
            _(siteMaps).forEach(function (value) {
                if (value === nextUrl) {
                    isAllowed = true;
                    return false;
                }
            });
            if (siteMaps.indexOf(nextUrl) > -1 || config.openUrl.indexOf(nextUrl) > -1) {
                isAllowed = true;
            }
            return !isAllowed;
        }

        /*
         * Contains code to check if current user is allowed to view page
         * This based on siteMap and your nexusConfig
         */
        function validateSiteMap(currentUser, nextUrl, event, $state) {
            if (isNoneAuthUrl(nextUrl)) {
                if (isAuthenticatedUser(currentUser)) {
                     event.preventDefault();
                     $state.go(config.homepageNgUrl);
                }
            } else {
                if (isNotAuthenticatedUser(currentUser)) {
                    event.preventDefault();
                    $state.go(config.loginNgUrl);
                } else if (isNotAllowedSiteMap(currentUser, nextUrl)) {
                    event.preventDefault();
                }
            }
        }
    };
})();