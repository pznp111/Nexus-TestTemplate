(function () {
    'use strict';

    angular.module('erp.customisedOperatorReport').controller('CustomisedOperatorReportCtrl', CustomisedOperatorReportCtrl);

    CustomisedOperatorReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function CustomisedOperatorReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
       // alert("");

        $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'customisedOperatorReport-12' });

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

        $('#startDate').val(new Date("2014-02-09").toDateInputValue());
        $('#endDate').val(new Date().toDateInputValue());

        load();

        function load() {
            GenerateUserNameList();
        }
        //'*******************************************************************
        //'Title     :  GenerateUserNameList
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateUserNameList() {
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateUserNameList')

                        .then(function (response) {
                            console.log("GenerateUserNameList", response);
                            createSelect(response.data.result, 'username');
                        });
        }

        //'*******************************************************************
        //'Title     :  refresh
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.Refresh = function () {
            var start = $('#startDate').val();
            var end = $('#endDate').val();

            var select_Username = $('#select_username option:selected').text();

            $http.post(config.baseUrlApi + 'HMLVTS/GenerateOperatorReport', {
                'StartDate': start,
                'EndDate': end,
                'OperatorName':select_Username
            })

            .then(function (response) {
                console.log("GenerateOperatorReport", response);
                makeTable(response.data.result);
            });

        }



        //'*******************************************************************
        //'Title     :  makeTable
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function makeTable(data) {
            for (var i = 0; i < data.length;i++){
                data[i]["index"] = (i + 1);
            }

            



            document.getElementById("operator-report-table").innerHTML = "";
            $("#operator-report-table").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                //excelExport: function (e) {
                //    var sheet = e.workbook.sheets[0];
                //    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                //        var row = sheet.rows[rowIndex];
                //        var color = $scope.highlight[rowIndex - 1]
                //        console.log("kendo color1", rowIndex + " " + color);
                //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                //            row.cells[cellIndex].background = color;
                //        }
                //    }
                //},
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                height: 550,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                dragAndDrop: true,
                pageable: true,

                //pageSize: 10,
                sortable: true,
                pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                draggable: true,
                droppable: true,

                columns: [
                 {
                     field: "index", title: "#", width: 150
                     //         template: "# if (woid == null) { #" +
                     //"<span data-content=' '>Null</span>" +
                     //"# } else { #" +
                     //"<span data-content='#: woid#'>#: woid#</span>" +
                     //"# } #"

                 },
                 {
                     field: "operatorName", title: "Operator Name", width: 150

                 },
                 {
                     field: "woid", title: "Work Order", width: 150
                 },
                 {
                     field: "poNumber", title: "PONumber", width: 150
                 },
                 {
                     field: "drawingNo", title: "Part No.", width: 150
                 },
                 {
                     field: "actualProdQty", title: "Actual Production Qty", width: 150
                 },
                 {
                     field: "scrapQty", title: "Scrap Qty", width: 150
                 },
                {
                    field: "workCenter", title: "Work Center", width: 150
                },
                {
                    field: "totalWorkingTime", title: "Total Working Time(mins)", width: 150
                }
                ]
            });

            //    $("#operator-report-table").data("kendoGrid").setDataSource(
            //    new kendo.data.DataSource({
            //        //Set the data of the grid as the result array of object.
            //        data: result.customerStatus
            //    })
            //);

            //    $("#operator-report-table").data("kendoGrid").refresh();

        }

        //'*******************************************************************
        //'Title     :  createSelect
        //'Function  :  create dropDown list
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function createSelect(rawData, itemName) {
            console.log("itemName", itemName);
            console.log("rawdata", rawData);
            var myDiv = document.getElementById("select_" + itemName);
            myDiv.innerHTML = "";


            if (itemName == "username") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["user_name"]).trim();//Subcon QC
                    option.text = String(rawData[i]["user_name"]).trim();
                    myDiv.appendChild(option);
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
                $("#select_username").val($scope.currentRoute);
            }

           


        }

    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});