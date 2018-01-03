var global = [];
var globalTab = [];
var GlobalData = [];
var title = [];
var outSide = [];//for tab toggling
(function () {
    'use strict';

    angular.module('erp.wostatus').controller('WoStatusCtrl', WoStatusCtrl);

    WoStatusCtrl.$inject = ['$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService','$window'];

    function WoStatusCtrl($scope, $http, config, tenant, authService, $stateParams, kendoGridService,$window) {
        //initialise global variable
        var xml = [];

        $scope.workCenters = [];
        $scope.tenant = tenant;
        $scope.multiselectValue = [];
        $scope.selectedwoid = "";

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'wostatus-23' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        authService.parameter = "";
        $scope.tenant = tenant;


        $scope.myFunct = function (keyEvent) {
            if (keyEvent.which === 13) {
                console.log("key", keyEvent);
                console.log("value", $("#test-scanner").val());
            }

           // alert("alert");
        }


        //'*******************************************************************
        //'Title     :  dblclick
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action when triggered by double click table(goto wodetail)
        //'*******************************************************************
        $("#table").dblclick(function () {
            //   alert("Hello World!");
            // 
            authService.parameter = $scope.selectedwoid;
            // $stateParams.test = "1";
            $window.location.href = '#/wodetail';
            // $stateParams.test = "1";
            //  $scope.userInput = "1";
            //   $state.go("#/routeDetail", { id: $scope.userInput });
        });




        //'*******************************************************************
        //'Title     :  table1Clicked
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action when triggered by single click table(woid of the row is been selected)
        //'*******************************************************************
        $scope.table1Clicked = function () {
            var grid = $('#table').data('kendoGrid');
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
                $scope.selectedwoid = woid;
            }
        }





        //'*******************************************************************
        //'Title     :  Refresh
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action when triggered by click "Refresh" button
        //'*******************************************************************
        $scope.Refresh = function () {

            document.getElementById("table").innerHTML = "";

            if (document.getElementById("btn_container") !== null) {
                var element = document.getElementById("btn_container");
                element.outerHTML = "";
            }


            var radio = $('input[name="State"]:checked').val();
            console.log("radio", radio);
            // alert(radio);
            var select_WorkCenter = $('#select_WorkCenter option:selected').text();

            var select_McID = $('#select_McID option:selected').text();

            var select_CustomerList = $('#select_CustomerList option:selected').text();

            var select_FGDimension = $('#select_FGDimension option:selected').text();
            var select_WOID = $('#select_WOID option:selected').text();
            var select_PartID = $('#select_PartID option:selected').text();
            var select_PartNO = $('#select_PartNO option:selected').text();
            var select_SONO = $('#select_SONO option:selected').text();
            var select_Remark = $('#select_Remark option:selected').text();
            //  alert(select_Remark);
            var test = document.getElementById("startDate");
           // var remark1 = $('#select_Fai option:selected').text();

            var startDate = $('#startDate').find("input").val();
            var endDate = $('#endDate').find("input").val();

            console.log("Date",startDate+" "+endDate);

            if (radio == "ALL") {
                $http.post(config.baseUrlApi + 'HMLVTS/spGenerateDynamicWOStatusListStatement',
                {
                    "radio": radio,
                    "WorkCenter": select_WorkCenter,
                    "McID": select_McID,
                    "CustomerList": select_CustomerList,
                    "FGDimension": select_FGDimension,
                    "WOID": select_WOID,
                    "PartID": select_PartID,
                    "PartNO": select_PartNO,
                    "SONO": select_SONO,
                    "Remark": select_Remark,
                    "startDate": startDate,
                    "endDate": endDate,
                    //"Remark1": remark1
                    "Remark1": ""
                }
                )
        .then(function (response) {
            //console.log("response12121", response);
            studentData = response.data.result;
            console.log("spGenerateDynamicWOStatusListStatement", response);
            if (studentData.length == 0) {
                alert("No Work Order found with the current selected parameters");
                document.getElementById("table").innerHTML = "";
            } else {
                //console.log("set", $scope.promises);
                outSide = studentData;
                makeTable(studentData);

              //  deliveryHighlight();
            }
        });
            } else {

                $http.post(config.baseUrlApi + 'HMLVTS/spGenerateDynamicWOStatusListStatement1',
                    {
                        "radio": radio,
                        "WorkCenter": select_WorkCenter,
                        "McID": select_McID,
                        "CustomerList": select_CustomerList,
                        "FGDimension": select_FGDimension,
                        "WOID": select_WOID,
                        "PartID": select_PartID,
                        "PartNO": select_PartNO,
                        "SONO": select_SONO,
                        "Remark": select_Remark,
                        "startDate": startDate,
                        "endDate": endDate,
                        // "Remark1": remark1
                        "Remark1": ""
                    }
                    )
            .then(function (response) {

                console.log("spGenerateDynamicWOStatusListStatement1", response);
                studentData = response.data.result;
                //console.log("resulthahaha", studentData)
                //console.log("set", $scope.promises);
                if (studentData.length == 0) {
                    alert("No Work Order found with the current selected parameters");
                    document.getElementById("table").innerHTML = "";
                } else {
                    outSide = studentData;
                    makeTable(studentData);

                   // deliveryHighlight();

                }
            });
            }

        }
        $scope.tenant = tenant;
        $scope.highlight = [];

        // document.getElementById("startDate").value = "2014-02-09";
        //var d = new Date();
        //d.setMonth(d.getMonth() - 1);
        //$('#startDate').val(d.toDateInputValue());

        //$('#endDate').val(new Date().toDateInputValue());

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



        $http.get(config.baseUrlApi + 'HMLVTS/GenerateThreshold')
               .then(function (response) {
                   console.log("GenerateThreshold", response);
                   $scope.threshold = response.data.result[0]["threshold"];
               });

        $("#threshold").text($scope.threshold);

        $http.get(config.baseUrlApi + 'HMLVTS/populateWorkCentre')
            .then(function (response) {
                //console.log("populateWorkCentre1",response);
                createSelect(response.data.result, "WorkCenter");
            });



        $http.get(config.baseUrlApi + 'HMLVTS/populateMachineID')
            .then(function (response) {
                createSelect(response.data.result, "McID")
            });



        $http.get(config.baseUrlApi + 'HMLVTS/populateWOlist')
            .then(function (response) {
                createSelect(response.data.result, "WOID")
            });


        $http.get(config.baseUrlApi + 'HMLVTS/populatePartIDlist')
            .then(function (response) {
                //console.log("populatePartIDlist",response);
                createSelect(response.data.result, "PartID")
            });

        $http.get(config.baseUrlApi + 'HMLVTS/populateCustomerNamelist')
            .then(function (response) {
                //console.log("populateCustomerNamelist",response);
                createSelect(response.data.result, "CustomerList")
            });

        $http.get(config.baseUrlApi + 'HMLVTS/populateFGDimensionlist')
            .then(function (response) {
                //console.log("populateFGDimensionlist",response);
                createSelect(response.data.result, "FGDimension")
            });

    //    $http.get(config.baseUrlApi + 'HMLVTS/populateFAIlist')
    //.then(function (response) {
    //    createSelect(response.data.result, "Fai")
    //});

    //    $http.get(config.baseUrlApi + 'HMLVTS/populatePONumberlist')
    //        .then(function (response) {
    //            //console.log("populatePONumberlist",response);
    //            var data = response.data;

    //            createSelect(response.data.result, "PartNO")
    //        });

        $http.get(config.baseUrlApi + 'HMLVTS/populateSOLineNolist')
    .then(function (response) {
        //console.log("populateSOLineNolist",response);
        var data = response.data;

        //console.log("data6", data);
        createSelect(response.data.result, "SONO")
    });

        $http.get(config.baseUrlApi + 'HMLVTS/populateSORemarklist')
            .then(function (response) {
                // console.log("populateSORemarklist",response);
                //var data = response.data;
                createSelect(response.data.result, "Remark")
            });

        var studentData;
        var sheetArray = new Array();

        //$http.get(config.baseUrlApi + 'HMLVTS/ReadAllTS_WorkOrderREsponse')
        //    .then(function (response) {

        //        studentData = response.data.Students;
        //    });


        var startDate = $('#startDate').find("input").val();
        var endDate = $('#endDate').find("input")   .val();
        //console.log("today", startDate);

        $http.post(config.baseUrlApi + 'HMLVTS/spGenerateDynamicWOStatusListStatement',
            {
                "radio": "ALL",
                "WorkCenter": "",
                "McID": "",
                "CustomerList": "",
                "FGDimension": "",
                "WOID": "",
                "PartID": "",
                "PartNO": "",
                "SONO": "",
                "Remark": "",
                "StartDate": startDate,
                "EndDate": endDate,
                "Remark1": ""
            }


            )
        .then(function (response) {
               console.log("first data",response);
            studentData = response.data.result;
            outSide = studentData;
            makeTable(studentData);
            //deliveryHighlight();
            //************************//

            //**********************//


        });



        //'*******************************************************************
        //'Title     :  deliveryHighlight
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to highlight color of table row
        //'*******************************************************************
        function deliveryHighlight() {

            var grid = $('#table').data('kendoGrid');
            // console.log("HighlighCompleted grid", grid);
            // console.log("HighlighCompleted grid1",grid.dataItem());
            var items = grid.dataSource.view();

            $scope.highlight = [];
            for (var i = 0; i < items.length; i++) {
                var time = items[i]['requestedDeliveryDate'];
                console.log("highlight requestedDeliveryDate",time);
                time = time.substring(0, time.indexOf(" "));
                //var today = new 
                var dateTime = time.split("-");
                //console.log("time1", dateTime);
                var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);
                console.log("highlight requestedDeliveryDate expectedDate", expectedDate);
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var compareDate = expectedDate;
                compareDate.setDate(compareDate.getDate() - $scope.threshold);


                if (today > expectedDate) {
                    //red
                    $scope.highlight.push("#FFCCFF");
                } else {
                    if (today >= compareDate) {
                        //yellow
                        $scope.highlight.push("#ffff00");
                    } else {
                        //white
                        $scope.highlight.push("#ffffff");
                    }
                }

            }

            console.log("highlight scope",$scope.highlight);
            var trs = $("#kendo_body_container > tbody").children();
            console.log("highlight trs", trs);

           // var tbody = document.getElementsByTagName("tbody")[0];
            var tbody = $('tbody')[1];
            console.log("highlight tbody", $(tbody).find('> tbody > tr'));

            var rows = $(tbody).children();
            console.log("highlight rows", rows);
            if (rows.length != 0) {

                for (var i = 0; i < rows.length; i++) {
                    var color = $scope.highlight[i];
                    $(rows[i]).css("background-color", color);


                }
            }

           //// var grid = $('#table').data('kendoGrid');
           //// var items = grid.dataSource.view();
           ////// var selectedItem = grid.dataItem(grid.select());

           //// console.log("highlight items", items);

           //// for (var i = 0; i < items.length;i++){
           ////     var time = (items[i]['requestedDeliveryDate']).trim();
           ////     console.log(time);
           //// }

           // var tbody = document.getElementsByTagName("tbody")[0];
           // tbody = $('tbody');
           // // console.log("table2121", tbody.children().children().length);
           // var threshold;


           // for (var i = 0; i < tbody.children().children().length; i++) {
           //     console.log('time 0.1',String($(tbody.children().children()[i]).html()).trim());
           //     var currentColor;
           //     if (i % 25 == 14) {
           //         // console.log("test div", $(tbody.children().children()[i]).html());
           //         // console.log("test div",i);
           //         var time = String($(tbody.children().children()[i]).html()).trim();
           //         console.log("time0", time);
           //         time = time.substring(0, time.indexOf(" "));
           //          console.log("time is",time);

           //         var dateTime = time.split("-");
           //         console.log("time1", dateTime);
           //         var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);
           //          console.log("time2", expectedDate);

           //         var today = new Date();
           //         var compareDate = new Date(today.getYear(), today.getMonth(), today.getDate() - parseInt($scope.threshold));
           //         //console.log("compare date", compareDate);
           //         if (expectedDate < compareDate && expectedDate > today) {
           //             $(tbody.children().children()[i]).parent().addClass("yellow-background");
           //             $scope.highlight.push("#ffff00");
           //             currentColor = "#ffff00";
           //         } else if (expectedDate < today) {
           //             $(tbody.children().children()[i]).parent().addClass("pink-background");
           //             $scope.highlight.push("#FFCCFF");
           //             currentColor = "#FFCCFF";
           //         }


           //     }

           //     if (i % 25 == 13 || i % 25 == 14 || i % 25 == 15 || i % 25 == 16 || i % 25 == 17) {
           //         // console.log("date converted before", $(tbody.children().children()[i]).html());
           //         var date = convertDate($(tbody.children().children()[i]).html());
           //         // console.log("date converted is", date);
           //         $(tbody.children().children()[i]).html(String(date));
           //     }




           // }
            // console.log("table", tbody.children().children());
            // console.log("table1", tbody);
        }


        //'*******************************************************************
        //'Title     :  replaceNULL
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : remove all null value from json object(replace with ""), this is to prevent possible bug/error from kendoGrid
        //'*******************************************************************
        function replaceNULL(xml) {
            for (var i in xml) {
                for (var j in xml[i]) {
                    if (xml[i][j] == null || xml[i][j] == undefined) {
                        xml[i][j] = " ";
                    }
                }
            }
        }



        //function makeTab(xml) {
        //    var header = [];
        //    //console.log("tab", xml);

        //    var tab = document.getElementById("table");




        //    for (var j = 0; j < $scope.multiselectValue.length; j++) {
        //        var name = "";
        //        for (var k = 0; k < $scope.multiselectValue[j].length; k++) {
        //            if (k != 0) {
        //                name = name + "," + $scope.multiselectValue[j][k]["value"];
        //            } else {
        //                name = $scope.multiselectValue[j][k]["value"];
        //            }

        //        }
        //        if ($scope.multiselectValue[j].length == $scope.workCenters.length) {
        //            name = "ALL";
        //        }
        //        title[j] = name;
        //    }


        //    // console.log("header",$scope.header);

        //    var btn_container = document.createElement("div");
        //    btn_container.setAttribute("class", "btn_container");
        //    btn_container.setAttribute("id", "btn_container");


        //    var allbtn = document.createElement("BUTTON");
        //    var allbtn_id = "all_btn";
        //    allbtn.setAttribute("onclick", "showByWC(" + allbtn_id + ")");
        //    allbtn.setAttribute("id", allbtn_id);
        //    //  allbtn.setAttribute("class", "btn btn-default btn-square");
        //    var t1 = document.createTextNode("ALL");
        //    allbtn.appendChild(t1);
        //    allbtn.setAttribute("style", "background:#767676;");
        //    btn_container.appendChild(allbtn);

        //    for (var j = 0; j < title.length; j++) {
        //        //  console.log("show header", header[j]);
        //        if (true) {
        //            // if (header[j] != null && String(header[j]).trim() != "null") {

        //            var btn = document.createElement("BUTTON");
        //            var id = title[j];
        //            btn.setAttribute("onclick", "showByWC(" + (j) + ")");
        //            btn.setAttribute("id", title[j]);
        //            //  btn.setAttribute("class", "btn btn-primary btn-trans");
        //            btn.setAttribute("style", "background:#fff;max-width:100px;max-height:50px;overflow:hidden;");
        //            btn.setAttribute("data-toggle", "tooltip");
        //            btn.setAttribute("title", title[j]);

        //            //btn.setAt
        //            var t = document.createTextNode(title[j]);

        //            btn.appendChild(t);
        //            if (String(title[j]).trim() == "") {
        //                btn.setAttribute("style", "background:#fff;display:none;");
        //            }
        //            btn_container.appendChild(btn);
        //        }

        //    }
        //    tab.appendChild(btn_container);
        //}

        //function makeHiddenTableTab(data, id, index) {
        //    //alert("");
        //    // console.log("saveFileTest hidden");
        //    var hidden = document.getElementById("multiple");
        //    var hiddenchild = document.createElement("div");
        //    hiddenchild.setAttribute("id", "hidden" + index);
        //    hidden.appendChild(hiddenchild);

        //    // console.log("kendo2", highlight);
        //    // xml = data;
        //    global = data;
        //    replaceNULLOutside(data);
        //    //if (id != "all_btn") {
        //    //    data = extractData(data, id);
        //    //}
        //    GlobalData = data;
        //    var output = [];
        //    // console.log("extractData pre", id);
        //    for (var i = 0; i < id.length; i++) {
        //        var outputtemp = extractData(id[i]["value"]);
        //        for (var j = 0; j < outputtemp.length; j++) {
        //            output.push(outputtemp[j]);
        //        }
        //    }
        //    replaceNULLOutside(output);
        //    // console.log("saveFileTest is1 ", output);
        //    // console.log("saveFileTest is1 data", data);
        //    data = output;

        //    for (var i = 0; i < data.length; i++) {
        //        data[i]["index"] = (i + 1);
        //    }
        //    $("#hidden" + index).kendoGrid(

        //        {
        //            toolbar: ["excel"],
        //            excel: {
        //                fileName: "Kendo UI Grid Export.xlsx",
        //                filterable: true,
        //            }
        //            ,
        //            excelExport: function (e) {

        //                //  console.log("highlight",$scope.highlight);
        //                var sheet = e.workbook.sheets[0];
        //                //   console.log("workbook1",sheet);
        //                for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        //                    var row = sheet.rows[rowIndex];

        //                    var currentColor;
        //                    var time = row.cells[14].value;
        //                    time = time.substring(0, time.indexOf("T"));
        //                    var dateTime = time.split("-");
        //                    //   console.log("time1", dateTime);
        //                    var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);
        //                    // console.log("time2", expectedDate);

        //                    var today = new Date();
        //                    var compareDate = new Date(today.getYear(), today.getMonth(), today.getDate() - parseInt($scope.threshold));
        //                    //console.log("compare date", compareDate);
        //                    if (expectedDate < compareDate && expectedDate > today) {
        //                        currentColor = "#ffff00";
        //                    } else if (expectedDate < today) {
        //                        currentColor = "#FFCCFF";
        //                    }



        //                    for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        //                        //var color = "red";
        //                        //   console.log("highlight1", rowIndex + " " + cellIndex+" "+currentColor);

        //                        sheet.rows[rowIndex].cells[cellIndex].background = currentColor;
        //                    }

        //                }




        //                e.preventDefault();

        //                $scope.promises[(index - 1)].resolve(e.workbook);
        //            }
        //            ,
        //            dataSource: {
        //                data,
        //                pageSize: 20
        //            },
        //            // dataType: "json",
        //            height: 550,
        //            pageable: {
        //                refresh: true,
        //                pageSizes: true,
        //                buttonCount: 5
        //            },

        //            pageable: true,

        //            //pageSize: 10,
        //            //sortable: true,
        //            resizable: true,
        //            pageable: true,
        //            //groupable: true,
        //            filterable: true,
        //            columnMenu: true,
        //            reorderable: true,
        //            resizable: true,
        //            columns: [
        //         {
        //             field: "index", title: "#", width: 150

        //         },
        //         {
        //             field: "woid", title: "WOID", width: 150

        //         },
        //         {
        //             field: "issuedBy", title: "Issue By", width: 150

        //         },
        //         {
        //             field: "poNumber", title: "PO Number", width: 150

        //         },
        //         {
        //             field: "lineNumber", title: "SO Line No.", width: 150

        //         },
        //         {
        //             field: "description", title: "Description", width: 150

        //         },
        //         {
        //             field: "soRemark", title: "SO Remarks", width: 150

        //         },
        //         {
        //             field: "customer", title: "Customer Name", width: 150
        //         },
        //         {
        //             field: "partID", title: "PartNo.", width: 150
        //         },
        //         {
        //             field: "toolDescription", title: "Part Family", width: 150
        //         },
        //        {
        //            field: "actualProdQty", title: "Actual Prod Qty", width: 150
        //        },
        //        {
        //            field: "actualRecQty", title: "Actual Rec Qty", width: 150
        //        },
        //        {
        //            field: "completedQty", title: "Completed Qty", width: 150
        //        },
        //        {
        //            field: "releasedDate", title: "Released Date", width: 150
        //        },
        //        {
        //            field: "requestedDeliveryDate", title: "Requested Delivery Date", width: 150
        //        }
        //        ,
        //        {
        //            field: "committedDeliveryDate", title: "Committed Delivery Date", width: 150
        //        },
        //        {
        //            field: "startDate", title: "Production Start Time", width: 150
        //        },
        //        {
        //            field: "endDate", title: "Production End Time", width: 150
        //        },
        //        {
        //            field: "woStatus", title: "WO Status", width: 150
        //        },
        //        {
        //            field: "workcenter", title: "Work Center", width: 150
        //        },
        //        {
        //            field: "procOpSeq", title: "Proc Op Seq", width: 150
        //        },
        //        {
        //            field: "mcID", title: "Machine ID", width: 150
        //        },

        //        {
        //            field: "processCompletedQty", title: "Process Completed Qty", width: 150
        //        },
        //        {
        //            field: "processStatus", title: "Process Status", width: 150
        //        },
        //        {
        //            field: "remark", title: "Remarks", width: 150
        //        }



        //            ]
        //        })
        //}


        //'*******************************************************************
        //'Title     :  convertTime
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to convert time to the correct display format(from YYYY-MM-DDDDTHH:MM:SS to YYYY-MM-DDDD HH:MM:SS)
        function convertTime(convertField,data) {
            for (var i = 0; i < convertField.length; i++) {
                var field = convertField[i];
                for (var j = 0; j < data.length;j++){
                    var originaltime = data[j][field];
                    var originaltimeArray = originaltime.split("T");
                    var finaltime = "";
                    for (var k = 0; k < originaltimeArray.length;k++){
                        finaltime = finaltime + originaltimeArray[k]+" ";
                    }
                    data[j][field] = finaltime;
                }
            }
        }


        //'*******************************************************************
        //'Title     :  makeTable
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //********************************************************************
        function makeTable(data) {
            console.log("tableData", data);
            convertTime(["committedDeliveryDate", "releasedDate", "requestedDeliveryDate"],data);
            // console.log("kendo color",$scope.highlight);
        //    xml = data;
         //   global = data;





           // replaceNULL(data);
            // console.log("raw data is ",data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#table").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                        var row = sheet.rows[rowIndex];
                        var color = $scope.highlight[rowIndex - 1]
                        //  console.log("kendo color1",rowIndex+ " " + color);
                        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            row.cells[cellIndex].background = color;
                        }
                    }
                },
                dataSource: {
                    data
                    //,
                    //pageSize: 20
                },
                dataType: "json",
                height: 350,

                //pageable: {
                //    refresh: false,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                dragAndDrop: true,
               // pageable: true,
                selectable: "true",

                //pageSize: 10,
                // sortable: true,
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
                     field: "index", title: "#", width: 30

                 },
                 {
                     field: "woid", title: "WOID", width: 100

                 },
                 {
                     field: "issuedBy", title: "Issue By", width: 100

                 },
                 {
                     field: "poNumber", title: "PO Number", width: 100

                 },
                 {
                     field: "lineNumber", title: "SO Line No.", width: 50

                 },
                 {
                     field: "description", title: "Description", width: 100

                 },
                 {
                     field: "soRemark", title: "SO Remarks", width: 100

                 },
                 {
                     field: "customer", title: "Customer Name", width: 100
                 },
                 {
                     field: "partID", title: "PartNo.", width: 100
                 },
                 {
                     field: "toolDescription", title: "Part Family", width: 100
                 },
                {
                    field: "actualProdQty", title: "Actual Prod Qty", width: 50
                },
                {
                    field: "actualRecQty", title: "Actual Rec Qty", width: 50
                },
                {
                    field: "completedQty", title: "Completed Qty", width: 50
                },
                {
                    field: "releasedDate", title: "Released Date", width: 100
                },
                {
                    field: "requestedDeliveryDate", title: "Requested Delivery Date", width: 100
                }
                ,
                {
                    field: "committedDeliveryDate", title: "Committed Delivery Date", width: 100
                },
                {
                    field: "startDate", title: "Production Start Time", width: 100
                },
                {
                    field: "endDate", title: "Production End Time", width: 100
                },
                {
                    field: "woStatus", title: "WO Status", width: 100
                },
                {
                    field: "workcenter", title: "Work Center", width: 100
                },
                {
                    field: "procOpSeq", title: "Proc Op Seq", width: 50
                },
                {
                    field: "mcID", title: "Machine ID", width: 100
                },

                {
                    field: "processCompletedQty", title: "Process Completed Qty", width: 100
                },
                {
                    field: "processStatus", title: "Process Status", width: 100
                },
                {
                    field: "remark", title: "Remarks", width: 100
                }



                ]
            })
           // makeTab(data);
            deliveryHighlight();


        }



        //$scope.buildMultipleSelector = function () {

        //    var nosheet = parseInt($('#select_nosheets option:selected').text());


        //    var form = document.getElementById("multiple-selector-form");
        //    form.innerHTML = "";
        //    for (var i = 0; i < nosheet; i++) {
        //        var group = document.createElement("div");
        //        group.setAttribute("class", "form-group");
        //        group.setAttribute("id", "multiple-selector-form-" + i);

        //        var label = document.createElement("label");
        //        label.setAttribute("class", "col-sm-2 control-label");
        //        label.setAttribute("id", "multiple-selector-label-" + i);

        //        var node = document.createTextNode(String(i + 1));
        //        label.appendChild(node);

        //        var selector = document.createElement("select");
        //        selector.setAttribute("class", "col-sm-10");
        //        selector.setAttribute("multiple", "multiple")
        //        selector.setAttribute("id", "multiple-selector-" + i);

        //        for (var j = 0; j < $scope.workCenters.length; j++) {
        //            //  if (String($scope.workCenters[j]).trim()) {
        //            var option = document.createElement("option");
        //            option.value = $scope.workCenters[j];
        //            option.text = $scope.workCenters[j];
        //            selector.appendChild(option);
        //            //  }

        //        }

        //        group.appendChild(label);
        //        group.appendChild(selector);

        //        form.appendChild(group);
        //        $("#multiple-selector-" + i).multiselect({
        //            includeSelectAllOption: true
        //        });
        //    }

        //}


        //'*******************************************************************
        //'Title     :  createSelect
        //'Function  :  
        //'Input     : 
        //'Output    : 
        //'Remark    : to create selector 
        //'*******************************************************************
        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_" + itemName);
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

            if (itemName == "McID") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].mcID);
                }
            }

            if (itemName == "WOID") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].woid);
                }
            }
            if (itemName == "PartID") {

                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].partID);
                }
                //array = rawData;
                //array.unshift("");
            }
            if (itemName == "CustomerList") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].customer);
                }
            }
            if (itemName == "FGDimension") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].fgDimension);
                }
            }

            if (itemName == "PartNO") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].pONumber);
                }
            }

            if (itemName == "SONO") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].lineNumber);
                }
            }

            if (itemName == "Remark") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].remark);
                }
            }

            //if (itemName == "Fai") {
            //    for (var i = 0; i < rawData.length; i++) {
            //        array.push(rawData[i].remark1);
            //    }
            //}

            //array = removeDuplicate(array);
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                myDiv.appendChild(option);
            }
        }

        //function arrUnique(json_all) {
        //    var cleaned = [];
        //    var arr = [];
        //    $.each(json_all.TS_WorkOrderExecutionWorkCenter, function (index, value) {
        //        if ($.inArray(value.WorkCenter, arr) == -1) { //check if id value not exits than add it
        //            arr.push(value.WorkCenter);//push id value in arr
        //            cleaned.push(value); //put object in collection to access it's all values
        //        }
        //    });

        //    //console.log("cleaned",cleaned);
        //    return cleaned;
        //}

        //function arrUniqueWOID(json_all) {
        //    var cleaned = [];
        //    var arr = [];
        //    $.each(json_all.TS_WorkOrderExecutionWO, function (index, value) {
        //        if ($.inArray(value.WOID, arr) == -1) { //check if id value not exits than add it
        //            arr.push(value.WOID);//push id value in arr
        //            cleaned.push(value); //put object in collection to access it's all values
        //        }
        //    });

        //    // console.log("cleaned", cleaned);
        //    return cleaned;
        //}
        //function arrUniqueMcID(json_all) {
        //    var cleaned = [];
        //    var arr = [];
        //    $.each(json_all.TS_WorkOrderExecutionMcID, function (index, value) {
        //        if ($.inArray(value.McID, arr) == -1) { //check if id value not exits than add it
        //            arr.push(value.McID);//push id value in arr
        //            cleaned.push(value); //put object in collection to access it's all values
        //        }
        //    });

        //    //console.log("cleaned McID", cleaned);
        //    return cleaned;
        //}

        //function getPartID(json_all) {
        //    var array = []
        //    $.each(json_all.TS_WorkOrderExecution, function (index, value) {
        //        array.push(value.PartID);
        //    });

        //    // var names = ["Mike", "Matt", "Nancy", "Adam", "Jenny", "Nancy", "Carl"];
        //    var uniqueNames = [];
        //    $.each(array, function (i, el) {
        //        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        //    });

        //    // console.log("uniqueNames",uniqueNames);
        //    return uniqueNames;
        //}

        //function getCustomer(json_all) {
        //    var array = []
        //    $.each(json_all.TS_WorkOrderExecution, function (index, value) {
        //        array.push(value.PartID);
        //    });

        //    var uniqueNames = [];
        //    $.each(array, function (i, el) {
        //        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        //    });
        //    return uniqueNames;
        //}
    }



})();

