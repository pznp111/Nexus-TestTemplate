(function () {
    'use strict';

    angular.module('erp.split').controller('SplitCtrl', SplitCtrl);

    SplitCtrl.$inject = ['$q','$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function SplitCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var rowNumber = 0;
        var dataLength = 0;
        var rowBoxNo = 12;
        var nextSplitWONo;

        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'scrapReport-18' });

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

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOSplitList')
           .then(function (response) {
               console.log("split list", response.data.result);
               $scope.global = response.data.result;
               createSelect(response.data.result, "splitlist")
           });


        function createSelect(rawData, itemName) {
            console.log("itemName", itemName);
            console.log("rawdata", rawData);
            var myDiv = document.getElementById("select_" + itemName);

            if (itemName == "splitlist") {
               // var option1 = document.createElement("option");
               // option1.value = "";
               // option1.text = "";
               // myDiv.appendChild(option1);

                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = rawData[i]["woid"];//Subcon QC
                    option.text = rawData[i]["woid"];
                    myDiv.appendChild(option);
                }

            }
        }


        //'*******************************************************************
        //'Title     :  checkremakelenght
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function checkremakelenght() {

            for (var i = 1; i < nextSplitWONo;i++){
                var id = "table4_tr" + i + "_5";
                var tempremark = document.getElementById(id).innerHTML;
                if (tempremark.length >= 100) {
                    return false;
                }
            }

            return true;
        }


        //'*******************************************************************
        //'Title     :  addWOExePart1
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function addWOExePart1(data, subwo, temppartid, tempactrecqty, tempactrecdate, tempcomqty, tempcomdate, tempoutsqty, tempoutsdate, newProcOpSeq, wostatus, remark, tempparwo) {

            var promiseArray = [];

            var intQtyUpated;
            var temprouteid = "";
            var tempopseq = "";
            var tempprocopseq = "";
            var tempmcid = "";
            var tempmctype = "";
            var tempworkcenter = "";

            console.log("addWOExePart1 data", data);
            console.log("addWOExePart1 input subwo", subwo);
            console.log("addWOExePart1 input temppartid", temppartid);
            console.log("addWOExePart1 input tempactrecqty", tempactrecqty);
            console.log("addWOExePart1 input tempactrecdate", tempactrecdate);
            console.log("addWOExePart1 input tempcomqty", tempcomqty);
            console.log("addWOExePart1 input tempcomdate", tempcomdate);
            console.log("addWOExePart1 input tempoutsqty", tempoutsqty);
            console.log("addWOExePart1 input tempoutsdate", tempoutsdate);
            console.log("addWOExePart1 input newProcOpSeq", newProcOpSeq);
            console.log("addWOExePart1 input remark", remark);
            console.log("addWOExePart1 input wostatus", wostatus);
            console.log("addWOExePart1 input tempparwo", tempparwo);

            for (var i = 0; i < data.length; i++) {
                console.log("addWOExePart1 data",data[i]);
                temprouteid = data[i]["routeID"];
                tempopseq = data[i]["opSeq"];
                tempprocopseq = data[i]["procOpSeq"];
                tempmcid = data[i]["mcID"];
                tempmctype = data[i]["mcType"];
                tempworkcenter = data[i]["workCenter"];

                temprouteid = String(temprouteid).trim();
                tempopseq =  String(tempopseq).trim();
                tempprocopseq =  String(tempprocopseq).trim();
                tempmcid =  String(tempmcid).trim();
                tempmctype =  String(tempmctype).trim();
                tempworkcenter =  String(tempworkcenter).trim();

                if (parseInt(tempprocopseq) > 1) {
                    intQtyUpated = 0;
                } else {
                    intQtyUpated = 1;
                }

                promiseArray.push($http.post(config.baseUrlApi + 'HMLVTS/addWOExe3', {
                    "WOID": subwo.trim(),
                    "PartID": temppartid,
                    "ActualRecQty": tempactrecqty,
                    "ActualRecDate": tempactrecdate,
                    "CompletedQty": tempcomqty,
                    "CompletedDate": tempcomdate,
                    "OutstandingQty": tempoutsqty,
                    "OutstandingDate": tempoutsdate,
                    "McID": tempmcid,
                    "McType": tempmctype,
                    "RouteID": temprouteid,
                    "WorkCenter": tempworkcenter,
                    "OpSeq": tempopseq,
                    "ProcOpSeq": newProcOpSeq,
                    "WOStatus": wostatus,
                    "Remark": remark,
                    "ParentWOID": tempparwo,
                    "QtyUpdated": intQtyUpated

                })
                    );

            }

            $q.all(promiseArray).then(function (response) {
                console.log("addWOExePart1 promiseArray response", response);
            });

        }

        //'*******************************************************************
        //'Title     :  CheckWO
        //'Function  :  check for WO is in the list
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function CheckWO(WOSelected) {
            var returnResult = true;
            console.log("CheckWO", WOSelected);
            var promiseArray = [];

            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/CheckWO', {
                "WOID": WOSelected
            })
            );


               //.then(function (response) {
               //    console.log("CheckWO", response.data.result);
               //    if (response.data.result.length == 0 || response.data.result == []) {
               //        returnResult = false;
               //        return returnResult;
               //    }
            //});

            $q.all(promiseArray).then(function (response) {
                console.log("CheckWO promiseArray response", response);
                if (response.data.result.length == 0) {
                    return false;
                }
            });

            //return returnResult;
        }

        //'*******************************************************************
        //'Title     :  addWOExe
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function addWOExe(subwo, step, remark, relprodqty, actrecqty, comqty, outqty, wostatus) {
            var temppartid = "";
            var tempreqdate = "";
            var tempcommitdate = "";
            var temprelprodqty = "";
            var temprelproddate = "";
            var tempactprodqty = "";
            var tempactproddate = "";
            var tempactrecqty = "";
            var tempactrecdate = "";
            var tempcomqty = "";
            var tempcomdate = "";
            var tempoutsqty = "";
            var tempoutsdate = "";
            var tempwostatus = "";
            var temptooldesc = "";
            var tempplannremark = "";
            var tempparwo = "";
            var tempremark = "";
            var tempppid = "";
            var tempsaleid = "";
            var tempwo = "";
            var command = "";
            var command1 = "";
            var temprouteid = "";
            var tempopseq = "";
            var tempprocopseq = "";
            var tempmcid = "";
            var tempmctype = "";
            var tempworkcenter = "";
            var newProcOpSeq = 1;
            var tempProcOpSeq = "";

            var intQtyUpated = 0;

            tempwo = $("#split-wo").val();
            tempProcOpSeq = $("#procopseq-info").val();

            var promiseArray = [];
            $http.post(config.baseUrlApi + 'HMLVTS/getTSWorkOrder', {
                "WOID": tempwo
            })
            .then(function (response) {

                var result = response.data.result[0];


                temppartid = result["partID"];
                tempreqdate = result["requestedDeliveryDate"];
                tempcommitdate = result["committedDeliveryDate"];
                temprelprodqty = relprodqty; // change
                temprelproddate = new Date();; //get current datetime
                tempactprodqty = result["actualProdQty"];
                tempactproddate = new Date();
                tempactrecqty = relprodqty;
                tempactrecdate = new Date();; //get current datetime
                tempcomqty = comqty; // change
                tempcomdate = new Date();; //get current datetime
                tempoutsqty = outqty; //change
                tempoutsdate = new Date();; //get current datetime
                tempwostatus = wostatus; // set wostatus
                temptooldesc = result["toolDescription"];
                tempplannremark = result["plannerRemark"];
                tempparwo = tempwo;
                tempremark = remark;
                tempppid = result["ppid"];
                tempsaleid = result["salesOrderID"];

                console.log("addWOExe result1", response.data.result);

                if (step == "Current"){
                    $http.post(config.baseUrlApi + 'HMLVTS/addWOExe1', {
                        "WOID": tempwo,
                        "procOpSeq": tempProcOpSeq
                    })
                    .then(function (response) {
                        addWOExePart1(response.data.result, subwo, temppartid, tempactrecqty, tempactrecdate, tempcomqty, tempcomdate, tempoutsqty, tempoutsdate, newProcOpSeq, wostatus, remark, tempparwo);
                    });

                } else if (step == "Next") {

                    $http.post(config.baseUrlApi + 'HMLVTS/addWOExe2', {
                        "WOID": tempwo,
                        "procOpSeq": tempProcOpSeq
                    })
                    .then(function (response) {
                        addWOExePart1(response.data.result, subwo, temppartid, tempactrecqty, tempactrecdate, tempcomqty, tempcomdate, tempoutsqty, tempoutsdate, newProcOpSeq, wostatus, remark, tempparwo);
                    });
                }


            });



            


        }

        //'*******************************************************************
        //'Title     :  addWORoute
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function addWORoute(subwo, step, remark) {
            var tempwo="";
            var command = "";
            var command1 = "";
            var temprouteid = "";
            var tempopseq = "";
            var tempprocopseq = "";
            var tempmcid = "";
            var tempmctype = "";
            var tempworkcenter = "";
            var tempremark = "";
            var temproutename = "";
            var newProcOpSeq = 1;

            var tempProcOpSeq = "";
            var command2 = "";
            var command3 = "";


            tempwo = $("#split-wo").val();
            tempProcOpSeq = $("#procopseq-info").val();


            
            if(step == "Current" || (step == "Next")){
                $http.post(config.baseUrlApi + 'HMLVTS/addWORouteCurrent', {
                    "WOID": tempwo,
                    "ProcOpSeq": tempProcOpSeq
                })
                .then(function (response) {

                    
                    console.log("addWORouteCurrent", response.data.result);
                    var result = response.data.result;

                    var promiseArray = [];
                    var promiseArray1 = [];
                    var promiseArray2 = [];


                    for (var i = 0; i < result.length; i++) {


                        console.log((result[i]["routeID"]));
                    temprouteid = result[i]["routeID"];
                    tempopseq = result[i]["opSeq"];
                    tempprocopseq = result[i]["procOpSeq"];
                    tempmcid = result[i]["mcID"];
                    tempmctype =result[i]["mcType"];
                    tempworkcenter = result[i]["workCenter"];
                    tempremark = result[i]["remark"];
                    temproutename = result[i]["routeName"];

                    console.log("addWORoute tempmctype subuwo", tempmctype + " " + subwo);

                    if (tempmctype != "QC") {

                        promiseArray.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/addWORouteQC', {
                            "WOID": subwo,
                            "WorkCenter": tempworkcenter,
                            "RouteID": temprouteid,
                            "OpSeq": tempopseq,
                            "ProcOpSeq": newProcOpSeq,
                            "McID": tempmcid,
                            "McType": tempmctype,
                            "Remark": tempremark,
                            "RouteName": temproutename.replace("'", "''")
                        })
                        );

                         promiseArray2.push(
                            $http.post(config.baseUrlApi + 'HMLVTS/addWORouteQC2', {
                                "WOID": subwo,
                                "WorkCenter": tempworkcenter,
                                "RouteID": temprouteid,
                                "OpSeq": tempopseq,
                                "ProcOpSeq": newProcOpSeq,
                                "McID": tempmcid,
                            })
                            );
                        

                    } else {

                        promiseArray1.push(
                        $http.post(config.baseUrlApi + 'HMLVTS/addWORouteQC', {
                            "WOID": subwo,
                            "WorkCenter": tempworkcenter,
                            "RouteID": temprouteid,
                            "OpSeq": tempopseq,
                            "ProcOpSeq": newProcOpSeq,
                            "McID": "",
                            "McType": tempmctype,
                            "Remark": tempremark,
                            "RouteName": temproutename.replace("'", "''")
                        })
                        );

                   

                    }


                    }
                    console.log("addWORoute promiseArray", promiseArray);
                    console.log("addWORoute promiseArray1", promiseArray1);
                    console.log("addWORoute promiseArray2", promiseArray1);

                    $q.all(promiseArray).then(function (response) {                        
                        console.log("addWORoute promiseArray response", response);
                    });

                    
                    $q.all(promiseArray1).then(function (response) {                        
                        console.log("addWORoute promiseArray1 response", response);
                    });

                    $q.all(promiseArray2).then(function (response) {
                        console.log("addWORoute promiseArray2 response", response);
                    });

                 
                });
            }


        }

        //'*******************************************************************
        //'Title     :  delWORoute
        //'Function  :  Delete from WORoute the future steps
        //'Input     :  
        //'Output    :  
        //'Remark    : 
        //'******************************************************************* 
        function delWORoute() {
            var tempwo = $("#split-wo").val();
            var tempProcOpSeq = $("#procopseq-info").val();

            $http.post(config.baseUrlApi + 'HMLVTS/delWORoute', {
                "WOID": tempwo,
                "ProcOpSeq": tempProcOpSeq
            }).then(function (response) {
                console.log("delWORoute response", response);
            });
        }

        //'*******************************************************************
        //'Title     :  delWOExe
        //'Function  :  Delete from WORoute the future steps
        //'Input     :  
        //'Output    :  
        //'Remark    : 
        //'******************************************************************* 
        function delWOExe() {
            var tempwo = $("#split-wo").val();
            var tempProcOpSeq = $("#procopseq-info").val();

            $http.post(config.baseUrlApi + 'HMLVTS/delWOExe', {
                "WOID": tempwo,
                "ProcOpSeq": tempProcOpSeq
            }).then(function (response) {
                console.log("delWOExe response", response);
            });
        }


        //'*******************************************************************
        //'Title     :  updateWOExecution
        //'Function  :  Delete from WORoute the future steps
        //'Input     :  
        //'Output    :  
        //'Remark    : 
        //'******************************************************************* 
        function updateWOExecution() {
            var tempwo = $("#split-wo").val();
            var tempProcOpSeq = $("#procopseq-info").val();

            $http.post(config.baseUrlApi + 'HMLVTS/updateWOExecution', {
                "WOID": tempwo,
                "ProcOpSeq": tempProcOpSeq
            }).then(function (response) {
                console.log("updateWOExecution response", response);
            });
        }


        //'*******************************************************************
        //'Title     :  addSplitWO
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    : gh 2015May17
        //'*******************************************************************
        function addSplitWO(subwo, parentWO, routeID, ProcOpSeq, Type) {

            console.log("addSplitWO subwo", subwo);
            console.log("addSplitWO parentWO", parentWO);
            console.log("addSplitWO routeID", routeID);
            console.log("addSplitWO ProcOpSeq", ProcOpSeq);
            console.log("addSplitWO Type", Type);

            $http.post(config.baseUrlApi + 'HMLVTS/addSplitWO', {
                "ParentWOID": parentWO,
                "ChildWOID": subwo,
                "RouteID": routeID,
                "ProcOpSeq": ProcOpSeq,
                "Type": Type
            }).then(function (response) {
                console.log("addSplitWO response", response);
            });
        }

        //'*******************************************************************
        //'Title     :  addWO
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function addWO(subwo, wostatus, relprodqty, actrecqty,
            comqty, outqty, strremark) {

            console.log("addWo 1", subwo + " " + wostatus + " " + relprodqty + " " + actrecqty + " " +comqty + " " + outqty + " " + strremark);
                var tempwo = "";
                var temppartid = "";
                var tempreqdate="";
                var tempcommitdate="";
                var temprelprodqty = "";
                var temprelproddate = "";
                var tempactprodqty = "";
                var tempactproddate = "";
                var tempactrecqty = "";
                var tempactrecdate = "";
                var tempcomqty = "";
                var tempcomdate = "";
                var tempoutsqty = "";
                var tempoutsdate = "";
                var tempwostatus = "";
                var temptooldesc = "";
                var tempplannremark = "";
                var tempparwo = "";
                var tempremark = "";
                var tempppid = "";
                var tempsaleid = "";
                var tempapprovedid = "";
                var tempapprovedname = "";
                var tempoperatorid = "";
                var tempoperatorname = "";
                var tempreleaseddate = "";
                var command = "";
                var tempordertype = null;

                tempwo = $("#split-wo").val();
                
               
                
                $http.post(config.baseUrlApi + 'HMLVTS/getTSWorkOrder', {
                    "WOID": tempwo,
                })
                .then(function (response) {
                    console.log("addWORouteQC", response.data.result);
                    $scope.result1 = response.data.result[0];

                    console.log("addWO", response.data.result[0]);

                    temppartid = response.data.result[0]["partID"];
                    tempreqdate = response.data.result[0]["requestedDeliveryDate"];
                    tempcommitdate = response.data.result[0]["committedDeliveryDate"];
                    temprelprodqty = response.data.result[0]["releasedProdQty"];
                    temprelproddate = new Date(); //get current datetime
                    tempactprodqty = relprodqty;
                    tempactproddate = new Date();
                    tempactrecqty = relprodqty; //actrecqty; // change
                    tempactrecdate = new Date(); //get current datetime
                    tempcomqty = comqty; // change
                    tempcomdate = new Date(); //get current datetime
                    tempoutsqty = outqty; //change
                    tempoutsdate = new Date(); //get current datetime
                    tempwostatus = wostatus; // set wostatus
                    temptooldesc = response.data.result[0]["toolDescription"];
                    tempplannremark = response.data.result[0]["plannerRemark"];
                    tempparwo = tempwo;
                    tempremark = strremark;
                    tempppid = response.data.result[0]["ppid"];
                    tempsaleid = response.data.result[0]["salesOrderID"];
                    tempreleaseddate = response.data.result[0]["releasedDate"];
                    tempordertype = response.data.result[0]["orderType"];

                    console.log("addWO temppartid", temppartid);
                    console.log("addWO tempreqdate", tempreqdate);
                    console.log("addWO tempcommitdate", tempcommitdate);
                    console.log("addWO temprelprodqty", temprelprodqty);
                    console.log("addWO temprelproddate", temprelproddate);
                    console.log("addWO tempactprodqty", tempactprodqty);
                    console.log("addWO tempactproddate", tempactproddate);
                    console.log("addWO tempactrecqty", tempactrecqty);
                    console.log("addWO tempactrecdate", tempactrecdate);
                    console.log("addWO tempcomqty", tempcomqty);
                    console.log("addWO tempcomdate", tempcomdate);
                    console.log("addWO tempoutsqty", tempoutsqty);
                    console.log("addWO tempoutsdate", tempoutsdate);
                    console.log("addWO tempwostatus", tempwostatus);
                    console.log("addWO temptooldesc", temptooldesc);
                    console.log("addWO tempplannremark", tempplannremark);
                    console.log("addWO tempparwo", tempparwo);
                    console.log("addWO tempremark", tempremark);
                    console.log("addWO tempppid", tempppid);
                    console.log("addWO tempsaleid", tempsaleid);
                    console.log("addWO tempreleaseddate", tempreleaseddate);
                    console.log("addWO tempordertype", tempordertype);

                    $http.post(config.baseUrlApi + 'HMLVTS/addWO', {
                        "WOID": subwo,
                        "PartID":temppartid.replace("'", "''"),
                        "RequestedDeliveryDate":tempreqdate,
                        "CommittedDeliveryDate":tempcommitdate,
                        "ReleasedProdQty":temprelprodqty,
                        "ReleasedProdDate":temprelproddate,
                        "ActualProdQty":tempactprodqty,
                        "ActualProdDate":tempactproddate,
                        "ActualRecQty":tempactrecqty,
                        "ActualRecDate":tempactrecdate,
                        "CompletedQty":tempcomqty,
                        "CompletedDate":tempcomdate,
                        "OutstandingQty":tempoutsqty,
                        "OutstandingDate":tempoutsdate,
                        "WOStatus":tempwostatus,
                        "ToolDescription":temptooldesc,
                        "PlannerRemark":tempplannremark,
                        "ParentWOID":tempparwo,
                        "Remark":tempremark,
                        "PPID":tempppid,
                        "SalesOrderID":tempsaleid,
                        "OperatorID":tempoperatorid,
                        "OperatorName":tempoperatorname,
                        "ApprovedID":tempapprovedid,
                        "ApprovedName":tempapprovedname,
                        "ReleasedDate":tempreleaseddate,
                        "OrderType":tempordertype.trim()
                    })
                    .then(function (response) {
                        console.log("addWO response", response);
                    });

                });


        }


        //'*******************************************************************
        //'Title     :  save
        //'Function  :  save the result 
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.save = function () {
            var tempsubWO = "";
            var tempqty = "";
            var tempcomqty = "";
            var tempoutqty = "";
            var tempremark = "";
            var balrecqty = 0;
            var tempbalqty = "";
            var strCurProcOpSeq = "";

            var selectedSplitWO = "";
            var fnCheckWOLockret = ""; 
            var selectedSplitWOQty = "";

            strCurProcOpSeq = document.getElementById("procopseq-info").innerHTML;
            var count = $("#split-table4-table tr").length;
            console.log("count", count);
            console.log("dug",($("#split-balallowable").val()+ " "+$("#split-balallowable").val()));
            if ($("#split-balallowable").val() == "0" && $("#split-balallowable").val() == "") {
                console.log("1here1");
                alert("Please complete splitting for the rest of Balanced Received Qty!");
            } else if ($("#split-balallowable").val() == "0" && count >= 2 && checkremakelenght()) {//todo:checkremakelenght
                tempbalqty = $("#split-allowable").val();
                console.log("2here2");
                for (var i = 1; i < nextSplitWONo; i++) {
                    console.log("here3",i);
                    var nthTr = $("#table4_tr"+i);
                    console.log("nthTr", nthTr);
                    console.log($("#table4_tr" + i+ "_1"));
                    console.log($("#table4_tr" + i + "_2"));
                    console.log($("#table4_tr" + i + "_3"));
                    console.log($("#table4_tr" + i + "_4"));

                    console.log("#table4_tr" + i+"_1");
                    tempsubWO = document.getElementById("table4_tr" + i + "_1").innerHTML;
                    console.log("#table4_tr" + i + "_2");
                    tempqty = document.getElementById("table4_tr" + i + "_2").innerHTML;
                    console.log("#table4_tr" + i + "_3");
                    tempcomqty = document.getElementById("table4_tr" + i + "_3").innerHTML;
                    console.log("#table4_tr" + i + "_4");
                    tempoutqty = document.getElementById("table4_tr" + i + "_4").innerHTML;
                    console.log("#table4_tr" + i + "_5");
                    tempremark = document.getElementById("table4_tr" + i + "_5").innerHTML;

                    balrecqty = parseInt(tempbalqty) - parseInt(tempqty);
                    tempbalqty = balrecqty;


                    //addWO(tempsubWO, "Pending", tempqty, tempbalqty, tempcomqty, tempoutqty, tempremark);
                    if ((parseInt(tempcomqty) == 0) && (parseInt(tempoutqty) > 0)) {
                        console.log("loop1");
                        addWO(tempsubWO, "Pending", tempqty, tempbalqty, tempcomqty, tempoutqty, tempremark);
                        addWORoute(tempsubWO, "Current", tempremark);
                        addWOExe(tempsubWO, "Current", tempremark, tempqty, tempbalqty, tempcomqty, tempoutqty, "Pending");

                    } else if ((parseInt(tempcomqty) < parseInt(tempqty)) && (parseInt(tempoutqty) > 0)) {
                        console.log("loop2");
                        addWO(tempsubWO, "Pending", tempqty, tempbalqty, tempcomqty, tempoutqty, tempremark);
                        addWORoute(tempsubWO, "Current", tempremark);
                        addWOExe(tempsubWO, "Current", tempremark, tempqty, tempbalqty, tempcomqty, tempoutqty, "Pending");
                    } else if ((parseInt(tempcomqty) == parseInt(tempqty)) && (parseInt(tempoutqty) == 0)) {
                        console.log("loop3");
                        addWO(tempsubWO, "Pending", tempqty, tempbalqty, tempcomqty, tempoutqty, tempremark);
                        addWORoute(tempsubWO, "Next", tempremark);
                        addWOExe(tempsubWO, "Next", tempremark, tempqty, tempbalqty, tempcomqty, tempoutqty, "Pending");
                    }

                    addSplitWO(tempsubWO, $("#split-wo").val(), $scope.routeID, strCurProcOpSeq, "Split");
                }
                delWORoute();
                delWOExe();
                updateWOExecution();
                alert("Split records successfully added!");
            }

        }

        
        //'*******************************************************************
        //'Title     :  split
        //'Function  :  split WO 
        //'Input     :  
        //'Output    :  
        //'Remark    :  
        //'*******************************************************************
        $scope.split1 = function () {
            var splitqty = $('#split-qty').val();
            var splitno = nextSplitWONo;
            var splitWONO = parseInt(splitqty) - parseInt(splitno);
            var select_splitlist = $('#select_splitlist option:selected').text().toLowerCase();
            var balallowable = $('#split-balallowable').val();
            var balcomplete = $("#split-balcompleted").val().trim();
            var SplitWONo = select_splitlist + "-" + splitno;

            if (select_splitlist != "" && splitqty != "0" && balallowable != "" && balcomplete != "") {
                if (parseInt(splitqty) > parseInt(balallowable)) {
                    splitqty = balallowable;
                }
                $("#split-balallowable").val(parseInt(balallowable) - parseInt(splitqty));
            }

            if (parseInt(balallowable) != 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("id", "table4_tr" + nextSplitWONo);
            tr.setAttribute("class", "reproduce-kendo-row1")

            var th1 = document.createElement("th");
            th1.setAttribute("id", "table4_tr" + nextSplitWONo + "_1");
            th1.setAttribute("class", "reproduce-kendo-row1")
            var span1 = document.createTextNode(SplitWONo);
            th1.appendChild(span1);//correct

            var th2 = document.createElement("th");
            th2.setAttribute("id", "table4_tr" + nextSplitWONo + "_2");
            th2.setAttribute("class", "reproduce-kendo-row1")
            var span2 = document.createTextNode(splitqty);
            th2.appendChild(span2);

            // console.log("IssueCompletedQty", IssueCompletedQty);
            var th3 = document.createElement("th");
            th3.setAttribute("id", "table4_tr" + nextSplitWONo + "_3");
            th3.setAttribute("class", "reproduce-kendo-row1")
            var span3 = document.createTextNode(balcomplete);
            th3.appendChild(span3);

            var th4 = document.createElement("th");
            th4.setAttribute("id", "table4_tr" + nextSplitWONo + "_4");
            th4.setAttribute("class", "reproduce-kendo-row1")
            var span4 = document.createTextNode(parseInt(splitqty) - parseInt(balcomplete));
            th4.appendChild(span4);


            var th5 = document.createElement("th");
            th5.setAttribute("id", "table4_tr" + nextSplitWONo + "_5");
            //th5.appendChild(span5);


            tr.appendChild(th1); tr.appendChild(th2); tr.appendChild(th3); tr.appendChild(th4); tr.appendChild(th5);

            var table = document.getElementById("split-table4-table");
            table.appendChild(tr);
            nextSplitWONo++;

            console.log("nextSplitWONo", nextSplitWONo);
            } else {
                alert("no more to split");
            }

        }

        //'*******************************************************************
        //'Title     :  split
        //'Function  :  split WO 
        //'Input     :  
        //'Output    :  
        //'Remark    :  too complicated, dont use
        //'*******************************************************************
        $scope.split = function () {

            
            var splitqty = $('#split-qty').val();
           // var splitno = $('#split-no').val().toLowerCase();
            var splitno = nextSplitWONo;
                            

            var splitWONO = parseInt(splitqty) - parseInt(splitno);

            var select_splitlist = $('#select_splitlist option:selected').text().toLowerCase();
            var balallowable = $('#split-balallowable').val();
            var balcomplete = $("#split-balcompleted").val().trim();
           // var splitqty = $("#split-qty").val();
            var SplitWONo = select_splitlist + "-" +splitno;

            var BalCompletedQty; var SplitQty; var BalRxQty; var IssueCompletedQty;
            console.log("debug",select_splitlist + " " + splitqty + " " + balallowable + " " + balcomplete);
            if (select_splitlist != "" && splitqty != "0" && balallowable != "" && balcomplete != "") {
                //var splitno = ($("#split-no").val()).trim();
                console.log("here2");
                if (splitno == "1") {
                    console.log("here1");
                    //strCompletedQty = fpSpreadWIPSummary.ActiveSheet.GetText(4, 0);
                    var strCompletedQty = document.getElementById("table3-td4_1").innerHTML;

                    //strRxQty = (int.Parse(fpSpreadWIPSummary.ActiveSheet.GetText(4, 0)) +
                    //                    int.Parse(fpSpreadWIPSummary.ActiveSheet.GetText(7, 0))).ToString();
                    var strRxQty = parseInt(document.getElementById("table3-td4_1").innerHTML) + parseInt(document.getElementById("table3-td7_1").innerHTML);

                    //txtRxQty.Text = strRxQty;
                    $("#split-allowable").val(strRxQty);

                    //txtCompletedQty.Text = strCompletedQty;
                    $("#split-completed").val(strCompletedQty)
                                                       
                    //txtBalRxQty.Text = strRxQty;
                    // $("#split-balallowable").val(strCompletedQty);
                    console.log("debug2", balallowable);
                    $("#split-balallowable").val(parseInt(balallowable) -1);

                    //txtBalCompletedQty.Text = strCompletedQty;
                    $("#split-balcompleted").val(strCompletedQty);

                    //CompletedQty = Convert.ToInt16(strCompletedQty);
                    var CompletedQty = parseInt(strCompletedQty);

                    //RxQty = Convert.ToInt16(strRxQty);
                    var RxQty = parseInt(strRxQty);

                    //BalCompletedQty = CompletedQty;
                    BalCompletedQty = CompletedQty;

                    //BalRxQty = RxQty;
                    var BalRxQty = RxQty;
                }//line 167


                //SplitQty = Int16.Parse(txtSplitQty.Text);
                SplitQty = parseInt(splitqty);
                //BalCompletedQty = Int16.Parse(txtBalCompletedQty.Text);
                BalCompletedQty = parseInt($("#split-balcompleted").val());
                console.log("BalCompletedQty", BalCompletedQty + " " + $("#split-balcompleted").val());
                //BalRxQty = Int16.Parse(txtBalRxQty.Text);
                BalRxQty = parseInt($("#split-balallowable").val());

                //if (SplitQty > BalRxQty) {
                //    SplitQty = BalRxQty;
                //    txtSplitQty.Text = Convert.ToString(SplitQty);
                //}
                console.log("debug BalRxQty", BalRxQty);
                if (SplitQty > BalRxQty) {
                    SplitQty = BalRxQty;
                    $("#split-qty").val(SplitQty);
                }

                //if (BalCompletedQty >= SplitQty) {
                //    IssueCompletedQty = SplitQty;
                //}
                //else {
                //    IssueCompletedQty = BalCompletedQty;
                //}
                console.log("IssueCompletedQty1", SplitQty + " " + BalCompletedQty);
                if (BalCompletedQty >= SplitQty) {
                    IssueCompletedQty = SplitQty;
                }
                else {
                    IssueCompletedQty = BalCompletedQty;
                }// line 186

                //BalCompletedQty = BalCompletedQty - IssueCompletedQty;
                //BalRxQty = BalRxQty - SplitQty;
                BalCompletedQty = BalCompletedQty - IssueCompletedQty;
                BalRxQty = BalRxQty - SplitQty;

                //txtBalRxQty.Text = Convert.ToString(BalRxQty);
                //txtBalCompletedQty.Text = Convert.ToString(BalCompletedQty);
                $("#split-balallowable").val(parseInt(BalRxQty));
                $("#split-balcompleted").val(parseInt(BalCompletedQty));

                //SubWONo = fpSpreadWOSplit.ActiveSheet.RowCount;

                //fpSpreadWOSplit.ActiveSheet.AddRows(SubWONo, 1);
                //fpSpreadWOSplit.ActiveSheet.SetText(SubWONo, 0, SplitWONo);
                //fpSpreadWOSplit.ActiveSheet.SetText(SubWONo, 1, Convert.ToString(SplitQty));
                //fpSpreadWOSplit.ActiveSheet.SetText(SubWONo, 2, Convert.ToString(IssueCompletedQty));
                //fpSpreadWOSplit.ActiveSheet.SetText(SubWONo, 3, Convert.ToString(SplitQty - IssueCompletedQty));

                //fpSpreadWOSplit.ActiveSheet.Cells[SubWONo, 4].BackColor = Color.White; //gh 27Jan11

                //nextSplitWONo = Convert.ToInt32(comboBoxSplitNo.Text) + 1;

                //comboBoxSplitNo.Text = nextSplitWONo.ToString();
               // console.log("debug", $('#split-qty').text());
                console.log("debug", $('#split-qty').val());
                console.log("debug", "SplitWONo:" + SplitWONo + " SplitQty:" + SplitQty + " IssueCompletedQty:" + IssueCompletedQty);
                var tr = document.createElement("tr");
                tr.setAttribute("id", "table4_tr" + nextSplitWONo);
                tr.setAttribute("class","reproduce-kendo-row1")

                var th1 = document.createElement("th");
                th1.setAttribute("id", "table4_tr" + nextSplitWONo + "_1");
                th1.setAttribute("class", "reproduce-kendo-row1")
                var span1 = document.createTextNode(SplitWONo);
                th1.appendChild(span1);//correct

                var th2 = document.createElement("th");
                th2.setAttribute("id", "table4_tr" + nextSplitWONo + "_2");
                th2.setAttribute("class", "reproduce-kendo-row1")
                var span2 = document.createTextNode(SplitQty);
                th2.appendChild(span2);

                console.log("IssueCompletedQty", IssueCompletedQty);
                var th3 = document.createElement("th");
                th3.setAttribute("id", "table4_tr" + nextSplitWONo + "_3");
                th3.setAttribute("class", "reproduce-kendo-row1")
                var span3 = document.createTextNode(IssueCompletedQty);
                th3.appendChild(span3);

                var th4 = document.createElement("th");
                th4.setAttribute("id", "table4_tr" + nextSplitWONo + "_4");
                th4.setAttribute("class", "reproduce-kendo-row1")
                var span4 = document.createTextNode(parseInt(SplitQty) - parseInt(IssueCompletedQty));
                th4.appendChild(span4);


                var th5 = document.createElement("th");
                th5.setAttribute("id", "table4_tr" + nextSplitWONo + "_5");
                //th5.appendChild(span5);


                tr.appendChild(th1); tr.appendChild(th2); tr.appendChild(th3); tr.appendChild(th4); tr.appendChild(th5);

                var table = document.getElementById("split-table4-table");
                table.appendChild(tr);
                nextSplitWONo++;

                console.log("nextSplitWONo", nextSplitWONo);
                //for (var i = 0; i < $("#split-table4-table tr").length;i++){
                //    var nthTr = $("#split-table4-table tr:nth-child(" + i + ")");
                //    console.log("nth",nthTr.attr("id"));
                //}
                


            } else {

                console.log("here3");
                if(select_splitlist == ""){
                    alert("Please enter Work Order");
                } else if(document.getElementById("split-balallowable").innerHTML == ""){
                    alert("Balance Allowable Qty is 0.");
                } else if($('#split-qty').val() == ""){
                    alert("Please enter split qty.");
                }
            //    if (comboWO.Text == "") {
            //        MessageBox.Show("Please enter Work Order", "WO Split",
            //            MessageBoxButtons.OK, MessageBoxIcon.Information);

            //    }
            //    else if (txtBalRxQty.Text == "0" || txtBalRxQty.Text == "") {
            //        MessageBox.Show("Balance Allowable Qty is 0.", "WO Split",
            //            MessageBoxButtons.OK, MessageBoxIcon.Information);

            //    }
            //    else if (txtSplitQty.Text == "") {
            //        MessageBox.Show("Please enter split qty.", "WO Split",
            //           MessageBoxButtons.OK, MessageBoxIcon.Information);
            //    }
            }
        }



        //'*******************************************************************
        //'Title     :  splitSelected
        //'Function  :  function to call when selector value is onchange 
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.splitSelected = function () {


            $(".reproduce-kendo-row1").remove();

            

            $("#hidden-row-1").css("display", "block");
            $("#hidden-row-2").css("display", "block");
            $("#hidden-row-3").css("display", "block");


            nextSplitWONo = 1;
            var select_splitlist = $('#select_splitlist option:selected').text().toLowerCase();
            //alert(select_splitlist);
            console.log("global", $scope.global);
            var procopseq = findOrderByWOID(select_splitlist);
            console.log("procopseq", procopseq);

            $("#procopseq-info").val(procopseq);
            $("#split-wo").val(select_splitlist);




            //CheckWO(select_splitlist);
            // console.log("CheckWO result", CheckWO(select_splitlist));

            $http.post(config.baseUrlApi + 'HMLVTS/CheckWO', {
                "WOID": select_splitlist
            })         
            .then(function (response) {
                console.log("CheckWO", response.data.result);


                if (response.data.result.length == 0 || response.data.result == []) {
                    alert("WO is invalid or not dispatch.");
                    //todo: after close model, refresh the page
                } else {
                $http.post(config.baseUrlApi + 'HMLVTS/comboWO_SelectedIndexChanged', {
                "WOID": select_splitlist,
                "ProcOpSeq":procopseq
            })
                .then(function (response) {
                    console.log("work centre", response.data.result);                  
                    $("#work-center-info").val(response.data.result[0]["workCenter"]);
                    $scope.routeID = response.data.result[0]["routeID"];

                });

            

            GenerateWODetail(select_splitlist, procopseq);
            GenerateWOMaterial(select_splitlist);
            GenerateWOSummary(select_splitlist, procopseq);

            

            $(".k-grid-content").addClass("split-table-height");
                }
            });


            // var container = document.getElementClassName("k-grid-content");
            // container.setAttribute("style", "height:264px;");



        }

        //'*******************************************************************
        //'Title     :  GenerateWOSummary
        //'Function  :  generate WO Summary information 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOSummary(woid, procopseq) {
            var div11 = document.getElementById("table3-td1_1"); var div12 = document.getElementById("table3-td1_2");
            var div21 = document.getElementById("table3-td2_1"); var div22 = document.getElementById("table3-td2_2");
            var div31 = document.getElementById("table3-td3_1"); var div32 = document.getElementById("table3-td3_2");
            var div41 = document.getElementById("table3-td4_1"); var div42 = document.getElementById("table3-td4_2");
            var div51 = document.getElementById("table3-td5_1"); var div52 = document.getElementById("table3-td5_2");
            var div61 = document.getElementById("table3-td6_1"); var div62 = document.getElementById("table3-td6_2");
            var div71 = document.getElementById("table3-td7_1"); var div72 = document.getElementById("table3-td7_2");
            var result = {};
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary1', {
                "WOID": woid
            })
               .then(function (response) {
                   console.log("GenerateWOSummary1", response.data.result);
                   var obj1 = response.data.result[0];
                   for (var key in obj1) result[key] = obj1[key];
                  // console.log("GenerateWOSummary4", result);

                $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOSummary2', {
                "WOID": woid,
                "ProcOpSeq":procopseq
            })
               .then(function (response) {
                   console.log("GenerateWOSummary2", response.data.result);
                   var obj2 = response.data.result[0];
                   for (var key in obj2) result[key] = obj2[key];

                   $scope.result = result;
                   console.log("GenerateWOSummary3", result);
                   console.log(result["releasedProdQty"]);


                   //always show 1
                   var span11 = document.createTextNode(result["releasedProdQty"]);
                   div11.appendChild(span11);
                   var span12 = document.createTextNode(result["releasedProdDate"]);
                   div12.appendChild(span12);

                   // 2
                   if (String(result["actualProdQty"]).trim() != String(result["releasedProdQty"]).trim()) {
                       var span21 = document.createTextNode(result["actualProdQty"]);
                       div21.appendChild(span21);
                       var span22 = document.createTextNode(result["actualProdDate"]);
                       div22.appendChild(span22);
                   } else {
                       var tr = document.getElementById("table3_tr2");
                       tr.setAttribute("style", "display:none");
                   }


                   //always show 3
                   var span31 = document.createTextNode(result["actualRecQty"]);
                   div31.appendChild(span31);
                   var span32 = document.createTextNode(result["actualRecDate"]);
                   div32.appendChild(span32);

                   //always show 4
                   var span41 = document.createTextNode(result["completedQty"]);
                   div41.appendChild(span41);
                   var span42 = document.createTextNode(result["completedDate"]);
                   div42.appendChild(span42);


                   //toggle 5
                   if (String(result["accumulatedScrapQty"]).trim() !=null &&
                       String(result["accumulatedScrapQty"]).trim() != "0" &&
                       String(result["accumulatedScrapQty"]).trim() != "") {
                       var span51 = document.createTextNode(result["accumulatedScrapQty"]);
                       div51.appendChild(span51);

                       var span52 = document.createTextNode(result["accumulatedScrapDate"]);
                       div52.appendChild(span52);
                   } else {

                       var tr = document.getElementById("table3_tr5");
                       tr.setAttribute("style", "display:none");
                   }


                   //toggle 6
                   if (String(result["adjustedQty"]).trim() != null &&
                       String(result["adjustedQty"]).trim() != "0" &&
                       String(result["adjustedQty"]).trim() != "" &&
                        String(result["adjustedQty"]).trim() != "null") {
                       var span61 = document.createTextNode(result["adjustedQty"]);
                       div61.appendChild(span61);

                       var span62 = document.createTextNode(result["adjustedDate"]);
                       div62.appendChild(span62);
                   } else {
                       var tr = document.getElementById("table3_tr6");
                       tr.setAttribute("style", "display:none");
                   }



                        //always show 7
                       var span71 = document.createTextNode(result["outstandingQty"]);
                       div71.appendChild(span71);
                       var span72 = document.createTextNode(result["outstandingDate"]);
                       div72.appendChild(span72);



                       console.log("debug test",result);
                       $("#split-allowable").val(parseInt(result["completedQty"]) + parseInt(result["outstandingQty"]));
                       $("#split-completed").val(result["completedQty"]);
                       $("#split-balcompleted").val(result["completedQty"]);
                       $("#split-balcompleted").val(parseInt(result["completedQty"]));
                       $("#split-balallowable").val(parseInt(result["completedQty"]) + parseInt(result["outstandingQty"]));
                       $("#split-no").val("1");

               });
               });


        }

        //'*******************************************************************
        //'Title     :  GenerateWOMaterial
        //'Function  :  generate WO material list 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWOMaterial(woid) {
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWOMaterial', {
                "WOID": woid
            })
            .then(function (response) {
                console.log("GenerateWOMaterial", response.data.result);
                var data = response.data.result;
                $("#split-table2").kendoGrid({
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
                         field: "name", title: "Name", width: 50

                     },
                     {
                         field: "supplier", title: "Supplier", width: 50

                     },
                     {
                         field: "grade", title: "Grade", width: 50

                     },
                     {
                         field: "value", title: "Description", width: 50

                     },
                     {
                         field: "value", title: "Description", width: 50, template:
                             "# if(value.toLowerCase() == 'true'){#" +
                    "<input type='checkbox' checked disabled readonly>" +
                    "# } else { #" +
                    "<input type='checkbox' disabled readonly>" +
                    "# } #"

                     }
                    ]
                })
                
               

            });



        }

        //'*******************************************************************
        //'Title     :  GenerateWODetail
        //'Function  :  generate WO Detail information 
        //'Input     :  
        //'Output    : 
        //'Remark    :
        //'*******************************************************************
        function GenerateWODetail(woid, procopseq) {
            var div1 = document.getElementById("table1-td1");
            var div2 = document.getElementById("table1-td2");
            var div3 = document.getElementById("table1-td3");
            var div4 = document.getElementById("table1-td4");
            div1.innerHTML = ""; div2.innerHTML = ""; div3.innerHTML = ""; div4.innerHTML = "";
            
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWODetail1', {
                "WOID": woid
            })
                .then(function (response) {
                    console.log("GenerateWODetail1", response.data.result);                  
                    var span = document.createTextNode(response.data.result[0]["partID"]);
                    div1.appendChild(span);

                    var span1 = document.createTextNode(response.data.result[0]["plannerRemark"]);
                    div3.appendChild(span1);
                
                    if (response.data.result[0]["toolDescription"] != "" || response.data.result[0]["toolDescription"] != null) {
                        var span2 = document.createTextNode(response.data.result[0]["toolDescription"]);
                        div2.appendChild(span2);
                    }
                                       

                });

            $http.post(config.baseUrlApi + 'HMLVTS/GenerateWODetail2', {
                "WOID": woid,
                "ProcOpSeq": procopseq
            })
                .then(function (response) {
                    console.log("GenerateWODetail2", response.data.result);
                    if (response.data.result[0]["remark"] != "" || response.data.result[0]["remark"] != null) {
                        var span4 = document.createTextNode(response.data.result[0]["remark"]);
                        div4.appendChild(span4);
                    }
                  
                });


        }




        //'*******************************************************************
        //'Title     :  findOrderByWOID
        //'Function  :  $scope.global contain all the work order info(orderType,procOpSeq,woid),
        //'Input     :  woid to be found
        //'Output    :  procOpSeq of the input woid in th $scope.global
        //'Remark    :
        //'*******************************************************************
        function findOrderByWOID(woid) {
            for (var i = 0; i < $scope.global.length;i++){
                if ($scope.global[i]["woid"] == woid) {
                    return $scope.global[i]["procOpSeq"];
                }
            }
            return "NULL";
        }








    }
})();