(function () {
    'use strict';

    angular.module('erp.trackingReport').controller('TrackingReportCtrl', TrackingReportCtrl);

    TrackingReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function TrackingReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var rowNumber = 0;
        var dataLength = 0;
        var rowBoxNo = 12;
        var nextSplitWONo;

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




        populateCustomer();
       // populateKitType();


        function populateCustomer() {
            $http.get(config.baseUrlApi + 'HMLVTS/populateCustomer')
            .then(function (response) {
                console.log("populateCustomer", response.data.result);
                createSelect(response.data.result, "customer");
            });
        }


        $scope.comboMCList_SelectionChangeCommitted = function () {
            alert("here");
            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();
            console.log("comboMCList_SelectionChangeCommitted", customer + " " + item);
            var promiseArray = [];

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/comboMCList_SelectionChangeCommitted0', {
                "CustomerID": customer,
                "ItemName": item
            })
                );


            $q.all(promiseArray).then(function (response) {
                var kititemid = response[0].data.result[0]["itemID"];

                console.log("comboMCList_SelectionChangeCommitted0", kititemid);

            $http.post(config.baseUrlApi + 'HMLVTS/comboMCList_SelectionChangeCommitted', {
                "CustomerID":customer,
                "ItemName": kititemid
            })
                .then(function (response) {
                    console.log("comboMCList_SelectionChangeCommitted", response.data.result);
                    createSelect(response.data.result, "customerkittype");
                });



            })


            //$http.post(config.baseUrlApi + 'HMLVTS/comboMCList_SelectionChangeCommitted', {
            //    "CustomerID":customer,
            //    "CustomerID": item
            //})
            //    .then(function (response) {
            //        console.log("comboMCList_SelectionChangeCommitted", response.data.result);
            //        createSelect(response.data.result, "customerkittype");
            //});
        }


        $scope.populateKitType = function() {
            var customer = $('#select_customer option:selected').text();
            console.log("populateKitType",customer+"|");

            $http.post(config.baseUrlApi + 'HMLVTS/populateKitType', {
                "CustomerName": customer
            })
            .then(function (response) {
                console.log("populateKitType", response.data.result);
               // createSelect(response.data.result, "kittype");

                if (response.data.result.length != 0) {
                    var promiseArray = [];

                    for (var i = 0; i < response.data.result.length;i++){
                    promiseArray.push(

                    $http.post(config.baseUrlApi + 'HMLVTS/populateKitType1', {
                        "CustomerName": response.data.result[i]["customerName"]
                        })

                        );
                    }

                    $q.all(promiseArray).then(function (response) {


                    });

                }
            });

        }


        //'*******************************************************************
        //'Title     :  getKitItemID
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function getKitItemID() {

            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();

            $http.post(config.baseUrlApi + 'HMLVTS/getKitItemID', {
                "CustomerID": customer,
                "ItemName":item
            })
            .then(function (response) {

            });
        }

        //'*******************************************************************
        //'Title     :  refresh
        //'Function  :  
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        $scope.refresh = function () {

            
            var customer = $('#select_customer option:selected').text();
            var item = $('#select_kittype option:selected').text();
            var type = $('#select_customerkittype option:selected').text();
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();

            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var KitItemID = 0;
            var fnGetMaxPartCount = 0;

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/getKitItemID', {
                "CustomerID": customer,
                "ItemName": item
            })
                );


            $q.all(promiseArray).then(function (response) {

                if (response[0].data.result.length != 0) {
                    KitItemID = response[0].data.result[0]["itemID"];
                }
            });



            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnGetMaxPartCount', {
                "ParentItemID": item,
                "startDate": startDate,
                "endDate": endDate,
                "CustomerID": customer,
            })
                );


            $q.all(promiseArray1).then(function (response) {

                if (response[0].data.result.length != 0) {
                    fnGetMaxPartCount = response[0].data.result[0]["partCount"];
                }
            });

            promiseArray2.push(
            $http.post(config.baseUrlApi + 'HMLVTS/fnGetMaxWOCount', {
                "KitType": type,
                "startDate": startDate,
                "endDate": endDate,
                "CustomerID": customer,
            })
                );


            $q.all(promiseArray2).then(function (response) {

                if (response[0].data.result.length != 0) {
                    fnGetMaxPartCount = response[0].data.result[0]["woidCount"];
                }
            });

            //todo:findMaxPartID  line:956


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
                    option.value = String(rawData[i]["name"]).trim();//Subcon QC
                    option.text = String(rawData[i]["name"]).trim();
                    myDiv.appendChild(option);
                }
                // var selected = $("#current-route").val();
                // alert($scope.currentRoute);
                $("#select_kittype").val($scope.currentRoute);
            }

            if (itemName == "customerkittype") {
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
                $("#select_customerkittype").val($scope.currentRoute);
            }
        }




        /// get all woid for this part type selection
        function GetallMeasurementParameters(descr) {
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var dateTimePickerStart = $('#startDate').val();
            var dateTimePickerEnd = $('#endDate').val();


            var WOID = "";
            var discardstatus = false;
            var oldwoid = "";
            var newwoid = "";


            $http.post(config.baseUrlApi + 'HMLVTS/GetallMeasurementParameters', {
                "ItemName": descr,
                "IssueDateStart": dateTimePickerStart,
                "IssueDateEnd": dateTimePickerEnd,
            })
            .then(function (response) {
                console.log(response.data.result);
                //makeTable(response.data.result, "#scrap-remark-table");

                if (response.data.result.length != 0) {

                    promiseArray.push(
                    $http.get(config.baseUrlApi + 'HMLVTS/deleteTS_TrackReportWO')
                        );

                    $q.all(promiseArray).then(function (response) {

                        if (response[0].data.result.length != 0) {

                        }
                    });

                    for (var i = 0; i < response.data.result.length; i++) {

                        WOID = String(response.data.result[i]["WorkOrderNumber"]);
                        $scope.WOID[i] = WOID;
                        promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/getwostatus', {
                            "WOID": oldwoid
                        })
                            );

                    }


                    $q.all(promiseArray1).then(function (response) {

                        if (response.length != 0) {
                            var wostatus = "";
                            for (var j = 0; j < response.length; j++) {
                                $scope.discardstatus[j] = false;
                                if (String(response[j].data.result["WOStatus"]) == "Discard") {
                                    $scope.discardstatus[j] = true;
                                    // discardstatus = true;
                                    break;
                                }
                            }
                        }
                    });



                    for (var k = 0; k < $scope.discardstatus.length; k++) {
                        if ($scope.discardstatus[k] == false) {
                            //oldwoid = getoldWOID(WOID);

                            promiseArray2.push(
                                  $http.post(config.baseUrlApi + 'HMLVTS/getoldWOID', {
                                      "WOID": oldwoid
                                  })
                                );
                        }

                        promiseArray4.push(
                              $http.post(config.baseUrlApi + 'HMLVTS/getoldWOID', {
                                  "WOID": $scope.WOID[k]
                              })
                            );

                    }

                    $q.all(promiseArray2).then(function (response) {

                        if (response.length != 0) {
                            var oldwoid = "";
                            for (var j = 0; j < response.length; j++) {
                                oldwoid = response[j].data.result[0]["linkWOID"];//to-do again
                                if (String(oldwoid).trim() != "") {
                                    promiseArray3.push(
                                            $http.post(config.baseUrlApi + 'HMLVTS/insertTS_TrackReportWO', {
                                                "WOID": oldwoid
                                            })
                                        );
                                }
                            }
                        }
                    });


                    $q.all(promiseArray3).then(function (response) {

                        if (response.length != 0) {

                        }
                    });



                }








            });

                    


        
    
        }

        function fnGetMeasurementParameters() {
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            var promiseArray4 = [];

            var startCol = 23;

            var tempopid = 0;


            $http.get(config.baseUrlApi + 'HMLVTS/fnGetMeasurementParameters')

                .then(function (response) {

                    for (var i = 0; i < response.data.result.length; i++) {
                        tempid = response.data.result[i][["ParameterID"]];
                        tempopid = response.data.result[i]["OperationID"];

                        promiseArray1.push(
                          $http.post(config.baseUrlApi + 'HMLVTS/fnGetMeasurementParameters1', {
                              "OperationID": tempopid,
                              "ParameterID":tempid
                          })//line1198
                            );
                    }

                    $q.all(promiseArray1).then(function (response) {
                        console.log("fnGetMeasurementParameters promiseArray1", response);
                        $scope.promiseArray1Data = response;


                        for (var j = 0; j < response.length; j++) {
                           
                           var unit = String(response.data.result[j]["UOM"]);
                            //var unit1 = unit;

                            promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/getUnit', {
                                "CodeDetailId":unit
                            })
                                );

                        }
                    });
                                           
                        $q.all(promiseArray2).then(function (response) {

                            if (response.length != 0) {
                                for(var j = 0; j < response.length;j++){
                                    $scope.unit[j] = response[j].data.result[0]["description"]
                                }
                            }
                        });

                        for (var k = 0; k < $scope.promiseArray1Data.length;k++){
                            var measurename = "";
                            var measurenamespec = "";
                            var strmin = "";
                            var strmax = "";
                            var cust_strmin = "";
                            var cust_strmax = "";
                            var paraid = 0;
                            var nopts = 0;
                            var unit = $scope.unit[k];

                            paraid = response.data.result[j]["ParamterID"];

                            measurename = String($scope.promiseArray1Data[j]["OperationName"]);
                            measurenamespec = String($scope.promiseArray1Data[j]["Value"]);
                            strmin = String($scope.promiseArray1Data[j]["MinValue"]);
                            strmax = String($scope.promiseArray1Data[j]["MaxValue"]);
                            cust_strmin = String($scope.promiseArray1Data[j]["MaxString1"]);
                            cust_strmax = String($scope.promiseArray1Data[j]["MaxString2"]);

                            nopts = parseInt($scope.promiseArray1Data[j]["NoofReading"]);

                            if (nopts > 50) {
                                alert("No of reading points > 50:" + nopts + ",changed to 50.", "QA Tracking Report");
                                nopts = 50;
                            }

                            if (parseInt(nopts) != 0) {
                                $scope.parameterid[$scope.paraIndex] = paraid;
                                $scope.paracount[$scope.paraIndex] = nopts;
                                $scope.parametercol[$scope.paraIndex] = startCol;
                                $scope.paraoperid[$scope.paraIndex] = tempopid;

                                var tempspec = measurename + "(" + pspec + ")";
                                startCol = startCol + nopts + 2 + 3 + 1; // no.pts value + ave + result + min + max + difference+UOM

                                $scope.paraIndex = $scope.paraIndex + 1;
                            }                            
                        }
                         
                        
                    });        

        }

        function getAllWO(descr) {
            var WOListcommand = "";
            var WOListcommand1 = "";
            var WOListcommand2 = "";
            var WOID = "";
            var issdate = "";
            var duedate = "";
            var count = 0;
            var wono = 0;
            var gatepass = "";
            var issdatetime = new DateTime();
            var duedatetime= new DateTime();
            var chamberid = "";
            var pmreason = "";
            var serialno = "";
            var cyclecount = "";
            var partid = 0;
            var kitIDName = "";
            var modlevel = "";
            var proenddate = "";
            var proendatetime = new DateTime();
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

            $http.post(config.baseUrlApi + 'HMLVTS/getUnit', {
                "CodeDetailId":unit
            })

            .then(function (response) {
                $scope.tempData = response.data.result;
                if (response.data.result.length != 0) {


                    for (var i = 0; i < response.data.result.length;i++){
                        displaywoid = "";  //reset displaywoid
                        discardstatus = false;
                        parentstatus = false;
                        cont = true;
                        infowoid = "";

                        gatepass = "";
                        partidname = "";
                        cyclecount = "";
                        kitIDName = "";
                        RFAcc = "";
                        RFCur = "";
                        WafCntAcc = "";
                        WafCntCur = "";
                        RefCntAcc = "";
                        RefCntCur = "";
                        strissdate = "";
                        WOID = response.data.result[i]["WorkOrderNumber"].ToString();

                        // set display woid to org 
                        displaywoid = WOID; // set display woid= current woid
                        infowoid = WOID; // set information woid = current woid


                        var promiseArray1 = [];

                        promiseArray1.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/checkparentwoid', {
                                "ParentWOID": WOID
                        })
                        );
                        

                    }

                    $q.all(promiseArray1).then(function (response) {
                        if (response.data.result.length != 0) {

                            for (var k = 0; k < response.data.result.length; k++) {
                                var flag = false;
                                if (response.data.result[k].length !=0) {


                                    //true
                                } else {
                                    //false
                                    
                                    $http.post(config.baseUrlApi + 'HMLVTS/getwostatus', {
                                        "WOID": $scope.tempData[k]["WorkOrderNumber"]
                                    })
                                                             .then(function (response) {
                                                                 var discardstatus = false;
                                                                 for (var t = 0; t < response.result.data.length;t++){
                                                                     if(String(response.result.data[t]["WOStatus"]) == "Discard"){
                                                                         discardstatus = true;
                                                                         break;
                                                                     } 
                                                                 }
                                                                 if (discardstatus) {
                                                                     cont = false;
                                                                    } else{
                                                                     //line 290
                                                                    }
                                                             })
                                }
                            }

                        }
                    });
                    
                }
            });
        }
    }
})();