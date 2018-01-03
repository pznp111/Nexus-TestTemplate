(function () {
    'use strict';

    angular.module('erp.scrapReport').controller('ScrapReportCtrl', ScrapReportCtrl);

    ScrapReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ScrapReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'scrapReport-18' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        //$('#startDate').val(new Date("2014-02-09 ").toDateInputValue());
        //$('#endDate').val(new Date().toDateInputValue());

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
            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();

            var promiseArray1 = [];
            var promiseArray2 = [];
            var radio = $('input[name="ScrapType"]:checked').val();
            if (radio == "ALL") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList3', {
                    "StartDate": startDate,
                    "EndDate":endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList3", response);
                    if (response.length!=0) {
                        createSelect(response[0].data.result, "WOID")
                    }
                    
                });



                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWCList1', {
                    "StartDate": startDate,
                    "EndDate":endDate
                })
                    );


                $q.all(promiseArray2).then(function (response) {
                    console.log("GenerateWCList1", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WorkCenter")
                    }
                });

            }

            else if (radio == "Actual Scrap") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList4', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    if (response.length != 0) {
                        console.log("GenerateWOList4", response);
                    }
                });

                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWCList2', {
                    "StartDate": startDate,
                    "EndDate":endDate
                })
                    );


                $q.all(promiseArray2).then(function (response) {
                    console.log("GenerateWCList2", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WorkCenter")
                    }
                });

            }

            else if (radio == "Unaccountable") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList5', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    if (response.length != 0) {
                        console.log("GenerateWOList5", response);
                    }
                });

                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWCList3', {
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray2).then(function (response) {
                    console.log("GenerateWCList3", response);
                    if (response.length != 0) {
                        createSelect(response[0].data.result, "WorkCenter")
                    }
                });

            }
        }
       

        $scope.Refresh = function () {
            var radio = $('input[name="ScrapType"]:checked').val();
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
           // alert(radio);

            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();
            var select_WorkCenter = $('#select_scrap_WorkCenter option:selected').text();
            var select_WOID = $('#select_scrap_WOID option:selected').text();

            if(radio == "ALL"){
                

                

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/ScrapReport1', {
                    "WOID": select_WOID,
                    "WorkCenter":select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate":endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("ScrapReport1", response);
                    if (response.length != 0) {
                        makeTable(response[0].data.result)
                    }
                });
            }

            if (radio == "Actual Scrap") {
                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/ScrapReport2', {
                    "WOID": select_WOID,
                    "WorkCenter":select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate":endDate
                })
                    );


                $q.all(promiseArray2).then(function (response) {
                    console.log("ScrapReport2", response);
                    if (response.length != 0) {
                        makeTable(response[0].data.result)
                    }
                });
            }

            if (radio == "Unaccountable") {
                promiseArray3.push(
                $http.post(config.baseUrlApi + 'HMLVTS/ScrapReport3', {
                    "WOID": select_WOID,
                    "WorkCenter": select_WorkCenter,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray3).then(function (response) {
                    console.log("ScrapReport3", response);
                    if (response.length !=0) {
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


            convertTime(["scrapDate"],data);
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
                 sortable: true,
                resizable: true,
               // pageable: true,
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
                     field: "woid", title: "Work Order", width: 120

                 },

                 {
                     field: "poNumber", title: "PO Number", width: 120

                 },
                {
                    field: "partID", title: "PartNo.", width: 150
                },
                 {
                     field: "workcenter", title: "Work Center", width: 100
                 },
                  {
                      field: "procOpSeq", title: "Proc Op Seq", width: 80
                  },
                 {
                     field: "scrapQty", title: "Scrap Qty", width: 80

                 },
                 {
                     field: "scrapDate", title: "Scrap Date", width: 150

                 },
                 {
                     field: "scrapType", title: "Scrap Type", width: 100

                 },
                 {
                     field: "approvedName", title: "ApprovedName", width: 150
                 },

                 {
                     field: "userName", title: "Operator Name", width: 150
                 },
                {
                    field: "remark", title: "Remark", width: 150
                },
                {
                    field: "alertStatus", title: "Alert Status", width: 100
                }
                ]
            })


        }
        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_scrap_" + itemName);
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





    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});