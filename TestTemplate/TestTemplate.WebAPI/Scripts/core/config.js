(function () {
    'use strict';

    angular.module('erp.core')
        .config(breadcrumbConfig);

    breadcrumbConfig.$inject = ['$breadcrumbProvider'];

    function breadcrumbConfig($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'home',
            template: 'bootstrap3'
        });
    }
})()