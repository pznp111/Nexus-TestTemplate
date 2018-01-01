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
        'erp.myCompany',
        'erp.review',
       // 'erp.configuration',
        'erp.report',
        //'erp.multiple',
        'erp.priority',
        'erp.split',
        'erp.rework',
        'erp.dispatch',
       // 'erp.trackingReport',
        'erp.hashPassword',
        'erp.customisedOperatorReport',
        'erp.threejs',
        'erp.wodetail',
        'erp.routeDetail',
        'erp.operatorReport',
        'erp.splitReport',
        //'erp.releasedReport',
        'erp.reworkReport',
        'erp.scrapReport',
        'erp.backup',
        'erp.wostatus',
        'erp.releasedReport',
        'erp.lockReport',
        'erp.wotracking'

    ]);
})();