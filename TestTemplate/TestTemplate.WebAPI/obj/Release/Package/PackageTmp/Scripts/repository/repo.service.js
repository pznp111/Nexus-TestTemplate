(function () {
    'use strict';
    angular.module('erp.repository').service('repo', repo);
    repo.$inject = [
        'customerService',
        'reviewService',
        'tenantService'
    ];

    function repo(
        customerService,
        reviewService,
        tenantService) {

        /*
         * You can additional services to this module
         * These services are for accessing API endpoints
         * eg. 
         *
         * return {
         *   customer: customerService,
         *   product: productService
         * };
         */

        return {
            customer: customerService,
            review: reviewService,
            tenant: tenantService
        };
    }
})();