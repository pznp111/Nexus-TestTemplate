(function () {
    'use strict';

    angular.module('erp.backup').controller('BackupCtrl', BackupCtrl);

    BackupCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function BackupCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        // $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'backup-22' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);
        $('#startDate').val(new Date("2017-05-01").toDateInputValue());
        $('#endDate').val(new Date("2017-05-31").toDateInputValue());
        // $('#endDate').val(new Date().toDateInputValue());




        //'*******************************************************************
        //'Title     :  backup
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        $scope.backup = function () {
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var promiseArray = [];

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/BackupHMLVTSByYear', {
                "StartDate": startDate,
                "EndDate": endDate
            })
                );


            $q.all(promiseArray).then(function (response) {
                console.log("backup", response);
            });
        }




    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});