var activeBtn = "all_btn";
var highlight = [];

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

//function showByWC(id) {

//    //alert(id.id);
//    // console.log("global", global);

//    //change color to do
//    //document.getElementById(id.id).setAttribute("style", "background:#767676;");
//    // document.getElementById(activeBtn).setAttribute("style", "background:#fff;");
//    // activeBtn = id.id;
//    //alert("active",activeBtn);
//    // makeTableTab(global, id.id);
//    // console.log("id is",String(id));
//    if (Number.isInteger(id)) {
//        makeTableTab(global, id, false);
//    } else {
//        //  alert("all_btn");
//        makeTableTab(global, id, true);
//    }

//    // console.log("fafa");
//    deliveryHighlight();

//}



////'*******************************************************************
////'Title     :  convertDate
////'Function  :  
////'Input     :  
////'Output    : 
////'Remark    : convert raw Datetime to display format
////'*******************************************************************
//function convertDate(date) {
//    //var monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//    // "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"
//    //];
//    if (date.indexOf("T") != -1) {
//        if (date != "" && date != undefined && date != null) {
//            var date = date.substring(0, date.indexOf("T"));
//            var dateParts = date.split("-");
//            var year = dateParts[0];
//            //var month = monthNames[parseInt(dateParts[1])];
//            var month = (dateParts[1]);
//            var day = dateParts[2];

