(function () {
    'use strict';

    angular.module('erp.trackingReport').controller('TrackingReportCtrl', TrackingReportCtrl);

    TrackingReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function TrackingReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        //var xml = [];
        // var rowNumber = 0;
        // var dataLength = 0;
        // var rowBoxNo = 12;
        //var nextSplitWONo;

        //*************remark***********//
        //global variables using
        //$scope.finalData and $scope.finalData1 are used to make the first table
        //$scope.DetailResult is used to make the 2nd table
        //$scope.selectorItem and $scope.selectorItemDetail are used to generate selector for Measurement Report(table2)
        //$scope.promiseArray1Data is to store parameter items so that can be combine with $scope.DetailResult in makeTable2/BuildData function


        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'trackingReport-10' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);


        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();

        $scope.selectorItemDetail



        // make QA Tracking Measurement Report resizable and draggable
        $("#report-modal-content").resizable();
        $("#report-modal-content").draggable();

        //predefine date input
        $('#startDate').val(new Date("2017-08-25").toDateInputValue());
        $('#endDate').val(new Date().toDateInputValue());

        //display the first selector
        populateCustomer();


        //'*******************************************************************
        //'Title     :  populateCustomer
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make the first selector when page is loaded
        //'*******************************************************************
        function populateCustomer() {
            $http.get(config.baseUrlApi + 'MWTS/populateCustomer')
            .then(function (response) {
                //console.log("populateCustomer", response.data.result);
                createSelect(response.data.result, "customer");
            });
        }



        //'*******************************************************************
        //'Title     :  comboMCList_SelectionChangeCommitted
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make the next selector the previous selector value is one change
        //'*******************************************************************
        $scope.comboMCList_SelectionChangeCommitted = function () {
            // alert("here");
            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();
            document.getElementById("select_detail").innerHTML = "";

            var promiseArray = [];

            promiseArray.push(
            $http.post(config.baseUrlApi + 'MWTS/comboMCList_SelectionChangeCommitted0', {
                "CustomerID": $scope.custID,
                "ItemName": item
            })
                );


            $q.all(promiseArray).then(function (response) {
                // console.log("comboMCList_SelectionChangeCommitted0", response);

                if (response[0].data.result.length != 0) {
                    var kititemid = response[0].data.result[0]["itemID"];
                } else {
                    var kititemid = 0;
                }
                // var kititemid = response[0].data.result[0]["itemID"];
                // console.log("comboMCList_SelectionChangeCommitted0", kititemid);
                //   console.log("comboMCList_SelectionChangeCommitted 1111", $scope.custID + " " + kititemid);
                $http.post(config.baseUrlApi + 'MWTS/comboMCList_SelectionChangeCommitted', {
                    "CustomerID": $scope.custID,
                    "ItemID": kititemid
                })
                .then(function (response) {
                    //  console.log("comboMCList_SelectionChangeCommitted 1111", response);
                    if (response.data.result.length != 0) {
                        $("#input-customerkittype").val(response.data.result[0]["kitType"]);
                        // alert(response.data.result[0]["kitType"]);
                    } else {
                        var cut = item.lastIndexOf("(");
                        if (cut != -1) {
                            $("#input-customerkittype").val(item.substring(0, cut));
                        } else {
                            $("#input-customerkittype").val(item);
                        }
                    }
                });

            })

        }

        //'*******************************************************************
        //'Title     :  populateKitType
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make the next selector the previous selector value is one change
        //'*******************************************************************
        $scope.populateKitType = function () {
            var customer = $('#select_customer option:selected').text();
            // console.log("populateKitType", customer + "|");
            document.getElementById("select_detail").innerHTML = "";


            $http.post(config.baseUrlApi + 'MWTS/populateKitType', {
                "CustomerName": customer
            })
            .then(function (response) {
                // console.log("populateKitType", response.data.result);

                if (response.data.result.length != 0) {
                    var promiseArray = [];

                    $scope.custID = response.data.result[0]["customerID"];
                    promiseArray.push(


                    $http.post(config.baseUrlApi + 'MWTS/populateKitType1', {
                        "CustomerID": response.data.result[0]["customerID"]
                    })

                        );

                    $q.all(promiseArray).then(function (response) {
                        // console.log("populateKitType21", response);
                        createSelect(response[0].data.result, "kittype");
                    });

                }
            });

        }


        ////'*******************************************************************
        ////'Title     :  getKitItemID
        ////'Function  :  
        ////'Input     :  
        ////'Output    : 
        ////'Remark    :
        ////'*******************************************************************
        //function getKitItemID() {

        //    var customer = $('#select_customer option:selected').text();
        //    var item = $('#select_kittype option:selected').text();

        //    $http.post(config.baseUrlApi + 'MWTS/getKitItemID', {
        //        "CustomerID": customer,
        //        "ItemName": item
        //    })
        //    .then(function (response) {

        //    });
        //}
        $scope.refresh1 = function () {
            $http.post(config.baseUrlApi + 'MWTS/getAllWO', {
                "CustomerID": "1",
                "KitType": "5314",
                "StartDate": "2017-07-25",
                "EndDate": "2017-09-25"
            }).then(function (response) {
             //   console.log("test", response);
                // studentData = response.data.result;
                //console.log("resulthahaha", studentData)
                // makeTable(studentData);

                // deliveryHighlight();
            });
        }
        //'*******************************************************************
        //'Title     :  refresh
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : generate data and display first table when refresh is clicked 
        //'*******************************************************************
        $scope.refresh = function () {

            // $("#tracking-report-table1").hide();
            // $("#tracking-report-table").show();

            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();
            // var type = $('#select_customerkittype option:selected').text();
            var type = $("#input-customerkittype").val();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();

            $("#tracking-report-table").html();
            $("#tracking-report-table1").html();

            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var KitItemID = 0;
            var fnGetMaxPartCount = 0;



            promiseArray.push(
            $http.post(config.baseUrlApi + 'MWTS/getKitItemID', {
                "CustomerID": $scope.custID,
                "ItemName": item
            })
                );


            $q.all(promiseArray).then(function (response) {
             //   console.log("getKitItemID", response);
                if (response[0].data.result != null && response[0].data.result.length != 0) {
                    KitItemID = response[0].data.result[0]["itemID"];
                    $scope.KitItemID = KitItemID;

                    //     alert("id:" + $scope.KitItemID + " " + $scope.custID);

                    //this is fnGetMaxWOCount function 
                    //  console.log("fnGetMaxWOCount", $scope.KitItemID + " " + startDate + " " + endDate + " " + $scope.custID);
                    //promiseArray2.push(
                    //$http.post(config.baseUrlApi + 'MWTS/fnGetMaxWOCount', {
                    //    "KitType": $scope.KitItemID,
                    //    "startDate": startDate,
                    //    "endDate": endDate,
                    //    "CustomerID": $scope.custID,
                    //})
                    //    );


                    //$q.all(promiseArray2).then(function (response) {
                    //  //  console.log("fnGetMaxWOCount", response[0].data.result);
                    //    if (response[0].data.result.length != 0) {
                    //        $scope.maxRowcount = response[0].data.result[0]["woidCount"];
                    //    }
                    //});

                    getAllWO();
                    // console.log("test5",$scope.finalData);
                }
            });

            //todo:findMaxPartID  line:956  this is to create header, might not necessary
            //promiseArray3.push(
            //$http.post(config.baseUrlApi + 'MWTS/findMaxPartID', {
            //    "ParentItemID": $scope.KitItemID,
            //    "startDate": startDate,
            //    "endDate": endDate,
            //    "CustomerID": $scope.custID,
            //})
            //    );


        }

        //'*******************************************************************
        //'Title     :  createSelect
        //'Function  :  create dropDown list
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function createSelect(rawData, itemName) {
            //console.log("itemName", itemName);
            // console.log("rawdata", rawData);
            var myDiv = document.getElementById("select_" + itemName);
            myDiv.innerHTML = "";


            if (itemName == "customer") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["customerName"]).trim();//Subcon QC
                    option.text = String(rawData[i]["customerName"]).trim();
                    myDiv.appendChild(option);
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
                $("#select_customer").val($scope.currentRoute);
            }

            if (itemName == "kittype") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["kitType"]).trim();//Subcon QC
                    option.text = String(rawData[i]["kitType"]).trim();
                    myDiv.appendChild(option);
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
                $("#select_kittype").val($scope.currentRoute);
            }

            if (itemName == "detail") {
                if (rawData != undefined) {
                    $("#detail-report").show();

                    // var option1 = document.createElement("option");
                    // option1.value = "";
                    //  option1.text = "";
                    // myDiv.appendChild(option1);


                    for (var i = 0; i < rawData.length; i++) {
                        var option = document.createElement("option");
                        option.value = String(rawData[i]).trim();//Subcon QC
                        option.text = String(rawData[i]).trim();
                        myDiv.appendChild(option);
                    }
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
                // $("#select_detail").val($scope.currentRoute);
            }

            //if (itemName == "customerkittype") {
            //    var option1 = document.createElement("option");
            //    option1.value = "";
            //    option1.text = "";
            //    myDiv.appendChild(option1);

            //    for (var i = 0; i < rawData.length; i++) {
            //        var option = document.createElement("option");
            //        option.value = String(rawData[i]["kitType"]).trim();//Subcon QC
            //        option.text = String(rawData[i]["kitType"]).trim();
            //        myDiv.appendChild(option);
            //    }
            //    // var selected = $("#current-route").val();
            //    // alert($scope.currentRoute);
            //    $("#select_customerkittype").val($scope.currentRoute);
            //}
        }


        //'*******************************************************************
        //'Title     :  getMeasurementReport
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.getMeasurementReport = function () {

            $('#report-modal').modal('show');
            document.getElementById("tracking-report-table1").innerHTML = "";

            var descr = $('#select_detail option:selected').text();
            $("#tracking-report-table").show();
            $("#tracking-report-table1").show();
            //  console.log(descr);
            $scope.descr = String(descr).trim();
            // console.log("getMeasurementReport", descr);
            GetallMeasurementParameters(descr);//testing
            // fnGetMeasurementParameters();//testing
            getAllWODetail(descr);
        }

        //'*******************************************************************
        //'Title     :  GetallMeasurementParameters
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : get all woid for this part type selection
        //'*******************************************************************
        function GetallMeasurementParameters(descr) {
            //eg:kittypeid = 5314
            //CLAMP RING (FULL COVERAGE): descr
            //5314: GlobalVar.kittypeid 
            //1: CustomerID

            //  console.log("get woid", $scope.WOID);
            //  console.log("GetallMeasurementParameters testinput", $scope.KitItemID);

            var promiseArray = [];
            var promiseArray0 = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();


            var WOID = "";
            var discardstatus = false;
            var oldwoid = "";
            var newwoid = "";

            // console.log("GetallMeasurementParameters input start", startDate);
            // console.log("GetallMeasurementParameters input start", endDate);
            $http.post(config.baseUrlApi + 'MWTS/GetallMeasurementParameters', {
                "ItemName": descr,
                "StartDate": startDate,
                "EndDate": endDate,
                "CustomerID": $scope.custID,
                "ParentItemID": $scope.KitItemID
            })
            .then(function (response) {
                // console.log("GetallMeasurementParameters", response);
                //makeTable(response.data.result, "#scrap-remark-table");

                if (response.data.result.length != 0) {


                    //todo:deletes
                    promiseArray.push(
                    $http.post(config.baseUrlApi + 'MWTS/deleteTS_TrackReportWO')
                        );

                    $q.all(promiseArray).then(function (response1) {
                        // console.log("error",response1);
                        for (var i = 0; i < response.data.result.length; i++) {
                            promiseArray0.push(
                            $http.post(config.baseUrlApi + 'MWTS/insertTS_TrackReportWO',
                                {
                                    "WOID": response.data.result[i]["workOrderNumber"]
                                })
                             );

                            $q.all(promiseArray).then(function (response) {
                                //   console.log("error1",response);
                                //if (response[0].data.result.length != 0) {

                                //    //todo:to check

                                //}
                                fnGetMeasurementParameters();//testing

                            });
                        }

                    });

                }

            });

        }


        //'*******************************************************************
        //'Title     :  fnGetMeasurementParameters
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function fnGetMeasurementParameters() {
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var startCol = 23;

            var tempopid = "0";
            var tempid = "0";


            $http.get(config.baseUrlApi + 'MWTS/fnGetMeasurementParameters')

                .then(function (response) {
                    // console.log("fnGetMeasurementParameters", response);
                    $scope.parameter = response;
                    for (var i = 0; i < response.data.result.length; i++) {
                        tempid = response.data.result[i][["parameterID"]];
                        tempopid = response.data.result[i]["operationID"];
                        // console.log("fnGetMeasurementParameters1", tempid + " " + tempopid);

                        promiseArray1.push(

                          $http.post(config.baseUrlApi + 'MWTS/fnGetMeasurementParameters1', {
                              "OperationID": tempopid,
                              "ParamterID": tempid
                          })
                            );

                    }



                    $q.all(promiseArray1).then(function (response) {
                        //console.log("fnGetMeasurementParameters promiseArray1", response);
                        // console.log("fnGetMeasurementParameters promiseArray1-2", $scope.DetailResult);
                        $scope.promiseArray1Data = response;

                        //console.log("fnGetMeasurementParameters promiseArray1", response.length);


                        for (var j = 0; j < response.length; j++) {
                            if (response[j].data.result.length != 0) {

                                var unit = String(response[j].data.result[0]["uom"]);

                                //console.log("fnGetMeasurementParameters promiseArray1 unit", unit);
                                //var unit1 = unit;

                                promiseArray2.push(
                                    $http.post(config.baseUrlApi + 'MWTS/getUnit', {
                                        "CodeDetailId": unit
                                    })
                                );
                            }


                        }

                        $scope.unit = [];
                        //console.log("fnGetMeasurementParameters promiseArray2 in", promiseArray2);
                        $q.all(promiseArray2).then(function (response) {
                            //console.log("fnGetMeasurementParameters promiseArray2", response);
                            if (response.length != 0) {
                                for (var j = 0; j < response.length; j++) {
                                    if (response[j].data.result.length != 0) {
                                        $scope.unit[j] = response[j].data.result[0]["description"];

                                    }
                                }
                            }

                        });

                    });

                });

        }



        //'*******************************************************************
        //'Title     :  makeTable
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : make the first table( QA tracking report)
        //'*******************************************************************
        function makeTable(data) {
            document.getElementById("tracking-report-table").innerHTML = "";

            var customer = $('#select_customer option:selected').text();
            var type = $("#input-customerkittype").val();
            var endDate = $('#endDate').val();

            //console.log("makeTable selector", $scope.selectorItem);
            //console.log("makeTable selector", $scope.selectorItemDetail);
            //console.log("makeTable main", $scope.promiseArray1Data);
            //console.log("makeTable data", data);
            var columns = [];
            // console.log("maketable after delete parent",data);

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = i + 1;
            }

            columns.push({
                field: "",
                columns: [{
                    field: "index",
                    title: "#",
                    width: 50
                }]
            });

            columns.push({
                field: "Customer",

                columns: [{
                    field: "woid",
                    title: "Work Number",
                    width: 150
                }]
            });


            columns.push({
                field: customer,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "gatePass",
                    title: "Gate Pass",
                    width: 150
                }]
            });

            columns.push({
                field: "Kit Type",

                columns: [{
                    field: "chamberID",
                    title: "Chamber ID",
                    width: 150
                }]
            });

            columns.push({
                field: type,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "releasedDate",
                    title: "Date Received",
                    width: 150
                }]
            });

            columns.push({
                field: "Report Date",
                columns: [{
                    field: "requestedDeliveryDate",
                    title: "Date Request Delivery",
                    width: 150
                }]
            });

            columns.push({
                field: endDate,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "empty",
                    title: " ",
                    width: 150
                }]
            });




            var itemArray = [];

            if ($scope.selectorItem != undefined) {
                for (var j = 1; j < $scope.selectorItem.length; j++) {
                    var id = $scope.selectorItemDetail[j]["itemID"];
                    // console.log("maketable making",id);

                    columns.push(

                        {
                            field: $scope.selectorItem[j],
                            headerAttributes: {
                                class: "red-background",
                                style: "background:#c9cfd8;"
                            },
                            columns: [{
                                field: "int1_" + id,
                                title: "Recycle Count",
                                width: 150
                            },
                            {
                                field: "string2_" + id,
                                title: "Serial No.",
                                width: 150
                            }
                            ]

                        }
                    );

                }
            }

            for (var i = 0; i < data.length; i++) {
                var newDate = convertDate(data[i]["releasedDate"]);
                data[i]["releasedDate"] = newDate;
                newDate = convertDate(data[i]["requestedDeliveryDate"]);
                data[i]["requestedDeliveryDate"] = newDate;
            }


            $("#tracking-report-table").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                        var row = sheet.rows[rowIndex];
                        // var color = $scope.highlight[rowIndex - 1]
                        //   console.log("kendo color1", rowIndex);
                        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            // row.cells[cellIndex].background = color;
                            if (rowIndex == 0) {
                                if (cellIndex % 2 == 1) {
                                    row.cells[cellIndex].background = "#afe9ea";
                                    row.cells[cellIndex].color = "#333";
                                }
                            }
                            // console.log("kendo color2", row.cells[cellIndex]);
                            // console.log("kendo color2-1", row.cells[cellIndex]);
                        }
                    }
                },
                dataSource: data,
                dataType: "json",
                selectable: "true",
                height: 550,

                //pageSize: 10,
                sortable: true,
                // pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: columns
            })

            createSelect($scope.selectorItem, "detail");

        }


        //'*******************************************************************
        //'Title     :  getAllWODetail
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : get the first part data for table2, the rest of parameter readingn is get at checkmeasurement function which is called at the end of this funcion
        //'*******************************************************************
        function getAllWODetail(descr) {
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];
            var promiseArray6 = [];
            var promiseArray7 = [];
            var promiseArray8 = [];
            var promiseArray9 = [];
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();

            //console.log("getAllWODetail KitItemID", $scope.KitItemID);
            //console.log("getAllWODetail CustomerID", $scope.custID);
            //console.log("getAllWODetail descr", descr);





            promiseArray.push(
                $http.post(config.baseUrlApi + 'MWTS/getAllWODetail1', {
                    "ParentItemID": $scope.KitItemID,
                    "CustomerID": $scope.custID,
                    "ItemName": descr,
                    "StartDate": startDate,
                    "EndDate": endDate
                })
            );


            $q.all(promiseArray).then(function (response) {
                //console.log("getAllWODetail response", response);
                //console.log("getAllWODetail", $scope.finalData1)

                $scope.DetailResult = response[0].data.result;


                for (var i = 0; i < response[0].data.result.length; i++) {

                    var WOID = response[0].data.result[i]["workOrderNumber"];
                    //console.log("getAllWODetail1", WOID);
                    promiseArray1.push(
                        $http.post(config.baseUrlApi + 'MWTS/checkparentwoid', {
                            "WOID": WOID
                        })


            );

                }


                //console.log("checkparentwoid11", promiseArray1);
                //console.log("checkparentwoid11 detail", $scope.DetailResult);
                $q.all(promiseArray1).then(function (response) {
                    // console.log("checkparentwoid11", response);
                    for (var j = 0; j < response.length; j++) {//for loop1
                        $scope.DetailResult[j]["isParent"] = true;
                        if (response[j].data.result != null && response[j].data.result.length == 0) {
                            $scope.DetailResult[j]["isParent"] = false;
                            // console.log("parent", response[j].data.result);
                            var WOID = $scope.DetailResult[j]["workOrderNumber"];

                            promiseArray2.push(
                            $http.post(config.baseUrlApi + 'MWTS/getwostatus', {
                                "WOID": WOID,
                                "Index": j
                            })
                                );


                        }
                        //else {
                        //    // //todo: line279

                        //    // // console.log("parent", response[j].data.result);
                        //    // var WOID = response[j].data.result[0]['woid'];
                        //    //// var WOID = $scope.DetailResult[j]["workOrderNumber"];
                        //    // promiseArray2.push(
                        //    // $http.post(config.baseUrlApi + 'MWTS/getwostatus', {
                        //    //     "WOID": WOID,
                        //    //     "Index": j
                        //    // })
                        //    //     );


                        //    // console.log("loop2");
                        //}
                    }

                    $q.all(promiseArray2).then(function (response) {
                        //   console.log("loop1 result", response);

                        for (var k1 = 0; k1 < $scope.DetailResult.length; k1++) {
                            $scope.DetailResult[k1]["oldwoid"] = "";
                            $scope.DetailResult[k1]["discard"] = false;
                        }

                        for (var k = 0; k < response.length; k++) {
                            var column = parseInt(response[k].data.result[0]["column1"]);
                            //  console.log(column);
                            //$scope.DetailResult[column]["oldwoid"] = "";
                            //$scope.DetailResult[column]["discard"] = false;
                            if (response[k].data.result[0]["woStatus"] == "Discard") {
                                //true
                                //cont = false;
                                $scope.DetailResult[column]["cont"] = false;
                                $scope.DetailResult[column]["discard"] = true;
                                // $scope.DetailResult[k]["oldwoid"] = "";
                            }
                            //else {
                            // $scope.DetailResult[k]["cont"] = true;
                            //var WOID = $scope.DetailResult[column]["workOrderNumber"];
                            //        promiseArray3.push(
                            //        $http.post(config.baseUrlApi + 'MWTS/getoldWOID', {
                            //            "WOID": WOID
                            //        })
                            //        );


                            // }
                        }

                        for (var k2 = 0; k2 < $scope.DetailResult.length; k2++) {
                            var WOID = $scope.DetailResult[k2]["workOrderNumber"];
                            promiseArray3.push(
                            $http.post(config.baseUrlApi + 'MWTS/getoldWOID', {
                                "WOID": WOID
                            })
                            );
                        }

                        // console.log("loop1 discard oldwoid", $scope.DetailResult);

                        $q.all(promiseArray3).then(function (response) {
                            // console.log("loop1-2", response);

                            for (var h1 = 0; h1 < $scope.DetailResult.length; h1++) {
                                $scope.DetailResult[h1]["woid"] = $scope.DetailResult[h1]["workOrderNumber"];
                            }

                            for (var h = 0; h < response.length; h++) {
                                if (response[h].data.result.length != 0) {
                                    var tempwoid = response[h].data.result[0]["input"];

                                    var pos = getByWOID(tempwoid);
                                    if (pos != -1) {
                                        $scope.DetailResult[pos]['oldwoid'] = response[h].data.result[0]["linkWOID"];
                                        $scope.DetailResult[pos]['woid'] = response[h].data.result[0]["linkWOID"];
                                    }
                                }

                            }


                            //console.log("loop1 oldwoid", $scope.DetailResult);




                            for (var t = 0; t < $scope.DetailResult.length; t++) {
                                // console.log("loop1 info", $scope.DetailResult[t]["workOrderNumber"]);
                                // console.log("loop1 info1", $scope.DetailResult[t]["oldwoid"]);
                                var infowoid = "";

                                //  if ($scope.DetailResult[t]["oldwoid"] != "") {
                                //     infowoid = $scope.DetailResult[t]["oldwoid"];
                                // } else {
                                infowoid = $scope.DetailResult[t]["workOrderNumber"];
                                // }

                                // console.log("loop1 infowoid1", infowoid)

                                promiseArray4.push(
                                 $http.post(config.baseUrlApi + 'MWTS/getAllWODetail3', {
                                     "WOID": infowoid
                                 })
                             );

                                promiseArray5.push(
                                $http.post(config.baseUrlApi + 'MWTS/getAllWODetail4', {
                                    "WOID": infowoid
                                })
                            );

                                promiseArray8.push(
                                $http.post(config.baseUrlApi + 'MWTS/getAllWODetailRest', {
                                    "WOID": infowoid
                                })
                            );
                            }
                            $q.all(promiseArray8).then(function (response) {

                                // console.log("loop1 rest", response);

                                for (var re = 0; re < response.length; re++) {
                                    $scope.DetailResult[re]["chamberID"] = "";
                                    $scope.DetailResult[re]["endDate"] = "";
                                    $scope.DetailResult[re]["modifiedLeverVersion"] = "";
                                    $scope.DetailResult[re]["pmReason"] = "";
                                    $scope.DetailResult[re]["serialNumber"] = "";
                                    $scope.DetailResult[re]["serialNumber1"] = "";

                                    if (response[re].data.result.length != 0) {
                                        $scope.DetailResult[re]["chamberID"] = response[re].data.result[0]["chamberID"];
                                        $scope.DetailResult[re]["endDate"] = response[re].data.result[0]["endDate"];
                                        $scope.DetailResult[re]["modifiedLeverVersion"] = response[re].data.result[0]["modifiedLeverVersion"];
                                        $scope.DetailResult[re]["pmReason"] = response[re].data.result[0]["pmReason"];
                                        $scope.DetailResult[re]["serialNumber"] = response[re].data.result[0]["serialNumber"];
                                        $scope.DetailResult[re]["serialNumber1"] = response[re].data.result[0]["serialNumber1"];
                                    }
                                }




                                $q.all(promiseArray4).then(function (response) {
                                    // console.log("loop1 4", response);
                                    for (var d = 0; d < response.length; d++) {
                                        $scope.DetailResult[d]["counter"] = response[d].data.result[0]["counter"];
                                    }

                                    // console.log("loop1 4-1", $scope.DetailResult);



                                    //getIncomDef
                                    $q.all(promiseArray5).then(function (response) {
                                        //console.log("loop1 5", response);
                                        for (var d1 = 0; d1 < response.length; d1++) {
                                            $scope.DetailResult[d1]["fireno"] = response[d1].data.result[0]["counter"];


                                            var woid = $scope.DetailResult[d1]["workOrderNumber"]
                                            // console.log("loop6 input", woid);
                                            promiseArray6.push(
                                        $http.post(config.baseUrlApi + 'MWTS/getIncomDef', {
                                            "WOID": woid
                                        })
                                    );


                                        }


                                        $q.all(promiseArray6).then(function (response) {
                                            // console.log("loop1 6", response);
                                            for (var d2 = 0; d2 < response.length; d2++) {
                                                if (response[d2].data.result.length != 0) {

                                                    // console.log("loop1 6-2", response[d2].data.result[0]["parentWOID"]);
                                                    var pid = $scope.DetailResult[d2]["workOrderNumber"];
                                                    if (response[d2].data.result[0]["arentWOID"] != null) {
                                                        pid = response[d2].data.result[0]["arentWOID"]
                                                    }
                                                    woid = response[d2].data.result[0]["woid"];
                                                    promiseArray7.push(

                                                        $http.post(config.baseUrlApi + 'MWTS/getIncomDef1', {
                                                            "WOID": woid,
                                                            "LinkWOID": pid
                                                        })
                                                            );


                                                    promiseArray9.push(

                                                         $http.post(config.baseUrlApi + 'MWTS/getimproVDef1', {
                                                             "WOID": woid,
                                                             "LinkWOID": pid
                                                         })
                                                             );


                                                }
                                            }

                                            $q.all(promiseArray9).then(function (response) {
                                                //console.log("response9", response);
                                                var defect = "";

                                                for (var u = 0; u < response.length; u++) {
                                                    if (response[u].data.result.length == 0) {
                                                        defect = "";
                                                    } else
                                                        if (response[u].data.result.length == 1) {
                                                            defect = response[u].data.result[0]["defectParameterName"];
                                                        } else {
                                                            for (var u1 = 0; u1 < response[u].data.result.length; u1++) {
                                                                if (u1 == 0) {
                                                                    defect = response[u].data.result[0]["defectParameterName"];
                                                                } else {
                                                                    defect = defect + "," + response[u].data.result[u1]["defectParameterName"];
                                                                }

                                                            }
                                                        }

                                                    $scope.DetailResult[u]["defect1"] = defect;
                                                }


                                                $q.all(promiseArray7).then(function (response) {
                                                //    console.log("response7", response);
                                                    //to check:line750
                                                    var defect = "";
                                                    //console.log("loop1 7", response);
                                                    for (var u = 0; u < response.length; u++) {
                                                        if (response[u].data.result.length == 0) {
                                                            defect = "";
                                                        } else
                                                            if (response[u].data.result.length == 1) {
                                                                defect = response[u].data.result[0]["defectParameterName"];
                                                            } else {
                                                                for (var u1 = 0; u1 < response[u].data.result.length; u1++) {
                                                                    if (u1 == 0) {
                                                                        defect = response[u].data.result[0]["defectParameterName"];
                                                                    } else {
                                                                        defect = defect + "," + response[u].data.result[u1]["defectParameterName"];
                                                                    }

                                                                }
                                                            }

                                                        $scope.DetailResult[u]["defect"] = defect;
                                                    }
                                                    checkmeasurement(descr);

                                                });

                                            });
                                        });
                                    });

                                });

                            });
                        });
                    });

                });


            });


        }



        //'*******************************************************************
        //'Title     :  checkmeasurement
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to get measurement data for table 2
        //           : noted : is the data is parent, make "isParent" = true   if the data is discard, mark "discard" = true
        //'*******************************************************************
        function checkmeasurement(descr) {


            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];

            var nopts = 0;

            for (var i1 = 0; i1 < $scope.DetailResult.length; i1++) {
                var WOID = $scope.DetailResult[i1]["workOrderNumber"]; //selectedWO
                var oldwoid = $scope.DetailResult[i1]["oldwoid"];
                var partid = $scope.DetailResult[i1]["itemID"];



                promiseArray.push(
                $http.post(config.baseUrlApi + 'MWTS/getminprocopeq', {
                    "WOID": WOID
                })
                );

            }

            $q.all(promiseArray).then(function (response) {
                //console.log("checkmeasurement2", response);
                for (var j = 0; j < response.length; j++) {
                    $scope.DetailResult[j]["minprocoptseq"] = 0;
                    if (response[j].data.result[0]["optno"] != null) {
                        $scope.DetailResult[j]["minprocoptseq"] = response[j].data.result[0]["optno"];
                    }

                }
                // console.log("checkmeasurement1", $scope.DetailResult);
                for (var i = 0; i < $scope.DetailResult.length; i++) {

                    promiseArray5.push(
                    $http.post(config.baseUrlApi + 'MWTS/checkparentwoid', {
                        "WOID": $scope.DetailResult[i]["woid"]
                    })
                );

                    var WOID = String($scope.DetailResult[i]["workOrderNumber"]).trim(); //selectedWO
                    var oldwoid = String($scope.DetailResult[i]["oldwoid"]).trim();
                    var partid = String($scope.DetailResult[i]["itemID"]).trim();

                    //line 1871
                    //if (oldwoid != "") {
                    //    //todo from 1394 might shift out this for loop to another loop/function
                    //}
                    // console.log("checkmeasurement6 input: " + WOID + " | " + $scope.DetailResult[i]["minprocoptseq"] + " | " + oldwoid);
                    promiseArray1.push(
                                $http.post(config.baseUrlApi + 'MWTS/checkmeasurement6', {
                                    "WOID": WOID,
                                    "ProcOpSeq": $scope.DetailResult[i]["minprocoptseq"],
                                    //"OldWOID": oldwoid
                                    "OldWOID": ""
                                })
                            );
                }

                $q.all(promiseArray5).then(function (response) {
                    // console.log("buildData response21", response);

                    for (var ii = 0; ii < response.length; ii++) {
                        $scope.DetailResult[ii]["parent"] = "";
                        if (response[ii].data.result.length != 0) {
                            $scope.DetailResult[ii]["parent"] = response[ii].data.result[0]["ParentWOID"];
                        }
                    }

                    $q.all(promiseArray1).then(function (response) {
                        // console.log("checkmeasurement6 output", response);
                        var tempDetail6 = response;
                        for (var i = 0; i < response.length; i++) {// for each row
                            var tempid = 0;
                            var tempopid = 0;
                            if (response[i].data.result.length != 0) {

                                for (var j = 0; j < response[i].data.result.length; j++) { // for each parameter
                                    tempopid = response[i].data.result[j]["operationID"];
                                    tempid = response[i].data.result[j]["parameterID"];
                                    //console.log("debugger i j", i + " " + j);
                                    //console.log("debugger tempopid tempid", tempopid + " " + tempid);
                                    //console.log("debugger detail",$scope.DetailResult);
                                    //$scope.DetailResult[i]["tempopid"] = tempopid;
                                    //$scope.DetailResult[i]["tempid"] = tempid;
                                    promiseArray2.push(
                                                $http.post(config.baseUrlApi + 'MWTS/checkmeasurement7', {
                                                    "OperationID": tempopid,
                                                    "ParamterID": tempid,
                                                    "Index": i
                                                })
                                            );
                                }

                            }
                        }

                        $q.all(promiseArray2).then(function (response) {
                            //console.log("checkmeasurement7 output", response);
                            var tempResponse = response;
                            for (var t = 0; t < response.length; t++) {

                                var unit = response[t].data.result[0]["uom"];
                                var index = response[t].data.result[0]["column1"];

                                promiseArray3.push(
                                          $http.post(config.baseUrlApi + 'MWTS/getUnit', {
                                              "CodeDetailId": unit,
                                              "Index1": t,
                                              "Index": index
                                          })
                                      );
                            }

                            $q.all(promiseArray3).then(function (response) {
                                //console.log("getUnit1 output", response);
                                //console.log("getUnit1 test", tempResponse);
                                //console.log("getUnit1 temp", tempDetail6);
                                //console.log("getUnit1 1", $scope.DetailResult);
                                for (var i1 = 0; i1 < response.length; i1++) {
                                    tempResponse[i1]["unit"] = "";
                                    if (response[i1].data.result.length != 0) {
                                        tempResponse[i1].data.result[0]["unit"] = response[i1].data.result[0]["description"];
                                    }

                                }

                                // console.log("checkmeasurement8 tempresponse", tempResponse);
                                for (var i0 = 0; i0 < response.length; i0++) {
                                    var paraid = tempResponse[i0].data.result[0]["paramterID"];
                                    var tempno = tempResponse[i0].data.result[0]["noofReading"];
                                    var column1 = tempResponse[i0].data.result[0]["column1"];
                                    var unit = tempResponse[i0].data.result[0]["unit"];

                                    var tempwoid = $scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]["workOrderNumber"];
                                    var oldwoid = $scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]["woid"];
                                    // var partitemid = $scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]d[];3
                                    if ($scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]["oldwoid"] != "") {
                                        $scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]["oldwoid"];
                                    }
                                    var tempopid = tempResponse[i0].data.result[0]["column2"];
                                    var partitemid = $scope.DetailResult[parseInt(tempResponse[i0].data.result[0]["column1"])]["itemID"];
                                    //console.log("checkmeasurement8 1",);
                                    //console.log("checkmeasurement8 input1", tempopid + "|" + tempwoid + "|" + partitemid + "|" + paraid);
                                    //console.log("checkmeasurement8 input2", tempno);
                                    if (tempno != "") {
                                        //line1931
                                        nopts = parseInt(tempno);
                                        if (nopts > 50) {
                                            alert("No of reading points > 50:" + nopts + ",changed to 50.");//necessary
                                            nopts = 50;
                                        }
                                    } else {
                                        nopts = 0;
                                    }

                                    if (nopts != 0) {
                                        // console.log("checkmeasurement8 pre", $scope.DetailResult);
                                        // console.log("checkmeasutement8 parameter", $scope.parameter);
                                        for (var i2 = 0; i2 < nopts; i2++) {
                                            // console.log("checkmeasurement8 input3", tempwoid + "|" + tempopid + "|" + i2 + "|" + partitemid + "|" + paraid + "|"+oldwoid+"|end");
                                            var isValid = false;
                                            for (var i3 = 0; i3 < $scope.parameter.data.result.length; i3++) {
                                                if (String(paraid).trim() == String($scope.parameter.data.result[i3]["parameterID"]).trim()) {
                                                    //  console.log("checkmeasurement8 isvalid0", tempopid + " " + ($scope.parameter.data.result[i3]["parameterID"] + " " + paraid + " " + $scope.parameter.data.result[i3]["operationID"]));
                                                    if (String(tempopid).trim() == String($scope.parameter.data.result[i3]["operationID"]).trim()) {
                                                        isValid = true;
                                                        //     console.log("checkmeasurement8 isvalid1", $scope.parameter.data.result[i3]);
                                                    }
                                                }
                                            }

                                            // console.log("checkmeasurement8 isvalid", isValid);
                                            if (isValid) {
                                                promiseArray4.push(
                                                            $http.post(config.baseUrlApi + 'MWTS/checkmeasurement8', {
                                                                "OperationID": tempopid,
                                                                "WOID": tempwoid,
                                                                "PtsIndex": i2,
                                                                "ItemID": partitemid,
                                                                "ParamterID": paraid,
                                                                "Index": column1,
                                                                "Unit": unit
                                                            })
                                                        );

                                                if (tempwoid != oldwoid) {
                                                    promiseArray4.push(
                                                                $http.post(config.baseUrlApi + 'MWTS/checkmeasurement8', {
                                                                    "OperationID": tempopid,
                                                                    "WOID": oldwoid,
                                                                    "PtsIndex": i2,
                                                                    "ItemID": partitemid,
                                                                    "ParamterID": paraid,
                                                                    "Index": column1,
                                                                    "Unit": unit
                                                                })
                                                            );
                                                }


                                            }


                                        }



                                    }

                                }
                                //console.log("checkmeasurement8 Detail", $scope.DetailResult);
                                // console.log("checkmeasurement8 promiseArray4", promiseArray4);
                                $q.all(promiseArray4).then(function (response) {

                                    //  console.log("checkmeasurement8 output", response)
                                    //  console.log("checkmeasurement8 output1", $scope.DetailResult)
                                    //todo: !important for all the data, if paraid is the same, they should be in the same column
                                    //paraid is refer to [SIMAPS].[Process].[Parameter] prime number
                                    //also continue from line 1970
                                    var dataBLK = [];
                                    var dataBLK1 = [];
                                    for (var e = 0; e < response.length; e++) {
                                    //    console.log("checkmeasurement8 output2 e", response[e].data.result[0]);

                                        if (response[e].data.result.length != 0) {
                                            //  console.log("checkmeasurement8 output2", response[e].data.result[0]);
                                            paraid = response[e].data.result[0]["opid"];
                                            if (dataBLK[paraid] == undefined) {
                                                dataBLK[paraid] = [];
                                            } else {
                                                dataBLK[paraid].push(response[e].data.result[0]);
                                            }
                                        }

                                    }
                                    //   console.log("checkmeasurement8 after", dataBLK);
                                    var paraidArray = [];
                                    for (var key in dataBLK) {
                                        paraidArray.push(key);
                                    }
                                    //  console.log("checkmeasurement8 after1", paraidArray);
                                    //  console.log("checkmeasurement8 after2", $scope.promiseArray1Data);
                                    //todo: probably can get category instead of paraid



                                    var data = $scope.DetailResult;
                                    buildData(response, paraidArray, descr, data)
                                });
                            });


                        });
                    });

                });
            });

        }


        //'*******************************************************************
        //'Title     :  makeTable2
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make the 2nd table
        //'*******************************************************************
        function makeTable2(data, paraidArray, descr, response) {
         //   console.log("makeTable2 paraidArray", paraidArray);
         //   console.log("makeTable2", $scope.promiseArray1Data);
            //console.log("makeTable2 parameter", $scope.parameter);
         //   console.log("makeTable2 data", data);
            //console.log("makeTable2 response", response);

            var customer = $('#select_customer option:selected').text();
            var type = $("#input-customerkittype").val();
            var endDate = $('#endDate').val();

            var inputAlb = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX"];

            var datatemp = [];

            //if the item is discard or the item is parent of another, dont display it, therefore, remove the item from json file first
            for (var p1 = 0; p1 < data.length; p1++) {
                if (data[p1]["discard"] != true && data[p1]["isParent"] == false) {
                    //delete data[p1];
                    datatemp.push(data[p1]);
                    // console.log("discard",p1);
                    // data.splice(p1,1);
                }
            }
            data = datatemp;



            //indexing the item
            for (var p = 0; p < data.length; p++) {
                if (data[p] != undefined) {
                    data[p]["index"] = p + 1;
                }

            }
            var columns = [];
            columns.push({
                field: "",
                columns: [{
                    field: "index",
                    title: "#",
                    width: 50
                }]
            });

            columns.push({
                field: "Customer",
                columns: [{
                    field: "woid",
                    title: "Work Number",
                    width: 200
                }]
            });

            columns.push({
                field: customer,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "kitID",
                    title: "Kit ID",
                    width: 150
                }]
            });


            columns.push({
                field: "Kit Type",
                columns: [{
                    field: "group1",
                    title: "Part ID",
                    width: 150
                }]
            });

            columns.push({
                field: type,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "string2",
                    title: "Serial NO.",
                    width: 150
                }]
            });

            columns.push({
                field: "Part Type",
                columns: [{
                    field: "issueDate",
                    title: "Date Received",
                    width: 150
                }]
            });

            columns.push({
                field: descr,
                headerAttributes: {
                    class: "red-background",
                    style: "background:#afe9ea;"
                },
                columns: [{
                    field: "endDate",
                    title: "Date Completed",
                    width: 150
                }]
            });


            columns.push({
                field: endDate,
                columns: [{
                    field: "dueDate",
                    title: "Prod Start Date",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "string1",
                    title: "Gate Pass",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "chamberID",
                    title: "chamber ID",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "pmReason",
                    title: "PM Reason",
                    width: 150
                }]
            });


            columns.push({
                field: "",
                columns: [{
                    field: "int1",
                    title: "Cycle Count",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "int3",
                    title: "RF(Acc)",
                    width: 150
                }]
            });


            columns.push({
                field: "",
                columns: [{
                    field: "rfCur",
                    title: "RF(Cur)",
                    width: 150
                }]
            });



            columns.push({
                field: "",
                columns: [{
                    field: "int4",
                    title: "Wafer Cnt(Acc)",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "wafCur",
                    title: "Wafer Cnt(Cur)",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "refAcc",
                    title: "Refuribish Cnt(Acc)",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "counter",
                    title: "No. of Rework",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "fireno",
                    title: "No. of Firing",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "defect",
                    title: "Incoming Visual Defect",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "defect1",
                    title: "In-process Visual Defect",
                    width: 150
                }]
            });

            columns.push({
                field: "",
                columns: [{
                    field: "modifiedLeverVersion",
                    title: "Modified Level",
                    width: 150
                }]
            });



            //combine $scope.promiseArray1Data to $scope.DetailResult
            var paraidName = [];
          //  console.log("testh", paraidArray);
         //   console.log("testh1", $scope.promiseArray1Data);

            for (var p = 0; p < paraidArray.length; p++) {
                var paraidtemp = paraidArray[p];
                for (var p1 = 0; p1 < $scope.promiseArray1Data.length; p1++) {
                    //  if (String(paraidtemp).trim() == String($scope.promiseArray1Data[p1].data.result[0]["paramterID"]).trim()) {
                    if (String(paraidtemp).trim() == String($scope.promiseArray1Data[p1].data.result[0]["opid"]).trim()) {
                        paraidName.push($scope.promiseArray1Data[p1].data.result[0]["operationName"]);
                    }
                }
            }

         //   console.log("before unique paraidName", paraidName);

            //var uniqueNames = [];
            //$.each(paraidName, function (i, el) {
            //    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            //});



            //console.log("unique", uniqueNames);
            //console.log("test pass", paraidArray);

            //var nameData = [];
            //for (var i = 0; i < uniqueNames.length; i++) {
            //    nameData[i]["value"] = [];
            //    nameData[i]["operationName"] = uniqueNames[i];
            //    var name = String(uniqueNames[i]).trim();
            //    for (var j = 0; j < $scope.promiseArray1Data.length; j++) {
            //        if (String($scope.promiseArray1Data[j].data.result[0]["operationName"]).trim() == name) {
            //            var id = (String($scope.promiseArray1Data[j].data.result[0]["opid"])).trim();
            //            var isExist = false;
            //            for (var k = 0; k < nameData[i].length;k++){
            //                if (nameData[i]["value"][k] == id) {
            //                    isExist = true;
            //                    break;
            //                }
            //            }
            //            if(!isExist){
            //                nameData[i]["value"].push(id);
            //            }
            //        }

            //    }
            //}

            //console.log("nameData", nameData);

            //for (var j = 0; j < nameData.length;j++){
            //    for (var k = 0; k < nameData[j]["value"].length; k++) {
            //        var paraid = nameData[j][k];
            //        var operationName = nameData[i]["operationName"];
            //        var columnpart = [];

            //        var length = data[0]["plength" + paraid];
            //        //inputAlb


            //        for (var test = 0; test < length; test++) {

            //            columnpart.push({
            //                field: "value" + paraid + "With" + test,
            //                title: inputAlb[test],
            //                width: 50

            //            }
            //             );
            //        }

            //        columnpart.push({
            //            field: "parameter" + paraid,
            //            title: "Parameter",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "ave" + paraid,
            //            title: "Ave.",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "unit" + paraid,
            //            title: "Unit.",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "result" + paraid,
            //            title: "Result.",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "min" + paraid,
            //            title: "Min.",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "max" + paraid,
            //            title: "Max.",
            //            width: 150
            //        });
            //        columnpart.push({
            //            field: "range" + paraid,
            //            title: "Range",
            //            width: 150
            //        });

            //        if (j % 2 == 0) {
            //            columns.push(

            //            {
            //                title: operationName,
            //                columns: columnpart
            //                , headerAttributes: {
            //                    class: "red-background",
            //                    style: "background:#afe9ea;"
            //                }
            //            }
            //            );

            //        } else {

            //            columns.push(

            //            {
            //                title: operationName,
            //                columns: columnpart,
            //                width: 150
            //            }
            //            );
            //        }

            //    }
            //}

            //  for (var j = 0; j < paraidArray.length; j++) {
            for (var j = 0; j < $scope.nameData.length; j++) {
                // var paraid = paraidArray[j];
                var paraid = j;
                var operationName = $scope.nameData[j]['operationName'];

                //for (var p1 = 0; p1 < $scope.promiseArray1Data.length; p1++) {
                //    if (String(paraid).trim() == String($scope.promiseArray1Data[p1].data.result[0]["opid"]).trim()) {
                //        operationName = String($scope.promiseArray1Data[p1].data.result[0]["operationName"]).trim();
                //        break;
                //    }
                //}



                //  console.log("maketable2 alert", "ave" + paraid);

                var columnpart = [];

                var length = data[0]["plength" + paraid];
                //inputAlb


                for (var test = 0; test < length; test++) {

                    columnpart.push({
                        field: "value" + paraid + "With" + test,
                        title: inputAlb[test],
                        width: 50

                    }
                     );
                }

                columnpart.push({
                    field: "parameter" + paraid,
                    title: "Parameter",
                    width: 150
                });
                columnpart.push({
                    field: "ave" + paraid,
                    title: "Ave.",
                    width: 150
                });
                columnpart.push({
                    field: "unit" + paraid,
                    title: "Unit.",
                    width: 150
                });
                columnpart.push({
                    field: "result" + paraid,
                    title: "Result.",
                    width: 150
                });
                columnpart.push({
                    field: "min" + paraid,
                    title: "Min.",
                    width: 150
                });
                columnpart.push({
                    field: "max" + paraid,
                    title: "Max.",
                    width: 150
                });
                columnpart.push({
                    field: "range" + paraid,
                    title: "Range",
                    width: 150
                });

                if (j % 2 == 0) {
                    columns.push(

                    {
                        title: operationName,
                        columns: columnpart
                        , headerAttributes: {
                            class: "red-background",
                            style: "background:#afe9ea;"
                        }
                    }
                    );

                } else {

                    columns.push(

                    {
                        title: operationName,
                        columns: columnpart,
                        width: 150
                    }
                    );
                }
            }

            for (var i = 0; i < data.length; i++) {
                var newDate = convertDate(data[i]["dueDate"]);
                data[i]["dueDate"] = newDate;
                newDate = convertDate(data[i]["endDate"]);
                data[i]["endDate"] = newDate;
                newDate = convertDate(data[i]["issueDate"]);
                data[i]["issueDate"] = newDate;
            }

            // console.log("maketable before test", columns);
            //  var data = $scope.DetailResult;
        //    console.log("final data2", data);
            $("#tracking-report-table1").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                excelExport: function (e) {// assign color to cells when export table
                    var sheet = e.workbook.sheets[0];
                    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                        var row = sheet.rows[rowIndex];
                        for (var cellIndex = 0; cellIndex < 8; cellIndex++) {
                            if (rowIndex == 0) {
                                if (cellIndex % 2 == 1) {
                                    row.cells[cellIndex].background = "#afe9ea";
                                    row.cells[cellIndex].color = "#333";
                                }
                            }
                            var value = String(row.cells[cellIndex].value);

                            if (value.indexOf("FAIL:") != -1) {
                                row.cells[cellIndex].value = value.replace("FAIL:", "");
                                row.cells[cellIndex].background = "#ff3300";
                                row.cells[cellIndex].color = "#333";

                            }
                        }

                        for (var cellIndex = 8; cellIndex < row.cells.length; cellIndex++) {
                            var value1 = String(row.cells[cellIndex].value);
                          //  console.log("export", value1);
                            if (value1.indexOf("FAIL:") != -1) {
                                row.cells[cellIndex].value = value1.replace("FAIL:", "");
                                row.cells[cellIndex].background = "#ff3300";
                                row.cells[cellIndex].color = "#333";

                            }
                        }
                    }
                },
                dataSource: data,
                dataType: "json",
                selectable: "true",
                height: 550,

                //pageSize: 10,
                sortable: false,
                // pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: false,
                resizable: true,
                columns: columns
            })


            highlightFail();
        }


        //'*******************************************************************
        //'Title     :  highlightFail
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : if the item failed, result need to be highlighted, therefore, the item is assigned prefix of "Fail:".  check through table cells, highlight the cell red 
        //           : if "Fail:" is found, and remove "Fail:"
        //'*******************************************************************
        function highlightFail() {
            var tbody = $('tbody');
            var threshold;
            //  console.log("highlight", tbody);
            for (var i = 0; i < tbody.children().children().length; i++) {
                //  console.log($(tbody.children().children()[i]).html());
                var content = $(tbody.children().children()[i]).html();
                if (content.indexOf("FAIL:") != -1) {
                    $(tbody.children().children()[i]).addClass("red-background");
                    $(tbody.children().children()[i]).html(content.replace("FAIL:", ""));
                }
            }
        }


        function searchInNameData(paraid, nameData) {
            for (var i = 0; i < nameData.length; i++) {
                for (var j = 0; j < nameData[i]['value'].length; j++) {
                    if (nameData[i]['value'][j] == paraid) {
                        return i;
                    }
                }
            }
            return -1;
        }
        function searchSpeinParameter(opid) {
            for (var i = 0; i < $scope.parameter.data.result.length; i++) {
                if ($scope.parameter.data.result[i]['operationID'] == opid) {
                    return $scope.parameter.data.result[i]['specification'];
                }
            }

            return '';
        }

        //'*******************************************************************
        //'Title     :  buildData
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : preprocess Data to be used in makeTable2
        //'*******************************************************************
        function buildData(response, paraidArray, descr, data) {
            //console.log("buildData response", response);
            //console.log("buildData paraidArray", paraidArray);
            var uniqueOperationID = [];
            //console.log("buildData test1 parameter", $scope.parameter);
            // console.log("buildData DetailResult", data);
            var promiseArray = [];
            var valueArray = [];
            //for (var ii = 0; ii < paraidArray.length;ii++){
            //    valueArray[paraidArray[ii]] = [];
            //}
            // build ave unit result min max range parameter fuekds

            var paraidName = [];
            // console.log("testh", paraidArray);
            // console.log("testh1", $scope.promiseArray1Data);

            for (var p = 0; p < paraidArray.length; p++) {
                var paraidtemp = paraidArray[p];
                for (var p1 = 0; p1 < $scope.promiseArray1Data.length; p1++) {
                    //  if (String(paraidtemp).trim() == String($scope.promiseArray1Data[p1].data.result[0]["paramterID"]).trim()) {
                    if (String(paraidtemp).trim() == String($scope.promiseArray1Data[p1].data.result[0]["opid"]).trim()) {
                        paraidName.push($scope.promiseArray1Data[p1].data.result[0]["operationName"]);
                    }
                }
            }

            //  console.log("before unique paraidName", paraidName);
            var uniqueNames = [];
            $.each(paraidName, function (i, el) {
                if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });



            //    console.log("unique", uniqueNames);
            //   console.log("test pass", paraidArray);

            var nameData = [];
            for (var i = 0; i < uniqueNames.length; i++) {
                nameData[i] = [];
                nameData[i]["value"] = [];
                nameData[i]["operationName"] = uniqueNames[i];
                var name = String(uniqueNames[i]).trim();
                for (var j = 0; j < $scope.promiseArray1Data.length; j++) {
                    if (String($scope.promiseArray1Data[j].data.result[0]["operationName"]).trim() == name) {
                        var id = (String($scope.promiseArray1Data[j].data.result[0]["opid"])).trim();
                        var isExist = false;
                        for (var k = 0; k < nameData[i].length; k++) {
                            if (nameData[i]["value"][k] == id) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            nameData[i]["value"].push(id);
                        }
                    }

                }
            }

            //  console.log("nameData", nameData);

            $scope.nameData = nameData;
            for (var i = 0; i < data.length; i++) {

                //if got old woid display oldwoid, if got parent woid display parent woid
                var inputwoid = data[i]["woid"];
                if (data[i]["oldwoid"] != "") {
                    inputwoid = data[i]["oldwoid"];
                }

                if (data[i]["parent"] != "") {
                    inputwoid = data[i]["parent"];
                }


                for (var j = 0; j < $scope.promiseArray1Data.length; j++) {
                    //  var paraid = String($scope.promiseArray1Data[j].data.result[0]["paramterID"]).trim();
                    var paraid1 = String($scope.promiseArray1Data[j].data.result[0]["opid"]).trim();

                    var paraid = searchInNameData(paraid1, nameData);
                    //       console.log("paraid1", paraid);
                    //todo check != -1


                    if (data[i]["ave" + paraid] == undefined) {
                        data[i]["ave" + paraid] = "";
                    }

                    if (data[i]["unit" + paraid] == undefined) {
                        data[i]["unit" + paraid] = "";
                    }

                    if (data[i]["result" + paraid] == undefined) {
                        data[i]["result" + paraid] = "";
                    }


                    if (data[i]["range" + paraid] == undefined) {
                        data[i]["range" + paraid] = "";
                    }
                    if (data[i]["parameter" + paraid] == undefined) {
                        data[i]["parameter" + paraid] = "";
                    }

                    if (data[i]["parameterid" + paraid] == undefined) {
                        data[i]["parameterid" + paraid] = "";
                    }

                }

            }
            //    console.log("buildData test13", data);
            for (var k = 0; k < response.length; k++) {
                //      console.log("response is", response[k].data.result[0]);
                if (response[k].data.result.length != 0) {
                    //  console.log("buildData loop10", response[k].data.result[0]);
                    var result = response[k].data.result[0]["result"];
                    var avg = response[k].data.result[0]["ave"];
                    var parastr = response[k].data.result[0]["value"];
                    var stravepass = response[k].data.result[0]["avePass"];
                    var strpass = response[k].data.result[0]["pass"];
                    var index = parseInt(response[k].data.result[0]["column1"]);
                    var paraid1 = String(response[k].data.result[0]["opid"]).trim();
                    var unit = response[k].data.result[0]["unit"];

                    var paraid = searchInNameData(paraid1, nameData);
                    //     console.log("paraid test", k + " paraid:" + paraid + " paraid1 " + paraid1);

                //    console.log("test2121", parastr + " " + "index:" + index + " paraid:" + paraid + " paraid1" + paraid1);
                    var column1 = response[k].data.result[0]["column1"];
                    // console.log("column1", column1 + " " + paraid);
                    if (stravepass == "") {
                        stravepass = 1;
                    }

                    var tempass = strpass;
                    if (strpass == "") {
                        tempass = 1;
                    }
                    // console.log("buildData loop12", paraid + " " + index + " " + k);
                    if (data[index]["parameterid" + paraid] == "") {
                        data[index]["parameterid" + paraid] = paraid1;
                    }

                    if (data[index]["unit" + paraid] == "") {
                        data[index]["unit" + paraid] = unit;
                    }
                    if (data[index]["result" + paraid] == "") {
                        data[index]["result" + paraid] = result;
                        //todo: check min and max
                    }
                    if (data[index]["max" + paraid] == undefined) {
                        data[index]["min" + paraid] = parastr;
                        data[index]["max" + paraid] = parastr;
                    } else {
                        if (parseFloat(data[index]["max" + paraid]) < parseFloat(parastr)) {
                            data[index]["max" + paraid] = parastr;
                        }
                    }


                    if (data[index]["min" + paraid] == undefined) {
                        // console.log("test2121 first", "[" + index + "][min" + paraid + "]=" + parastr);
                        //  data[index]["min" + paraid] = "";
                        data[index]["min" + paraid] = parastr;

                        //console.log("test2121 detail", data);
                    } else {
                        if (parseFloat(data[index]["min" + paraid]) > parseFloat(parastr)) {
                            // console.log("min reduce", parastr + " " + index);
                            data[index]["min" + paraid] = parastr;
                        }
                    }

                    if (data[index]["ave" + paraid] == "") {
                        data[index]["ave" + paraid] = avg;
                    }
                    //console.log("buildData loop4", data);

                }
            }

            for (var k1 = 0; k1 < response.length; k1++) {
                //

                if (response[k1].data.result != 0) {
                    //console.log("buildData loop", response[k1].data.result[0]);
                    var parastr = response[k1].data.result[0]["value"];

                    var paraid1 = String(response[k1].data.result[0]["opid"]).trim();

                    var paraid = searchInNameData(paraid1, nameData);
                    //  var unit = response[k].data.result[0]["unit"];

                    var column1 = response[k1].data.result[0]["column1"];
                    var pass = response[k1].data.result[0]["pass"];

                    if (valueArray[column1] == undefined) {
                        valueArray[column1] = [];
                    }
                    if (valueArray[column1][paraid] == undefined) {
                        valueArray[column1][paraid] = [];
                    }
                    if (valueArray[column1][paraid]["parameters"] == undefined) {
                        valueArray[column1][paraid]["parameters"] = [];
                    }

                    if (valueArray[column1][paraid]["parametersPass"] == undefined) {
                        valueArray[column1][paraid]["parametersPass"] = [];
                    }
                    //   valueArray[paraid]["column1"] = column1;
                    valueArray[column1][paraid]["parameters"].push(parastr);
                    valueArray[column1][paraid]["parametersPass"].push(pass);
                }
            }

            // console.log("buildData value01", valueArray);


            for (var row in valueArray) {  // row is row number of DetailResult
                for (var paraid in valueArray[row]) {//paraid is the parameters id
                    var plength = valueArray[row][paraid]["parameters"].length;  // paraid
                    for (var b = 0; b < data.length; b++) {
                        data[b]["plength" + paraid] = plength;
                        for (var l = 0; l < plength; l++) {
                            //console.log(b);
                            //console.log(data);

                            if (valueArray[row][paraid]["parametersPass"][l] != 1) {
                                data[row]["value" + paraid + "With" + l] = "";
                                data[row]["value" + paraid + "With" + l] = "FAIL:" + valueArray[row][paraid]["parameters"][l];
                                if (String(data[row]["ave" + paraid]).indexOf("FAIL:") == -1) {
                                    data[row]["ave" + paraid] = "FAIL:" + data[row]["ave" + paraid];
                                }
                            } else {
                                data[row]["value" + paraid + "With" + l] = "";
                                data[row]["value" + paraid + "With" + l] = valueArray[row][paraid]["parameters"][l];
                            }
                        }
                    }
                }
            }



            for (var k1 = 0; k1 < data.length; k1++) {
                //console.log("buildData loop3", data[k1]);
                //console.log("test parseFloat", parseFloat(""));
                //console.log("test parseFloat", parseFloat("empty"));
                // for (var j1 = 0; j1 < paraidArray.length; j1++) {
                // var paraid = String(paraidArray[j1]).trim();

                for (var j1 = 0; j1 < nameData.length; j1++) {
                    var paraid = j1;
                    // console.log("paraid is ", paraid);
                    var p = parseInt(data[k1]["plength" + paraid]);
                    for (var j2 = 0; j2 < p; j2++) {
                        if (data[k1]["value" + paraid + "With" + j2] == undefined) {
                            data[k1]["value" + paraid + "With" + j2] = "";
                        }
                        /*
                    else {
                        if (String(data[k1]["value" + paraid + "With" + j2]).indexOf("FAIL:") != -1) {
                            if (String(data[k1]["ave" + paraid]).indexOf("FAIL") != -1) {
                                data[k1]["ave" + paraid] = "FAIL:" + data[k1]["ave" + paraid];
                            }
                        }
                    }
                    */


                    }



                    if (data[k1]["max" + paraid] != undefined && data[k1]["min" + paraid] != undefined) {
                        data[k1]["range" + paraid] = parseFloat(data[k1]["max" + paraid]) - parseFloat(data[k1]["min" + paraid]);
                    }
                    if (data[k1]["min" + paraid] == undefined) {
                        data[k1]["min" + paraid] = "";
                    }
                    if (data[k1]["max" + paraid] == undefined) {
                        data[k1]["max" + paraid] = "";
                    }
                }
            }

            //console.log("$scope.parameter", $scope.parameter);
            //console.log("$scope.parameter data", data);

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < nameData.length; j++) {

                    if (data[i]["parameterid" + j] != "") {
                        data[i]["parameter" + j] = searchSpeinParameter(parseInt((data[i]["parameterid" + j])));
                    }

                }

            }

            //for (var i = 0; i < data.length; i++) {
            //    for (var k = 0; k < $scope.parameter.data.result.length; k++) {
            //       // var paraid = $scope.parameter.data.result[k]["parameterID"];
            //        var paraid1 = String($scope.parameter.data.result[k]["opid"]).trim();
            //        var paraid = searchInNameData(paraid1, nameData);
            //        if (data[i]["max" + paraid] != "") {
            //        data[i]["parameter" + paraid] = $scope.parameter.data.result[k]["specification"];
            //       // data[i]["parameter"] = $scope.parameter.data.result[k]["specification"];
            //            break;
            //        }
            //    }
            //}
           // console.log("valuearray", valueArray);
            for (var i = 0; i < data.length; i++) {

                if (data[i]["workOrderNumber"] != data[i]["woid"]) {
                    var index = getByWOID(data[i]["woid"]);
                    if (valueArray[index] != undefined) {

                        for (var paraid in valueArray[index]) {
                            //console.log("paraid",paraid);
                            var plength = valueArray[index][paraid]["parameters"].length;  // paraid
                            for (var l = 0; l < plength; l++) {
                                data[i]["value" + paraid + "With" + l] = data[index]["value" + paraid + "With" + l];
                            }

                            //data[i]["ave" + paraid] = "Fail:" + data[index]["ave" + paraid];
                            data[i]["ave" + paraid] = data[index]["ave" + paraid];
                            data[i]["unit" + paraid] = data[index]["unit" + paraid];
                            data[i]["result" + paraid] = data[index]["result" + paraid];
                            data[i]["min" + paraid] = data[index]["min" + paraid];
                            data[i]["max" + paraid] = data[index]["max" + paraid];
                            data[i]["range" + paraid] = data[index]["range" + paraid];
                        }
                    }
                }

            }


           // console.log("buildData final", data);
            var temp = data;
            makeTable2(temp, paraidArray, descr, response);
            // console.log("buildData final", data);
        }

        //'*******************************************************************
        //'Title     :  getAllWO
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to get detail for first table
        //'*******************************************************************
        function getAllWO() {

            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();
            // var type = $('#select_customerkittype option:selected').text();
            var type = $("#input-customerkittype").val();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();


            var parentwoid = "";


            var WOListcommand = "";
            var WOListcommand1 = "";
            var WOListcommand2 = "";
            var WOID = "";
            var issdate = "";
            var duedate = "";
            var count = 0;
            var wono = 0;
            var gatepass = "";
            var issdatetime = new Date().toDateInputValue();
            var duedatetime = new Date().toDateInputValue();
            var chamberid = "";
            var pmreason = "";
            var serialno = "";
            var cyclecount = "";
            var partid = 0;
            var kitIDName = "";
            var modlevel = "";
            var proenddate = "";
            var proendatetime = new Date().toDateInputValue();
            var partidname = "";
            var RFAcc = "";
            var RFCur = "";
            var RefCntAcc = "";
            var RefCntCur = "";
            var WafCntAcc = "";
            var WafCntCur = "";
            var reworkno = "";
            var fireno = "";
            var incomVDef = "";
            var improVDef = "";
            var displaywoid = "";
            var newwoid = "";
            var discardstatus = false;
            var parentstatus = false;
            var cont = true;
            var infowoid = "";
            var oldwoid = "";
            var prostartdate = "";
            var strduedate = "";
            var strissdate = "";

            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];
            var promiseArray6 = [];
            var promiseArray7 = [];
         //   console.log("getAllWO", $scope.custID + "|" + $scope.KitItemID + "|" + startDate + "|" + endDate + "|");
            promiseArray.push(
            $http.post(config.baseUrlApi + 'MWTS/getAllWO', {
                "CustomerID": String($scope.custID).trim(),
                "KitType": String($scope.KitItemID).trim(),
                "StartDate": String(startDate).trim(),
                "EndDate": String(endDate).trim()
                //  "CustomerID": "1",
                // "KitType": "5314",
                //  "StartDate": "2017-06-25",
                //  "EndDate": "2017-09-25"
            })
                );


            $q.all(promiseArray).then(function (response) {
                var response1 = response;
                $scope.finalData = response1[0].data.result;
                var finalData = response1[0].data.result;
              //  console.log("getAllWO", response);
                if (response.length != 0) {
                    if (response[0].data.success == true) {
                      //  console.log("getAllWO1", response[0].data.result.length);
                        for (var i = 0; i < response[0].data.result.length; i++) {
                            response1[0].data.result[i]["empty"] = "";
                            var WOID = response[0].data.result[i]["woid"];
                            // console.log("getAllWO woid", WOID);
                            promiseArray1.push(
                                            $http.post(config.baseUrlApi + 'MWTS/checkparentwoid', {
                                                "WOID": WOID
                                            })
                                );

                            promiseArray2.push(
                                            $http.post(config.baseUrlApi + 'MWTS/getoldWOID', {
                                                "WOID": WOID
                                            })
                                );

                            promiseArray3.push(
                                $http.post(config.baseUrlApi + 'MWTS/getwostatus', {
                                    "WOID": WOID,
                                    "Index": i
                                })
                                );


                        }


                        $q.all(promiseArray2).then(function (response) {
                            //console.log("checktable3",response);
                            //$scope.DetailResult[pos]['oldwoid'] = response[h].data.result[0]["linkWOID"];

                            for (var i = 0; i < response.length; i++) {
                                response1[0].data.result[i]['oldwoid'] = "";
                                if (response[i].data.result != null && response[i].data.result.length != 0) {
                                    response1[0].data.result[i]['oldwoid'] = response[i].data.result[0]["linkWOID"];
                                }
                            }

                            $q.all(promiseArray3).then(function (response) {
                                //console.log("checktable1", response);
                                //console.log("checktable2", response1);

                                for (var i = 0; i < response.length; i++) {
                                    var discard = false;
                                    response1[0].data.result[i]["discard"] = "";
                                    if (response[i].data.result[0]["woStatus"] == "Discard") {
                                        discard = true;
                                    }
                                    response1[0].data.result[i]["discard"] = discard;
                                }

                                $q.all(promiseArray1).then(function (response) {
                                    // console.log("checkparentwoid", response);



                                    for (var j = 0; j < response.length; j++) {//for loop1

                                        if (response[j].data.result != null &&
                                            response[j].data.result != undefined &&
                                            response[j].data.result.length == 0) {

                                            var tempdate = "";
                                            //console.log("test1", response1);
                                            //console.log("test1", j);
                                            issdate = response1[0].data.result[j]["releasedDate"];

                                            response1[0].data.result[j]["parent"] = "";
                                            if (response1[0].data.result[j]["woid"].indexOf(".") != -1) {
                                                response1[0].data.result[j]["parent"] = response1[0].data.result[j]["woid"].substring(0, response1[0].data.result[j]["woid"].indexOf("."));
                                            }



                                            if (issdate != "" && issdate != "NULL") {
                                                tempdate = issdate;
                                            }

                                            var tempdue = "";
                                            duedate = response1[0].data.result[j]["requestedDeliveryDate"];

                                            if (duedate != "" && duedate != "NULL") {
                                                tempdue = duedate;
                                            }

                                            wono = response1[0].data.result[j]["ppid"];
                                            gatepass = response1[0].data.result[j]["gatePass"];
                                            chamberid = response1[0].data.result[j]["chamberID"];
                                            //console.log("test", wono + " " + gatepass + " " + chamberid);




                                            //console.log("findSelectedPartID input", woid + " " + startDate + " " + endDate);
                                            promiseArray4.push(
                                            $http.post(config.baseUrlApi + 'MWTS/findSelectedPartID', {
                                                "WOID": wono,
                                                "StartDate": startDate,
                                                "EndDate": endDate
                                            })
                                                );

                                            var value = 0;

                                        }
                                        //else {
                                        //    alert("3");
                                        //}
                                    }


                                    // var selectorData = [];
                                    // $scope.selectorData = [];
                                    // console.log("findSelectedPartID promiseArray",promiseArray4);
                                    $q.all(promiseArray4).then(function (response) {
                                        // console.log("findSelectedPartID response0", response1);
                                        // console.log("findSelectedPartID response", response);
                                        if (response.length != 0) {
                                            value = response[0].data.result.length;
                                        }

                                        // console.log("value1", value);





                                        if (response.length != 0) {

                                            $scope.selectorItem = [];
                                            $scope.selectorItem.push("");
                                            $scope.selectorItemDetail = [];
                                            $scope.selectorItemDetail.push([]);

                                            //  $scope.partLength = response[0].data.result.length;
                                            for (var i = 0; i < response.length; i++) {

                                                $scope.finalData[i]["detaillength"] = response[i].data.result.length;
                                                //  $scope.finalData1[i]["detaillength"] = response[i].data.result.length;

                                                for (var j = 0; j < response[i].data.result.length; j++) {


                                                    if (response[i].data.result[j]["string2"] == null) {
                                                        response[i].data.result[j]["string2"] = "";
                                                    }
                                                    if (response[i].data.result[j]["int1"] == null) {
                                                        response[i].data.result[j]["int1"] = "";
                                                    }
                                                    if (response[i].data.result[j]["description"] == null) {
                                                        response[i].data.result[j]["description"] = "";
                                                    }
                                                    if (response[i].data.result[j]["string1"] == null) {
                                                        response[i].data.result[j]["string1"] = "";
                                                    }
                                                    if (response[i].data.result[j]["itemName"] == null) {
                                                        response[i].data.result[j]["itemName"] = "";
                                                    }
                                                    if (response[i].data.result[j]["itemID"] == null) {
                                                        response[i].data.result[j]["itemID"] = "";
                                                    }

                                                    if (response[i].data.result[j]["itemName"] != "") {
                                                        var id = response[i].data.result[j]["itemID"];


                                                        if ($scope.selectorItem.indexOf(response[i].data.result[j]["itemName"]) === -1) {
                                                            var temp = [];

                                                            if (response[i].data.result[j]["itemID"] == null) {
                                                                temp["itemID"] = "";
                                                            } else {
                                                                temp["itemID"] = response[i].data.result[j]["itemID"];
                                                            }

                                                            if (response[i].data.result[j]["itemName"] == null) {
                                                                temp["itemName"] = "";
                                                            } else {
                                                                temp["itemName"] = response[i].data.result[j]["itemName"];
                                                            }



                                                            if (response[i].data.result[j]["itemName"] != null) {
                                                                $scope.selectorItemDetail.push(temp);
                                                                $scope.selectorItem.push(response[i].data.result[j]["itemName"]);
                                                            }
                                                        }
                                                    }
                                                }

                                                //  console.log("selector is",$scope.selectorItemDetail);

                                            }




                                            for (var i = 0; i < response.length; i++) {

                                                $scope.finalData[i]["detaillength"] = response[i].data.result.length;
                                                //$scope.finalData1[i]["detaillength"] = response[i].data.result.length;

                                                for (var j = 0; j < response[i].data.result.length; j++) {


                                                    if (response[i].data.result[j]["string2"] == null) {
                                                        response[i].data.result[j]["string2"] = "";
                                                    }
                                                    if (response[i].data.result[j]["int1"] == null) {
                                                        response[i].data.result[j]["int1"] = "";
                                                    }
                                                    if (response[i].data.result[j]["description"] == null) {
                                                        response[i].data.result[j]["description"] = "";
                                                    }
                                                    if (response[i].data.result[j]["string1"] == null) {
                                                        response[i].data.result[j]["string1"] = "";
                                                    }
                                                    if (response[i].data.result[j]["itemName"] == null) {
                                                        response[i].data.result[j]["itemName"] = "";
                                                    }
                                                    if (response[i].data.result[j]["itemID"] == null) {
                                                        response[i].data.result[j]["itemID"] = "";
                                                    }

                                                    if (response[i].data.result[j]["itemName"] != "") {
                                                        var id = getIDByName(response[i].data.result[j]["itemName"]);
                                                        //var id = response[i].data.result[j]["itemID"];


                                                        $scope.finalData[i]["string2_1"] = response[i].data.result[j]["string2"];
                                                        $scope.finalData[i]["int1_1"] = response[i].data.result[j]["int1"];

                                                        $scope.finalData[i]["description_" + id] = response[i].data.result[j]["description"];
                                                        $scope.finalData[i]["int1_" + id] = response[i].data.result[j]["int1"];
                                                        $scope.finalData[i]["itemID_" + id] = response[i].data.result[j]["itemID"];
                                                        $scope.finalData[i]["itemName_" + id] = response[i].data.result[j]["itemName"];
                                                        $scope.finalData[i]["string1_" + id] = response[i].data.result[j]["string1"];
                                                        $scope.finalData[i]["string2_" + id] = response[i].data.result[j]["string2"];



                                                    }
                                                }

                                                // console.log("selector is", $scope.selectorItemDetail);

                                            }

                                        }

                                        var data1 = $scope.finalData;
                                        var datatemp = [];
                                        for (var p1 = 0; p1 < data1.length; p1++) {
                                            if (data1[p1]["discard"] != true) {
                                                //delete data[p1];
                                                var woid = data1[p1]["woid"];
                                                var isPush = true;
                                                for (var p2 = 0; p2 < data1.length; p2++) {
                                                    if (p1 != p2) {
                                                        if (data1[p2]["woid"].indexOf(woid) != -1) {
                                                            isPush = false;
                                                            break;
                                                        }
                                                    }
                                                }

                                                //console.log("maketable after delete parent0", isPush);
                                                if (isPush) {
                                                    datatemp.push(data1[p1]);
                                                }


                                            }
                                        }
                                        $scope.finalData = datatemp;
                                        $scope.finalData1 = $scope.finalData;

                                        //  console.log("maketable after delete parent1", $scope.finalData);

                                        for (var i = 0; i < $scope.finalData1.length; i++) {
                                            for (var j = 1; j < $scope.selectorItemDetail.length; j++) {
                                                var id = $scope.selectorItemDetail[j]["itemID"];

                                                if ($scope.finalData1[i]["description_" + id] == undefined) {
                                                    $scope.finalData1[i]["description_" + id] = "";
                                                }
                                                if ($scope.finalData1[i]["int1_" + id] == undefined) {
                                                    $scope.finalData1[i]["int1_" + id] = "";
                                                }
                                                if ($scope.finalData1[i]["itenID_" + id] == undefined) {
                                                    $scope.finalData1[i]["itemID_" + id] = "";
                                                }
                                                if ($scope.finalData1[i]["itemName_" + id] == undefined) {
                                                    $scope.finalData1[i]["itemName_" + id] = "";
                                                }
                                                if ($scope.finalData1[i]["string1_" + id] == undefined) {
                                                    $scope.finalData1[i]["string1_" + id] = "";
                                                }
                                                if ($scope.finalData1[i]["string2_" + id] == undefined) {
                                                    $scope.finalData1[i]["string2_" + id] = "";
                                                }
                                            }
                                        }

                                        // console.log("findSelectedPartID finalData after", $scope.finalData);
                                        // console.log("findSelectedPartID finalData after", $scope.finalData1);
                                        var data = $scope.finalData1;


                                        if (data != undefined) {
                                            //console.log("test6", $scope.finalData1);
                                            //console.log("test6", $scope.finalData1[0]);
                                            //console.log("test6", $scope.finalData1[0]["gatePass"]);
                                            //console.log("test6", $scope.finalData1[0]["detaillength"]);
                                            makeTable(data);
                                        }

                                    });


                                });

                            });

                        });

                    } else {

                        /*
                                                promiseArray5.push(
                                               $http.post(config.baseUrlApi + 'MWTS/getAllWO0', {
                                                   "CustomerID": String($scope.custID).trim(),
                                                   "KitType": String($scope.KitItemID).trim(),
                                                   "StartDate": String(startDate).trim(),
                                                   "EndDate": String(endDate).trim()
                                                   //  "CustomerID": "1",
                                                   // "KitType": "5314",
                                                   //  "StartDate": "2017-06-25",
                                                   //  "EndDate": "2017-09-25"
                                               })
                                                   );
                        
                                                promiseArray6.push(
                                               $http.post(config.baseUrlApi + 'MWTS/getAllWO1', {
                                                   "CustomerID": String($scope.custID).trim(),
                                                   "KitType": String($scope.KitItemID).trim(),
                                                   "StartDate": String(startDate).trim(),
                                                   "EndDate": String(endDate).trim()
                                                   //  "CustomerID": "1",
                                                   // "KitType": "5314",
                                                   //  "StartDate": "2017-06-25",
                                                   //  "EndDate": "2017-09-25"
                                               })
                                                   );
                        
                                                promiseArray7.push(
                                               $http.post(config.baseUrlApi + 'MWTS/getAllWO2', {
                                                   "CustomerID": String($scope.custID).trim(),
                                                   "KitType": String($scope.KitItemID).trim(),
                                                   "StartDate": String(startDate).trim(),
                                                   "EndDate": String(endDate).trim()
                                                   //  "CustomerID": "1",
                                                   // "KitType": "5314",
                                                   //  "StartDate": "2017-06-25",
                                                   //  "EndDate": "2017-09-25"
                                               })
                                                   );
                                                //var Array = [];
                                                $q.all(promiseArray5).then(function (response) {
                                                    var	temp = response;
                                                    console.log("promiseArray5",temp);
                                                    var Array = response;	
                                                                        
                                                    $q.all(promiseArray6).then(function (response) {
                                                        console.log("promiseArray6",response);
                                                        
                                                        if (response.length != 0 && (temp.length != 0)) {
                                                          //  Array[0].data.result = [];
                                                          
                                                            if (response[0].data.result.length != 0  && temp[0].data.result.length != 0) {
                                                                for(var i =0; i <temp[0].data.result.lenth; i++){
                                                                    Array[0].data.result[i]['discard1'] = false;
                                                                    for(var j =0;j<response6[0].data.result.length;j++){
                                                                        if(temp[0].data.result[i]['kitid'] == response[0].data.result[j]['kitid']){
                                                                         //   Array[0].data.result.push(temp[0].data.result[i]);
                                                                        //    break;
                                                                        Array[0].data.result[i]['discard1'] = true;
                                                                        }
                                                                    }
                                                                }
                                                                
                                                    
                                                        var tempArray = Array;
                                                        tempArray[0].data.result =[];
                                                        for(var k=0;k<Array[0].data.result.length;k++){
                                                            if(Array[0].data.result[k]['discard1'] == true){
                                                                tempArray[0].data.result.push(Array[0].data.result[k]);
                                                            }
                                                        }
                                                        
                                                        Array=tempArray;
                                                                
                                                            }
                                                        }
                        
                                                        console.log("Array is",Array);
                                                        $q.all(promiseArray7).then(function (response) {
                                                            console.log("promiseArray7",response);
                        
                        
                                                        });
                                                    });
                        
                        
                        
                                                });
                        
                        */
                        alert("System timeout,Please try to search with a shorter time period");


                    }
                }


            });

        }


        //helper functions
        //'*******************************************************************
        //'Title     :  getByWOID
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : given woid return index in $scope.DetailResult
        //'*******************************************************************
        function getByWOID(woid) {
            for (var i = 0; i < $scope.DetailResult.length; i++) {
                if ($scope.DetailResult[i]["workOrderNumber"] == woid) {
                    return i;
                }
            }
            return -1;
        }

        //'*******************************************************************
        //'Title     :  getIDByName
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : given itemName return index in $scope.selectorItemDetail
        //'*******************************************************************
        function getIDByName(name) {


            for (var i = 1; i < $scope.selectorItemDetail.length; i++) {
                if ($scope.selectorItemDetail[i]["itemName"] == name) {
                    return $scope.selectorItemDetail[i]["itemID"];
                }
            }
            return -1;
        }

        //'*******************************************************************
        //'Title     :  convertDate
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : convert raw Datetime to display format
        //'*******************************************************************
        function convertDate(date) {
            var monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"
            ];

            if (date != "" && date != undefined && date != null) {
                var date = date.substring(0, date.indexOf("T"));
                var dateParts = date.split("-");
                var year = dateParts[0];
                var month = monthNames[parseInt(dateParts[1])];
                var day = dateParts[2];

                return day + " " + month + " " + year;
            }
            return "";
        }







    }
})();




//'*******************************************************************
//'Title     :  
//'Function  :  
//'Input     :  
//'Output    : 
//'Remark    : this is part of function that needed to assign default value to type="date"
//'*******************************************************************
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});