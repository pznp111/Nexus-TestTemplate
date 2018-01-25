(function () {
    'use strict';

    angular.module('erp.wodetail').controller('WodetailCtrl', WodetailCtrl);

    WodetailCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$window'];

    function WodetailCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $window) {
        //initialise global variable
        //var xml = [];
        //var rowNumber = 0;
        //var dataLength = 0;
        //var rowBoxNo = 12;
        //var nextSplitWONo;
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


                var selectedwoid = selectedItem['woid'];
                $scope.selectedwoid = selectedwoid;
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
            $scope.table1Data = [];
            $scope.table1Data.push([]);
            document.getElementById('wodetail-table1').innerHTML = "";
           // var woid = String($('#select_woid option:selected').text()).trim();

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

                    //$http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //    'WOID': woid
                    //})
                    //.then(function (response) {
                    //    console.log("populateWOinfoTable2", response);
                    //    if (response.data.success && response.data.result.length != 0) {
                    //        // true
                    //        copyArrayForTable1(response.data.result[0]);
                    //        console.log("after copy", $scope.table1Data);

                    //        $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                    //            'WOID': woid
                    //        })
                    //        .then(function (response) {
                    //            console.log("populateWOinfoTable3",response);
                    //            if (response.data.success && response.data.result.length != 0) {
                    //                copyArrayForTable1(response.data.result[0]);
                    //            }
                    //            console.log("after copy", $scope.table1Data);
                    //            maketable1($scope.table1Data);
                    //        });

                    //    } else {
                    //        //false
                    //    }
                    //});
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
                            console.log("after copy", $scope.table1Data);

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
            $scope.table1Data = [];
            $scope.table1Data.push([]);
            document.getElementById('wodetail-table1').innerHTML = "";
            var woid = String($('#select_woid option:selected').text()).trim();

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

                    //$http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable2', {
                    //    'WOID': woid
                    //})
                    //.then(function (response) {
                    //    console.log("populateWOinfoTable2", response);
                    //    if (response.data.success && response.data.result.length != 0) {
                    //        // true
                    //        copyArrayForTable1(response.data.result[0]);
                    //        console.log("after copy", $scope.table1Data);

                    //        $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                    //            'WOID': woid
                    //        })
                    //        .then(function (response) {
                    //            console.log("populateWOinfoTable3",response);
                    //            if (response.data.success && response.data.result.length != 0) {
                    //                copyArrayForTable1(response.data.result[0]);
                    //            }
                    //            console.log("after copy", $scope.table1Data);
                    //            maketable1($scope.table1Data);
                    //        });

                    //    } else {
                    //        //false
                    //    }
                    //});
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
                            console.log("after copy", $scope.table1Data);

                            $http.post(config.baseUrlApi + 'HMLVTS/populateWOinfoTable3', {
                                'WOID': woid
                            })
                            .then(function (response) {
                                console.log("populateWOinfoTable3", response);
                                if (response.data.success && response.data.result.length != 0) {
                                    copyArrayForTable1(response.data.result[0],false,[]);
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


        //'*******************************************************************
        //'Title     :  QCAttachment
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    : action triggered by press "QC Attachment button"
        //********************************************************************
        $scope.QCAttachment = function () {
            var woid = String($('#select_woid option:selected').text()).trim();

            if (woid.trim() != "") {

            $http.post(config.baseUrlApi + 'HMLVTS/GenerateAttachmentList', {
                'WOID': woid
            })
            .then(function (response) {
                console.log("GenerateAttachmentList",response);
            });

        }
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
                                if (response[0].data.success && response[0].data.result.length != 0) {
                                    for (var j = 0; j < response.length;j++){
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
                $("#select_woid").val(authService.parameter);
                woSelectedFromWOStatus(authService.parameter)
                //authService.parameter =
                //$('#select_woid option:selected').text(authService.parameter);
            }

            authService.parameter = "";
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
                    var originaltimeArray = originaltime.split("T");
                    var finaltime = "";
                    for (var k = 0; k < originaltimeArray.length; k++) {
                        finaltime = finaltime + originaltimeArray[k] + " ";
                    }
                    data[j][field] = finaltime;
                }
            }
        }

        function maketable1(data) {
             console.log("kendo data correct", data);
            // var temp = data.slice(0);
             convertTime(["committedDeliveryDate", "releasedDate", "requestedDeliveryDate"], data)

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
            // console.log("kendo data correct", data.slice(0));
            var temp = data.slice(0);
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
                            field: "mcID", title: "Work Centre", width: 150
                        },
                        {
                            field: "name", title: "RouteName", width: 150

                        },
                        {
                            field: "opSeq", title: "Op Seq", width: 150
                        },
                         {
                             field: "procOpSeq", title: "ProcOpSeq", width: 150
                         },
                         {
                             field: "mcID", title: "Machine ID", width: 150
                         },
                         {
                             field: "mcType", title: "Machine Type", width: 150
                         },
                         {
                             field: "column7", title: "Start Time", width: 150
                         },
                         {
                             field: "column8", title: "End Time", width: 150
                         },
                         {
                             field: "SetupStartDate", title: "Setup Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "prodEndDate", title: "Production Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "plannedDuration", title: "Planned Duration(HH:MM:SS)", width: 150
                         },
                         {
                             field: "scrapQty", title: "Scrap Qty", width: 150
                         },
                         {
                             field: "operatorName", title: "Operator Name", width: 150
                         },
                         {
                             field: "shiftID", title: "Shift ID", width: 150
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
            var temp = data.slice(0);
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

    }
})();