//            return day + "/" + month + "/" + year;
//        }
//        return "";
//    } else {
//        return date;
//    }


//}



////function deliveryHighlight() {

////    var threshold = $("#threshold").text();
////    var tbody = document.getElementsByTagName("tbody")[0];
////    tbody = $('tbody');
////    var threshold;


////    for (var i = 0; i < tbody.children().children().length; i++) {
////        if (i % 25 == 14) {
////            var time = $(tbody.children().children()[i]).html();
////            time = time.substring(0, time.indexOf("T"));
////            var dateTime = time.split("-");
////            var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);

////            var today = new Date();
////            var compareDate = new Date(today.getYear(), today.getMonth(), today.getDate() - parseInt(threshold));
////            if (expectedDate < compareDate && expectedDate > today) {
////                $(tbody.children().children()[i]).parent().addClass("yellow-background");
////                highlight.push("#ffff00");
////            } else if (expectedDate < today) {
////                $(tbody.children().children()[i]).parent().addClass("pink-background");
////                highlight.push("#FFCCFF");
////            }


////        }

////        if (i % 25 == 13 || i % 25 == 14 || i % 25 == 15 || i % 25 == 16 || i % 25 == 17) {
////            //  console.log("date converted before", $(tbody.children().children()[i]).html());
////            var date = convertDate($(tbody.children().children()[i]).html());
////            //  console.log("date converted is", date);
////            $(tbody.children().children()[i]).html(String(date));
////        }
////    }
////    // console.log("table", tbody.children().children());
////    // console.log("table1", tbody);
////}


