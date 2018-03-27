var global = [];
(function () {
    'use strict';

    angular.module('erp.hashPassword').controller('HashPasswordCtrl', HashPasswordCtrl);

    HashPasswordCtrl.$inject = ['$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function HashPasswordCtrl($scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];


        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'hashPassword-11' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);
        $('canvas').remove();
        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();
        $scope.tenant = tenant;

        
        $scope.startHash = function () {
            var input = $("#pwd-input").val();
          //  alert(input);
            $http.post(config.baseUrlApi + 'HMLVTS/hashPassword', {
                "Index": input
            })
            .then(function (response) {
                console.log(response);
                //alert(response.data)
                $("#pwd-output").val(response.data);
            });



        }
    }

})();
