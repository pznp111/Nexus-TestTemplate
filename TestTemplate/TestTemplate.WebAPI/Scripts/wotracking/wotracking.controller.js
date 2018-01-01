(function () {
    'use strict';

    angular.module('erp.wotracking').controller('wotrackingCtrl', wotrackingCtrl);

    wotrackingCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function wotrackingCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");
        console.log("authService", authService);

        $scope.fpSpreadQueuingWOList = [];
        $scope.fnTrackSetupConfigVar = false;

        $scope.WOGlobalWOOpnState = "";
        $scope.WOGlobalWOPauseReason = "";
        $scope.WOGlobalWOMcID = "";
        $scope.WOGlobalSendOutDate = "";
        $scope.WOGlobalReceivedDate = "";
        $scope.RecursiveWOID = []; // for updating parent work order to complete


        $scope.PreviousRecQty = "";
        $scope.WOStatus = "";
        $scope.PreScrapQty = "";

        $scope.PPID = "";
        $scope.SalesOrderID = "";
        $scope.ReleasedDate = "";
        //.$scope.ReceivedQty = "0";


        $scope.start = "";
        $scope.end = "";
        $scope.radio = "";
        $scope.selectedWOID = ""; //store all the selector full data, (woid, procopseq ..)
        $scope.selectedWOIDData = "";//store the selected woid info, in the original code, they are splited into each single data
        $scope.tenant = tenant;


        $scope.ScrapScrapQty = 0;
        $scope.PartID = "";
        $scope.ActualRecQty = "";
        $scope.ActualRecDate = "";
        $scope.CompletedQty = "";
        $scope.CompletedDate = "";
        $scope.OutstandingQty = "";
        $scope.OutstandingDate = "";
        $scope.ScrapQty = "";
        $scope.ScrapDate = "";
        $scope.AdjustedQty = "";
        $scope.AdjustedDate = "";
        $scope.McID = "";
        $scope.McType = "";
        $scope.RouteID = "";
        $scope.OpSeq = "";
        $scope.ProcOpSeq = "";
        $scope.WorkCenter = "";
        $scope.WOExecutionStatus = "";
        $scope.SetupStartDate = "";
        $scope.SetupEndDate = "";
        $scope.ProdStartDate = "";
        $scope.ProdEndDate = "";
        $scope.ParentWOID = "";
        $scope.Remark = "";
        $scope.PPID = "";
        $scope.SalesOrderID = "";
        $scope.ReleasedDate = "";
        $scope.SendOutDate = "";
        $scope.ReceivedDate = "";
        $scope.QtyUpdated = "";//static

        $scope.comboMCList = "";


        $scope.OrderType = null;


        $scope.LastProcOpSeq = "";


        // $scope.strOutstandingQty = 0;
        $scope.ActualRecQty = "";
        $scope.CompletedQty = "";
        $scope.ScrapQty = "";
        $scope.TotalActAdjustedQty = "";

        $scope.selectData = "";
        $scope.pausereason = "";
        $scope.holdtype = "";


        // global variable in a group of function
        $scope.strparaPreScrapQty = 0;
        $scope.WOGlobalWOReceivedQty = 0;



        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'wotracking-26' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {

            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            //  console.log("splitreport memo", m);
            return memo;
        }, []);


        //  $('#saveCompleteModal').modal('show');
        //  $('#myModal').modal('toggle');
        load();

        function load() {
           // $('#ScrapModal').modal('show');
            //RefreshData();

            //************************ Clear input on screen **********************************//
            document.getElementById("WIP-td2_1").innerHTML = "";
            document.getElementById("WIP-td3_1").innerHTML = "";
            document.getElementById("WIP-td4_1").innerHTML = "";
            document.getElementById("WIP-td5_1").innerHTML = "";
            document.getElementById("WIP-td6_1").innerHTML = "";
            document.getElementById("WIP-td7_1").innerHTML = "";
            document.getElementById("WIP-td8_1").innerHTML = "";
            document.getElementById("WIP-td9_1").innerHTML = "";
            document.getElementById("WIP-td2_2").innerHTML = "";
            document.getElementById("WIP-td3_2").innerHTML = "";
            document.getElementById("WIP-td4_2").innerHTML = "";
            document.getElementById("WIP-td5_2").innerHTML = "";
            document.getElementById("WIP-td6_2").innerHTML = "";
            document.getElementById("WIP-td7_2").innerHTML = "";
            document.getElementById("WIP-td8_2").innerHTML = "";
            document.getElementById("WIP-td9_2").innerHTML = "";






            //to check: line250-311, config options, all need to set
            $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
            $("#wotracking-table3-loginName").val(authService.currentUser.userName);
            console.log("authService", authService.currentUser.userName);
            GenerateWOList();
            generatePauseReasonList();
            generateTrackingRemarkList();
            GenerateScrapRemark();

         //   $("#select_wotracking-woid option[value=2017060005.01]").attr('selected', 'selected');
            $("#select_wotracking-woid").val('2017060005.01');
            //document.getElementById("select_wotracking-woid").value = "2017060005.01";

            //todo line 321 - 328 bypass  WOGlobalOnHoldBypassApproved
            if (config.BypassApproval) {
                document.getElementById("wo-tracking-approve").display = "none";
                document.getElementById("wo-tracking-onhold").display = "block";
            }

            //todo to check //check for form  access right line 333 - line 375

            //to check //check for fnGetUserAccessRight this seems to be user number control for SQL SERVER
            $("#setup-row-2").hide();
            $("#setup-row-3").hide();
            $("#setup-row-4").hide();
            $("#setup-row-5").hide();
            $("#production-row-2").hide();
            $("#production-row-3").hide();
            $("#production-row-4").hide();
            $("#production-row-5").hide();
            var promiseArray1 = fnGetUserAccessRight(authService.currentUser.userName, "TS_WOTracking");
            $q.all(promiseArray1).then(function (response) {
                console.log("fnGetUserAccessRight", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['column1'] > 0) {
                            $("#setup-row-2").show();
                            $("#setup-row-3").show();
                            $("#setup-row-4").show();
                            $("#setup-row-5").show();
                            $("#production-row-2").show();
                            $("#production-row-3").show();
                            $("#production-row-4").show();
                            $("#production-row-5").show();

                            $("#wo-tracking-update").css("display", "block");
                            $("#wo-tracking-updatereceive").css("display", "block");

                        } else {
                            $("#setup-row-2").hide();
                            $("#setup-row-3").hide();
                            $("#setup-row-4").hide();
                            $("#setup-row-5").hide();
                            $("#production-row-2").hide();
                            $("#production-row-3").hide();
                            $("#production-row-4").hide();
                            $("#production-row-5").hide();
                            $("#wo-tracking-update").css("display", "none");
                            $("#wo-tracking-updatereceive").css("display", "none");
                        }
                    }
                }

            });


            //todo to check
            $("#wo-tracking-approve").hide();
            var promiseArray1 = fnGetUserAccessRight(authService.currentUser.userName, "TS_ApprovedOperations");
            $q.all(promiseArray1).then(function (response) {
                console.log("fnGetUserAccessRight", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['column1'] > 0) {
                            $("#wo-tracking-approve").show();
                        }
                    }
                }

            });
            //save orginal design location
            //cmdSetupStartlocation = cmdSetupStart.Location;
            //xcmdSetupStartLocation = cmdSetupStart.Location.X;
            //ycmdSetupStartLocation = cmdSetupStart.Location.Y;
            //cmdProductionStartlocation = cmdProductionStart.Location;
            //xcmdProductionStartLocation = cmdProductionStart.Location.X;
            //ycmdProductionStartLocation = cmdProductionStart.Location.Y;

            //todo to check line 400-420



            var promiseArray = fnTrackSetupConfig();

            $q.all(promiseArray).then(function (response) {
                console.log("fnTrackSetupConfig", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    if (response[0].data.result[0]['TrackSetup']) {
                        //return true;
                        console.log("fnTrackSetupConfig1");
                        $scope.fnTrackSetupConfigVar = true;
                        //  if (config.BypassSetup) {
                        $('#wotracking-table3-setuptotalduration').val("0.00");
                        //  $('#wotracking-table3-productiontotalduration').val("0.00");
                        //  }
                    } else {
                        console.log("fnTrackSetupConfig2");
                        $scope.fnTrackSetupConfigVar = false;
                        if (config.BypassSetup) {
                            $('#wotracking-table3-setuptotalduration').val("0.00");
                            //  $('#wotracking-table3-productiontotalduration').val("0.00");
                        }
                    }

                    // response[0].data.result[0][]
                } else {
                    console.log("fnTrackSetupConfig2.1");
                    $scope.fnTrackSetupConfigVar = false;
                    if (config.BypassSetup) {
                        $('#wotracking-table3-setuptotalduration').val("0.00");
                        //   $('#wotracking-table3-productiontotalduration').val("0.00");
                    }
                }
                if (config.BypassSetup) {
                    $('#wotracking-table3-setuptotalduration').val("0.00");
                    //  $('#wotracking-table3-productiontotalduration').val("0.00");
                }
            });



        }

        //'*******************************************************************
        //'Title     :    cmdSplitDetail_Click
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.cmdSplitDetail_Click = function () {
            var WOID = "";
            if ($scope.selectedWOID.indexOf("-") != -1) {
                WOID = $scope.selectedWOID.substring(0, $scope.selectedWOID.indexOf("-"));
                console.log("cmdSplitDetail_Click", WOID);
            } else {
                WOID = $scope.selectedWOID;
            }

            var promiseArray1 = [];
            promiseArray1.push(
                           $http.post(config.baseUrlApi + 'HMLVTS/Generate_WOSplitDetail', {
                               'WOID': WOID
                           })
                       );

            $q.all(promiseArray1).then(function (response) {
                console.log("Generate_WOSplitDetail", response);
                document.getElementById("splitDetail-woid").innerHTML = WOID;
                if(response.length !=0 && response[0].data.success){
                    makeTableSplitDetail(response[0].data.result);
            }
                $("#splitDetailModal").modal('show');
            });


        }

        //'*******************************************************************
        //'Title     :    selectInput
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.selectInput = function (keyEvent) {
            if (keyEvent.which === 13){
               // alert('I am an alert');
                //$scope.selectedWOID = String($('#select_wotracking-woid option:selected').text()).trim();
                //  $("#select_wotracking-woid-input").val($scope.selectedWOID);
                var input = String($('#select_wotracking-woid-input').val()).trim();
                if (input != "" && !isNaN(input)) {
                    $scope.selectedWOID = input;
                    GenerateWOSummary();
                    case0();
                } else {
                    alert("Please enter correct work order, only numeric input allowed");
                }
        }
        }



        //testing function
        function ReCheck(woid) {
            console.log("ReCheck");
            load();
            $('#select_wotracking-woid-input').val(woid);
            $scope.selectedWOID = woid;
            GenerateWOSummary();
            case0();
        }

        //'*******************************************************************
        //'Title     :    SaveCompleteOK
        //'Function  :    
        //'Input     :
        //'Output    :
        //'Remark    :
        //'*******************************************************************
        $scope.SaveCompleteOK = function(){
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
                UpdateReceivedOKCase10();
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
                    var newReceived = parseInt(String($("#wotracking-newReceived").val()).trim());
                    UpdateReceivedOKCase10(newReceived);
                }
            }
            $('#updateReceiveModal').modal('toggle');



            $("wotracking-newReceived").val("");
        }


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

        function UpdateReceivedOKCase10(newReceived) {


            console.log("UpdateReceivedOKCase10 prev", "|"+$scope.PreviousRecQty+"|");
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
                   
                    CalculateDuration();
                   cmdUpdateReceived_ClickCase7();
                }
            }

        }

        $scope.preprocessConfirm = function () {
            $scope.ScrapQty = $("#preprocess-scrapQty").val();
            $("#preprocess-scrapQty").val("");

            if ($scope.ScrapQty == 0 || $scope.ScrapQty == "") { // to check to update frmPreProcessScrap.cs line 159 loops
                alert("Please enter the correct scrap qty"); 
            } else {
                var promiseArray1 = [];
                var promiseArray2 = [];
                var promiseArray3 = [];
                var currentdate = getCurrentDatetime();

                    promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/ScrapbutConfirm_Click2', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'WorkCenter': $scope.WorkCenter,
                                'RouteID':$scope.RouteID,
                                'ProcOpSeq': $scope.ProcOpSeq,
                                'OpSeq': $scope.OpSeq,
                                'ScrapQty': $scope.ScrapQty,
                                'Remark': String($('#select_preprocessremark option:selected').text()).trim(),//
                                'ScrapType': "PreProcess",
                                'ScrapDate': currentdate,
                                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                                'Status': "Pending"

                            })
                        );

                    $q.all(promiseArray1).then(function (response) {
                        console.log("ScrapbutConfirm_Click1", response);
                        console.log("ScrapbutConfirm_Click1 outstanding", $scope.OutstandingQty);

                        $scope.OutstandingQty = $scope.OutstandingQty - parseInt($scope.ScrapQty);
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/ScrapbutConfirm_Click3', {
                                'WOID': $scope.selectedWOIDData['woid'],
                                'AccumulatedScrapQty': $scope.ScrapQty,
                                'AccumulatedScrapDate': currentdate,
                                'OutstandingQty': $scope.OutstandingQty,
                                'OutstandingDate': currentdate

                            })
                        );

                        $q.all(promiseArray2).then(function (response) {
                            console.log("ScrapbutConfirm_Click3", response);
                            if (response.length != 0 && response[0].data.success) {
                                alert("Pre-process unaccountable scrap successfully added!");

                                $("#preprocessModal").modal('toggle');
                                CalculateDuration();
                                cmdUpdateReceived_ClickCase7();
                            }
                        });
                    });

            }





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

        //function getCurrentTime() {
        //    var currentdate = new getCurrentDatetime();
        //    var datetime = currentdate.getDate() + "/"
        //                    + (currentdate.getMonth() + 1) + "/"
        //                    + currentdate.getFullYear() + " "
        //                    + currentdate.getHours() + ":"
        //                    + currentdate.getMinutes() + ":"
        //                    + currentdate.getSeconds();
        //}

        //'*******************************************************************
        //'Title     :  setupStart
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :cmdSetupStart_Click in original code
        //'*******************************************************************
        $scope.setupStart = function () {
            //pause, resume stop grey

            console.log("btn clicked setup start");
            if ($scope.selectedWOID == "") {
                alert("Please enter Work Order");
            } else {
                setupStartCase1();
            }
        }

        //'*******************************************************************
        //'Title     :  setupPause
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.setupPause = function () {
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("setupPause case0.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("setupPause case0.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("setupPause case0.3");
                        setupPauseCase5();
                    } else {
                        console.log("setupPause case0.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });

            }
        }

        //'*******************************************************************
        //'Title     :  setupResume
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.setupResume = function () {
            if (String(config.AllowMultipleWO).toLowerCase() != "true") {
                if (String($scope.WOExecutionStatus).trim() != "ProcessingHold") {
                    if ($scope.fpSpreadQueuingWOList.length != 0) {
                        for (var i = 0; i < $scope.fpSpreadQueuingWOList.length; i++) {
                            if (String($scope.fpSpreadQueuingWOList['woStatus']).trim() == "ProcessingStart") {
                                alert("Another work order is processing on the same machine. ");
                                //productionResumeCase1();
                            }
                        }
                        setupResumeCase2();
                    } else {
                        setupResumeCase2();
                    }
                } else {
                    setupResumeCase2();
                }

            } else {
                setupResumeCase2();
            }
        }

        //'*******************************************************************
        //'Title     :  setupStop
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.setupStop = function () {
            console.log("setupStop");

            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                productionStopCase10();
            } else{
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("setupStop1.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("setupStop1.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("setupStopCase1.3");
                        setupStopCase5();
                    } else {
                        console.log("setupStopCase1.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });
            }
        }
        }


        //'*******************************************************************
        //'Title     :  productionStart
        //'Function  :  record time  when production pause
        //'Input     :  require Operator ID and pause reason
        //'Output    :  add pause production time into operation table
        //'Remark    :
        //'*******************************************************************
        $scope.productionStart = function () {
            console.log("btn clicked production start");
            // alert("t");
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("productionStart case0.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("productionStart case0.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("productionStart case0.3");
                        productionStartCase5();
                    } else {
                        console.log("productionStart case0.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });

            }

        }

        //'*******************************************************************
        //'Title     :  productionPause
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :cmdProductionPause_Click
        //'*******************************************************************
        $scope.productionPause = function () {
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("productionPause case0.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("productionPause case0.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("productionPause case0.3");
                        productionPauseCase5();
                    } else {
                        console.log("productionPause case0.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });

            }
        }

        //'*******************************************************************
        //'Title     :  productionResume
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :cmdProductionResume_Click
        //'*******************************************************************
        $scope.productionResume = function () {
            if (String(config.AllowMultipleWO).toLowerCase() != "true") {
                if (String($scope.WOExecutionStatus).trim() != "ProcessingHold") {
                    if ($scope.fpSpreadQueuingWOList.length != 0) {
                        for (var i = 0; i < $scope.fpSpreadQueuingWOList.length; i++) {
                            if (String($scope.fpSpreadQueuingWOList['woStatus']).trim() == "ProcessingStart") {
                                alert("Another work order is processing on the same machine. ");
                                //productionResumeCase1();
                            }
                        }
                        productionResumeCase2();
                    } else {
                        productionResumeCase2();
                    }
                } else {
                    productionResumeCase2();
                }

            } else {
                productionResumeCase2();
            }
        }

        //'*******************************************************************
        //'Title     :  productionStop
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.productionStop = function () {
            console.log("productionStop");
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("productionStop1.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("productionStop1.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("productionStopCase1.3");
                        productionStopCase5();
                    } else {
                        console.log("productionStopCase1.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });
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

            var select_WOID = $('#select_wotracking-woid option:selected').text();
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();
            // alert(select_WOID);
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": select_WOID
            })
         );



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




            $q.all(promiseArray2).then(function (response) {
                console.log("GenerateWOSummary2", response);
                if (response.length != 0) {
                    if (response[0].data.success  && response[0].data.result.length != 0) {
                        AssignGlobalVariable();
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
        //'Title     :  pausereasonselected
        //'Function  :  toggle when woid is changed from the selector
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.pausereasonselected = function () {
            var reason = String($('#select_wotracking-pausereason option:selected').text()).trim();
            $("#select_wotracking-pausereason-input").val(reason);
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

            $scope.selectedWOID = String($('#select_wotracking-woid option:selected').text()).trim();
            $("#select_wotracking-woid-input").val($scope.selectedWOID);
            if (String($('#select_wotracking-woid option:selected').text()).trim() != "") {
                GenerateWOSummary();
                case0();
            }

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

        function case0() {
            console.log("case0");
          //  var select_WOID = $('#select_wotracking-woid option:selected').text();
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();
            var propopseq = findSelectorFullInfo(select_WOID)['procOpSeq'];
            $scope.OrderType = findSelectorFullInfo(select_WOID)['orderType'];

            console.log("$scope.OrderType", $scope.OrderType);

            $scope.select_WOID = select_WOID;
            //  $scope.propopseq = propopseq;
            //  UpdateQtyFromPreviousProcOpSeq();

            console.log("test", propopseq);


            //todo: check if OrderType is "Assembly", then
            //GrpWorkOrderInforAssembly.Visible = true;
            //GrpWorkOrderInfor.Visible = false; line2000



            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/comboWO_Selected_wotraking', {
                'WOID': select_WOID,
                'procOpSeq': propopseq

            })
         );

            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GetGetSalesID', {
                'WOID': select_WOID
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("comboWO_Selected_wotraking", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length!=0) {
                        $scope.selectedWOIDData = response[0].data.result[0];


                       // CheckAnyChildNotCompleted1('2017060001');



                        //**assign variable
                        AssignGlobalVariable();

                        //pre-generate $scope.fnCheckPriorityConfigVar
                        fnCheckPriorityConfig();

                        console.log("$scope.selectedWOIDData", $scope.selectedWOIDData);
                        case5();//line 2078
                        } 
                    //else {
                    //    alert("ERROR:comboWO_Selected_wotraking");
                    //}
                } else {
                    //prompt for wrong WOID line
                    alert("Please enter a valid work order number");
                    RefreshData();
                }
            });

            $q.all(promiseArray2).then(function (response) {
                console.log("GetGetSalesID", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        $scope.PPID = response[0].data.result[0]["ppid"];
                        $scope.SalesOrderID = response[0].data.result[0]["salesOrderID"];
                        $scope.ReleasedDate = response[0].data.result[0]["releasedDate"];
                    }
                }
            });


        }

        function case5() {
            console.log("case5");
            // disableDiv("setup-row", true);
            //todo to check line2094 to line 2121
            //   var fnTrackSetupConfig = true;
            //  fnTrackSetupConfig = fnTrackSetupConfig();//to check  this function at line 9396, the store procedure table does not exist

            //var promiseArray = fnTrackSetupConfig();
            //var fnTrackSetupConfigVar = false;
            //                $q.all(promiseArray).then(function (response) {
            //                    console.log("UpdateQtyFromPreviousProcOpSeq2", response);
            //                    if (response.length != 0) {
            //                        if (response[0].data.success) {
            //                            if (response[0].data.result[0]['TrackSetup']) {
            //                                //return true;
            //                                console.log("fnTrackSetupConfig1");
            //                                fnTrackSetupConfigVar = true;
            //                            } else {
            //                                console.log("fnTrackSetupConfig2");
            //                                fnTrackSetupConfigVar = false;
            //                            }
            //                        }
            //                        // response[0].data.result[0][]
            //                    }
            //                });
            console.log("fnTrackSetupConfig3", $scope.fnTrackSetupConfigVar);
            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                //todo swop position
                // swopDiv("setup-start", "production-start");
                //$("#setup-row-2").show();
                //$("#setup-row-3").hide();
                //$("#setup-row-4").hide();
                //$("#setup-row-5").hide();
                //$("#production-row-2").hide(); //todo: make it better in ui

                $("#setup-row-2").show();
                $("#setup-row-3").hide();
                $("#setup-row-4").hide();
                $("#setup-row-5").hide();
                $("#production-row-2").hide();



            } else {
                $("#setup-row-2").show();
                $("#setup-row-3").hide();
                $("#setup-row-4").hide();
                $("#setup-row-5").hide();
                $("#production-row-2").hide();
                $("#production-row-3").hide();
                $("#production-row-4").hide();
                $("#production-row-5").hide();
            }
            console.log("$scope.QtyUpdated", $scope.QtyUpdated);
            if ($scope.QtyUpdated == null || $scope.QtyUpdated == "") {
                $scope.QtyUpdated = 0;
            }



            console.log("test $scope.QtyUpdated", $scope.QtyUpdated);
            console.log("test $scope.ProcOpSeq", $scope.ProcOpSeq);
            //QtyUpdated = 0 -- first op seq
            //QtyUpdated = 1 -- get from previous op seq or from split
            //QtyUpdated = 2 -- received qty updated
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
                                            'WOID': $scope.select_WOID

                                        })
                                    );

                                    $q.all(promiseArray21).then(function (response) {
                                        console.log("UpdateQtyFromPreviousProcOpSeq2", response);
                                        //if()
                                        case0();

                                    });
                                }
                            } else {
                                case0();
                            }

                        });






                            //////////////



                        //else {
                        //    RefreshData();
                        //}
                    } else {
                        case10();
                    }
                } else {
                    case10();
                }
            } else {
                case10();
            }

            //if (config.DefaultCompletedQty) {
            //    if (config.skipCompletedQty) {

            //      //  var completedQty
            //        document.getElementById("WIP-td6_1").innerHTML = ""
            //    } else {
            //        case6
            //    }

            //}
        }

        function case6() {

        }

        function case10() {
            console.log("case10");
            console.log("$scope.McType", $scope.McType);
            if (String($scope.McType).trim().toLowerCase() == "inhouse") {
                console.log("case10 inhouse");
                //todo, the following 3 lines 2167-2169
                //GrpSubConExecution.Visible = false;
                //GrpInHouseExecution.Visible = true;
                //btnApprovedOperation.Visible = true;
                $("#wo-tracking-approve").css("display", "block");
                $("#none-subcon-control").show();
                $("#subcon-control").hide();
                case20(); //display
            } else { // to debug, if $scope.McType != inhouse
                //todo display subcon WOEXecution group frame, line 2176,2177
                //GrpInHouseExecution.Visible = false;
                //GrpSubConExecution.Visible = true;
                console.log("case10 test", $scope.SendOutDate + " " + $scope.ReceivedDate);
                if ($scope.SendOutDate != null && $scope.ReceivedDate != null) {
                    //todo line2182
                    // btnApprovedOperation.Visible = false;
                    $("#wo-tracking-approve").css("display", "none");
                } else {
                    //todo line2186
                    //btnApprovedOperation.Visible = true;
                    $("#wo-tracking-approve").css("display", "block");
                }

                $("#none-subcon-control").hide();
                $("#subcon-control").show();
                case30();
            }

        }

        function case20() {
            console.log("case20");
            console.log("config.BypassCheckPassword", config.BypassCheckPassword);
            if (!config.BypassScanOperator) {
                $("#wotracking-table3-loginName").val("");
            }
            GenerateWOSummary();
            CheckWOOpnStatus();
            case40();


        }

        function case30() {
            console.log("case30");
            if (!config.BypassScanOperator) {
                $("#wotracking-table3-loginName").val("");
            }
            GenerateWOSummary();
            CheckSubconWOOpnStatus();
            case40();
        }

        function case40() {
            console.log("case40");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                GlobalGenerateWODetail();
                GlobalGenerateWOMaterial();
            } else {
                GlobalGenerateWODetail();
                GlobalGenerateWOMaterial(); //to check what is diff btw fpSpreadWorkOrderDetailAssembly & fpSpreadWorkOrderDetail
            }

            $("#wotracking-table2-work").val($scope.WorkCenter);
            $("#wotracking-table2-machine").val($scope.McID);
            $("#wotracking-table2-machineType").val($scope.McType);
            $("#wotracking-table2-opseq").val($scope.ProcOpSeq);
            $("#select_wotrackingremark").val($scope.Remark);


            GenerateWOSummaryScrap();
            //to check, assign to comboMCList line 2245
            console.log("case40 type", $scope.OrderType);
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {// to check, this can be combined to the loop above
                GenerateSubAssemblyWOList();
            } else {
                $("#subAssembly").css("display", "none");
            }

            var remark = String(document.getElementById("table1-td4").innerHTML).trim();
            if (remark != "") {
                alert(remark);
            }
            GenerateQueuingWOList($scope.McID);
            if ($("#wo-tracking-updatereceive").css('display') != "none") {
                if (config.BypassReceivedQty) {
                    console.log("case40.1");
                    $scope.cmdUpdateReceived_Click();
                }
            } else {
                if (String($scope.McType).trim().toLowerCase() == "inhouse") {
                    if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                        if ($("#setup-row-2").css("display") != "none") {
                            if (config.BypassExecutionStart) {
                                console.log("case40.2");
                                $scope.setupStart();
                            }
                        } else if ($("#setup-row-5").css("display") != "none") {
                            if (config.BypassExecutionStop) {
                                console.log("case40.3");
                                $scope.setupStop();
                            }
                        }
                    } else {
                        if ($("#setup-row-2").css("display") != "none") {
                            if (config.BypassExecutionStart) {
                                console.log("case40.4");
                                $scope.setupStart();
                            }
                        } else if ($("#setup-row-5").css("display") != "none") {
                            if (config.BypassExecutionStop) {
                                console.log("case40.5");
                                $scope.setupStop();
                            }
                        } else if ($("#production-row-2").css("display") != "none") {
                            if (config.BypassExecutionStop) {
                                console.log("case40.6");
                                $scope.productionStart();
                            }
                        } else if ($("#production-row-5").css("display") != "none") {
                            if (config.BypassExecutionStop) {
                                console.log("case40.7");
                                $scope.productionStop();
                            }
                        }
                    }
                } else {
                    console.log("case40.8");
                    //to check tocheck line2330, probably removed already

                }
            }
        }

        //'*******************************************************************
        //'Title     :  cmdConfirm_Click
        //'Function  :  record sendout or received date 
        //'Input     :  require Operator ID
        //'Output    :  a
        //'Remark    :  
        //'*******************************************************************
        $scope.cmdConfirm_Click = function () {
           // $scope.selectedWOID = String($('#select_wotracking-woid option:selected').text()).trim();
            $scope.select_WOID = String($('#select_wotracking-woid-input').val()).trim();
            if ($scope.selectedWOID != "") {
                var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
                var password = String($("#wotracking-table3-password").val()).trim();
                if (operatorName == "" || password == "") {
                    console.log("cmdConfirm_Click1");
                    alert("Please enter Operator Name or scan Operator ID");
                } else {
                    console.log("cmdConfirm_Click2");
                    var promiseArray1 = ValidateOperatorName(false);
                    console.log("ValidateOperatorName", promiseArray1);
                    $q.all(promiseArray1).then(function (response) {
                        console.log("Token/GetToken", response);
                        if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                            console.log("cmdConfirm_Click3");

                            var isreceive = String(document.getElementById('WIP-td5_1').innerHTML).trim();
                            if (isreceive != "") {
                            cmdConfirm_ClickCase8();
                        } else{
                            alert("Please update received qty!");
                        }
                        } else {
                            console.log("cmdConfirm_Click4");
                            $("#wotracking-table3-operatorName").val("");
                            $("#wotracking-table3-password").val("");
                        }
                    });
                }
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_Click
        //'Function  :  update received qty
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.cmdUpdateReceived_Click = function() {
            //todo
            //if (String($scope.McType).trim() == "inhouse") {
            //    var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            //    var password = String($("#wotracking-table3-password").val()).trim();
            //    if (operatorName == "" || password == "") {
            //        console.log("cmdUpdateReceived_ClickCase1.1");
            //        alert("Please enter Operator Name or scan Operator ID");
            //    } else {
            //        console.log("cmdUpdateReceived_ClickCase1.2");

            //        var promiseArray1 = ValidateOperatorName(false);
            //        console.log("ValidateOperatorName", promiseArray1);
            //        $q.all(promiseArray1).then(function (response) {
            //            console.log("Token/GetToken", response);
            //            if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
            //                console.log("cmdUpdateReceived_ClickCase1.3");
            //                cmdUpdateReceived_ClickCase2();
            //            } else {
            //                console.log("cmdUpdateReceived_ClickCase1.4");
            //                $("#wotracking-table3-operatorName").val("");
            //                $("#wotracking-table3-password").val("");
            //            }
            //        });


            //    }
            //} else {
            //    //todo: line8310
            //    var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            //    var password = String($("#wotracking-table3-password").val()).trim();
            //    if (operatorName == "" || password == "") {
            //        console.log("cmdUpdateReceived_ClickCase1.5");
            //        alert("Please enter Operator Name or scan Operator ID");
            //    } else {
            //        console.log("cmdUpdateReceived_ClickCase1.6");
            //        var promiseArray1 = ValidateOperatorName(false);
            //        console.log("ValidateOperatorName", promiseArray1);
            //        $q.all(promiseArray1).then(function (response) {
            //            console.log("Token/GetToken", response);
            //            if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
            //                console.log("cmdUpdateReceived_ClickCase1.7");
            //                cmdUpdateReceived_ClickCase2();
            //            } else {
            //                console.log("cmdUpdateReceived_ClickCase1.8");
            //                $("#wotracking-table3-operatorName").val("");
            //                $("#wotracking-table3-password").val("");
            //            }
            //        });
            //    }
            //}
            var ReceivedQty = 0;
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim()!="") {
                ReceivedQty = parseInt(String(document.getElementById("WIP-td9_1").innerHTML).trim());
            }
            //else {
            //    ReceivedQty = parseInt((document.getElementById('WIP-td2_1').innerHTML).trim()) - parseInt((document.getElementById('WIP-td7_1').innerHTML).trim())
            //}
            

            console.log("ReceivedQty", ReceivedQty);
            $("#wotracking-newReceived").val(ReceivedQty);
            $("#wotracking-currentReceived").val(ReceivedQty);

            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
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
                        cmdUpdateReceived_ClickCase2();
                    } else {
                        console.log("cmdUpdateReceived_ClickCase1.8");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });
            }

        }


        //'*******************************************************************
        //'Title     :  CalculateDuration
        //'Function  :  calculate estimated production duration 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function CalculateDuration() {
            console.log("CalculateDuration");

            var timeperunit;
            var Duration;

            var promiseArray1 = [];
            var promiseArray2 = [];
            if ($scope.McType == "Subcon") {
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateDuration1', {
                        "PartID": $scope.PartID,
                        "WorkCenter": $scope.WorkCenter,
                        "McID":$scope.McID,
                        "RouteID": $scope.RouteID,
                        "OpSeq": $scope.OpSeq

                    }
                )
                );
            } else {
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateDuration2', {
                        "PartID": $scope.PartID,
                        "WorkCenter": $scope.WorkCenter,
                        "McID": $scope.McID,
                        "RouteID": $scope.RouteID,
                        "OpSeq": $scope.OpSeq
                    }
                )
                );
            }


            $q.all(promiseArray1).then(function (response) {
                console.log("CalculateDuration", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    if (response[0].data.result[0]["prod_unit"] == undefined || response[0].data.result[0]["prod_unit"]== null) {
                        timeperunit = 1;
                    } else {
                        timeperunit = response[0].data.result[0]["prod_unit"];
                    }

                    $scope.WOGlobalWOReceivedQty = String(document.getElementById("WIP-td5_1").innerHTML).trim();
                    if ($scope.WOGlobalWOReceivedQty == "" || $scope.WOGlobalWOReceivedQty == "0") {
                        $scope.WOGlobalWOReceivedQty = 1;
                    }

                    if ($scope.McType == "Subcon") {
                        Duration = timeperunit;
                        console.log("CalculateDuration timeperunit1", timeperunit);
                        //to do to contiune： line8997
                        $("#wotracking-table2-duration").val("0.00");
                    } else {
                        //todo: to continue:line 9009

                        console.log("CalculateDuration timeperunit2", timeperunit);
                        console.log("CalculateDuration timeperunit3", $scope.WOGlobalWOReceivedQty);
                        $("#wotracking-table2-duration").val($scope.WOGlobalWOReceivedQty * timeperunit);
                    }

                    //todo： line 9014
                    promiseArray2.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateDuration3', {
                        "PlannedDuration": '',
                        "WOID": $scope.selectedWOIDData['woid'],
                        "WorkCenter": $scope.WorkCenter,
                        "ProcOpSeq": $scope.ProcOpSeq

                    }
                )
                );

                    $q.all(promiseArray2).then(function (response) {
                        console.log("CalculateDuration3", response);
                        if (response.length != 0 && response[0].data.success && response[0].data.length != 0) {

                        }
                    });
                } else {
                    if ($scope.McType == "Subcon") {
                        $("#wotracking-table2-duration").val("0.00");
                    } else {
                        $("#wotracking-table2-duration").val("0:0:0");
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

        function countOccurrance(s1, letter) {
            //console.log("CheckAnyChildNotCompletedOwn1.0", s1.match(new RegExp(letter, 'g')));
            //return s1.match(new RegExp(letter, 'g')).length;
            var array = s1.split(letter);
            if(array.length == 0){
                return 0;
            } else {
                return array.length - 1;
            }

        }

        function CheckAnyChildNotCompleted1() {
            // 
            var promiseArray1 = [];
            var parentwoid = '';


            //get the outermost ancester(parent of parent...)
            if (String($scope.selectedWOIDData['woid']).trim().indexOf('-') != -1) {
                parentwoid = String($scope.selectedWOIDData['woid']).trim().substring(0, String($scope.selectedWOIDData['woid']).trim().indexOf('-'));
            } else{
                parentwoid = String($scope.selectedWOIDData['woid']).trim();
            }

            promiseArray1.push(
           $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompletedOwn1', {
               "WOID": parentwoid
           }
           )
           );

            $q.all(promiseArray1).then(function (response) {
                console.log("CheckAnyChildNotCompletedOwn1", response);

                var maxCount = 0;
                if (response.length != 0 && response[0].data.success) {
                    for (var i = 0; i < response[0].data.result.length;i++){
                        var woid = response[0].data.result[i]['woid'];
                        var count = 0;

                        count = countOccurrance(woid, '-');
                        if(count > maxCount){
                            maxCount = count;
                        }
                        response[0].data.result[i]['count'] = count;
                       // response[0].data.result[i]['new-woStatus'] = "";
                    }

                }
                console.log("CheckAnyChildNotCompletedOwn1.1", response[0].data.result);
                console.log("CheckAnyChildNotCompletedOwn1.1 maxCount", maxCount);
                console.log("CheckAnyChildNotCompletedOwn2 all", response[0].data.result);

                        for (var j = maxCount; j > 0; j--) {
                            console.log("CheckAnyChildNotCompletedOwn2 count",j)
                            for (var i = 0; i < response[0].data.result.length; i++) {
                                if (maxCount != 0) {
                            if (response[0].data.result[i]['count'] == j - 1) {
                                var woid = response[0].data.result[i]['woid'];
                                //var parentwoid = woid.substring(0, woid.lastIndexOf(".")); //get the parent woid
                                console.log("CheckAnyChildNotCompletedOwn2 parentwoid", woid);

                                var allCompleted = true;
                                var allCount = 0;
                            for (var k = 0; k < response[0].data.result.length; k++) {
                                var woidtest = response[0].data.result[k]['woid'];
                                if (woidtest.indexOf(woid) !== -1  && response[0].data.result[k]['count'] == j) { // if all child woid completed
                                    allCount++;
                                    console.log("CheckAnyChildNotCompletedOwn2 childwoid", woidtest);
                                    if(String(response[0].data.result[k]['woStatus']).toLowerCase().trim() != "completed"){
                                        allCompleted = false;
                                    }
                                }

                            }
                            if (allCompleted && allCount != 0) {
                                response[0].data.result[i]['newwoStatus'] = 'Completed';
                            }
                            

                            
                            console.log("CheckAnyChildNotCompletedOwn2---------------");
                        }
                    }
                }
                }

                        console.log("CheckAnyChildNotCompletedOwn1.2", response[0].data.result);
                        $scope.RecursiveWOID = response[0].data.result;


                        for (var i = 0; i < response[0].data.result.length;i++){
                            if(String(response[0].data.result[i]['woStatus']).toLowerCase().trim() !="completed"  && response[0].data.result[i]['newwoStatus'] == 'Completed'){ // if previously not completed but now need to update

                                var promiseArray2 = [];
                                var promiseArray3 = [];
                                var promiseArray4 = [];
                                var promiseArray5 = [];



                                var promiseArray6 = [];
                                var promiseArray7 = [];
                                var promiseArray8 = [];
                                var promiseArray9 = [];
                                var promiseArray10 = [];
                                var promiseArray11 = [];
                                var promiseArray12 = [];
                                var promiseArray13 = [];
                                var promiseArray14 = [];


                                var promiseArray15 = [];
                                var promiseArray16 = [];
                                var promiseArray17 = [];
                                var promiseArray18 = [];
                                var promiseArray19 = [];
                                var promiseArray20 = [];
                                var promiseArray21 = [];
                                var promiseArray22 = [];
                                var promiseArray23 = [];
                                var promiseArray24 = [];


                                var promiseArray31 = [];
                                var promiseArray32 = [];
                                var promiseArray33 = [];
                                var promiseArray34 = [];



                                if (response[0].data.result[i]['woid'] == $scope.selectedWOIDData['woid']) {
                                    console.log("CheckAnyChildNotCompleted now updating to complete", response[0].data.result[i]['woid']);
                                }

                                $scope.tempWOID = String(response[0].data.result[i]['woid']).trim();
                                

                                if (true) {
                                    var currentdate = getCurrentDatetime();
                                    promiseArray2.push(
                                        $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompletedOwn2', {
                                            "WOID": $scope.tempWOID
                                        })
                                    );
                                    $q.all(promiseArray2).then(function (response1) {
                                        console.log("CheckAnyChildNotCompletedOwn2", 1);



                                      //  if (false) {
                                        if (response1.length != 0) {
                                            if (response1[0].data.success && response1[0].data.result.length != 0) {
                                               // console.log("here",String(response[0].data.result[0]["mcType"]).trim());
                                                $scope.tempProcOpSeq = response1[0].data.result[0]['procOpSeq'];


                                                if (String(response1[0].data.result[0]["mcType"]).trim() == "QC") {
                                                    console.log("CheckAnyChildNotCompleted loop1 qc");
                                                    if (response1[0].data.result[0]["setupStartDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop2 setupStartDate");
                                                        promiseArray3.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted3', {
                                                                "WOID": $scope.tempWOID,
                                                                'SetupStartDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray3).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted3", response);
                                                            promiseArray4.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray5.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray4).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray5).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);

                                                                    console.log("CheckAnyChildNotCompleted end1");


                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }

                                                    if (response1[0].data.result[0]["prodEndDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop3 prodEndDate");
                                                        promiseArray31.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted4', {
                                                                "WOID": $scope.tempWOID,
                                                                'ProdEndDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray31).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted4", response);
                                                            promiseArray15.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray16.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray15).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray16).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end2");
                                                                    //to insert here

                                                                });

                                                            });


                                                        });
                                                    }
                                                } else if (String(response1[0].data.result[0]["mcType"]).trim() == "Subcon") {
                                                    console.log("CheckAnyChildNotCompleted loop4 subcon");
                                                    if (response1[0].data.result[0]["sendOutDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop5 sendOutDate");
                                                        promiseArray32.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted5', {
                                                                "WOID": $scope.tempWOID,
                                                                'SendOutDate': currentdate,
                                                                'ReceivedDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray32).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted5", response);
                                                                promiseArray17.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray18.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray17).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray18).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end3");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    } else { 
                                                        console.log("CheckAnyChildNotCompleted loop6");
                                                        promiseArray3.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted6', {
                                                                "WOID": $scope.tempWOID,
                                                                'ReceivedDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray3).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted6", response);
                                                            promiseArray4.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed"
                                                                })
                                                            );

                                                            promiseArray5.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray4).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray5).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end3");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }
                                                } else {
                                                    //inhouse
                                                    if (response1[0].data.result[0]["setupStartDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop7 setupStartDate");
                                                        promiseArray31.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted7', {
                                                                "WOID": $scope.tempWOID,
                                                                'SetupStartDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq


                                                            })
                                                        );

                                                        $q.all(promiseArray31).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted7", response);
                                                            promiseArray15.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray16.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate,

                                                                })
                                                            );

                                                            $q.all(promiseArray15).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray16).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end5");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }



                                                    if (response1[0].data.result[0]["setupEndDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop8 setupEndDate");
                                                        promiseArray6.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted8', {
                                                                "WOID": $scope.tempWOID,
                                                                'SetupEndDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray6).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted8", response);
                                                            promiseArray17.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray18.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray17).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray18).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end6");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }

                                                    if (response1[0].data.result[0]["prodStartDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop9 prodStartDate");
                                                        promiseArray9.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted9', {
                                                                "WOID": $scope.tempWOID,
                                                                'ProdStartDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray9).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted9", response);
                                                            promiseArray10.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray11.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray10).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray11).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end7");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }

                                                    if (response1[0].data.result[0]["prodEndDate"] == null) {
                                                        console.log("CheckAnyChildNotCompleted loop10 prodEndDate");
                                                        promiseArray12.push(
                                                            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted10', {
                                                                "WOID": $scope.tempWOID,
                                                                'ProdEndDate': currentdate,
                                                                'ProcOpSeq': $scope.tempProcOpSeq
                                                            })
                                                        );

                                                        $q.all(promiseArray12).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted10", response);
                                                            promiseArray13.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'ProcOpSeq': $scope.tempProcOpSeq
                                                                })
                                                            );

                                                            promiseArray14.push(
                                                                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
                                                                    "WOID": $scope.tempWOID,
                                                                    'WOStatus': "Completed",
                                                                    'EndDate': currentdate
                                                                })
                                                            );

                                                            $q.all(promiseArray13).then(function (response) {
                                                            console.log("CheckAnyChildNotCompleted11", response);
                                                                $q.all(promiseArray14).then(function (response) {
                                                                    console.log("CheckAnyChildNotCompleted12", response);
                                                                    
                                                                    console.log("CheckAnyChildNotCompleted end8");
                                                                    //to insert here

                                                                });

                                                            });

                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }                              
                            } else if (String(response[0].data.result[i]['woStatus']).toLowerCase().trim() != "completed" && response[0].data.result[i]['newwoStatus'] != 'Completed') {
                                // if not still not completed
                                
                                if (response[0].data.result[i]['woid'] == $scope.selectedWOIDData['woid']) {
                                    console.log("CheckAnyChildNotCompleted still not complete");
                                }
                            
                            } else if (String(response[0].data.result[i]['woStatus']).toLowerCase().trim() == "completed") {
                                //if previously already completed
                                
                                if (response[0].data.result[i]['woid'] == $scope.selectedWOIDData['woid']) {
                                    console.log("CheckAnyChildNotCompleted already complete complete");
                                }
                            }
                        }




            });
        }

        ////'*******************************************************************
        ////'Title     :  CheckAnyChildNotCompleted
        ////'Function  :  check all child WOs competed  
        ////'Input     :  
        ////'Output    :  return the count of not completed child WOs
        ////'Remark    :  
        ////'*******************************************************************
        //function CheckAnyChildNotCompleted() {


        //    var promiseArray1 = [];
        //    var parentwoid = '';


        //    //get the outermost ancester(parent of parent...)
        //    if (String($scope.selectedWOIDData['woid']).trim().indexOf('-') != -1) {
        //        parentwoid = String($scope.selectedWOIDData['woid']).trim().substring(0, String($scope.selectedWOIDData['woid']).trim().indexOf('-'));
        //    } else{
        //        parentwoid = String($scope.selectedWOIDData['woid']).trim();
        //    }

        //    promiseArray1.push(
        //   $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompletedOwn1', {
        //       "WOID": parentwoid
        //   }
        //   )
        //   );

        //    $q.all(promiseArray1).then(function (response) {
        //        console.log("CheckAnyChildNotCompletedOwn1", response);

        //        var maxCount = 0;
        //        if (response.length != 0 && response[0].data.success) {
        //            for (var i = 0; i < response[0].data.result.length;i++){
        //                var woid = response[0].data.result[i]['woid'];
        //                var count = 0;

        //                count = countOccurrance(woid, '-');
        //                if(count > maxCount){
        //                    maxCount = count;
        //                }
        //                response[0].data.result[i]['count'] = count;
        //                // response[0].data.result[i]['new-woStatus'] = "";
        //            }

        //        }
        //        console.log("CheckAnyChildNotCompletedOwn1.1", response[0].data.result);
        //        console.log("CheckAnyChildNotCompletedOwn1.1 maxCount", maxCount);
        //        console.log("CheckAnyChildNotCompletedOwn2 all", response[0].data.result);

        //        for (var j = maxCount; j > 0; j--) {
        //            console.log("CheckAnyChildNotCompletedOwn2 count",j)
        //            for (var i = 0; i < response[0].data.result.length; i++) {
        //                if (maxCount != 0) {
        //                    if (response[0].data.result[i]['count'] == j - 1) {
        //                        var woid = response[0].data.result[i]['woid'];
        //                        //var parentwoid = woid.substring(0, woid.lastIndexOf(".")); //get the parent woid
        //                        console.log("CheckAnyChildNotCompletedOwn2 parentwoid", woid);

        //                        var allCompleted = true;
        //                        var allCount = 0;
        //                        for (var k = 0; k < response[0].data.result.length; k++) {
        //                            var woidtest = response[0].data.result[k]['woid'];
        //                            if (woidtest.indexOf(woid) !== -1  && response[0].data.result[k]['count'] == j) { // if all child woid completed
        //                                allCount++;
        //                                console.log("CheckAnyChildNotCompletedOwn2 childwoid", woidtest);
        //                                if(String(response[0].data.result[k]['woStatus']).toLowerCase().trim() != "completed"){
        //                                    allCompleted = false;
        //                                }
        //                            }

        //                        }
        //                        if (allCompleted && allCount != 0) {
        //                            response[0].data.result[i]['newwoStatus'] = 'Completed';
        //                        }

        //                        console.log("CheckAnyChildNotCompletedOwn2---------------");
        //                    }
        //                }
        //            }
        //        }

        //        console.log("CheckAnyChildNotCompletedOwn1.2", response[0].data.result);



        //    //todo: to complete, currently comment cos the structure is recursive

        //    return 0; //testing
        //    var promiseArray1 = [];
        //    var promiseArray2 = [];
        //    var promiseArray3 = [];
        //    var promiseArray4 = [];
        //    var promiseArray5 = [];
        //    var promiseArray6 = [];
            
        //    var currentdate = getCurrentDatetime();
        //    var CheckAnyChildNotCompletedCount = 0
        //    promiseArray1.push(
        //    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted1', {
        //        "WOID": $scope.selectedWOIDData['woid']
        //    }
        //    )
        //    );

        //    $q.all(promiseArray1).then(function (response) {
        //        console.log("CheckAnyChildNotCompleted1", response[0].data.result);
        //        if(response.length != 0){
        //            if (response[0].data.success && response[0].data.result.length != 0) {
        //                CheckAnyChildNotCompletedCount = response[0].data.result[0]['woCount'];
        //            }
        //        }
        //        if (CheckAnyChildNotCompletedCount == 0) {
        //            promiseArray2.push(
        //                $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted2', {
        //                    "WOID": $scope.selectedWOIDData['woid']
        //                })
        //            );
        //            $q.all(promiseArray2).then(function (response) {
        //                console.log("CheckAnyChildNotCompleted2", response[0].data.result);
        //                if (response.length != 0) {
        //                    if (response[0].data.success && response[0].data.result.length != 0) {
        //                        if (response[0].data.result[0]["mcType"] == "QC") {

        //                            if (response[0].data.result[0]["SetupStartDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted3', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'SetupStartDate':currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted3", response[0].data.result);

        //                                });
        //                            }

        //                            if (response[0].data.result[0]["ProdEndDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted4', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'ProdEndDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted4", response[0].data.result);

        //                                });
        //                            }
        //                        } else if (response[0].data.result[0]["mcType"] == "Subcon") {
        //                            if (response[0].data.result[0]["SendOutDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted5', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'SendOutDate': currentdate,
        //                                        'ReceivedDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted5", response[0].data.result);

        //                                });
        //                            } else {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted6', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'ReceivedDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted6", response[0].data.result);

        //                                });
        //                            }
        //                        } else {
        //                            //inhouse
        //                            if (response[0].data.result[0]["SetupStartDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted7', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'SetupStartDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted7", response[0].data.result);

        //                                });
        //                            }
        //                            if (response[0].data.result[0]["SetupEndDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted8', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'SetupEndDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted8", response[0].data.result);

        //                                });
        //                            }

        //                            if (response[0].data.result[0]["ProdStartDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted9', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'ProdStartDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted9", response[0].data.result);

        //                                });
        //                            }

        //                            if (response[0].data.result[0]["ProdEndDate"] == null) {
        //                                promiseArray3.push(
        //                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted10', {
        //                                        "WOID": $scope.selectedWOIDData['woid'],
        //                                        'ProdEndDate': currentdate
        //                                    })
        //                                );

        //                                $q.all(promiseArray3).then(function (response) {
        //                                    console.log("CheckAnyChildNotCompleted10", response[0].data.result);

        //                                });
        //                            }
        //                        }
        //                    }
        //                }
        //            });
        //        }

                
        //        //to continue
        //        promiseArray4.push(
        //            $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted11', {
        //                "WOID": $scope.selectedWOIDData['woid'],
        //                'WOStatus': "Completed"
        //            })
        //        );

        //        $q.all(promiseArray4).then(function (response) {
        //            console.log("CheckAnyChildNotCompleted11", response[0].data.result);

        //        });

        //        promiseArray5.push(
        //             $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted12', {
        //                 "WOID": $scope.selectedWOIDData['woid'],
        //                 'WOStatus': "Completed",
        //                 'EndDate': currentdate
        //             })
        //         );

        //        $q.all(promiseArray5).then(function (response) {
        //            console.log("CheckAnyChildNotCompleted12", response[0].data.result);

        //        });

        //        promiseArray6.push(
        //             $http.post(config.baseUrlApi + 'HMLVTS/CheckAnyChildNotCompleted13', {
        //                 "WOID": $scope.selectedWOIDData['woid']

        //             })
        //         );

        //        $q.all(promiseArray6).then(function (response) {
        //            console.log("CheckAnyChildNotCompleted13", response[0].data.result);

        //            //todo CheckAnyChildNotCompletedCount line 7450
        //        });


        //    });


       // }
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






            //    $http.post(config.baseUrlApi + 'HMLVTS/GlobalGenerateWODetail1', {
            //        "WOID":selectedWO
            //    })
            //.then(function (response) {
            //    //studentData = response.data.result;
            //    makeTable(response.data.result, "#pause-reason-table");
            //});

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
            $scope.Remark = String($scope.selectedWOIDData['remark']).trim();
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

        ////'****************************************************************************************************
        ////'Title     :  swopDiv
        ////'Function  :  swop position of 2 divs
        ////'Input     :  
        ////'Output    :  
        ////'Remark    :  
        ////'**************************************************************************************************
        //function swopDiv(div1,div2) {
        //    var div1 = jQuery('#' + div1);
        //    var div2 = jQuery('#' + div2);

        //    var tdiv1 = div1.clone();
        //    var tdiv2 = div2.clone();

        //    if (!div2.is(':empty')) {
        //        div1.replaceWith(tdiv2);
        //        div2.replaceWith(tdiv1);
        //    }
        //}

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

        //'****************************************************************************************************
        //'Title     :  CheckSubconWOOpnStatus
        //'Function  :  check WO operation status  
        //'Input     :  
        //'Output    :  state: 1=Job not start, 
        //'             4=Job send out, not return yet , 7=Job end
        //'Remark    :  
        //'**************************************************************************************************
        function CheckSubconWOOpnStatus() {
            var WOID = $scope.selectedWOIDData['woid'];
            var ProcOpSeq = $scope.ProcOpSeq;
            var WorkCenter = $scope.WorkCenter;

            var promiseArray1 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckSubconWOOpnStatus', {
                'WOID': WOID,
                'ProcOpSeq': ProcOpSeq,
                'WorkCenter': WorkCenter
            })
         );




            $q.all(promiseArray1).then(function (response) {
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['qtyUpdated'] == null || response[0].data.result[0]['qtyUpdated'] == "") {
                            $scope.QtyUpdated = 0;
                        } else {
                            $scope.QtyUpdated = response[0].data.result[0]['qtyUpdated'];
                        }

                        if (response[0].data.result[0]['sendOutDate'] == null && response[0].data.result[0]['receivedDate'] == null) {
                            console.log("CheckSubconWOOpnStatus loop1");
                            $scope.WOGlobalWOOpnState = 1;
                            $scope.WOGlobalSendOutDate = "";
                            $scope.WOGlobalReceivedDate = ""
                            CheckWOSubconOpnStatusAssign();
                        } else if (response[0].data.result[0]['sendOutDate'] != null && response[0].data.result[0]['receivedDate'] != null) {
                            console.log("CheckSubconWOOpnStatus loop2");
                            $scope.WOGlobalWOOpnState = 7;     //Job end
                            $scope.WOGlobalSendOutDate = String(response[0].data.result[0]["sendOutDate"]).trim();
                            $scope.WOGlobalReceivedDate = String(response[0].data.result[0]["receivedDate"]).trim();
                            CheckWOSubconOpnStatusAssign();
                        } else if (response[0].data.result[0]['sendOutDate'] != null && response[0].data.result[0]['receivedDate'] == null) {
                            console.log("CheckSubconWOOpnStatus loop3");
                            $scope.WOGlobalWOOpnState = 4;     //Job end
                            $scope.WOGlobalSendOutDate = String(response[0].data.result[0]["sendOutDate"]).trim();
                            $scope.WOGlobalReceivedDate = "";
                            CheckWOSubconOpnStatusAssign();
                        } else {
                            console.log("CheckSubconWOOpnStatus loop3");
                            $scope.WOGlobalWOOpnState = 0;
                            $scope.WOGlobalWOPauseReason = "";
                           // $scope.WOGlobalWOMcID = ""  //Multiple Operator
                            CheckWOSubconOpnStatusAssign();
                        }

                    }
                }

            });



            GenerateQueuingWOList($scope.McID);
            CalculateSubconTimeSpan();

        }


        //'*******************************************************************
        //'Title     :  CheckWOSubconOpnStatusAssign
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : xl 2017-12-11, splitted from original function CheckSubconWOOpnStatus line 6625 onwards due to different design of angularjs
        //'*******************************************************************
        function CheckWOSubconOpnStatusAssign() {
            console.log("CheckWOSubconOpnStatusAssign WOGlobalWOOpnState", $scope.WOGlobalWOOpnState);
            console.log("CheckWOSubconOpnStatusAssign WOGlobalReceivedDate", $scope.WOGlobalReceivedDate);
            console.log("CheckWOSubconOpnStatusAssign WOGlobalSendOutDate", $scope.WOGlobalSendOutDate);
            if (fnGetUserAccessRight(String($("#wotracking-table3-operatorName").val()).trim(), "TS_WOTracking")) {
                if ($scope.WOGlobalWOOpnState == 1) {  //Setup not start   now,now
                    $("#sendDateInput").prop("disabled", false);;
                    $("#receivedDateInput").attr('disabled', 'disabled');
                    $("#wo-tracking-confirm").show();

                    var d = new Date();
                   // d.setMonth(d.getMonth());
                    $(function () {
                        $('#sendDate').datetimepicker(
                            {
                                defaultDate: d,
                                disabledDates: [
                                    moment(d),
                                    d,
                                    d
                                ]
                            });


                        $('#receivedDate').datetimepicker({
                            defaultDate: moment(),
                            sideBySide: true
                        });
                    });

                    $("#wo-tracking-updatereceive").show();
                    $("#wo-tracking-update").hide();

                } else if ($scope.WOGlobalWOOpnState == 4) {  //job send out but not return yet
                    // $("#sendDate").hide();
                    $("#sendDateInput").attr('disabled', 'disabled');
                    $("#sendDate").css({ 'cursor': "default" });
                    $("#receivedDateInput").prop("disabled", false);
                    $("#wo-tracking-confirm").show();

                    var d = new Date();
                    var sendDate = new Date($scope.WOGlobalSendOutDate);
                    // var receiveDate = new Date($scope.WOGlobalReceivedDate);
                    
                    console.log("CheckWOSubconOpnStatusAssign dates", sendDate );
                    // console.log("CheckWOSubconOpnStatusAssign WOGlobalSendOutDate",$scope.WOGlobalSendOutDate)
                    //d.setMonth(d.getMonth() - 1);
                    $(function () {
                        $('#sendDate').datetimepicker(
                            {
                                defaultDate: sendDate,
                                disabledDates: [
                                    moment(sendDate),
                                    sendDate,
                                    sendDate
                                ]
                            });


                        $('#receivedDate').datetimepicker({
                            defaultDate: moment(d),
                            sideBySide: true
                        });
                    });

                    $("#wo-tracking-updatereceive").hide();
                    $("#wo-tracking-update").show();
                } else if ($scope.WOGlobalWOOpnState == 7) {  //job end
                    $("#sendDateInput").attr('disabled', 'disabled');
                    $("#receivedDateInput").attr('disabled', 'disabled');
                    $("#wo-tracking-confirm").show();

                    var d = new Date();
                    console.log("CheckWOSubconOpnStatusAssign WOGlobalSendOutDate1", $scope.WOGlobalSendOutDate)
                   // d.setMonth(d.getMonth() - 1);
                    $(function () {
                        $('#sendDate').datetimepicker(
                            {
                                defaultDate: d,
                                disabledDates: [
                                    moment(d),
                                    d,
                                    d
                                ]
                            });


                        $('#receivedDate').datetimepicker({
                            defaultDate: moment(),
                            sideBySide: true
                        });
                    });

                    $("#wo-tracking-updatereceive").hide();
                    $("#wo-tracking-update").show();
                }

                $("#wo-tracking-update").css("display", "none");
                if ($scope.QtyUpdated < 2) {
                    document.getElementById("WIP-td5_1").innerHTML = "";
                    document.getElementById("WIP-td5_2").innerHTML = "";
                    $("#wo-tracking-updatereceive").css("display", "block");
                } else {
                    $("#wo-tracking-updatereceive").css("display", "none");
                }

                if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                    $("#wo-tracking-splitdetail").show();
                } else {
                    $("#wo-tracking-splitdetail").hide();
                }
                $("#wo-tracking-onhold").css("display", "block");
                $("#wo-tracking-updatereceive").css("display", "block");
            }
        }

        //'****************************************************************************************************
        //'Title     :  CheckWOOpnStatus
        //'Function  :  check WO operation status  
        //'Input     :  
        //'Output    :  state: 1=Setup not start, 2=SetupRun,3=SetupPause
        //'             4=Setup complted but prodcuction not atart , 5=JobRun,6=JobPause, 7=Job end
        //'Remark    :  
        //'**************************************************************************************************
        function CheckWOOpnStatus() {
            var WOID = $scope.selectedWOIDData['woid'];
            var ProcOpSeq = $scope.ProcOpSeq;
            var WorkCenter = $scope.WorkCenter;

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus1', {
                'WOID': WOID,
                'ProcOpSeq': ProcOpSeq,
                'WorkCenter': WorkCenter
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CheckWOOpnStatus1", response);
                $scope.tempResponse = response;
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['qtyUpdated'] == null || response[0].data.result[0]['qtyUpdated'] == "") {
                            $scope.QtyUpdated = 0;
                        } else {
                            $scope.QtyUpdated = response[0].data.result[0]['qtyUpdated'];
                        }

                        if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) {
                            //line 2907
                            //   console.log("comboMCList", $scope.comboMCList);
                            if (response[0].data.result[0]['setupStartDate'] == null && response[0].data.result[0]['prodEndDate'] == null) {
                                console.log("CheckWOOpnStatus1 loop1");//job not start
                                $scope.WOGlobalWOOpnState = 1;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.McID;// to check, this is redundant to $scope.McID
                                CheckWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null && response[0].data.result[0]['prodEndDate'] != null) {
                                console.log("CheckWOOpnStatus1 loop2");
                                $scope.WOGlobalWOOpnState = 7;     //Job end
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = String(response[0].data.result[0]["mcID"]).trim();
                                CheckWOOpnStatusAssign();
                            } else {
                                console.log("CheckWOOpnStatus1 loop3");
                                console.log("$scope.selectedWOID", $scope.selectedWOID);

                                if(config.AllowMultipleOperator){
                                    promiseArray2.push(//here to continue
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus2_1', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter': WorkCenter,
                                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()
                                        })
                                    );
                                } else {
                                    promiseArray2.push(//here to continue
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus2', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter': WorkCenter
                                        })
                                    );
                                }


                                $q.all(promiseArray2).then(function (response) {
                                    console.log("CheckWOOpnStatus2", response);
                                    if (response.length != 0) {
                                        if (response[0].data.success && response[0].data.result.length != 0) {

                                            if (String(response[0].data.result[0]['startType']).trim() == "SetupStart" || String(response[0].data.result[0]['startType']).trim() == "SetupContinue") {
                                                console.log("CheckWOOpnStatus2.1");////SetupRun
                                                $scope.WOGlobalWOOpnState = 2;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;// to check, this is redundant to $scope.selectedWOID
                                                CheckWOOpnStatusAssign();
                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobStart" || String(response[0].data.result[0]['startType']).trim() == "JobContinue") {
                                                console.log("CheckWOOpnStatus2.2");
                                                $scope.WOGlobalWOOpnState = 5;     //Job end
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                console.log("$scope.McID", $scope.McID);
                                                CheckWOOpnStatusAssign();
                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobPause") {
                                                console.log("CheckWOOpnStatus2.3");
                                                $scope.WOGlobalWOOpnState = 6;     //Job Pauase
                                                $scope.WOGlobalWOPauseReason = String(response[0].data.result[0]['reason']).trim();
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();
                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobHold") {
                                                console.log("CheckWOOpnStatus2.4");
                                                $scope.WOGlobalWOOpnState = 9;     //Job onhold
                                                $scope.WOGlobalWOPauseReason = String(response[0].data.result[0]['reason']).trim();
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();
                                            } else {
                                                console.log("CheckWOOpnStatus2.5");
                                                $scope.WOGlobalWOOpnState = 0;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();
                                            }
                                        }
                                    } else {
                                        $scope.WOGlobalWOOpnState = 0;
                                        $scope.WOGlobalWOPauseReason = "";
                                        $scope.WOGlobalWOMcID = "";
                                        CheckWOOpnStatusAssign();
                                    }
                                });
                            }

                        } else {

                            console.log("CheckWOOpnStatus setup",response)
                            if (response[0].data.result[0]['setupStartDate'] == null &&
                                response[0].data.result[0]['setupEndDate'] == null &&
                                response[0].data.result[0]['prodStartDate'] == null &&
                                response[0].data.result[0]['prodEndDate'] == null) {
                                console.log("CheckWOOpnStatus setup1");
                                $scope.WOGlobalWOOpnState = 1;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.McID;
                                CheckWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null &&
                                response[0].data.result[0]['setupEndDate'] != null &&
                                response[0].data.result[0]['prodStartDate'] != null &&
                                response[0].data.result[0]['prodEndDate'] != null) {
                                console.log("CheckWOOpnStatus setup2");
                                $scope.WOGlobalWOOpnState = 7;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.McID;
                                CheckWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null &&
                                response[0].data.result[0]['setupEndDate'] != null &&
                                response[0].data.result[0]['prodStartDate'] == null &&
                                response[0].data.result[0]['prodEndDate'] == null) {
                                console.log("CheckWOOpnStatus setup3");
                                $scope.WOGlobalWOOpnState = 4; // to check : this part might need to change, current design is due to previous version swop production setup start button
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.McID;
                                CheckWOOpnStatusAssign();
                            } else {
                                console.log("CheckWOOpnStatus setup4");

                                if(config.AllowMultipleOperator){
                                    promiseArray3.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus3_1', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter': WorkCenter,
                                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()
                                    })
                                );
                                } else {
                                    promiseArray3.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus3', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter': WorkCenter
                                    })
                                );
                                }





                                $q.all(promiseArray3).then(function (response) {
                                    console.log("CheckWOOpnStatus3", response);
                                    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                                        if (true) {
                                            if (String(response[0].data.result[0]['startType']).trim() == "SetupStart" ||
                                                String(response[0].data.result[0]['startType']).trim() == "SetupContinue"
                                                ) {
                                                console.log("CheckWOOpnStatus3 loop1");
                                                $scope.WOGlobalWOOpnState = 2;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();


                                            } else if (String(response[0].data.result[0]['startType']).trim() == "SetupPause") {
                                                $scope.WOGlobalWOOpnState = 3;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();

                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobStart" ||
                                                String(response[0].data.result[0]['startType']).trim() == "JobContinue") {
                                                $scope.WOGlobalWOOpnState = 5;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();

                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobPause") {
                                                $scope.WOGlobalWOOpnState = 6;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();

                                            } else if (String(response[0].data.result[0]['startType']).trim() == "SetupHold" ) {
                                                $scope.WOGlobalWOOpnState = 8;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();

                                            } else if (String(response[0].data.result[0]['startType']).trim() == "JobHold") {
                                                $scope.WOGlobalWOOpnState = 9;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();

                                            } else {
                                                console.log("CheckWOOpnStatus3 loop0.1");
                                                $scope.WOGlobalWOOpnState = 0;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.McID;
                                                CheckWOOpnStatusAssign();
                                            }
                                        }
                                    } else {
                                        console.log("CheckWOOpnStatus3 loop0.2");


                                        //todotodo:check v5 line 3188  to check

                                        if($scope.tempResponse[0].data.result[0]['setupStartDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['setupEndDate'] == null &&
                                            $scope.tempResponse[0].data.result[0]['prodStartDate'] == null &&
                                            $scope.tempResponse[0].data.result[0]['prodEndDate'] == null
                                            ) {
                                            $scope.WOGlobalWOOpnState = 10;//Setup start not complete
                                            $scope.WOGlobalWOMcID = $scope.McID;
                                            CheckWOOpnStatusAssign();
                                        } else if ($scope.tempResponse[0].data.result[0]['setupStartDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['setupEndDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['prodStartDate'] == null &&
                                            $scope.tempResponse[0].data.result[0]['prodEndDate'] == null//Setup complete,Job not start 
                                            
                                            ){
                                            $scope.WOGlobalWOOpnState = 11;
                                            $scope.WOGlobalWOMcID = $scope.McID;
                                            CheckWOOpnStatusAssign();
                                        } else if ($scope.tempResponse[0].data.result[0]['setupStartDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['setupEndDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['prodStartDate'] != null &&
                                            $scope.tempResponse[0].data.result[0]['prodEndDate'] == null//setup complete,Job start not complete 

                                            ) {
                                            $scope.WOGlobalWOOpnState = 12;
                                            $scope.WOGlobalWOMcID = $scope.McID;
                                            CheckWOOpnStatusAssign();
                                        } else {
                                            $scope.WOGlobalWOOpnState = 0;
                                            $scope.WOGlobalWOPauseReason = "";
                                            $scope.WOGlobalWOMcID = "";
                                            CheckWOOpnStatusAssign();
                                        }
                                    }
                                });
                            }
                        }


                    }
                }
            });


            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) {//if bypass setup

                //swop position todo line3415 to line3451
                //Point cmdSetupStartlocation = cmdSetupStart.Location;
                //int xcmdSetupStartLocation = cmdSetupStart.Location.X;
                //int ycmdSetupStartLocation = cmdSetupStart.Location.Y;
                //Point cmdProductionStartlocation = cmdProductionStart.Location;
                //int xcmdProductionStartLocation = cmdProductionStart.Location.X;
                //int ycmdProductionStartLocation = cmdProductionStart.Location.Y;
                console.log("bypass setup");
            } else {
                console.log("not bypass setup");
                CalculateTimeSpan("Setup");
            }
            //if (!fnTrackSetupConfig() || config.BypassSetup) {
            //    CalculateTimeSpan("Setup");
            //}


            GenerateQueuingWOList($scope.McID);

        }

        //'*******************************************************************
        //'Title     :  CheckWOOpnStatusAssign
        //'Function  :  check for status to toggle buttons
        //'Input     :  
        //'Output    : 
        //'Remark    : xl 2017-11-22, splitted from original function CheckWOOpnStatus line 3103 onwards due to different design of angularjs
        //'*******************************************************************
        function CheckWOOpnStatusAssign() {
            //todo: line 3103 - 3110


            //create pause reason value
            var myDiv = document.getElementById("select_wotracking-pausereason");
            var option = document.createElement("option");
            $(option).attr('disabled', 'disabled');
            option.text = String($scope.WOGlobalWOPauseReason).trim();
            $(myDiv).prop("disabled", false);
            


            var promiseArray1 = fnGetUserAccessRight(authService.currentUser.userName, "TS_WOTracking");
            $q.all(promiseArray1).then(function (response) {
                console.log("fnGetUserAccessRight", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        if (response[0].data.result[0]['column1'] > 0) {
                            if ($scope.WOGlobalWOOpnState == 1)    //Setup not start
                            {
                                console.log("WOGlobalWOOpnState loop1");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();

                                if (config.BypassApproval) { //to check tocheck line3125 GlobalVar.WOGlobalOnHoldBypassApproved
                                    $("#wo-tracking-onhold").css("display", "block");
                                } else {
                                    //to check tocheck line3136 comboPauseReasonList.Enabled = false;
                                    $("#wo-tracking-onhold").css("display", "none");
                                }
                                $("#setup-row-2").show();

                                console.log("WOGlobalWOOpnState loop1 qty", $scope.QtyUpdated);
                                if ($scope.QtyUpdated < 2) {
                                    $scope.PreviousRecQty = document.getElementById("WIP-td5_1").innerHTML;
                                    document.getElementById("WIP-td5_1").innerHTML = "";
                                    document.getElementById("WIP-td5_2").innerHTML = "";
                                    $("#wo-tracking-updatereceive").css("display", "block");
                                } else {
                                    $("#wo-tracking-updatereceive").css("display", "none");
                                }
                                $("#wo-tracking-update").css("display", "none");
                                
                            } else if ($scope.WOGlobalWOOpnState == 2) {//Setup run or continue
                                console.log("WOGlobalWOOpnState loop2");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").show();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").show();
                                //pause reason
                                $("#select_wotracking-pausereason").val("");
                                $("#select_wotracking-pausereason-input").val("");
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();
                                $("#wo-tracking-updatereceive").css("display", "block");
                                $("#wo-tracking-update").css("display", "block");
                            } else if ($scope.WOGlobalWOOpnState == 3) {//Setup pause
                                console.log("WOGlobalWOOpnState loop3");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").show();
                                $("#setup-row-5").show();
                                //pause reason

                                $("#select_wotracking-pausereason").val($scope.WOGlobalWOPauseReason);
                                $("#select_wotracking-pausereason-input").val($scope.WOGlobalWOPauseReason);
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();
                                $("#wo-tracking-updatereceive").css("display", "block");
                                $("#wo-tracking-update").css("display", "block");
                            } else if ($scope.WOGlobalWOOpnState == 4) {//job not start
                                console.log("WOGlobalWOOpnState loop4");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                $("#select_wotracking-pausereason").val("");
                                $("#select_wotracking-pausereason-input").val("");
                                $("#production-row-2").show();
                                $("#production-row-3").show();
                                $("#production-row-4").show();
                                $("#production-row-5").show();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved line 3215
                                    $("#wo-tracking-onhold").css("display", "block");
                                } else {
                                    $("#wo-tracking-onhold").css("display", "none");
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");
                                $("#wo-tracking-update").css("display", "none");
                            } else if ($scope.WOGlobalWOOpnState == 5) {//Job run or continue
                                console.log("WOGlobalWOOpnState loop5");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                $("#select_wotracking-pausereason").val("");
                                $("#select_wotracking-pausereason-input").val("");
                                $("#production-row-2").hide();
                                $("#production-row-3").show();
                                $("#production-row-4").hide();
                                $("#production-row-5").show();
                                $("#wo-tracking-updatereceive").css("display", "none");
                                $("#wo-tracking-onhold").css("display", "block");
                                $("#wo-tracking-update").css("display", "block");
                            } else if ($scope.WOGlobalWOOpnState == 6) {//Job pause
                                console.log("WOGlobalWOOpnState loop6");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                // console.log("WOGlobalWOOpnState loop6 reason",$scope.WOGlobalWOPauseReason);
                                // $("div.select_wotracking-pausereason select").val($scope.WOGlobalWOPauseReason);
                                //assign pause reason
                                $(option).attr('selected', 'selected');
                                myDiv.appendChild(option);
                                $("#select_wotracking-pausereason-input").val($scope.WOGlobalWOPauseReason);

                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").show();
                                $("#production-row-5").show();
                                $("#wo-tracking-updatereceive").css("display", "none");
                                $("#wo-tracking-update").css("display", "block");
                                document.getElementById("wo-tracking-onhold").display = "block";
                            } else if ($scope.WOGlobalWOOpnState == 7) {//job end
                                console.log("WOGlobalWOOpnState loop7");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                //$("#select_wotracking-pausereason").val("Job End");
                                //assign pause reason
                                option.text = "Job End";
                                $(option).attr('selected', 'selected');
                                myDiv.appendChild(option);
                                $(myDiv).attr('disabled', 'disabled');
                                $("#select_wotracking-pausereason-input").val($scope.WOGlobalWOPauseReason);
                                $("#select_wotracking-pausereason-input").prop("disabled", true);

                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved 
                                    document.getElementById("wo-tracking-onhold").display = "block";
                                    $("#select_wotracking-pausereason").prop("readonly", false);
                                    $("#select_wotracking-pausereason-input").prop("disabled", false);
                                } else {
                                    document.getElementById("wo-tracking-onhold").display = "none";
                                    $("#select_wotracking-pausereason").prop("readonly", true);
                                    $("#select_wotracking-pausereason-input").prop("disabled", true);
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "block");
                            } else if ($scope.WOGlobalWOOpnState == 8) {//setup onhold
                                console.log("WOGlobalWOOpnState loop8");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").show();
                                $("#setup-row-5").hide();
                                //pause reason
                                //assign pause reason
                                $(option).attr('selected', 'selected');
                                myDiv.appendChild(option);
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved 
                                    document.getElementById("wo-tracking-onhold").display = "block";
                                    $("#select_wotracking-pausereason").prop("readonly", false);
                                    $("#select_wotracking-pausereason-input").prop("disabled", false);
                                } else {
                                    document.getElementById("wo-tracking-onhold").display = "none";
                                    $("#select_wotracking-pausereason").prop("readonly", true);
                                    $("#select_wotracking-pausereason-input").prop("disabled", true);
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "none");

                            } else if ($scope.WOGlobalWOOpnState == 9) {//job onold
                                console.log("WOGlobalWOOpnState loop9");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                //assign pause reason
                                $(option).attr('selected', 'selected');
                                myDiv.appendChild(option);
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").show();
                                $("#production-row-5").hide();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved 
                                    document.getElementById("wo-tracking-onhold").display = "block";
                                    $("#select_wotracking-pausereason").prop("readonly", false);
                                    $("#select_wotracking-pausereason-input").prop("disabled", false);
                                } else {
                                    document.getElementById("wo-tracking-onhold").display = "none";
                                    $("#select_wotracking-pausereason").prop("readonly", true);
                                    $("#select_wotracking-pausereason-input").prop("disabled", true);
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "none");

                            } else if ($scope.WOGlobalWOOpnState == 10) {//setup start not complete  //Multiple Operator
                                console.log("WOGlobalWOOpnState loop10");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").show();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").show();

                                //document.getElementById("wo-tracking-onhold").display = "block";
                                $("#select_wotracking-pausereason").prop("readonly", false);
                                $("#select_wotracking-pausereason-input").prop("disabled", false);
                                $("#select_wotracking-pausereason-input").val("");

                                $("#production-row-2").show();
                                $("#production-row-3").show();
                                $("#production-row-4").show();
                                $("#production-row-5").show();

                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "block");
                                $("#wo-tracking-onhold").css("display", "block");



                            } else if ($scope.WOGlobalWOOpnState == 11) {//setup complete, job not start not //Multiple Operator
                                console.log("WOGlobalWOOpnState loop11");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").show();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").show();


                                //document.getElementById("wo-tracking-onhold").display = "block";
                                //$("#select_wotracking-pausereason").prop("readonly", false);
                                //$("#select_wotracking-pausereason-input").prop("disabled", false);
                                //$("#select_wotracking-pausereason-input").val("");


                                $("#production-row-2").show();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").show();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved 
                                    document.getElementById("wo-tracking-onhold").display = "block";
                                    $("#select_wotracking-pausereason").prop("readonly", false);
                                    $("#select_wotracking-pausereason-input").prop("disabled", false);
                                } else {
                                    document.getElementById("wo-tracking-onhold").display = "none";
                                    $("#select_wotracking-pausereason").prop("readonly", true);
                                    $("#select_wotracking-pausereason-input").prop("disabled", true);
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");
                                $("#wo-tracking-update").css("display", "none");
                            } else if ($scope.WOGlobalWOOpnState == 12) {////job start not complete //Multiple Operator
                                console.log("WOGlobalWOOpnState loop12"); 
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();

                               // document.getElementById("wo-tracking-onhold").display = "block";
                                $("#select_wotracking-pausereason").prop("readonly", false);
                                $("#select_wotracking-pausereason-input").prop("disabled", false);
                                $("#select_wotracking-pausereason-input").val("");

                                $("#production-row-2").hide();
                                $("#production-row-3").show();
                                $("#production-row-4").hide();
                                $("#production-row-5").show();

                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "block");
                                $("#wo-tracking-onhold").css("display", "block");
                            } else if ($scope.WOGlobalWOOpnState == 0) {//unknown status
                                console.log("WOGlobalWOOpnState loop0");
                                $("#setup-row-2").hide();
                                $("#setup-row-3").hide();
                                $("#setup-row-4").hide();
                                $("#setup-row-5").hide();
                                //pause reason
                                //assign pause reason
                                $(option).attr('selected', 'selected');
                                myDiv.appendChild(option);
                                $("#production-row-2").hide();
                                $("#production-row-3").hide();
                                $("#production-row-4").hide();
                                $("#production-row-5").hide();
                                if (config.BypassApproval) { // to check tocheck GlobalVar.WOGlobalOnHoldBypassApproved 
                                    document.getElementById("wo-tracking-onhold").display = "block";
                                    $("#select_wotracking-pausereason").prop("readonly", false);
                                    $("#select_wotracking-pausereason-input").prop("disabled", false);
                                } else {
                                    document.getElementById("wo-tracking-onhold").display = "none";
                                    $("#select_wotracking-pausereason").prop("readonly", true);
                                    $("#select_wotracking-pausereason-input").prop("disabled", true);
                                }
                                $("#wo-tracking-updatereceive").css("display", "none");

                                $("#wo-tracking-update").css("display", "none");



                                if ($scope.QtyUpdated < 2) {//Multiple Operator
                                    document.getElementById("WIP-td5_1").innerHTML = "";
                                    document.getElementById("WIP-td5_2").innerHTML = "";
                                    $("#wo-tracking-updatereceive").css("display", "block");
                                } else {//Multiple Operator
                                    $("#wo-tracking-updatereceive").css("display", "none");
                                }

                            }
                        } else {
                            alert("ERROR: no access right");
                        }
                    }
                }
            });

            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { //if bypass swop btns
                $("#setup-row-2").show();
                $("#setup-row-3").hide();
                $("#setup-row-4").hide();
                $("#setup-row-5").hide();
                $("#production-row-2").hide();

            }

            //check for chid WO
            if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                $("#wo-tracking-splitdetail").css("display", "block");
            } else {
                $("#wo-tracking-splitdetail").css("display", "none");
            }

            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) {//if bypass setup

                //swop position todo line3415 to line3451
                //Point cmdSetupStartlocation = cmdSetupStart.Location;
                //int xcmdSetupStartLocation = cmdSetupStart.Location.X;
                //int ycmdSetupStartLocation = cmdSetupStart.Location.Y;
                //Point cmdProductionStartlocation = cmdProductionStart.Location;
                //int xcmdProductionStartLocation = cmdProductionStart.Location.X;
                //int ycmdProductionStartLocation = cmdProductionStart.Location.Y;
                console.log("bypass setup");
                CalculateTimeSpan("Setup");
            }
            //   console.log("not bypass setup");
            CalculateTimeSpan("Production");

            GenerateQueuingWOList($scope.McID);


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
                            // todo make wotracking-table1
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
                            // todo make wotracking-table1
                            makeTable1(response1[0].data.result);
                        }
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

        //'*******************************************************************
        //'Title     :  convertTime
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : make wotracking-table2
        //'*******************************************************************
        function makeTable1(data) {
            $scope.fpSpreadQueuingWOList = data;
            //wotracking-table1
            document.getElementById("wotracking-table2").innerHTML = "";
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
            $("#wotracking-table2").kendoGrid({
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
        //'Title     :  makeTable2
        //'Function  :  make table for raw material wotracking-table1
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTable2(data) {
            document.getElementById("wotracking-table1").innerHTML = "";
            console.log("makeTable2", data);

            for (var i = 0; i < data.length; i++) {
                if (data[i]["status"] == true) {
                    data[i]["reqQty"] = true
                } else {
                    data[i]["reqQty"] = false
                }
            }

            $("#wotracking-table1").kendoGrid({
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 250,
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
        //'Title     :  maketable
        //'Function  :  make table for raw material wotracking-table1
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTableSplitDetail(data) {
            console.log("makeTableSplitDetail data", data);
            //todo: it will be called when subassambly exists
            //$("#subAssembly").css("display", "block");
            document.getElementById("splitDetail-body").innerHTML = "";
            console.log("makeTableSubAssembly", data);


            $("#splitDetail-body").kendoGrid({
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 125,
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
                     field: "id", title: "", width: 50

                 },
                 {
                     field: "woid", title: "Work Order", width: 100

                 },
                 {
                     field: "partID", title: "Drawing No.", width: 100

                 },
                 {
                     field: "toolDescription", title: "Part Family", width: 100

                 },
                 {
                     field: "actualProdQty", title: "Actual Production Qty", width: 100

                 },
                 {
                     field: "accumulatedScrapQtyr", title: "Accumulated Scrap Qty", width: 100

                 },
                 {
                     field: "plannerRemark", title: "Planner Remarks", width: 100

                 }
                ]
            })

        }

        //'*******************************************************************
        //'Title     :  makeTableOperatorList
        //'Function  :  make table for operator list
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTableOperatorList(data) {
            console.log("makeTableOperatorList data", data);
            //todo: it will be called when subassambly exists
            //$("#subAssembly").css("display", "block");
            document.getElementById("operatorlist-body").innerHTML = "";
            //v console.log("makeTableSubAssembly", data);

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }


            $("#operatorlist-body").kendoGrid({
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 125,
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
                     field: "index", title: "", width: 50

                 },
                 {
                     field: "operatorName", title: "Operator Name", width: 100

                 },
                 {
                     field: "receivedDate", title: "Received Qty", width: 100

                 },
                 {
                     field: "receivedQty", title: "Receivied Date", width: 100

                 },
                 {
                     field: "completedQty", title: "Completed Qty", width: 100

                 },
                 {
                     field: "completedDate", title: "Completed Date", width: 100

                 },
                 {
                     field: "operatorStatus", title: "Status", width: 100

                 }
                ]
            })

        }

        //'*******************************************************************
        //'Title     :  maketable
        //'Function  :  make table for raw material wotracking-table1
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTableSubAssembly(data) {
            console.log("makeTableSubAssembly data", data);
            //todo: it will be called when subassambly exists
            $("#subAssembly").css("display", "block");
            document.getElementById("wotracking-tableSubAssembly").innerHTML = "";
            console.log("makeTableSubAssembly", data);


            $("#wotracking-tableSubAssembly").kendoGrid({
                dataSource: {
                    data,
                    pageSize: 20
                },
                dataType: "json",
                selectable: "true",
                height: 250,
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

        //'****************************************************************************************************
        //'Title     :  CalculateSubconTimeSpan
        //'Function  :  calculate total timespan  
        //'Input     :  
        //'Output    :  total timespan
        //'Remark    :  
        //'**************************************************************************************************
        function CalculateSubconTimeSpan() {

            if ($scope.SendOutDate != "" && $scope.SendOutDate != null &&
                 $scope.ReceivedDate != "" && $scope.ReceivedDate != null) {
                var startDate = new Date($scope.SendOutDate);
                // Do your operations
                var endDate = new Date($scope.ReceivedDate);

                console.log("CalculateSubconTimeSpan ReceivedDate", $scope.ReceivedDate);
                console.log("CalculateSubconTimeSpan SendOutDate", $scope.SendOutDate);
                //  var min = (endDate.getTime() - startDate.getTime());
                var min = ((endDate.getTime() - startDate.getTime()) / 1000) / 60;
                console.log("CalculateSubconTimeSpan min", min);
                $('#wotracking-table3-total').val(min);
            }

            if (String($('#wotracking-table3-productiontotalduration').val()).trim() == "") {
                $('#wotracking-table3-productiontotalduration').val("0.00");
            }


            var ProdTotalDuration = String($('#wotracking-table3-productiontotalduration').val()).trim();



            var promiseArray1 = [];
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/CalculateSubconTimeSpan', {
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                    'TotalSetupDuration': '0',
                    'ProdTotalDuration': convertDatetimeToSecond(ProdTotalDuration)

                })
        );




            $q.all(promiseArray1).then(function (response1) {
                console.log("CalculateSubconTimeSpan", response1);
            });
        }

        //'*******************************************************************
        //'Title     :    fnAddFGInventory
        //'Function  :    add FG inventory
        //'Input     :
        //'Output    :
        //'Remark    :  
        //'*******************************************************************
        function fnAddFGInventory(){

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
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var SumDuration = 0;


            if (OperationType == "Setup") {
                console.log("CalculateTimeSpan setup");

                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan1', {
                        'WOID': WOID,
                        'ProcOpSeq': ProcOpSeq,
                        'WorkCenter': WorkCenter,
                        'StartType1': 'SetupStart',
                        'StartType2': 'SetupContinue'

                    })
                );




                $q.all(promiseArray1).then(function (response1) {
                    console.log("CalculateTimeSpan setup1", response1);
                    console.log("CalculateTimeSpan1", response1);
                    if (response1.length != 0 && response1[0].data.success && response1[0].data.result.length != 0) {
                      //  if (response1[0].data.success) {
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                    'WOID': WOID,
                                    'ProcOpSeq': ProcOpSeq,
                                    'WorkCenter': WorkCenter,
                                    'StartType1': 'SetupStart',
                                    'StartType2': 'SetupContinue'

                                })
                             );
                    //    }

                            $q.all(promiseArray2).then(function (response) {
                            console.log("CalculateTimeSpan setup2", response);
                            console.log("CalculateTimeSpan2", response);
                            if (response.length != 0) {
                                if (response[0].data.success) {

                                    for (var i = 0; i < response[0].data.result.length;i++){
                                        if (response[0].data.result[i]['totalDuration'] != "" || response[0].data.result[i]['totalDuration'] != null) {
                                            SumDuration = SumDuration + response[0].data.result[i]['totalDuration'];
                                        }
                                    }
                                    //if (response[0].data.result[0]['totalDuration'] == "" ||
                                    //    response[0].data.result[0]['totalDuration'] == null) {
                                    //    SumDuration = 0;
                                    //} else {
                                    //    SumDuration = response[0].data.result[0]['totalDuration'];
                                    //}
                                    console.log("CalculateTimeSpan setup2 time half", SumDuration)
                                    if (response1[0].data.result[0]['totalDuration'] != "" &&
                                        response1[0].data.result[0]['totalDuration'] != null) {
                                        SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                    }
                                    console.log("CalculateTimeSpan setup2 time full", SumDuration)
                                    //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                    SumDuration = SumDuration * 60;


                                    //var time = (new Date).clearTime()
                                    //    .addSeconds(SumDuration)
                                    //    .toString('HH:mm:ss');
                                    var time = secondsToHms(SumDuration);
                                    $("#wotracking-table3-setuptotalduration").val(time);
                                    //todo:display this.txtSetupDurationHr.Text


                                    updataSetupDurationTable();


                                }
                            } else {
                                SumDuration = 0;
                                if (response1[0].data.result[0]['totalDuration'] != "" &&
                                     response1[0].data.result[0]['totalDuration'] != null) {
                                    SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                }
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                SumDuration = SumDuration * 60;

                                //to check: to test the function, convert second to data time format
                                //var time = (new Date).clearTime()
                                //.addSeconds(SumDuration)
                                //.toString('HH:mm:ss');
                                var time = secondsToHms(SumDuration);
                                $("#wotracking-table3-setuptotalduration").val(time);
                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable()


                            }
                        });




                    } else {

                        promiseArray3.push(
                               $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan3', {
                                   'WOID': WOID,
                                   'ProcOpSeq': ProcOpSeq,
                                   'WorkCenter': WorkCenter

                               })
                            );
                        $q.all(promiseArray3).then(function (response) {
                            console.log("CalculateTimeSpan setup3", response);
                            console.log("CalculateTimeSpan3", response);
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
                                    $("#wotracking-table3-setuptotalduration").val(time);
                                    updataSetupDurationTable()
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
                                $("#wotracking-table3-setuptotalduration").val(time);
                                updataSetupDurationTable()
                            }

                        });




                    }
                });

            } else {
                console.log("CalculateTimeSpan test1");
                //production
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan4', {
                        'WOID': WOID,
                        'ProcOpSeq': ProcOpSeq,
                        'WorkCenter': WorkCenter

                    })
                );




                $q.all(promiseArray1).then(function (response1) {
                    console.log("CalculateTimeSpan4", response1);
                    console.log("CalculateTimeSpan test2");
                    if (response1.length != 0) {

                        if (response1[0].data.success) {
                            console.log("CalculateTimeSpan test3");
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan5', {
                                    'WOID': WOID,
                                    'ProcOpSeq': ProcOpSeq,
                                    'WorkCenter': WorkCenter

                                })
                             );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            console.log("CalculateTimeSpan5", response);
                            if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                                console.log("CalculateTimeSpan test4");

                                if (response[0].data.result[0]['totalDuration'] == "" ||
                                    response[0].data.result[0]['totalDuration'] == null) {
                                    SumDuration = 0;
                                    console.log("CalculateTimeSpan test5");
                                } else {
                                    SumDuration = response[0].data.result[0]['totalDuration'];
                                    console.log("CalculateTimeSpan test6");
                                }

                                for (var i = 0; i < response[0].data.result.length;i++){
                                    SumDuration = SumDuration + response[0].data.result[i]['totalDuration'];
                                }
                                //if (response[0].data.result[0]['totalDuration'] != "" &&
                                //    response[0].data.result[0]['totalDuration'] != null) {
                                //    SumDuration = SumDuration + response[0].data.result[0]['totalDuration'];
                                //}
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                console.log("SumDuration", SumDuration);
                                SumDuration = SumDuration * 60;

                                ////alert("te");
                                //var t = new Date(1970, 0, 1); // Epoch
                                //t.setSeconds(SumDuration);
                                //console.log("time is", t);

                                console.log("SumDuration1", SumDuration);
                                //var time = (new Date).clearTime()
                                //    .addSeconds(SumDuration)
                                //    .toString('HH:mm:ss');
                                //console.log(" CalculateTimeSpan5 time", time);
                                //todo:display this.txtSetupDurationHr.Text
                                var time = secondsToHms(SumDuration);
                                $("#wotracking-table3-productiontotalduration").val(time);
                                updataSetupDurationTable();



                            } else {
                                console.log("CalculateTimeSpan test7");
                                SumDuration = 0;
                                //if (response1[0].data.result[0]['totalDuration'] != "" &&
                                //     response1[0].data.result[0]['totalDuration'] != null) {
                                //    SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                //}
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                // SumDuration = 0;
                                if (response1.length != 0 && response1[0].data.success && response1[0].data.result.length != 0) {
                                    SumDuration = response1[0].data.result[0]['totalDuration'];
                                }
                                console.log("CalculateTimeSpan test8", SumDuration);

                                SumDuration = SumDuration * 60;

                                //to check: to test the function, convert second to data time format
                                //alert("te");
                                //var time = (new Date).clearTime().addSeconds(251740.2);
                                //console.log("time is0",time);
                                //    time = time.toString('HH:mm:ss');
                                //    console.log("time is", time);


                                //    var date = new Date(null);
                                //    date.setSeconds(251740.2); // specify value for SECONDS here
                                //    var result = date.toISOString().substr(11, 8);
                                //    console.log("time is1", result);
                                //    console.log("time is2", secondsToHms(251740.2));
                                var time = secondsToHms(SumDuration);
                                $("#wotracking-table3-productiontotalduration").val(time);
                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable();


                            }
                        });




                    } else {

                        promiseArray3.push(
                               $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan6', { //to check
                                   'WOID': WOID,
                                   'ProcOpSeq': ProcOpSeq,
                                   'WorkCenter': WorkCenter

                               })
                            );
                        $q.all(promiseArray3).then(function (response) {
                            console.log("CalculateTimeSpan2.2", response);
                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    if (response[0].data.result[0]['totalDuration'] == "" ||
                                        response[0].data.result[0]['totalDuration'] == null) {
                                        SumDuration = 0;
                                    } else {
                                        SumDuration = response[0].data.result[0]['totalDuration'];
                                    }
                                    //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                    SumDuration = SumDuration * 60;

                                    //to check: to test the function, convert second to data time format
                                    //var time = (new Date).clearTime()
                                    //.addSeconds(SumDuration)
                                    //.toString('HH:mm:ss');
                                    var time = secondsToHms(SumDuration);
                                    //todo:display this.txtSetupDurationHr.Text
                                    updataSetupDurationTable();
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
                                updataSetupDurationTable();
                            }

                        });




                    }

                });



            }




            if (String($('#wotracking-table3-setuptotalduration').val()).trim() == "") {
                $('#wotracking-table3-setuptotalduration').val("0.00");
            }
            if (String($('#wotracking-table3-productiontotalduration').val()).trim() == "") {
                $('#wotracking-table3-productiontotalduration').val("0:0:0");
            }

            var TotalSetupDuration = String($('#wotracking-table3-setuptotalduration').val()).trim();
            var ProdTotalDuration = String($('#wotracking-table3-productiontotalduration').val()).trim();

            //var WOID = $scope.selectedWOIDData['woid'];
            //var ProcOpSeq = $scope.ProcOpSeq;
            //var WorkCenter = $scope.WorkCenter;


            var promiseArray4 = [];
            promiseArray4.push(
                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan7', {
                    'TotalSetupDuration': TotalSetupDuration,
                    'ProdTotalDuration': convertDatetimeToSecond(ProdTotalDuration),
                    'WOID': WOID,
                    'WorkCenter': WorkCenter,
                    'ProcOpSeq': ProcOpSeq



                })
            );




            $q.all(promiseArray4).then(function (response) {
                console.log("CalculateTimeSpan7", response);

            });




        }




        //'*******************************************************************
        //'Title     :  updataSetupDurationTable 
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :  split part of function from original function of CalculateTimeSpan due to different design in web version
        //'          : from line 3714 to line 3742   
        //'*******************************************************************
        function updataSetupDurationTable() {
            console.log("updataSetupDurationTable");
            var promiseArray1 = [];

            var TotalSetupDuration = String($('#wotracking-table3-setuptotalduration').val()).trim();
            var ProdTotalDuration = String($('#wotracking-table3-productiontotalduration').val()).trim();

            console.log("updataSetupDurationTable TotalSetupDuration", TotalSetupDuration);
            if (TotalSetupDuration == "" || TotalSetupDuration == "0.00") {
                TotalSetupDuration = 0;
            } else {
                TotalSetupDuration = hmsToSecond(TotalSetupDuration);
            }
            console.log("updataSetupDurationTable TotalSetupDuration1", TotalSetupDuration);
            if (ProdTotalDuration == "" || ProdTotalDuration == "0:0:0") {
                ProdTotalDuration = 0;
            } else {
                ProdTotalDuration = hmsToSeconds(ProdTotalDuration);
            }

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan7', {
                'WOID': $scope.select_WOID,
                'ProcOpSeq': $scope.ProcOpSeq,
                'WorkCenter':$scope.WorkCenter,
                'TotalSetupDuration':TotalSetupDuration,
                'ProdTotalDuration':ProdTotalDuration
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CalculateTimeSpan7", response);

                if (response.length != 0) {
                    if (response[0].data.success) {

                    }
                }
            });

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


        ////'*******************************************************************
        ////'Title     :  CheckWOOpnStatusAssign 
        ////'Function  :  check for access right that is generated in   CheckWOOpnStatus() function
        ////'Input     :  
        ////'Output    :  Clear data on screen
        ////'Remark    :  state: 1=Job not start, 2=SetupRun,3=SetupPause
        ////'             4=Setup complted but prodcuction not atart , 5=JobRun,6=JobPause, 7=Job end
        ////'*******************************************************************
        //function CheckWOOpnStatusAssign() {
        //    //todo:line 3099 to line 3409
        //}

        //'*******************************************************************
        //'Title     :  RefreshData
        //'Function  :  refresh screen data  
        //'Input     :  
        //'Output    :  Clear data on screen
        //'Remark    :  
        //'*******************************************************************
        function RefreshData() {

            //to finish implementing
           // $scope.select_WOID = "";
           // $scope.propopseq = "";

            //$("#setup-row-2").hide();
            //$("#setup-row-3").hide();
            //$("#setup-row-4").hide();
            //$("#setup-row-5").hide();
            //$("#production-row-2").hide();
            //console.log("RefreshData", "1");


            //todo:set all value to empty
            //console.log("saveCompleteModal0", $scope.CompletedQty);
            //$("#saveCompleteModal-current").val("")
          //  location.reload();
        }

        ////'*******************************************************************
        ////'Title     :  UpdateQtyFromPreviousProcOpSeq
        ////'Function  :   
        ////'Input     :  
        ////'Output    :  
        ////'Remark    :  
        ////'*******************************************************************
        //function UpdateQtyFromPreviousProcOpSeq() {

        //    console.log("UpdateQtyFromPreviousProcOpSeq");
        //    var promiseArray1 = [];
        //    var promiseArray2 = [];

        //    promiseArray1.push(
        //    $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq1', {
        //        'WOID': $scope.selectedWOIDData['woid'],
        //        'ProcOpSeq': ($scope.ProcOpSeq - 1)
        //    })
        // );




        //    $q.all(promiseArray1).then(function (response) {
        //        console.log("UpdateQtyFromPreviousProcOpSeq1", response);




        //        var currentdate = getCurrentDatetime();
        //        if (response.length != 0) {
        //            if (response[0].data.success) {
        //                var completeQty = response[0].data.result[0]['completedQty'];
        //                var completeDate = response[0].data.result[0]['completedDate'];
        //                console.log("UpdateQtyFromPreviousProcOpSeq2 test");
        //                promiseArray2.push(
        //                    $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq2', {
                                
        //                        'ActualRecQty': completeQty,
        //                        'ActualRecDate': completeDate,
        //                        'CompletedQty': 0,
        //                        'CompletedDate': completeDate,
        //                        'OutstandingQty': completeQty,
        //                        'OutstandingDate': completeDate,
        //                        'QtyUpdated': 1,
        //                        'ProcOpSeq': $scope.ProcOpSeq,
        //                        'WOID': $scope.select_WOID

        //                    })
        //                );

        //                $q.all(promiseArray2).then(function (response) {
        //                    console.log("UpdateQtyFromPreviousProcOpSeq2", response);
        //                });
        //            }
        //        }

        //    });


        //}

        //'*******************************************************************
        //'Title     :  fnTrackSetupConfig
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function fnTrackSetupConfig() {

            var promiseArray = [];
            promiseArray.push(
                $http.post(config.baseUrlApi + 'HMLVTS/fnTrackSetupConfig', {
                    'WorkCenter': $scope.WorkCenter
                })
            );

            return promiseArray;


        }

        //'*******************************************************************
        //'Title     :  disableDiv
        //'Function  :  to disable a mouse event of a div
        //'Input     :  
        //'Output    : 
        //'Remark    : greyBackground == true, turn background to true
        //'*******************************************************************
        function disableDiv(divName, greyBackground) {
            $("#" + divName).css({ "pointer-events": "none" });
            if (greyBackground) {
                $("#" + divName).css({ "background-color": "grey" });
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
            //console.log("itemName", itemName);
            console.log("rawdata", rawData);
            var myDiv = document.getElementById("select_" + itemName);
            var myDiv1 = document.getElementById("select_input_woid");
            console.log("myDiv1", myDiv1);
            if (itemName != "select_input_woid") {
                myDiv.innerHTML = "";
            } else {
                myDiv1.innerHTML = "";
            }


            if (itemName == "wotracking-woid") {
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

            //if (itemName = "select_input_woid") {

            //    var options = "";
            //    for (var i = 0; i < rawData.length; i++) {
            //        var woid = String(rawData[i]["woid"]).trim();
            //        options += '<option value="' + woid + '" />';
            //       // var option1 = document.createElement("option");
            //       // option1.value = "";
            //       // option1.text = "";
            //      //  myDiv1.innerHTML =(option);
            //    }
            //    myDiv1.innerHTML = options;
            //}

            if (itemName == "wotracking-pausereason") {
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

            if (itemName == "wotrackingremark") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["remark"]).trim();//Subcon QC
                    option.text = String(rawData[i]["remark"]).trim();
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

            if (itemName == "wotracking-scrap-remark") {
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


        function findSelectorFullInfo(woid) {
            console.log("findSelectorFullInfo",woid);
            console.log("findSelectorFullInfo selectData", $scope.selectData);
            for (var i = 0; i < $scope.selectData.length; i++) {
                if ($scope.selectData[i]['woid'] == woid) {
                    return $scope.selectData[i];
                }
            }
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
                        //  $scope.selectData = response[0].data.result;
                        createSelect(response[0].data.result, "preprocessremark");
                        createSelect(response[0].data.result, "wotracking-scrap-remark");
                        //   createSelect(response[0].data.result, "select_input_woid");
                    }

                }
            });
        }



        //'*******************************************************************
        //'Title     :  GenerateWOList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOList() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList12')
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOList12", response);
                if (response.length != 0) {
                    if (response[0].data.success) {

                        $scope.selectData = response[0].data.result;
                        console.log("$scope.selectData", $scope.selectData);
                        createSelect(response[0].data.result, "wotracking-woid");
                        //   createSelect(response[0].data.result, "select_input_woid");
                    }

                }
            });
        }

        //'*******************************************************************
        //'Title     :  GenerateTrackingRemark
        //'Function  :  generate tracking remark
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function generateTrackingRemarkList() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.get(config.baseUrlApi + 'HMLVTS/generateTrackingRemarkList')
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("generateTrackingRemarkList", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        createSelect(response[0].data.result, "wotrackingremark");
                    }

                }
            });
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
                        createSelect(response[0].data.result, "wotracking-pausereason");
                    }

                }
            });
        }



        //'*******************************************************************
        //'Title     :  fnMultipleWOEnableConfig
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    : return NO for default
        //'*******************************************************************
        function fnMultipleWOEnableConfig() {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnMultipleWOEnableConfig', {
                'WorkCenter': $scope.WorkCenter
            })
         );

            $q.all(promiseArray1).then(function (response) {
                if (response.length != 0) {
                    if (response[0].data.result[0]['multipleWOEnable']) {
                        return response[0].data.result[0]['multipleWOEnable'];
                    }
                } else {
                    return "No";
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
            var OperatorFirstName = $("#wotracking-table3-operatorName").val();
            var Password = $("#wotracking-table3-password").val();
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
            } else{
                alert("Please key in username/password");
            }
            return promiseArray1;




            // function login(loginData) {
            //loginData.GrantType = 'usertoken';
            //return $http.post(config.baseUrlNexusApi + 'Token/GetToken', loginData).then(function (results) {
            //    currentUser.isAuth = results.data.success;
            //    currentUser.token = results.data.jsonWebToken;
            //    currentUser.expiresOn = results.data.expiresOn;
            //    currentUser.refreshToken = results.data.refreshToken;
            //    $localStorage.currentUser = currentUser;
            //}).then(function () {
            //    return $http.get(appConfig.baseUrlApi + 'user/GetCurrentUserDetails').then(function (results) {
            //        currentUser.userName = results.data.userName;
            //        currentUser.userId = results.data.id;
            //        currentUser.tenantId = results.data.tenantId;
            //        currentUser.siteMap = results.data.siteMap;
            //        $localStorage.currentUser = currentUser;
            //        return $localStorage.currentUser;
            //    });
            //});
            //  }



        }

        //'*******************************************************************
        //'Title     :  fnValidateUserNameMCAssign
        //'Function  :  Validate username
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function fnValidateUserNameMCAssign() {//to check might not be useful, this is to check the mac address
            var OperatorName = $("#wotracking-table3-operatorName").val();

            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnValidateUserNameMCAssign', {
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                'McID': $scope.McID
            })
            );

            return promiseArray1;




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



        //setup start cases


        //'*******************************************************************
        //'Title     :  setupStartCase1
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : check for skip prompt, then check update received qty
        //'*******************************************************************
        function setupStartCase1() {
            console.log("setupStartCase1", String($("#WIP-td5_1").text()).trim());
            if (String($("#WIP-td5_1").text()).trim() != "") {
                if (config.strSkipWOTrackingPrompt) {
                    setupStartCase5();
                } else {
                    if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) {
                        var answer = confirm("Confirm to start production?");
                        //todo to implement, trackingdefault ok in model so that default button can change
                        //if (config.TrackingDefaultOK) {
                        //        setupStartCase5();
                        //} else {
                        //    if (answer) {
                        //        setupStartCase5();
                        //    }
                        //}

                        if (answer) {
                            setupStartCase5();
                        }

                    } else {
                        var answer = confirm("Confirm to start setup?");
                        if (answer) {
                            //some code
                            //  alert("here");
                            setupStartCase5();
                        }

                    }
                }
            } else {
                alert("Please update received qty!", "0");
            }
        }


        //'*******************************************************************
        //'Title     :  setupStartCase1
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : check for skip prompt, then check update received qty
        //'*******************************************************************
        function productionStartCase6() {
            console.log("productionStartCase6");
            console.log("setupStartCase1", String($("#WIP-td5_1").text()).trim());
            if (String($("#WIP-td5_1").text()).trim() != "") {
                if (config.strSkipWOTrackingPrompt) {
                    productionStartCase10();
                } else {
                        var answer = confirm("Confirm to start production?");
                        //todo to implement, trackingdefault ok in model so that default button can change
                        //if (config.TrackingDefaultOK) {
                        //        setupStartCase5();
                        //} else {
                        //    if (answer) {
                        //        setupStartCase5();
                        //    }
                        //}

                        if (answer) {
                            productionStartCase10();
                           // setupStartCase5();
                        }


                }
            } else {
                alert("Please update received qty!", "0"); // to check
            }
        }


        //'*******************************************************************
        //'Title     :  setupStartCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : check for inhouse and not inhouse work order
        //'*******************************************************************
        function productionStartCase10() {
            console.log("productionStartCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];

            var currentdate = getCurrentDatetime();
           
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10_1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'WorkCenter': $scope.WorkCenter,
                'OpSeq':$scope.OpSeq
            })
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("setupStartCase10 setupStartCase10_1", response);

                var canContinue = false;
                if(response.length != 0 && response[0].data.success  && response[0].data.result.length !=0){
                    for (var i = 0; i < response[0].data.result.length;i++){
                        if (response[0].data.result[i]['startType'] != undefined && String(response[0].data.result[i]['startType']).trim().toLowerCase() == "SetupEnd") {
                            canContinue = true;
                            break;
                        }
                    }
                    if(canContinue){
                        promiseArray2.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10_1', {
                            'WOID': $scope.selectedWOIDData['woid'],
                            'WorkCenter': $scope.WorkCenter,
                            'ProcOpSeq':$scope.ProcOpSeq,
                            'StopDateTime':currentdate,
                            'EndType':"JobStart",
                            'McID':$scope.McID

                        })
                     );

                        $q.all(promiseArray1).then(function (response) {
                            console.log("setupStartCase10.2 productionResumeCase10_1", response);

                        });
                    }
                }
            });
            //var reason = $('#select_wotracking-pausereason option:selected').text();
            var reason = String($("#select_wotracking-pausereason-input").val()).trim();
             promiseArray3.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_2', {
                            'WOID': $scope.selectedWOIDData['woid'],
                            'WorkCenter': $scope.WorkCenter,
                            'RouteID': $scope.RouteID,
                            'OpSeq': $scope.OpSeq,
                            'ProcOpSeq': $scope.ProcOpSeq,
                            'StartDateTime': currentdate,
                            'StartType': "JobStart",
                            'McID': $scope.McID,
                            'McType': $scope.McType,
                            'reason': "JobStart",
                            'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                            'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                            'ShiftID': '0'

                        })
                     );


             var TotalSetupDuration = 0;
             var subcontime = 0;
             if (String($scope.McType).trim() == "Subcon") {

                 if (String($("#wotracking-table3-total").val()).trim() == '') {
                     subcontime = 0;
                 } else {
                     subcontime = parseFloat(String($("#wotracking-table3-total").val()).trim());

                 }
                 TotalSetupDuration = 0;
                 //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                 $("#wotracking-table3-total").val(subcontime);
             } else {
                 if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                     $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                 }
                 if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                     $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                 }
                 subcontime = $("#wotracking-table3-productiontotalduration").val();
                 TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
             }


              $scope.WOExecutionStatus= "ProcessingStart";
              promiseArray4.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10_2', {
                        'WOStatus': $scope.WOExecutionStatus,//
                        'ProdStartDate':currentdate,
                        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//                       
                        'McID': $scope.McID,//
                        'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                        'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                        'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                        'WOID': $scope.selectedWOIDData['woid'],//
                        'ProcOpSeq': $scope.ProcOpSeq,//
                        'WorkCenter': $scope.WorkCenter//


                    })
                 );

              promiseArray5.push(
                $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_2', {
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq,//
                'ExStatus': 5,
                'UpdatedDate': currentdate,
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                'reason': ''
                    })
                );
              $q.all(promiseArray3).then(function (response) {
                  console.log("productionStartCase10 productionResumeCase10_2",response);
                  $q.all(promiseArray4).then(function (response) {
                      console.log("productionStartCase10 setupStartCase10_2",response);
                      $q.all(promiseArray5).then(function (response) {
                          console.log("productionStartCase10 cmdUpdateReceived_ClickCase10_2 ",response);
                          CheckWOOpnStatus();
                      });
                  });

              });

        }

        //'*******************************************************************
        //'Title     :  setupStartCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : check for inhouse and not inhouse work order
        //'*******************************************************************
        function setupStartCase5() {
            console.log("setupStartCase5");
            console.log("setupStartCase5 mctype", $scope.McType);
            if ($scope.McType.toLowerCase() == "inhouse") {
                setupStartCase6();
            } else {
                setupStartCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : only allow one WO to be "processingStart"
        //'*******************************************************************
        function setupStartCase6() {
            console.log("setupStartCase6");
            console.log("setupstartcase6 $scope.fpSpreadQueuingWOList", $scope.fpSpreadQueuingWOList);
            if (!config.AllowMultipleWO && (fnMultipleWOEnableConfig() != "NO")) {//if not allowed multiple, need to check whether there is a processing
                //todo line 3838 - 3854
                if ($scope.fpSpreadQueuingWOList.length != 0) {
                    for (var i = 0; i < $scope.fpSpreadQueuingWOList.length; i++) {
                        if (String($scope.fpSpreadQueuingWOList['woStatus']).trim() == "ProcessingStart") {
                            alert("Unable to proceed, please on hold the current processing WO");
                            setupStartCase50();
                        }
                    }
                    setupStartCase7();
                } else {
                    setupStartCase7();
                }
            } else {
                setupStartCase7();
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase7
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function setupStartCase7() {
            console.log("setupStartCase7");
            if ($scope.fnCheckPriorityConfigVar || config.BypassPriority) {//if bypass setup
                //todo: line 3867 - 3897
                if ($scope.fpSpreadQueuingWOList.length != 0) {
                    for (var i = 0; i < $scope.fpSpreadQueuingWOList.length; i++) {
                        if (String($scope.fpSpreadQueuingWOList['woStatus']).trim() == "ProcessingHold") {
                            alert("Unable to proceed, please follow Work Order priority list.");
                            setupStartCase50();
                        }
                    }
                    setupStartCase10();
                } else {
                    setupStartCase10();
                }
            } else {
                setupStartCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStartCase10() {
            console.log("setupStartCase10");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                //todo: line 3867 - 3897
                if (config.AssemblyCheckAtLastOnly) {
                    var promiseArray1 = [];
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10', {
                        'WOID': $scope.selectedWOID
                    })
                 );

                    $q.all(promiseArray1).then(function (response) {
                        console.log("setupStartCase10 response", response);
                        if (response.length != 0) {
                            if (response[0].data.success) {
                                $scope.LastProcOpSeq = response[0].data.result[0]["lastProcOpSeq"];

                                if ($scope.ProcOpseq >= $scope.LastProcOpSeq) {
                                    setupStartCase12();
                                }
                            } else {
                                setupStartCase15();
                            }
                        } else {
                            setupStartCase15();
                        }
                    });
                }
            } else {
                setupStartCase12();
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase12
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :check all dependent WO completed before proceed with Assembly WO
        //'*******************************************************************
        function setupStartCase12() {
            console.log("setupStartCase12");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                //todo line3946-3970
                console.log("setupStartCase12 subassembly", $scope.subAssembly);
                for (var i = 0; i < $scope.subAssembly.length;i++){
                    if (String($scope.subAssembly[i]['woStatus']).tirm().toLowerCase() !="completed") {
                        setupStartCase50();
                    }
                }
                setupStartCase15();
            } else {
                setupStartCase15();
            }

        }

        //'*******************************************************************
        //'Title     :  setupStartCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :check all dependent WO completed before proceed with Assembly WO
        //'*******************************************************************
        function setupStartCase15() {
            console.log("setupStartCase15");
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("setupStartCase15.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("setupStartCase15.2");
                // console.log("test validate", ValidateOperatorName(false));


                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data!= undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("setupStartCase15.3");
                        setupStartCase20_25_30();
                    } else {
                        console.log("setupStartCase15.4");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });


            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase20_25_30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStartCase20_25_30() { // here we skip case30
            console.log("setupStartCase20_25_30");
            //to check:fnValidateUserNameMCAssign, case25 might need to alter cos we always assign login name to user id and username
            //to continue from case 20, line 3995 to finish the whole function

            //if ($scope.comboMCList == "") {
            //    alert("Please select a machine");
            //} else {

            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    setupStartCase40();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-password").val("");
                    //$("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });




        }

        //'*******************************************************************
        //'Title     :  setupStartCase40
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStartCase40() {
            console.log("setupStartCase40");
            //todo :line 4041, stored procedures created
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];

            var currentdate = getCurrentDatetime();
            var StartType = "";
            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                StartType = "JobStart";
            } else {
                StartType = "SetupStart";
            }
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'WorkCenter': $scope.WorkCenter,
                'RouteID': $scope.RouteID,
                'OpSeq': $scope.OpSeq,
                'ProcOpSeq': $scope.ProcOpSeq,
                'StartDateTime': currentdate,
                'StartType': StartType,
                'McID': $scope.McID,
                'McType': $scope.McType,
                'reason': StartType,
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                'ShiftID':0



            })
         );

            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = $("#wotracking-table3-productiontotalduration").val();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }

            $scope.WOExecutionStatus = "ProcessingStart";
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_2', {
                   'WOStatus': $scope.WOExecutionStatus,//
                   'SetupStartDate': currentdate,
                   'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'ShiftID': 0,//
                   'McID': $scope.McID,//
                   'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                   'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                   'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                   'WOID': $scope.selectedWOIDData['woid'],//
                   'ProcOpSeq': $scope.ProcOpSeq,//
                   'WorkCenter': $scope.WorkCenter//

               })
            );
         
            if($scope.ProcOpSeq == 1){
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
               'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
               'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
               'reason': ''
           })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("setupStartCase40_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("setupStartCase40_2", response);
                    $q.all(promiseArray3).then(function (response) {
                        console.log("setupStartCase40_3/4", response);
                        $q.all(promiseArray4).then(function (response) {
                            console.log("setupStartCase40_5", response);
                            $q.all(promiseArray5).then(function (response) {
                                console.log("setupStartCase40_6", response);
                                reload();
                            });
                        });
                    });
                });
            });











        }



        //'*******************************************************************
        //'Title     :  productionPauseCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupPauseCase5() {
            console.log("setupPauseCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    setupPauseCase6();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });

        }

        //'*******************************************************************
        //'Title     :  productionPauseCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionPauseCase5() {
            console.log("productionPauseCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    productionPauseCase6();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });

        }


        //'*******************************************************************
        //'Title     :  productionPauseCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionStartCase5() {
            console.log("productionStartCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    productionStartCase6();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });

        }


        //'*******************************************************************
        //'Title     :  productionPauseCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupPauseCase6() {
            console.log("setupPauseCase6");
            //var reason = $('#select_wotracking-pausereason option:selected').text();
            var reason = String($("#select_wotracking-pausereason-input").val()).trim();
            if (String(reason).trim() == "") {
                alert("Please select a reason");
            } else {
                setupPauseCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  productionPauseCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionPauseCase6() {
            console.log("productionPauseCase6");
           // var reason = $('#select_wotracking-pausereason option:selected').text();
            var reason = String($("#select_wotracking-pausereason-input").val()).trim();
            if (String(reason).trim() == "") {
                alert("Please select a reason");
            } else {
                productionPauseCase10();
            }
        }


        //'*******************************************************************
        //'Title     :  setupPauseCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupPauseCase10() {
            console.log("setupPauseCase10");
            if (config.strSkipWOTrackingPrompt) {
                setupPauseCase20();
            } else {
                var answer = confirm("Confirm to pause setup?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    setupPauseCase20();
                }
            }
        }


        //'*******************************************************************
        //'Title     :  productionPauseCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionPauseCase10() {
            console.log("productionPauseCase10");
            if (config.strSkipWOTrackingPrompt) {
                productionPauseCase20();
            } else {
                var answer = confirm("Confirm to pause production?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    productionPauseCase20();
                }
            }
        }
        //'*******************************************************************
        //'Title     :  setupPauseCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupPauseCase20() {
            console.log("setupPauseCase20");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            var currentdate = getCurrentDatetime();
            //currentdate = Date();
            // currentData = "";

            if(config.AllowMultipleOperator){
                //
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/setupPauseCase20_1', {// Multiple Operator
                    'StopDateTime': currentdate,
                    'endType': 'SetupPause',
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()
                })
            );
            } else {
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_1', {
                    'StopDateTime': currentdate,
                    'endType': 'SetupPause',
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                })
            );
            }
            





            $q.all(promiseArray1).then(function (response) {
                console.log("setupPauseCase20_1", response);

                //var reason = "SetupPause - " + String($('#select_wotracking-pausereason option:selected').text()).trim()
                var reason = "SetupPause - " + String($("#select_wotracking-pausereason-input").val()).trim();
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
                       'StartType': "SetupPause",
                       'McID': $scope.McID,
                       'McType': $scope.McType,
                       'reason': reason,
                       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                       'ShiftID': '0'
                   })
               );


                $q.all(promiseArray2).then(function (response) {
                    console.log("setupPauseCase20_2", response);
                    $q.all(promiseArray3).then(function (response) {

                        promiseArray3.push(
                         $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_3', {
                             'WOID': $scope.selectedWOIDData['woid'],
                             'ProcOpSeq': $scope.ProcOpSeq,
                             'ExStatus': 2,
                             'UpdatedDate': currentdate,
                             'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                             'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                             'reason': reason


                         })
                );
                        console.log("setupPauseCase20_3", response);
                        CheckWOOpnStatus();
                        //reload();
                    });
                });
            });





        }
        //'*******************************************************************
        //'Title     :  productionPauseCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionPauseCase20() {
            console.log("productionPauseCase20");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            var currentdate = getCurrentDatetime();
            //currentdate = Date();
            // currentData = "";

            if(config.AllowMultipleOperator){ //Multiple Operator
               promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_1_1', {
                    'StopDateTime': currentdate,
                    'endType': 'JobPause',
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()
                })
            );
            } else {
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_1', {
                        'StopDateTime': currentdate,
                        'endType': 'JobPause',
                        'WOID': $scope.selectedWOIDData['woid'],
                        'ProcOpSeq': $scope.ProcOpSeq,
                        'WorkCenter': $scope.WorkCenter,
                    })
                );
            }






            $q.all(promiseArray1).then(function (response) {
                console.log("productionPauseCase20_1", response);

                //var reason = "JobPause - " + String($('#select_wotracking-pausereason option:selected').text()).trim()
                var reason = "JobPause - " + String($("#select_wotracking-pausereason-input").val()).trim();
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
                       'StartType': "JobPause",
                       'McID': $scope.McID,
                       'McType': $scope.McType,
                       'reason': reason,
                       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                       'ShiftID': '0'
                   })
               );


                $q.all(promiseArray2).then(function (response) {
                    console.log("productionPauseCase20_2", response);
                    $q.all(promiseArray3).then(function (response) {

                        promiseArray3.push(
                         $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_3', {
                             'WOID': $scope.selectedWOIDData['woid'],
                             'ProcOpSeq': $scope.ProcOpSeq,
                             'ExStatus': 6,
                             'UpdatedDate': currentdate,
                             'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                             'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                             'reason': reason


                         })
                );
                        console.log("productionPauseCase20_3", response);
                        CheckWOOpnStatus();
                        //reload();
                    });
                });
            });





        }

        ////'*******************************************************************
        ////'Title     :  productionResumeCase1
        ////'Function  :  
        ////'Input     :  
        ////'Output    : 
        ////'Remark    :
        ////'*******************************************************************
        //function productionResumeCase1(){

        //}


        //'*******************************************************************
        //'Title     :  productionResumeCase2
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupResumeCase2() {
            console.log("setupResumeCase2");
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("setupResumeCase2.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("setupResumeCase2.2");
                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("setupResumeCase2.3");
                        setupResumeCase5();
                    } else {
                        console.log("setupResumeCase2.4");
                        var OperatorFirstName = $("#wotracking-table2-machine").val("");
                        var Password = $("#wotracking-table3-password").val("");
                    }
                });
            }
        }


        //'*******************************************************************
        //'Title     :  productionResumeCase2
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionResumeCase2() {
            console.log("productionResumeCase2");
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("productionResumeCase2.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("productionResumeCase2.2");
                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("productionResumeCase2.3");
                        productionResumeCase5();
                    } else {
                        console.log("productionResumeCase2.4");
                        var OperatorFirstName = $("#wotracking-table2-machine").val("");
                        var Password = $("#wotracking-table3-password").val("");
                    }
                });
            }
        }
        //'*******************************************************************
        //'Title     :  setupResumeCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupResumeCase5() {
            console.log("setupResumeCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    setupResumeCase6();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-password").val("");


                }
            });
        }


        //'*******************************************************************
        //'Title     :  productionResumeCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionResumeCase5() {
            console.log("productionResumeCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    productionResumeCase6();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-password").val("");


                }
            });
        }

        //'*******************************************************************
        //'Title     :  setupResumeCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupResumeCase6() {
            console.log("setupResumeCase6");
            if (config.strSkipWOTrackingPrompt) {
                setupResumeCase10();
            } else {
                var answer = confirm("Confirm to resume setup?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    setupResumeCase10();
                }
            }
        }

        //'*******************************************************************
        //'Title     :  productionResumeCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionResumeCase6() {
            console.log("productionResumeCase6");
            if (config.strSkipWOTrackingPrompt) {
                productionResumeCase10();
            } else {
                var answer = confirm("Confirm to resume production?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //    productionPauseCase20();
                //} else {
                //    if (answer) {
                //        productionPauseCase20();
                //    }
                //}

                if (answer) {
                    productionResumeCase10();
                }
            }
        }
        //'*******************************************************************
        //'Title     :  setupResumeCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupResumeCase10() {
            console.log("setupResumeCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var currentdate = getCurrentDatetime();

            if(config.AllowMultipleOperator){//Multiple Operator
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/setupResumeCase10_1', {
                        'StopDateTime': currentdate,
                        'endType': 'SetupContinue',
                        'WOID': $scope.selectedWOIDData['woid'],
                        'McID': $scope.McID,
                        'WorkCenter': $scope.WorkCenter,
                        'ProcOpSeq': $scope.ProcOpSeq,
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),

                    })
                );
            } else {
                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_1', {
                        'StopDateTime': currentdate,
                        'endType': 'SetupContinue',
                        'WOID': $scope.selectedWOIDData['woid'],
                        'McID': $scope.McID,
                        'WorkCenter': $scope.WorkCenter,
                        'ProcOpSeq': $scope.ProcOpSeq

                    })
                );
            }


            $q.all(promiseArray1).then(function (response) {
                console.log("setupResumeCase10 productionResumeCase10_1", response);

                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_2', {
                    'WOID': $scope.selectedWOIDData['woid'],
                    'WorkCenter': $scope.WorkCenter,
                    'RouteID': $scope.RouteID,
                    'OpSeq': $scope.OpSeq,
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'StartDateTime': currentdate,
                    'StartType': 'SetupContinue',
                    'McID': $scope.McID,
                    'McType': $scope.McType,
                    'reason': 'SetupContinue',
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                })
            );


                $q.all(promiseArray2).then(function (response) {
                    console.log("setupResumeCase10 productionResumeCase10_2", response);

                    var TotalSetupDuration = 0;
                    var subcontime = 0;
                    if (String($scope.McType).trim() == "Subcon") {

                        if (String($("#wotracking-table3-total").val()).trim() == '') {
                            subcontime = 0;
                        } else {
                            subcontime = parseFloat(String($("#wotracking-table3-total").val()).trim());

                        }
                        TotalSetupDuration = 0;
                        //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                        $("#wotracking-table3-total").val(subcontime);
                    } else {
                        if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                            $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                        }
                        if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                            $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                        }
                        subcontime = $("#wotracking-table3-productiontotalduration").val();
                        TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
                    }

                    $scope.WOExecutionStatus = "ProcessingStart";
                    promiseArray3.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_3', {
                        'WOStatus': $scope.WOExecutionStatus,//
                        // 'SetupStartDate': TotalSetupDuration,
                        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'ShiftID': 0,//
                        'McID': $scope.McID,//
                        'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                        'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                        'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                        'WOID': $scope.selectedWOIDData['woid'],//
                        'ProcOpSeq': $scope.ProcOpSeq,//
                        'WorkCenter': $scope.WorkCenter//

                    })
                 );

                    $q.all(promiseArray3).then(function (response) {
                        console.log("setupResumeCase10 productionResumeCase10_3", response);

                        promiseArray4.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_4', {
                        'WOID': $scope.selectedWOIDData['woid'],//
                        'ProcOpSeq': $scope.ProcOpSeq,//
                        'ExStatus': 7,
                        'UpdatedDate': currentdate,
                        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'reason': ''
                    })
                );
                        $q.all(promiseArray4).then(function (response) {
                            console.log("setupResumeCase10 productionResumeCase10_4", response);
                            CheckWOOpnStatus();
                        });


                    });

                });
            });





            //$q.all(promiseArray1).then(function (response) {
            //    console.log("productionResumeCase10_1", response);
            //    $q.all(promiseArray2).then(function (response) {
            //        console.log("productionResumeCase10_2", response);
            //        $q.all(promiseArray3).then(function (response) {
            //            console.log("productionResumeCase10_3", response);
            //            $q.all(promiseArray4).then(function (response) {
            //                console.log("productionResumeCase10_4", response);
            //                reload();
            //            });
            //        });
            //    });
            //});



        }

        //'*******************************************************************
        //'Title     :  productionResumeCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionResumeCase10() {
            console.log("productionResumeCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var currentdate = getCurrentDatetime();

            //Multiple Operator
            if(config.AllowMultipleWO){
                promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_1_1', {
                'StopDateTime': currentdate,
                'endType': 'JobContinue',
                'WOID': $scope.selectedWOIDData['woid'],
                'McID': $scope.McID,
                'WorkCenter': $scope.WorkCenter,
                'ProcOpSeq': $scope.ProcOpSeq,
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()

            })
         );
            } else {
                promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_1', {
                'StopDateTime': currentdate,
                'endType': 'JobContinue',
                'WOID': $scope.selectedWOIDData['woid'],
                'McID': $scope.McID,
                'WorkCenter': $scope.WorkCenter,
                'ProcOpSeq': $scope.ProcOpSeq

            })
         );
            }


            $q.all(promiseArray1).then(function (response) {
                console.log("productionResumeCase10_1/productionResumeCase10_1_1", response);

                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_2', {
                    'WOID': $scope.selectedWOIDData['woid'],
                    'WorkCenter': $scope.WorkCenter,
                    'RouteID': $scope.RouteID,
                    'OpSeq': $scope.OpSeq,
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'StartDateTime': currentdate,
                    'StartType': 'JobContinue',
                    'McID': $scope.McID,
                    'McType': $scope.McType,
                    'reason': 'JobContinue',
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                })
            );


                $q.all(promiseArray2).then(function (response) {
                    console.log("productionResumeCase10_2", response);

                    var TotalSetupDuration = 0;
                    var subcontime = 0;
                    if (String($scope.McType).trim() == "Subcon") {

                        if (String($("#wotracking-table3-total").val()).trim() == '') {
                            subcontime = 0;
                        } else {
                            subcontime = parseFloat(String($("#wotracking-table3-total").val()).trim());

                        }
                        TotalSetupDuration = 0;
                        //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                        $("#wotracking-table3-total").val(subcontime);
                    } else {
                        if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                            $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                        }
                        if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                            $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                        }
                        subcontime = $("#wotracking-table3-productiontotalduration").val();
                        TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
                    }

                    $scope.WOExecutionStatus = "ProcessingStart";
                    promiseArray3.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_3', {
                        'WOStatus': $scope.WOExecutionStatus,//
                        // 'SetupStartDate': TotalSetupDuration,
                        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                        'ShiftID': 0,//
                        'McID': $scope.McID,//
                        'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                        'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                        'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                        'WOID': $scope.selectedWOIDData['woid'],//
                        'ProcOpSeq': $scope.ProcOpSeq,//
                        'WorkCenter': $scope.WorkCenter//

                    })
                 );

                    $q.all(promiseArray3).then(function (response) {
                        console.log("productionResumeCase10_3", response);

                        promiseArray4.push(
    $http.post(config.baseUrlApi + 'HMLVTS/productionResumeCase10_4', {
        'WOID': $scope.selectedWOIDData['woid'],//
        'ProcOpSeq': $scope.ProcOpSeq,//
        'ExStatus': 7,
        'UpdatedDate': currentdate,
        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
        'reason': ''
    })
);
                        $q.all(promiseArray4).then(function (response) {
                            console.log("productionResumeCase10_4", response);
                            CheckWOOpnStatus();
                        });


                    });

                });
            });





            //$q.all(promiseArray1).then(function (response) {
            //    console.log("productionResumeCase10_1", response);
            //    $q.all(promiseArray2).then(function (response) {
            //        console.log("productionResumeCase10_2", response);
            //        $q.all(promiseArray3).then(function (response) {
            //            console.log("productionResumeCase10_3", response);
            //            $q.all(promiseArray4).then(function (response) {
            //                console.log("productionResumeCase10_4", response);
            //                reload();
            //            });
            //        });
            //    });
            //});



        }

        //'*******************************************************************
        //'Title     :  setupStopCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase5() {
            console.log("setupStopCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    setupStopCase6();

                } else {
                    // alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });
        }

        //'*******************************************************************
        //'Title     :  productionStopCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionStopCase5() {
            console.log("productionStopCase5");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    productionStopCase6();

                } else {
                    // alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });
        }
        //'*******************************************************************
        //'Title     :  setupStopCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase6() {
            console.log("setupStopCase6");
            if (config.strSkipWOTrackingPrompt) {
                setupStopCase10();
            } else {

                var answer = confirm("Confirm to stop setup?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //        setupStartCase5();
                //} else {
                //    if (answer) {
                //        setupStartCase5();
                //    }
                //}

                if (answer) {
                    setupStopCase10();
                }
            }
        }
        //'*******************************************************************
        //'Title     :  productionStopCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionStopCase6() {
            console.log("productionStopCase6");
            if (config.strSkipWOTrackingPrompt) {
                productionStopCase10();
            } else {

                var answer = confirm("Confirm to stop production?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //        setupStartCase5();
                //} else {
                //    if (answer) {
                //        setupStartCase5();
                //    }
                //}

                if (answer) {
                    productionStopCase10();
                }


            }
        }
        //'*******************************************************************
        //'Title     :  setupStopCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase10() {
            console.log("setupStopCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_1', {
                            'StopDateTime': currentdate,
                            'endType': 'SetupEnd',
                            'WOID': $scope.selectedWOIDData['woid'],
                            'McID': $scope.McID,
                            'WorkCenter': $scope.WorkCenter,
                            'ProcOpSeq': $scope.ProcOpSeq

                        })
                     );

            $q.all(promiseArray1).then(function (response) {
                console.log("setupStopCase10 productionStopCase10_1", response);
                setupStopCase20();
            });

        }

        //'*******************************************************************
        //'Title     :  setupStopCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase20() {
            console.log("setupStopCase20");
            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                setupStopCase40();
            } else {
                var answer = confirm("Would you like to continue production ? ");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //        setupStartCase5();
                //} else {
                //    if (answer) {
                //        setupStartCase5();
                //    }
                //}

                if (answer) {
                    setupStopCase40();
                } else {
                    setupStopCase30();
                }
            }
        }

        

        //'*******************************************************************
        //'Title     :  setupStopCase30
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase30() {
            console.log("setupStopCase30");
            //setupStartCase40_1

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray5 = [];
            var currentdate = getCurrentDatetime();
            var StartType = "SetupEnd";
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'WorkCenter': $scope.WorkCenter,
                'RouteID': $scope.RouteID,
                'OpSeq': $scope.OpSeq,
                'ProcOpSeq': $scope.ProcOpSeq,
                'StartDateTime': currentdate,
                'StartType': StartType,
                'McID': $scope.McID,
                'McType': $scope.McType,
                'reason': StartType,
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                'ShiftID':0



            })
         );

            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = $("#wotracking-table3-productiontotalduration").val();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }

            $scope.WOExecutionStatus = "ProcessingStart";
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/setupStopCase30_1', {
                   'WOStatus': $scope.WOExecutionStatus,//
                   'SetupEndDate': currentdate,
                   'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'ShiftID': 0,//
                   'McID': $scope.McID,//
                   'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                   'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                   'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                   'WOID': $scope.selectedWOIDData['woid'],//
                   'ProcOpSeq': $scope.ProcOpSeq,//
                   'WorkCenter': $scope.WorkCenter//

               })
            );

            //if ($scope.ProcOpSeq == 1) {
            //    $scope.WOStatus = "Processing";
            //    promiseArray3.push(
            //       $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_3', {
            //           'WOStatus': $scope.WOStatus,
            //           'StartDate': currentdate,
            //           'WOID': $scope.selectedWOIDData['woid']
            //       })
            //    );
            //} else {
            //    $scope.WOStatus = "Processing";
            //    promiseArray3.push(
            //       $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_4', {
            //           'WOStatus': $scope.WOStatus,
            //           'WOID': $scope.selectedWOIDData['woid']
            //       })
            //    );
            //}

            //promiseArray4.push(
            //       $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_5', {
            //           'ID': $scope.PPID,
            //           'Status': $scope.WOStatus
            //       })
            //    );

            promiseArray5.push(
           $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_6', {
               'WOID': $scope.selectedWOIDData['woid'],//
               'ProcOpSeq': $scope.ProcOpSeq,//
               'ExStatus': 4,
               'UpdatedDate': currentdate,
               'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
               'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
               'reason': ''
           })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("setupStopCase30 setupStartCase40_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("setupStopCase30 setupStopCase30_1", response);
                            $q.all(promiseArray5).then(function (response) {
                                console.log("setupStopCase30 setupStartCase40_6", response);
                                // setupStopCase50();
                                CheckWOOpnStatus();
                            });
                        });
            });
        }

        //'*******************************************************************
        //'Title     :  setupStopCase40
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStopCase40() {
            console.log("setupStopCase40");
            //productionPauseCase20_2
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_2', {
                       'WOID': $scope.selectedWOIDData['woid'],
                       'WorkCenter': $scope.WorkCenter,
                       'RouteID': $scope.RouteID,
                       'OpSeq': $scope.OpSeq,
                       'ProcOpSeq': $scope.ProcOpSeq,
                       'StartDateTime': currentdate,
                       //'endType': '',
                       'StartType': "JobStart",
                       'McID': $scope.McID,
                       'McType': $scope.McType,
                       'reason': "JobStart",
                       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                       'ShiftID': '0'
                   })
               );



            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = $("#wotracking-table3-productiontotalduration").val();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }


                    $scope.WOExecutionStatus = "ProcessingStart";
                        promiseArray2.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/setupStopCase40_1', {
                       'WOStatus': $scope.WOExecutionStatus,//
                       'SetupEndDate': currentdate,
                       'ProdStartDate':currentdate,
                       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                       'McID': $scope.McID,//
                       'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                       'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                       'WOID': $scope.selectedWOIDData['woid'],//
                       'ProcOpSeq': $scope.ProcOpSeq,//
                       'WorkCenter': $scope.WorkCenter//
                   })
               );

                        promiseArray3.push(
             $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_3', {
                 'WOID': $scope.selectedWOIDData['woid'],
                 'ProcOpSeq': $scope.ProcOpSeq,
                 'ExStatus': 5,
                 'UpdatedDate': currentdate,
                 'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                 'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                 'reason': ''


             })
    );


            $q.all(promiseArray1).then(function (response) {
                console.log("setupStopCase40.1 productionPauseCase20_2", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("setupStopCase40.2 setupStopCase40_1", response);
                    $q.all(promiseArray3).then(function (response) {
                        console.log("setupStopCase40.3 productionStopCase10_3", response);
                        CheckWOOpnStatus();
                    });

                });
            });
        }
        //'*******************************************************************
        //'Title     :  productionStopCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function productionStopCase10() {
            console.log("productionStopCase10");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_1', {
                            'StopDateTime': currentdate,
                            'endType': 'JobEnd',
                            'WOID': $scope.selectedWOIDData['woid'],
                            'McID': $scope.McID,
                            'WorkCenter': $scope.WorkCenter,
                            'ProcOpSeq': $scope.ProcOpSeq

                        })
                     );




            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                } 
                TotalSetupDuration = 0;
                subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = $("#wotracking-table3-productiontotalduration").val();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }

            $scope.WOExecutionStatus = "ProcessingStop";
            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_2', {
                'WOStatus': $scope.WOExecutionStatus,//
                'ProdEndDate': currentdate,
                // 'SetupStartDate': TotalSetupDuration,
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                // 'ShiftID': 0,//
                'McID': $scope.McID,//
                'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq,//
                'WorkCenter': $scope.WorkCenter//

            })
         );

            promiseArray3.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionStopCase10_3', {
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'ExStatus': 8,
                    'UpdatedDate': currentdate,
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'reason': ''
                })
        );


            $q.all(promiseArray1).then(function (response) {
                console.log("productionStopCase10_1", response);
                CalculateTimeSpan("Production");
            });
            $q.all(promiseArray2).then(function (response) {
                console.log("productionStopCase10_2", response);
            });
            $q.all(promiseArray3).then(function (response) {
                console.log("productionStopCase10_3", response);

                CheckWOOpnStatus();
                $scope.reload = true;
                $scope.cmdUpdate_Click();
                
            });


        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase2
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase2() {
            //todo: line 8333
            console.log("cmdUpdateReceived_ClickCase2");
            var promiseArray1 = fnValidateUserNameMCAssign();

            $q.all(promiseArray1).then(function (response) {
                console.log("fnValidateUserNameMCAssign", response);
                if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                    //  if(true){
                    $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                    $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                    cmdUpdateReceived_ClickCase5();

                } else {
                    alert("Operator is not assigned to operate this machine.");
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-password").val("");
                    //$("#wotracking-table3-loginName").val("");

                    //this is case30, skip
                    //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                    //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                    //    if (confirm1) {
                    //        setupStartCase40();
                    //    } 
                    //} else {
                    //    setupStartCase40();
                    //}
                }
            });

        }

        //'*******************************************************************
        //'Title     :  btnScrap_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : function to check operator lists  //multiple Operator
        //'*******************************************************************
        $scope.btnOperatorList_Click = function () {
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();  

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                var promiseArray1 = []
                promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GenerateOperatorList', {
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq
                })
                );


                $q.all(promiseArray1).then(function (response) {
                    console.log("GenerateOperatorList", response);
                    if (response.length != 0 && response[0].data.success) {
                        makeTableOperatorList(response[0].data.result);
                    } else {
                        makeTableOperatorList([]);

                    }
                    

        });
                $("#operatorListModal").modal("show");
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
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                if (String(document.getElementById("WIP-td5_1").innerHTML).trim() == "") {
                    alert("Please update received qty!");
                } else {
                    var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
                    var password = String($("#wotracking-table3-password").val()).trim();
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
                                $("#wotracking-table3-operatorName").val("");
                                $("#wotracking-table3-password").val("");
                            }
                        });
                    }
                }
            }



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
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();

            if (select_WOID == "") {
                alert("Please enter Work Order");
            } else {
                if (String(document.getElementById("WIP-td5_1").innerHTML).trim() == "") {
                    alert("Please update received qty!");
                } else {
                    var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
                    var password = String($("#wotracking-table3-password").val()).trim();
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
                                    if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                                        if ($("#production-row-2").css("display") == "none") {
                                            btnCancelWO_ClickCase20();
                                        } else {
                                            btnCancelWO_ClickCase30();
                                        }
                                    } else {
                                        if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") != "none") && ($("#production-row-2").css("display") == "none") ||
                                            ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") != "none") ||
                                            ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") == "none")
                                            ) {
                                            btnCancelWO_ClickCase20();
                                        } else {
                                            btnCancelWO_ClickCase30();
                                        }
                                    }

                                }








                            } else {
                                console.log("btnCancel_Click3");
                                $("#wotracking-table3-operatorName").val("");
                                $("#wotracking-table3-password").val("");
                            }
                        });
                    }
                }
            }




        }

        //'*******************************************************************
        //'Title     :  cmdUpdate_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : save complete
        //'*******************************************************************
        $scope.cmdUpdate_Click = function () {
            console.log("$scope.cmdUpdate_Click");
            var ReceivedQty = 0;
            if (String(document.getElementById("WIP-td9_1").innerHTML).trim() != "") {
                ReceivedQty = parseInt(String(document.getElementById("WIP-td9_1").innerHTML).trim());
            }

            console.log("ReceivedQty", ReceivedQty);
            $("#wotracking-newReceived").val(ReceivedQty);
            $("#wotracking-currentReceived").val(ReceivedQty);

            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
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
                        cmdUpdate_ClickCase1();
                    } else {
                        console.log("cmdUpdateReceived_ClickCase1.8");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                    }
                });
            }

        }



        //'*******************************************************************
        //'Title     :  cmdOnHold_Click
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : on hold
        //'*******************************************************************
        $scope.cmdOnHold_Click = function () {
            $scope.pausereason = "";
            $scope.holdtype = "";
           // var select_WOID = $('#select_wotracking-woid option:selected').text();
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();
            if (String(select_WOID).trim() == "") {
                alert("Please enter Work Order");
            }


            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password").val()).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdOnHold_Click1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                console.log("cmdOnHold_Click2");
                var promiseArray1 = ValidateOperatorName(false);
                console.log("ValidateOperatorName", promiseArray1);
                $q.all(promiseArray1).then(function (response) {
                    console.log("Token/GetToken", response);
                    //todo: check whether the current login id and firstname is the same as the return result
                    //global function line 277 loops
                    if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
                        console.log("cmdOnHold_Click3");
                        cmdOnHold_ClickCase5();
                    } else {
                        console.log("cmdOnHold_Click4");
                        var OperatorFirstName = $("#wotracking-table2-machine").val("");
                        var Password = $("#wotracking-table3-password").val("");
                    }
                });
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdOnHold_ClickCase5() {
            console.log("cmdOnHold_ClickCase5");
            //var reason = $('#select_wotracking-pausereason option:selected').text();
            var reason = String($("#select_wotracking-pausereason-input").val()).trim();
            if (String(reason).trim() == "") {
                alert("Please select a reason");
            } else {
                $scope.pausereason = String(reason).trim();
                cmdOnHold_ClickCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdOnHold_ClickCase10() {
            console.log("cmdOnHold_ClickCase10");
            if (config.strSkipWOTrackingPrompt) {
                cmdOnHold_ClickCase20();
            } else {
                var answer = confirm("Confirm to on hold work order?");
                //todo to implement, trackingdefault ok in model so that default button can change
                //if (config.TrackingDefaultOK) {
                //        setupStartCase5();
                //} else {
                //    if (answer) {
                //        setupStartCase5();
                //    }
                //}

                if (answer) {
                    cmdOnHold_ClickCase20();
                }
            }

        }


        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdOnHold_ClickCase20() {

            $scope.cmdUpdate_Click();
            console.log("cmdOnHold_ClickCase20");
            //$("#setup-row-2").hide();
            //$("#setup-row-3").show();
            //$("#setup-row-4").hide();
            //$("#setup-row-5").show();
            ////pause reason
            //$("#select_wotracking-pausereason").val("");
            //$("#production-row-2").hide();
            //$("#production-row-3").hide();
            //$("#production-row-4").hide();
            //$("#production-row-5").hide();
            if (document.getElementById("setup-row-2").display == "block" || // to check, since setup start always allowed
                document.getElementById("setup-row-3").display == "block" ||
                document.getElementById("setup-row-4").display == "block" ||
            document.getElementById("setup-row-5").display == "block") {
                $scope.holdtype = "SetupHold";
            } else {
                $scope.holdtype = "JobHold";
            }


            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var currentdate = getCurrentDatetime();
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/cmdOnHold_ClickCase20_1', {
                'StopDateTime': currentdate,
                'endType': 'JobEnd',
                'WOID': $scope.selectedWOIDData['woid'],
                'McID': $scope.McID,
                'WorkCenter': $scope.WorkCenter,
                'ProcOpSeq': $scope.ProcOpSeq

            })
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdOnHold_ClickCase20_1", response);
                promiseArray2.push(
                   $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_2', {
                       'WOID': $scope.selectedWOIDData['woid'],
                       'WorkCenter': $scope.WorkCenter,
                       'RouteID': $scope.RouteID,
                       'OpSeq': $scope.OpSeq,
                       'ProcOpSeq': $scope.ProcOpSeq,
                       'StartDateTime': currentdate,
                       //'endType': '',
                       'StartType': $scope.holdtype,
                       'McID': $scope.McID,
                       'McType': $scope.McType,
                       'reason': $scope.holdtype + " - " + $scope.pausereason,
                       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                       'ShiftID': '0'
                   })
               );


                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdOnHold_ClickCase20_2", response);
                    $scope.WOExecutionStatus = "ProcessingHold";

                    var TotalSetupDuration = 0;
                    var subcontime = 0;
                    if (String($scope.McType).trim() == "Subcon") {

                        if (String($("#wotracking-table3-total").val()).trim() == '') {
                            subcontime = 0;
                        }
                        TotalSetupDuration = 0;
                        subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                        //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                        $("#wotracking-table3-total").val("0.00");
                    } else {
                        if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                            $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                        }
                        if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                            $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                        }
                        subcontime = $("#wotracking-table3-productiontotalduration").val();
                        TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
                    }

                    console.log("productionPauseCase20_3 time", subcontime)
                    promiseArray3.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/cmdOnHold_ClickCase20_3', {
                        'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                        'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),
                        'McID': $scope.McID,
                        'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                        'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                        'WOID': $scope.selectedWOIDData['woid'],
                        'WorkCenter': $scope.WorkCenter,
                        'ProcOpSeq': $scope.ProcOpSeq,
                        'WOStatus': $scope.WOExecutionStatus
                    })
                );

                    $q.all(promiseArray3).then(function (response) {
                        console.log("cmdOnHold_ClickCase20_3", response);
                        CheckWOOpnStatus();
                    });
                });
            });




        }
        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdateReceived_ClickCase2() {
            console.log("cmdUpdateReceived_ClickCase2");
            if (config.DefaultReceiveQty) {
                if (config.skipReceiveQty) {
                    $scope.strparaPreScrapQty = 0;


                   

                    GenerateWOSummary();
                    GenerateWOSummaryScrap
                    $scope.WOGlobalWOReceivedQty = $scope.PreviousRecQty;
                    //3 - actual receive qty WIP-td3_1
                    //4 completed qty
                    //7 OutstandingQty
                    document.getElementById("WIP-td5_1").innerHTML = $scope.WOGlobalWOReceivedQty;
                    document.getElementById("WIP-td5_2").innerHTML = getCurrentDatetime().replace("T");

                    document.getElementById("WIP-td9_1").innerHTML = $scope.OutstandingQty + $scope.WOGlobalWOReceivedQty + $scope.strparaPreScrapQty;
                    document.getElementById("WIP-td9_2").innerHTML = getCurrentDatetime().replace("T");
                    CalculateDuration();
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

            console.log("cmdUpdateReceived_ClickCase6", $scope.PreviousRecQty);
            //$scope.ReceivedQty = $scope.PreviousRecQty;
            if ($scope.PreviousRecQty != "") {
                $("#wotracking-newReceived").val($scope.PreviousRecQty);
            }

            $("#modalWOID").val($scope.selectedWOIDData["woid"]);
            $("#preprocess-woid").val($scope.selectedWOIDData["woid"]);
            $("#preprocess-scrapQty").val("");
            $scope.PreScrapQty = "";
            $scope.newReceived = "";

            $('#updateReceiveModal').modal('toggle');


        }

        //'*******************************************************************
        //'Title     :  cmdUpdateReceived_ClickCase6
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdUpdate_ClickCase6() {

            console.log("cmdUpdate_ClickCase6", $scope.PreviousRecQty);
            //$scope.ReceivedQty = $scope.PreviousRecQty;
            $("#wotracking-newReceived").val($scope.PreviousRecQty);
            console.log("scope", $scope.WOGlobalWOCompletedQty);
            console.log("scope", $scope);


            if ($("#saveCompleteModal-current").val() == "") {
                console.log("saveCompleteModal1", $scope.CompletedQty);
                $("#saveCompleteModal-current").val(parseInt(String(document.getElementById("WIP-td6_1").innerHTML).trim()));
            }

            $("#saveCompleteModal-new").val($scope.OutstandingQty);
            $("#modal-woid1").val($scope.selectedWOIDData["woid"]);
            //$("#preprocess-woid").val($scope.selectedWOIDData["woid"]);
            // $("#preprocess-scrapQty").val("");
            $scope.PreScrapQty = "";
            $scope.newReceived = "";

            $('#saveCompleteModal').modal('toggle');


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
            if ($scope.CompletedQty == $scope.ActualRecQty  - $scope.ScrapScrapQty) { //completed
                console.log("cmdUpdate_ClickCase8.1");
                if ($scope.WOGlobalWOOpnState != 7) {
                    console.log("cmdUpdateReceived_ClickCase8.2");
                    if (String($scope.McType).trim().toLowerCase() == "inhouse") {
                        alert("Please stop production before complete the work order.");
                    } else {
                        alert("Please enter recieved date before complete the work order.");
                    }
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
                alert("Please enter the correct completed qty. Max qty is " + $scope.ActualRecQty );
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
            var currentdate = getCurrentDatetime();
            var promiseArray1 = [];
            var promiseArray2 = [];

            var subcontime = 0;
            var TotalSetupDuration = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val(parseInt(String($("#wotracking-table3-total").val()).trim()));
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                TotalSetupDuration = String($("#wotracking-table3-setuptotalduration").val()).trim();
            }


            console.log('cmdUpdateReceived_ClickCase10_1 completedqty', $scope.CompletedQty);
            console.log('cmdUpdateReceived_ClickCase10_1 actualreceive', $scope.ActualRecQty);
            console.log('cmdUpdateReceived_ClickCase10_1 newReceived', $scope.newReceived);
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_1', {
                  //'ActualRecQty': $scope.ActualRecQty,//
                  'ActualRecQty':$scope.newReceived,
                  'ActualRecDate': currentdate,//
                  'CompletedQty': $scope.CompletedQty,//
                  'CompletedDate': currentdate,//
                  'OutstandingQty': $scope.OutstandingQty,//
                  'OutstandingDate': currentdate,//
                  'WOStatus': $scope.WOExecutionStatus,//
                  'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                  'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
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
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'reason': ''
                })
            );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase10_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdUpdateReceived_ClickCase10_2", response);
                    cmdUpdateReceived_ClickCase15();
                });
            });

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

            var subcontime = 0;
            var TotalSetupDuration = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                subcontime = parseFloat($("#wotracking-table3-total").val().trim());
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val(parseInt(String($("#wotracking-table3-total").val()).trim()));
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                TotalSetupDuration = String($("#wotracking-table3-setuptotalduration").val()).trim();
            }

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_1', {
                  'ActualRecQty': parseInt($scope.ActualRecQty),//
                  'ActualRecDate': currentdate,//
                  'CompletedQty': $scope.CompletedQty,//
                  'CompletedDate': currentdate,//
                  'OutstandingQty': $scope.ActualRecQty - $scope.CompletedQty - $scope.ScrapScrapQty,//
                  'OutstandingDate': currentdate,//
                  'WOStatus': $scope.WOExecutionStatus,//
                  'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                  'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                  'WOID': $scope.selectedWOIDData['woid'],
                  'WorkCenter': $scope.WorkCenter,//
                  'ProcOpSeq': $scope.ProcOpSeq//
              })
          );



            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase10 cmdUpdate_ClickCase10_1", response);
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

                    if (response.length!= 0 && response[0].data.success && response[0].data.result.length!= 0) {
                        $scope.LastProcOpSeq = response[0].data.result[0]['LastProcOpSeq'];
                        if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                            cmdUpdate_ClickCase18();
                        } else{
                            cmdUpdate_ClickCase100();
                        }
                    } else {
                        alert("No route sequence found. ");
                    }
                    cmdUpdateReceived_ClickCase100();
                });

            }
        }

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
                  'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
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
                  'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
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
                if(response.length != 0 && response[0].data.result.length != 0){

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
                            if($scope.CompletedQty > 0){
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
                        cmdUpdate_ClickCase80();
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
        function cmdUpdate_ClickCase50(){
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
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdate_ClickCase80_1', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'EndDate': getCurrentDatetime()
              })
          );
            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdate_ClickCase80_2', {
                  'WOID': $scope.selectedWOIDData['woid'],//
                  'WOStatus': $scope.WOStatus
              })
          );
            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase80_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdUpdate_ClickCase80_2", response);
                    cmdUpdate_ClickCase90();
                });
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






            //if (CheckAnyChildNotCompleted1() == 0) // check all child WOs completed ?
            //{
            //    //all child WOs completed
            //    WOStatus = "Completed";
            //    cmdUpdate_ClickCase95();
            //}


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
            //if (CheckAnyChildNotCompleted1() == 0) // check all child WOs completed ?
            //{
            //    //all child WOs completed
            //    WOStatus = "Completed";
            //    cmdUpdateReceived_ClickCase95();
            //}
           

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

            var promiseArray1 = [];
            var promiseArray2 = [];

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );

            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                  'id': $scope.PPID,
                  'Status': $scope.WOStatus

              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdate_ClickCase95_1", response);

            });

            $q.all(promiseArray2).then(function (response) {
                console.log("cmdUpdate_ClickCase80_2", response);

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

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']
                  
              })
          );

            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                  'id': $scope.PPID,
                  'Status':$scope.WOStatus
                  
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase95_1", response);

            });

            $q.all(promiseArray2).then(function (response) {
                console.log("cmdUpdateReceived_ClickCase80_2", response);

            });
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
            if ($scope.McType.toLowerCase() == "inhouse") {
                ReCheck($scope.selectedWOID);
                //CheckWOOpnStatus();
                console.log("saveCompleteModal2", $scope.CompletedQty);
                $("#saveCompleteModal-current").val($scope.CompletedQty);

            } else {
                ReCheck($scope.selectedWOID);
                //CheckSubconWOOpnStatus();
                console.log("saveCompleteModal3", $scope.CompletedQty);
                $("#saveCompleteModal-current").val($scope.CompletedQty);

            }


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
            if ($scope.McType.toLowerCase() == "inhouse") {
                console.log("cmdUpdateReceived_ClickCase100.1");
               // CheckWOOpnStatus();
                ReCheck($scope.selectedWOID);
            } else {
                console.log("cmdUpdateReceived_ClickCase100.2");
             //   CheckSubconWOOpnStatus();
                ReCheck($scope.selectedWOID);
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
            $scope.strReturnNewCompletedQty = "";

            if (String(document.getElementById('WIP-td9_1').innerHTML).trim() == "") {
                $scope.OutstandingQty = 0
            } 

            console.log("cmdUpdate_ClickCase1");
           // var select_WOID = $('#select_wotracking-woid option:selected').text();
            var select_WOID = String($('#select_wotracking-woid-input').val()).trim();
            if (String(select_WOID).trim() == "") {
                alert("Please enter Work Order");
            } else {
                if (String($scope.McType).trim().toLowerCase() == 'inhouse') {
                    if (document.getElementById('setup-row-2').display == "block") {
                        alert("Please start operation first.");
                    } else {
                        cmdUpdate_ClickCase2();
                    }
                } else {
                    //todo: line 839  - 848
                    console.log("todo cmdUpdate_ClickCase1");
                }
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

            //  if (String($scope.McType).trim().toLowerCase() == "inhouse") {


            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            var password = String($("#wotracking-table3-password")).trim();
            if (operatorName == "" || password == "") {
                console.log("cmdUpdate_ClickCase2.1");
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                var promiseArray1 = fnValidateUserNameMCAssign();

                $q.all(promiseArray1).then(function (response) {
                    console.log("fnValidateUserNameMCAssign", response);
                    if (response.length != 0 && response[0].data.success && response[0].data.result.length != 0) {
                        //  if(true){
                        $("#wotracking-table3-operatorName").val(authService.currentUser.userName);
                        $("#wotracking-table3-loginName").val(authService.currentUser.userName);
                        cmdUpdate_ClickCase5();

                    } else {
                        alert("Operator is not assigned to operate this machine.");
                        $("#wotracking-table3-operatorName").val("");
                        $("#wotracking-table3-password").val("");
                        //$("#wotracking-table3-loginName").val("");

                        //this is case30, skip
                        //if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                        //    var confirm1 = confirm("Would you like to continue with the selected machine ?");
                        //    if (confirm1) {
                        //        setupStartCase40();
                        //    } 
                        //} else {
                        //    setupStartCase40();
                        //}
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
        //'Title     :  cmdConfirm_ClickCase8
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdConfirm_ClickCase8() {
            console.log("cmdConfirm_ClickCase8");
            if ($("#receivedDateInput").prop("disabled")) {
                var startDate = new Date($scope.SendOutDate);
                var endDate = new Date($scope.ReceivedDate);
                if (startDate.getTime() > endDate.getTime()) {
                    alert("Receive date must be later than send out date.");
                } else {
                    cmdConfirm_ClickCase10();
                }
            } else {
                cmdConfirm_ClickCase10();
            }
        }

        //'*******************************************************************
        //'Title     :  cmdConfirm_ClickCase10
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :      //gh 2014Jul16 - solve parent WO completed before child WO
        //           :      check all dependent WO completed before proceed with Assembly WO
        //'*******************************************************************
        function cmdConfirm_ClickCase10() {
            console.log("cmdConfirm_ClickCase10");
            console.log("setupStartCase12");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                //todo line3946-3970




                console.log("setupStartCase12 subassembly", $scope.subAssembly);

                if(config.AllowMultipleOperator){
                    if (config.AssemblyCheckAtLastOnly) { //Multiple Operator  S5 v3.1 line:7100
                        var promiseArray1 = [];
                        promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/cmdConfirm_ClickCase10', {
                            'WOID': $scope.selectedWOIDData['woid']
                        })
                     );

                        $q.all(promiseArray1).then(function (response) {
                            console.log("cmdConfirm_ClickCase10", response);

                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    if (response[0].data.result.length != 0) {

                                        $scope.LastProcOpSeq = response[0].data.result[0]['lastProcOpSeq'];
                                        if ($scope.ProcOpSeq >= $scope.LastProcOpSeq) {
                                            cmdConfirm_ClickCase12();
                                        } else {
                                            cmdConfirm_ClickCase15();
                                        }
                                    } else {
                                        cmdConfirm_ClickCase15();
                                    }
                                } else {
                                    alert("ERROR:cmdConfirm_ClickCase10");
                                }
                            } else {
                                cmdConfirm_ClickCase15();
                            }

                        });

                    }
                } else {
                    for (var i = 0; i < $scope.subAssembly.length; i++) {
                        if (String($scope.subAssembly[i]['woStatus']).tirm().toLowerCase() != "completed") {
                            cmdConfirm_ClickCase60();
                        }
                    }

                    cmdConfirm_ClickCase15();
                }

            } else {
                cmdConfirm_ClickCase15();
            }

        }


        //'*******************************************************************
        //'Title     :  setupStartCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : new case for Multiple Operator S5 v3.1 line:7144
        //'*******************************************************************
        function cmdConfirm_ClickCase12() {
            console.log("cmdConfirm_ClickCase12");
            if (String($scope.OrderType).trim().toLocaleLowerCase() == "assembly") {
                for (var i = 0; i < $scope.subAssembly.length; i++) {
                    if (String($scope.subAssembly[i]['woStatus']).tirm().toLowerCase() != "completed") {
                        cmdConfirm_ClickCase60();
                    }
                }

                cmdConfirm_ClickCase15();
            } else {
                cmdConfirm_ClickCase15();
            }

        }

        //'*******************************************************************
        //'Title     :  setupStartCase15
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :check all dependent WO completed before proceed with Assembly WO
        //'*******************************************************************
        function cmdConfirm_ClickCase15() {
            console.log("cmdConfirm_ClickCase15");

                
            if (!$("#sendDateInput").prop("disabled")) {
                var answer = confirm("Confirm to send out work order?");
                if (answer) {
                    cmdConfirm_ClickCase20();
                }
            } else{
                var answer = confirm("Confirm receive work order?");
                if (answer) {
                    cmdConfirm_ClickCase20();
                }
            }
            //var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            //var password = String($("#wotracking-table3-password").val()).trim();
            //if (operatorName == "" || password == "") {
            //    console.log("setupStartCase15.1");
            //    alert("Please enter Operator Name or scan Operator ID");
            //} else {
            //    console.log("cmdConfirm_ClickCase15.2");
            //    // console.log("test validate", ValidateOperatorName(false));


            //    var promiseArray1 = ValidateOperatorName(false);
            //    console.log("ValidateOperatorName", promiseArray1);
            //    $q.all(promiseArray1).then(function (response) {
            //        console.log("Token/GetToken", response);
            //        //todo: check whether the current login id and firstname is the same as the return result
            //        //global function line 277 loops
            //        if (response.length != 0 && response[0].data != undefined && response[0].data.success != null && response[0].data.success) {
            //            console.log("cmdConfirm_ClickCase15.3");
            //            cmdConfirm_ClickCase20_25_30();
            //        } else {
            //            console.log("cmdConfirm_ClickCase15.4");
            //            $("#wotracking-table3-operatorName").val("");
            //            $("#wotracking-table3-password").val("");
            //        }
            //    });


            //}
        }

        //'*******************************************************************
        //'Title     :  cmdConfirm_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdConfirm_ClickCase20() { 
            console.log("setupStartCase20");
            if (!$("#sendDateInput").prop("disabled")) {
                cmdConfirm_ClickCase30();
            } else {
                cmdConfirm_ClickCase40();
            }
        }



        //'*******************************************************************
        //'Title     :  cmdConfirm_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdConfirm_ClickCase30() {
            console.log("setupStartCase30");
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];
            var promiseArray5 = [];

            var currentdate = getCurrentDatetime();
            var StartType = "";
            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                StartType = "JobStart";
            } else {
                StartType = "SetupStart";
            }
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_1', {
                'WOID': $scope.selectedWOIDData['woid'],
                'WorkCenter': $scope.WorkCenter,
                'RouteID': $scope.RouteID,
                'OpSeq': $scope.OpSeq,
                'ProcOpSeq': $scope.ProcOpSeq,
                'StartDateTime': currentdate,
                'StartType': StartType,
                'McID': $scope.McID,
                'McType': $scope.McType,
                'reason': StartType,
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim()



            })
         );

            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = $("#wotracking-table3-productiontotalduration").val();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }

            $scope.WOExecutionStatus = "ProcessingStart";
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/cmdConfirm_ClickCase30_1', {
                   'WOStatus': $scope.WOExecutionStatus,//
                   'SendOutDate': currentdate,
                   'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                   'ShiftID': 0,//
                   'McID': $scope.McID,//
                   'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                   'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                   'Remark': String($('#select_wotrackingremark option:selected').text()).trim(),//
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

        //    promiseArray5.push(
        //   $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase40_6', {
        //       'WOID': $scope.selectedWOIDData['woid'],//
        //       'ProcOpSeq': $scope.ProcOpSeq,//
        //       'ExStatus': 1,
        //       'UpdatedDate': currentdate,
        //       'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
        //       'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
        //       'reason': ''
        //   })
        //);


            $q.all(promiseArray1).then(function (response) {
                console.log("cmdConfirm_ClickCase30 setupStartCase40_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdConfirm_ClickCase30 cmdConfirm_ClickCase30_1", response);
                    $q.all(promiseArray3).then(function (response) {
                        console.log("cmdConfirm_ClickCase30 setupStartCase40_3/4", response);
                        $q.all(promiseArray4).then(function (response) {
                            console.log("cmdConfirm_ClickCase30 setupStartCase40_5", response);
                          //  $q.all(promiseArray5).then(function (response) {
                            //    console.log("setupStartCase40_6", response);
                            cmdConfirm_ClickCase50();
                           // });
                        });
                    });
                });
            });

        }

        //'*******************************************************************
        //'Title     :  cmdConfirm_ClickCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdConfirm_ClickCase40() {
            console.log("setupStartCase40");

            //productionPauseCase20_1

            var currentdate = getCurrentDatetime();

            var receivedDate = $('#receivedDate').find("input").val();

            var promiseArray1 = [];
            var promiseArray2 = [];
            //currentdate = Date();
            // currentData = "";
            promiseArray1.push(
                $http.post(config.baseUrlApi + 'HMLVTS/productionPauseCase20_1', {
                    'StopDateTime': receivedDate,
                    'endType': 'SubconReceived',
                    'WOID': $scope.selectedWOIDData['woid'],
                    'ProcOpSeq': $scope.ProcOpSeq,
                    'WorkCenter': $scope.WorkCenter,
                })
            );




            var TotalSetupDuration = 0;
            var subcontime = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                subcontime = String($("#wotracking-table3-total").val().trim());

                $("#wotracking-table3-total").val("0.00");
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
            }

            //receivedDate = HR12toHR24(receivedDate);
            //console.log("cmdConfirm_ClickCase40_1 time", receivedDate);
            //if (receivedDate == "") {
            //    console.log("ERROR:Wrong receiveDate",receivedDate);
            //}
           promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/cmdConfirm_ClickCase40_1', {
                    'WOStatus': $scope.WOExecutionStatus,//
                    'ReceivedDate': receivedDate,
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'ShiftID': 0,//
                    //'McID': $scope.McID,//
                    'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                    'ProdTotalDuration': parseFloat(subcontime),//
                    'Type': String($('#select_wotrackingremark option:selected').text()).trim(),//
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'WorkCenter': $scope.WorkCenter//
                })
            );





            $q.all(promiseArray1).then(function (response) {
                console.log("cmdConfirm_ClickCase40 productionPauseCase20_1", response);
                $q.all(promiseArray2).then(function (response) {
                    console.log("cmdConfirm_ClickCase40_1", response);
                    cmdConfirm_ClickCase50();
                });

            });

        }
    

        //'*******************************************************************
        //'Title     :  cmdConfirm_ClickCase50
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function cmdConfirm_ClickCase50() {
            console.log("cmdConfirm_ClickCase50");
            CheckSubconWOOpnStatus();
            //to continue line 7128
            if (!$("#receivedDateInput").prop("disabled") && $("#sendDateInput").prop("disabled")) {
                console.log("cmdConfirm_ClickCase50.1");


                if ($("#saveCompleteModal-current").val() == "") {
                    console.log("saveCompleteModal4", $scope.CompletedQty);
                    $("#saveCompleteModal-current").val($scope.CompletedQty);
                }

                $("#saveCompleteModal-new").val($scope.OutstandingQty);
                $("#modal-woid1").val($scope.selectedWOIDData["woid"]);
                $('#saveCompleteModal').modal('toggle');
                $scope.cmdUpdate_Click();


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

            var endtype = '';

            if ($scope.fnTrackSetupConfigVar == true || config.BypassSetup) { // if bypass setup
                if ($("#production-row-2").css("display") == "none") {
                    endtype = 'JobEnd';
                } 
            } else {

                if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") == "none")               
                    ) {
                    endtype = 'JobEnd';
                } else if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") != "none") && ($("#production-row-2").css("display") != "none") ||
                    ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") != "none")) {
                    endtype = 'SetupEnd';
                }
            }
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


                var TotalSetupDuration = 0;
                var subcontime = 0;
                if (String($scope.McType).trim() == "Subcon") {

                    if (String($("#wotracking-table3-total").val()).trim() == '') {
                        subcontime = 0;
                    }
                    TotalSetupDuration = 0;
                    //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                    subcontime = String($("#wotracking-table3-total").val().trim());

                    $("#wotracking-table3-total").val("0.00");
                } else {
                    if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                        $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                    }
                    if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                        $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                    }
                    subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                    TotalSetupDuration = $("#wotracking-table3-setuptotalduration").val();
                }

                $scope.WOExecutionStatus = "Completed";
                var currentdate = getCurrentDatetime();
                promiseArray2.push(
                $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase20_2', {
                    'WOStatus': $scope.WOExecutionStatus,//
                    'ProdEndDate': currentdate,
                    'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                    'McID': $scope.McID,//
                    'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                    'ProdTotalDuration': parseFloat(subcontime),//
                    'WOID': $scope.selectedWOIDData['woid'],//
                    'ProcOpSeq': $scope.ProcOpSeq,//
                    'WorkCenter': $scope.WorkCenter//
                })
            );

                
                $q.all(promiseArray2).then(function (response) {
                    console.log("btnCancelWO_ClickCase20_2", response);

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
            $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase30_1', {
                'WOStatus': $scope.WOExecutionStatus,//        
                'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                'McID': $scope.McID,//
                'WOID': $scope.selectedWOIDData['woid'],//
                'ProcOpSeq': $scope.ProcOpSeq,//
                'WorkCenter': $scope.WorkCenter//
            })
        );

                
            $q.all(promiseArray1).then(function (response) {
                console.log("btnCancelWO_ClickCase30_1", response);
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

                if ((($scope.fnTrackSetupConfigVar == true || config.BypassSetup) && ($("#production-row-2").css("display") == "none")) ||
                    
                    ((($scope.fnTrackSetupConfigVar == false || config.BypassSetup) && ($("#production-row-2").css("display") == "none")) &&
                    ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") != "none") && ($("#production-row-2").css("display") == "none") ||
                    ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") != "none")  // line 9832
                    )
                    ) {

                    var endtype = '';
                    if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") == "none")
                    ) {
                        endtype = 'JobEnd';
                    } else if (($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") != "none") && ($("#production-row-2").css("display") != "none") ||
                        ($("#setup-row-2").css("display") == "none") && ($("#setup-row-5").css("display") == "none") && ($("#production-row-2").css("display") != "none")) {
                        endtype = 'SetupEnd';
                    }

                    
                promiseArray3.push(
                $http.post(config.baseUrlApi + 'HMLVTS/btnCancelWO_ClickCase40_3', {
                    'StopDateTime':getCurrentDatetime(),
                    'endType': endtype,//        
                    'McID': $scope.McID,//
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
                if ($scope.WOGlobalWOOpnState != 7 ) {
                    alert("Please stop production or enter recieved date before complete the work order.");
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

            var subcontime = 0;
            var TotalSetupDuration = 0;
            if (String($scope.McType).trim() == "Subcon") {

                if (String($("#wotracking-table3-total").val()).trim() == '') {
                    subcontime = 0;
                }
                TotalSetupDuration = 0;
                //  $("#wotracking-table3-productiontotalduration").val(String($("#wotracking-table3-total").val()).trim());
                $("#wotracking-table3-total").val(parseInt(String($("#wotracking-table3-total").val()).trim()));
            } else {
                if (String($("#wotracking-table3-setuptotalduration").val()).trim() == "") {
                    $("#wotracking-table3-setuptotalduration").val("0.00") //todo display in hour
                }
                if (String($("#wotracking-table3-productiontotalduration").val()).trim() == "") {
                    $("#wotracking-table3-productiontotalduration").val("0.00")// todo display in hour
                }
                subcontime = String($("#wotracking-table3-productiontotalduration").val()).trim();
                TotalSetupDuration = String($("#wotracking-table3-setuptotalduration").val()).trim();
            }


            console.log('btnScrap_ClickCase10 ScrapActualRecQty', $scope.ScrapActualRecQty);
            console.log('btnScrap_ClickCase10 ScrapCompletedQty', $scope.ScrapCompletedQty);
            console.log('btnScrap_ClickCase10 ScrapScrapQty', $scope.ScrapScrapQty);


            $scope.ScrapOutstandingQty = $scope.ScrapActualRecQty - ($scope.ScrapCompletedQty + $scope.ScrapScrapQty);

            console.log();
            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase10_1', {
                  //'ActualRecQty': $scope.ActualRecQty,//
                  'ActualRecQty': $scope.ScrapActualRecQty,
                  'ActualRecDate': currentdate,//
                  'CompletedQty': $scope.ScrapCompletedQty,//
                  'CompletedDate': currentdate,//
                  'OutstandingQty': $scope.ScrapOutstandingQty,//
                  'OutstandingDate': currentdate,//
                  'WOStatus': $scope.WOExecutionStatus,//
                  'TotalSetupDuration': parseFloat(TotalSetupDuration),//
                  'ProdTotalDuration': convertDatetimeToSecond(subcontime),//
                  'WOID': $scope.selectedWOIDData['woid'],
                  'WorkCenter': $scope.WorkCenter,//
                  'ProcOpSeq': $scope.ProcOpSeq//
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase10 cmdUpdateReceived_ClickCase10_1", response);
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
            if($scope.WOExecutionStatus == "Completed"){
                btnScrap_ClickCase20();
            } else{
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
                  'OperatorID': String($("#wotracking-table3-operatorName").val()).trim(),//
                  'OperatorName': String($("#wotracking-table3-operatorName").val()).trim(),//
                  'reason': ''
              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase20 cmdUpdate_ClickCase10_2", response);
                if ($scope.selectedWOIDData['woid'].indexOf("-") != -1) {
                    btnScrap_ClickCase30();
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
            //todo:line6355
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

            promiseArray1.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_1', {
                  'WOID': $scope.selectedWOIDData['woid']

              })
          );

            promiseArray2.push(
              $http.post(config.baseUrlApi + 'HMLVTS/cmdUpdateReceived_ClickCase95_2', {
                  'id': $scope.PPID,
                  'Status': $scope.WOStatus

              })
          );

            $q.all(promiseArray1).then(function (response) {
                console.log("btnScrap_ClickCase95 cmdUpdate_ClickCase95_1", response);

            });

            $q.all(promiseArray2).then(function (response) {
                console.log("btnScrap_ClickCase95 cmdUpdate_ClickCase95_2", response);

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
            if ($scope.McType.toLowerCase() == "inhouse") {
                CheckWOOpnStatus();
                ReCheck($scope.selectedWOID);
                console.log("btnScrap_ClickCasel2", $scope.CompletedQty);
                //$("#saveCompleteModal-current").val($scope.CompletedQty);

            } else {
                CheckSubconWOOpnStatus();
                ReCheck($scope.selectedWOID);
                console.log("btnScrap_ClickCase13", $scope.CompletedQty);
               // $("#saveCompleteModal-current").val($scope.CompletedQty);

            }


        }

        //'*******************************************************************
        //'Title     :  ScrapConfirm
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : button click for confirm in scrap model
        //'*******************************************************************
        $scope.ScrapConfirm = function () {
            var scrapQty = $("#ScrapModal-qty").val();
            var scrapRemark = String($('#select_wotracking-scrap-remark option:selected').text()).trim();
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
                                'OpSeq':$scope.OpSeq,
                                'ScrapQty': scrapQty,
                                'Type':scrapRemark,
                                'ScrapType': radio,
                                'ScrapDate':currentdate,
                                'UserID': String($("#wotracking-table3-operatorName").val()).trim(),//
                                'UserName': String($("#wotracking-table3-operatorName").val()).trim(),//
                                'Status': "Pending",    
                                'ApprovedID': String($("#wotracking-table3-operatorName").val()).trim(),//
                                'ApprovedName': String($("#wotracking-table3-operatorName").val()).trim(),//
                            })
                        );

                             $q.all(promiseArray1).then(function (response) {
                                 console.log("butConfirm_Click1", response);
                                 if(response.length != 0  && response[0].data.success){
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

                                         if(success1 && success2  && success3){
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


        function HR12toHR24(time) {
            
            console.log("HR12toHR24",time);
            var times = time.split(" ");
            console.log("HR12toHR24 times",times);
            if (times.length == 3) {
                var time1 = times[1].split(":");
                var hour = parseInt(time1[0]);
                var min = time1[1];
                if(times[2] == "PM"){
                    hour = hour + 12;
                    var finaltime = hour + ":" + min + ":00.000";
                }
                if(times[2] = "AM"){
                    var finaltime = hour + ":" + min + ":00.000";
                }
                console.log("HR12toHR24 3", times[0]);
                var datas = times[0].split("/");
                console.log("HR12toHR24 datas",datas);
                var finaldata = datas[2] + "-" + datas[1] + "-" + datas[0];

                return finaldata + " " + finaltime;
            }
            return "";
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

        function hmsToSecond(d) {
            var time = d.split(":");
            return (3600 * parseInt(time[0])) + (60 * parseInt(time[1])) + parseInt(time[2]);
        }

        function hmsToSeconds(hms) {
        //    var hms = '02:04:33';   // your input string
            var a = hms.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            return seconds;
        }
    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});