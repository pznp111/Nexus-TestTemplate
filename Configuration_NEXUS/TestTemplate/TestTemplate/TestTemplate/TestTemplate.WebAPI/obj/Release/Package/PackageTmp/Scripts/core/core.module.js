(function () {
    'use strict';

    angular.module('erp.core', [
        /*
         * Angular modules
         */
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngMessages',
      'ngStorage',
      'ngTouch',
      'ngPluralizeFilter',

        /*
         * Our reusable cross app code modules
         */
       'erp.common',
       'nexusNg.auth',

        /*
         * 3rd Party modules
         */
       'kendo.directives',
       'ui.router',
       'angular-loading-bar',
       'ncy-angular-breadcrumb',
    ]);
})();




