(function () {
    'use strict';

    angular.module('erp.qctracking').controller('qctrackingCtrl', qctrackingCtrl);

    qctrackingCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window'];

    function qctrackingCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window) {


        $scope.selectData = [];
        $scope.equipmentList = [];
        $scope.QtyUpdated = '';
        $scope.WorkShift = '';
        $scope.ReceivedQty = '';

        $scope.tenant = tenant;
        $scope.ScrapScrapQty = 0;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'qctracking-27' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        load();


        function load() {
            generatePauseReasonList();
            GenerateQCWOList();
            GenerateScrapRemark();
        }

        //'*******************************************************************
        //'Title     :  GenerateScrapRemark
        //'Function  :  preprocess remark list 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateScrapRemark() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateScrapRemark')
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateScrapRemark", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                      //  createSelect(response[0].data.result, "preprocessremark");
                        createSelect(response[0].data.result, "qctracking-scrap-remark");
                        //   createSelect(response[0].data.result, "select_input_woid");
                    }

                }
            });
        }


        function GenerateQCWOList() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateQCWOList')
         );
            //GenerateQCWOList
            //"Select a.WOID, a.ProcOpSeq, c.OrderType "
            //    + "From TS_WorkOrderExecution a "
            //    + "join TS_WorkOrder c "
            //    + "on c.WOID = a.WOID "
            //    + "join TS_WorkOrderRoute b "
            //    + "on b.WOID = a.WOID "
            //    + "and b.ProcOpSeq = a.ProcOpSeq  "
            //    + "And ( b.PrioritizedNo <> '' "
            //    + "And b.PrioritizedNo is not null ) "
            //    + "Where a.WOID not in "
            //    + "( Select distinct ParentWOID "
            //    + "from TS_WorkOrder  "
            //    + "where ParentWOID is not null ) "
            //    + "and  (a.WOStatus  like 'Queuing%' "
            //    + "Or a.WOStatus like 'Processing%' COLLATE SQL_Latin1_General_CP1_CI_AS ) "
            //    + "and a.ProcOpSeq = 1 "
            //    + "And a.McType like 'QC%' COLLATE SQL_Latin1_General_CP1_CI_AS "
            //    + "union all "
            //    + "Select a.WOID, a.ProcOpSeq, c.OrderType "
            //    + "From TS_WorkOrderExecution a "
            //    + "left join TS_WorkOrder c "
            //    + "on c.WOID = a.WOID "
            //    + "left join TS_WorkOrderRoute b "
            //    + "on b.WOID = a.WOID "
            //    + "and b.ProcOpSeq = a.ProcOpSeq "
            //    + "And ( b.PrioritizedNo <> '' "
            //    + "And b.PrioritizedNo is not null ) "
            //    + "join TS_WorkOrderExecution d "
            //    + "on d.WOID = a.WOID "
            //    + "and d.ProcOpSeq = (a.ProcOpSeq -1) "
            //    + "and d.WOStatus  like 'Completed%' COLLATE SQL_Latin1_General_CP1_CI_AS "
            //    + "Where a.WOID not in "
            //    + "( Select distinct ParentWOID "
            //    + "from TS_WorkOrder "
            //    + "where ParentWOID is not null ) "
            //    + "and  (a.WOStatus  like 'Queuing%' "
            //    + "Or a.WOStatus like 'Processing%' COLLATE SQL_Latin1_General_CP1_CI_AS ) "
            //    + "and a.ProcOpSeq > 1 "
            //    + "And a.McType like 'QC%' COLLATE SQL_Latin1_General_CP1_CI_AS "
            //    + "Order by WOID Asc "


            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateQCWOList", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        $scope.selectData = response[0].data.result;
                        createSelect(response[0].data.result, "qctracking-woid");
                    }
                }
            });
        }


        //'*******************************************************************
        //'Title     :  woSelected
        //'Function  :  toggle when woid is changed from the selector
        //'Input     :  
        //'Output    : 
        //'Remark    :comboWO_Selected in original code
        //'*******************************************************************
        $scope.woSelected = function () {
            //todo: need to implement combobox


            //todo to check check for locked woid

            $scope.selectedWOID = String($('#select_qctracking-woid option:selected').text()).trim();
            $("#select_qctracking-woid-input").val($scope.selectedWOID);
            if (String($('#select_qctracking-woid option:selected').text()).trim() != "") {
                

                //Todo: line 1652 UpdateLock to lock the work order
                
                var select_WOID = String($('#select_qctracking-woid-input').val()).trim();
                $scope.ProcOpSeq = findSelectorFullInfo(select_WOID)['procOpSeq'];
                $scope.OrderType = findSelectorFullInfo(select_WOID)['orderType'];
                case0();
                GenerateWOSummary();
                
            }

        }

        //'*******************************************************************
        //'Title     :  pausereasonselected
        //'Function  :  toggle when woid is changed from the selector
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.pausereasonselected = function () {
            var reason = String($('#select_qctracking-pausereason option:selected').text()).trim();
            $("#select_qctracking-pausereason-input").val(reason);
        }


        //'*******************************************************************
        //'Title     :  case0
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function case0() { //line 1724
            console.log("case0");
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();


            if ($scope.ProcOpSeq == undefined || $scope.ProcOpSeq == '') {
                alert("Please enter a valid work order number. ");
                location.reload();
            }

            if(String($scope.OrderType).toLowerCase() == "assembly"){
                //todo: line1747
            } else {

            }


            var promiseArray1 = [];
           // var promiseArray2 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/comboWO_Selected_wotraking1', {
                'WOID': select_WOID,
                'procOpSeq': $scope.ProcOpSeq

            })
         );
            //comboWO_Selected_wotraking
            //"Select WOID, PartID, ActualRecQty, ActualRecDate, CompletedQty, CompletedDate, "
            //+ "OutstandingQty, OutstandingDate, ScrapQty, ScrapDate, AdjustedQty,AdjustedDate, "
            //+ "McID, McType, RouteID, WorkCenter, OpSeq, ProcOpSeq, WOStatus, "
            //+ "SetupStartDate, SetupEndDate, ProdStartDate, ProdEndDate, ParentWOID, Remark, "
            //+ "SendOutDate, ReceivedDate, QtyUpdated, OrderType "
            //+ "From TS_WorkOrderExecution "
            //+ "where WOID = " + "'" + selectedWO + "' "
            //+ "and ProcOpSeq = " + int.Parse(ProcOpSeq)
            //+ "And WOStatus Not like 'Completed%' COLLATE SQL_Latin1_General_CP1_CI_AS "
            //+ "And McType like 'QC%' COLLATE SQL_Latin1_General_CP1_CI_AS ";

         //   promiseArray2.push(
         //   $http.post(config.baseUrlApi + 'HMLVTS/GetGetSalesID', {
         //       'WOID': select_WOID
         //   })
         //);




            $q.all(promiseArray1).then(function (response) {
                console.log("comboWO_Selected_wotraking1", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length != 0) {
                        $scope.selectedWOIDData = response[0].data.result[0];


                        // CheckAnyChildNotCompleted1('2017060001');



                        //**assign variable
                        AssignGlobalVariable();

                        //pre-generate $scope.fnCheckPriorityConfigVar
                        fnCheckPriorityConfig();

                        console.log("$scope.selectedWOIDData", $scope.selectedWOIDData);
                        case5();
                    }
                    //else {
                    //    alert("ERROR:comboWO_Selected_wotraking");
                    //}
                } else {
                    //prompt for wrong WOID line
                    alert("Please enter a valid work order number");
                    location.reload(); // if keepp refreshData location reload, this line can remove
                    RefreshData();
                }
            });

            //$q.all(promiseArray2).then(function (response) {
            //    console.log("GetGetSalesID", response);
            //    if (response.length != 0) {
            //        if (response[0].data.success) {
            //            $scope.PPID = response[0].data.result[0]["ppid"];
            //            $scope.SalesOrderID = response[0].data.result[0]["salesOrderID"];
            //            $scope.ReleasedDate = response[0].data.result[0]["releasedDate"];
            //        }
            //    }
            //});




        }

        
        //'*******************************************************************
        //'Title     :  case5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function case5() { //line 1815
            console.log("case5");
            if ($scope.QtyUpdated == undefined || String($scope.QtyUpdated) == '') {
                $scope.QtyUpdated = 0;
            }
            if ($scope.QtyUpdated < 2) {
                if ($scope.QtyUpdated < 1) {
                    if ($scope.ProcOpSeq > 1) {//to debug
                        //if (UpdateQtyFromPreviousProcOpSeq()) {
                        //    case0();
                        //}

                        /////////////////////////////////////UpdateQtyfromPreviousProOpSeq///////////////
                        console.log("UpdateQtyFromPreviousProcOpSeq");
                        var promiseArray11 = [];
                        var promiseArray21 = [];

                        promiseArray11.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq1', {
                            'WOID': $scope.selectedWOIDData['woid'],
                            'ProcOpSeq': ($scope.ProcOpSeq - 1)
                        })
                     );
                        //UpdateQtyFromPreviousProcOpSeq1
                        //"Select CompletedQty, CompletedDate "
                        //+ "From TS_WorkOrderExecution "
                        //+ "where WOID = " + "'" + selectedWO + "' "
                        //+ "and ProcOpSeq = " + (int.Parse(ProcOpSeq) - 1);
                        $q.all(promiseArray11).then(function (response) {
                            console.log("UpdateQtyFromPreviousProcOpSeq1", response);

                            var currentdate = getCurrentDatetime();
                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    var completeQty = response[0].data.result[0]['completedQty'];
                                    var completeDate = response[0].data.result[0]['completedDate'];
                                    console.log("UpdateQtyFromPreviousProcOpSeq2 test");
                                    promiseArray21.push(
                                        $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq2', {

                                            'ActualRecQty': completeQty,
                                            'ActualRecDate': completeDate,
                                            'CompletedQty': 0,
                                            'CompletedDate': completeDate,
                                            'OutstandingQty': completeQty,
                                            'OutstandingDate': completeDate,
                                            'QtyUpdated': 1,
                                            'ProcOpSeq': $scope.ProcOpSeq,
                                            'WOID': $scope.selectedWOIDData['woid']

                                        })
                                    );
                                    //UpdateQtyFromPreviousProcOpSeq2
                                    //            "UPDATE [TS_WorkOrderEXecution] SET ActualRecQty = @ActualRecQty, "
                                    //+ "ActualRecDate = @ActualRecDate, "
                                    //+ "CompletedQty = @CompletedQty, "
                                    //+ "CompletedDate = @CompletedDate, "
                                    //+ "OutstandingQty = @OutstandingQty, "
                                    //+ "OutstandingDate = @OutstandingDate, "
                                    //+ "QtyUpdated = @QtyUpdated "
                                    //+ "where WOID = @WOID "
                                    //+ "and ProcOpSeq = " + int.Parse(ProcOpSeq);

                                    $q.all(promiseArray21).then(function (response) {
                                        console.log("UpdateQtyFromPreviousProcOpSeq2", response);
                                        //if()
                                        case0();

                                    });
                                }
                            } else {
                                alert("No previous record found.");
                                location.reload();
                            }

                        });
                    } else {
                        case20();
                    }
                } else {
                    case20();
                }
            } else {
                case20();
            }
        }


        //'*******************************************************************
        //'Title     :  case20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function case20() { //line 1855
            console.log("case20");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                GlobalGenerateWODetail();
                GlobalGenerateWOMaterial();
            } else {
                GlobalGenerateWODetail();
                GlobalGenerateWOMaterial(); //to check what is diff btw fpSpreadWorkOrderDetailAssembly & fpSpreadWorkOrderDetail
            }

            $("#qctracking-table2-work").val($scope.WorkCenter);
            $("#qctracking-table2-opseq").val($scope.ProcOpSeq);
            console.log("$scope.Remark", $scope.Remark);
            if ($scope.Remark != "" && $scope.Remark != null) {
                $("#select_qctrackingremark").val($scope.Remark);
                $("#select_qctrackingremark-input").val($scope.Remark);
            }


            GenerateWOSummaryScrap();
            GenerateQCEquipmentList();
            GenerateSeletedQCEquipmentList();
            //to check, assign to comboMCList line 2245
            console.log("case20 type", $scope.OrderType);


            var promiseArray1 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GetCurrentShiftID', {
                "currentTime": currentdate
            }
            )
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GetCurrentShiftID",response);
                if(response.length != 0){
                    if(response[0].data.success  && response[0].data.result.length != 0){
                        $scope.WorkShift = response[0].data.result[0]['shift_code'];
                        //todo: Assign to txtWorkShift line2337
                    }
                }

            });

            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {// to check, this can be combined to the loop above
                GenerateSubAssemblyWOList();
            } else {
                $("#subAssembly").css("display", "none");
            }


            CheckQCWOOpnStatus();
            case30();

        }

        //'*******************************************************************
        //'Title     :  case30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function case30() { //line 1895
            CalculateQCDuration();
            var alertMSG = String(document.getElementById("table1-td4").innerHTML).trim();
            if(alertMSG != ""){
                alert(alertMSG);
            }

            GenerateQueuingWOList($scope.McID);

            if ($("#wo-tracking-updatereceive").css('display') != "none") { // enable

            } else {
                if ($("#inspection-row-2").css('display') != "none") { //if start enable

                } else if ($("#inspection-row-5").css('display') != "none") { //if stop enable

                }
            }


          //  alert("Work Order Tracking ready");
        }



        //'*******************************************************************
        //'Title     :  CalculateQCDuration
        //'Function  :  calculate estimated production duration 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function CalculateQCDuration() {
            var timeperunit;
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CalculateQCDuration', {
                "PartID": $scope.PartID,
                "WorkCenter": $scope.WorkCenter,
                "RouteID": $scope.RouteID,
                "OpSeq": $scope.OpSeq
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CalculateQCDuration", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    if (response[0].data.result[0]["prod_unit"] == undefined || response[0].data.result[0]["prod_unit"] == null) {
                        timeperunit = 0;
                    } else {
                        timeperunit = response[0].data.result[0]["prod_unit"];
                    }

                    if ($scope.ReceivedQty == "") {
                        $scope.ReceivedQty = 1;
                    }

                    var Duration = parseFloat($scope.ReceivedQty) * timeperunit;
                    var time = secondsToHms(Duration);
                    console.log("time receiveQty",$scope.ReceivedQty);
                    console.log("time",time);
                    $("#qctracking-table3-qctotalduration").val(time);
                } else {
                    $("#qctracking-table3-qctotalduration").val("0:0:0");
                }

            });
        }
        //'****************************************************************************************************
        //'Title     :  CheckQCWOOpnStatus
        //'Function  :  check WO operation status  
        //'Input     :  
        //'Output    :  state: 1=Job not start, 
        //'             5=JobRun,6=JobPause, 7=Job end
        //'Remark    :  
        //'**************************************************************************************************
        function CheckQCWOOpnStatus() {
            var WOID = $scope.selectedWOIDData['woid'];
            var ProcOpSeq = $scope.ProcOpSeq;
            var WorkCenter = $scope.WorkCenter;

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckQCWOOpnStatus1', {
                'WOID': WOID,
                'ProcOpSeq': ProcOpSeq,
                'WorkCenter': WorkCenter
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CheckQCWOOpnStatus1", response);
                $scope.tempResponse = response;
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['qtyUpdated'] == null || response[0].data.result[0]['qtyUpdated'] == "") {
                            $scope.QtyUpdated = 0;
                        } else {
                            $scope.QtyUpdated = response[0].data.result[0]['qtyUpdated'];
                        }

                       // if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) {
                            //line 2907
                            //   console.log("comboMCList", $scope.comboMCList);
                            if (response[0].data.result[0]['setupStartDate'] == null && response[0].data.result[0]['prodEndDate'] == null) {
                                console.log("CheckQCWOOpnStatus1 loop1");//job not start
                                $scope.WOGlobalWOOpnState = 1;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.McID;// to check, this is redundant to $scope.McID
                                CheckQCWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null && response[0].data.result[0]['prodEndDate'] != null) {
                                console.log("CheckQCWOOpnStatus1 loop2");
                                $scope.WOGlobalWOOpnState = 7;     //Job end
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = String(response[0].data.result[0]["mcID"]).trim();
                                CheckQCWOOpnStatusAssign();
                            } else {
                                console.log("CheckQCWOOpnStatus1 loop3");
                                console.log("$scope.selectedWOID", $scope.selectedWOID);

                                    promiseArray2.push(//here to continue
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckQCWOOpnStatus2', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter': WorkCenter
                                    })
                                    );



                                $q.all(promiseArray2).then(function (response) {
                                    console.log("CheckQCWOOpnStatus2", response);
                                    if (response.length != 0) {
                                        if (response[0].data.success && response[0].data.result.length != 0) {
                                            if (String(response[0].data.result[0]['startType']).trim() == "QCStart" || String(response[0].data.result[0]['startType']).trim() == "QCContinue") {
                                                console.log("CheckQCWOOpnStatus2.1");//Job Run
                                                $scope.WOGlobalWOOpnState = 5;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;// to check, this is redundant to $scope.selectedWOID
                                                CheckQCWOOpnStatusAssign();
                                            } else if (String(response[0].data.result[0]['startType']).trim() == "QCPause") {
                                                console.log("CheckQCWOOpnStatus2.2");
                                                $scope.WOGlobalWOOpnState = 6;     //Job Pauase
                                                $scope.WOGlobalWOPauseReason = String(response[0].data.result[0]['reason']).trim();
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                console.log("$scope.McID", $scope.McID);
                                                CheckQCWOOpnStatusAssign();
                                            } else {
                                                console.log("CheckQCWOOpnStatus2.3");
                                                $scope.WOGlobalWOOpnState = 0;     //Job end
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                            }
                                        }

                                    } else {
                                        console.log("CheckQCWOOpnStatus2.4");
                                        $scope.WOGlobalWOOpnState = 0;     //Job end
                                        $scope.WOGlobalWOPauseReason = "";
                                        $scope.WOGlobalWOMcID = $scope.McID;
                                    }

                                });

                            }

                        //}
                    }
                }
            });
        }


        //'*******************************************************************
        //'Title     :    fnGetUserAccessRight
        //'Function  :    Get user access right
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        function fnGetUserAccessRight(strUserID, strMenuName) {
            //todo to check, this stored procedure always fail
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnGetUserAccessRight', {
                'strUserID': String(strUserID).trim(),
                'strMenuName': String(strMenuName).trim()
            })
         );

            return promiseArray1;



        }




        //'*******************************************************************
        //'Title     :  btnCancelWO_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : function to control cancel work order
        //'*******************************************************************
        $scope.btnCancelWO_Click = function () {
            // var select_WOID = String($('#select_wotracking-woid option:selected').text()).trim();
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                if (String(document.getElementById("WIP-td5_1").innerHTML).trim() == "") {
                    alert("Please update received qty!");
                } else {
                    var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
                    var password = String($("#qctracking-table3-password").val()).trim();
                    if (operatorName == "" || password == "") {
                        console.log("btnCancel_Click1");
                        alert("Please enter Operator Name or scan Operator ID");
                    } else {
                        var promiseArray1 = ValidateOperatorName(false);
                        console.log("ValidateOperatorName", promiseArray1);
                        $q.all(promiseArray1).then(function (response) {
                            console.log("Token/GetToken", response);
                            if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                                console.log("btnCancel_Click2");
                                ///*** if user check pass****//
                                var answer = confirm("This work order will be discarded. Confirm to cancel ?");
                                //todo to implement, trackingdefault ok in model so that default button can change
                                //if (config.TrackingDefaultOK) {
                                //        setupStartCase5();
                                //} else {
                                //    if (answer) {
                                //        setupStartCase5();
                                //    }
                                //}

                                if (answer) {
                                    $scope.DiscardReason = prompt("Cancel WO Reason", "");
                                    console.log("DiscardReason");

                                    if ($("#inspection-row-2").css("display") == "none") {
                                        btnCancelWO_ClickCase20();
                                    } else {
                                        btnCancelWO_ClickCase30();
                                    }                                 
                                }
                            } else {
                                console.log("btnCancel_Click3");
                                $("#qctracking-table3-operatorName").val("");
                                $("#qctracking-table3-password").val("");
                            }
                        });
                    }
                }
            }
        }


        //'*******************************************************************
        //'Title     :  btnCancelWO_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnCancelWO_ClickCase20() {
            console.log("btnCancelWO_ClickCase20");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            //

            //if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
            //    if ($("#production-row-2").css("display") == "none") {
            //        endtype = 'JobEnd';
            //    }
            //} else {

            //    if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") == "none")
            //        ) {
            //        endtype = 'JobEnd';
            //    } else if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") != "none") && ($("#production-row-2").css("display") != "none") ||
            //        ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") != "none")) {
            //        endtype = 'SetupEnd';
            //    }
            //}

            var endtype = "QCEnd";
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase20_1', {
                'endType': endtype,//                   
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq,//
                'WorkCenter': $scope.WorkCenter//
            })
        );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnCancelWO_ClickCase20_1", response);


                //var TotalSetupDuration = 0;
                //var subcontime = 0;
                //if (String($scope.McType).trim() == "Subcon") {

                //    if (String($("#wotracking-table3-total").val()).trim() == '') {
                //        subcontime = 0;
                //    }
                //    TotalSetupDuration = 0;
                //    //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                //    subcontime = String($("#wotracking-table3-total").val().trim());

                //    $("#wotracking-table3-total").val("0.00");
                //} else {
                //    if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                //        $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                //    }
                //    if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                //        $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                //    }
                //    subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                //    TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
                //}


                var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
                console.log("cmdQCStop_ClickCase10 time", ProdTotalDuration);

                if (ProdTotalDuration == "") {
                    ProdTotalDuration = "0:0:0";
                }


                ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);

                $scope.WOExecutionStatus = "Completed";
                var currentdate = getCurrentDatetime();
                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase20_2_1', {
                    'WOStatus': $scope.WOExecutionStatus,//
                    'ProdEndDate': currentdate,
                    'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                    //'McID': $scope.McID,//
                    //'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                    'ProdTotalDuration': ProdTotalDuration,//
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'WorkCenter': $scope.WorkCenter//
                })
            );


                $q.all(promiseArray2).then(function (response) {
                    console.log("btnCancelWO_ClickCase20_2_1", response);

                    promiseArray3.push(
                      $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_1', {
                          'WOID': $scope.selectedWOIDData['woid'],//
                          'EndDate': currentdate
                      })
                  );

                    $q.all(promiseArray3).then(function (response) {
                        console.log("btnCancelWO_ClickCase20 cmdUpdateReceived_ClickCase80_1", response);
                        btnCancelWO_ClickCase40();
                    });

                });

            });
        }

        //'*******************************************************************
        //'Title     :  btnCancelWO_ClickCase30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnCancelWO_ClickCase30() {
            console.log("btnCancelWO_ClickCase30");
            var promiseArray1 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase30_1_1', {
                'WOStatus': $scope.WOExecutionStatus,//        
                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq,//
                'WorkCenter': $scope.WorkCenter//
            })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("btnCancelWO_ClickCase30_1_1", response);
                btnCancelWO_ClickCase40();
            });
        }


        //'*******************************************************************
        //'Title     :  btnCancelWO_ClickCase40
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnCancelWO_ClickCase40() {
            console.log("btnCancelWO_ClickCase40");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();

            $scope.WOExecutionStatus = "Completed";
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase40_1', {
                'WOStatus': $scope.WOExecutionStatus,//        
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq
            })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("btnCancelWO_ClickCase40_1", response);


                $scope.WOExecutionStatus = "Completed";
                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase40_2', {
                    'WOStatus': $scope.WOExecutionStatus,//        
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'DiscardReason': $scope.DiscardReason
                })
            );


                $q.all(promiseArray2).then(function (response) {
                    console.log("btnCancelWO_ClickCase40_2", response);
                    if ($("#inspection-row-2").css("display") == "none") {
                        var endtype = 'QCEnd';
                        promiseArray3.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase40_3', {
                            'StopDateTime': getCurrentDatetime(),
                            'endType': endtype,//        
                            'WOID': $scope.selectedWOIDData['woid'],//
                            'ProcOpSeq': $scope.ProcOpSeq,//
                            'WorkCenter': $scope.WorkCenter
                        })
                    );

                        $q.all(promiseArray3).then(function (response) {
                            console.log("btnCancelWO_ClickCase40_3", response);

                            //todo:location.reload();

                        });
                    }

                });
            });
        }
        


        //Scrap functions:


        //'*******************************************************************
        //'Title     :  ScrapConfirm
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : button click for confirm in scrap model
        //'*******************************************************************
        $scope.ScrapConfirm = function () {
            var scrapQty = $("#ScrapModal-qty").val();
            var scrapRemark = String($('#select_qctracking-scrap-remark option:selected').text()).trim();
            var radio = $('input[name="State1"]:checked').val();

            var success1 = false;
            var success2 = false;
            var success3 = false;

            if (String(scrapQty).trim() == "") {
                alert("Please enter scrap Qty");
            } else {
                scrapQty = parseInt(scrapQty);
                if (scrapQty <= 0) {
                    alert("Scrap Qty must be > 0");
                } else {
                    if (scrapQty > $scope.ScrapOutstandingQty) {
                        alert("Scrap Qty > Outstanding Qty!");
                    } else if (scrapRemark == "") {
                        alert("Please enter the scrap remark.");
                    } else if (scrapRemark.length >= 100) {
                        alert("Remark must be < 100 characters!");
                    } else if ($scope.WOGlobalWOOpnState != 7 && scrapQty == $scope.ScrapOutstandingQty) {
                        alert("Please stop production or enter recieved date before complete the work order.");
                    } else {
                        var promiseArray1 = [];
                        var promiseArray2 = [];
                        var promiseArray3 = [];
                        var currentdate = getCurrentDatetime();
                        promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/butConfirm_Click1', {
                                'WOID': $scope.selectedWOIDData['woid'],//
                                'ProcOpSeq': $scope.ProcOpSeq,//
                                'WorkCenter': $scope.WorkCenter,
                                'RouteID': $scope.RouteID,
                                'OpSeq': $scope.OpSeq,
                                'ScrapQty': scrapQty,
                                'Type': scrapRemark,
                                'ScrapType': radio,
                                'ScrapDate': currentdate,
                                'UserID': String($("#qctracking-table3-operatorName").val()).trim(),//
                                'UserName': String($("#qctracking-table3-operatorName").val()).trim(),//
                                'Status': "Pending",
                                'ApprovedID': String($("#qctracking-table3-operatorName").val()).trim(),//
                                'ApprovedName': String($("#qctracking-table3-operatorName").val()).trim(),//
                            })
                        );

                        $q.all(promiseArray1).then(function (response) {
                            console.log("butConfirm_Click1", response);
                            if (response.length != 0 && response[0].data.success) {
                                success1 = true;
                            }

                            promiseArray2.push(
                               $http.post(config.baseUrlApi + 'HMLVTS/butConfirm_Click2', {
                                   'WOID': $scope.selectedWOIDData['woid'],//
                                   'ScrapQty': scrapQty,
                                   'AccumulatedScrapDate': currentdate
                               })
                           );

                            $q.all(promiseArray2).then(function (response) {
                                console.log("butConfirm_Click2", response);
                                if (response.length != 0 && response[0].data.success) {
                                    success2 = true;
                                }

                                promiseArray3.push(
                                   $http.post(config.baseUrlApi + 'HMLVTS/butConfirm_Click3', {
                                       'WOID': $scope.selectedWOIDData['woid'],//
                                       'ScrapQty': scrapQty,
                                       'AccumulatedScrapDate': currentdate,
                                       'ProcOpSeq': $scope.ProcOpSeq
                                   })
                               );

                                $q.all(promiseArray3).then(function (response) {
                                    console.log("butConfirm_Click3", response);
                                    if (response.length != 0 && response[0].data.success) {
                                        success3 = true;
                                    }

                                    if (success1 && success2 && success3) {
                                        alert("Scrap successfully added!");
                                        //fetch WO summary
                                        GenerateWOSummary();
                                        //fetch WO summary - scrap + unaccountable qty
                                        //GenerateWOSummaryScrap();  loop hole here, wosummary is execute after btnScrap_clickCase0 due to behaviour of angularjs, so need to control here


                                        var promiseArray1 = [];
                                        promiseArray1.push(
                                            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummaryScrap', {
                                                "WOID": $scope.selectedWOIDData['woid'],
                                                "ProcOpSeq": $scope.ProcOpSeq
                                            }
                                        )
                                        );

                                        $q.all(promiseArray1).then(function (response) {
                                            console.log("GenerateWOSummaryScrap", response);
                                            if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                                                console.log("GenerateWOSummaryScrap loop1");
                                                if (response[0].data.result[0]['sumScrapQty'] != null &&
                                                    response[0].data.result[0]['sumScrapQty'] != 0 &&
                                                    response[0].data.result[0]['sumScrapQty'] != ""
                                                    ) {
                                                    console.log("GenerateWOSummaryScrap loop2");
                                                    $("#WIP-tr-3").css("display", "block");
                                                    $scope.ScrapScrapQty = response[0].data.result[0]['sumScrapQty'];
                                                    document.getElementById("WIP-td3_1").innerHTML = response[0].data.result[0]['sumScrapQty'];
                                                    document.getElementById("WIP-td3_2").innerHTML = response[0].data.result[0]['latestScrapDate'];

                                                } else {
                                                    console.log("GenerateWOSummaryScrap loop3");
                                                    $("#WIP-tr-3").css("display", "none");
                                                }

                                            }

                                            $('#ScrapModal').modal('toggle');
                                            btnScrap_ClickCase0();
                                        });










                                        //$('#ScrapModal').modal('toggle');
                                        //btnScrap_ClickCase0();
                                    } else {
                                        alert("ERROR:SCRAP ERROR");
                                    }

                                });
                            });
                        });
                    }
                }
            }
        }

        //'*******************************************************************
        //'Title     :  btnScrap_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : function to control scrap
        //'*******************************************************************
        $scope.btnScrap_Click = function () {
            // console.log("btnScrap_Click outstanding", $scope.OutstandingQty);

            $scope.ScrapOutstandingQty = parseInt(document.getElementById("WIP-td9_1").innerHTML);

            //to check for user right
            //var select_WOID = String($('#select_wotracking-woid option:selected').text()).trim();
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                if (String(document.getElementById("WIP-td5_1").innerHTML).trim() == "") {
                    alert("Please update received qty!");
                } else {
                    var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
                    var password = String($("#qctracking-table3-password").val()).trim();
                    if (operatorName == "" || password == "") {
                        console.log("btnScrap_Click1");
                        alert("Please enter Operator Name or scan Operator ID");
                    } else {
                        var promiseArray1 = ValidateOperatorName(false);
                        console.log("ValidateOperatorName", promiseArray1);
                        $q.all(promiseArray1).then(function (response) {
                            console.log("Token/GetToken", response);
                            if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                                console.log("btnScrap_Click2");
                                //btnScrap_ClickCase30();
                                document.getElementById("modalWOID2").innerHTML = $scope.selectedWOIDData['woid'];
                                $('#ScrapModal').modal('show');
                            } else {
                                console.log("btnScrap_Click3");
                                $("#qctracking-table3-operatorName").val("");
                                $("#qctracking-table3-password").val("");
                            }
                        });
                    }
                }
            }



        }

        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase0
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase0() {
            console.log("btnScrap_ClickCase0");
            $scope.ScrapActualRecQty = String(document.getElementById("WIP-td5_1").innerHTML).trim();
            $scope.ScrapCompletedQty = String(document.getElementById("WIP-td6_1").innerHTML).trim();
            // $scope.ScrapScrapQty = String(document.getElementById("WIP-td3_1").innerHTM).trim();
            $scope.ScrapTotalActAdjustedQty = String(document.getElementById("WIP-td8_1").innerHTML).trim();
            $scope.ScrapstrOutstandingQty = String(document.getElementById("WIP-td9_1").innerHTML).trim();
            console.log('btnScrap_ClickCase0.0 ScrapScrapQty', $scope.ScrapScrapQty);
            if ($scope.ScrapActualRecQty == "") {
                $scope.ScrapActualRecQty = 0;
            } else {
                $scope.ScrapActualRecQty = parseInt($scope.ScrapActualRecQty);
            }

            if ($scope.ScrapCompletedQty == "") {
                $scope.ScrapCompletedQty = 0;
            } else {
                $scope.ScrapCompletedQty = parseInt($scope.ScrapCompletedQty);
            }

            if ($scope.ScrapScrapQty == "") {
                $scope.ScrapScrapQty = 0;
            } else {
                $scope.ScrapScrapQty = parseInt($scope.ScrapScrapQty);
            }

            if ($scope.ScrapTotalActAdjustedQty == "") {
                $scope.ScrapTotalActAdjustedQty = 0;
            } else {
                $scope.ScrapTotalActAdjustedQty = parseInt($scope.ScrapTotalActAdjustedQty);
            }

            if ($scope.ScrapstrOutstandingQty == "") {
                $scope.ScrapstrOutstandingQty = 0;
            } else {
                $scope.ScrapstrOutstandingQty = parseInt($scope.ScrapstrOutstandingQty);
            }


            console.log('btnScrap_ClickCase0 ScrapActualRecQty', $scope.ScrapActualRecQty);
            console.log('btnScrap_ClickCase0 ScrapCompletedQty', $scope.ScrapCompletedQty);
            console.log('btnScrap_ClickCase0 ScrapScrapQty', $scope.ScrapScrapQty);


            if ($scope.ScrapCompletedQty == $scope.ScrapActualRecQty - $scope.ScrapScrapQty) {
                if ($scope.WOGlobalWOOpnState != 7) {
                    alert("Please confirm received before complete the work order.");
                    btnScrap_ClickCase100();
                } else {
                    $scope.WOExecutionStatus = "Completed";
                    btnScrap_ClickCase10();
                }
            } else {
                if ($scope.ScrapCompletedQty > $scope.ScrapActualRecQty - $scope.ScrapScrapQty) {
                    alert("Please enter the correct completed qty. Max qty is " + $scope.ScrapActualRecQty - $scope.ScrapScrapQty);
                    btnScrap_ClickCase100();
                } else {
                    btnScrap_ClickCase10();
                }
            }


        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase10() {
            console.log("btnScrap_ClickCase10");
            var currentdate = getCurrentDatetime();
            var promiseArray1 = [];

            var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
            console.log("cmdQCStop_ClickCase10 time", ProdTotalDuration);

            if (ProdTotalDuration == "") {
                ProdTotalDuration = "0:0:0";
            }


            ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);


            console.log('btnScrap_ClickCase10 ScrapActualRecQty', $scope.ScrapActualRecQty);
            console.log('btnScrap_ClickCase10 ScrapCompletedQty', $scope.ScrapCompletedQty);
            console.log('btnScrap_ClickCase10 ScrapScrapQty', $scope.ScrapScrapQty);


            $scope.ScrapOutstandingQty = $scope.ScrapActualRecQty - ($scope.ScrapCompletedQty + $scope.ScrapScrapQty);

            console.log();
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdScrap_ClickCase10_1', {
                  //'ActualRecQty': $scope.ActualRecQty,//
                  'ActualRecQty': $scope.ScrapActualRecQty,
                  'ActualRecDate': currentdate,//
                  'CompletedQty': $scope.ScrapCompletedQty,//
                  'CompletedDate': currentdate,//
                  'OutstandingQty': $scope.ScrapOutstandingQty,//
                  'OutstandingDate': currentdate,//
                  'WOStatus': $scope.WOExecutionStatus,//
                  //'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                  'ProdTotalDuration': ProdTotalDuration,
                  'WOID': $scope.selectedWOIDData['woid'],
                  'WorkCenter': $scope.WorkCenter,//
                  'ProcOpSeq': $scope.ProcOpSeq//
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase10 cmdScrap_ClickCase10_1", response);
                btnScrap_ClickCase15();
            });
        }



        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase15() {
            console.log("btnScrap_ClickCase15");
            if ($scope.WOExecutionStatus == "Completed") {
                btnScrap_ClickCase20();
            } else {
                btnScrap_ClickCase100();
            }

        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase20() {
            console.log("btnScrap_ClickCase20");
            var promiseArray1 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'ProcOpSeq': $scope.ProcOpSeq,//
                  'ExStatus': 9,
                  'UpdatedDate': currentdate,
                  'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'reason': ''
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase20 cmdUpdate_ClickCase10_2", response);
                if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                    btnScrap_ClickCase30();//to check to check tocheck, seems like btnScrap_clickCase30 is the same as btnScrap_clickCase50
                } else {
                    btnScrap_ClickCase30();
                }
            });
        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase30() {
            console.log("btnScrap_ClickCase30");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase30', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );
            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase30 cmdUpdateReceived_ClickCase30", response);
                console.log("btnScrap_ClickCase30 length", response.length);
                console.log("btnScrap_ClickCase30 length1", response[0].data.result.length);
                if (response.length != 0 && response[0].data.result.length != 0) {
                    $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];
                    console.log("btnScrap_ClickCase30.1");
                    console.log("btnScrap_ClickCase30.1 procopseq", $scope.ProcOpSeq);
                    console.log("btnScrap_ClickCase30.1 LastProcOpSeq", $scope.LastProcOpSeq);
                    if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                        console.log("btnScrap_ClickCase30.2");
                        $scope.WOStatus = "Completed";
                        var promiseArray = UpdateWorkOrderQty();
                        $q.all(promiseArray).then(function (response) {
                            console.log("UpdateWorkOrderQty.1", response);
                            btnScrap_ClickCase80();
                        });
                    } else {
                        console.log("btnScrap_ClickCase30.3");
                        if ($scope.WOExecutionStatus == "Completed") {
                            console.log("btnScrap_ClickCase30.4");
                            if ($scope.CompletedQty > 0) {
                                console.log("btnScrap_ClickCase30.5");
                                RefreshData();
                            } else {
                                console.log("btnScrap_ClickCase30.6");
                                $scope.WOStatus = "Completed";
                                var promiseArray = UpdateWorkOrderQty();

                                $q.all(promiseArray).then(function (response) {
                                    console.log("UpdateWorkOrderQty.1", response);
                                    btnScrap_ClickCase80();
                                });
                            }
                        } else {
                            console.log("btnScrap_ClickCase30.7");
                            btnScrap_ClickCase100();
                        }
                    }
                } else {
                    alert("No route sequence found. ");
                    $scope.WOStatus = "Completed";
                    var promiseArray = UpdateWorkOrderQty();
                    $q.all(promiseArray).then(function (response) {
                        console.log("UpdateWorkOrderQty.1", response);
                        btnScrap_ClickCase80();
                    });
                }
            });
        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase50
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase50() {
            console.log("btnScrap_ClickCase50");
            //todo:line6355 however, btnScrap_ClickCase50 seems exactly the same as btnScrap_ClickCase30 ??????
            //
        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase80
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase80() {
            console.log("btnScrap_ClickCase80");
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_1', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'EndDate': getCurrentDatetime()
              })
          );
            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'WOStatus': $scope.WOStatus
              })
          );
            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase80 cmdUpdateReceived_ClickCase80_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log(" btnScrap_ClickCase80cmdUpdateReceived_ClickCase80_2", response);
                    btnScrap_ClickCase90();
                });
            });
        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase80
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase90() {
            console.log("btnScrap_ClickCase90");
            if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                btnScrap_ClickCase92();
            } else {
                btnScrap_ClickCase95();
            }
        }

        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase92
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase92() {
            console.log("btnScrap_ClickCase92");
            if (CheckAnyChildNotCompleted1() == 0) // check all child WOs completed ?
            {
                //all child WOs completed
                WOStatus = "Completed";
                cmdUpdate_ClickCase95();
            }


        }


        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase95
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase95() {
            console.log("btnScrap_ClickCase95");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );


            promiseArray3.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_3', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );



            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_1", response);

                $q.all(promiseArray3).then(function (response) {
                    console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_3", response);
                    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                        $scope.PPID = response[0].data.result[0]['ppid'];
                        $scope.SalesOrderID = response[0].data.result[0]['salesOrderID'];
                        $scope.ReleasedDate = response[0].data.result[0]['releasedDate'];
                    }

                    promiseArray2.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                            'id': $scope.PPID,
                            'Status': $scope.WOStatus

                        })
                    );

                    $q.all(promiseArray2).then(function (response) {
                        console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_2", response);
                        //location.reload();
                    });

                });



            });

        }

        //'*******************************************************************
        //'Title     :  btnScrap_ClickCase100
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function btnScrap_ClickCase100() {
            console.log("btnScrap_ClickCase100");
            //fetch WO summary
            GenerateWOSummary();
            //fetch WO summary - scrap + unaccountable qty
            GenerateWOSummaryScrap();

            console.log("btnScrap_ClickCase100.1", $scope.CompletedQty);
            //if ($scope.McType.toLowerCase() == "inhouse") {
            //    CheckWOOpnStatus();
            //    ReCheck($scope.selectedWOID);
            //    console.log("btnScrap_ClickCasel2", $scope.CompletedQty);
            //    //$("#saveCompleteModal-current").val($scope.CompletedQty);

            //} else {
            //    CheckSubconWOOpnStatus();
            //    ReCheck($scope.selectedWOID);
            //    console.log("btnScrap_ClickCase13", $scope.CompletedQty);
            //    // $("#saveCompleteModal-current").val($scope.CompletedQty);

            //}
        }


        //'*******************************************************************
        //'Title     :  cmdQCResume_Click
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdQCStop_Click = function () {
            console.log("cmdQCStop_Click");

            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdQCStop_Click.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdQCStop_Click.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdQCStop_Click.3");
                        cmdQCStop_ClickCase5();
                    } else {
                        console.log("cmdQCStop_Click.4");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });

            }
        }

            //'*******************************************************************
            //'Title     :  cmdQCStop_ClickCase5
            //'Function  :  
            //'Input     :  
            //'Output    :  
            //'Remark    :
            //'*******************************************************************
            function cmdQCStop_ClickCase5() {
                console.log("cmdQCStop_ClickCase5");
                if (config.strSkipWOTrackingPrompt) {
                    cmdQCStop_ClickCase10();
                } else {

                    var answer = confirm("Confirm to stop QC?");
                    //todo to implement, trackingdefault ok in model so that default button can change
                    //if (config.TrackingDefaultOK) {
                    //        setupStartCase5();
                    //} else {
                    //    if (answer) {
                    //        setupStartCase5();
                    //    }
                    //}

                    if (answer) {
                        cmdQCStop_ClickCase10();
                    }
                }

            }


            //'*******************************************************************
            //'Title     :  cmdQCStop_ClickCase5
            //'Function  :  
            //'Input     :  
            //'Output    :  
            //'Remark    :
            //'*******************************************************************
            function cmdQCStop_ClickCase10() {
                console.log("cmdQCStop_ClickCase10");
                var promiseArray1 = [];
                var promiseArray2 = [];
                var promiseArray3 = [];
                var currentdate = getCurrentDatetime();
                promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_1', {
                                'StopDateTime': currentdate,
                                'endType': 'QCEnd',
                                'WOID': $scope.selectedWOIDData['woid'],
                                'McID': $scope.McID,
                                'WorkCenter': $scope.WorkCenter,
                                'ProcOpSeq': $scope.ProcOpSeq

                            })
                         );
                //productionStopCase10_1
                //"UPDATE [TS_Operation] SET StopDateTime = @StopDateTime, "
                //        + "EndType = @EndType "
                //        + "where WOID = @WOID "
                //        + "and McID = @McID "
                //        + "and WorkCenter = @WorkCenter "
                //        + "and ProcOpSeq = @ProcOpSeq "
                //        + "and EndType is NULL "


                var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
                console.log("cmdQCStop_ClickCase10 time", ProdTotalDuration);

                if (ProdTotalDuration == "") {
                    ProdTotalDuration = "0:0:0";
                }


               ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);
             

                console.log("cmdQCStop_ClickCase10 time converted", ProdTotalDuration);
                $scope.WOExecutionStatus = "ProcessingStop";
                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/QCStopCase10_2', {
                    'WOStatus': $scope.WOExecutionStatus,//
                    'ProdEndDate': currentdate,
                    'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                    'McID': $scope.McID,//
                    'ProdTotalDuration': ProdTotalDuration,//
                    'Remark': String($('#select_qctrackingremark-input').val()).trim(),//
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'WorkCenter': $scope.WorkCenter//

                })
             );
                //QCStopCase10_2
                //"UPDATE [TS_WorkOrderExecution] SET WOStatus = @WOStatus, "
                //        + "ProdEndDate = @ProdEndDate, "
                //        + "OperatorID = @OperatorID, "
                //        + "OperatorName = @OperatorName, "
                //        + "McID = @McID, "
                //        + "Remark = @Remark, " //gh 2014Dec11
                //        + "ProdTotalDuration = @ProdTotalDuration "
                //        + "where WOID = @WOID "
                //        + "and WorkCenter = @WorkCenter "
                //        + "and ProcOpSeq = @ProcOpSeq "

                promiseArray3.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_3', {
                        'WOID': $scope.selectedWOIDData['woid'],//
                        'ProcOpSeq': $scope.ProcOpSeq,//
                        'ExStatus': 8,
                        'UpdatedDate': currentdate,
                        'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                        'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                        'reason': ''
                    })
            );

                //"INSERT INTO [TS_ExStatus] "
                //        + "( WOID, ProcOpSeq, ExStatus, UpdatedDate, OperatorID, OperatorName, Reason ) "
                //        + "VALUES ( @WOID, @ProcOpSeq, @ExStatus, @UpdatedDate, @OperatorID, @OperatorName, @Reason ) "
                $q.all(promiseArray1).then(function (response) {
                    console.log("cmdQCStop_Click productionStopCase10_1", response);
                    CalculateTimeSpan("Production");
                });
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdQCStop_Click QCStopCase10_2", response);
                });
                $q.all(promiseArray3).then(function (response) {
                    console.log("cmdQCStop_Click productionStopCase10_3", response);

                    CheckQCWOOpnStatus();
                    $scope.reload = true;
                    $scope.cmdUpdate_Click();
                
                });


            }
        
        //'*******************************************************************
        //'Title     :  cmdQCResume_Click
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdQCResume_Click = function () {
            console.log("cmdQCResume_Click");

            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdQCResume_Click.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdQCResume_Click.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdQCResume_Click.3");
                        cmdQCResume_ClickCase5();
                    } else {
                        console.log("cmdQCResume_Click.4");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });


            }


            //var promiseArray1 = fnValidateUserNameMCAssign();

            //$q.all(promiseArray1).then(function (response) {
            //    console.log("fnValidateUserNameMCAssign", response);
            //    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
            //        //  if(true){
            //        $("#qctracking-table3-operatorName").val(authService.currentUser.userName);
            //        $("#qctracking-table3-loginName").val(authService.currentUser.userName);
                    

            //    } else {
            //        alert("Operator is not assigned to operate this machine.");
            //        $("#qctracking-table3-operatorName").val("");
            //        $("#qctracking-table3-password").val("");


            //    }
            //});

        }


        //'*******************************************************************
        //'Title     :  cmdQCResume_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCResume_ClickCase5() {
            console.log("cmdQCResume_ClickCase5");
            console.log("setupResumeCase6");
            if (config.strSkipWOTrackingPrompt) {
                cmdQCResume_ClickCase10();
            } else {
                var answer = confirm("Confirm to resume QC?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    cmdQCResume_ClickCase10();
                }
            }
        }


        //'*******************************************************************
        //'Title     :  cmdQCResume_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCResume_ClickCase10() {
            console.log("cmdQCResume_ClickCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var currentdate = getCurrentDatetime();


           promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/cmdQCResume_ClickCase10', {
                        'StopDateTime': currentdate,
                        'endType': 'SetupContinue',
                        'WOID': $scope.selectedWOIDData['woid'],
                        'McID': $scope.McID,
                        'WorkCenter': $scope.WorkCenter,
                        'ProcOpSeq': $scope.ProcOpSeq,

                    })
                );
            


            $q.all(promiseArray1).then(function (response) {
                console.log("cmdQCResume_ClickCase10", response);

                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_2', {
                    'WOID': $scope.selectedWOIDData['woid'],
                    'WorkCenter': $scope.WorkCenter,
                    'RouteID': $scope.RouteID,
                    'OpSeq': $scope.OpSeq,
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'StartDateTime': currentdate,
                    'StartType': 'QCContinue',
                    'McID': $scope.McID,
                    'McType': $scope.McType,
                    'reason': 'QCContinue',
                    'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                    'OperatorName': String($("#qctracking-table3-operatorName").val()).trim()
                })
            );


                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdQCResume_ClickCase10 productionResumeCase10_2", response);


                    fnUpdateOperator(3);

                    promiseArray4.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_4', {
                            'WOID': $scope.selectedWOIDData['woid'],//
                            'ProcOpSeq': $scope.ProcOpSeq,//
                            'ExStatus': 7,
                            'UpdatedDate': currentdate,
                            'OperatorID': String($("#qtracking-table3-operatorName").val()).trim(),//
                            'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                            'reason': ''
                        })
                    );
                        $q.all(promiseArray4).then(function (response) {
                            console.log("cmdQCResume_ClickCase10 productionResumeCase10_4", response);
                            CheckQCWOOpnStatus();
                        });
                
                });
            });

        }
        //'*******************************************************************
        //'Title     :  cmdQCPause_Click
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdQCPause_Click = function () {
            console.log("cmdQCPause_Click");
            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdQCPause_Click case0.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdQCPause_Click case0.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdQCPause_Click case0.3");
                        cmdQCPause_ClickCase5();
                    } else {
                        console.log("cmdQCPause_Click case0.4");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });

            }
        }

        //'*******************************************************************
        //'Title     :  cmdQCPause_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCPause_ClickCase5() {
            console.log("cmdQCPause_ClickCase5");
            var reason = String($("#select_qctracking-pausereason-input").val()).trim();
            if (String(reason).trim() == "") {
                alert("Please select a reason");
            } else {
                cmdQCPause_ClickCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdQCPause_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCPause_ClickCase10() {
            console.log("cmdQCPause_ClickCase10");
            if (config.strSkipWOTrackingPrompt) {
                setupPauseCase20();
            } else {
                var answer = confirm("Confirm to pause QC?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    cmdQCPause_ClickCase20();
                }
            }
        }

        //'*******************************************************************
        //'Title     :  cmdQCPause_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCPause_ClickCase20() {
            console.log("cmdQCPause_ClickCase20");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            var currentdate = getCurrentDatetime();

                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/QCPauseCase20_1', {
                    'StopDateTime': currentdate,
                    'endType': 'QCPause',
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                    'McID':$scope.McID
                })
            );
            






            $q.all(promiseArray1).then(function (response) {
                console.log("cmdQCPause_ClickCase20 QCPauseCase20_1", response);

                //var reason = "SetupPause - " + String($('#select_wotracking-pausereason option:selected').text()).trim()
                var reason = "QCPause - " + String($("#select_qctracking-pausereason-input").val()).trim();
                promiseArray2.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_2', {
                       'WOID': $scope.selectedWOIDData['woid'],
                       'WorkCenter': $scope.WorkCenter,
                       'RouteID': $scope.RouteID,
                       'OpSeq': $scope.OpSeq,
                       'ProcOpSeq': $scope.ProcOpSeq,
                       'StartDateTime': currentdate,
                       'StopDateTime': '',
                       'endType': '',
                       'StartType': "QCPause",
                       'McID': $scope.McID,
                       'McType': $scope.McType,
                       'reason': reason,
                       'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                       'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                       'ShiftID': '0'
                   })
               );


                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdQCPause_ClickCase20 setupPauseCase20_2", response);
                    $q.all(promiseArray3).then(function (response) {
                        reason = "JobPause - " + String($("#select_qctracking-pausereason-input").val()).trim();
                        promiseArray3.push(
                         $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_3', {
                             'WOID': $scope.selectedWOIDData['woid'],
                             'ProcOpSeq': $scope.ProcOpSeq,
                             'ExStatus': 6,
                             'UpdatedDate': currentdate,
                             'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                             'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                             'reason': reason


                         })
                );
                        //console.log("setupPauseCase20_3", response);
                        CheckQCWOOpnStatus();

                        //reload();
                    });
                });
            });
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_Click
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdUpdate_Click = function () {
            console.log("cmdUpdate_Click")
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();

            var ReceivedQty = 0;
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim() != "") {
                ReceivedQty = parseInt(String(document.getElementById("WIP-td9_1").innerHTML).trim());
            }

            console.log("ReceivedQty", ReceivedQty);
            $("#qctracking-newReceived").val(ReceivedQty);
            $("#qctracking-currentReceived").val(ReceivedQty);

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                cmdUpdate_ClickCase1();
            }

        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase1
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase1() {
            console.log("cmdUpdate_ClickCase1");
            if ($("#inspection-row-2").css("display") == "block") {
                alert("Please start operation first.");
            } else {
                cmdUpdate_ClickCase2();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase2
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase2() {
            console.log("cmdUpdate_ClickCase2");
            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdQCStart_ClickCase15.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdUpdate_ClickCase2.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdUpdate_ClickCase2.3");
                        cmdUpdate_ClickCase5();
                    } else {
                        console.log("cmdUpdate_ClickCase2.4");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase5() {
            console.log("cmdUpdate_ClickCase5");
            if (config.WOGlobalDefaultCompletedQty) {
                console.log("cmdUpdate_ClickCase5.1");
                //if (config.DefaultReceiveQty) {
                if (config.skipReceiveQty) {

                    $scope.WOGlobalWOCompletedQty = $scope.CompletedQty + $scope.OutstandingQty;



                    console.log("cmdUpdate_ClickCase5.3");
                    $scope.strparaPreScrapQty = 0;
                    console.log("test2 strparaPreScrapQty cmdUpdate_ClickCase5", $scope.strparaPreScrapQty);
                    console.log("test2 ScrapScrapQty cmdUpdate_ClickCase5", $scope.ScrapScrapQty);
                    // GenerateWOSummary();
                    // GenerateWOSummaryScrap
                    $scope.WOGlobalWOReceivedQty = $scope.PreviousRecQty;
                    //3 - actual receive qty WIP-td3_1
                    //4 completed qty
                    //7 OutstandingQty
                    document.getElementById("WIP-td5_1").innerHTML = $scope.WOGlobalWOReceivedQty;
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + $scope.WOGlobalWOReceivedQty + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");
                    CalculateDuration();
                    cmdUpdate_ClickCase8();
                } else {
                    console.log("cmdUpdate_ClickCase5.4");
                    cmdUpdate_ClickCase6();
                }

                //} else {
                //    console.log("cmdUpdate_ClickCase5.5");
                //    cmdUpdate_ClickCase6();
                //}
            } else {
                console.log("cmdUpdate_ClickCase5.6");
                cmdUpdate_ClickCase6();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase6() {

            if (String(document.getElementById("WIP-td5_1").innerHTML).trim() != "" && ($scope.PreviousRecQty == undefined ||  $scope.PreviousRecQty == "")) {
                $scope.PreviousRecQty = parseInt(String(document.getElementById("WIP-td5_1").innerHTML).trim());
            }
            console.log("cmdUpdate_ClickCase6", $scope.PreviousRecQty);
            //$scope.ReceivedQty = $scope.PreviousRecQty;
            $("#qctracking-newReceived").val($scope.PreviousRecQty);
            console.log("scope", $scope.WOGlobalWOCompletedQty);
            console.log("scope", $scope);


            if ($("#saveCompleteModal-current").val() == "") {
                console.log("saveCompleteModal1", $scope.CompletedQty);
                $("#saveCompleteModal-current").val(parseInt(String(document.getElementById("WIP-td6_1").innerHTML).trim()));
            }

            $("#saveCompleteModal-new").val($scope.OutstandingQty);
           // $("#modalWOID1").val($scope.selectedWOIDData["woid"]);
            //$("#preprocess-woid").val($scope.selectedWOIDData["woid"]);
            // $("#preprocess-scrapQty").val("");
            $scope.PreScrapQty = "";
            $scope.newReceived = "";


            document.getElementById("saveCompleteModalWOID").innerHTML = $scope.selectedWOIDData['woid'];
            $('#saveCompleteModal').modal('show');


        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase8
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase8() {
            console.log("cmdUpdateReceived_ClickCase8");
            $scope.ActualRecQty = String(document.getElementById("WIP-td5_1").innerHTML).trim();
            if ($scope.ActualRecQty == "") {
                $scope.ActualRecQty = 0;
            }

            if ($scope.CompletedQty == "") {
                $scope.CompletedQty = 0;
            }

            if ($scope.ScrapQty == "") {
                $scope.ScrapQty = 0;
            }

            if ($scope.TotalActAdjustedQty == "") {
                $scope.TotalActAdjustedQty = 0;
            }
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim() == "") {
                $scope.OutstandingQty = 0;
            }

            console.log("cmdUpdate_ClickCase8 ActualRecQty", $scope.ActualRecQty);
            console.log("cmdUpdate_ClickCase8 ScrapQty", $scope.ScrapQty);

            console.log("cmdUpdate_ClickCase8 completed", $scope.CompletedQty);
            console.log("cmdUpdate_ClickCase8 ScrapScrapQty", $scope.ScrapScrapQty);

            // if ($scope.CompletedQty == $scope.ActualRecQty - $scope.ScrapQty) { //completed to check
            if ($scope.CompletedQty == $scope.ActualRecQty - $scope.ScrapScrapQty) { //completed
                console.log("cmdUpdate_ClickCase8.1");
                if ($scope.WOGlobalWOOpnState != 7) {
                    console.log("cmdUpdateReceived_ClickCase8.2");
                   
                        alert("Please stop QC before complete the work order.");
                    // cmdUpdate_ClickCase100();
                } else {
                    console.log("cmdUpdate_ClickCase8.3");
                    $scope.WOExecutionStatus = "Completed";
                    cmdUpdate_ClickCase10();
                }
                //console.log("cmdUpdateReceived_ClickCase8.1");
                //$scope.WOExecutionStatus = "Completed"; // update status only for completed job
                //cmdUpdate_ClickCase10();
                //            } else if ($scope.CompletedQty > $scope.ActualRecQty - $scope.ScrapQty) { //do more than completed
            } else if ($scope.CompletedQty > $scope.ActualRecQty) { //do more than completed
                console.log("cmdUpdate_ClickCase8.4");
                console.log("cmdUpdate_ClickCase8.4 ActualRecQty", $scope.ActualRecQty);
                console.log("cmdUpdate_ClickCase8.4 ScrapQty", $scope.ScrapQty);
                alert("Please enter the correct completed qty. Max qty is " + $scope.ActualRecQty - $scope.ScrapQty);
                cmdUpdate_ClickCase100();
            } else { // havent complete
                console.log("cmdUpdate_ClickCase8.5");
                cmdUpdate_ClickCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase95
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase100() {
            console.log("cmdUpdate_ClickCase100");
            //fetch WO summary
            GenerateWOSummary();
            //fetch WO summary - scrap + unaccountable qty
            GenerateWOSummaryScrap();

            console.log("cmdUpdate_ClickCase100.1", $scope.CompletedQty);
            //if ($scope.McType.toLowerCase() == "inhouse") {
            //    ReCheck($scope.selectedWOID);
            //    //CheckWOOpnStatus();
            //    console.log("saveCompleteModal2", $scope.CompletedQty);
            //    $("#saveCompleteModal-current").val($scope.CompletedQty);

            //} else {
            //    ReCheck($scope.selectedWOID);
            //    //CheckSubconWOOpnStatus();
            //    console.log("saveCompleteModal3", $scope.CompletedQty);
            //    $("#saveCompleteModal-current").val($scope.CompletedQty);

            //}


        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase10() {
            console.log("cmdUpdate_ClickCase10");
            var currentdate = getCurrentDatetime();
            var promiseArray1 = [];
            var promiseArray2 = [];

            var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
            if (ProdTotalDuration == "") {
                ProdTotalDuration = "0:0:0";
            }
            ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_1_1', {
                  'ActualRecQty': parseInt($scope.ActualRecQty),//
                  'ActualRecDate': currentdate,//
                  'CompletedQty': $scope.CompletedQty,//
                  'CompletedDate': currentdate,//
                  'OutstandingQty': $scope.ActualRecQty - $scope.CompletedQty - $scope.ScrapScrapQty,//
                  'OutstandingDate': currentdate,//
                  'WOStatus': $scope.WOExecutionStatus,//
                  'ProdTotalDuration': ProdTotalDuration,//
                  'WOID': $scope.selectedWOIDData['woid'],
                  'WorkCenter': $scope.WorkCenter,//
                  'ProcOpSeq': $scope.ProcOpSeq//
              })
          );



            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase10 cmdUpdate_ClickCase10_1_1", response);
                cmdUpdate_ClickCase15();
            });

        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase15() {
            console.log("cmdUpdate_ClickCase15");
            if ($scope.WOExecutionStatus == "Completed") {
                cmdUpdate_ClickCase20();
            } else {
                var promiseArray = [];
                promiseArray.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdate_ClickCase15', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );
                $q.all(promiseArray).then(function (response) {
                    console.log("cmdUpdate_ClickCase15", response);

                    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                        $scope.LastProcOpSeq = response[0].data.result[0]['LastProcOpSeq'];
                        if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                            cmdUpdate_ClickCase18();
                        } else {
                            cmdUpdate_ClickCase100();
                        }
                    } else {
                        alert("No route sequence found. ");
                    }
                    cmdUpdateReceived_ClickCase100();
                });

            }
        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_clickCase18
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_clickCase18() {
            console.log("cmdUpdate_clickCase18");
            var promiseArray = UpdateWorkOrderQty();

            $q.all(promiseArray).then(function (response) {
                console.log("UpdateWorkOrderQty", response);
                fnAddFGInventory();
                cmdUpdateReceived_ClickCase100();
            });
        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase20() {
            console.log("cmdUpdate_ClickCase20");
            var promiseArray1 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'ProcOpSeq': $scope.ProcOpSeq,//
                  'ExStatus': 9,
                  'UpdatedDate': currentdate,
                  'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'reason': ''
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase10_2.2", response);
                if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                    cmdUpdate_ClickCase50();
                } else {
                    cmdUpdate_ClickCase30();
                }
            });
        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase30() {
            console.log("cmdUpdate_ClickCase30");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase30', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase30 cmdUpdateReceived_ClickCase30", response);
                console.log("cmdUpdate_ClickCase30 length", response.length);
                console.log("cmdUpdate_ClickCase30 length1", response[0].data.result.length);
                if (response.length != 0 && response[0].data.result.length != 0) {

                    $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];
                    console.log("cmdUpdate_ClickCase30.1");
                    console.log("cmdUpdate_ClickCase30.1 procopseq", $scope.ProcOpSeq);
                    console.log("cmdUpdate_ClickCase30.1 LastProcOpSeq", $scope.LastProcOpSeq);
                    if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                        console.log("cmdUpdate_ClickCase30.2");
                        $scope.WOStatus = "Completed";
                        var promiseArray = UpdateWorkOrderQty();

                        $q.all(promiseArray).then(function (response) {
                            console.log("UpdateWorkOrderQty.1", response);
                            cmdUpdate_ClickCase80();
                        });
                    } else {
                        console.log("cmdUpdate_ClickCase30.3");
                        if ($scope.WOExecutionStatus == "Completed") {
                            console.log("cmdUpdate_ClickCase30.4");
                            if ($scope.CompletedQty > 0) {
                                console.log("cmdUpdate_ClickCase30.5");
                                RefreshData();

                            } else {
                                console.log("cmdUpdate_ClickCase30.6");
                                $scope.WOStatus = "Completed";
                                var promiseArray = UpdateWorkOrderQty();

                                $q.all(promiseArray).then(function (response) {
                                    console.log("UpdateWorkOrderQty.1", response);
                                    cmdUpdate_ClickCase80();
                                });

                            }
                        } else {
                            console.log("cmdUpdate_ClickCase30.7");
                            cmdUpdate_ClickCase100();
                        }
                    }


                } else {
                    alert("No route sequence found. ");
                    $scope.WOStatus = "Completed";

                    var promiseArray = UpdateWorkOrderQty();

                    $q.all(promiseArray).then(function (response) {
                        console.log("UpdateWorkOrderQty.1", response);
                        cmdUpdateReceived_ClickCase80();
                    });

                }


            });
        }


        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase50
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase50() {
            console.log("cmdUpdate_ClickCase50");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase30', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase50 cmdUpdateReceived_ClickCase30", response);
                if (response.length != 0 && response[0].data.result.length != 0) {

                    $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];

                    //console.log("cmdUpdateReceived_ClickCase30.1");
                    //console.log("cmdUpdateReceived_ClickCase30.1 procopseq", $scope.ProcOpSeq);
                    //console.log("cmdUpdateReceived_ClickCase30.1 LastProcOpSeq", $scope.LastProcOpSeq);

                    if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                        $scope.WOStatus = "Completed";
                        var promiseArray = UpdateWorkOrderQty();

                        $q.all(promiseArray).then(function (response) {
                            console.log("UpdateWorkOrderQty.1", response);
                            cmdUpdate_ClickCase80();
                        });
                    } else {
                        if ($scope.WOExecutionStatus == "Completed") {
                            if ($scope.CompletedQty > 0) {
                                RefreshData();
                            } else {
                                $scope.WOStatus = "Completed";
                                var promiseArray = UpdateWorkOrderQty();

                                $q.all(promiseArray).then(function (response) {
                                    console.log("UpdateWorkOrderQty.1", response);
                                    cmdUpdate_ClickCase80();
                                });

                            }
                        } else {
                            cmdUpdate_ClickCase100();
                        }
                    }


                } else {
                    alert("No route sequence found. ");
                    $scope.WOStatus = "Completed";

                    var promiseArray = UpdateWorkOrderQty();

                    $q.all(promiseArray).then(function (response) {
                        console.log("UpdateWorkOrderQty.1", response);
                        cmdUpdate_ClickCase80();
                    });

                }


            });
        }
        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase80
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase80() {
            console.log("cmdUpdate_ClickCase80");
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_1', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'EndDate': getCurrentDatetime()
              })
          );
            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'WOStatus': $scope.WOStatus
              })
          );
            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase80_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdUpdateReceived_ClickCase80_2", response);
                    cmdUpdate_ClickCase90();
                });
            });


        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase90
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase90() {
            console.log("cmdUpdate_ClickCase90");
            if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                cmdUpdate_ClickCase92();
            } else {
                cmdUpdate_ClickCase95();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase92
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase92() {
            console.log("cmdUpdate_ClickCase92");



            //this is a dummy post to control folw
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": $scope.selectedWOID['woid']
            })
            );

            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": $scope.selectedWOID['woid']
            })
            );


            $q.all(promiseArray1).then(function (response) {
                CheckAnyChildNotCompleted1();
                $q.all(promiseArray2).then(function (response) {
                    console.log("GenerateWOSummary1", response);



                    for (var i = 0; i < $scope.RecursiveWOID.length; i++) {
                        if (String($scope.RecursiveWOID[i]['woid']).toLowerCase().trim() == $scope.selectedWOID['woid']) {
                            if (String($scope.RecursiveWOID[i]['woStatus']).toLowerCase().trim() == "completed" || $scope.RecursiveWOID[i]['newwoStatus'] == 'Completed') { // if previously not completed but now need to update
                                WOStatus = "Completed";
                                cmdUpdate_ClickCase95();

                            }
                        }
                    }

                });
            });
        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_ClickCase95
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase95() {
            console.log("cmdUpdate_ClickCase95");

            console.log("cmdUpdateReceived_ClickCase95");

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );


            promiseArray3.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_3', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );



            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_1", response);

                $q.all(promiseArray3).then(function (response) {
                    console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_3", response);
                    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                        $scope.PPID = response[0].data.result[0]['ppid'];
                        $scope.SalesOrderID = response[0].data.result[0]['salesOrderID'];
                        $scope.ReleasedDate = response[0].data.result[0]['releasedDate'];
                    }

                    promiseArray2.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                            'id': $scope.PPID,
                            'Status': $scope.WOStatus

                        })
                    );

                    $q.all(promiseArray2).then(function (response) {
                        console.log("cmdUpdate_ClickCase95 cmdUpdateReceived_ClickCase95_2", response);
                        //location.reload();
                    });

                });



            });
        }


        //'*******************************************************************
        //'Title     :    SaveCompleteOK
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.SaveCompleteOK = function () {
            console.log("SaveCompleteOK");
            if (config.paraSkipWOTrackingPrompt) {
                SaveCompleteOKCase5();
            } else {
                var answer = confirm("Confirm to save received qty?");
                if (answer) {
                    var newReceived = parseInt(String($("#saveCompleteModal-new").val()).trim());
                    SaveCompleteOKCase5(newReceived);
                }
            }
        }

        //'*******************************************************************
        //'Title     :    SaveCompleteOKCase5
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        function SaveCompleteOKCase5(newReceived) {
            console.log("SaveCompleteOKCase5");
            //todo: line 111 check isNumeric
            console.log("SaveCompleteOKCase5.1", newReceived);
            console.log("SaveCompleteOKCase5.2", isNaN(newReceived));
            if (String(newReceived).trim() != "" && !isNaN(newReceived)) {
                SaveCompleteOKCase10(newReceived);
            } else {
                alert("Please enter the correct completed qty.");
            }
        }

        //'*******************************************************************
        //'Title     :    SaveCompleteOKCase10
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        function SaveCompleteOKCase10(newReceived) {
            console.log("SaveCompleteOKCase10");
            console.log("SaveCompleteOKCase10 newReceived", newReceived);
            console.log("SaveCompleteOKCase10 $scope.OutstandingQty", $scope.OutstandingQty);
            if (newReceived <= $scope.OutstandingQty) {

                console.log("SaveCompleteOKCase10 newReceived", newReceived);
                //  console.log("SaveCompleteOKCase10 CompletedQty", $scope.CompletedQty);
                // $scope.CompletedQty = $scope.CompletedQty + parseInt(newReceived);
                $scope.CompletedQty = parseInt(newReceived);
                console.log("SaveCompleteOKCase10 CompletedQty", $scope.CompletedQty);
                //$scope.CompletedQty = $scope.WOGlobalWOCompletedQty;
                $('#saveCompleteModal').modal('toggle');
                cmdUpdate_ClickCase8();
            } else {
                alert("Please enter the correct received qty. Max qty is " + $scope.OutstandingQty);
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_Click
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdQCStart_Click = function () {
            console.log("cmdQCStart_Click");
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();  

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                console.log("setupStartCase1", String($("#WIP-td5_1").text()).trim());
                if (String($("#WIP-td5_1").text()).trim() != "") {
                    if (config.strSkipWOTrackingPrompt) {
                        cmdQCStart_ClickCase5();
                    } else {
                        var answer = confirm("Confirm to start QC?");
                        if (answer) {
                            cmdQCStart_ClickCase5();
                        }
                    }
                } else {
                    alert("Please update received qty!");
                }
            }
        }

        //'*******************************************************************
        //'Title     :  cmdQCStart_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCStart_ClickCase5() {
            console.log("cmdQCStart_ClickCase5");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                //todo: line 3867 - 3897
                if (config.AssemblyCheckAtLastOnly) {
                    var promiseArray1 = [];
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10', {
                        'WOID': $scope.selectedWOID
                    })
                 );
                    //setupStartCase10
                    //Select Max(ProcOpSeq) as LastProcOpSeq 
                    //From TS_WorkOrderRoute 
                    //where WOID =@woid

                    $q.all(promiseArray1).then(function (response) {
                        console.log("cmdQCStart_ClickCase5 setupStartCase10 response", response);
                        if (response.length != 0) {
                            if (response[0].data.success) {
                                $scope.LastProcOpSeq = response[0].data.result[0]["lastProcOpSeq"];

                                if ($scope.ProcOpseq >= $scope.LastProcOpSeq) {
                                    cmdQCStart_ClickCase12();
                                }
                            } else {
                                cmdQCStart_ClickCase15();
                            }
                        } else {
                            cmdQCStart_ClickCase15();
                        }
                    });
                }
            } else {
                cmdQCStart_ClickCase15();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdQCStart_ClickCase12
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCStart_ClickCase12() {
            console.log("cmdQCStart_ClickCase12");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                //todo line3946-3970
                console.log("setupStartCase12 subassembly", $scope.subAssembly);
                for (var i = 0; i < $scope.subAssembly.length; i++) {
                    if (String($scope.subAssembly[i]['woStatus']).tirm().toLowerCase() != "completed") {
                        alert("Unable to proceed due to dependent Work Order is not completed.");
                        cmdQCStart_ClickCase50();
                    }
                }
                cmdQCStart_ClickCase15();
            } else {
                cmdQCStart_ClickCase15();
            }

        }

        //'*******************************************************************
        //'Title     :  cmdQCStart_ClickCase15
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCStart_ClickCase15() {
            console.log("cmdQCStart_ClickCase15");
            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdQCStart_ClickCase15.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdQCStart_ClickCase15.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdQCStart_ClickCase15.3");
                        cmdQCStart_ClickCase20();
                    } else {
                        console.log("cmdQCStart_ClickCase15.4");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });


            }
        }


        //'*******************************************************************
        //'Title     :  cmdQCStart_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCStart_ClickCase20() {
            console.log("cmdQCStart_ClickCase20");
            if ($scope.equipmentList.length == 0) {
                alert("Please select a QC equipment");
            } else {
                cmdQCStart_ClickCase40();
            }

        }


        //'*******************************************************************
        //'Title     :  cmdQCStart_ClickCase40
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function cmdQCStart_ClickCase40() {
            console.log("cmdQCStart_ClickCase40");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];

            var currentdate = getCurrentDatetime();
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'WorkCenter': $scope.WorkCenter,
                'RouteID': $scope.RouteID,
                'OpSeq': $scope.OpSeq,
                'ProcOpSeq': $scope.ProcOpSeq,
                'StartDateTime': currentdate,
                'StartType': "QCStart",
                'McID': $scope.McID,
                'McType': $scope.McType,
                'reason': "QCStart",
                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                'ShiftID': 0
            })
         );

           // var TotalSetupDuration = 0;
            var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
            if (ProdTotalDuration == "") {
                ProdTotalDuration = "0:0:0";
            }
            ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);
            $scope.WOExecutionStatus = "ProcessingStart";
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_2_1', {
                   'WOStatus': $scope.WOExecutionStatus,//
                   'SetupStartDate': currentdate,
                   'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                   'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                   'ShiftID': 0,//
                   'McID': $scope.McID,//
                   'ProdTotalDuration': ProdTotalDuration,//
                   'Remark': String($('#select_qctrackingremark-input').val()).trim(),//
                   'WOID': $scope.selectedWOIDData['woid'],//
                   'ProcOpSeq': $scope.ProcOpSeq,//
                   'WorkCenter': $scope.WorkCenter//

               })
            );

            if ($scope.ProcOpSeq == 1) {
                $scope.WOStatus = "Processing";
                promiseArray3.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_3', {
                       'WOStatus': $scope.WOStatus,
                       'StartDate': currentdate,
                       'WOID': $scope.selectedWOIDData['woid']
                   })
                );
            } else {
                $scope.WOStatus = "Processing";
                promiseArray3.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_4', {
                       'WOStatus': $scope.WOStatus,
                       'WOID': $scope.selectedWOIDData['woid']
                   })
                );
            }

            promiseArray4.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_5', {
                       'ID': $scope.PPID,
                       'Status': $scope.WOStatus
                   })
                );

            promiseArray5.push(
           $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_6', {
               'WOID': $scope.selectedWOIDData['woid'],//
               'ProcOpSeq': $scope.ProcOpSeq,//
               'ExStatus': 1,
               'UpdatedDate': currentdate,
               'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
               'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
               'reason': ''
           })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("cmdQCStart_ClickCase40_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdQCStart_ClickCase40_2", response);
                    $q.all(promiseArray3).then(function (response) {
                        console.log("cmdQCStart_ClickCase40_3/4", response);
                        $q.all(promiseArray4).then(function (response) {
                            console.log("cmdQCStart_ClickCase40_5", response);
                            $q.all(promiseArray5).then(function (response) {
                                console.log("cmdQCStart_ClickCase40_6", response);
                                reload();
                            });
                        });
                    });
                });
            });

        }

        //'*******************************************************************
        //'Title     :  reload
        //'Function  :  to reload page after action is completed, behaved the same as woselected
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function reload() {
            console.log("reload");
            GenerateWOSummary();
            case0();
        }
        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_Click
        //'Function  :  update received qty
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdUpdateReceived_Click = function () {
            var ReceivedQty = 0;
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim() != "") {
                ReceivedQty = parseInt(String(document.getElementById("WIP-td9_1").innerHTML).trim());
            }
            //else {
            //    ReceivedQty = parseInt((document.getElementById('WIP-td2_1').innerHTML).trim()) - parseInt((document.getElementById('WIP-td7_1').innerHTML).trim())
            //}


            console.log("ReceivedQty", ReceivedQty);
            $("#qctracking-newReceived").val(ReceivedQty);
            $("#qctracking-currentReceived").val(ReceivedQty);

            var operatorName = String($("#qctracking-table3-operatorName").val()).trim();
            var password = String($("#qctracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdUpdateReceived_ClickCase1.5");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdUpdateReceived_ClickCase1.6");
                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdUpdateReceived_ClickCase1.7");
                        cmdUpdateReceived_ClickCase5();
                    } else {
                        console.log("cmdUpdateReceived_ClickCase1.8");
                        $("#qctracking-table3-operatorName").val("");
                        $("#qctracking-table3-password").val("");
                    }
                });
            }
        }

        //'*******************************************************************
        //'Title     :  cmdAdd_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : add equipment
        //'*******************************************************************
        $scope.cmdAdd_Click = function () {
            var equipmentSelected = String($('#select_qctracking-equipment option:selected').text()).trim();
            if (equipmentSelected != "") {

                var isEquipmentAlreadyAdded = false;
                for (var i = 0; i < $scope.equipmentList.length; i++) {
                    if (String($scope.equipmentList[i]['mcID']).trim() == equipmentSelected) {
                        isEquipmentAlreadyAdded = true;
                    }
                }
                if (isEquipmentAlreadyAdded) {
                    alert("Equipment already added. ");
                } else {
                    var promiseArray1 = [];
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/cmdAdd_Click', {
                        'WOID': $scope.selectedWOIDData['woid'],
                        'WorkCenter': $scope.WorkCenter,
                        'RouteID': $scope.RouteID,
                        'OpSeq': $scope.OpSeq,
                        'ProcOpSeq': $scope.ProcOpSeq,
                        'McID':equipmentSelected

                    })
                 );
                    //cmdAdd_Click
                    //"INSERT INTO [TS_QC_Equipment] ( WOID, WorkCenter, RouteID, OpSeq, ProcOpSeq, McID ) "
                    //    + "VALUES ( @WOID, @WorkCenter, @RouteID, @OpSeq, @ProcOpSeq, @McID ) ";
                    $q.all(promiseArray1).then(function (response) {
                        console.log("cmdAdd_Click", response);
                        GenerateSeletedQCEquipmentList();
                    });
                }
            } else {
                alert("Please select a QC Equipment. ");
            }
        }

        $scope.cmdDelete_Click = function () {


            if (String($("#select_qctracking-woid-input").val()).trim() == "") {
                alert("Please enter Work Order");
            } else {
                var grid = $('#equipment-table').data('kendoGrid');
                var items = grid.dataSource.view();
                var item1 = grid.select();

                console.log("cmdDelete_Click selecteditem", item1);
                console.log("cmdDelete_Click selecteditem children", $(item1).children());

                if (item1.length != 0) {
                    var children = $(item1).children();
                    if (children.length == 2) {
                        var equipmentSelected = String(children[1].innerHTML).trim();
                        console.log("cmdDelete_Click selected item is ", equipmentSelected);



                        var promiseArray1 = [];
                        promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/cmdDelete_Click', {
                            'WOID': $scope.selectedWOIDData['woid'],
                            'WorkCenter': $scope.WorkCenter,
                            'RouteID': $scope.RouteID,
                            'OpSeq': $scope.OpSeq,
                            'ProcOpSeq': $scope.ProcOpSeq,
                            'McID': equipmentSelected

                        })
                     );

                        $q.all(promiseArray1).then(function (response) {
                            console.log("cmdDelete_Click", response);
                            GenerateSeletedQCEquipmentList();
                        });

                        //"DELETE FROM [TS_QC_Equipment] "
                        //                    + "where WOID = @WOID "
                        //                    + "and WorkCenter = @WorkCenter "
                        //                    + "and RouteID = @RouteID "
                        //                    + "and OpSeq = @OpSeq "
                        //                    + "and ProcOpSeq = @ProcOpSeq "
                        //                    + "and McID = @McID "
                    }
                } else {
                    alert("Please select  a Equipment to delete. ");
                }
            }

        }




        //'*******************************************************************
        //'Title     :  CheckQCWOOpnStatusAssign
        //'Function  :  check for status to toggle buttons
        //'Input     :  
        //'Output    : 
        //'Remark    : xl 2018-01-03, splitted from original function CheckQCWOOpnStatus line 2500 onwards due to different design of angularjs
        //'*******************************************************************
        function CheckQCWOOpnStatusAssign() {
            console.log("WOGlobalWOOpnState", $scope.WOGlobalWOOpnState);
            var promiseArray1 = fnGetUserAccessRight(authService.currentUser.userName, "TS_QC");
            $q.all(promiseArray1).then(function (response) {
                console.log("fnGetUserAccessRight", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['column1'] > 0) {
                            if ($scope.WOGlobalWOOpnState == 1) { //Setup not start
                                $("#inspection-row-2").show();
                                $("#inspection-row-3").hide();
                                $("#inspection-row-4").hide();
                                $("#inspection-row-5").hide();

                                $("#select_qctracking-pausereason-input").val("");
                                //$("#select_qctracking-pausereason").val("");
                                $("#select_qctracking-pausereason-input").prop("disabled", true);
                                $("#select_qctracking-pausereason").prop("disabled", true);

                                $("#qc-tracking-updatereceive").show();
                                $("#qc-tracking-update").hide();
                            } else if ($scope.WOGlobalWOOpnState == 5) {//Job run or continue
                                $("#inspection-row-2").hide();
                                $("#inspection-row-3").show();
                                $("#inspection-row-4").hide();
                                $("#inspection-row-5").show();


                                $("#select_qctracking-pausereason-input").prop("disabled", false);
                                $("#select_qctracking-pausereason").prop("disabled", false);
                                //$("#select_qctracking-pausereason-input").val("");
                                $("#select_qctracking-pausereason").val("");
                                $("#select_qctracking-pausereason-input").val("");
                                $("#qc-tracking-updatereceive").hide();
                                $("#qc-tracking-update").show();
                            } else if ($scope.WOGlobalWOOpnState == 6) { //Job pause
                                $("#inspection-row-2").hide();
                                $("#inspection-row-3").hide();
                                $("#inspection-row-4").show();
                                $("#inspection-row-5").show();


                                $("#select_qctracking-pausereason-input").prop("disabled", false);
                                $("#select_qctracking-pausereason").prop("disabled", false);
                                $("#select_qctracking-pausereason-input").val($scope.WOGlobalWOPauseReason);
                               // $("#select_qctracking-pausereason").val($scope.WOGlobalWOPauseReason);

                                $("#qc-tracking-updatereceive").hide();
                                $("#qc-tracking-update").show();
                            } else if ($scope.WOGlobalWOOpnState == 7) { //Job end
                                $("#inspection-row-2").hide();
                                $("#inspection-row-3").hide();
                                $("#inspection-row-4").hide();
                                $("#inspection-row-5").hide();


                                $("#select_qctracking-pausereason-input").prop("disabled", false);
                                $("#select_qctracking-pausereason").prop("disabled", false);
                                $("#select_qctracking-pausereason-input").val("Job End");
                               // $("#select_qctracking-pausereason").val("Job End");

                                $("#qc-tracking-updatereceive").hide();
                                $("#qc-tracking-update").show();
                            }


                            console.log("QtyUpdated", $scope.QtyUpdated);
                            if ($scope.QtyUpdated < 2) {


                                //to check, this statement is not in wotracking, might assigned in some other places
                                //if (String(document.getElementById("WIP-td5_1").innerHTML).trim() != "") {
                                //    $scope.PreviousRecQty = parseInt(String(document.getElementById("WIP-td5_1").innerHTML).trim());
                                //}
                                $scope.PreviousRecQty = document.getElementById("WIP-td5_1").innerHTML;
                                document.getElementById("WIP-td5_1").innerHTML = "";
                                document.getElementById("WIP-td5_2").innerHTML = "";
                                $("#qc-tracking-updatereceive").show();
                                $("#qc-tracking-update").hide();
                            } else {//Multiple Operator
                                $("#qc-tracking-updatereceive").hide();
                                $("#qc-tracking-update").show();
                            }

                            //check for chid WO
                            if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                                $("#qc-tracking-splitdetail").show();
                            } else {
                                $("#qc-tracking-splitdetail").hide();
                            }
                        }

                    }

                }

            });

           CalculateTimeSpan("QC");
           GlobalCalculateTimeSpan("QC");
           GenerateQueuingWOList($scope.McID);
        }



        //'****************************************************************************************************
        //'Title     :  CalculateTimeSpan
        //'Function  :  calculate total timespan  
        //'Input     :  
        //'Output    :  total timespan
        //'Remark    :  
        //'**************************************************************************************************
        function CalculateTimeSpan(OperationType) {
            console.log("CalculateTimeSpan OperationType", OperationType);
            var WOID = $scope.selectedWOIDData['woid'];
            var ProcOpSeq = $scope.ProcOpSeq;
            var WorkCenter = $scope.WorkCenter;

            var promiseArray1 = []; var promiseArray2 = []; var promiseArray3 = [];
            if (OperationType == "QC") {
                console.log("CalculateTimeSpan setup");

                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan1', {
                        'WOID': WOID,
                        'ProcOpSeq': ProcOpSeq,
                        'WorkCenter': WorkCenter,
                        'StartType1': 'QCStart',
                        'StartType2': 'QCContinue'

                    })
                );


                $q.all(promiseArray1).then(function (response1) {
                    console.log("CalculateTimeSpan QC1", response1);
                    console.log("CalculateTimeSpan1", response1);
                    if (response1.length != 0 && response1[0].data.success && response1[0].data.result.length != 0) {
                        //  if (response1[0].data.success) {
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                'WOID': WOID,
                                'ProcOpSeq': ProcOpSeq,
                                'WorkCenter': WorkCenter,
                                'StartType1': 'QCStart',
                                'StartType2': 'QCContinue'

                            })
                         );

                        $q.all(promiseArray2).then(function (response) {
                            console.log("CalculateTimeSpan QC2", response);
                            console.log("CalculateTimeSpan2", response);
                            var SumDuration = 0;
                            if (response.length != 0  && response[0].data.success  && response[0].data.result.length != 0) {
                                    for (var i = 0; i < response[0].data.result.length; i++) {
                                        if (response[0].data.result[i]['totalDuration'] != "" || response[0].data.result[i]['totalDuration'] != null) {
                                            SumDuration = SumDuration + response[0].data.result[i]['totalDuration'];
                                        }
                                    }
                                    console.log("CalculateTimeSpan setup2 time half", SumDuration)
                                    if (response1[0].data.result[0]['totalDuration'] != "" &&
                                        response1[0].data.result[0]['totalDuration'] != null) {
                                        SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                    }
                                    console.log("CalculateTimeSpan setup2 time full", SumDuration)
                                    SumDuration = SumDuration * 60;
                                    var time = secondsToHms(SumDuration);
                                    console.log("time1",time);
                                    $("#qctracking-table3-qctotalduration").val(time);
                            } else {
                                SumDuration = 0;
                                console.log("CalculateTimeSpan setup2 time half", SumDuration)
                                if (response1[0].data.result[0]['totalDuration'] != "" &&
                                    response1[0].data.result[0]['totalDuration'] != null) {
                                    SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                }
                                console.log("CalculateTimeSpan setup2 time full", SumDuration)
                                SumDuration = SumDuration * 60;
                                var time = secondsToHms(SumDuration);
                                console.log("time1", time);
                                $("#qctracking-table3-qctotalduration").val(time);
                            }




                        });
                    } else { //there is no record with start & no stop
                        promiseArray3.push(
                       $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan3_1', {
                           'WOID': WOID,
                           'ProcOpSeq': ProcOpSeq,
                           'WorkCenter': WorkCenter

                       })
                    );

                        $q.all(promiseArray3).then(function (response) {
                            console.log("CalculateTimeSpan3_1", response);
                            var SumDuration;
                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    if (response[0].data.result.length != 0) {


                                        if (response[0].data.result[0]['totalDuration'] == "" ||
                                            response[0].data.result[0]['totalDuration'] == null) {
                                            SumDuration = 0;
                                        } else {
                                            SumDuration = response[0].data.result[0]['totalDuration'];
                                        }
                                    }
                                    //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                    SumDuration = SumDuration * 60;

                                    //to check: to test the function, convert second to data time format
                                    //var time = (new Date).clearTime()
                                    //.addSeconds(SumDuration)
                                    //.toString('HH:mm:ss');
                                    var time = secondsToHms(SumDuration);
                                    //todo:display this.txtSetupDurationHr.Text
                                    console.log("time1", time);
                                    $("#qctracking-table3-qctotalduration").val(time);
                                  //  updataSetupDurationTable()
                                }
                            } else {
                                SumDuration = 0;
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                SumDuration = SumDuration * 60;

                                //to check: to test the function, convert second to data time format
                                //var time = (new Date).clearTime()
                                //.addSeconds(SumDuration)
                                //.toString('HH:mm:ss');
                                var time = secondsToHms(SumDuration);
                                //todo:display this.txtSetupDurationHr.Text
                                console.log("time1", time);
                                $("#qctracking-table3-qctotalduration").val(time);
                            }
                        });
                    }
                });
                // });

            }

            var ProdTotalDuration = String($('#qctracking-table3-qctotalduration').val()).trim();
            if(ProdTotalDuration == ""){
                ProdTotalDuration = "0:0:0";
            }
            ProdTotalDuration = convertDatetimeToSecond(ProdTotalDuration);
            var promiseArray4 = [];
            promiseArray4.push(
                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan7_1', {
                   // 'TotalSetupDuration': TotalSetupDuration,
                    'ProdTotalDuration': ProdTotalDuration,
                    'WOID': WOID,
                    'WorkCenter': WorkCenter,
                    'ProcOpSeq': ProcOpSeq



                })
            );




            $q.all(promiseArray4).then(function (response) {
                console.log("CalculateTimeSpan7", response);

            });
        }


        //'****************************************************************************************************
        //'Title     :  GlobalCalculateTimeSpan
        //'Function  :  calculate total timespan  
        //'Input     :  
        //'Output    :  total timespan
        //'Remark    :  
        //'**************************************************************************************************
        function GlobalCalculateTimeSpan(OperationType) {

        }

        //'*******************************************************************
        //'Title     :  GenerateQueuingWOList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    : //gh 2014Dec03
        //'*******************************************************************
        function GenerateQueuingWOList(McID) {
            console.log("GenerateQueuingWOList", McID);
            var promiseArray1 = [];
            console.log("config", config);
            if (config.IncludePreviousSeqNonCompleted) {
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/GenerateQueuingWOList1', {
                        'McID': String(McID).trim()

                    })
                );




                $q.all(promiseArray1).then(function (response1) {
                    console.log("GenerateQueuingWOList1", response1);
                    if (response1.length != 0) {
                        if (response1[0].data.success) {

                            makeTable1(response1[0].data.result);
                        }
                    }
                });

            } else {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateQueuingWOList2', {
                    'McID': String(McID).trim()

                })
            );




                $q.all(promiseArray1).then(function (response1) {
                    console.log("GenerateQueuingWOList2", response1);
                    if (response1.length != 0) {
                        if (response1[0].data.success) {
                            makeTable1(response1[0].data.result);
                        }
                    }
                });
            }




        }

        //'*******************************************************************
        //'Title     :  GenerateMcIDList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateQCEquipmentList() {

            var promiseArray1 = [];
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateQCEquipmentList', {
                    'WorkCenter': $scope.WorkCenter
                }
            )
            );
            // GenerateQCEquipmentList
            // Select Distinct mc_code From ctr_mc "
            //    + "where ctr_code = " + "'" + WorkCenter + "' "
            //    + "Order by mc_code ASC ";//GenerateQCEquipmentList 

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateQCEquipmentList", response);

                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    createSelect(response[0].data.result, "qctracking-equipment");
                }

            });
        }
        //'*******************************************************************
        //'Title     :  GenerateSeletedQCEquipmentList
        //'Function  :  generate selected QC Equipment list 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateSeletedQCEquipmentList() {
            var promiseArray1 = [];
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateSeletedQCEquipmentList', {
                    "WOID": $scope.selectedWOIDData['woid'],
                    "ProcOpSeq": $scope.ProcOpSeq,
                    'OpSeq': $scope.OpSeq,
                    'RouteID': $scope.RouteID,
                    'WorkCenter':$scope.WorkCenter
                }
            )
            );
            //GenerateSeletedQCEquipmentList
            //"Select McID "
            //                + "from TS_QC_Equipment "
            //                + "where WOID ='" + selectedWO + "' "
            //                + "and  WorkCenter ='" + WorkCenter + "' "
            //                + "and RouteID = " + int.Parse(RouteID)
            //                + "and OpSeq = " + int.Parse(OpSeq)
            //                + "and ProcOpSeq = " + int.Parse(ProcOpSeq)
            //                + " Order by McID Asc"

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateSeletedQCEquipmentList", response);

                if (response.length != 0  && response[0].data.success ) {
                    //makeequipment table
                    $scope.equipmentList = response[0].data.result;
                    makeTableEquipment(response[0].data.result);
                }

            });
        }

        //'*******************************************************************
        //'Title     :  GenerateWOSummaryScrap
        //'Function  :  generate WO Summary - scrap + unaccountable qty
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOSummaryScrap() {
            var promiseArray1 = [];
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummaryScrap', {
                    "WOID": $scope.selectedWOIDData['woid'],
                    "ProcOpSeq": $scope.ProcOpSeq
                }
            )
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOSummaryScrap", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    console.log("GenerateWOSummaryScrap loop1");
                    if (response[0].data.result[0]['sumScrapQty'] != null &&
                        response[0].data.result[0]['sumScrapQty'] != 0 &&
                        response[0].data.result[0]['sumScrapQty'] != ""
                        ) {
                        console.log("GenerateWOSummaryScrap loop2");
                        $("#WIP-tr-3").css("display", "block");
                        document.getElementById("WIP-td3_1").innerHTML = response[0].data.result[0]['sumScrapQty'];
                        document.getElementById("WIP-td3_2").innerHTML = response[0].data.result[0]['latestScrapDate'];
                    } else {
                        console.log("GenerateWOSummaryScrap loop3");
                        $("#WIP-tr-3").css("display", "none");
                    }

                }
            });
        }


        //'*******************************************************************
        //'Title     :  GenerateSubAssemblyWOList
        //'Function  :  generate sub assembly WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    : //XL 2017Nov22
        //'*******************************************************************
        function GenerateSubAssemblyWOList() {
            console.log("GenerateSubAssemblyWOList");
            var promiseArray1 = [];
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateSubAssemblyWOList', {
                    "WOID": $scope.selectedWOIDData['woid'],
                }
            )
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateSubAssemblyWOList", response);
                if (response.length != 0 && response[0].data.success) {
                    $scope.subAssembly = response[0].data.result;
                    makeTableSubAssembly(response[0].data.result);

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
        function GlobalGenerateWOMaterial() {
            var selectedWO = $scope.selectedWOIDData['woid'];
            var promiseArray1 = [];

            if (selectedWO.indexOf("-") != -1) {
                selectedWO = selectedWO.substring(0, selectedWO.indexOf("-"));
            }
            console.log(selectedWO);

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWOMaterial', {
                "WOID": selectedWO
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
        //'Title     :  GlobalGenerateWODetail
        //'Function  :  make table for wo detail
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function GlobalGenerateWODetail() {
            var selectedWO = $scope.selectedWOIDData['woid'];
            var strExecProcOpSeq = $scope.ProcOpSeq;
            console.log("strExecProcOpSeq", strExecProcOpSeq);

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            console.log("GlobalGenerateWODetail procopseq", strExecProcOpSeq + "||");

            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail1', {
                    "WOID": selectedWO
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
                    "WOID": selectedWO
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
                    //var span1 = document.createTextNode(response[0].data.result[0]["partID"]);
                    var div1 = document.getElementById("table1-td1");
                    //div1.appendChild(span1);
                    div1.innerHTML = response[0].data.result[0]["partID"];

                    //var span2 = document.createTextNode(response[0].data.result[0]["toolDescription"]);
                    var div2 = document.getElementById("table1-td2");
                    //div2.appendChild(span2);
                    div2.innerHTML = response[0].data.result[0]["toolDescription"];

                    if (response[0].data.result[0]["plannerRemark"] != null) {
                        //var span3 = document.createTextNode(response[0].data.result[0]["plannerRemark"]);
                        var div3 = document.getElementById("table1-td3");
                        //div3.appendChild(span3);
                        div3.innerHTML = response[0].data.result[0]["plannerRemark"];
                    } else {
                        //var span3 = document.createTextNode("");
                        var div3 = document.getElementById("table1-td3");
                        //div3.appendChild(span3);
                        div3.innerHTML = "";
                    }

                }


                $q.all(promiseArray2).then(function (response) {
                    console.log("GlobalGenerateWODetail2", response);
                    if (response[0].data.result.length != 0) {
                        //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                        // $scope.table1.concat(response[0].data.result[0]);
                        //combineJson(response[0].data.result);
                        //var span4 = document.createTextNode(response[0].data.result[0]["remark"]);
                        var div4 = document.getElementById("table1-td4");
                        //div4.setAttribute("style", "color:red;");
                        //div4.appendChild(span4);
                        div4.innerHTML = response[0].data.result[0]["remark"];
                    }


                    $q.all(promiseArray3).then(function (response) {
                        console.log("GlobalGenerateWODetail3", response[0].data.result);
                        if (response[0].data.result.length != 0) {
                            //$scope.table1.concat(response[0].data.result[0]);
                            //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                            //combineJson(response[0].data.result);
                            //var span5 = document.createTextNode(response[0].data.result[0]["description"]);
                            var div5 = document.getElementById("table1-td5");
                            //div5.appendChild(span5);
                            div5.innerHTML = response[0].data.result[0]["description"];
                        }

                        $q.all(promiseArray4).then(function (response) {
                            console.log("GlobalGenerateWODetail4", response[0].data.result);
                            if (response[0].data.result.length != 0) {
                                //$scope.table1.concat(response[0].data.result[0]);
                                //$scope.table1 = $.merge($scope.table1, response[0].data.result[0]);
                                // combineJson(response[0].data.result);
                                //var span6 = document.createTextNode(response[0].data.result[0]["poNumber"]);
                                var div6 = document.getElementById("table1-td6");
                                //div6.appendChild(span6);
                                div6.innerHTML = response[0].data.result[0]["poNumber"];

                                //var span7 = document.createTextNode(response[0].data.result[0]["lineNumber"]);
                                var div7 = document.getElementById("table1-td7");
                                //div7.appendChild(span7);
                                div7.innerHTML = response[0].data.result[0]["lineNumber"];

                                //var span8 = document.createTextNode(response[0].data.result[0]["soRemarks"]);
                                var div8 = document.getElementById("table1-td8");
                                //div8.appendChild(span8);
                                div8.innerHTML = response[0].data.result[0]["soRemarks"];
                            }
                            //console.log("GlobalGenerateWODetail table", $scope.table1);
                        });


                    });


                });


            });


        }


        //'*******************************************************************
        //'Title     :  maketable
        //'Function  :  make table for raw material qctracking-table1
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTableSubAssembly(data) {
            console.log("makeTableSubAssembly data", data);
            //todo: it will be called when subassambly exists
            $("#subAssembly").css("display", "block");
            document.getElementById("qctracking-tableSubAssembly").innerHTML = "";
            console.log("makeTableSubAssembly", data);


            $("#qctracking-tableSubAssembly").kendoGrid({
                dataSource: {
                    data
                    //    ,
                    //pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 200,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},

                // pageable: true,

                //pageSize: 10,
                sortable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: [
                 {
                     field: "woid", title: "Work Order", width: 100

                 },
                 {
                     field: "woStatus", title: "Status", width: 100

                 },
                 {
                     field: "QtyPer", title: "Qty", width: 100

                 }
                ]
            })

        }


        //'*******************************************************************
        //'Title     :  convertTime
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : make qctracking-table2
        //'*******************************************************************
        function makeTable1(data) {
            $scope.fpSpreadQueuingWOList = data;

            document.getElementById("qctracking-table2").innerHTML = "";
            console.log("tableData", data);
            convertTime(["requestedDeliveryDate"], data);
            // console.log("kendo color",$scope.highlight);
            //    xml = data;
            //   global = data;





            // replaceNULL(data);
            // console.log("raw data is ",data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#qctracking-table2").kendoGrid({
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
                    data,
                    pageSize: 20
                },
                dataType: "json",
                height: 250,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                dragAndDrop: true,
                pageable: true,
                selectable: "true",

                //pageSize: 10,
                // sortable: true,
                resizable: true,
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

                 },
                 {
                     field: "woid", title: "WOID", width: 150

                 },
                 {
                     field: "workCenter", title: "Work Center", width: 150

                 },
                 {
                     field: "partID", title: "Part ID", width: 150

                 },
                 {
                     field: "description", title: "Part Name", width: 150

                 },
                 {
                     field: "woStatus", title: "Status", width: 150

                 },
                 {
                     field: "procOpSeq", title: "ProcOpSeq", width: 150

                 }
                ]
            })
        }

        //'*******************************************************************
        //'Title     :  makeTableEquipment
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTableEquipment(data) {
            console.log("makeTableEquipment data", data);
            document.getElementById("equipment-table").innerHTML = "";
            console.log("makeTableEquipment", data);

          //  $scope.equipmentList = data;

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }

            $("#equipment-table").kendoGrid({
                dataSource: {
                    data
                    //    ,
                    //pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 200,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},

                // pageable: true,

                //pageSize: 10,
                sortable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: [
                 {
                     field: "index", title: "#", width: 50

                 },
                 {
                     field: "mcID", title: "Equipment", width: 100

                 }
                ]
            })

        }

        //'*******************************************************************
        //'Title     :  makeTable2
        //'Function  :  make table for raw material qctracking-table1
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTable2(data) {
            document.getElementById("qctracking-table1").innerHTML = "";
            console.log("makeTable2", data);

            for (var i = 0; i < data.length; i++) {
                if (data[i]["status"] == true) {
                    data[i]["reqQty"] = true
                } else {
                    data[i]["reqQty"] = false
                }
            }

            $("#qctracking-table1").kendoGrid({
                dataSource: {
                    data
                    //    ,
                    //pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 200,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},

                // pageable: true,

                //pageSize: 10,
                sortable: true,
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
        //'Title     :  fnCheckPriorityConfig
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function fnCheckPriorityConfig() {
            $scope.fnCheckPriorityConfigVar = false;
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnCheckPriorityConfig', {
                'WorkCenter': $scope.WorkCenter
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("fnCheckPriorityConfig", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0 && response[0].data.result[0]['checkPriority'] != null) {
                    if (String(response[0].data.result[0]['checkPriority']).trim().toLocaleLowerCase() == "yes") {
                        $scope.fnCheckPriorityConfigVar = true;
                    }

                }

            });
        }


        //'*******************************************************************
        //'Title     :  AssignGlobalVariable
        //'Function  :   
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function AssignGlobalVariable() {
            console.log("Assign", $scope.selectedWOIDData);
            $scope.PartID = String($scope.selectedWOIDData['partID']).trim();
            $scope.ActualRecQty = $scope.selectedWOIDData['actualRecQty'];
            $scope.ActualRecDate = String($scope.selectedWOIDData['actualRecDate']).trim();
            $scope.CompletedQty = $scope.selectedWOIDData['completedQty'];
            $scope.CompletedDate = String($scope.selectedWOIDData['completedDate']).trim();
            $scope.OutstandingQty = $scope.selectedWOIDData['outstandingQty'];
            $scope.OutstandingDate = String($scope.selectedWOIDData['outstandingDate']).trim();
            $scope.ScrapQty = $scope.selectedWOIDData['scrapQty'];
            $scope.ScrapDate = String($scope.selectedWOIDData['scrapDate']).trim();
            $scope.AdjustedQty = $scope.selectedWOIDData['adjustedQty'];
            $scope.AdjustedDate = String($scope.selectedWOIDData['adjustedDate']).trim();
            $scope.McID = String($scope.selectedWOIDData['mcID']).trim();
            if ($scope.McID == "") {
                $scope.McID = " ";
            }
            $scope.McType = String($scope.selectedWOIDData['mcType']).trim();
            $scope.RouteID = $scope.selectedWOIDData['routeID'];
            $scope.OpSeq = $scope.selectedWOIDData['opSeq'];
            $scope.ProcOpSeq = $scope.selectedWOIDData['procOpSeq'];

            $scope.WorkCenter = String($scope.selectedWOIDData['workCenter']).trim();
            $scope.WOExecutionStatus = String($scope.selectedWOIDData['woStatus']).trim();
            $scope.SetupStartDate = String($scope.selectedWOIDData['setupStartDate']).trim();
            $scope.SetupEndDate = String($scope.selectedWOIDData['setupEndDate']).trim();
            $scope.ProdStartDate = String($scope.selectedWOIDData['prodStartDate']).trim();
            $scope.ProdEndDate = String($scope.selectedWOIDData['prodEndDate']).trim();
            $scope.ParentWOID = String($scope.selectedWOIDData['parentWOID']).trim();
            if ($scope.selectedWOIDData['remark'] != null) {
                $scope.Remark = String($scope.selectedWOIDData['remark']).trim();
            }

            //  $scope.PPID = $scope.selectedWOIDData['partID'];
            // $scope.SalesOrderID = $scope.selectedWOIDData['partID'];
            //  $scope.ReleasedDate = $scope.selectedWOIDData['partID'];
            if ($scope.selectedWOIDData['sendOutDate'] != null) {
                $scope.SendOutDate = String($scope.selectedWOIDData['sendOutDate']).trim();
            } else {
                $scope.SendOutDate = getCurrentDatetime();
            }
            if ($scope.selectedWOIDData['receivedDate'] != null) {
                $scope.ReceivedDate = String($scope.selectedWOIDData['receivedDate']).trim();
            } else {
                $scope.ReceivedDate = getCurrentDatetime();
            }


            $scope.QtyUpdated = $scope.selectedWOIDData['qtyUpdated'];;//static
            console.log("GLOBAL", $scope);

        }



        //'*******************************************************************
        //'Title     :  findSelectorFullInfo
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : find procopseq by woid
        //'*******************************************************************
        function findSelectorFullInfo(woid) {
            console.log("findSelectorFullInfo", woid);
            console.log("findSelectorFullInfo selectData", $scope.selectData);
            for (var i = 0; i < $scope.selectData.length; i++) {
                if ($scope.selectData[i]['woid'] == woid) {
                    return $scope.selectData[i];
                }
            }
        }


        //'*******************************************************************
        //'Title     :  GenerateWOSummary
        //'Function  :  generate WO Summary information 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOSummary() {
            var promiseArray1 = [];
            var promiseArray2 = [];

            //var select_WOID = $('#select_qctracking-woid option:selected').text();
            var select_WOID = String($('#select_qctracking-woid-input').val()).trim();
            // alert(select_WOID);
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": select_WOID
            })
         );
            //GenerateWOSummary1
            //"Select ReleasedProdQty, ReleasedProdDate, ActualProdQty, ActualProdDate, "
            //            + "ActualRecQty,  ActualRecDate, CompletedQty, CompletedDate, "
            //            + "OutstandingQty, OutstandingDate, AccumulatedScrapQty, AccumulatedScrapDate, "
            //            + "TotalActAdjustedQty, TotalActAdjustedDate, WOStatus, RequestedDeliveryDate "
            //            + "from TS_WorkOrder "
            //            + "where WOID='" + selectedWO + "'";



            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOSummary1", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length != 0) {

                        if (response[0].data.result[0]['actualRecQty'] != null) {
                            $scope.ActualRecQty = response[0].data.result[0]['actualRecQty'];
                        } else {
                            $scope.ActualRecQty = 0;
                        }

                        if (response[0].data.result[0]['completedQty'] != null) {
                            $scope.CompletedQty = response[0].data.result[0]['completedQty'];
                        } else {
                            $scope.CompletedQty = 0;
                        }

                        if (response[0].data.result[0]['accumulatedScrapQty'] != null) {
                            $scope.ScrapQty = response[0].data.result[0]['accumulatedScrapQty'];
                        } else {
                            $scope.ScrapQty = 0;
                        }

                        if (response[0].data.result[0]['accumulatedScrapQty'] != null) {
                            $scope.TotalActAdjustedQty = response[0].data.result[0]['accumulatedScrapQty'];
                        } else {
                            $scope.TotalActAdjustedQty = 0;
                        }

                        if (response[0].data.result[0]['outstandingQty'] != null) {
                            $scope.OutstandingQty = response[0].data.result[0]['outstandingQty'];
                        } else {
                            $scope.OutstandingQty = 0;
                        }




                        document.getElementById("WIP-td2_1").innerHTML = response[0].data.result[0]['releasedProdQty'];
                        document.getElementById("WIP-td2_2").innerHTML = String(response[0].data.result[0]['releasedProdDate']).replace("T", " ");

                        if (response[0].data.result[0]['actualProdQty'] == response[0].data.result[0]['releasedProdQty']) {
                            $("#WIP-tr-4").css("display", "none");;
                        } else {
                            document.getElementById("WIP-td4_1").innerHTML = response[0].data.result[0]['actualProdQty'];
                            document.getElementById("WIP-td4_2").innerHTML = String(response[0].data.result[0]['actualProdDate']).replace("T", " ");
                        }

                        if (response[0].data.result[0]['accumulatedScrapQty'] != null && response[0].data.result[0]['accumulatedScrapQty'] != 0) {
                            document.getElementById("WIP-td7_1").innerHTML = response[0].data.result[0]['accumulatedScrapQty'];
                            document.getElementById("WIP-td7_2").innerHTML = String(response[0].data.result[0]['accumulatedScrapDate']).replace("T", " ");
                        } else {
                            //  alert("hide");
                            //   document.getElementById("WIP-tr-7").display = "none";
                            $("#WIP-tr-7").css("display", "none");;
                        }


                    }
                }
            });

            //GenerateWOList();
            // var propopseq = findSelectorFullInfo(select_WOID)['procOpSeq'];


            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary2', {
                'WOID': select_WOID,
                // "procOpSeq": propopseq
                "procOpSeq": $scope.ProcOpSeq

            })
         );
            //GenerateWOSummary2
            //"Select WOID, PartID, ActualRecQty, ActualRecDate, CompletedQty, CompletedDate, "
            //+ "OutstandingQty, OutstandingDate, ScrapQty, ScrapDate, AdjustedQty,AdjustedDate, "
            //+ "McID, McType, RouteID, WorkCenter, OpSeq, ProcOpSeq, WOStatus, "
            //+ "SetupStartDate, SetupEndDate, ProdStartDate, ProdEndDate, ParentWOID, Remark, "
            //+ "SendOutDate, ReceivedDate, QtyUpdated "
            //+ "From TS_WorkOrderExecution "
            //+ "where WOID = " + "'" + selectedWO + "' "
            //+ "and ProcOpSeq = " + int.Parse(ProcOpSeq)
            //+ "And WOStatus Not like 'Completed%' COLLATE SQL_Latin1_General_CP1_CI_AS "
            //+ "And McType like 'QC%' COLLATE SQL_Latin1_General_CP1_CI_AS "




            $q.all(promiseArray2).then(function (response) {
                console.log("GenerateWOSummary2", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length != 0) {
                      //  AssignGlobalVariable();
                        //to check, in program is it hidden
                        document.getElementById("WIP-td5_1").innerHTML = response[0].data.result[0]['actualRecQty'];
                        document.getElementById("WIP-td5_2").innerHTML = String(response[0].data.result[0]['actualRecDate']).replace("T", " ");

                        document.getElementById("WIP-td6_1").innerHTML = response[0].data.result[0]['completedQty'];
                        document.getElementById("WIP-td6_2").innerHTML = String(response[0].data.result[0]['completedDate']).replace("T", " ");

                        if (response[0].data.result[0]['adjustedQty'] == null || response[0].data.result[0]['adjustedQty'] == 0) {
                            $("#WIP-tr-8").css("display", "none");
                        } else {
                            document.getElementById("WIP-td8_1").innerHTML = response[0].data.result[0]['adjustedQty'];
                            document.getElementById("WIP-td8_2").innerHTML = String(response[0].data.result[0]['adjustedDate']).replace("T", " ");
                        }

                        //to check, software this row never display
                        // document.getElementById("WIP-td5_1").innerHTML = response[0].data.result[0]['actualRecQty'];//actualreceiveqty
                        // document.getElementById("WIP-td5_2").innerHTML = String(response[0].data.result[0]['actualRecDate']).replace("T", " ");

                        document.getElementById("WIP-td9_1").innerHTML = response[0].data.result[0]['outstandingQty'];//completedqty
                        document.getElementById("WIP-td9_2").innerHTML = String(response[0].data.result[0]['outstandingDate']).replace("T", " ");
                    }
                }
            });


        }



        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase5() {
            console.log("cmdUpdateReceived_ClickCase5");
            if (config.DefaultReceiveQty) {
                if (config.skipReceiveQty) {
                    $scope.strparaPreScrapQty = 0;


                    
                    //3 - actual receive qty WIP-td3_1
                    //4 completed qty
                    //7 OutstandingQty
                    document.getElementById("WIP-td5_1").innerHTML = $scope.WOGlobalWOReceivedQty;
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + $scope.WOGlobalWOReceivedQty + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");

                    cmdUpdateReceived_ClickCase7();
                } else {
                    cmdUpdateReceived_ClickCase6();
                }

            } else {
                cmdUpdateReceived_ClickCase6();
            }
        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase6() {
            console.log("cmdUpdateReceived_ClickCase6 wip5", String(document.getElementById("WIP-td5_1").innerHTML).trim());
            if (String(document.getElementById("WIP-td5_1").innerHTML).trim() != "") {
                $scope.PreviousRecQty = String(document.getElementById("WIP-td5_1").innerHTML).trim();
            } else {
                $scope.PreviousRecQty = 0;
            }
            //console.log("cmdUpdateReceived_ClickCase6", $scope.PreviousRecQty);
            ////$scope.ReceivedQty = $scope.PreviousRecQty;
            //if ($scope.PreviousRecQty != "") {
            //    $("#qctracking-newReceived").val($scope.PreviousRecQty);
            //}

            $("#modalWOIDUpdateReceive").val($scope.selectedWOIDData["woid"]);
            $("#preprocess-woid").val($scope.selectedWOIDData["woid"]);
            $("#preprocess-scrapQty").val("");
            $scope.PreScrapQty = "";
            $scope.newReceived = "";

            $('#updateReceiveModal').modal('show');


        }


        //'*******************************************************************
        //'Title     :    UpdateReceivedOK
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.UpdateReceivedOK = function () {
            if ($scope.ScrapScrapQty == undefined) {
                if (String(document.getElementById("WIP-td3_1").innerHTML).trim() == "") {
                    $scope.strparaPreScrapQty = 0;
                } else {
                    $scope.strparaPreScrapQty = parseInt(String(document.getElementById("WIP-td3_1").innerHTML).trim());
                }
            } else {
                $scope.strparaPreScrapQty = $scope.ScrapScrapQty;
            }
            console.log("cmdUpdateReceived_ClickCase OK");
            console.log("cmdUpdateReceived_ClickCase OK paraSkipWOTrackingPrompt", config.paraSkipWOTrackingPrompt);
            console.log("cmdUpdateReceived_ClickCase OK TrackingDefaultOK", config.TrackingDefaultOK);
            console.log("cmdUpdateReceived_ClickCase ok scrapscrap", $scope.ScrapScrapQty);
            console.log("cmdUpdateReceived_ClickCase ok strparaPreScrapQty", $scope.strparaPreScrapQty);




            if (config.paraSkipWOTrackingPrompt) {
                var newReceived = parseInt(String($("#qctracking-newReceived").val()).trim());
                UpdateReceivedOKCase10(newReceived);
            } else {
                //case1
                //if (config.TrackingDefaultOK) {
                //    var answer = confirm("Confirm to save received qty?");
                //    if(answer){
                //        UpdateReceivedOKCase10();
                //    }
                //} else {

                //}
                var answer = confirm("Confirm to save received qty?");
                if (answer) {
                    var newReceived = parseInt(String($("#qctracking-newReceived").val()).trim());
                    UpdateReceivedOKCase10(newReceived);
                }
            }
            $('#updateReceiveModal').modal('toggle');



            $("qctracking-newReceived").val("");
        }


        //function SaveCompleteOKCase5(newReceived) {
        //    console.log("SaveCompleteOKCase5");
        //    //todo: line 111 check isNumeric
        //    console.log("SaveCompleteOKCase5.1", newReceived);
        //    console.log("SaveCompleteOKCase5.2", isNaN(newReceived));
        //    if (String(newReceived).trim() != "" && !isNaN(newReceived)) {
        //        SaveCompleteOKCase10(newReceived);
        //    } else {
        //        alert("Please enter the correct completed qty.");
        //    }
        //}

        //function SaveCompleteOKCase10(newReceived) {
        //    console.log("SaveCompleteOKCase10");
        //    console.log("SaveCompleteOKCase10 newReceived", newReceived);
        //    console.log("SaveCompleteOKCase10 $scope.OutstandingQty", $scope.OutstandingQty);
        //    if (newReceived <= $scope.OutstandingQty) {

        //        console.log("SaveCompleteOKCase10 newReceived", newReceived);
        //        //  console.log("SaveCompleteOKCase10 CompletedQty", $scope.CompletedQty);
        //        // $scope.CompletedQty = $scope.CompletedQty + parseInt(newReceived);
        //        $scope.CompletedQty = parseInt(newReceived);
        //        console.log("SaveCompleteOKCase10 CompletedQty", $scope.CompletedQty);
        //        //$scope.CompletedQty = $scope.WOGlobalWOCompletedQty;
        //        $('#saveCompleteModal').modal('toggle');
        //        cmdUpdate_ClickCase8();
        //    } else {
        //        alert("Please enter the correct received qty. Max qty is " + $scope.OutstandingQty);
        //    }
        //}

        function UpdateReceivedOKCase10(newReceived) {


            console.log("UpdateReceivedOKCase10 prev", "|" + $scope.PreviousRecQty + "|");
            console.log("UpdateReceivedOKCase10 new", newReceived);
            console.log("UpdateReceivedOKCase10 ProcOpSeq", $scope.ProcOpSeq);

            if ($scope.PreviousRecQty != "") { // not new receive
                console.log("UpdateReceivedOKCase10.0");

                if ((config.AllowExceedQty && newReceived >= $scope.PreviousRecQty && $scope.ProcOpSeq == 1) ||

                    ((config.AllowExceedQty == false) && newReceived == $scope.PreviousRecQty) ||

                    ($scope.ProcOpSeq > 1 && newReceived == $scope.PreviousRecQty)
                    ) {
                    console.log("UpdateReceivedOKCase10.1");
                    $scope.newReceived = newReceived;

                    //  $scope.CompletedQty = newReceived;
                    //fetch WO summary
                    GenerateWOSummary();
                    //fetch WO summary - scrap + unaccountable qty
                    GenerateWOSummaryScrap();

                    document.getElementById("WIP-td5_1").innerHTML = newReceived;
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + newReceived + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");
                    CalculateDuration();
                    cmdUpdateReceived_ClickCase7();


                } else if (newReceived < $scope.PreviousRecQty) {
                    console.log("UpdateReceivedOKCase10.2");
                    $scope.ScrapQty = $scope.PreviousRecQty - newReceived;
                    $("#preprocess-scrapQty").val($scope.ScrapQty);
                    $("#preprocessModal").modal('toggle');
                    //preprocess-scrapQty
                    $scope.newReceived = newReceived;
                    // $scope.CompletedQty = newReceived;
                    //fetch WO summary
                    GenerateWOSummary();
                    //fetch WO summary - scrap + unaccountable qty
                    GenerateWOSummaryScrap();

                    document.getElementById("WIP-td5_1").innerHTML = newReceived;
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + newReceived + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");



                } else {
                    console.log("UpdateReceivedOKCase10.3");
                    alert("Please enter the correct received qty. Max qty is " + $scope.PreviousRecQty);
                }

            } else {// new receive
                console.log("UpdateReceivedOKCase10.4");
                if ($scope.OutstandingQty < newReceived) {
                    console.log("UpdateReceivedOKCase10.5");
                    alert("Please enter the correct received qty. Max qty is " + $scope.OutstandingQty);
                } else {
                    console.log("UpdateReceivedOKCase10.6");
                    console.log("UpdateReceivedOKCase10.6 newReceived", newReceived);
                    $scope.newReceived = newReceived;
                    //  $scope.CompletedQty = newReceived;
                    //fetch WO summary
                    //  GenerateWOSummary();
                    //fetch WO summary - scrap + unaccountable qty
                    //GenerateWOSummaryScrap();

                    document.getElementById("WIP-td5_1").innerHTML = newReceived
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + newReceived + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");

                    //CalculateDuration();
                    cmdUpdateReceived_ClickCase7();
                }
            }

        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase7
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase7() {
            console.log("cmdUpdateReceived_ClickCase7");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase7', {
                  'QtyUpdated': 2,
                  'WOID': $scope.selectedWOIDData['woid'],
                  'ProcOpSeq': $scope.ProcOpSeq
              })
          );
            //cmdUpdateReceived_ClickCase7
            //UPDATE [TS_WorkOrderEXecution] "
            //            + "SET QtyUpdated = @QtyUpdated "
            //            + "where WOID = @WOID "
            //            + "and ProcOpSeq = " + int.Parse(ProcOpSeq);

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase7", response);
                cmdUpdateReceived_ClickCase8();
            });
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase8
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase8() {
            console.log("cmdUpdateReceived_ClickCase8");
            console.log("cmdUpdateReceived_ClickCase8 ScrapScrap");
            $scope.ActualRecQty = String(document.getElementById("WIP-td5_1").innerHTML).trim();
            if ($scope.ActualRecQty == "") {
                $scope.ActualRecQty = 0;
            } else {
                $scope.ActualRecQty = parseInt($scope.ActualRecQty);
            }

            if ($scope.CompletedQty == "") {
                $scope.CompletedQty = 0;
            }

            if ($scope.ScrapQty == "") {
                $scope.ScrapQty = 0;
            }

            if ($scope.TotalActAdjustedQty == "") {
                $scope.TotalActAdjustedQty = 0;
            }
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim() == "") {
                $scope.OutstandingQty = 0;
            }

            console.log("cmdUpdateReceived_ClickCase8 ActualRecQty", $scope.ActualRecQty);
            console.log("cmdUpdateReceived_ClickCase8 ScrapQty", $scope.ScrapQty);
            console.log("cmdUpdateReceived_ClickCase8 CompletedQty", $scope.CompletedQty);

            //if ($scope.CompletedQty == $scope.ActualRecQty - $scope.ScrapQty) { //completed
            //    console.log("cmdUpdateReceived_ClickCase8.1");
            //    $scope.WOExecutionStatus = "Completed"; // update status only for completed job
            //    cmdUpdateReceived_ClickCase10();
            //} else if ($scope.CompletedQty > $scope.ActualRecQty - $scope.ScrapQty) { //do more than completed
            //    console.log("cmdUpdateReceived_ClickCase8.2");
            //    alert("Please enter the correct completed qty. Max qty is " + $scope.ActualRecQty - $scope.ScrapQty);
            //    cmdUpdateReceived_ClickCase100();
            //} else {
            //    console.log("cmdUpdateReceived_ClickCase8.3");
            //    cmdUpdateReceived_ClickCase10();
            //}


            if ($scope.CompletedQty == $scope.ActualRecQty - $scope.ScrapScrapQty) { //completed
                console.log("cmdUpdateReceived_ClickCase8.1");
                $scope.WOExecutionStatus = "Completed"; // update status only for completed job
                cmdUpdateReceived_ClickCase10();
            } else if ($scope.CompletedQty > $scope.ActualRecQty - $scope.ScrapScrapQty) { //do more than completed
                console.log("cmdUpdateReceived_ClickCase8.2");
                alert("Please enter the correct completed qty. Max qty is " + $scope.ActualRecQty);
                cmdUpdateReceived_ClickCase100();
            } else {
                console.log("cmdUpdateReceived_ClickCase8.3");
                cmdUpdateReceived_ClickCase10();
            }
        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase10() {
            console.log("cmdUpdateReceived_ClickCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];

            var qcDuration = String($("#qctracking-table3-qctotalduration").val()).trim();

            if (qcDuration = "") {
                qcDuration = "0:0:0";
            }
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
             $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_1_1', {
                 //'ActualRecQty': $scope.ActualRecQty,//
                 'ActualRecQty': $scope.newReceived,
                 'ActualRecDate': currentdate,//
                 'CompletedQty': $scope.CompletedQty,//
                 'CompletedDate': currentdate,//
                 'OutstandingQty': $scope.OutstandingQty,//
                 'OutstandingDate': currentdate,//
                 'WOStatus': $scope.WOExecutionStatus,//                
                 'ProdTotalDuration': convertDatetimeToSecond(qcDuration),//
                 'WOID': $scope.selectedWOIDData['woid'],
                 'WorkCenter': $scope.WorkCenter,//
                 'ProcOpSeq': $scope.ProcOpSeq//
             })
         );

             promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_2', {
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'ExStatus': 0,
                    'UpdatedDate': currentdate,
                    'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                    'reason': ''
                })
            );

             $q.all(promiseArray1).then(function (response) {
                 console.log("cmdUpdateReceived_ClickCase10_1_1", response);
                 $q.all(promiseArray2).then(function (response) {
                     console.log("cmdUpdateReceived_ClickCase10_2", response);
                     cmdUpdateReceived_ClickCase15();
                 });
             });

        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase15() {
            console.log("cmdUpdateReceived_ClickCase15");
            if ($scope.WOExecutionStatus == "Completed") {
                cmdUpdateReceived_ClickCase20();
            } else {
                var promiseArray = UpdateWorkOrderQty();

                $q.all(promiseArray).then(function (response) {
                    console.log("UpdateWorkOrderQty", response);
                    cmdUpdateReceived_ClickCase100();
                });

            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase20() {
            console.log("cmdUpdateReceived_ClickCase20");
            var promiseArray1 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'ProcOpSeq': $scope.ProcOpSeq,//
                  'ExStatus': 9,
                  'UpdatedDate': currentdate,
                  'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),//
                  'reason': ''
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase10_2.2", response);
                if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                    cmdUpdateReceived_ClickCase50();
                } else {
                    cmdUpdateReceived_ClickCase30();
                }
            });
        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase30() {
            console.log("cmdUpdateReceived_ClickCase30");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase30', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase30", response);
                if (response.length != 0 && response[0].data.result.length != 0) {

                    $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];

                    console.log("cmdUpdateReceived_ClickCase30.1");
                    console.log("cmdUpdateReceived_ClickCase30.1 procopseq", $scope.ProcOpSeq);
                    console.log("cmdUpdateReceived_ClickCase30.1 LastProcOpSeq", $scope.LastProcOpSeq);

                    if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                        $scope.WOStatus = "Completed";
                        var promiseArray = UpdateWorkOrderQty();

                        $q.all(promiseArray).then(function (response) {
                            console.log("UpdateWorkOrderQty.1", response);
                            cmdUpdateReceived_ClickCase80();
                        });
                    } else {
                        if ($scope.WOExecutionStatus == "Completed") {
                            if ($scope.CompletedQty > 0) {
                                RefreshData();
                            } else {
                                $scope.WOStatus = "Completed";
                                var promiseArray = UpdateWorkOrderQty();

                                $q.all(promiseArray).then(function (response) {
                                    console.log("UpdateWorkOrderQty.1", response);
                                    cmdUpdateReceived_ClickCase80();
                                });

                            }
                        } else {
                            cmdUpdateReceived_ClickCase100();
                        }
                    }


                } else {
                    alert("No route sequence found. ");
                    $scope.WOStatus = "Completed";

                    var promiseArray = UpdateWorkOrderQty();

                    $q.all(promiseArray).then(function (response) {
                        console.log("UpdateWorkOrderQty.1", response);
                        cmdUpdateReceived_ClickCase80();
                    });

                }


            });
        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase50
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase50() {
            console.log("cmdUpdateReceived_ClickCase50");
            var promiseArray1 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase30', {
                  'WOID': $scope.selectedWOIDData['woid']
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase50 cmdUpdateReceived_ClickCase30", response);
                if (response.length != 0 && response[0].data.result.length != 0) {

                    $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];

                    //console.log("cmdUpdateReceived_ClickCase30.1");
                    //console.log("cmdUpdateReceived_ClickCase30.1 procopseq", $scope.ProcOpSeq);
                    //console.log("cmdUpdateReceived_ClickCase30.1 LastProcOpSeq", $scope.LastProcOpSeq);

                    if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                        $scope.WOStatus = "Completed";
                        var promiseArray = UpdateWorkOrderQty();

                        $q.all(promiseArray).then(function (response) {
                            console.log("UpdateWorkOrderQty.1", response);
                            cmdUpdateReceived_ClickCase80();
                        });
                    } else {
                        if ($scope.WOExecutionStatus == "Completed") {
                            if ($scope.CompletedQty > 0) {
                                RefreshData();
                            } else {
                                $scope.WOStatus = "Completed";
                                var promiseArray = UpdateWorkOrderQty();

                                $q.all(promiseArray).then(function (response) {
                                    console.log("UpdateWorkOrderQty.1", response);
                                    cmdUpdateReceived_ClickCase80();
                                });

                            }
                        } else {
                            cmdUpdateReceived_ClickCase100();
                        }
                    }


                } else {
                    alert("No route sequence found. ");
                    $scope.WOStatus = "Completed";

                    var promiseArray = UpdateWorkOrderQty();

                    $q.all(promiseArray).then(function (response) {
                        console.log("UpdateWorkOrderQty.1", response);
                        cmdUpdateReceived_ClickCase80();
                    });

                }


            });
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase80
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase80() {
            console.log("cmdUpdateReceived_ClickCase80");
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_1', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'EndDate': getCurrentDatetime()
              })
          );
            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase80_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'WOStatus': $scope.WOStatus
              })
          );
            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase80_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdUpdateReceived_ClickCase80_2", response);
                    cmdUpdateReceived_ClickCase90();
                });
            });


        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase90
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase90() {
            console.log("cmdUpdateReceived_ClickCase90");
            if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                cmdUpdateReceived_ClickCase92();
            } else {
                cmdUpdateReceived_ClickCase95();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase92
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase92() {
            console.log("cmdUpdateReceived_ClickCase92");
            //this is a dummy post to control folw
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": $scope.selectedWOID['woid']
            })
            );

            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": $scope.selectedWOID['woid']
            })
            );


            $q.all(promiseArray1).then(function (response) {
                CheckAnyChildNotCompleted1();
                $q.all(promiseArray2).then(function (response) {
                    console.log("GenerateWOSummary1", response);



                    for (var i = 0; i < $scope.RecursiveWOID.length; i++) {
                        if (String($scope.RecursiveWOID[i]['woid']).toLowerCase().trim() == $scope.selectedWOID['woid']) {
                            if (String($scope.RecursiveWOID[i]['woStatus']).toLowerCase().trim() == "completed" || $scope.RecursiveWOID[i]['newwoStatus'] == 'Completed') { // if previously not completed but now need to update
                                WOStatus = "Completed";
                                cmdUpdateReceived_ClickCase95();

                            }
                        }
                    }

                });
            });



        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase95
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase95() {
            console.log("cmdUpdateReceived_ClickCase95");

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );


            promiseArray3.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_3', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );



            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase95_1", response);

                $q.all(promiseArray3).then(function (response) {
                    console.log("cmdUpdateReceived_ClickCase95_3", response);
                    if(response.length != 0  && response[0].data.success  && response[0].data.result.length != 0){
                        $scope.PPID = response[0].data.result[0]['ppid'];
                        $scope.SalesOrderID = response[0].data.result[0]['salesOrderID'];
                        $scope.ReleasedDate = response[0].data.result[0]['releasedDate'];
                    }

                promiseArray2.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                        'id': $scope.PPID,
                        'Status': $scope.WOStatus

                    })
                );

                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdUpdateReceived_ClickCase95_2", response);
                    //location.reload();
                });

                });



            });


        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase95
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase100() {
            console.log("cmdUpdateReceived_ClickCase100");
            //fetch WO summary
            GenerateWOSummary();
            //fetch WO summary - scrap + unaccountable qty
            GenerateWOSummaryScrap();

            if (config.BypassExecutionStart) {
                //todo: line 5619
            }



        }

        //'*******************************************************************
        //'Title     :  GeneratePauseReason
        //'Function  :  generate Pause reason fro operation pause 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function generatePauseReasonList() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.get(config.baseUrlApi + 'HMLVTS/generatePauseReasonList')
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("generatePauseReasonList", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        createSelect(response[0].data.result, "qctracking-pausereason");
                    }

                }
            });
        }

        //'*******************************************************************
        //'Title     :  fnValidateUserNameMCAssign
        //'Function  :  Validate username
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function fnValidateUserNameMCAssign() {//to check might not be useful, this is to check the mac address
            var OperatorName = $("#qctracking-table3-operatorName").val();

            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnValidateUserNameMCAssign', {
                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                'McID': $scope.McID
            })
            );

            return promiseArray1;




        }

        //'****************************************************************************************************
        //'Title     :  UpdateWorkOrderQty
        //'Function  :  
        //'Input     :  
        //'Output    :   
        //'             
        //'Remark    :  
        //'**************************************************************************************************
        function UpdateWorkOrderQty() {
            var currentdate = getCurrentDatetime();
            var promiseArray1 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/UpdateWorkOrderQty', {
                'ActualRecQty': $scope.ActualRecQty,
                'CompletedQty': $scope.CompletedQty,
                'OutstandingQty': $scope.OutstandingQty,
                'ActualRecDate': currentdate,
                'CompletedDate': currentdate,
                'OutstandingDate': currentdate,
                'WOID': $scope.selectedWOIDData['woid']
            })
         );

            return promiseArray1;
        }


        function fnUpdateOperator(UpdateType) {
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'ProcOpSeq': $scope.ProcOpSeq,
                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim()
            })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("fnUpdateOperator1", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {

                    if (UpdateType == 1) {
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator2', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'ReceivedDate': currentdate
                            })
                        );
                    } else if (UpdateType == 2) {
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator3', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'CompletedDate': currentdate
                            })
                        );
                    } else if (UpdateType == 3) {
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator4', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'OperatorStatus': $scope.WOExecutionStatus
                            })
                        );
                    }

                    $q.all(promiseArray2).then(function (response) {
                        console.log("fnUpdateOperator second", response);

                    });

                } else {
                    if (UpdateType == 1) {
                        promiseArray3.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator5', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'WorkCenter': $scope.WorkCenter,
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'McID': $scope.McID,
                                'McType': $scope.McType,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                                'ReceivedQty': $scope.ReceivedQty,
                                'ReceivedDate': currentdate
                            })
                        );

                    } else if (UpdateType == 2) {
                        promiseArray3.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator6', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'WorkCenter': $scope.WorkCenter,
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'McID': $scope.McID,
                                'McType': $scope.McType,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                                'CompletedQty': $scope.CompletedQty,
                                'CompletedDate': currentdate
                            })
                        );
                    } else if (UpdateType == 3) {
                        promiseArray3.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/fnUpdateOperator7', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'WorkCenter': $scope.WorkCenter,
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'McID': $scope.McID,
                                'McType': $scope.McType,
                                'OperatorID': String($("#qctracking-table3-operatorName").val()).trim(),
                                'OperatorName': String($("#qctracking-table3-operatorName").val()).trim(),
                                'OperatorStatus': $scope.WOExecutionStatus
                            })
                        );
                    }

                    $q.all(promiseArray3).then(function (response) {
                        console.log("fnUpdateOperator third", response);

                    });


                }
            });
        }


        //'*******************************************************************
        //'Title     :  ValidateOperatorName
        //'Function  :  Validate Operatorname
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function ValidateOperatorName(CheckPassword) {
            var OperatorFirstName = $("#qctracking-table3-operatorName").val();
            var Password = $("#qctracking-table3-password").val();
            console.log("ValidateOperatorName", OperatorFirstName);
            console.log("Password", Password);
            var promiseArray1 = [];
            //var loginData = [];
            //loginData["UserName"] = OperatorFirstName;
            //loginData["password"] = Password;
            //loginData["GrantType"] = "usertoken";
            if (String(OperatorFirstName).trim() != "" && String(Password).trim() != "") {

                promiseArray1.push(
                $http.post(config.baseUrlNexusApi + 'Token/GetToken', {
                    "UserName": OperatorFirstName,
                    "password": Password,
                    "GrantType": "usertoken"
                })
             );
            } else {
                alert("Please key in username/password");
            }
            return promiseArray1;
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
            var myDiv1 = document.getElementById("select_input_woid");
            console.log("myDiv1", myDiv1);
            if (itemName != "select_input_woid") {
                myDiv.innerHTML = "";
            } else {
                myDiv1.innerHTML = "";
            }


            if (itemName == "qctracking-woid") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);
                var options = "";
                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["woid"]).trim();//Subcon QC
                    option.text = String(rawData[i]["woid"]).trim();
                    //  console.log("option",option);
                    myDiv.appendChild(option);
                }
            }

            if (itemName == "qctracking-equipment") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);
                var options = "";
                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["mc_code"]).trim();//Subcon QC
                    option.text = String(rawData[i]["mc_code"]).trim();
                    //  console.log("option",option);
                    myDiv.appendChild(option);
                }
            }

            if (itemName == "qctracking-pausereason") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["reason"]).trim();//Subcon QC
                    option.text = String(rawData[i]["reason"]).trim();
                    //  console.log("option",option);
                    myDiv.appendChild(option);
                }
            }

            if (itemName == "preprocessremark") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["scrapRemark"]).trim();//Subcon QC
                    option.text = String(rawData[i]["scrapRemark"]).trim();
                    //  console.log("option",option);
                    myDiv.appendChild(option);
                }
            }//wotracking-scrap-remark

            if (itemName == "qctracking-scrap-remark") {
                //var option1 = document.createElement("option");
                //option1.value = "";
                //option1.text = "";
                //myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["scrapRemark"]).trim();//Subcon QC
                    option.text = String(rawData[i]["scrapRemark"]).trim();
                    //  console.log("option",option);
                    myDiv.appendChild(option);
                }
            }//
        }
        }






        //*********************helper funtion  ******************************************************************************//

    //function isEquipmentAlreadyAdded(equipment) {
    //    console.log("$scope.equipmentList", $scope.equipmentList);
    //    for (var i = 0; i < $scope.equipmentList.length;i++){
    //        if (String($scope.equipmentList[i]['mcID']).trim() == equipment) {
    //            return true;
    //        }
    //    }
    //    return false;
    //}
        //*****************************************time functions***********************************************************//
        function getCurrentDatetime() {
            var timeStamp = new Date();
            timeStamp = (
                (timeStamp.getFullYear()) + "-" +
                ("00" + (timeStamp.getMonth() + 1)).slice(-2) + "-" +
                ("00" + timeStamp.getDate()).slice(-2) + "T" +
                ("00" + timeStamp.getHours()).slice(-2) + ":" +
                ("00" + timeStamp.getMinutes()).slice(-2) + ":" +
                ("00" + timeStamp.getSeconds()).slice(-2)
                );
            return timeStamp;
        }


    //'*******************************************************************
    //'Title     :  convertDatetimeToSecond 
    //'Function  :  
    //'Input     :  
    //'Output    : 
    //'Remark    :  convert H:M:S to second
    //'          :   
    //'*******************************************************************
        function convertDatetimeToSecond(input) {
            if (input.indexOf(":") != -1) {
                var array = input.split(":");
                console.log("convertDatetimeToSecond", array);
                return parseInt(array[0]) * 3600 + parseInt(array[1]) * 60 + parseInt(array[2]);

            }

            return 0;

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


        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            //var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            //var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            // return hDisplay + ":" + mDisplay + ":" + sDisplay;

            return h + ":" + m + ":" + s;
        }

})();