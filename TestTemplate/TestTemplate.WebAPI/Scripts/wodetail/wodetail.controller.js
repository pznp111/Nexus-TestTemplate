(function () {
    'use strict';

    angular.module('erp.wodetail').controller('WodetailCtrl', WodetailCtrl);

    WodetailCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window'];

    function WodetailCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window) {


    //WodetailCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window', ];

    //function WodetailCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window) {
        //initialise global variable
        //var xml = [];
        //var rowNumber = 0;
        //var dataLength = 0;
        //var rowBoxNo = 12;
        //var nextSplitWONo;
        //console.log($upload);


        //***
      //  $scope.Clicked = false;


        $scope.selectedwoid = "";
        $scope.table1Data = [];
        $scope.table1Data.push([]);

        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'wodetail-14' });

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
        $("#toolbar_wodetail").show();
        $("#main-container-page").css('margin-top', 30);
        populateWOlist();





        //$("#wodetail-table1").dblclick(function () {
        // ////   alert("Hello World!");
        // //   // 
        // //   authService.parameter = $scope.selectedwoid;
        // //  // $stateParams.test = "1";
        // //   $window.location.href = '#/routeDetail';
        // //  // $stateParams.test = "1";
        // // //  $scope.userInput = "1";
        //    ////   $state.go("#/routeDetail", { id: $scope.userInput });

        //    authService.parameter = $scope.selectedwoid;
        //    // $stateParams.test = "1";
        //    $window.location.href = '#/routeDetaill';
        //});
        
        //'*******************************************************************
        //'Title     :  toggleBody
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //********************************************************************
        $scope.toggleSummaryBody = function (id) {
            $('#wodetail-summarybody').toggle();
        }
        //'*******************************************************************
        //'Title     :  table1Clicked
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action triggered by single click table1(to toggle 2 other tables)
        //********************************************************************
        $scope.table1Clicked = function () {
            var grid = $('#wodetail-table1').data('kendoGrid');
            var items = grid.dataSource.view();
            var item1 = grid.select();

            console.log("this grid", grid);
            console.log("this items", items);
            console.log("this item1",item1);
            console.log("this uid", $(item1).attr("data-uid"));
            if ($(item1).attr("data-uid") != undefined) {
                var selectedItem = grid.dataItem(grid.select());
                console.log("selected row", selectedItem);

                // $scope.Clicked = true;

                $("#historyContent1").show();
                $("#historyContent2").show();
                $("#historyContent3").hide();
                $("#historyContent4").show();
                var selectedwoid = selectedItem['woid'];
                $scope.selectedwoid = selectedwoid;
                populateOperatorID(selectedwoid);
                initExecution(selectedwoid);
                // var selectedproopseq = selectedItem['procOpSeq'];

                var promiseArray = [];

                promiseArray.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/GetCurProcOpSeq', {
                        'WOID': selectedwoid
                    })
                        );

                $q.all(promiseArray).then(function (response) {
                    console.log("GetCurProcOpSeq", response);
                    if(response.length !=0){
                        if (response[0].data.success && response[0].data.result.length != 0) {
                            $scope.selectedprocopseq = String(response[0].data.result[0]['maxProcOpSeq']).trim();
                            if (response[0].data.result[0]['maxProcOpSeq'] == null) {
                                $scope.selectedprocopseq = "0";
                            }
                            populateWOSummary(selectedwoid);
                            populateProcessRouteDetails(selectedwoid);
                        }
                    }
                });







            }

        }



        //'*******************************************************************
        //'Title     :  populateOperatorID
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : generate operator list that clicked by clearTime()
        //********************************************************************

        function populateOperatorID(selectedwoid) {
            var promiseArray1 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/populateOperatorID', {
                'WOID': selectedwoid,
             
            })
                );


            $q.all(promiseArray1).then(function (response) {
                console.log("populateOperatorID", response);
                if(response.length != 0){
                    if(response[0].data.success){
                        maketable5(response[0].data.result);
                    }
                }
            });
        }

        //'*******************************************************************
        //'Title     :  GenerateAttachmentList
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //********************************************************************
        function GenerateAttachmentList(selectedwoid) {
            var promiseArray1 = [];

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateAttachmentList', {
                'WOID': selectedwoid,
             
            })
                );


            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateAttachmentList", response);
                if (response.length !=0 && response[0].data.success) {
                    makeAttachmentTable(response[0].data.result)
                } else {
                    makeAttachmentTable([])
                }


            });
        }

        //'*******************************************************************
        //'Title     :  table3Clicked
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action triggered by single click table3(to toggle 2 other tables)
        //********************************************************************
        $scope.table3Clicked = function () {
            var grid = $('#wodetail-table3').data('kendoGrid');
            var items = grid.dataSource.view();
            var item1 = grid.select();

            console.log("this grid", grid);
            console.log("this items", items);
            console.log("this item1", item1);
            console.log("this uid", $(item1).attr("data-uid"));
            if ($(item1).attr("data-uid") != undefined) {
                var selectedItem = grid.dataItem(grid.select());
                console.log("selected row", selectedItem);

                var selectedwoid = selectedItem['woid'];
                var selectedwc = selectedItem['workCenter'];
                var selectedprocopseq = selectedItem['procOpSeq'];


                //  console.log(selectedwoid);

                var promiseArray = [];
                var promiseArray1 = [];

                    promiseArray.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/wodetailTable3Click1', {
                        'WOID': selectedwoid,
                        'WorkCenter': selectedwc,
                        'procOpSeq': selectedprocopseq
                    })
                        );


                    $q.all(promiseArray).then(function (response) {
                        console.log("wodetailTable3Click1", response);
                        if (response.length != 0) {
                            if (response[0].data.success && response[0].data.result.length != 0) {
                                maketable4(response[0].data.result);
                            }
                        }
                    });


                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/wodetailTable3Click2', {
                        'WOID': selectedwoid,
                        'WorkCenter': selectedwc,
                        'procOpSeq': selectedprocopseq
                    })
                        );


                    $q.all(promiseArray1).then(function (response) {
                        console.log("wodetailTable3Click2", response);
                        if (response.length !=0) {
                            if (response[0].data.success  && response[0].data.result.length!=0) {
                                maketable5(response[0].data.result);
                            }
                        }
                       
                    });

                //todo:line888
                    populateWOExecutionSummary(selectedwoid, selectedprocopseq);

            }

        }


        //'*******************************************************************
        //'Title     :  woSelectedFromWOStatus
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action triggered by changing selector
        //********************************************************************
        function woSelectedFromWOStatus(woid) {
            $scope.selectedwoid = [];
            $scope.table1Data = [];
            $scope.table1Data.push([]);
            document.getElementById('wodetail-table1').innerHTML = "";
            // var woid = String($('#select_woid option:selected').text()).trim();


          //  GenerateAttachmentList(woid);

            $http.post(config.baseUrlApi + 'HMLVTS/ChkChild', {
                'WOID': woid
            })
            .then(function (response) {
                console.log("ChkChild", response);
                if (response.data.success && response.data.result.length != 0) {
                    // true


                    var promiseArray = [];



                    //promiseArray.push(
                    //    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //        'WOID': woid
                    //    })
                    //    );


                    //for (var k = 0; k < response.data.result.length; k++) {
                    //promiseArray.push(
                    //    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //        'WOID': response.data.result[k]['woid']
                    // })
                    //    );
                    //}


                    promiseArray.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                        'WOID': woid
                    })
                        );


                    $q.all(promiseArray).then(function (response) {
                        console.log("populateWOinfoTable2", response);
                        if (response[0].data.success && response[0].data.result.length != 0) {
                            // true
                            // var temp = response.data.result[0];
                            // copyArrayForTable1(response.data.result[0],true,);
                            $scope.table1Data = response[0].data.result;
                            console.log("after copy before", $scope.table1Data);
                            //console.log("after copy", $scope.table1Data);
                            var promiseArray1 = [];
                            for (var i = 0; i < response[0].data.result.length; i++) {

                                var temp = response[0].data.result[i];
                                promiseArray1.push(
                                     $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                                         'WOID': response[0].data.result[i]['woid']
                                     })
                                    );
                            }

                            $q.all(promiseArray1).then(function (response) {
                                console.log("populateWOinfoTable3", response);
                                if (response.length != 0) {
                                    for (var j = 0; j < response.length; j++) {
                                        if (response[j].data.success && response[j].data.result.length != 0) {
                                            // var temp2 = copyArrayForTable1(response[j].data.result[0], true, temp);
                                            $scope.table1Data[j] = response[j].data.result[0];

                                        }
                                    }

                                }
                                // console.log("after copy2", temp2);
                                // $scope.table1Data[i] = temp2;
                                console.log("after copy2 total", $scope.table1Data);
                                maketable1($scope.table1Data);
                            });


                        }
                    });

                } else {
                    //false
                    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable1', {
                        'WOID': woid
                    })
                    .then(function (response) {
                        console.log("populateWOinfoTable1", response);
                        if (response.data.success && response.data.result.length != 0) {
                            // true
                            copyArrayForTable1(response.data.result[0], false, []);
                            console.log("after copy 55", $scope.table1Data);

                            $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                                'WOID': woid
                            })
                            .then(function (response) {
                                console.log("populateWOinfoTable3", response);
                                if (response.data.success && response.data.result.length != 0) {
                                    copyArrayForTable1(response.data.result[0], false, []);
                                }
                                console.log("after copy", $scope.table1Data);
                                maketable1($scope.table1Data);
                            });
                        } else {
                            //false
                        }
                    });

                }
            });
        }


        $scope.woSelected = function () {

            $("#historyContent1").hide();
            $("#historyContent2").hide();
            $("#historyContent3").show();
            $("#historyContent4").hide();

            document.getElementById("wodetail-table3").innerHTML = "";


            $scope.selectedwoid = [];
            $scope.table1Data = [];
            $scope.table1Data.push([]);

          //  $scope.Clicked = false;
            document.getElementById("history-table").innerHTML = "";
            document.getElementById("wodetail-table1").innerHTML = "";
            var woid = String($('#select_woid option:selected').text()).trim();
            

            console.log("selected woid",woid);
            GenerateAttachmentList(woid);
            $http.post(config.baseUrlApi + 'HMLVTS/ChkChild', {
                'WOID':woid
            })
            .then(function (response) {
                console.log("ChkChild", response);
                if(response.data.success && response.data.result.length !=0){
                    // true


                    var promiseArray = [];



                    //promiseArray.push(
                    //    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //        'WOID': woid
                    //    })
                    //    );


                    //for (var k = 0; k < response.data.result.length; k++) {
                    //promiseArray.push(
                    //    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //        'WOID': response.data.result[k]['woid']
                    // })
                    //    );
                    //}


                    promiseArray.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                        'WOID': woid
                    })
                        );


                    $q.all(promiseArray).then(function (response) {
                        console.log("populateWOinfoTable2",response);
                        if (response[0].data.success && response[0].data.result.length != 0) {
                            // true
                           // var temp = response.data.result[0];
                            // copyArrayForTable1(response.data.result[0],true,);
                            $scope.table1Data = response[0].data.result;
                            console.log("after copy before", $scope.table1Data);
                            //console.log("after copy", $scope.table1Data);
                            var promiseArray1 = [];
                            for (var i = 0; i < response[0].data.result.length; i++) {

                                var temp = response[0].data.result[i];
                                promiseArray1.push(
                                     $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                                         'WOID': response[0].data.result[i]['woid']
                                     })
                                    );
                            }

                            $q.all(promiseArray1).then(function (response) {
                                console.log("populateWOinfoTable3", response);
                                if (response.length != 0) {
                                    for (var j = 0; j < response.length;j++){
                                        if (response[j].data.success && response[j].data.result.length != 0) {
                                           // var temp2 = copyArrayForTable1(response[j].data.result[0], true, temp);
                                            $scope.table1Data[j] = response[j].data.result[0];

                                        }
                                    }
                                    
                                }
                               // console.log("after copy2", temp2);
                                // $scope.table1Data[i] = temp2;
                                 console.log("after copy2 total", $scope.table1Data);
                                 maketable1($scope.table1Data);
                            });

                            //$http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                            //    'WOID': woid
                            //})
                            //.then(function (response) {
                            //    console.log("populateWOinfoTable3", response);
                            //    if (response.data.success && response.data.result.length != 0) {
                            //      var temp2 =  copyArrayForTable1(response.data.result[0],true,temp);
                            //    }
                            //    console.log("after copy2", temp2);
                            //   // $scope.table1Data[i] = temp2;
                            //   // console.log("after copy2 total", $scope.table1Data);
                            //   // maketable1($scope.table1Data);
                            //});

                        }
                    });


                } else {
                    //false
                    $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable1', {
                        'WOID': woid
                    })
                    .then(function (response) {
                        console.log("populateWOinfoTable1", response);
                        if (response.data.success && response.data.result.length != 0) {
                            // true
                            copyArrayForTable1(response.data.result[0],false,[]);
                            console.log("after copy 32", $scope.table1Data);

                            $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                                'WOID': woid
                            })
                            .then(function (response) {
                                console.log("populateWOinfoTable3", response);
                                if (response.data.success && response.data.result.length != 0) {
                                    copyArrayForTable1(response.data.result[0],false,[]);
                                }
                                console.log("after copy 33", $scope.table1Data);
                                maketable1($scope.table1Data);
                            });
                        } else {
                            //false
                        }
                    });

                }
            });
        }


        function initExecution(woid) {


            var DurationSum = 0;
            $scope.selectedwoid = woid;
            $("#execution-history-woid").val($scope.selectedwoid);
            var promiseArray = [];
            //var promiseArray1 = [];

            promiseArray.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/frmExecutionHistory1', {
                                'WOID': $scope.selectedwoid
                            })
                );
            $q.all(promiseArray).then(function (response) {
                console.log("frmExecutionHistory1", response);

                $scope.history1 = response[0].data.result;

                for (var i = 0; i < $scope.history1.length; i++) {
                    // var DurationSum = 0;
                    if ($scope.history1[i]['totalDuration'] != "") {
                        DurationSum = DurationSum + (($scope.history1[i]['totalDuration']) * 60);
                        var time = (new Date).clearTime()
                            .addSeconds((($scope.history1[i]['totalDuration']) * 60))
                            .toString('HH:mm:ss');

                        console.log("time", time);

                        $scope.history1[i]['totalDuration1'] = time;
                    } else {
                        $scope.history1[i]['totalDuration1'] = "";
                    }


                }

                var time = (new Date).clearTime()
                            .addSeconds(DurationSum)
                            .toString('HH:mm:ss');

                $("#execution-history-totaltime").val(time);
                console.log("history", $scope.history1);
                makeExecutionHistoryTable($scope.history1);
            });
        
        }

        //'*******************************************************************
        //'Title     :  ExecutionHistory
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action triggered by press "Execution History button"
        //********************************************************************
        $scope.ExecutionHistory = function () {
            //var woid = String($('#select_woid option:selected').text()).trim();
            var DurationSum = 0;
            if ($scope.selectedwoid == "" || $scope.selectedwoid == undefined || $scope.selectedwoid == null) {
                alert("Please select an WORK ORDER");
                $('#executionhistoryModal').modal('toggle');
            } else {
                $("#execution-history-woid").val($scope.selectedwoid);
                var promiseArray = [];
                //var promiseArray1 = [];

                promiseArray.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/frmExecutionHistory1', {
                                    'WOID': $scope.selectedwoid
                                })
                    );
                $q.all(promiseArray).then(function (response) {
                    console.log("frmExecutionHistory1", response);

                    $scope.history1 = response[0].data.result;

                    for (var i = 0; i < $scope.history1.length; i++) {
                       // var DurationSum = 0;
                        if($scope.history1[i]['totalDuration'] !=""){
                            DurationSum = DurationSum + (($scope.history1[i]['totalDuration']) * 60);
                            var time = (new Date).clearTime()
                                .addSeconds((($scope.history1[i]['totalDuration']) * 60))
                                .toString('HH:mm:ss');

                            console.log("time",time);

                            $scope.history1[i]['totalDuration1'] = time;
                        } else {
                            $scope.history1[i]['totalDuration1'] = "";
                        }
                        

                    }

                    var time = (new Date).clearTime()
                                .addSeconds(DurationSum)
                                .toString('HH:mm:ss');

                    $("#execution-history-totaltime").val(time);
                    console.log("history", $scope.history1);
                    makeExecutionHistoryTable($scope.history1);
                });


            }





        //    if (woid.trim() != "") {

        //    $http.post(config.baseUrlApi + 'HMLVTS/GenerateAttachmentList', {
        //        'WOID': woid
        //    })
        //    .then(function (response) {
        //        console.log("GenerateAttachmentList",response);
        //    });

        //}
        }

        //'*******************************************************************
        //'Title     :  populateProcessRouteDetails
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function populateProcessRouteDetails(selectedwoid){
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];

            promiseArray.push(
                $http.post(config.baseUrlApi + 'HMLVTS/populateProcessRouteDetails1', {
                    'WOID': selectedwoid
                })
             );

            $q.all(promiseArray).then(function (response) {
                console.log("populateProcessRouteDetails1", response);
                $scope.populateProcessRouteDetails1Result = response;
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length != 0) {

                        for (var i = 0; i < response[0].data.result.length;i++){
                            $scope.selectedproopseq = String(response[0].data.result[i]['procOpSeq']).trim();
                            var routeid = String(response[0].data.result[i]['routeID']).trim();
                            promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/populateProcessRouteDetails2', {
                                'WOID': selectedwoid,
                                'ProcOpSeq': $scope.selectedproopseq
                            })
                        );

                            promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/populateProcessRouteDetails3', {
                                'WOID': selectedwoid,
                                'ProcOpSeq': $scope.selectedproopseq
                            })
                        );

                            promiseArray3.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/populateProcessRouteDetails4', {
                                'WOID': routeid
                            })
                        );
                        }
                        


                        $q.all(promiseArray1).then(function (response) {
                            console.log("populateProcessRouteDetails2", response);
                            if (response.length != 0) {
                                for (var j = 0; j < response.length; j++) {
                                if (response[j].data.success && response[j].data.result.length != 0) {
                                   
                                        var strMCType = response[j].data.result[0]['mcType'];
                                        if (strMCType.toLowerCase().indexOf('subcon') != -1) {
                                            //todo:line587
                                            //SendOutDate and ReceivedDate in column 7 and 8
                                            response[j].data.result[0]['column7'] = response[j].data.result[0]['sendOutDate'];
                                            response[j].data.result[0]['column8'] = response[j].data.result[0]['receivedDate'];

                                        } else {
                                           
                                            //SetupStartDate and ProdEndDate in column 7 and 8
                                            response[j].data.result[0]['column7'] = response[j].data.result[0]['setupStartDate'];
                                            response[j].data.result[0]['column8'] = response[j].data.result[0]['prodEndDate'];
                                        }
                                        if (response[j].data.result[0]['plannedDuration'] == undefined || String(response[j].data.result[0]['plannedDuration']).trim() == "") {
                                            response[j].data.result[0]['plannedDuration'] = "0:0:0";
                                        } else {
                                            //todo:line 682
                                        }

                                        //todo:line 709 calculate duration, may not be using anymore
                                        if (strMCType.toLowerCase().indexOf('subcon') != -1) {
                                          //  var duration = timeSpan(response[j].data.result[0]['sendOutDate'], response[j].data.result[0]['receivedDate']);
                                        } else if (strMCType.toLowerCase().indexOf('qc') != -1) {

                                        } else {

                                        }
                                    }



                                    var temp = [];
                                    for (var k = 0; k < response.length; k++) {
                                        temp.push(response[k].data.result[0]);
                                    }
                                    console.log("populateProcessRouteDetails2 final1", response);
                                    console.log("populateProcessRouteDetails2 final", temp);
                                    $scope.populateProcessRouteDetails2Result = temp;

                                }

                                $q.all(promiseArray2).then(function (response) {
                                    console.log("populateProcessRouteDetails3", response);
                                    $scope.populateProcessRouteDetails3Result = response;


                                    $q.all(promiseArray3).then(function (response) {
                                        console.log("populateProcessRouteDetails4", response);
                                        $scope.populateProcessRouteDetails4Result = response;


                                        console.log("$scope.populateProcessRouteDetails1Result", $scope.populateProcessRouteDetails1Result);
                                        console.log("$scope.populateProcessRouteDetails2Result", $scope.populateProcessRouteDetails2Result);
                                        console.log("$scope.populateProcessRouteDetails3Result", $scope.populateProcessRouteDetails3Result);
                                        console.log("$scope.populateProcessRouteDetails4Result", $scope.populateProcessRouteDetails4Result);


                                        var final = [];
                                        for (var i = 0; i < $scope.populateProcessRouteDetails1Result[0].data.result.length; i++) {
                                            final.push([]);
                                            for (var key in $scope.populateProcessRouteDetails1Result[0].data.result[i]) {
                                                final[i][key] = $scope.populateProcessRouteDetails1Result[0].data.result[i][key];
                                            }

                                            for (var key in $scope.populateProcessRouteDetails2Result[i]) {
                                                final[i][key] = $scope.populateProcessRouteDetails2Result[i][key];
                                            }

                                            for (var key in $scope.populateProcessRouteDetails3Result[i].data.result[0]) {
                                                final[i][key] = $scope.populateProcessRouteDetails3Result[i].data.result[0][key];
                                            }

                                            for (var key in $scope.populateProcessRouteDetails4Result[i].data.result[0]) {
                                                final[i][key] = $scope.populateProcessRouteDetails4Result[i].data.result[0][key];
                                            }


                                        }

                                        console.log("final data2",final);

                                        maketable3(final);

                                    });


                                });
                                
                            }






                        });

                    }
                }
            });
        }

        //'*******************************************************************
        //'Title     :  populateWOExecutionSummary
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function populateWOExecutionSummary(selWO, selProcOpSeq) {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/populateWOExecutionSummary', {
                'WOID': selWO,
                'ProcOpSeq': selProcOpSeq
            })
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("populateWOExecutionSummary", response);
                if(response.length!=0){
                    if(response[0].data.success  && response[0].data.result.length!=0){
                        document.getElementById('table4-td1_2').innerHTML = response[0].data.result[0]['actualRecQty'];
                        document.getElementById('table4-td1_3').innerHTML = response[0].data.result[0]['completedQty'];
                        document.getElementById('table4-td1_4').innerHTML = response[0].data.result[0]['outstandingQty'];
                        document.getElementById('table4-td1_5').innerHTML = response[0].data.result[0]['scrapQty'];
                    }
                }
            });
        }

        //'*******************************************************************
        //'Title     :  populateWOSummary
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : 
        //'*******************************************************************
        function populateWOSummary(selectedwoid) {
            var promiseArray1 = [];
            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/populateWOSummary', {
                'WOID': selectedwoid
            })
         );

            $q.all(promiseArray1).then(function (response) {
                console.log("populateWOSummary", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result != 0) {
                        //
                        document.getElementById('table2-td1_2').innerHTML = response[0].data.result[0]['releasedProdQty'];
                        document.getElementById('table2-td1_3').innerHTML = response[0].data.result[0]['actualProdQty'];
                        document.getElementById('table2-td1_4').innerHTML = response[0].data.result[0]['completedQty'];
                        document.getElementById('table2-td1_5').innerHTML = response[0].data.result[0]['outstandingQty'];
                        document.getElementById('table2-td1_6').innerHTML = response[0].data.result[0]['accumulatedScrapQty'];

                        document.getElementById('newtable2-td1_2').innerHTML = response[0].data.result[0]['releasedProdQty'];
                        document.getElementById('newtable2-td1_3').innerHTML = response[0].data.result[0]['actualProdQty'];
                        document.getElementById('newtable2-td1_4').innerHTML = response[0].data.result[0]['completedQty'];
                        document.getElementById('newtable2-td1_5').innerHTML = response[0].data.result[0]['outstandingQty'];
                        document.getElementById('newtable2-td1_6').innerHTML = response[0].data.result[0]['accumulatedScrapQty'];
                    }
                }
            });
        }

        //'*******************************************************************
        //'Title     :  copyArrayForTable1
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : copy each of the data in input to $scope.table1Data
        //'*******************************************************************
        function copyArrayForTable1(input, isRecreate,input1) {

            if(isRecreate == false){
                for (var key in input) {
                    //  console.log(key);
                    $scope.table1Data[0][key] = input[key];
                }
            } else {
                for (var key in input) {
                    //  console.log(key);
                    input1[key] = input[key];
                }
            }
            return input1;

        }

        //'*******************************************************************
        //'Title     :  populatewolist
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make the first selector when page is loaded
        //'*******************************************************************
        function populateWOlist() {
            $http.get(config.baseUrlApi + 'HMLVTS/populateWOlist')
            .then(function (response) {
                console.log("populateCustomer", response.data.result);
                createSelect(response.data.result, "woid");
            });

            if (authService.parameter != "") {
                $("#select_woid").val(authService.parameter).change();
                woSelectedFromWOStatus(authService.parameter)
                GenerateAttachmentList(authService.parameter);
                //authService.parameter =
                //$('#select_woid option:selected').text(authService.parameter);
               // initExecution(authService.parameter);
            } 

            authService.parameter = "";
            document.getElementById("wodetail-table1").innerHTML = "";
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
            myDiv.innerHTML = "";


            if (itemName == "woid") {
                var option1 = document.createElement("option");
                option1.value = "";
                option1.text = "";
                myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = String(rawData[i]["woid"]).trim();//Subcon QC
                    option.text = String(rawData[i]["woid"]).trim();
                    myDiv.appendChild(option);
                }
            }
        }

        //'*******************************************************************
        //'Title     :  timeSpan
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function timeSpan(date1,date2) {
            var today = new Date(date1);
            var Christmas = new Date(date2);
           // var diffMs = (Christmas - today); // milliseconds between now & Christmas
          //  var diffDays = Math.floor(diffMs / 86400000); // days
           // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
            return Math.floor(diffMins);
           // return diffMins;
        }

        //'*******************************************************************
        //'Title     :  HighlighCompleted
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function HighlighCompleted() {
            //to implement
           // alert("highlight");
            var grid = $('#wodetail-table3').data('kendoGrid');
           // console.log("HighlighCompleted grid", grid);
           // console.log("HighlighCompleted grid1",grid.dataItem());
            var items = grid.dataSource.view();
            var item1 = grid.select();
            //console.log("HighlighCompleted item1", $(item1.prevObject[0]).find("tr"));
            //console.log("HighlighCompleted uid", $(item1).attr("data-uid"));
            //console.log("HighlighCompleted parent", $(item1).parent());
            //console.log("Highlight each tr", $(item1).find("tr"));
            //console.log("HighlighCompleted items", items);


            var grid = $('#wodetail-table3').data('kendoGrid');
            var item1 = grid.select();
            var items = grid.dataSource.view();
            $scope.highlight = [];
            for (var i = 0; i < items.length; i++) {
                $scope.highlight.push([]);
                $scope.highlight[i] = false;
                console.log("highlight test", items[i]['procOpSeq'] + " " + $scope.selectedprocopseq);
                if ($scope.selectedprocopseq != undefined && $scope.selectedprocopseq != "0") {
                    if (i < parseInt($scope.selectedprocopseq)) {
                        $scope.highlight[i] = true;
                    }
                    }
            }
            console.log("$scope.highlight", $scope.highlight);
            if (item1.prevObject.length != 0) {
                //console.log("HighlighCompleted item1", );
                var trs = $(item1.prevObject[0]).find("tr");

                for (var i = 0; i < trs.length; i++) {
                    if ($scope.highlight[i]) {
                        $(trs[i]).css("background-color", "yellow");
                    }
                    
                }
            }





           // var grid = $('#wodetail-table1').data('kendoGrid');
          //  var items = grid.dataSource.view();
            

           // console.log("this grid", grid);
          //  console.log("this items", items);
            
            
        }

        //'*******************************************************************
        //'Title     :  convertTime
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to convert time to the correct display format(from YYYY-MM-DDDDTHH:MM:SS to YYYY-MM-DDDD HH:MM:SS)
        //********************************************************************
        function convertTime(convertField, data) {
            for (var i = 0; i < convertField.length; i++) {
                var field = convertField[i];
                for (var j = 0; j < data.length; j++) {
                    var originaltime = data[j][field];
                    if(originaltime != null){
                    var originaltimeArray = originaltime.split("T");
                    var finaltime = "";
                    for (var k = 0; k < originaltimeArray.length; k++) {
                        finaltime = finaltime + originaltimeArray[k] + " ";
                    }
                    data[j][field] = finaltime;
                }
                }
            }
        }

        function maketable1(data) {
             console.log("kendo data correct", data);
            // var temp = data.slice(0);
             convertTime(["committedDeliveryDate", "releasedDate", "requestedDeliveryDate", "startDate", "endDate"], data)

            $("#wodetail-table1").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    selectable: "true",
                    columns: [
                        {
                            field: "woid", title: "WO", width: 150
                        },
                        {
                            field: "partID", title: "Part No.", width: 150

                        },
                        {
                            field: "toolDescription", title: "Part Family", width: 150
                        },
                         {
                             field: "releasedDate", title: "Released Date", width: 150
                         },
                         {
                             field: "requestedDeliveryDate", title: "Requested Delivery Date", width: 150
                         },
                         {
                             field: "committedDeliveryDate", title: "Committed Delivery Date", width: 150
                         },
                         {
                             field: "woStatus", title: "Status", width: 150
                         },
                         {
                             field: "startDate", title: "Start Time", width: 150
                         },
                         {
                             field: "endDate", title: "End Time", width: 150
                         },
                         {
                             field: "remark", title: "Remarks", width: 150
                         }
                    ]
                })

            

        }


        //'*******************************************************************
        //'Title     :  maketable3
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make table3(Process Route Detail)
        //********************************************************************
        function maketable3(data) {
            console.log("table3 data", data);
            var temp = data.slice(0);

            convertTime(["column7", "column8"], data)
            console.log("table3 data after", data);

            for (var i = 0; i < data.length;i++){
                if (data[i]['totalSetupDuration'] != undefined  && data[i]['totalSetupDuration'] != null && String(data[i]['totalSetupDuration']).trim() != "") {
                    data[i]['totalSetupDurationTime'] = secondsToHms(data[i]['totalSetupDuration']);
                }

                if (data[i]['prodTotalDuration'] != undefined && data[i]['prodTotalDuration'] != null && String(data[i]['prodTotalDuration']).trim() != "") {
                    data[i]['prodTotalDurationTime'] = secondsToHms(data[i]['prodTotalDuration']);
                }
            }
            $("#wodetail-table3").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                 //   rowTemplate:'<tr class="#:ReportClassDescription==\"Express\"? \"red\" : \"white\"#" data-uid="#= uid #"><td>#: name #</td><td>#:ReportClassDescription #</td></tr>',
                    selectable: "true",
                    columns: [
                        {
                            field: "workCenter", title: "Work Centre", width: 150
                        },
                        {
                            field: "name", title: "RouteName", width: 150

                        },
                        {
                            field: "opSeq", title: "Op Seq", width: 50
                        },
                         {
                             field: "procOpSeq", title: "ProcOpSeq", width: 50
                         },
                         {
                             field: "mcID", title: "Machine ID", width: 150
                         },
                         {
                             field: "mcType", title: "Machine Type", width: 100
                         },
                         {
                             field: "column7", title: "Start Time", width: 150
                         },
                         {
                             field: "column8", title: "End Time", width: 150
                         },
                         {
                             field: "totalSetupDurationTime", title: "Setup Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "prodTotalDurationTime", title: "Production Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "plannedDuration", title: "Planned Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "scrapQty", title: "Scrap Qty", width: 100
                         },
                         {
                             field: "operatorName", title: "Operator Name", width: 150
                         },
                         {
                             field: "shiftID", title: "Shift ID", width: 50
                         },
                         {
                             field: "remark", title: "Remarks", width: 150
                         }
                    ]
                })


            HighlighCompleted();
        }

        //'*******************************************************************
        //'Title     :  maketable4
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make table4(QTY detail)
        //********************************************************************
        function maketable4(data) {
            // console.log("kendo data correct", data.slice(0));
            console.log("test maketable4",data);
            var temp = data.slice(0);
            document.getElementById("wodetail-table6").innerHTML = "";
            $("#wodetail-table6").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    selectable: "true",
                    columns: [
                        {
                            field: "mcID", title: "Equipment", width: 150
                        }
                    ]
                })



        }

        //'*******************************************************************
        //'Title     :  maketable5
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : operator list
        //********************************************************************
        function maketable5(data) {
            // console.log("kendo data correct", data.slice(0));
            var temp = data.slice(0);

            document.getElementById("wodetail-table5").innerHTML = "";
            $("#wodetail-table5").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    selectable: "true",
                    columns: [
                        {
                            field: "operatorName", title: "Operator Name", width: 150
                        }
                    ]
                })



        }



        //'*******************************************************************
        //'Title     :  maketable4
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make QC Attachment
        //********************************************************************
        function makeAttachmentTable(data) {
            // console.log("kendo data correct", data.slice(0));
            //console.log("test maketable4", data);
            var temp = data.slice(0);
            document.getElementById("QCAttachmentTable").innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }


            $("#QCAttachmentTable").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    selectable: "true",
                    columns: [
                        {
                            field: "index", title: "Index", width: 50
                        },
                        {
                            field: "directory", title: "Directory", width: 150
                        },
                        {
                            field: "filename", title: "Filename", width: 150
                        },
                        {
                            field: "FileStatus", title: "FileStatus", width: 100
                        },
                        {
                            field: "checkDate", title: "checkDate", width: 150
                        },
                        {
                            field: "attachedDate", title: "attachedDate", width: 150
                        },
                        {
                            field: "operatorName", title: "Operator Name", width: 150
                        },
                        {
                            field: "approvedName", title: "Approved Name", width: 150
                        }

                    ]
                })



        }


        //'*******************************************************************
        //'Title     :  makeExecutionHistoryTable
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : to make execution history table
        //********************************************************************
        function makeExecutionHistoryTable(data) {
            console.log("table history data", data);

            //convertTime(["column7", "column8"], data)
            // console.log("table3 data after", data);
            document.getElementById("history-table").innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }


            $("#history-table").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    //   rowTemplate:'<tr class="#:ReportClassDescription==\"Express\"? \"red\" : \"white\"#" data-uid="#= uid #"><td>#: name #</td><td>#:ReportClassDescription #</td></tr>',
                    selectable: "true",
                    columns: [
                        {
                           field: "index", title: "", width: 50
                        },
                        {
                            field: "workCenter", title: "Work Centre", width: 150
                        },
                        {
                            field: "mcID", title: "Machine ID", width: 150

                        },
                        {
                            field: "startDateTime", title: "Start Time", width: 150
                        },
                         {
                             field: "stopDateTime", title: "End Time", width: 150
                         },
                         {
                             field: "totalDuration1", title: "Total Time(HH:MM:SS)", width: 150
                         },
                         {
                             field: "reason", title: "Reason/Remark", width: 150
                         },
                         {
                             field: "operatorName", title: "Operator Name", width: 150
                         }
                    ]
                })



        }

        $('input[type=file]').change(function () {
            console.dir(this.files[0])
        })


        //************** time helper function**************************//
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

        //'*******************************************************************
        //'Title     :  uploadFile
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : function to upload file
        //********************************************************************
        $scope.uploadFile = function () {
            var file = $scope.myFile;

            console.log('file is ');
            console.dir("uploadFile",file);

            var uploadUrl = "/fileUpload";
            uploadFileToUrl(file, uploadUrl);
        };


        function uploadFileToUrl(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);




            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            
            .success(function (response) {
                console.log("upload success",response);
            })
            
            .error(function (response) {
                console.log("upload error", response);
            });
        }
    }
})();




