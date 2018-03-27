(function () {
    'use strict';

    angular.module('erp.splitReport').controller('SplitReportCtrl', SplitReportCtrl);

    SplitReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function SplitReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        $scope.start = "";
        $scope.end = "";
        $scope.radio = "";
        $scope.selectedWOID = "";
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'splitReport-24' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            console.log("splitreport menu",siteMap);
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            //  console.log("splitreport memo", m);
            return memo;
        }, []);

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


        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();
        onload();

        function onload() {
            var radio = $('input[name="splitState"]:checked').val();
            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();
            var select_WOID = $('#select_split_WOID option:selected').text();

            $scope.start = startDate;
            $scope.end = endDate;
            $scope.radio = radio;


            var promiseArray1 = [];
            var promiseArray2 = [];
            if (radio == "ALL") {

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList9', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList10", response);
                    if (response.length != 0) {
                        //  makeTable(response[0].data.result)
                        for (var i = 0; i < response[0].data.result.length;i++){
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport1', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport1", response);
                            var result = [];
                            for (var j = 0; j < response.length; j++) {
                                if (response[j].data.result.length != 0) {
                                    result.push((response[j].data.result[0]));
                                }
                            }

                            console.log("result", result);
                            createSelect(result,'WOID');
                            makeTable(result);


                        });
                    }

                });
            } else if (radio == "Processing") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList10', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList10", response);
                    if (response.length != 0) {
                        // makeTable(response[0].data.result)
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport2', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport2", response);
                            var result = [];
                            for (var j = 0; j < response.length; j++) {
                                if (response[j].data.result.length != 0) {
                                    result.push((response[j].data.result[0]));
                                }
                            }
                            makeTable(result);

                        });
                    }

                });
            } else if (radio == "Completed") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList11', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList11", response);
                    if (response.length != 0) {
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport3', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport3", response);

                            var result = [];
                            for (var j = 0; j < response.length;j++){
                                if(response[j].data.result.length!=0){
                                    result.push((response[j].data.result[0]));
                                }
                            }
                            makeTable(result);

                        });
                    }

                });
            }


        }

        function acknowledge(){
            alert($scope.selectedWOID);
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
            document.getElementById("table1").innerHTML = "";
            console.log("tableData", data);
            convertTime(["releasedProdDate"], data)

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#table1").kendoGrid({
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
                height: 220,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                selectable: "true",
                //dragAndDrop: true,
               // pageable: true,

                //pageSize: 10,
                 sortable: true,
                resizable: true,
              //  pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
               // reorderable: true,
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
                     field: "actualProdQty", title: "Actual Production Qty", width: 80
                 },
                 {
                     field: "plannerRemark", title: "Planner Remarks", width: 150
                 },
                 {
                     field: "approvedname", title: "Approved Name", width: 150
                 },
                {
                    field: "operatorName", title: "Operator Name", width: 150
                },
                {
                    field: "releasedProdDate", title: "Released Production Date", width: 120
                },
                //{
                //    field: "alertStatus", title: "Alert Status", width: 150
                //},
                //{
                //    field: "alertStatus", title: "Alert Status", width: 150,
                //    template: "# if (alertStatus != undefined) { #" +
                //     "<div class='table-checkbox'><input class='checkbox' type = 'checkbox' ng-click='acknowledge( #woid #') checked ' ng-model = 'test'>Acknowledged<br></div>" +
                //     "# } else { #" +
                //     "<div class='table-checkbox'  style='background:red;'><input type = 'checkbox' ng-click='acknowledge(#woid#) ng-model = 'test'>Acknowledged<br></div>" +
                //     "# } #"

                //}
                {
                field: "alertStatus", title: "Alert Status", width: 150,
            template: "# if (alertStatus != undefined) { #" +
             "<div class='table-checkbox'>Acknowledged<br></div>" +
             "# } else { #" +
             "<div class='table-checkbox'  style='background:red;'>Not Acknowledged<br></div>" +
             "# } #"

        }
                ]
            })


        }
        function makeTable2(data) {
            document.getElementById("table2").innerHTML = "";
            console.log("tableData2", data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#table2").kendoGrid({
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
                height: 220,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                selectable: "true",
                dragAndDrop: true,
                //pageable: true,

                //pageSize: 10,
                 sortable: true,
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
                     field: "woid", title: "Work Order", width: 120

                 },

                 {
                     field: "poNumber", title: "PO Number", width: 120

                 },
                {
                    field: "partID", title: "PartNo.", width: 150
                },
                 {
                     field: "actualProdQty", title: "Actual Production Qty", width: 80
                 },
                 {
                     field: "plannerRemark", title: "Planner Remarks", width: 150
                 },
                 {
                     field: "approvedname", title: "Approved Name", width: 150
                 },
                {
                    field: "operatorName", title: "Operator Name", width: 150
                },
                {
                    field: "releasedProdDate", title: "Released Production Date", width: 150
                },
                {
                    field: "remark", title: "Remark", width: 150
                },
                {
                    field: "woStatus", title: "WO Status", width: 80
                }               
                ]
            })


        }


        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_split_" + itemName);
            var array = [];
            if (itemName != "WorkCenter") {
                array.push("");
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
           
            var radio = $('input[name="splitState"]:checked').val();
            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();
            var select_WOID = $('#select_split_WOID option:selected').text();

            $scope.start = startDate;
            $scope.end = endDate;
            $scope.radio = radio;


            var promiseArray1 = [];
            var promiseArray2 = [];
            if (radio == "ALL") {

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList9', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList10", response);
                    if (response.length != 0) {
                        //  makeTable(response[0].data.result)
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport1', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport1", response);
                            var result = [];
                            for (var j = 0; j < response.length; j++) {
                                if (response[j].data.result.length != 0) {
                                    result.push((response[j].data.result[0]));
                                }
                            }

                            console.log("result", result);
                            makeTable(result);


                        });
                    }

                });
            } else if (radio == "Processing") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList10', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList10", response);
                    if (response.length != 0) {
                        // makeTable(response[0].data.result)
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport2', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport2", response);
                            var result = [];
                            for (var j = 0; j < response.length; j++) {
                                if (response[j].data.result.length != 0) {
                                    result.push((response[j].data.result[0]));
                                }
                            }
                            makeTable(result);

                        });
                    }

                });
            } else if (radio == "Completed") {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList11', {
                    "WOID": select_WOID,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
                    );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateWOList11", response);
                    if (response.length != 0) {
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var woid = response[0].data.result[i]['parentWOID'];
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/splitReport3', {
                                    "WOID": woid,
                                    "StartDate": startDate,
                                    "EndDate": endDate
                                })
                    );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("splitReport3", response);

                            var result = [];
                            for (var j = 0; j < response.length; j++) {
                                if (response[j].data.result.length != 0) {
                                    result.push((response[j].data.result[0]));
                                }
                            }
                            makeTable(result);

                        });
                    }

                });
            }



        }

        $scope.tryToggleTable2 = function () {
            //alert("triggered");
            var grid = $('#table1').data('kendoGrid');
            // console.log("this grid", grid);
            // var items = grid.dataSource.view();
            //  console.log("this items", items);
            var item1 = grid.select();
            var promiseArray1 = [];
            var promiseArray2 = [];


            console.log("this item1", $(item1));
            //console.log("this item12", $(item1).tagName);
            //if ($(item1).tagName == 'tr') {
            //    console.log("cell", $(item1)[0].cells[9]);
            //} else {
            //    alert("wring")
            //}
           

            //todo: acknowledge here

            console.log("this uid", $(item1).attr("data-uid"));

            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem);
            var woid = selectedItem["woid"];
            $scope.selectedWOID = woid;

          //  alert(woid);
            console.log("test", $(item1)[0].cells[9]);
            if(woid != undefined){
            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/UpdateWOAlertStatus', {
                "WOID": woid
            })
            );


            $q.all(promiseArray2).then(function (response) {

                $($(item1)[0].cells[9]).html("Acknowledged");
            });
             }   

            if($scope.radio == "ALL"){
             promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/splitReportCellClicked1', {
                "WOID": woid,
                "StartDate": $scope.start,
                "EndDate": $scope.end
            })
            );


            $q.all(promiseArray1).then(function (response) {
                console.log("splitReportCellClicked1", response);
                if (response.length != 0) {
                    makeTable2(response[0].data.result);
                }
            });

            } else if($scope.radio == "Processing"){
                promiseArray1.push(
               $http.post(config.baseUrlApi + 'HMLVTS/splitReportCellClicked2', {
                   "WOID": woid,
                   "StartDate": $scope.start,
                   "EndDate": $scope.end
               })
               );


                $q.all(promiseArray1).then(function (response) {
                    console.log("splitReportCellClicked2", response);
                    if (response.length != 0) {
                        makeTable2(response[0].data.result);
                    }
                });
            } else if($scope.radio == "Completed"){
                promiseArray1.push(
               $http.post(config.baseUrlApi + 'HMLVTS/splitReportCellClicked3', {
                   "WOID": woid,
                   "StartDate": $scope.start,
                   "EndDate": $scope.end
               })
               );


                $q.all(promiseArray1).then(function (response) {
                    console.log("splitReportCellClicked3", response);
                    if(response.length != 0){
                        makeTable2(response[0].data.result);
                    }
                   
                });

            } else{
                //insersion error
            }




        }

    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});