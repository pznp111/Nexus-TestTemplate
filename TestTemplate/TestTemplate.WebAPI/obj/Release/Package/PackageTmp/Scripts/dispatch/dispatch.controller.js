

(function () {
    'use strict';

    angular.module('erp.dispatch').controller('DispatchCtrl', DispatchCtrl);

    DispatchCtrl.$inject = ['$q','$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function DispatchCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable


        $scope.global = [];
        $scope.tenant = tenant;
        $scope.selectedtable1woid = "";
    

        $scope.selectedDispatch = false;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'dispatch-9' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        

        frmAutoDispatch_Load();



        
        //'*******************************************************************
        //'Title     :  frmAutoDispatch_Load
        //'Function  :  Form load 
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function frmAutoDispatch_Load(){
            
            if($('input[name="State1"]:checked').val() == "new-release"){
                $scope.intOption = 0;
               // $("#dispatchALL").show();
                document.getElementById("dispatchALL").setAttribute("style", "visibility:visible");
            } else{
                $scope.intOption = 1;
              //  $("#dispatchALL").hide();
                document.getElementById("dispatchALL").setAttribute("style", "visibility:hidden");
            }


            GenerateWOList();
        }
        
        ////'*******************************************************************
        ////'Title     :  highlight
        ////'Function  :  to highlight kendo table color
        ////'Input     :  
        ////'Output    : 
        ////'Remark    :
        ////'*******************************************************************
        //function highlight() {
        //    var tbody = document.getElementsByTagName("tbody")[0];
        //    tbody = $('tbody');

        //    console.log("highlight", tbody);

        //    console.log("highlight store", $scope.storeData);

        //    for (var i = 0; i < tbody.children().length; i++) {
        //        if ($scope.storeData[i]["status"] != "Pending") {
        //            console.log("highlight",i);
        //            $(tbody.children()[i]).css("background", "green");
        //        }
        //    }

        //    //for (var i = 0; i < tbody.children().children().length; i++) {
                

        //    //    if(i % 12 == 10){
        //    //        console.log("highlight tbody child", tbody.children().children()[i]);
        //    //        var info = $(tbody.children().children()[i]).html();
        //    //        console.log("highlight info", info+"|");
        //    //        //if (info.trim() != "Pending") {
        //    //        //    console.log("highlight info1", i);
        //    //        //    $(tbody.children()).css("background","green");
        //    //        //} else if (info.trim() == "Pending") {
        //    //        //    $(tbody.children()).css("background", "white");
        //    //        //}
        //    //        if (info.trim() == "Pending") {
        //    //            console.log("highlight info1", i);
        //    //            $(tbody.children()).css("background", "white");
        //    //        } else if (info.trim() != "Pending") {
        //    //            $(tbody.children()).css("background", "green");
        //    //        }
        //    //    }

        //    //}
        //}


        //function createTable2Data(selectedWO, intOption) {
        //  //  var returnData = [];

        //    console.log("fnGenerateRouteDetail input", selectedWO + " " + intOption );
        //    if (intOption == 0) {
 
        //        //to-check: new release seems only can be tracked by fnGenerateRouteDetail2
        //        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail2', {
        //            "WOID": selectedWO
        //        })
        //        .then(function (response) {
        //            console.log("new fnGenerateRouteDetail2",response);
                 
        //            return response.data.result;
        //        });
        //    } else {

        //        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail3', {
        //            "WOID": selectedWO
        //        })
        //        .then(function (response) {

        //            console.log("fnGenerateRouteDetail", "3");
        //            console.log("fnGenerateRouteDetail3", response);
        //            if (response.data.result.length != 0) {

        //                $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail4', {
        //                    "WOID": selectedWO
        //                })
        //                .then(function (response) {
        //                    console.log("new fnGenerateRouteDetail4", response);
        //                    returnData = response.data.result;
        //                    return response.data.result;
        //                });

        //            } else {

        //                $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail5', {
        //                    "WOID": selectedWO
        //                })
        //                .then(function (response) {
        //                    console.log("new fnGenerateRouteDetail5", response);
        //                    returnData = response.data.result;
        //                    return response.data.result;
        //                });

        //            }
        //        });
        //    }
        //   // return returnData;
        //}
        //'*******************************************************************
        //'Title     :  fnGenerateRouteDetail
        //'Function  :  function to make table2
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function fnGenerateRouteDetail(selectedWO, intOption,intDispatchAll, blDispatchState){


            console.log("fnGenerateRouteDetail input", selectedWO + " " + intOption + " " + intDispatchAll + " " + blDispatchState);
            if(intOption == 0){
                //if (blDispatchState == true){
                //    $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail1', {
                //        "WOID": selectedWO
                //    })
                //    .then(function (response) {
                //        $scope.table2Data = response.data.result;
                //        console.log("fnGenerateRouteDetail21","1");
                //        makeTable2(blDispatchState);
                //    });
                //} else{
                //    $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail2', {
                //        "WOID": selectedWO
                //    })
                //    .then(function (response) {
                //        $scope.table2Data = response.data.result;
                //        console.log("fnGenerateRouteDetail31","2");
                //        makeTable2(blDispatchState);
                //    });
                //}

                //to-check: new release seems only can be tracked by fnGenerateRouteDetail2
                    $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail2', {
                        "WOID": selectedWO
                    })
                    .then(function (response) {
                        $scope.table2Data = response.data.result; 
                        console.log("fnGenerateRouteDetail31","2");
                        makeTable2(blDispatchState);
                    });




            } else{

                $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail3', {
                    "WOID": selectedWO
                })
                .then(function (response) {

                    console.log("fnGenerateRouteDetail", "3");
                    console.log("fnGenerateRouteDetail3", response);
                    if(response.data.result.length !=0){

                        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail4', {
                            "WOID": selectedWO
                        })
                        .then(function (response) {
                            $scope.table2Data = response.data.result; 
                            console.log("fnGenerateRouteDetail41","4");
                            makeTable2(blDispatchState, selectedWO);
                        });

                    } else{

                        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail5', {
                            "WOID": selectedWO
                        })
                        .then(function (response) {
                            console.log("fnGenerateRouteDetail51", "5");
                            $scope.table2Data = response.data.result; 
                            makeTable2(blDispatchState, selectedWO);
                        });

                    }
                });
            }

        }



        function makeTable2(blDispatchState,selectedWO) {
            console.log("fnGenerateRouteDetail maketable2", $scope.table2Data);
            console.log("fnGenerateRouteDetail maketable2 status", blDispatchState);
            console.log("fnGenerateRouteDetail maketable2 item", $scope.dispatchItem); // selected item status


            for (var i = 0; i < $scope.table2Data.length; i++) {
                if (!blDispatchState) {// not dispatched
                    $scope.table2Data[i]["status"] = "pending"
                } else {//dispatched
                    $scope.table2Data[i]["status"] = $scope.dispatchItem
                }
                
                if ($scope.toggled) {
                    $scope.table2Data[i]["status"] = "queuing";
                    $scope.table2Data[i]["newstatus"] = "queuing";
                }
                $scope.table2Data[i]["index"] = (i + 1);
                $scope.table2Data[i]["newstatus"] = "";
            }
            console.log("maketable2", $scope.table2Data);

            for (var i = 0; i < $scope.currentData.length;i++){
                if($scope.currentData[i]['woid'] == selectedWO){
                    $scope.currentData[i]['table2Data'] = $scope.table2Data;
                }
            }

            var data = $scope.table2Data;
            $("#dispatch-table2").kendoGrid({

                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 550,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },

                pageable: true,
                sortable: false,
                pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: false,
                resizable: true,
                columns: [
                    {
                        field: "status", title: "Dispatch State", width: 150,
                        template: "# if (status.trim().toLowerCase() == 'pending') { #" +
               "Not Dispatch" +
               "# } else { #" +
               "Dispatch" +
               "# } #"
                    },
                 {
                     field: "workCenter", title: "Work Center", width: 150

                 },
                 {
                    field: "index", title: "Index", width: 150

                 },
                 {
                     field: "routeID", title: "Route ID", width: 150

                 },
                 {
                     field: "routeName", title: "Route Name", width: 150

                 },
                 {
                     field: "procOpSeq", title: "Proc OpSeq", width: 150

                 },
                 {
                     field: "mcID", title: "Machine ID", width: 150

                 },
                 {
                     field: "mcType", title: "MC Type", width: 150

                 },
                 {
                     field: "remark", title: "Remark", width: 150

                 }
                 //, {
                 //                  field: "status", title: "Dispatch State", width: 150,
                 //                  template: "# if (!blDispatchState) { #" +
                 //         "Don't Dispatch" +
                 //         "# } else { #" +
                 //         "Dispatch" +
                 //         "# } #"

                 //              }


                ]
                //,

                //dataBound: function (e) {
                //    // get the index of the UnitsInStock cell
                //    var columns = e.sender.columns;
                //    var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "status" + "]").index();

                //    // iterate the data items and apply row styles where necessary
                //    var dataItems = e.sender.dataSource.view();
                //    console.log("dataItems", dataItems);
                //    for (var j = 0; j < dataItems.length; j++) {
                //        var discontinued = dataItems[j].get("status");
                //        console.log("dataItems1", discontinued);
                //        var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
                //        console.log("dataItems row", row);
                //        if (discontinued.trim() != "Pending") {
                //            row.addClass("green-background");
                //        }
                //    }
                //}
            })




            ''
        }

        function makeTable(data) {

            $scope.storeData = data;

            console.log("$scope.storeData", $scope.storeData);

            var $new = $("#dispatch-table1").kendoGrid({

                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 550,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },

                pageable: true,
                sortable: false,
                pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: false,
                resizable: true,
                columns: [
                     {
                         field: "status", title: "Dispatch State", width: 150,
                         template: "# if (status.trim() == 'Pending') { #" +
                "Don't Dispatch" +
                "# } else { #" +
                "Dispatch" +
                "# } #"

                     }
                     ,
                 {
                     field: "woid", title: "Work Order", width: 150

                 },
                 {
                     field: "poNumber", title: "PO No", width: 150

                 },
                 {
                     field: "partID", title: "Part No", width: 150

                 },
                 {
                     field: "toolDescription", title: "Part Family", width: 150

                 },
                 {
                     field: "soRemark", title: "SO Remrks", width: 150

                 },
                 {
                     field: "soLineNumber", title: "SO LineNo.", width: 150

                 },
                 {
                     field: "actualProdQty", title: "Actual Prod. Qty", width: 150

                 },
                 {
                     field: "requestedDeliveryDate", title: "Requested Delivered Date", width: 150

                 },
                 {
                     field: "orderType", title: "Order Type", width: 150

                 },
                 {
                     field: "releasedDate", title: "Released Date", width: 150

                 },
                 {
                     field: "status", title: "Status", width: 150

                 }
                 //,
                 //    {
                 //    field: "status", title: "Dispatch State", width: 150,
                 //             template: "# if (status.trim() == 'Pending') { #" +
                 //    "<div class='table-checkbox' ><button type = 'button' ng-click='dispatchOrder()' ng-model = 'test'>Don't Dispatch<br></div>" +
                 //    "# } else { #" +
                 //    "<div class='table-checkbox'><input type = 'checkbox' checked disabled>Dispatch<br></div>" +
                 //    "# } #"

                 //}
                 //{
                 //    field: "status", title: "Dispatch State", width: 150,
                 //             template: "# if (status.trim() == 'Pending') { #" +
                 //    "<div class='table-checkbox'><input class='checkbox' type = 'checkbox' ng-click='dispatchOrder()' ng-model = 'test'>Don't Dispatch<br></div>" +
                 //    "# } else { #" +
                 //    "<div class='table-checkbox'><input type = 'checkbox' checked disabled>Dispatch<br></div>" +
                 //    "# } #"

                 //}
                              


                ],

                dataBound: function (e) {
                    // get the index of the UnitsInStock cell
                    var columns = e.sender.columns;
                    var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "status" + "]").index();

                    // iterate the data items and apply row styles where necessary
                    var dataItems = e.sender.dataSource.view();
                    console.log("dataItems", dataItems);
                    for (var j = 0; j < dataItems.length; j++) {
                        var discontinued = dataItems[j].get("status");
                        console.log("dataItems1",discontinued);
                        var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
                        console.log("dataItems row",row);
                        if (discontinued.trim() != "Pending") {
                            row.addClass("selected-font");
                        }
                    }
                }
            })

       

            // highlight();
          
        }

        //'*******************************************************************
        //'Title     : fnInsertWO
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function fnInsertWO(rowno) {

//            alert(
//    ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
//    ("00" + d.getDate()).slice(-2) + "/" +
//    d.getFullYear() + " " +
//    ("00" + d.getHours()).slice(-2) + ":" +
//    ("00" + d.getMinutes()).slice(-2) + ":" +
//    ("00" + d.getSeconds()).slice(-2)
//);

            var timeStamp = new Date();
            timeStamp = (
                ( timeStamp.getFullYear()) + "-" +
                ("00"  +(timeStamp.getMonth() + 1)).slice(-2) +"-" +
                ("00"+timeStamp.getDate()).slice(-2) + "T" +
                ("00" + timeStamp.getHours()).slice(-2) + ":" +
                ("00" + timeStamp.getMinutes()).slice(-2) + ":" +
                ("00" + timeStamp.getSeconds()).slice(-2)
                );

            alert(timeStamp);
            var promiseArray = [];
            console.log("fnInsertWO", $scope.currentData);
            console.log("fnInsertWO rowno", rowno);
            


            promiseArray.push($http.post(config.baseUrlApi + 'HMLVTS/fnInsertWO', {
                "WOID": $scope.currentData[rowno]["woid"],
                "PartID": $scope.currentData[rowno]["partID"],
                "RequestedDeliveryDate": $scope.currentData[rowno]["requestedDeliveryDate"],
                "CommittedDeliveryDate": $scope.currentData[rowno]["committedDeliveryDate"],
                "ReleasedProdQty": $scope.currentData.length,//WOReleasedProdQtyCol
                "ReleasedProdDate": timeStamp,
               // "ActualProdQty": $scope.storeData[rowno]["actualProdQty"],//WOReleasedProdQtyCol
                "ActualProdQty": $scope.currentData.length,//WOReleasedProdQtyCol
                "ActualProdDate": timeStamp,
                "ActualRecQty": $scope.currentData.length,//WOReleasedProdQtyCol
                "ActualRecDate": timeStamp,
                "OutstandingQty": $scope.currentData.length,//WOReleasedProdQtyCol
                "OutstandingDate": timeStamp,
                "WOStatus": "Queuing",
                "PPID": $scope.currentData[rowno]["ppid"],
                "SalesOrderID": $scope.currentData[rowno]["salesOrderID"],
                "ToolDescription": $scope.currentData[rowno]["toolDescription"],
                "ReleasedDate": $scope.currentData[rowno]["releasedDate"],
                "OrderType": $scope.currentData[rowno]["orderType"],
                "PlannerRemark": $scope.currentData[rowno]["plannerRemark"],


            })

            );

            $q.all(promiseArray).then(function (response) {
                console.log("fnInsertWO1",response);
            });

        }

        //'*******************************************************************
        //'Title     : fnEditWO
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : may not be useful, unnecessary 
        //'*******************************************************************
        function fnUpdateRoute(index) {
            var promiseArray = [];


            var table2Data = $scope.currentData[index]['table2Data'];
            for(var i =0;i<table2Data.length;i++){
                var woid = table2Data[i]['woid'];
                var procopseq = table2Data[i]['procOpSeq'];
                var prioritizedNo = table2Data[i]['prioritizedNo'];

                if (prioritizedNo == 0) {
                    prioritizedNo = "-1";
                } else {
                    prioritizedNo = "9999";
                }
                promiseArray.push(
           $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateRoute', {
               "WOID": woid,
               "ProcOpSeq": procopseq,
               "PrioritizedNo": prioritizedNo
           })
               );
            }





            $q.all(promiseArray).then(function (response) {
                console.log("fnUpdateRoute",response);
            });
        }

        //'*******************************************************************
        //'Title     : fnEditWO
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : may not be useful, unnecessary 
        //'*******************************************************************
        function fnEditWO()
        {



            console.log("$scope.table2Data", $scope.table2Data); //table2 data  if there is newstatus, use new status, otherwise need to dispatch/dont dispatch
            console.log("$scope.currentData", $scope.currentData); //table1 data

            for (var i = 0; i < $scope.currentData.length; i++) {
                console.log("fnEditWO Test",$scope.currentData[i]['dstate']+" "+i);
                //  if ($scope.currentData[i]['dstate'] && $scope.currentData[i]['newstatus'] != null && $scope.currentData[i]['newstatus'] == "Queuing") {
                if ($scope.currentData[i]['dstate']) {
                    fnUpdateWO(i);
                    fnUpdateRoute(i);
                    fnUpdatePPOrder(i);

                }

            }


            //$http.get(config.baseUrlApi + 'HMLVTS/fnAddWO1')
            //        .then(function (response) {
            //            console.log("fnAddWO", response);

            //            console.log("fnAddWO length", response.data.result.length);
            //            //to check
            //            if (response.data.result.length != 0) {
            //                var promiseArray1 = [];
            //                for (var i = 0; i < response.data.result.length; i++) {
            //                    console.log("fnAddWO woid", response.data.result[i]["woid"]);

            //                    promiseArray1.push(
            //                        $http.post(config.baseUrlApi + 'HMLVTS/fnAddWO2', {
            //                            "WOID": String(response.data.result[i]["woid"]).trim()
            //                        })
            //                        );
            //                }


                            

            //                console.log("fnAddWO promise", promiseArray1);
            //                $q.all(promiseArray1).then(function (response) {
            //                    console.log("fnAddWO promiseArray1", response);
            //                    for (var intI = 0; intI < response.length; intI++) {

            //                        //update WO
            //                        fnUpdateWO(intI);
            //                        //update Route,QCEquipment and WOexecution
            //                        //fnUpdateRoute(intI, dtRoute);;
            //                        //update PPOrder
            //                        //fnUpdatePPOrder(intI);
            //                    }
            //                });
            //            }

            //        });
        }


        //'*******************************************************************
        //'Title     : fnAddWO
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function fnAddWO() {
            alert("fnAddWO");

            // $scope.storeData
            console.log("$scope.table2Data", $scope.table2Data); //table2 data  if there is newstatus, use new status, otherwise need to dispatch/dont dispatch
            console.log("$scope.currentData", $scope.currentData); //table1 data

            for (var i = 0; i < $scope.currentData.length; i++) {
               // if ($scope.currentData[i]['dstate'] && $scope.currentData[i]['newstatus'] != null && $scope.currentData[i]['newstatus'] == "Queuing") {
                  if ($scope.currentData[i]['dstate'] ) {
                    alert("fnaddwo:"+i);
                    fnInsertWO(i);
                    fnUpdatePPOrder(i);
                    fnInsertRoute(i);
                }

            }

        }

        //'*******************************************************************
        //'Title     :  confirm
        //'Function  :  to save result
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.confirm = function () {


            //  collectData();
            console.log("$scope.table2Data after", $scope.table2Data);
            console.log("($scope.intOption",$scope.intOption);
            if ($scope.intOption == 0) //New Released
            {
                //Add new record to WO, Route, QCEquipment, Execution and update PPOrder
                fnAddWO();
            }
            else //being dispatched before WOs
            {
                //Update record to WO, Route, QCEquipment, Execution and update PPOrder
                fnEditWO();


            }
        }

        ////'*******************************************************************
        ////'Title     :  collectData
        ////'Function  :  to collect data from ui
        ////'Input     :  
        ////'Output    :  
        ////'Remark    :
        ////'*******************************************************************
        //function collectData() {

        //    var grid1 = $('#dispatch-table1').data('kendoGrid');
        //    var items1 = grid.dataSource.view();

        //    var grid2 = $('#dispatch-table2').data('kendoGrid');
        //    var items2 = grid.dataSource.view();
        //    //$scope.currentData

        //    console.log("collectdata", items1);
        //    console.log("collectdata",items2);
        //}


        //'*******************************************************************
        //'Title     : fnInsertRoute
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function fnInsertRoute(index) {  //todo: doing note: just save the one that is been selected
            //console.log("fnInsertRoute", $scope.currentData);
            var woid = String($('#select_mctype option:selected').text()).trim();
            if(woid.trim() == ""){
                woid = $scope.selectedtable1woid;
            }
            var promiseArray0 = [];
            promiseArray0.push($http.post(config.baseUrlApi + 'HMLVTS/getWOdetail', {
                "WOID": woid
            })
            );

            $q.all(promiseArray0).then(function (response) {

                if(response.length!=0){
                var dataRow = response[0].data.result
                    console.log("getWOdetail", dataRow);
            




                var promiseArray = [];
                var promiseArray1 = [];
                var promiseArray2 = [];

                var table2Data = $scope.currentData[index]['table2Data'];
                console.log("fnInsertRoute table2Data",table2Data);
                if ($scope.selectedDispatch) {

                    for (var i = 0; i < table2Data.length; i++) {
                      //  var rowno = findByWOID($scope.table2Data[i]["woid"]);

                       // console.log("fnInsertRoute rowno", rowno);

                        //var prioritizedNO = String(table2Data[i]["prioritizedNo"]);
                        if (String(table2Data[i]["prioritizedNo"]) == "0") {
                            prioritizedNO = 9999;
                        }//(String(table2Data[i]["newstatus"]).toLocaleLowerCase() == "queuing")

                        var PrioritizedNo = "0";
                        if (String(table2Data[i]["newstatus"]).trim() != "") {
                            PrioritizedNo = "9999";
                        }

                            // fnInsertWOExecution
                            if(true){
                        
                          //  if (true) {            // fnInsertWOExecution
                          //  if (table2Data[i]["newstatus"] == "" || String(table2Data[i]["newstatus"]).toLocaleLowerCase() == "queuing") { // only save if table2 item is selected dispatch

                          //  var attributeGroup = (table2Data[i]["attributeGroup"] == null)? "":table2Data[i]["attributeGroup"]
                                promiseArray.push($http.post(config.baseUrlApi + 'HMLVTS/fnInsertRoute', {
                                    "WOID": table2Data[i]["woid"],
                                    "WorkCenter": table2Data[i]["workCenter"],
                                    "RouteID": table2Data[i]["routeID"],
                                    "OpSeq": table2Data[i]["opSeq"],
                                    "ProcOpSeq": table2Data[i]["procOpSeq"],//to check
                                    "McID": table2Data[i]["mcID"].trim(),
                                    "McType": table2Data[i]["mcType"].trim(),
                                    "Remark": table2Data[i]["remark"],
                                    "RouteName":table2Data[i]["routeName"],//todo
                                    "MacGroup": (table2Data[i]["macGroup"] == null) ? "0" : table2Data[i]["macGroup"],
                                    "AttributeGroup": (table2Data[i]["attributeGroup"] == null)? "":table2Data[i]["attributeGroup"],
                                    "PrioritizedNo": PrioritizedNo
                                })
                                );

                                if (String(table2Data[i]["mcType"]).toUpperCase().trim() == "QC") {
                                    // fnInsertQCEquipment(dataRow);
                                    console.log("fnInsertRoute qcrow", i);
                                    var mcid = "";
                                    var res = table2Data[i]["mcID"].split(",");
                                    console.log("fnInsertRoute res", res);
                                    for (var j = 0; j < res.length; j++) {
                                        var s = String(res[j]).trim();
                                        if (s != "") {
                                            promiseArray1.push($http.post(config.baseUrlApi + 'HMLVTS/fnInsertQCEquipment', {
                                                "WOID": table2Data[i]["woid"],
                                                "WorkCenter": table2Data[i]["workCenter"],
                                                "RouteID": table2Data[i]["routeID"],
                                                "OpSeq": table2Data[i]["opSeq"],
                                                "ProcOpSeq": table2Data[i]["procOpSeq"],
                                                "McID": s
                                            })
                                        );

                                        }
                                    }

                                }

                                if (String(table2Data[i]["newstatus"]).trim() != "") {            // fnInsertWOExecution
                                  //  if (true) {            // fnInsertWOExecution
                                    var timeStamp = new Date().toDateInputValue();
                                    var mctype = String(table2Data[i]["mcType"]);
                                    if (String(table2Data[i]["mcType"]) == "QC") {
                                        mctype = "";
                                    }

                                    promiseArray2.push($http.post(config.baseUrlApi + 'HMLVTS/fnInsertWOExecution', {
                                        "WOID": $scope.currentData[index]["salesOrderID"],
                                        "PartID": $scope.currentData[index]["partID"],
                                        "ActualRecQty": $scope.currentData.length,
                                        "ActualRecDate": timeStamp,
                                        "OutstandingQty": $scope.currentData.length,
                                        "OutstandingDate": timeStamp,
                                        "CompletedQty": 0,
                                        "CompletedDate": timeStamp,
                                        "McID": table2Data[i]["mcID"].trim(),
                                        "MCType": mctype.trim(),
                                        "RouteID": table2Data[i]["routeID"],
                                        "WorkCenter": table2Data[i]["workCenter"],
                                        "OpSeq": String(table2Data[i]["opSeq"]),
                                        "ProcOpSeq": String(table2Data[i]["procOpSeq"]),
                                        "WOStatus": "Queuing"
                                    })
                                    );
                                }

                            }
                        }
                    }

                    console.log("fnInsertRoute promisearray", promiseArray);
                    console.log("fnInsertRoute promisearray1", promiseArray1);
                    console.log("fnInsertRoute promisearray2", promiseArray2);
                    $q.all(promiseArray).then(function (response) {
                        console.log("fnInsertRoute response", response);
                    });
                    $q.all(promiseArray1).then(function (response) {
                        console.log("fnInsertRoute response1", response);
                    });
                    $q.all(promiseArray2).then(function (response) {
                        console.log("fnInsertRoute response2", response);
                    });
                }
            
            });
        }

        //'*******************************************************************
        //'Title     : fnUpdatePPOrder
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function fnUpdatePPOrder(rowno)
        {
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];
            var promiseArray6 = [];
            var promiseArray7 = [];




            var woid = String($('#select_mctype option:selected').text()).trim();
            
            // var table2Data = $scope.currentData[index]['table2Data'];
            var woid = $scope.currentData[rowno]['salesOrderID'];
            var dstate = $scope.currentData[rowno]['dstate'];
            if(dstate){

            //if(woid.trim() == ""){
            //    woid = $scope.selectedtable1woid;
            //}
            //console.log("fnUpdatePPOrder currentdata", $scope.currentData);
            //console.log("fnUpdatePPOrder rowno", rowno);
            //var Ancestor_WOID = woid;

            var Ancestor_WOID = "";
            if(woid.indexOf("-")!= -1){
                Ancestor_WOID = woid.substring(0,(woid.indexOf("-")));
            }

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder', {
                "WOID": woid
            })
                );

            $q.all(promiseArray).then(function (response) {
                console.log("fnUpdatePPOrder", response);

                if(response.length == 0){

                    if (Ancestor_WOID == "") {


                        if ($scope.currentData[rowno]["woid"].indexOf("-") != -1) {
                            alert("here1");
                            promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder1', {
                                "WOID": woid
                            })
                                );

                            promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder2', {
                                "WOID": woid
                            })
                                );

                            promiseArray3.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder3', {
                                "WOID": woid
                            })
                                );

                            promiseArray4.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder4', {
                                "WOID": woid
                            })
                                );

                            promiseArray5.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder5', {
                                "PPID": woid
                            })
                                );

                        } else {
                            alert("here2");
                            promiseArray6.push(
                           $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder6', {
                               "PPID": $scope.currentData[rowno]["ppid"]
                           })
                               );
                        }

                    }

                } else {
                    promiseArray7.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/fnUpdatePPOrder7', {
                         "PPID": $scope.currentData[rowno]["ppid"]
                     })
                         );
                }


                $q.all(promiseArray).then(function (response) {
                    console.log("fnUpdateWO0", response);
                });
                $q.all(promiseArray1).then(function (response) {
                    console.log("fnUpdateWO1", response);
                });
                $q.all(promiseArray2).then(function (response) {
                    console.log("fnUpdateWO2", response);
                });
                $q.all(promiseArray3).then(function (response) {
                    console.log("fnUpdateWO3", response);
                });
                $q.all(promiseArray4).then(function (response) {
                    console.log("fnUpdateWO4", response);
                });
                $q.all(promiseArray5).then(function (response) {
                    console.log("fnUpdateWO5", response);
                });
                $q.all(promiseArray6).then(function (response) {
                    console.log("fnUpdateWO6", response);
                });
                $q.all(promiseArray7).then(function (response) {
                    console.log("fnUpdateWO7", response);
                });
                         


            }
            );



        }
            



    }

        //'*******************************************************************
        //'Title     :  AddWorkOrderRouteDispatch
        //'Function  :  dispatch a work order
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function fnUpdateWO(rowno) {

            var promiseArray = [];
          //  for (var i = 0; i < $scope.currentData.length; i++ ){
                if ($scope.currentData[rowno]["dstate"] == true) {
                    $http.post(config.baseUrlApi + 'HMLVTS/AddWorkOrderRouteDispatch1', {
                        "WOID": $scope.currentData[rowno]["woid"]
                             })
                }
         //   }


            $q.all(promiseArray).then(function (response) {
                console.log("fnUpdateWO", response);
            });

           
        }



        //'*******************************************************************
        //'Title     :  AddWorkOrderRouteDispatch
        //'Function  :  dispatch a work order
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
       // function AddWorkOrderRouteDispatch(){
       //     var grid = $("#dispatch-table1").data("kendoGrid");
       //     var selectedItem = grid.dataItem(grid.select());

       //     var selectedWO = selectedItem.woid;

       //     console.log("AddWorkOrderRouteDispatch wo", selectedWO+"||");
       //     //todo: post1  line 1248
       //     $http.post(config.baseUrlApi + 'HMLVTS/AddWorkOrderRouteDispatch1', {
       //         "WOID": selectedWO
       //     })
       //.then(function (response) {
       //    console.log("AddWorkOrderRouteDispatch",response.data.result);
       //    if(response.data.result.length != 0){
       //    if ($scope.storeData.length != 0) {

       //        var promiseArray = [];

       //        for(var i = 0;i < $scope.storeData.length;i++){
       //        promiseArray.push(
       //             $http.post(config.baseUrlApi + 'HMLVTS/AddWorkOrderRouteDispatch2', {
       //            "WOID": selectedWO,
       //            "WorkCenter": WorkCenter,
       //            "RouteID",RouteID,
       //            "OpSeq",OpSeq,
       //            "ProcOpSeq",ProcOpSeq,
       //            "McID":McID,
       //            "McType":McType,
       //            "PrioritizedNo":PrioritizedNo,
       //            "Remark":Remark,
       //            "RouteName":RouteName,
       //            "MacGroup":MacGroup,
       //            "AttributeGroup":AttributeGroup

       //        })
       //             );
       //        }



       //        $q.all(promiseArray).then(function (response) {

       //        });
          
       //        $http.post(config.baseUrlApi + 'HMLVTS/AddWorkOrderRouteDispatch2', {
       //            "WOID": selectedWO,
       //            "WorkCenter": WorkCenter,
       //            "RouteID",RouteID,
       //            "OpSeq",OpSeq,
       //            "ProcOpSeq",ProcOpSeq,
       //            "McID":McID,
       //            "McType":McType,
       //            "PrioritizedNo":PrioritizedNo,
       //            "Remark":Remark,
       //            "RouteName":RouteName,
       //            "MacGroup":MacGroup,
       //            "AttributeGroup":AttributeGroup

       //        })
       //         .then(function (response) {

       //         });
       //    }
       //}


       //});
       //     //todo: if post1 result != []
       //     //post2 line 1273, display table2

       //     console.log("AddWorkOrderRouteDispatch", selectedItem);
       // }

        //'*******************************************************************
        //'Title     :  toggleRadio
        //'Function  :  regenerate data when radio nutton option is changed
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.toggleRadio = function () {
            frmAutoDispatch_Load();
           // $("#dispatchALL").hide();

        }

        function findByWOID(woid) {
            for (var i = 0; i < $scope.currentData.length; i++){
                if ($scope.currentData[i]["woid"] == woid) {
                    return i;
                }
            }
            return -1;
        }



        //function findByIndexInTable2(index) {
        //    for (var i = 0; i < $scope.table2Data.length;i++){
        //        if ($scope.table2Data[i]["index"] == index) {
        //            return i;
        //        }
                
        //    }
        //    return -1;
        //}


        $scope.tryDispatchTable2 = function () {
            console.log("tryDispatch2 selectedtable1woid", $scope.selectedtable1woid);
            console.log("tryDispatch2 $scope.currentData", $scope.currentData);
            alert($scope.selectedtable1woid);
            var grid = $('#dispatch-table2').data('kendoGrid');
            var items = grid.dataSource.view();
            var item1 = grid.select();
            var changed = false;

            console.log("tryDispatchTable2 toggled", $scope.toggled);
            console.log("tryDispatchTable2 (String($($(item1).children()[0]).html()).toLowerCase().trim()", "!"+String($($(item1).children()[2]).html()).toLowerCase().trim()+"!");

            if ($scope.toggled) {
                if (String($($(item1).children()[0]).html()).toLowerCase().trim() == "not dispatch") {
                    alert("21");
                    $($(item1).children()[0]).html("Dispatch");

                   // var index = findByIndexInTable2(String($($(item1).children()[2]).html()).toLowerCase().trim());
                    var index = parseInt(String($($(item1).children()[2]).html()).toLowerCase().trim()) -1;
                    alert(index);
                    if (index != -1) {
                        for (var i = 0; i < $scope.currentData.length;i++){
                            if ($scope.currentData[i]['woid'] == $scope.selectedtable1woid) {

                                $scope.currentData[i]['table2Data'][index]["newstatus"] = "Queuing";
                            }
                        }
                       // $scope.table2Data[index]["newstatus"] = "Queuing";
                    }


                } else if (String($($(item1).children()[0]).html()).toLowerCase().trim() == "dispatch") {
                    alert("22");
                    $($(item1).children()[0]).html("Not Dispatch");

                   // var index = findByIndexInTable2(String($($(item1).children()[2]).html()).toLowerCase().trim());
                    var index = parseInt(String($($(item1).children()[2]).html()).toLowerCase().trim()) - 1;
                    alert(index);
                    if (index != -1) {
                        for (var i = 0; i < $scope.currentData.length; i++) {
                            if ($scope.currentData[i]['woid'] == $scope.selectedtable1woid) {
                                $scope.currentData[i]['table2Data'][index]["newstatus"] = "";
                               // alert("changed"+" "+i+" "+index);
                            }
                        }
                       // $scope.table2Data[index]["newstatus"] = "Pending";
                    }
                }
            }

            console.log("tryDispatch2 current", $scope.currentData);
        }

        $scope.tryDispatch = function () {
            //alert("hahaha");
            // var dispatchState = 0;
            var blDispatchState = false;
            $scope.toggled = false;
            var grid = $('#dispatch-table1').data('kendoGrid');
            var items = grid.dataSource.view();
            var item1 = grid.select();

            console.log("this grid", grid);
            console.log("this items", items);
            console.log("this item1", $(item1));
            console.log("this uid", $(item1).attr("data-uid"));

            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem);

            if (selectedItem != null) {

            var intDispatchAll = 0;
            if($('input[name="all"]:checked').val() == "all"){
                intDispatchAll = 1;
            }

            if (selectedItem.status.toLowerCase() != "pending") {
                blDispatchState = 1;
            }

            console.log("this selected", selectedItem, $scope.intOption, intDispatchAll, blDispatchState);



            


            $scope.selectedtable1woid = selectedItem['woid'];

            var selectedWO = String($('#select_mctype option:selected').text()).trim();

            
            // $(item1).hide();
            // $(item1).css("background", "green");

            for (var i = 0; i < $(item1).children().length;i++){
                console.log("this children",$(item1).children()[i]);
            }
            console.log("this children1", (String($($(item1).children()[11]).html()).trim() == "Don't Dispatch"));
            console.log("this children1", String($($(item1).children()[11]).html())+"!");
            console.log("this children1", String($($(item1).children()[10]).html()).trim()+"!")
            $scope.dispatchItem = String($($(item1).children()[11]).html()).trim();
            $scope.dispatchStatus = $($(item1).children()[10]).html();

            console.log("this children2", $scope.dispatchItem);
            console.log("this children3", String(selectedItem.status).toLowerCase().trim());
            console.log("this children4", String($($(item1).children()[1]).html()).toLowerCase().trim());
            // alert(String($($(item1).children()[11]).html()).toLowerCase().trim());
            console.log("test2", $scope.currentData);
            // if (String($($(item1).children()[0]).html()).toLowerCase().trim() == "don't dispatch" && String($($(item1).children()[11]).html()).toLowerCase().trim() == "pending") {
            if (String($($(item1).children()[0]).html()).toLowerCase().trim() == "don't dispatch" && String(selectedItem.status).toLowerCase().trim() == "pending") {
                alert("1");
                $scope.selectedDispatch = true;
                $($(item1).children()[0]).html("Dispatch");
                $(item1).css("color", "red");
                blDispatchState = true;
                var selectedWO = "";
                var strWOStatus = "";
                saveInfo(selectedItem.woid, true);
                //AddWorkOrderRouteDispatch();
                // alert("1")
                // changeTable2();
                $scope.toggled = true;

                console.log("test2", currentData);

                var index = findByWOID(String($($(item1).children()[1]).html()).toLowerCase().trim());
                if(index != -1){
                    $scope.currentData[index]["status"] = "Queuing";
                    $scope.currentData[index]["newstatus"] = "Queuing";
                }
               // saveRoute("1");
            } else if (String($($(item1).children()[0]).html()).toLowerCase().trim() == "dispatch" && String(selectedItem.status).toLowerCase().trim() == "pending") {
                alert("2");
                $scope.selectedDispatch = false;
                $($(item1).children()[0]).html("Don't Dispatch")
                $(item1).css("color", "black");
                blDispatchState = false;
                // alert("2");
                // AddWorkOrderRouteDispatch();
                saveInfo(selectedItem.woid, false);
                console.log("test2", currentData);
                // changeTable2();
                $scope.toggled = false;

                var index = findByWOID(String($($(item1).children()[1]).html()).toLowerCase().trim());
                if (index != -1) {
                    $scope.currentData[index]["status"] = "Pending";
                    $scope.currentData[index]["newstatus"] = null;
                }
               // saveRoute("2");
            }
            
            //if ($scope.dispatchItem == "Don't Dispatch" && $scope.dispatchStatus == "Pending") {
            //    $($(item1).children()[11]).text("Dispatch");
            //    $(item1).css("background", "green");
            //    $scope.dispatchItem = "Dispatch";
            //} else if ($scope.dispatchItem == "Dispatch" && $scope.dispatchStatus == "Pending") {
            //    $($(item1).children()[11]).text("Don't Dispatch")
            //    $(item1).css("background", "red");
            //    $scope.dispatchItem = "Don't Dispatch";
            //}

            var rowSelected = $(item1).attr("data-uid");
            console.log("this",$(this).attr("class"));

            //var grid = $("#dispatch-table1").data("kendoGrid");
            // var selectedItem = grid.dataItem(grid.select());
            
            console.log("try1 test",$scope.currentData);
            //make table2         
            fnGenerateRouteDetail(selectedItem.woid, $scope.intOption, intDispatchAll, blDispatchState);

        }

        }

        //'*******************************************************************
        //'Title     :  toggleRadio
        //'Function  :  regenerate data when radio nutton option is changed
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function changeTable2() {
            
        }


        //'*******************************************************************
        //'Title     :  toggleRadio
        //'Function  :  regenerate data when radio nutton option is changed
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.refresh = function () {
            GenerateDispatchWOList();
        }

        //'*******************************************************************
        //'Title     :  GenerateDisptachWOList
        //'Function  :  generate dispatch WO List based on selected option
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateDispatchWOList() {
            var promiseArray = [];

            var woid = String($('#select_mctype option:selected').text()).trim();
            console.log("woid",woid);
            if ($scope.intOption == 0) {

                $http.post(config.baseUrlApi + 'HMLVTS/GenerateDispatchWOList1', {
                    "WOID": woid
                })
        .then(function (response) {

            var data = response.data;
            console.log("debug1",response);
            $scope.currentData = data.result;

            makeStatue();
            console.log("GenerateDispatchWOList1", data.result);
            var test = makeTable(data.result);






           for (var i = 0; i < $scope.currentData.length; i++) {
               //promiseArray.push(
               //    $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail2', {
               //        "WOID": $scope.currentData[i]["woid"]
               //    })
               //    );
               $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail2', {
                   "WOID": $scope.currentData[i]["woid"],
                   "Index": i
               })
                .then(function (response) {
                    console.log("new fnGenerateRouteDetail2", response);
                    console.log("new index", i);
                    var index = response.data.result[0]["column1"];                
                    $scope.currentData[index]['table2Data'] = response.data.result;
                    //return response.data.result;
                });


               // var temp = createTable2Data($scope.currentData[i]["woid"], $scope.intOption);
               // console.log("new temp",temp);
              //  $scope.currentData[i]['table2Data'] = temp;
            }
            console.log("new currentData", $scope.currentData);


        });

            } else {

                $http.post(config.baseUrlApi + 'HMLVTS/GenerateDispatchWOList2', {
                    "WOID": woid

                })
        .then(function (response) {
            console.log("debug2", response);
            var data = response.data;
            $scope.currentData = data.result;
            makeStatue();
            console.log("GenerateDispatchWOList2", data.result);
            makeTable(data.result);


            for (var i = 0; i < $scope.currentData.length; i++) {
            //    var temp = createTable2Data($scope.currentData[i]["woid"], $scope.intOption);



                $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail3', {
                    "WOID":  $scope.currentData[i]["woid"],
                    "Index": i

                })
                .then(function (response) {

                    console.log("fnGenerateRouteDetail", "3");
                    console.log("fnGenerateRouteDetail3", response);
                    
                    if (response.data.result.length != 0) {
                        var index = response.data.result[0]["column1"];
                        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail4', {
                            "WOID":  $scope.currentData[index]["woid"],
                            "Index": index
                        })
                        .then(function (response) {
                            console.log("new fnGenerateRouteDetail4", response);
                            var index = response.data.result[0]["column1"];
                            $scope.currentData[index]['table2Data'] = response.data.result;
                        });

                    } else {
                      //  console.log("new config", response.config.data);
                        $http.post(config.baseUrlApi + 'HMLVTS/fnGenerateRouteDetail5', {
                            "WOID": $scope.currentData[response.config.data.Index]["woid"],
                            "Index": response.config.data.Index
                        })
                        .then(function (response) {
                            console.log("new fnGenerateRouteDetail5", response);
                            var index = response.config.data.Index;
                            $scope.currentData[index]['table2Data'] = response.data.result;
                        });

                    }
                });



            }
            console.log("new currentData2", $scope.currentData);

        });

            }


        }


        function makeStatue() {
            for (var i = 0; i < $scope.currentData.length; i++) {
                $scope.currentData[i]["dstate"] = false;
            }
        }

        function findIndex(woid) {
            for (var i = 0; i < $scope.currentData.length;i++){
                if ($scope.currentData[i]["woid"] == woid) {
                    return i;
                }
            }
            return -1;
        }

        function saveInfo(woid, status) {
            var index = findIndex(woid);
            $scope.currentData[index]["dstate"] = status;
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

            if (itemName == "mctype") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = rawData[i]["woid"];//Subcon QC
                    option.text = rawData[i]["woid"];
                    myDiv.appendChild(option);
                }

            }
        }

        //'*******************************************************************
        //'Title     :  GenerateWOList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOList() {
            console.log("inOption",$scope.intOption);
            if ($scope.intOption == 0) {

                $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOList1')
        .then(function (response) {

            var data = response.data;
            console.log("GenerateWOList1", data.result);
            createSelect(response.data.result, "mctype");

        });

            } else {

                $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOList2')
            .then(function (response) {

                var data = response.data;
                console.log("GenerateWOList2", data.result);
                createSelect(response.data.result, "mctype")

            });
            }
        }








    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});