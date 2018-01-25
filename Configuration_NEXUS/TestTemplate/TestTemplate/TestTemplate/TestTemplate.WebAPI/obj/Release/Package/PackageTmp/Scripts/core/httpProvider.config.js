(function () {
    'use strict';
    angular.module('erp.core').config(httpProvider);

    httpProvider.$inject = ['$httpProvider'];

    function httpProvider($httpProvider) {
        /*
         * Add the nexusNg authInterceptorService to $httpProver.interceptors
         * Check nexusNg/authInterceptorService.js for details
         */
        $httpProvider.interceptors.push('authInterceptorService');
    };
    
})();