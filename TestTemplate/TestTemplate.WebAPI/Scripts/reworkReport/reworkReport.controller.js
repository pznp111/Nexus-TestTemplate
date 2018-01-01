(function () {
    'use strict';

    angular.module('erp.reworkReport').controller('ReworkReportCtrl', ReworkReportCtrl);

    ReworkReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ReworkReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'reworkReport-19' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);


        //set default time
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        $(function () {
            $('#startDate').datetimepicker(
                {
                    defaultDate: d,
                    disabledDates: [
                        moment(d),
                        d,
                        d
                    ]
                });


            $('#endDate').datetimepicker({
                defaultDate: moment(),
                sideBySide: true
            });
        });

        onload();

        function onload() {
            var radio = $('input[name="reworkState"]:checked').val();
            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();


            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/GenerateWCList4', {
                   "StartDate": startDate,
                   "EndDate": endDate
               })
                   );


            $q.all(promiseArray2).then(function (response) {
                console.log("GenerateWCList4", response);
                if (response.length != 0) {
                    createSelect(response[0].data.result, "WorkCenter")
                }

            });

            if (radio == "ALL") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList6', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList6", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WOID")
                    }

                });
            }
            else if (radio == "Processing") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList7', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList7", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WOID")
                    }

                });
            }
            else if (radio == "Completed") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList8', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList8", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WOID")
                    }

                });
            }
        }

        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_rework_" + itemName);
            var array = [];
            if (itemName != "WorkCenter") {
                array.push("");
            }


            if (itemName == "WorkCenter") {
                // console.log("WorkCenter selector",rawData);
                array.push("");
                for (var i = 0; i < rawData.length; i++) {
                    //console.log(rawData[i]["workCenter"]);
                    array.push(rawData[i]["workCenter"]);

                }
                $scope.workCenters = array;
            }



            if (itemName == "WOID") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].woid);
                }
            }

            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                myDiv.appendChild(option);
            }
        }


        $scope.Refresh = function () {
            var radio = $('input[name="reworkState"]:checked').val();
            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();
            var select_WorkCenter = $('#select_rework_WorkCenter option:selected').text();
            var select_WOID = $('#select_rework_WOID option:selected').text();
            var promiseArray1 = [];
            if (radio == "ALL") {
                
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/reworkReport1', {
                    "WOID": select_WOID,
                    "WorkCenter": select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("reworkReport1", response);
                    if (response.length != 0) {
                        makeTable(response[0].data.result)
                    }

                });
            } else if (radio == "Processing") {
                
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/reworkReport2', {
                    "WOID": select_WOID,
                    "WorkCenter": select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("reworkReport2", response);
                    if (response.length != 0) {
                        makeTable(response[0].data.result)
                    }

                });
            } else if (radio == "Completed") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/reworkReport3', {
                    "WOID": select_WOID,
                    "WorkCenter": select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("reworkReport3", response);
                    if (response.length != 0) {
                        makeTable(response[0].data.result)
                    }

                });
            }

        }

        //'*******************************************************************
        //'Title     :  convertTime
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to convert time to the correct display format(from YYYY-MM-DDDDTHH:MM:SS to YYYY-MM-DDDD HH:MM:SS)
        function convertTime(convertField, data) {
            for (var i = 0; i < convertField.length; i++) {
                var field = convertField[i];
                for (var j = 0; j < data.length; j++) {
                    var originaltime = data[j][field];
                    var originaltimeArray = originaltime.split("T");
                    var finaltime = "";
                    for (var k = 0; k < originaltimeArray.length; k++) {
                        finaltime = finaltime + originaltimeArray[k] + " ";
                    }
                    data[j][field] = finaltime;
                }
            }
        }


        function makeTable(data) {

            convertTime(["reworkDate"], data);
            console.log("tableData", data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#table").kendoGrid({
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
                //        //  console.log("kendo color1",rowIndex+ " " + color);
                //        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                //            row.cells[cellIndex].background = color;
                //        }
                //    }
                //},
                dataSource: {
                    data
                    //,
                    //pageSize: 20
                },
                dataType: "json",
                height: 350,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                dragAndDrop: true,
               // pageable: true,

                //pageSize: 10,
                // sortable: true,
                resizable: true,
                //pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                draggable: true,
                droppable: true,

                columns: [
                 {
                     field: "index", title: "#", width: 50

                 },
                 {
                     field: "woid", title: "Work Order", width: 150

                 },

                 //{
                 //    field: "poNumber", title: "PO Number", width: 150

                 //},
                {
                    field: "partID", title: "PartNo.", width: 150
                },
                 {
                     field: "workcenter", title: "Last Work Center", width: 150
                 },
                 {
                     field: "routeName", title: "Route Name", width: 150
                 },
                  {
                      field: "procOpSeq", title: "Proc Op Seq", width: 150
                  },
                  {
                      field: "opSeq", title: "Op Seq", width: 150
                  },
                 {
                     field: "reworkStartWC", title: "Rework Start Work Centre", width: 200

                 },
                 {
                     field: "reworkStartOpSeq", title: "Rework Start OpSeq", width: 200

                 },
                 {
                     field: "reworkQty", title: "Rework Qty", width: 150

                 },
                 {
                     field: "reworkDate", title: "Rework Date", width: 150
                 },

                 {
                     field: "approvedname", title: "Approved Name", width: 150
                 },
                {
                    field: "username", title: "UserName", width: 150
                },
                {
                    field: "remark", title: "Remark", width: 150
                },
                {
                    field: "alertStatus", title: "Alert Status", width: 150
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