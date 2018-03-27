(function () {
    'use strict';

    angular.module('erp.customer').controller('CustomerCtrl', CustomerCtrl);

    CustomerCtrl.$inject = ['$scope', 'authService'];

    function CustomerCtrl($scope, authService) {
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'customers-8' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function(memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                //if (siteMap.tag && typeof siteMap.tag === 'string') {
                //    siteMap.tag = JSON.parse(siteMap.tag);
                //}
                memo.push(siteMap);
            }
            return memo;
        }, []);

        $('canvas').remove();
        $("#toolbar_wodetail").hide();
        $("#main-container-page").css('margin-top', 0)
    }
})();