////function replaceNULLOutside(xml) {
////    for (var i in xml) {
////        for (var j in xml[i]) {
////            if (xml[i][j] == null || xml[i][j] == undefined) {
////                xml[i][j] = "null";
////            }
////        }

////    }
////}

////function extractData(workcenter) {
////    //  console.log("extractData",workcenter);
////    var returnData = [];
////    // console.log("GlobalData", GlobalData);
////    //console.log("test1",xml);
////    for (var i = 0; i < GlobalData.length; i++) {
////        if (GlobalData[i]["workcenter"] == workcenter) {
////            returnData.push(GlobalData[i]);
////        }
////    }
////    return returnData;
////}


////function extractDataOutSide(workcenter) {
////    //  console.log("extractData", workcenter);
////    var returnData = [];
////    //   console.log("GlobalData", outSide);
////    //console.log("test1",xml);
////    for (var i = 0; i < outSide.length; i++) {
////        if (outSide[i]["workcenter"] == workcenter) {
////            returnData.push(outSide[i]);
////        }
////    }
////    return returnData;
////}

////function makeTableTab(data, id, isFull) {

////    if (!isFull) {
////        // console.log("tag1", data);
////        // console.log("kendo2", highlight);
////        xml = data;
////        global = data;
////        var output = [];
////        // console.log("extractData pre", id);

