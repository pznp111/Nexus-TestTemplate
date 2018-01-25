(function () {
    'use strict';

    /*
     * Nexus configuration check http://st-t2m-05-pc3:99/docs/angular.html
     */

    angular.module('nexusNg.auth', [])
        .constant('nexusConfig', {
            baseUrlNexusApi: 'http://st-linxl-nb:99/api/',
            loginNgUrl: 'login',
            homepageNgUrl: 'home',
            openUrl: [
                'home', //home
                'myAccount' //myAccount
            ],
            noneAuthUrls: [
                'login',
                'forgotPassword',
                'resetForgotPassword',
                'resetForgotPasswordError'
            ]
        });

})();