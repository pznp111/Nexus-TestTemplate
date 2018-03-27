(function () {
    'use strict';
    angular.module('erp.dashboard').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window', '$state'];

    function DashboardCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window, $state) {
        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        //var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'dispatch-9' });

        //$scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
        //    if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
        //        if (typeof siteMap.tag === 'string') {
        //            siteMap.tag = JSON.parse(siteMap.tag);
        //        }
        //        memo.push(siteMap);
        //    }
        //    return memo;
        //}, []);

        $scope.logOutsub = function () {
            authService.logOut();
            $state.go('login');
        };

        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();

        //'*******************************************************************
        //'Title     :    selectInput
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.selectInput = function (keyEvent) {
            if (keyEvent.which === 13) {
                // alert('I am an alert');
                //$scope.selectedWOID = String($('#select_wotracking-woid option:selected').text()).trim();
                //  $("#select_wotracking-woid-input").val($scope.selectedWOID);
                var input = String($('#select-woid-input').val()).trim();
                //if (input != "" && !isNaN(input)) {
                    $scope.selectedWOID = input;
                    CheckWOReady();

                //} else {
                //    alert("Please enter correct work order, only numeric input allowed");
                //}
            }
        }


        $scope.ExecutionHistory = function () {
            alert("afdsf");
            if (String($("#execution-history-woid").val()).trim() == "") {
                alert("please select an work order.");
               // $('#executionhistoryModal').modal('toggle');
            } else {
                $('#executionhistoryModal').modal('toggle');
            }
        }

        $scope.woSelected = function () {
            $("#select-woid-input").val($("#select-woid").val());
        }

        function CheckWOReady() {

            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckWOReady1', {
                'WOID': $scope.selectedWOID

            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CheckWOReady1", response);

                if(response.length != 0 && response[0].data.success  && response[0].data.result.length != 0){
                    if (String(response[0].data.result[0]['mcType']).trim() == "QC") {
                        authService.parameter = $scope.selectedWOID;
                        $window.location.href = '#/qctracking';
                    } else {
                        authService.parameter = $scope.selectedWOID;
                        $window.location.href = '#/wotracking';
                    }
                }
            });
        }


    };
})();