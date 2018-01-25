(function () {
    'use strict';

    angular.module('erp.layout', [])
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/layout/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('myAccount', {
                url: '/my-account',
                templateUrl: 'js/layout/my.account.html',
                controller: 'MyAccountCtrl',
                controllerAs: 'mac'
            })
            .state('forgotPassword', {
                url: '/forgot-password',
                templateUrl: 'js/layout/forgotpassword.html',
                controller: 'ForgotPasswordCtrl',
                controllerAs: 'fpc'
            });
    }
})();