////        // console.log("extractData globalTab", globalTab);
////        id = globalTab[parseInt(id)];
////        // console.log("extractData id", id);
////        for (var i = 0; i < id.length; i++) {
////            var outputtemp = extractDataOutSide(id[i]["value"]);
////            for (var j = 0; j < outputtemp.length; j++) {
////                output.push(outputtemp[j]);
////            }
////        }
////        replaceNULLOutside(output);
////        //  console.log("saveFileTest is2 ", output);
////        //  console.log("saveFileTest is1 data", data);
////        data = output;

////    } else {

////        data = outSide;
////    }
////    // console.log("final data is",data);
////    for (var i = 0; i < data.length; i++) {
////        data[i]["index"] = (i + 1);
////    }
////    $("#table").kendoGrid(

////        {
////            //toolbar: ["excel"],
////            //excel: {
////            //    fileName: "Kendo UI Grid Export.xlsx",
////            //    filterable: true,
////            //},
////            dataSource: {
////                data,
////                pageSize: 20
////            },
////            dataType: "json",
////            height: 550,
////            pageable: {
////                refresh: true,
////                pageSizes: true,
////                buttonCount: 5
////            },

////            pageable: true,

////            //pageSize: 10,
////            //sortable: true,
////            pageable: true,
////            //groupable: true,
////            filterable: true,
////            columnMenu: true,
////            reorderable: true,
////            resizable: true,
////            columns: [
////                     {
////                         field: "index", title: "#", width: 150

