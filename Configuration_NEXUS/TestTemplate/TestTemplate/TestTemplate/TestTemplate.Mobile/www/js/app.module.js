(function () {
    'use strict';

    angular.module('erp', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'erp.core',
        'erp.repository',

        /*
         * Feature areas
         */

        'erp.layout',
        'erp.dashboard',
        'erp.customer',
        'erp.myCompany'
    ]);
})();