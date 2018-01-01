(function () {
    'use strict';

    angular.module('erp.lockReport').controller('LockReportCtrl', LockReportCtrl);

    LockReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function LockReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'lockReport-25' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);



        onload();

        function onload() {
            var promiseArray = [];
            var promiseArray1 = [];

            promiseArray.push(
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOLock')
                );


            $q.all(promiseArray).then(function (response) {
                console.log("GenerateWOLock", response);

                if(response.length !=0){
                    makeTable(response[0].data.result);
                }
            });

            promiseArray1.push(
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateFunctionLock')
                );


            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateFunctionLock", response);
                if (response.length != 0) {
                    makeTable2(response[0].data.result);
                }
            });
        }


        $scope.unlock = function () {
            var grid = $('#locked_table1').data('kendoGrid');
            // console.log("this grid", grid);
            // var items = grid.dataSource.view();
            //  console.log("this items", items);
            //var item1 = grid.select();
            //var promiseArray1 = [];
            //var promiseArray2 = [];


            //console.log("this item1", $(item1));
            //console.log("this uid", $(item1).attr("data-uid"));

            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem);
            if (selectedItem != null) {


                var woid = selectedItem['woid'];
                console.log(woid);

                var promiseArray = [];
                var promiseArray1 = [];

                promiseArray.push(
                $http.post(config.baseUrlApi + 'HMLVTS/FunctionUnLockWO', {
                    'WOID':woid
                })
                    );


                $q.all(promiseArray).then(function (response) {
                    console.log("FunctionUnLockWO", response);

                promiseArray1.push(
                $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOLock')
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOLock", response);

                    if(response.length !=0){
                        makeTable(response[0].data.result);
                    }
                });


                });
            } else {
                alert("Please select an item.");
            }


        }

        $scope.unlockFunction = function () {
            var grid = $('#locked_table2').data('kendoGrid');
            // console.log("this grid", grid);
            // var items = grid.dataSource.view();
            //  console.log("this items", items);
            //var item1 = grid.select();
            //var promiseArray1 = [];
            //var promiseArray2 = [];


            //console.log("this item1", $(item1));
            //console.log("this uid", $(item1).attr("data-uid"));

            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem);
            if (selectedItem != null) {


                var woid = selectedItem['woid'];
                console.log(woid);

                var promiseArray = [];
                var promiseArray1 = [];

                promiseArray.push(
                $http.post(config.baseUrlApi + 'HMLVTS/FunctionUnLockWO', {
                    'WOID': woid
                })
                    );


                $q.all(promiseArray).then(function (response) {
                    console.log("FunctionUnLockWO", response);

                    promiseArray1.push(
                    $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOLock')
                        );


                    $q.all(promiseArray1).then(function (response) {
                        console.log("GenerateWOLock", response);

                        if (response.length != 0) {
                            makeTable(response[0].data.result);
                        }
                    });


                });
            } else {
                alert("Please select an item.");
            }
        }

        function makeTable(data) {

            document.getElementById("locked_table1").innerHTML = "";
            console.log("tableData", data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#locked_table1").kendoGrid({

                dataSource: {
                    data
                },
                dataType: "json",
                height: 350,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                selectable: "true",
                //dragAndDrop: true,
              

                //pageSize: 10,
                // sortable: true,
                resizable: true,

                //groupable: true,
                filterable: true,
                columnMenu: true,
                // reorderable: true,
                resizable: true,
                draggable: true,
                droppable: true,

                columns: [
                 {
                     field: "index", title: "#", width: 30

                 },
                 {
                     field: "woid", title: "Work Order", width: 100

                 },
                 {
                     field: "loginName", title: "Login Name", width: 100

                 },
                 {
                    field: "dateTime", title: "DateTime", width: 100
                 }
                ]
            })
        }

        function makeTable2(data) {

            document.getElementById("locked_table2").innerHTML = "";
            console.log("tableData", data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#locked_table2").kendoGrid({

                dataSource: {
                    data
                },
                dataType: "json",
                height: 350,
                selectable: "true",
                //dragAndDrop: true,


                //pageSize: 10,
                // sortable: true,
                resizable: true,

                //groupable: true,
                filterable: true,
                columnMenu: true,
                // reorderable: true,
                draggable: true,
                droppable: true,

                columns: [
                 {
                     field: "index", title: "#", width: 30

                 },
                 {
                     field: "mutexFunction", title: "Function Name", width: 100

                 },

                 {
                     field: "loginName", title: "Login Name", width: 100

                 },
                {
                    field: "dateTime", title: "DateTime", width: 100
                }
                ]
            })
        }
    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});