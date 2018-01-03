(function () {
    'use strict';

    angular.module('erp.qctracking').controller('qctrackingCtrl', qctrackingCtrl);

    qctrackingCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window'];

    function qctrackingCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window) {


        $scope.selectData = [];
        $scope.QtyUpdated = '';
        $scope.WorkShift = '';

        $scope.tenant = tenant;

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
            GenerateQCWOList();
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
            $http.post(config.baseUrlApi + 'HMLVTS/comboWO_Selected_wotraking', {
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
                console.log("comboWO_Selected_wotraking", response);
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
                                            'WOID': $scope.select_WOID

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

        }

        //'*******************************************************************
        //'Title     :  GenerateMcIDList
        //'Function  :  generate WO List 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateQCEquipmentList() {

        }
        //'*******************************************************************
        //'Title     :  GenerateSeletedQCEquipmentList
        //'Function  :  generate selected QC Equipment list 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateSeletedQCEquipmentList() {

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
        //'Function  :  make table for raw material wotracking-table1
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
        //'Title     :  makeTable2
        //'Function  :  make table for raw material wotracking-table1
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

})();