(function () {
    'use strict';

    angular.module('erp.wotracking').controller('wotrackingCtrl', wotrackingCtrl);

    wotrackingCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function wotrackingCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");


        $scope.WOGlobalWOOpnState = "";
        $scope.WOGlobalWOPauseReason = "";
        $scope.WOGlobalWOMcID = "";


        $scope.start = "";
        $scope.end = "";
        $scope.radio = "";
        $scope.selectedWOID = ""; //store all the selector full data, (woid, procopseq ..)
        $scope.selectedWOIDData ="";//store the selected woid info, in the original code, they are splited into each single data
        $scope.tenant = tenant;



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





        $scope.selectData = "";

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



        load();

        function load() {
            //to check: line250-311, config options, all need to set
            $("#wotracking-table3-loginName").val(authService.currentUser.userName);
            console.log("authService", authService.currentUser.userName);
            GenerateWOList();
            generatePauseReasonList();
            generateTrackingRemarkList();



            //todo line 321 - 328 bypass  WOGlobalOnHoldBypassApproved
            if (config.BypassApproval) {
                document.getElementById("wo-tracking-approve").display = "none";
                document.getElementById("wo-tracking-onhold").display = "block";
            }

            //todo to check //check for form  access right line 333 - line 375

            //to check //check for fnGetUserAccessRight this seems to be user number control for SQL SERVER
            $("#setup-row").hide();
            $("#production-row").hide();
            if (fnGetUserAccessRight(authService.currentUser.userName, "TS_WOTracking")) {
                $("#setup-row").show();
                $("#production-row").show();
            }
            //todo to check
            $("#wo-tracking-approve").hide();
            if (fnGetUserAccessRight(authService.currentUser.userName, "TS_ApprovedOperations")) {
                $("#wo-tracking-approve").show();
             
            }
            //save orginal design location
            //cmdSetupStartlocation = cmdSetupStart.Location;
            //xcmdSetupStartLocation = cmdSetupStart.Location.X;
            //ycmdSetupStartLocation = cmdSetupStart.Location.Y;
            //cmdProductionStartlocation = cmdProductionStart.Location;
            //xcmdProductionStartLocation = cmdProductionStart.Location.X;
            //ycmdProductionStartLocation = cmdProductionStart.Location.Y;

            //todo to check line 400-420
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
         //   var promiseArray1 = [];
         //   promiseArray1.push(
         //   $http.post(config.baseUrlApi + 'HMLVTS/fnGetUserAccessRight', {
         //       'strUserID': String(strUserID).trim(),
         //       'strMenuName': String(strMenuName).trim()
         //   })
         //);

         //   $q.all(promiseArray1).then(function (response) {
         //       console.log("fnGetUserAccessRight", response);
         //       if(response.length !=0){
         //           if(response[0].data.success){
         //               if (response[0].data.result[0]['count']) {
         //                   return true;
         //               } else {
         //                   return false;
         //               }
         //           }
         //       }

            //   });
            return true;
        }

        function getCurrentTime() {
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
                            + (currentdate.getMonth() + 1) + "/"
                            + currentdate.getFullYear() + " "
                            + currentdate.getHours() + ":"
                            + currentdate.getMinutes() + ":"
                            + currentdate.getSeconds();
        }

        //'*******************************************************************
        //'Title     :  setupStart
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :cmdSetupStart_Click in original code
        //'*******************************************************************
        $scope.setupStart = function () {
            //pause, resume stop grey
            if ($scope.selectedWOID == "") {
                alert("Please enter Work Order");
            } else {

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

        }

        //'*******************************************************************
        //'Title     :  setupResume
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.setupResume = function () {

        }

        //'*******************************************************************
        //'Title     :  setupStop
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.setupStop = function () {

        }

        //'*******************************************************************
        //'Title     :  productionStart
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.productionStart = function () {

        }

        //'*******************************************************************
        //'Title     :  productionPause
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.productionPause = function () {

        }

        //'*******************************************************************
        //'Title     :  productionResume
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.productionResume = function () {

        }

        //'*******************************************************************
        //'Title     :  productionStop
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.productionStop = function () {

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

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": select_WOID
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOSummary1", response);
                if(response.length != 0){
                    if(response[0].data.success){
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

            var propopseq = findSelectorFullInfo(select_WOID)['procOpSeq'];

            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary2', {
                'WOID': select_WOID,
                "procOpSeq": propopseq

            })
         );




            $q.all(promiseArray2).then(function (response) {
                console.log("GenerateWOSummary2", response);
                if (response.length != 0) {
                    if (response[0].data.success) {

                        //to check, in program is it hidden
                        document.getElementById("WIP-td5_1").innerHTML = response[0].data.result[0]['actualRecQty'];
                        document.getElementById("WIP-td5_2").innerHTML = String(response[0].data.result[0]['actualRecDate']).replace("T", " ");

                        document.getElementById("WIP-td6_1").innerHTML = response[0].data.result[0]['completedQty'];
                        document.getElementById("WIP-td6_2").innerHTML = String(response[0].data.result[0]['completedDate']).replace("T", " ");

                        if (response[0].data.result[0]['adjustedQty'] == null || response[0].data.result[0]['adjustedQty'] == 0) {
                            $("#WIP-tr-8").css("display","none");
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
        //'Title     :  woSelected
        //'Function  :  toggle when woid is changed from the selector
        //'Input     :  
        //'Output    : 
        //'Remark    :comboWO_Selected in original code
        //'*******************************************************************
        $scope.woSelected = function () {
            //todo: need to implement combobox


            //todo to check check for locked woid


            if(String($('#select_wotracking-woid option:selected').text()).trim() != ""){
                GenerateWOSummary();
                case0();
            }



            

            //  var step = 0;
            //  var select_WOID = $('#select_wotracking-woid option:selected').text();
            //  var propopseq = findSelectorFullInfo(select_WOID)['procOpSeq'];

            //  $scope.select_WOID = select_WOID;
            //  $scope.propopseq = propopseq;
            ////  UpdateQtyFromPreviousProcOpSeq();

            //  console.log("test",propopseq);

            //          var promiseArray1 = [];
            //          promiseArray1.push(
            //          $http.post(config.baseUrlApi + 'HMLVTS/comboWO_Selected_wotraking', {
            //              'WOID': select_WOID,
            //              'procOpSeq': propopseq

            //          })
            //       );




            //          $q.all(promiseArray1).then(function (response) {
            //              console.log("comboWO_Selected_wotraking", response);
            //              if (response.length != 0) {
            //                  if (response[0].data.success) {
            //                      $scope.selectedWOIDData = response[0].data.result[0];
            //                      console.log("$scope.selectedWOIDData", $scope.selectedWOIDData);
            //                      case5();//line 2078
            //                  } else {

            //                  }
            //              } else {
            //                  //prompt for wrong WOID line
            //                  alert("Please enter a valid work order number");
            //                  RefreshData();
            //              }
            //          });




            

        }

        function case0() {

            var select_WOID = $('#select_wotracking-woid option:selected').text();
            var propopseq = findSelectorFullInfo(select_WOID)['procOpSeq'];

            $scope.select_WOID = select_WOID;
            //  $scope.propopseq = propopseq;
            //  UpdateQtyFromPreviousProcOpSeq();

            console.log("test", propopseq);

            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/comboWO_Selected_wotraking', {
                'WOID': select_WOID,
                'procOpSeq': propopseq

            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("comboWO_Selected_wotraking", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        $scope.selectedWOIDData = response[0].data.result[0];

                        //**assign variable
                        AssignGlobalVariable();
                        console.log("$scope.selectedWOIDData", $scope.selectedWOIDData);
                        case5();//line 2078
                    } else {

                    }
                } else {
                    //prompt for wrong WOID line
                    alert("Please enter a valid work order number");
                    RefreshData();
                }
            });
        }

        function case5(){
            // disableDiv("setup-row", true);
            //todo to check line2094 to line 2121
            //   var fnTrackSetupConfig = true;
            //  fnTrackSetupConfig = fnTrackSetupConfig();//to check  this function at line 9396, the store procedure table does not exist

            if ($scope.QtyUpdated == null || $scope.QtyUpdated == "") {
                $scope.QtyUpdated = 0;
            }

            if ($scope.QtyUpdated < 2) {
                if ($scope.QtyUpdated < 1) {
                    if ($scope.QtyUpdated > 1) {
                        if (UpdateQtyFromPreviousProcOpSeq())
                        {
                            case0();
                        }
                        else
                        {
                            RefreshData();
                        }
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
            //        case6();
            //    }

            //}
        }

        function case6() {

        }

        function case10() {
            if (String($scope.mcType).trim().toLowerCase() == "inhouse") {
                //todo, the following 3 lines 2167-2169
                //GrpSubConExecution.Visible = false;
                //GrpInHouseExecution.Visible = true;
                //btnApprovedOperation.Visible = true;
                case20(); //display
            } else {
                //todo display subcon WOEXecution group frame, line 2176,2177
                //GrpInHouseExecution.Visible = false;
                //GrpSubConExecution.Visible = true;
                if ($scope.SendOutDate != null && $scope.ReceivedDate != ull) {
                    //todo line2182
                    // btnApprovedOperation.Visible = false;
                } else {
                    //todo line2186
                    //btnApprovedOperation.Visible = true;
                }
                case30();
            }
            
        }

        function case20(){
            if (!config.BypassCheckPassword) {
                //todo empty the login id and name field line 2202
                //this.txtOperatorID.Text = ""; // OperatorID;
                //$("#wotracking-table3-operatorName").val("");
                //this.txtOperatorName.Text = ""; // OperatorName;
                //$("#wotracking-table3-loginName").val("");

                GenerateWOSummary();
                CheckWOOpnStatus();

            }
        }

        function case30() {

        }

        function AssignGlobalVariable() {
            $scope.PartID = $scope.selectedWOIDData['partID'];
            $scope.ActualRecQty = $scope.selectedWOIDData['actualRecQty'];
            $scope.ActualRecDate = $scope.selectedWOIDData['actualRecDate'];
            $scope.CompletedQty = $scope.selectedWOIDData['completedQty'];
            $scope.CompletedDate = $scope.selectedWOIDData['completedDate'];
            $scope.OutstandingQty = $scope.selectedWOIDData['outstandingQty'];
            $scope.OutstandingDate = $scope.selectedWOIDData['outstandingDate'];
            $scope.ScrapQty = $scope.selectedWOIDData['scrapQty'];
            $scope.ScrapDate = $scope.selectedWOIDData['scrapDate'];
            $scope.AdjustedQty = $scope.selectedWOIDData['adjustedQty'];
            $scope.AdjustedDate = $scope.selectedWOIDData['adjustedDate'];
            $scope.McID = $scope.selectedWOIDData['mcID'];
            $scope.McType = $scope.selectedWOIDData['mcType'];
            $scope.RouteID = $scope.selectedWOIDData['routeID'];
            $scope.OpSeq = $scope.selectedWOIDData['opSeq'];
            $scope.ProcOpSeq = $scope.selectedWOIDData['procOpSeq'];
            $scope.WorkCenter = $scope.selectedWOIDData['workCenter'];
            $scope.WOExecutionStatus = $scope.selectedWOIDData['woStatus'];
            $scope.SetupStartDate = $scope.selectedWOIDData['setupStartDate'];
            $scope.SetupEndDate = $scope.selectedWOIDData['setupEndDate'];
            $scope.ProdStartDate = $scope.selectedWOIDData['prodStartDate'];
            $scope.ProdEndDate = $scope.selectedWOIDData['prodEndDate'];
            $scope.ParentWOID = $scope.selectedWOIDData['parentWOID'];
            $scope.Remark = $scope.selectedWOIDData['remark'];
            //  $scope.PPID = $scope.selectedWOIDData['partID'];
            // $scope.SalesOrderID = $scope.selectedWOIDData['partID'];
            //  $scope.ReleasedDate = $scope.selectedWOIDData['partID'];
            if ($scope.selectedWOIDData['sendOutDate'] != null) {
                $scope.SendOutDate = $scope.selectedWOIDData['sendOutDate'];
            } else {
                $scope.SendOutDate = getCurrentTime();
            }
            if ($scope.selectedWOIDData['receivedDate'] != null) {
                $scope.ReceivedDate = $scope.selectedWOIDData['receivedDate'];
            } else{
                $scope.ReceivedDate = getCurrentTime();
            }
            
            
            $scope.QtyUpdated = $scope.selectedWOIDData['qtyUpdated'];;//static


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
            var ProcOpSeq = $scope.ProcOpseq;
            var WorkCenter = $scope.WorkCenter;

            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus1', {
                'WOID': WOID,
                'ProcOpSeq': ProcOpSeq,
                'WorkCenter':WorkCenter
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("CheckWOOpnStatus1", response);
                if(response.length!=0){
                    if(response[0].data.success){
                        if (response[0].data.result[0]['qtyUpdated'] == null || response[0].data.result[0]['qtyUpdated'] == "") {
                            $scope.QtyUpdated = 0;
                        } else {
                            $scope.QtyUpdated = response[0].data.result[0]['qtyUpdated'];
                        }

                        if (!fnTrackSetupConfig() || config.BypassSetup) {
                            //line 2907
                            if (response[0].data.result[0]['setupStartDate'] == null && response[0].data.result[0]['prodEndDate'] == null) {
                                $scope.WOGlobalWOOpnState = 1;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = response[0].data.result[0]['mcID'];// to check, this is redundant to $scope.selectedWOID
                                CheckWOOpnStatusAssign();
                            } else if(response[0].data.result[0]['setupStartDate'] != null && response[0].data.result[0]['prodEndDate'] != null){
                                $scope.WOGlobalWOOpnState = 7;     //Job end
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = response[0].data.result[0]["mcID"].ToString();
                                CheckWOOpnStatusAssign();
                            } else {
                                promiseArray2.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus2', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter':WorkCenter
                                    })
                            );

                                $q.all(promiseArray2).then(function (response) {
                                    console.log("CheckWOOpnStatus2", response);
                                    if (response.length != 0) {
                                        if (response[0].data.success) {
                                            if (response[0].data.result[0]['startType'] == "SetupStart" && response[0].data.result[0]['startType'] == "SetupContinue") {
                                                $scope.WOGlobalWOOpnState = 2;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;// to check, this is redundant to $scope.selectedWOID
                                                CheckWOOpnStatusAssign();
                                            } else if (response[0].data.result[0]['startType'] != "JobStart" && response[0].data.result[0]['startType'] != "JobContinue") {
                                                $scope.WOGlobalWOOpnState = 5;     //Job end
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();
                                            } else if (response[0].data.result[0]['startType'] != "JobPause") {
                                                $scope.WOGlobalWOOpnState = 6;     //Job end
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['reason'];
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();
                                            } else if (response[0].data.result[0]['startType'] != "JobHold") {
                                                $scope.WOGlobalWOOpnState = 9;     //Job end
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['reason'];
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();
                                            } else {
                                                $scope.WOGlobalWOOpnState = 0;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = "";
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
                            if (response[0].data.result[0]['setupStartDate'] == null &&
                                response[0].data.result[0]['setupEndDate'] == null &&
                                response[0].data.result[0]['prodStartDate'] == null &&
                                response[0].data.result[0]['prodEndDate'] == null) {
                                $scope.WOGlobalWOOpnState = 1;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                CheckWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null &&
                                response[0].data.result[0]['setupEndDate'] != null &&
                                response[0].data.result[0]['prodStartDate'] != null &&
                                response[0].data.result[0]['prodEndDate'] != null) {
                                $scope.WOGlobalWOOpnState = 7;
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                CheckWOOpnStatusAssign();
                            } else if (response[0].data.result[0]['setupStartDate'] != null &&
                                response[0].data.result[0]['setupEndDate'] != null &&
                                response[0].data.result[0]['prodStartDate'] == null &&
                                response[0].data.result[0]['prodEndDate'] == null) {
                                $scope.WOGlobalWOOpnState = 4; // to check : this part might need to change, current design is due to previous version swop production setup start button
                                $scope.WOGlobalWOPauseReason = "";
                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                CheckWOOpnStatusAssign();
                            } else {
                                promiseArray3.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/CheckWOOpnStatus3', {
                                        'WOID': WOID,
                                        'ProcOpSeq': ProcOpSeq,
                                        'WorkCenter':WorkCenter
                                    })
                                );




                                $q.all(promiseArray3).then(function (response) {
                                    if (response.length != 0) {
                                        if (response[0].data.success) {
                                            if (response[0].data.result[0]['"startType'] == "SetupStart" ||
                                                response[0].data.result[0]['"startType'] == "SetupContinue"
                                                ) {
                                                $scope.WOGlobalWOOpnState = 2;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            
                                            } else if (response[0].data.result[0]['"startType'] == "SetupPause"
                                                ) {
                                                $scope.WOGlobalWOOpnState = 3;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            } else if (response[0].data.result[0]['"startType'] == "JobStart" ||
                                                response[0].data.result[0]['"startType'] == "JobContinue"
                                                ) {
                                                $scope.WOGlobalWOOpnState = 5;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            } if (response[0].data.result[0]['"startType'] == "JobPause" 
                                                ) {
                                                $scope.WOGlobalWOOpnState = 6;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            } if (response[0].data.result[0]['"startType'] == "SetupHold"
                                                ) {
                                                $scope.WOGlobalWOOpnState = 8;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            } if (response[0].data.result[0]['"startType'] == "JobHold"
                                                ) {
                                                $scope.WOGlobalWOOpnState = 9;
                                                $scope.WOGlobalWOPauseReason = response[0].data.result[0]['"reason'];
                                                $scope.WOGlobalWOMcID = $scope.selectedWOID;
                                                CheckWOOpnStatusAssign();

                                            } else {
                                                $scope.WOGlobalWOOpnState = 0;
                                                $scope.WOGlobalWOPauseReason = "";
                                                $scope.WOGlobalWOMcID = "";
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
                        }


                    }
                }
            });



            if (!fnTrackSetupConfig() && config.BypassSetup) {
                //swop position todo line3415 to line3451
                //Point cmdSetupStartlocation = cmdSetupStart.Location;
                //int xcmdSetupStartLocation = cmdSetupStart.Location.X;
                //int ycmdSetupStartLocation = cmdSetupStart.Location.Y;
                //Point cmdProductionStartlocation = cmdProductionStart.Location;
                //int xcmdProductionStartLocation = cmdProductionStart.Location.X;
                //int ycmdProductionStartLocation = cmdProductionStart.Location.Y;

            }
            if (!fnTrackSetupConfig() || config.BypassSetup) {
                CalculateTimeSpan("Setup");
            }
            CalculateTimeSpan("Production");

            GenerateQueuingWOList(McID, fpSpreadQueuingWOList);

        }


        //'*******************************************************************
        //'Title     :  GenerateQueuingWOList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    : //gh 2014Dec03
        //'*******************************************************************
        function GenerateQueuingWOList(McID){
            var promiseArray1 = [];

            if (config.IncludePreviousSeqNonCompleted) {
                            promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/GenerateQueuingWOList1', {
                        'McID': McID

                    })
                );




            $q.all(promiseArray1).then(function (response1) {
                if (response1.length != 0) {
                    if (response1[0].data.success) {
                        // todo make wotracking-table1
                    }
                }
            });

            } else {
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/GenerateQueuingWOList2', {
                        'WOID': WOID

                    })
                );




            $q.all(promiseArray1).then(function (response1) {
                if (response1.length != 0) {
                    if (response1[0].data.success) {
                        // todo make wotracking-table1
                    }
                }
            });
            }




        }

        //'****************************************************************************************************
        //'Title     :  CalculateTimeSpan
        //'Function  :  calculate total timespan  
        //'Input     :  
        //'Output    :  total timespan
        //'Remark    :  
        //'**************************************************************************************************
        function CalculateTimeSpan(OperationType){
            var WOID = $scope.selectedWOID;
            var ProcOpSeq = $scope.ProcOpseq;
            var WorkCenter = $scope.workCenter;
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var SumDuration = 0;


            if (OperationType == "SETUP") {


                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan1', {
                        'WOID': WOID,
                        'ProcOpSeq': ProcOpSeq,
                        'WorkCenter':WorkCenter,
                        'StartType1':'SetupStart',
                        'StartType2':'SetupContinue'

                    })
                );




                $q.all(promiseArray1).then(function (response1) {
                    if (response1.length != 0) {
                        if (response1[0].data.success) {
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                    'WOID': WOID,
                                    'ProcOpSeq': ProcOpSeq,
                                    'WorkCenter': WorkCenter,
                                    'StartType1': 'SetupStart',
                                    'StartType2': 'SetupContinue'

                                })
                             );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    if (response[0].data.result[0]['totalDuration'] == "" ||
                                        response[0].data.result[0]['totalDuration'] == null) {
                                        SumDuration = 0;
                                    } else {
                                        SumDuration = response[0].data.result[0]['totalDuration'];
                                    }

                                    if (response1[0].data.result[0]['totalDuration'] != "" &&
                                        response1[0].data.result[0]['totalDuration'] != null) {
                                        SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                    }
                                    //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                    SumDuration = SumDuration * 60;


                                    var time = (new Date).clearTime()
                                        .addSeconds(SumDuration)
                                        .toString('HH:mm:ss');

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
                                var time = (new Date).clearTime()
                                .addSeconds(SumDuration)
                                .toString('HH:mm:ss');

                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable()


                            }
                        });




                    } else {

                        promiseArray3.push(
                               $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                   'WOID': WOID,
                                   'ProcOpSeq': ProcOpSeq,
                                   'WorkCenter': WorkCenter,
                                   'StartType1': 'SetupStart',
                                   'StartType2': 'SetupContinue'

                               })
                            );
                        $q.all(promiseArray3).then(function (response) {
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
                                    var time = (new Date).clearTime()
                                    .addSeconds(SumDuration)
                                    .toString('HH:mm:ss');

                                    //todo:display this.txtSetupDurationHr.Text
                                    updataSetupDurationTable()
                                }
                            } else {
                                SumDuration = 0;
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                SumDuration = SumDuration * 60;

                                //to check: to test the function, convert second to data time format
                                var time = (new Date).clearTime()
                                .addSeconds(SumDuration)
                                .toString('HH:mm:ss');

                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable()
                            }

                        });




                    }
                });

            } else {


                promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan1', {
                        'WOID': WOID,
                        'ProcOpSeq': ProcOpSeq,
                        'WorkCenter': WorkCenter,
                        'StartType1': 'JobStart',
                        'StartType2': 'JobContinue'

                    })
                );




                $q.all(promiseArray1).then(function (response1) {
                    if (response1.length != 0) {
                        if (response1[0].data.success) {
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                    'WOID': WOID,
                                    'ProcOpSeq': ProcOpSeq,
                                    'WorkCenter': WorkCenter,
                                    'StartType1': 'JobStart',
                                    'StartType2': 'JobContinue'

                                })
                             );
                        }

                        $q.all(promiseArray2).then(function (response) {
                            if (response.length != 0) {
                                if (response[0].data.success) {
                                    if (response[0].data.result[0]['totalDuration'] == "" ||
                                        response[0].data.result[0]['totalDuration'] == null) {
                                        SumDuration = 0;
                                    } else {
                                        SumDuration = response[0].data.result[0]['totalDuration'];
                                    }

                                    if (response1[0].data.result[0]['totalDuration'] != "" &&
                                        response1[0].data.result[0]['totalDuration'] != null) {
                                        SumDuration = SumDuration + response1[0].data.result[0]['totalDuration'];
                                    }
                                    //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                    SumDuration = SumDuration * 60;
                                    var time = (new Date).clearTime()
                                        .addSeconds(SumDuration)
                                        .toString('HH:mm:ss');

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
                                var time = (new Date).clearTime()
                                .addSeconds(SumDuration)
                                .toString('HH:mm:ss');

                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable();


                            }
                        });




                    } else {

                        promiseArray3.push(
                               $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan2', {
                                   'WOID': WOID,
                                   'ProcOpSeq': ProcOpSeq,
                                   'WorkCenter': WorkCenter,
                                   'StartType1': 'SetupStart',
                                   'StartType2': 'SetupContinue'

                               })
                            );
                        $q.all(promiseArray3).then(function (response) {
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
                                    var time = (new Date).clearTime()
                                    .addSeconds(SumDuration)
                                    .toString('HH:mm:ss');

                                    //todo:display this.txtSetupDurationHr.Text
                                    updataSetupDurationTable();
                                }
                            } else {
                                SumDuration = 0;
                                //this.txtSetupDuration.Text = SumDuration.ToString("0.00"); todo:line3546
                                SumDuration = SumDuration * 60;

                                //to check: to test the function, convert second to data time format
                                var time = (new Date).clearTime()
                                .addSeconds(SumDuration)
                                .toString('HH:mm:ss');

                                //todo:display this.txtSetupDurationHr.Text
                                updataSetupDurationTable();
                            }

                        });




                    }
                });
            }





            
                
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

            var TotalSetupDuration = $('#wotracking-table3-setuptotalduration').val();
            var ProdTotalDuration = $('#wotracking-table3-productiontotalduration').val();
            var promiseArray4 = [];
            promiseArray4.push(
                $http.post(config.baseUrlApi + 'HMLVTS/CalculateTimeSpan3', {
                    'TotalSetupDuration': TotalSetupDuration, 
                    'ProdTotalDuration': ProdTotalDuration,
                    'WOID': WOID,
                    'WorkCenter': WorkCenter,
                    'ProcOpSeq': ProcOpSeq



                 })
            );




            $q.all(promiseArray4).then(function (response) {

            });
        }


        //'*******************************************************************
        //'Title     :  CheckWOOpnStatusAssign 
        //'Function  :  check for access right that is generated in   CheckWOOpnStatus() function
        //'Input     :  
        //'Output    :  Clear data on screen
        //'Remark    :  state: 1=Job not start, 2=SetupRun,3=SetupPause
        //'             4=Setup complted but prodcuction not atart , 5=JobRun,6=JobPause, 7=Job end
        //'*******************************************************************
        function CheckWOOpnStatusAssign() {
            //todo:line 3099 to line 3409
        }

        //'*******************************************************************
        //'Title     :  RefreshData
        //'Function  :  refresh screen data  
        //'Input     :  
        //'Output    :  Clear data on screen
        //'Remark    :  
        //'*******************************************************************
        function RefreshData() {
            //to finish implementing
              $scope.select_WOID = "";
              $scope.propopseq = "";
        }

        //'*******************************************************************
        //'Title     :  UpdateQtyFromPreviousProcOpSeq
        //'Function  :   
        //'Input     :  
        //'Output    :  
        //'Remark    :  
        //'*******************************************************************
        function UpdateQtyFromPreviousProcOpSeq() {
            var promiseArray1 = [];
            var promiseArray2 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq1', {
                'WOID': $scope.select_WOID,
                'ProcOpSeq': $scope.ProcOpseq
            })
         );




            $q.all(promiseArray1).then(function (response) {
                console.log("UpdateQtyFromPreviousProcOpSeq1", response);

                if(response.length != 0){
                    if(response[0].data.success){
                        promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/UpdateQtyFromPreviousProcOpSeq2', {
                                'ProcOpSeq': $scope.ProcOpseq,
                                'ActualRecQty': $scope.ActualRecQty,
                                'CompletedQty': $scope.CompletedQty,
                                'OutstandingQty': $scope.OutstandingQty,
                                'QtyUpdated': $scope.QtyUpdated,
                                'ActualRecDate': $scope.ActualRecDate,
                                'CompletedDate': $scope.CompletedDate,
                                'OutstandingDate': $scope.OutstandingDate,
                                'WOID': $scope.select_WOID

                            })
                        );

                $q.all(promiseArray2).then(function (response) {
                    console.log("UpdateQtyFromPreviousProcOpSeq2", response);
                });
                    }
                }

            });


        }

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

            $q.all(promiseArray).then(function (response) {
                console.log("UpdateQtyFromPreviousProcOpSeq2",response);
                if (response.length != 0) {
                    if(response[0].data.success){
                        if (response[0].data.result[0]['TrackSetup']) {
                            return true;
                        }
                    }
                   // response[0].data.result[0][]
                }
            });
            return false;
        }

        //'*******************************************************************
        //'Title     :  disableDiv
        //'Function  :  to disable a mouse event of a div
        //'Input     :  
        //'Output    : 
        //'Remark    : greyBackground == true, turn background to true
        //'*******************************************************************
        function disableDiv(divName,greyBackground) {
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
            
            
        }


        function findSelectorFullInfo(woid) {
            for (var i = 0; i < $scope.selectData.length;i++){
                if($scope.selectData[i]['woid'] == woid){
                    return $scope.selectData[i];
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
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOList12')
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOList12", response);
                if (response.length != 0) {
                    if (response[0].data.success) {
                        $scope.selectData = response[0].data.result;
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
        function generateTrackingRemarkList(){
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
                'WorkCenter':$scope.WorkCenter
            })
         );

            $q.all(promiseArray1).then(function (response) {
                if(response.length!=0){
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

            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/ValidateOperatorName', {
                'OperatorFirstName': OperatorFirstName
            })
         );

            $q.all(promiseArray1).then(function (response) {
                //todo: check whether the current login id and firstname is the same as the return result
                //global function line 277 loops
            });

        }

        //'*******************************************************************
        //'Title     :  fnValidateUserNameMCAssign
        //'Function  :  Validate username
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function fnValidateUserNameMCAssign(){//to check might not be useful, this is to check the mac address
            var OperatorName = $("#wotracking-table3-operatorName").val();

            //to check, what is operatorAssg
  //          WOTrackSQLcommand = "SELECT CenterID, MachID, UserName  "
  //+ "FROM OperatorAssg  "
  //+ "WHERE UserName = " + "'" + OperatorName + "' COLLATE SQL_Latin1_General_CP1_CI_AS "
  //+ "AND MachID = " + "'" + McID + "' COLLATE SQL_Latin1_General_CP1_CI_AS ";//fnValidateUserNameMCAssign
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
            if (String($("#WIP-td5_1").val()).trim() == "") {
                if (config.strSkipWOTrackingPrompt) {
                    setupStartCase5();
                } else {
                    if (!fnTrackSetupConfig() || config.BypassSetup) {
                        var answer = confirm("Confirm to start production?");
                        if (config.TrackingDefaultOK) {
                            if (answer) {
                                //some code
                                setupStartCase5();
                            }
                            
                        }


                    } else {
                        var answer = confirm("Confirm to start setup?");
                        if (answer) {
                            //some code
                            var qty = prompt("Please update received qty!", "0");
                        }
                        
                    }
                }
            }
        }

        
        //'*******************************************************************
        //'Title     :  setupStartCase5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : check for inhouse and not inhouse work order
        //'*******************************************************************
        function setupStartCase5() {
            if($scope.mcType.toLowerCase() == "inhouse"){
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
            if (!config.AllowMultipleWO && (fnMultipleWOEnableConfig() != "NO")) {
                //todo line 3838 - 3854
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
            if (!fnTrackSetupConfig() || config.BypassSetup) {
                //todo: line 3867 - 3897
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
            if ($scope.OrderType == "Assembly") {
                //todo: line 3867 - 3897
                if (config.AssemblyCheckAtLastOnly) {
                    var promiseArray1 = [];
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/setupStartCase10', {
                        'WOID':$scope.selectedWOID
                    })
                 );

                    $q.all(promiseArray1).then(function (response) {
                        if (response.length != 0) {
                            if(response[0].data.success){
                                $scope.LastProcOpSeq = response[0].data.result[0]["lastProcOpSeq"];

                                if ($scope.ProcOpseq >= $scope.LastProcOpSeq) {
                                    setupStartCase12();
                                }
                            } else{
                                setupStartCase15();
                            }
                        } else{
                            setupStartCase15();
                        }
                    });
                }
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
            if ($scope.OrderType == "Assembly") {
                //todo line3946-3970
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
            var operatorName = String($("#wotracking-table3-operatorName").val()).trim();
            if (operatorName != "") {
                alert("Please enter Operator Name or scan Operator ID");
            } else {
                if (ValidateOperatorName(false)) {
                    setupStartCase20();

                } else {

                    var OperatorFirstName = $("#wotracking-table2-machine").val("");
                    var Password = $("#wotracking-table3-password").val("");


                }
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase20
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStartCase20_25_30() {
            //to check:fnValidateUserNameMCAssign, case25 might need to alter cos we always assign login name to user id and username
            //to continue from case 20, line 3995 to finish the whole function

            if($scope.comboMCList == ""){
                alert("Please select a machine");
            } else {
                if (fnValidateUserNameMCAssign()) {
                    //todo:assign

                } else{
                    $("#wotracking-table3-operatorName").val("");
                    $("#wotracking-table3-loginName").val("");
                    if ($scope.comboMCList != $("#wotracking-table2-machine").val()) {//this is supposed to be setupStartCase30
                        var confirm = confirm("Would you like to continue with the selected machine ? ");
                        if (confirm) {
                            setupStartCase40();
                        } else {
                            setupStartCase40();
                        }
                    }
                }
            }
        }

        //'*******************************************************************
        //'Title     :  setupStartCase40
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function setupStartCase40() {
            //todo :line 4041, stored procedures created
        }



    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});