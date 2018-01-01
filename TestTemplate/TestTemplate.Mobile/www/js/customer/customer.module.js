(function () {
    'use strict';

    angular.module('erp.customer', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('customers', {
                url: '/customers',
                templateUrl: 'js/customer/customer.html',
                controller: 'CustomerCtrl',
                controllerAs: 'customer',
                ncyBreadcrumb: {
                    label: 'Customers',
                }
            })
            .state('customers.dashboard', {
                url: '/dashboard',
                templateUrl: 'js/customer/customer.dashboard.html',
                controller: 'CustomerDashboardCtrl',
                controllerAs: 'customerDashboard',
                ncyBreadcrumb: {
                    label: 'Dashboard',
                    parent: 'customers'
                }
            })
            .state('customers.reviews', {
                url: '/reviews',
                templateUrl: 'js/customer/customer.review.html',
                controller: 'CustomerReviewCtrl',
                controllerAs: 'customerReview',
                ncyBreadcrumb: {
                    label: 'Reviews',
                    parent: 'customers'
                }
            });
    }
})();