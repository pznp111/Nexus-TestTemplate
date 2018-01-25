(function () {// correct version
    'use strict';

    angular.module('erp.rework').controller('ReworkCtrl', ReworkCtrl);

    ReworkCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ReworkCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var rowNumber = 0;
        var dataLength = 0;
        var rowBoxNo = 12;
        $scope.workCenterArray = [];
        $scope.table1 = [];
        $scope.comboProblemProcess = false; // if got problem process, it need to set to true
        $scope.canSave = true;
        $scope.tenant = tenant;

        $scope.layout = {};
       // $scope.currentUser = authService.currentUser;
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'rework-7' });

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

        console.log("authService",authService);
        GenerateWOListRework();

        //GenerateWOListRework
        //select_reworklist

        //'*******************************************************************
        //'Title     :  GenerateWOListRework
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOListRework() {
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOListRework')
    .then(function (response) {

        var data = response.data;
        console.log("GenerateWOListRework", data.result);
        $scope.rawData = response.data.result;
        createSelect(response.data.result, "reworklist");
    });


        }

        function getProcOpSeq(woid) {
            for (var i = 0; i < $scope.rawData.length;i++){
                if($scope.rawData[i]["woid"] == woid){
                    return $scope.rawData[i]["procOpSeq"];
                }
            }

            return null;

        }


        function SetMacGroupMcID(data, selectedWO) {
            var promiseArray1 = [];
            console.log("SetMacGroupMcID", data);



            var RouteID = 0;
            var OpSeq = 0;
            var CenterID = null;
            var MacCode = null;
            var promiseArray1 = [];
            for (var i = 0; i < data.length; i++) {
                
                var RouteID = data[i]["routeID"];
                if (data[i]["workCenter"] == undefined) {
                    var RouteID = data[i]["routeId"];
                }

                var CenterID = data[i]["workCenter"];
                if (data[i]["workCenter"] == undefined) {
                    var CenterID = data[i]["mcID"];
                }
                
                OpSeq = data[i]["opSeq"];
                if (data[i]["opSeq"] == undefined) {
                    OpSeq = data[i]["opseq"];
                }
                // var result = [];
                //  generateReoworkDropDown
                if (selectedWO.indexOf("-") != -1) {
                    selectedWO = selectedWO.substring(0, selectedWO.indexOf("-"));
                }

                console.log("generateReoworkDropDown",selectedWO+" "+RouteID+" "+OpSeq+" "+CenterID);
                promiseArray1.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/generateReoworkDropDown', {
                       "WOID": selectedWO,
                       "RouteID": RouteID,
                       "SeqNo": OpSeq,
                       "CentreID": CenterID
                   })
                   );

              //  GenerateMCList(selectedWO, RouteID, OpSeq, CenterID,i);
                
            }
            $scope.maIDList = [];// response[j].data.result;
            $q.all(promiseArray1).then(function (response) {
                console.log("test3",response[0].data.result);
                console.log("GenerateMCList21", response);
                for (var j = 0; j < response.length; j++) {
                    console.log("GenerateMCList", j);
                    $scope.maIDList[j] = response[j].data.result;
                    data[j]["mcidList"] = response[j].data.result;
                }
                
                
                console.log("GenerateMCList parent", $scope.maIDList);
                console.log("GenerateMCList data", data);
                makeTable6DropDown();
            });

           
        }


        function createSelectOnTable6(row) {
            //console.log("itemName", itemName);
           // console.log("rawdata", rawData);
            //var myDiv = document.getElementById("select_" + itemName);
            //myDiv.innerHTML = "";

            var myDiv = document.createElement("select");
            myDiv.setAttribute("id","table6_row_" + row);
            



            //if (itemName == "customerkittype") {
                //var option1 = document.createElement("option");
                //option1.value = "";
                //option1.text = "";
            //myDiv.appendChild(option1);

            var rawData = $scope.maIDList[row - 1];

            for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["macCode"]).trim();//Subcon QC
                    option.text = String(rawData[i]["macCode"]).trim();
                    myDiv.appendChild(option);
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
              //  $("#select_customerkittype").val($scope.currentRoute);
            //  }
            return myDiv;

        }


        //'*******************************************************************
        //'Title     :  save
        //'Function  :  save rework
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.save = function () {
            $scope.canSave = true;
            var ReRouteRowCount;
            var ReRouteStart;
            var command = "";
            var rowIndex = 0;
            var blnDelQC = false;

            var tableWOID = "";
            var tablePartID = "";
            var tableActualRecQty = "";
            var tableActualRecDate = "";
            var tableCompletedQty = "";
            var tableCompletedDate = "";
            var tableOutstandingQty = "";
            var tableOutstandingDate = "";

            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];
            var promiseArray6 = [];
            var promiseArray7 = [];

            var promiseArray8 =[];
            var promiseArray9 = [];



            // to collect data from table6, table6 contains a lot of selector values that might be different from table5, store result in finalData
            var tbody = $('tbody');
           // console.log("makeTable6DropDown", tbody[4]);

            //  console.log("makeTable6DropDown", $(tbody[4]).children() );
            var finalData = [];
            var row = 0;
            for (var i = 0; i < $(tbody[4]).children().children().length; i++) {
               // var row = Math.round(i / 6);
                var rowData = [];

                if (i % 6 == 0) {
                    row = Math.round(i / 6);
                    finalData.push([]);
                    console.log(row );
                    console.log(finalData);
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    finalData[row]["procOpSeq"] = content;
                   // alert("1");
                }

                if (i % 6 == 1) {
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    finalData[row]["workCentre"] = content;
                    //alert("2");
                }
                if (i % 6 == 2) {
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    finalData[row]["opSeq"] = content;
                }
                if (i % 6 == 3) {
                    var div = $($(tbody[4]).children().children()[i]);

                    if(div.children().length !=0){ // if got select
                        var selector_id = $(div.children()[0]).attr("id");
                        
                        var content =  $("#" + selector_id + " option:selected").text();
                        //alert(content + " "+row);
                        console.log(finalData[row]);
                        finalData[row]["mcid"] = content;
                        
                    } else{
                        var content = String(div.html()).trim();
                        finalData[row]["mcid"] = content;
                    }
                    
                }
                if (i % 6 == 4) {
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    finalData[row ]["mctype"] = content;
                }

                if (i % 6 == 5) {
                    var div = $($(tbody[4]).children().children()[i]);

                    var cb = $(div.children()[0]);

                    if( cb.is(":checked")){
                        finalData[row ]["checked"] = true;
                    } else{
                        finalData[row ]["checked"] = false;
                    }

                   // finalData.push(rowData);
                }
                

            }

            console.log("finalData", finalData);
            //todo line 766 - line 771
            //todo line 774 - line 794

            var isSaveValid = true;
            if( String($("#rework-remark").val()).trim() == ""){
                alert("Please key in remark.");// this is necessary
                isSaveValid = false;
            }

            if (String($("#rework-remark").val()).trim() != "" && (String($("#rework-remark").val()).trim()).length > 100) {
                alert("Remark must be < 100 characters.");// this is necessary
                isSaveValid = false;
            }
            

            if (String($('#select_wcseq option:selected').text()).trim() == "") {
                alert("Please select a starting WorkCenter.");// this is necessary
                isSaveValid = false;
            }

            
            if (isSaveValid) {

                console.log("save",$scope.selectedWO+" "+ $scope.strExecProcOpSeq);
                promiseArray.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework1', {
                         "WOID": String($scope.selectedWO).trim(),
                         "ProcOpSeq": String($scope.strExecProcOpSeq).trim()                      
                     })
                    );

                $q.all(promiseArray).then(function (response) {
                    console.log("save1", response);
                    if (response[0].data.result != null && response[0].data.result.length != 0) {

                        tableWOID = response[0].data.result[0]["woid"];
                        tablePartID = response[0].data.result[0]["partID"];
                        tableActualRecQty = response[0].data.result[0]["actualRecQty"];
                        tableActualRecDate = response[0].data.result[0]["actualRecDate"];
                        tableCompletedQty = response[0].data.result[0]["completedQty"];
                        tableCompletedDate = response[0].data.result[0]["completedDate"];
                        tableOutstandingQty = response[0].data.result[0]["outstandingQty"];
                        tableOutstandingDate = response[0].data.result[0]["outstandingDate"];
                        tableCompletedQty = "0";

                    }
                });


            }

           // todo: enable them
            if ($scope.CurProcOpSeq == "" || $scope.CurProcOpSeq == 0) {
                promiseArray2.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework2', {
                         "WOID": String($scope.selectedWO).trim()
                     })
                    );
            } else {
                promiseArray2.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework3', {
                         "WOID": String($scope.selectedWO).trim(),
                         "ProcOpSeq": String($scope.CurProcOpSeq).trim()
                     })
                    );
            }

            if ($scope.CurProcOpSeq == "" || $scope.CurProcOpSeq == 0) {
                promiseArray7.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework4', {
                         "WOID": String($scope.selectedWO).trim()
                     })
                    );
            } else {
                promiseArray7.push(
                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework5', {
                         "WOID": String($scope.selectedWO).trim(),
                         "ProcOpSeq": String($scope.CurProcOpSeq).trim()
                     })
                    );
            }


           //  todo: enable
            $q.all(promiseArray2).then(function (response) {
                console.log("save promiseArray2 result",response);
            });

            $q.all(promiseArray7).then(function (response) {
                console.log("save promiseArray7 result", response);
            });

            // ---
            // insert the new Route
            // comboStartWC.Text - start seq and subsequent ;
            // insert for every row after new OpSeq number from spread
            // for every row in spread, compare the OpSeq, 
          //  var  strReRoute ;
            var strReRouteStart = String($('#select_wcseq option:selected').text()).trim()
            var k = 0;
            var m = 0;
            var n = 0; ; // To indicate the first reRoute process
            var WorkCenterID ="";
            var ReRouteSpreadOpSeq = "";
            var McID = "";
            var McType = "";
            var Remark = "";
            var strMcList = "";
            var MacGroup = 0;
            var AttributeGroup = "";
            var strProblemProcess = 0;
            var strProblemWC = 0;
            var strProblemOpSeq =  0;
            var strProblemProcOpSeq =  0;
            var strProblemOperatorID = 0;
            var strProblemOperatorName = " ";
            var MacGroupValue = "";


            k = strReRouteStart.indexOf(",");
            ReRouteStart = strReRouteStart.substring(((strReRouteStart.indexOf(",")) + 1), strReRouteStart.length);
          //  alert(strReRoute);
            console.log($scope.workCenterArray);
            var boolSelectValue = false;

            for (var i = 0; i < finalData.length; i++) {

                boolSelectValue = finalData[i]["checked"];
                if(boolSelectValue){
                    ReRouteSpreadOpSeq = finalData[i]["opSeq"];
                    if (parseInt(ReRouteSpreadOpSeq) >= parseInt(ReRouteStart)) {
                        m = m + 1;

                        WorkCenterID = finalData[i]["workCentre"]; //0
                        McID = finalData[i]["mcid"]; //3
                        McType = finalData[i]["mctype"];//4
                        MacGroup = "";//2
                        AttributeGroup = "";//5
                        // alert(McType);
                        Remark = (String($("#rework-remark").val())).trim();
                        strMcList = McID;

                        // var comboAllRoutesID = findInDirectory($scope.selectedWO);

                        var comboAllRoutesName = String($('#select_workroute option:selected').text()).replace("'", "''").trim();
                        if (comboAllRoutesName == "") {
                            comboAllRoutesName = String($("#current-route").val()).replace("'", "''").trim();
                        }

                        var comboAllRoutesID = findInDirectory(comboAllRoutesName);


                        console.log("$scope.CurrentRouteData", $scope.CurrentRouteData);
                        console.log("$scope.finalData", finalData);

                        var isRoutingChanged = false;
                        if ($('#select_workroute option:selected').text() != $("#current-route").val()) {
                            isRoutingChanged = true;
                        }

                        //todo continue line 944 - 978, but need to set comboALLRouteID first, which is probably setted at line 1437, incomplete strMcList need to be assigned to be used laster
                        if (McType == "QC" && isRoutingChanged) {
                            //if(McType == "QC" && $scope.comboRouteID != $scope.comboAllRouteID){
                            console.log("saveRework6 data","1:"+String($scope.selectedWO).trim() + " 2:" + comboAllRoutesID + " 3:" + m + " 4:" + WorkCenterID);
                            promiseArray3.push(
                                 $http.post(config.baseUrlApi + 'HMLVTS/saveRework6', {
                                     "WOID": String($scope.selectedWO).trim(),
                                     "RouteID":comboAllRoutesID,
                                     "SeqNo":m,
                                     "CentreID":WorkCenterID
                                 })
                                );

                            McID = "";
                        }

                        $q.all(promiseArray3).then(function (response) {
                            console.log("saveRework6",response);
                            // console.log("saveRework6", response[0].data.result);

                            // todo:assign strMcList line 963
                            if(response.length != 0 && response[0].data.result.length!=0){
                                if (strMcList == "") {
                                    strMcList = response[0].data.result[0]["macCode"]; //todo: to check
                                } else {
                                    strMcList = strMcList + "," + response[0].data.result[0]["macCode"];
                                }
                            }
                        });


                        if (($scope.CurProcOpSeq == "") || ($scope.CurProcOpSeq == "0")) {
                            
                            var comboAllRoutesName = String($('#select_workroute option:selected').text()).replace("'", "''").trim();
                            if (comboAllRoutesName == "") {
                                comboAllRoutesName = String($("#current-route").val()).replace("'", "''").trim();
                            }

                            var comboAllRoutesID = findInDirectory(comboAllRoutesName);
                            if (MacGroupValue == "") {
                                //saveReworkMac1
                                promiseArray8.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/saveReworkMac1', {
                                    "WOID": String($scope.selectedWO).trim(),
                                    "WorkCenter": WorkCenterID,
                                    "RouteID": comboAllRoutesID,
                                    "ProcOpSeq": m,
                                    "OpSeq": ReRouteSpreadOpSeq,
                                    "McID": McID,
                                    "McType": McType,
                                    "RouteName": comboAllRoutesName,
                                    "AttributeGroup": AttributeGroup
                                })
                               );
                            } else {
                                //saveReworkMac2
                                promiseArray8.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/saveReworkMac2', {
                                    "WOID": String($scope.selectedWO).trim(),
                                    "WorkCenter": WorkCenterID,
                                    "RouteID": comboAllRoutesID,
                                    "ProcOpSeq": m,
                                    "OpSeq": ReRouteSpreadOpSeq,
                                    "McID": McID,
                                    "McType": McType,
                                    "RouteName": comboAllRoutesName,
                                    "MacGroup":MacGroupValue,
                                    "AttributeGroup": AttributeGroup
                                })
                               );
                            }
                        } else {
                            if (MacGroupValue == "") {
                                //saveReworkMac1
                                promiseArray8.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/saveReworkMac1', {
                                    "WOID": String($scope.selectedWO).trim(),
                                    "WorkCenter": WorkCenterID,
                                    "RouteID": comboAllRoutesID,
                                    "ProcOpSeq": m+parseInt($scope.CurProcOpSeq),
                                    "OpSeq": ReRouteSpreadOpSeq,
                                    "McID": McID,
                                    "McType": McType,
                                    "RouteName": comboAllRoutesName,
                                    "AttributeGroup": AttributeGroup
                                })
                               );
                            } else {
                                //saveReworkMac4
                                promiseArray8.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/saveReworkMac2', {
                                    "WOID": String($scope.selectedWO).trim(),
                                    "WorkCenter": WorkCenterID,
                                    "RouteID": comboAllRoutesID,
                                    "ProcOpSeq": m + parseInt($scope.CurProcOpSeq),
                                    "OpSeq": ReRouteSpreadOpSeq,
                                    "McID": McID,
                                    "McType": McType,
                                    "RouteName": comboAllRoutesName,
                                    "MacGroup": MacGroupValue,
                                    "AttributeGroup": AttributeGroup
                                })
                               );
                            }
                        }

                        
                        $q.all(promiseArray8).then(function (response) {
                            console.log("promiseArray8",response);
                        });

                        var strProblemProcess = String($('#select_comboProblemProcess option:selected').text()).trim()
                        if (strProblemProcess == "") {
                            alert("Please select the Problem process");
                            $scope.canSave = false;
                            break;
                        } else {

                        
                        //todo: $scope.comboProblemProcess need to be set
                        //$scope.comboProblemProcess = false;
                        if($scope.comboProblemProcess) {
                            //line 1013: note: may not be uesful
                           

                           
                            console.log("comboProblemProcess", $scope.CurrentRouteData);
                           
                            console.log("comboProblemProcess problem",strProblemProcess);
                            k = strProblemProcess.indexOf(",");
                            console.log("comboProblemProcess k", k);
                           // strProblemProcOpSeq = parseInt(strProblemProcess.substring(k + 1, (strProblemProcess.Length - (k + 1))));
                            strProblemProcOpSeq = parseInt(strProblemProcess.substring(k + 1, (strProblemProcess.Length )));
                            console.log(strProblemProcOpSeq);
                            strProblemWC = $scope.CurrentRouteData[strProblemProcOpSeq - 1]["workCentre"];
                            strProblemOpSeq = $scope.CurrentRouteData[strProblemProcOpSeq - 1]["opSeq"];
                            //todo: assign the next 2 variable
                            strProblemOperatorName = $scope.CurrentRouteData[strProblemProcOpSeq - 1]["operator"]; 
                            // strProblemOperatorID = $scope.CurrentRouteData[strProblemProcOpSeq - 1]["workCentre"];//todo
                            strProblemOperatorID = "";
                        }


                        console.log("saveRework7", $scope.selectedWO + " " + tablePartID + " " + tableActualRecQty + " " + tableActualRecDate+" "+
                            tableCompletedQty + " " + tableCompletedDate + " " + tableOutstandingQty + " " + tableOutstandingDate + " " + McID + " " + McType + " " + comboAllRoutesID
                            + " " + WorkCenterID + " " + m + " " + ReRouteSpreadOpSeq
                            );
                        if (($scope.CurProcOpSeq == "") || ($scope.CurProcOpSeq == "0")) {
                            //line 1093
                            promiseArray4.push(
                                 $http.post(config.baseUrlApi + 'HMLVTS/saveRework7', {
                                     "WOID": String($scope.selectedWO).trim(),
                                     "PartID": tablePartID,
                                     "ActualRecQty": tableActualRecQty,
                                     "ActualRecDate": tableActualRecDate,
                                     "CompletedQty": tableCompletedQty,
                                     "CompletedDate": tableCompletedDate,
                                     "OutstandingQty": tableOutstandingQty,
                                     "OutstandingDate": tableOutstandingDate,
                                     "McID": McID,
                                     "McType": McType,
                                     "RouteID": comboAllRoutesID,
                                     "WorkCenter": WorkCenterID,
                                     "ProcOpSeq": m, 
                                     "OpSeq": ReRouteSpreadOpSeq

                                 })
                                );
                        } else {//only difference btw these 2 loops are the input of WorkCenter
                            promiseArray4.push(
                                 $http.post(config.baseUrlApi + 'HMLVTS/saveRework7', {
                                     "WOID": String($scope.selectedWO).trim(),
                                     "PartID": tablePartID,
                                     "ActualRecQty": tableActualRecQty,
                                     "ActualRecDate": tableActualRecDate,
                                     "CompletedQty": tableCompletedQty,
                                     "CompletedDate": tableCompletedDate,
                                     "OutstandingQty": tableOutstandingQty,
                                     "OutstandingDate": tableOutstandingDate,
                                     "McID": McID,
                                     "McType": McType,
                                     "RouteID": comboAllRoutesID,
                                     "WorkCenter": WorkCenterID, 
                                     "ProcOpSeq": String(parseInt($scope.CurProcOpSeq)+parseInt(m)),
                                     "OpSeq": ReRouteSpreadOpSeq

                                 })
                                );
                        }

                        $q.all(promiseArray4).then(function (response) {

                        });

                        if (n == 0) {//line 1116
                            n = 1;
                            if (($scope.CurProcOpSeq == "") || ($scope.CurProcOpSeq == "0") || ($scope.CurOpSeq == "") || $scope.CurProcOpSeq == 0) {
                                $scope.CurProcOpSeq = "0";
                             
                                $scope.CurWorkCenter = " "; 
                                $scope.CurOpSeq = 0;
                            }
                            //todo continue important line 1126
                            //if (CurWorkCenter == null) {
                            //    CurWorkCenter = "";
                            //}
                            var index = parseInt($scope.CurProcOpSeq) + parseInt(m) - 1;
                            alert("hahaha " + index);
                            console.log("hahaha",finalData);
                            var WorkCenterID = finalData[index]["workCentre"];//!important to check
                            //todo: assign WorkCenterID
                            var CurReworkQty = $("#rework-qty").val();
                            var now = new Date();
                            //var comboAllRoutesID = findInDirectory($scope.selectedWO);

                            var comboAllRoutesName = String($('#select_workroute option:selected').text()).replace("'", "''").trim();
                            if (comboAllRoutesName == "") {
                                comboAllRoutesName = String($("#current-route").val()).replace("'", "''").trim();
                            }

                            var comboAllRoutesID = findInDirectory(comboAllRoutesName);

                            var remark = $("#rework-remark").val()
                            // var selectedRoute = String($('#select_workroute option:selected').text()).replace("'","''");
                            if (true) {//if (GlobalVar.WOGlobalCallByMenu == "False") at line 1114
                                alert("test1 " + strProblemWC);
                                console.log("test1", strProblemWC);
                                promiseArray5.push(
                                     $http.post(config.baseUrlApi + 'HMLVTS/saveRework8', {
                                         "WOID": String($scope.selectedWO).trim(),
                                         "WorkCenter": $scope.CurWorkCenter,
                                         "RouteID": $scope.comboRouteID,
                                         "ProcOpSeq": $scope.CurProcOpSeq,
                                         "OpSeq": $scope.CurOpSeq,
                                         "ReworkRouteID": comboAllRoutesID,
                                         "ReworkStartWC": WorkCenterID,
                                         "ReworkStartProcOpSeq": String(parseInt($scope.CurProcOpSeq)+parseInt(m)),
                                         "ReworkStartOpSeq": ReRouteSpreadOpSeq,
                                         "ReworkQty": CurReworkQty,
                                         "ReworkDate": now,
                                         "UserID": authService.currentUser.userId,
                                         "UserName": authService.currentUser.userName,
                                         "ApprovedID": authService.currentUser.userId,
                                         "ApprovedName": ReRouteSpreadOpSeq,
                                         "Remark": remark,
                                         "RouteName": comboAllRoutesName,
                                         "ProblemWC": strProblemWC,
                                         "ProblemOpSeq": strProblemOpSeq,
                                         "ProblemProcOpSeq": strProblemProcOpSeq,
                                         "ProblemOperatorID": strProblemOperatorID,
                                         "ProblemOperatorName": strProblemOperatorName
                                     })
                                    );
                            }


                            $q.all(promiseArray5).then(function (response) {
                                console.log("promiseArray5", response);
                            });
                        }

                    }
                    }


                    // delete and insert into QC table the equipment list
                    if (McType == "QC" && $scope.canSave == true) { //line 1277
                        if (blnDelQC == false) {
                            if($scope.CurProcOpSeq == "" || $scope.CurProcOpSeq == 0){
                                //rework9
                                promiseArray9.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/saveRework9', {
                                        "WOID": String($scope.selectedWO).trim()
                                    })
                                    );
                            } else {
                                //rework10
                                promiseArray9.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/saveRework10', {
                                        "WOID": String($scope.selectedWO).trim(),
                                        "ProcOpSeq": $scope.CurProcOpSeq
                                    })
                                    );
                                blnDelQC = true;
                            }
                        }

                        $q.all(promiseArray9).then(function (response) {
                            console.log("promiseArray9", response);
                        });

                        if ($scope.CurProcOpSeq == "" || $scope.CurProcOpSeq == 0) {
                               AddQCEquipment(String($scope.selectedWO).trim(), WorkCenterID, comboAllRoutesID, ReRouteSpreadOpSeq, m, strMcList);
                        } else {
                               AddQCEquipment(String($scope.selectedWO).trim(), WorkCenterID, comboAllRoutesID, ReRouteSpreadOpSeq, parseInt($scope.CurProcOpSeq) + m, strMcList);
                        }
                    }




                }



            }
           


        }

        function AddQCEquipment(strWO, strCentreID, strRouteID, OpSeq, ProcOpSeq, McString) {
            var promiseArray = [];
            var split = McString.split(",");
            for (var i = 0; i < split.length;i++){
                var s = split[i];
                promiseArray.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/AddQCEquipment', {
                        "WOID": strWO,
                        "WorkCenter": strCentreID,
                        "RouteID": strRouteID,
                        "OpSeq": OpSeq,
                        "ProcOpSeq": ProcOpSeq,
                        "McID":s

                    })
                    );
            }

            $q.all(promiseArray).then(function (response) {
                console.log("AddQCEquipment", response);
            });
        }


        function findInDirectory(selectedRoute) {
           
           
            console.log("findInDirectory", selectedRoute);
            

            //$http.get(config.baseUrlApi + 'HMLVTS/allRoutesName')
            //.then(function (response) {
            //    console.log("findInDirectory", response.data.result);
            //    $scope.Directory = response.data.result;
            //    console.log("findInDirectory all", $scope.Directory);
            //    for (var i = 0; i < $scope.Directory.length; i++) {
            //        if (String($scope.Directory[i]["name"]).trim() == String(selectedRoute).trim()) {
            //            return String($scope.Directory[i]["id"]).trim()
            //        }
            //    }
            //});
            if($scope.Directory != undefined){
            for (var i = 0; i < $scope.Directory.length; i++) {
                if (String($scope.Directory[i]["name"]).trim() == String(selectedRoute).trim()) {
                    return String($scope.Directory[i]["id"]).trim()
                }
            }
        }


            return "";
        }

        $scope.comboAllRoutesName_SelectedIndexChanged = function () {
            var startRoute;
            var promiseArrayTest = [];
            var promiseArray1 = [];
            var promiseArray2 = [];

            var tempCenterID = "";
            var tempOpSeq = "";
            var tempMacCode = "";
            var tempMcType = "";
            var tempPPID = "";
            var tempMacGroup = "";
            var tempAttritude = "";
            var strMacGroup = "";
            var blnSameRoute = false;
            var selectedRouteID = 0;

            var selectedRoute =  $('#select_workroute option:selected').text();

            console.log("comboAllRoutesName_SelectedIndexChanged", $scope.selectedWO);

            var selectedWOParentWO = $scope.selectedWO;
            if($scope.selectedWO.indexOf("-") != -1){
                selectedWOParentWO = $scope.selectedWO.substring(0, $scope.selectedWO.indexOf("-"));
            }


            selectedRouteID = findInDirectory(selectedRoute);

            if ($scope.CurRouteID) {

            }
            alert("selectedRouteID:" + selectedRouteID);
            //selectedRouteID = findInDirectory(selectedWOParentWO);
            //alert("selectedRouteID parent:" + selectedRouteID);
            //todo this part might be able to drop, check with gh
            var isReload = false;

            //todo:this part might not be necesaary
            if (blnSameRoute == false) {
                $scope.comboAllRoutesID = findInDirectory(selectedRoute);
                alert("test5" + $scope.comboAllRoutesID);
                console.log("comboAllRoutesName_SelectedIndexChanged1", $scope.comboAllRoutesID);
                if ($scope.comboAllRoutesID != "") {
                    //nothing // line 1438
                    //if ($scope.CurRouteID == selectedRouteID) { // todo: check line 1449

                    //} else{

                    //    isReload = true;
                    //}
                } else {
                    
                    alert("RouteID or RouteName not found"); // necessary
                }
                             
            }
            //this part end here

            if (blnSameRoute) {
                // line 1479
            } else {

                //this part end

                //var promiseArray1 = [];
                //promiseArray1.push(
                //$http.post(config.baseUrlApi + 'HMLVTS/GlobalCurrentWorkOrderRoute', {
                //    "WOID": selectedWO
                //})
                //);

                //$q.all(promiseArray1).then(function (response) {
                //    console.log("GlobalCurrentWorkOrderRoute", response);




                //    if (response[0].data.result.length != 0) {
                //        //  var data1 = strGetOperatorName(response[0].data.result, selectedWO);
                //        //  makeTable5(data1);
                //        makeTable5_6(response[0].data.result, selectedWO, "5");
                //        makeTable5_6(response[0].data.result, selectedWO, "6");
                //        // ProductTable6();
                //        SetMacGroupMcID(response[0].data.result, selectedWO);
                //    }



                //});

                //todo: !important continue from line 1559
                alert("here1");
                var selectedWO = $('#select_reworklist option:selected').text();

                promiseArrayTest.push(
                $http.post(config.baseUrlApi + 'HMLVTS/regenerateRoutingData', {
                    "RouteName": selectedRoute
                })
                );

                var newSelectedWOID = "";
                $q.all(promiseArrayTest).then(function (response) {
                    console.log("regenerateRoutingData", response);
                    
                    if (response[0].data.result.length != 0) {
                        alert("here3");
                        $scope.newSelectedWOID = response[0].data.result[0]["woid"];

                        var data = response[0].data.result;
                        var tempdata = [];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i]["procOpSeq"] != undefined) {
                            if (parse(data[i]["procOpSeq"])+1 == parse(data[i]["opSeq"])) {
                                tempdata.push(data[i]);
                            }
                        } else{
                                tempdata.push(data[i]);
                        }
                        }
                        data = tempdata;


                        remaketable6(data);
                        //if (selectedWO.indexOf("-") != -1) {
                        //    selectedWO = selectedWO.substring(0, (selectedWO.indexOf("-")));
                        //}
                        SetMacGroupMcID(data, selectedWO);
                      //  makeTable6DropDown();
                     //   makeTable5_6(response[0].data.result, $scope.newSelectedWOID, "6", true);
                        //if ($scope.newSelectedWOID.indexOf("-") != -1) {
                        //    $scope.newSelectedWOID = $scope.newSelectedWOID.substring(0, $scope.newSelectedWOID.indexOf("-"));
                        //}
                        //newSelectedWOID = $scope.newSelectedWOID;


                //promiseArray1.push(
                //$http.post(config.baseUrlApi + 'HMLVTS/GlobalCurrentWorkOrderRoute', {
                //    "WOID": newSelectedWOID
                //})
                //);

                //$q.all(promiseArray1).then(function (response) {
                //    console.log("GlobalCurrentWorkOrderRoute", response);
                //    alert("length is " + response[0].data.result.length);
                //    if (response[0].data.result.length != 0) {
                //        //  var data1 = strGetOperatorName(response[0].data.result, selectedWO);
                //        //  makeTable5(data1);
                //        //makeTable5_6(response[0].data.result, selectedWO, "5");
                //        makeTable5_6(response[0].data.result, newSelectedWOID, "6",true);
                //        // ProductTable6();
                //        SetMacGroupMcID(response[0].data.result, newSelectedWOID);
                //    }
                //});



                    } else {
                        document.getElementById("rework-table6").innerHTML = ""; 
                    }
                });


            //    console.log("GlobalCurrentWorkOrderRoute", selectedWO);


            }

        }

        function makeTable6DropDown() {
            console.log("makeTable6DropDown maidlist", $scope.maIDList);
            var tbody = $('tbody');
            console.log("makeTable6DropDown", tbody[4]);

            console.log("makeTable6DropDown", $(tbody[4]).children());
            document.getElementById("select_wcseq").innerHTML = "";
            var workCenterArray = [];
            var single = "";
            for (var i = 0; i < $(tbody[4]).children().children().length; i++) {

                var row = Math.round(i / 6);
                
                
                if(i % 6 == 1){
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    console.log("makeTable6DropDown div1", "!" + content + "!");
                    single = single + content;
                }
                if (i % 6 == 2) {
                    var div = $($(tbody[4]).children().children()[i]);
                    var content = String(div.html()).trim();
                    console.log("makeTable6DropDown div1", "!" + content + "!");
                   
                    single = single + "," + content;
                    console.log("makeTable6DropDown div1 1", "!" + single + "!");
                   // alert(single);
                    workCenterArray.push(single);
                    single = "";
                }


                if (i % 6 == 3) {
                   // $("#select_workroute").val($scope.currentRoute);
                    var div = $($(tbody[4]).children().children()[i]);
                    console.log("makeTable6DropDown row",row);
                    console.log("makeTable6DropDown div lah","!"+ String(div.html()).trim()+"!");
                    if ($scope.maIDList[row - 1].length > 1 && String(div.html()).trim() != "") {
                        var selector = createSelectOnTable6(row);
                        $(selector).val(String(div.html()).trim());
                        div.empty();
                        div.append(selector);
                    }

                }
                if (i % 6 == 5) {
                    var div = $($(tbody[4]).children().children()[i]);
                    var checkbox = document.createElement("input");
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("name","check_"+row);
                    checkbox.setAttribute("value", "check_" + row);
                    checkbox.checked = true;
                    div.empty();
                    div.append(checkbox);

                }

                
            }

            var myDiv = document.getElementById("select_wcseq");
            var myDiv2 = document.getElementById("select_comboProblemProcess");
            $scope.ReRouteRowCount = workCenterArray.length;

            for (var j = 0; j < workCenterArray.length;j++){
                var option = document.createElement("option");
                console.log("wcseq", workCenterArray[j]);
                option.value = workCenterArray[j];
                option.text = workCenterArray[j];
                myDiv.appendChild(option);
                //myDiv2.appendChild(option);
            }

            for (var j = 0; j < workCenterArray.length; j++) {
                var option = document.createElement("option");
                console.log("wcseq", workCenterArray[j]);
                option.value = workCenterArray[j];
                option.text = workCenterArray[j];
               // myDiv.appendChild(option);
                myDiv2.appendChild(option);
            }

            console.log("makeTable6DropDown workCenterArray", workCenterArray);
            $scope.workCenterArray = workCenterArray;

           
        }


        //'*******************************************************************
        //'Title     :  GenerateMCInfor
        //'Function  :   
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateMCInfor(WOID, RouteID, OpSeq, CenterID, MacCode) {
            if (WOID.indexOf("-") != -1) {
                WOID = WOID.substring(0, WOID.indexOf("-"));
            }

            var promiseArray1 = [];

          //  var promiseArray1 = [];
            promiseArray1.push(
               $http.post(config.baseUrlApi + 'HMLVTS/GenerateMCInfor', {
                   "WOID": WOID,
                   "RouteID": RouteID,
                   "SeqNo": OpSeq,
                   "CentreID": CenterID,
                   "MacCode":MacCode
               })
               );

            $q.all(promiseArray1).then(function (response) {
                //result = resoponse;
               // return result;
            });


        }

        //'*******************************************************************
        //'Title     :  GenerateMCList
        //'Function  :  make dropdown in table6 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateMCList(WOID, RouteID, OpSeq, CenterID,i) {
           // var result = [];
            //  generateReoworkDropDown
            if (WOID.indexOf("-") != -1) {
                WOID = WOID.substring(0, WOID.indexOf("-"));
            }

            var promiseArray1 = [];
            promiseArray1.push(
               $http.post(config.baseUrlApi + 'HMLVTS/generateReoworkDropDown', {
                   "WOID": WOID,
                   "RouteID": RouteID,
                   "SeqNo": OpSeq,
                   "CentreID": CenterID
               })
               );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateMCList", response + " "+i);
                $scope.maIDList[i] = response;

            });

           // return result;
        }

        //'*******************************************************************
        //'Title     :  GlobalGenerateWOMaterial
        //'Function  :  make table for raw material
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function ProductTable6() {
            var table5 = document.getElementById("rework-table5");
            var table6 = document.getElementById("rework-table6");

            console.log("productTable6", table5.innerHTML);
            table6.innerHTML = table5.innerHTML;
        }

        //'*******************************************************************
        //'Title     :  makeTable5
        //'Function  :  make table for route
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTable5_6(data, selectedWO, tableIndex) {
            console.log("makeTable5_6_"+tableIndex,data);
            var promiseArray1 = [];
            $scope.CurOpSeq = "";
            $scope.CurWorkCenter = "";
            if (data.length != 0) {
                $scope.WorkCenterID = data[0]["routeID"];
                $scope.CurOpSeq = data[0]["opSeq"];
                $scope.CurWorkCenter = data[0]["workCenter"];
            }
            if (tableIndex == "5") {
                $scope.CurrentRouteData = data;
                console.log("makeTable5_6 before", data);
                $scope.CurOpSeq = data[i]
            }
            console.log("makeTable5 curr", $scope.CurProcOpSeq);

            for (var i = 0; i < data.length; i++) {
                if (i < $scope.CurProcOpSeq) {
                    $scope.CurOpSeq = data[i]["opSeq"];
                    $scope.CurWorkCenter = data[i]["workCenter"];
                }

                var selectedWC = data[i]["workCenter"];
                var selectedProcOpSeq = data[i]["procOpSeq"];

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/strGetOperatorName', {
                    "WOID": selectedWO,
                    "WorkCenter": selectedWC,
                    "ProcOpSeq": selectedProcOpSeq
                })
                );




            }

            
            var comboRouteID;

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalCurrentWorkOrderRoute1", response);
                console.log("GlobalCurrentWorkOrderRoute1", data);

               
                for (var j = 0; j < data.length; j++) {

                    if (j == 0 && $scope.CurProcOpSeq == "0") {
                        var CurRouteID = data[j]["routeID"];
                        alert(CurRouteID + " 1");
                        //$("#current-route").val(CurRouteID);
                        comboRouteID = CurRouteID;
                    }

                    if(String(data[j]["procOpSeq"]).trim() == $scope.CurProcOpSeq){
                        var CurRouteID = data[j]["routeID"];
                        // $("#current-route").val(CurRouteID);
                        alert(CurRouteID + " 2");
                        comboRouteID = CurRouteID;

                    }

                    data[j]["operator"] = "";

                    console.log(j);
                    if (response[j].data.result.length != 0) {
                        data[j]["operator"] = String(response[j].data.result[0]["operatorName"]).trim();
                    }


                }
                //alert(comboRouteID);
                $scope.comboRouteID = comboRouteID;
                if (tableIndex == "6") {
                    currentRoutesName(comboRouteID);
                }
                
                if (tableIndex == "5") {
                allRoutesName();
            }
            });


            //alert(curID);

            if (tableIndex == "5") {
                console.log("makeTable5_6 after", data);
                $scope.CurrentRouteData = data;
            }

            //if (tableIndex == "6") {
            //    var tempdata = [];
            //    for (var i = 0; i < data.length;i++){
            //        if(data[i]["opSeq"] == data[i]["procOpSeq"]){
            //            tempdata.push(data[i]);
            //        }
            //    }
            //    data = tempdata;
            //}


            $("#rework-table"+tableIndex).kendoGrid({
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
                columns: [
                 {
                     field: "procOpSeq", title: "Proc Op Seq", width: 100

                 },
                 {
                     field: "workCenter", title: "Work Centre", width: 100

                 },
                 {
                     field: "opSeq", title: "Op Seq", width: 100

                 },
                 {
                     field: "mcID", title: "Machine ID", width: 100

                 },
                 {
                     field: "mcType", title: "Machine Type", width: 100

                 },
                 {
                     field: "operator", title: "Name", width: 100

                 }//todo:something wrong,operator name cannot diaplay
                ]
            })

           // //var tbody = document.getElementsByTagName("tbody")[2];
           //// console.log("tbody",tbody);
           // var tbody = $('tbody')[2];
           // console.log("tbody", tbody);
           // var threshold;


           // for (var i = 0; i < tbody.children().children().length; i++) {
           //     //if (i % 6 == 3) {
           //         console.log("tbody1",tbody.children().children()[i]);
           //    // }
           // }

        }


        //'*******************************************************************
        //'Title     :  remaketable6
        //'Function  :  make table for route
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function remaketable6(data) {
         //   var promiseArray1 = [];

            for (var i = 0; i < data.length;i++){
                data[i]["procOpSeq"] = i;
                if (data[i]["macType"] != "QC") {
                    data[i]["mcID"] = data[i]["ctrcode"]
                } else {
                    data[i]["mcID"] = "";
                }
            }

            console.log("makeTable51", data);
            $("#rework-table6").kendoGrid({
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
                columns: [
                 {
                     field: "procOpSeq", title: "Proc Op Seq", width: 100 // to hide

                 },
                 {
                     field: "ctrcode", title: "Work Centre", width: 100

                 },
                 {
                     field: "opseq", title: "Op Seq", width: 100

                 },
                 {
                     field: "maccode", title: "Machine ID", width: 100

                 },
                 {
                     field: "macType", title: "Machine Type", width: 100

                 },
                 {
                     field: "", title: "select", width: 100

                 }//todo:something wrong,operator name cannot diaplay
                ]
            })

            
        }

        //'*******************************************************************
        //'Title     :  makeTable2
        //'Function  :  make table for raw material
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTable2(data){
            console.log("makeTable2", data);

            for (var i = 0; i < data.length;i++){
                if (data[i]["status"] == true) {
                    data[i]["reqQty"] = true
                } else {
                    data[i]["reqQty"] = false
                }
            }

            $("#rework-table2").kendoGrid({
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

                //pageSize: 10,
                sortable: true,
                pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: [
                 {
                     field: "name", title: "Name", width: 100

                 },
                 {
                     field: "supplier", title: "Supplier", width: 100

                 },
                 {
                     field: "grade", title: "Grade", width: 100

                 },
                 {
                     field: "matType", title: "Material Type", width: 100

                 },
                 {
                     field: "reqQty", title: "Req Qty", width: 100

                 },
                 {
                     field: "diameter", title: "Diameter", width: 100

                 },
                 {
                     field: "length", title: "Length", width: 100

                 },
                 {
                     field: "thickness", title: "Thickness", width: 100

                 },
                 {
                     field: "width", title: "width", width: 100

                 },
                 {
                     field: "outsideDiameter", title: "OutsideDiameter", width: 100

                 },
                 {
                     field: "insideDiameter", title: "InsideDiameter", width: 100

                 },
                 {
                     field: "value", title: "Value", width: 100

                 },
                 {
                     field: "status", title: "Status", width: 100

                 }
                ]
            })

        }


        //'*******************************************************************
        //'Title     :  strGetRouteName
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function strGetRouteName() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/strGetRouteName', {
                "RouteID": selectedWO
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("strGetRouteName", response);
                if (response[0].data.result.length != 0) {
                   // makeTable6(response[0].data.result);
                }

            });
        }

        //'*******************************************************************
        //'Title     :  GlobalGenerateWOSummary
        //'Function  :  make table for wo summary
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalCurrentWorkOrderRoute(selectedWO){
            var promiseArray1 = [];
            console.log("GlobalCurrentWorkOrderRoute",selectedWO);
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GlobalCurrentWorkOrderRoute', {
                "WOID": selectedWO
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalCurrentWorkOrderRoute", response);

                


                if (response[0].data.result.length != 0) {
                  //  var data1 = strGetOperatorName(response[0].data.result, selectedWO);
                    //  makeTable5(data1);
                    
                    makeTable5_6(response[0].data.result, selectedWO, "5");

                    //console.log("hahaha",$scope.Directory);
                   // alert("before making table 6" + $scope.isTable6Valid);
                    var data = response[0].data.result;
                    var tempdata = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i]["procOpSeq"] == data[i]["opSeq"]) {
                            tempdata.push(data[i]);
                        }
                    }
                    data = tempdata;
                    makeTable5_6(data, selectedWO, "6");
                    // ProductTable6();

                    SetMacGroupMcID(data, selectedWO);

                    
                }

                

            });
        }

        function strGetOperatorName(data, selectedWO) {

            
            var promiseArray1 = [];

            for (var i = 0; i < data.length; i++) {
                var selectedWC = data[i]["workCenter"];
                var selectedProcOpSeq = data[i]["procOpSeq"];

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/strGetOperatorName', {
                    "WOID": selectedWO,
                    "WorkCenter": selectedWC,
                    "ProcOpSeq":selectedProcOpSeq
                })
                );
            }

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalCurrentWorkOrderRoute1", response);
                console.log("GlobalCurrentWorkOrderRoute1", data);
                for (var j = 0; j < data.length; j++) {
                    data[j]["date"] = "";

                    console.log(j);
                    if (response[j].data.result.length != 0) {
                        data[j]["procOpSeq"] = String(response[j].data.result[0]["operatorName"]).trim();
                    }


                }

            });

            return data;
        }


        //'*******************************************************************
        //'Title     :  GlobalGenerateWOSummary
        //'Function  :  make table for wo summary
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalGenerateWOSummary(selectedWO, strExecProcOpSeq) {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWOSummary', {
                "WOID": selectedWO,
                "ProcOpSeq": strExecProcOpSeq
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalGenerateWOSummary", response[0].data.result);
                if (response[0].data.result.length != 0) {
                    var div1 = document.getElementById("table3-td2");
                    var div2 = document.getElementById("table3-td3");

                    var span1 = document.createTextNode(response[0].data.result[0]["actualRecQty"]);
                    var span2 = document.createTextNode(response[0].data.result[0]["actualRecDate"]);
                    div1.appendChild(span1);
                    div2.appendChild(span2);


                    $("#rework-qty").val(response[0].data.result[0]["actualRecQty"]);
                }

            });

        }



        //'*******************************************************************
        //'Title     :  GlobalGenerateWOMaterial
        //'Function  :  make table for raw material
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalGenerateWOMaterial(selectedWO) {
            var promiseArray1 = [];

            if (selectedWO.indexOf("-") != -1) {
                selectedWO = selectedWO.substring(0, selectedWO.indexOf("-"));
            }
            console.log(selectedWO);
            
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWOMaterial', {
                "WOID":selectedWO
            }
            )
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalGenerateWOMaterial", response[0].data.result);
                if (response[0].data.result.length != 0) {
                    makeTable2(response[0].data.result);
                } else {
                    makeTable2([]);
                }

            });

        }

        //'*******************************************************************
        //'Title     :  allRoutesName
        //'Function  :  generate all route list
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function allRoutesName() {
            $http.get(config.baseUrlApi + 'HMLVTS/allRoutesName')
            .then(function (response) {
                console.log("allRoutesName", response.data.result);
                createSelect(response.data.result, "workroute");
                $scope.Directory = response.data.result;


            });
        }

        //'*******************************************************************
        //'Title     :  currentRoutesName
        //'Function  :  generate all route list
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function currentRoutesName(routeID) {
           
            console.log("currentRoutesName", routeID);
            var promiseArray = [];

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/currentRoutesName', {
                "id":routeID
            })
                );

            $q.all(promiseArray).then(function (response) {
                console.log("currentRoutesName", response);
                
                if (response[0].data.result.length != 0) {
                    var selectedRoute = response[0].data.result[0]["name"];
                 //   alert("test place:" + response[0].data.result[0]["name"]);
                 //   var comboAllRoutesID = findInDirectory(response[0].data.result[0]["name"]);
                  //  alert("comboAllRoutesID:", comboAllRoutesID);



                //    alert(isValid);


                    $("#current-route").val(response[0].data.result[0]["name"]);
                    $scope.currentRoute = response[0].data.result[0]["name"];

                    $http.get(config.baseUrlApi + 'HMLVTS/allRoutesName')
                    .then(function (response) {
                      //  console.log("findInDirectory", response.data.result);
                      //  $scope.Directory = response.data.result;
                        console.log("findInDirectory current route", $scope.Directory);
                        console.log("findInDirectory current check", $scope.currentRoute);
                        var isTable6Valid = false;
                        if ($scope.Directory != undefined) {
                            for (var i = 0; i < $scope.Directory.length; i++) {
                                if (String($scope.Directory[i]["name"]).trim() == String($scope.currentRoute).trim()) {
                                    alert("found");
                                    isTable6Valid = true;
                                    // break;
                                }
                            }
                        }
                        alert("reached");
                        if (isTable6Valid == false) {
                            alert("RouteID or RouteName not found");//necessary
                            document.getElementById("rework-table6").innerHTML = "";
                            document.getElementById("select_wcseq").innerHTML = "";
                            document.getElementById("select_comboProblemProcess").innerHTML = "";
                        }
                    });


                } else {
                    alert("RouteID or RouteName not found");//necessary
                    document.getElementById("rework-table6").innerHTML = "";
                    document.getElementById("select_wcseq").innerHTML = "";
                }
            });
        }


        //'*******************************************************************
        //'Title     :  GlobalMaxProcOpSeq
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalMaxProcOpSeq(selectedWO) {
            var CurProcOpSeq;
            var promiseArray1 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GlobalMaxProcOpSeq', {
                "WOID": selectedWO
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalMaxProcOpSeq", response[0].data.result);
                if (response[0].data.result != []) {
                    if (response[0].data.result[0]["maxProcOpSeq"] == "" ||response[0].data.result[0]["maxProcOpSeq"] == null) {
                        CurProcOpSeq = "0";
                       // alert("1");
                    } else {
                        CurProcOpSeq = response[0].data.result[0]["maxProcOpSeq"];
                      //  alert("2");
                    }
                }

                if (CurProcOpSeq == 0 || CurProcOpSeq == "0") {
                    $scope.comboProblemProcess = false;
                    $("#select_comboProblemProcess").attr("disabled", "disabled");
                } else {
                    $scope.comboProblemProcess = true;
                    $("#select_comboProblemProcess").removeAttr("disabled");
                }

                $scope.CurProcOpSeq = CurProcOpSeq;


                console.log("$scope.CurProcOpSeq", $scope.CurProcOpSeq + " " + CurProcOpSeq);

            });

           
        }


        //'*******************************************************************
        //'Title     :  GlobalGenerateWODetail
        //'Function  :  make table for wo detail
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalGenerateWODetail(selectedWO, strExecProcOpSeq) {

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            console.log("GlobalGenerateWODetail procopseq", strExecProcOpSeq+"||");

            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail1', {
                    "WOID":selectedWO
                })
                );

            promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail2', {
                    "WOID": String(selectedWO).trim(),
                    "ProcOpSeq": String(strExecProcOpSeq).trim()
                })
                );

            promiseArray3.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail3', {
                    "WOID":selectedWO
                })
                );

            promiseArray4.push(
                  $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail4', {
                      "WOID": selectedWO
                  })
                  );




            $q.all(promiseArray1).then(function (response) {
                console.log("GlobalGenerateWODetail1", response[0].data.result);
                if (response[0].data.result != []) {
                    //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                    //combineJson(response[0].data.result);
                    //$scope.table1.concat(response[0].data.result[0]);
                    var span1 = document.createTextNode(response[0].data.result[0]["partID"]);
                    var div1 = document.getElementById("table1-td1");
                    div1.appendChild(span1);

                    var span2 = document.createTextNode(response[0].data.result[0]["toolDescription"]);
                    var div2 = document.getElementById("table1-td2");
                    div2.appendChild(span2);

                    var span3 = document.createTextNode(response[0].data.result[0]["plannerRemark"]);
                    var div3 = document.getElementById("table1-td3");
                    div3.appendChild(span3);
                }
                

                $q.all(promiseArray2).then(function (response) {
                    console.log("GlobalGenerateWODetail2", response);
                    if (response[0].data.result.length != 0) {
                        //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                        // $scope.table1.concat(response[0].data.result[0]);
                        //combineJson(response[0].data.result);
                        var span4 = document.createTextNode(response[0].data.result[0]["remark"]);
                        var div4 = document.getElementById("table1-td4");
                        div4.setAttribute("style", "color:red;");
                        div4.appendChild(span4);
                    }


                    $q.all(promiseArray3).then(function (response) {
                        console.log("GlobalGenerateWODetail3", response[0].data.result);
                        if (response[0].data.result.length != 0) {
                            //$scope.table1.concat(response[0].data.result[0]);
                            //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                            //combineJson(response[0].data.result);
                            var span5 = document.createTextNode(response[0].data.result[0]["description"]);
                            var div5 = document.getElementById("table1-td5");
                            div5.appendChild(span5);
                        }

                        $q.all(promiseArray4).then(function (response) {
                            console.log("GlobalGenerateWODetail4", response[0].data.result);
                            if (response[0].data.result.length != 0) {
                                //$scope.table1.concat(response[0].data.result[0]);
                                //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                                // combineJson(response[0].data.result);
                                var span6 = document.createTextNode(response[0].data.result[0]["poNumber"]);
                                var div6 = document.getElementById("table1-td6");
                                div6.appendChild(span6);

                                var span7 = document.createTextNode(response[0].data.result[0]["lineNumber"]);
                                var div7 = document.getElementById("table1-td7");
                                div7.appendChild(span7);

                                var span8 = document.createTextNode(response[0].data.result[0]["soRemark"]);
                                var div8 = document.getElementById("table1-td8");
                                div8.appendChild(span8);
                            }
                            //console.log("GlobalGenerateWODetail table", $scope.table1);
                        });


                    });


                });


            });




           

            //    $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail1', {
            //        "WOID":selectedWO
            //    })
            //.then(function (response) {
            //    //studentData = response.data.result;
            //    makeTable(response.data.result, "#pause-reason-table");
            //});

        }




        //'*******************************************************************
        //'Title     :  splitSelected
        //'Function  :  function to call when selector value is onchange 
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.reworkSelected = function () {
           
            var selectedWO = $('#select_reworklist option:selected').text();
            var strExecProcOpSeq = getProcOpSeq(String(selectedWO).trim());

            $scope.selectedWO = selectedWO;
            $scope.strExecProcOpSeq = strExecProcOpSeq;
           // alert(selectedWO);
            if (selectedWO.trim() != "") {
                console.log("test", ($("#toToggle").css("display")));


                if ($("#toToggle").css("display") == "none") {
                    $("#toToggle").css("display", "block");
                }
                $("#rework-table2").empty();
                $("#rework-table5").empty();

               // comboWO_SelectedIndexChanged(selectedWO); todo: to check
                GlobalGenerateWODetail(selectedWO, strExecProcOpSeq);
                GlobalMaxProcOpSeq(selectedWO);
                GlobalGenerateWOMaterial(selectedWO);
                GlobalGenerateWOSummary(selectedWO, strExecProcOpSeq);
                GlobalCurrentWorkOrderRoute(selectedWO);
                // allRoutesName();
               // ProductTable6();
                

            }

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

            if (itemName == "reworklist") {
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


            if(itemName == "workroute"){
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";   
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["name"]).trim();//Subcon QC
                    option.text = String(rawData[i]["name"]).trim();
                    myDiv.appendChild(option);
                }
               // var selected = $("#current-route").val();
               // alert($scope.currentRoute);
                $("#select_workroute").val($scope.currentRoute);
            }
        }














    }

})();