////                     },
////                     {
////                         field: "woid", title: "WOID", width: 150

////                     },
////                     {
////                         field: "issuedBy", title: "Issue By", width: 150

////                     },
////                     {
////                         field: "poNumber", title: "PO Number", width: 150

////                     },
////                     {
////                         field: "lineNumber", title: "SO Line No.", width: 150

////                     },
////                     {
////                         field: "description", title: "Description", width: 150

////                     },
////                     {
////                         field: "soRemark", title: "SO Remarks", width: 150

////                     },
////                     {
////                         field: "customer", title: "Customer Name", width: 150
////                     },
////                     {
////                         field: "partID", title: "PartNo.", width: 150
////                     },
////                     {
////                         field: "toolDescription", title: "Part Family", width: 150
////                     },
////                    {
////                        field: "actualProdQty", title: "Actual Prod Qty", width: 150
////                    },
////                    {
////                        field: "actualRecQty", title: "Actual Rec Qty", width: 150
////                    },
////                    {
////                        field: "completedQty", title: "Completed Qty", width: 150
////                    },
////                    {
////                        field: "releasedDate", title: "Released Date", width: 150
////                    },
////                    {
////                        field: "requestedDeliveryDate", title: "Requested Delivery Date", width: 150
////                    }
////                    ,
////                    {
////                        field: "committedDeliveryDate", title: "Committed Delivery Date", width: 150
////                    },
////                    {
////                        field: "startDate", title: "Production Start Time", width: 150
////                    },
////                    {
////                        field: "endDate", title: "Production End Time", width: 150
////                    },
////                    {
////                        field: "woStatus", title: "WO Status", width: 150
////                    },
////                    {
////                        field: "workcenter", title: "Work Center", width: 150
////                    },
////                    {
////                        field: "procOpSeq", title: "Proc Op Seq", width: 150
////                    },
////                    {
////                        field: "mcID", title: "Machine ID", width: 150
////                    },

////                    {
////                        field: "processCompletedQty", title: "Process Completed Qty", width: 150
////                    },
////                    {
////                        field: "processStatus", title: "Process Status", width: 150
////                    },
////                    {
////                        field: "remark", title: "Remarks", width: 150
////                    }



////            ]
////        })
////}






