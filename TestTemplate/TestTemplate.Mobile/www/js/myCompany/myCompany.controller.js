(function () {
    'use strict';

    angular.module('erp.myCompany').controller('MyCompanyCtrl', MyCompanyCtrl);

    MyCompanyCtrl.$inject = ['$scope', 'tenant', 'authService', '$stateParams'];

    function MyCompanyCtrl($scope, tenant, authService, $stateParams) {
        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'myCompany-1' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);
    }
})();