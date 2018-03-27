(function () {
    'use strict';

    angular.module('erp.priority').controller('PriorityCtrl', PriorityCtrl);

    PriorityCtrl.$inject = ['$q','$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function PriorityCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var rowNumber = 0;
        var dataLength = 0;
        var rowBoxNo = 12;
        var rowSelected = "";

        var undoList = [];

        var str_inhouse = "inhouse";
        var str_subcon = "subcon";
        var norStr_inhouse = "Inhouse";
        var norStr_subcon = "Subcon";
        var str_qc = "qc";

        $scope.global = [];
        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'priority-6' });

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
        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();


        initGlobal();
        console.log("global",$scope.global);
        createSelect("", "mctype");

        function initGlobal() {
            $scope.global["inhouse"] = [];
            $scope.global["subcon"] = [];
            $scope.global["qc"] = [];
        }

        function cleanSelect(itemName) {
            $('#select_'+itemName).empty();
        }

        function createSelect(rawData, itemName) {
            console.log("itemName",itemName);
            console.log("rawdata",rawData);
            var myDiv = document.getElementById("select_" + itemName);

            if (itemName == "mctype") {
                var option1 = document.createElement("option");
                option1.value = "Inhouse";//Subcon QC
                option1.text = "Inhouse";
                myDiv.appendChild(option1);

                var option2 = document.createElement("option");
                option2.value = "Subcon";//Subcon QC
                option2.text = "Subcon";
                myDiv.appendChild(option2);

                var option3 = document.createElement("option");
                option3.value = "QC";//Subcon QC
                option3.text = "QC";
                myDiv.appendChild(option3);
            }

            if (itemName == "wc") {
                cleanSelect(itemName);
                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = rawData[i]["centreID"];//Subcon QC
                    option.text = rawData[i]["centreID"];
                    myDiv.appendChild(option);
                }

            }

            if (itemName == "mcid") {
                for (var i = 0; i < rawData.length; i++) {
                    var option = document.createElement("option");
                    option.value = rawData[i]["mc_code"];//Subcon QC
                    option.text = rawData[i]["mc_code"];
                    myDiv.appendChild(option);
                }

            }

        }

        //function GenerateToolDescription() {
        //    var mctype = $('#select_mctype option:selected').text().toLowerCase();
        //    var wc = $('#select_wc option:selected').text().toLowerCase();

        //    $http.post(config.baseUrlApi + 'HMLVTS/GenerateToolDescription',
        //           {
        //               "McType": mctype,
        //               "WorkCenter": wc
        //           }
        //       )
        //       .then(function (response) {
        //           console.log("resulthahaha3", response.data.result);
        //           $scope.description = response.data.result[0]["toolDescription"];

        //       });
        //}

        function generateFirstMcID(select_mctype, data,isQC) {



           console.log("mcid data", select_mctype + " " + data[0]["centreID"]);



           if(isQC == false){
               $("#mcid-tag").css("display", "block");
               $("#mcid-selector").css("display", "block");
               $http.post(config.baseUrlApi + 'HMLVTS/generateMcIDInPriority',
                     {
                         "McType": select_mctype,
                         "WorkCenter": data[0]["centreID"].toLowerCase()
                     }
                 )
                 .then(function (response) {
                     console.log("resulthahaha1", response.data.result);


                     createSelect(response.data.result, "mcid");

                 });
           } else {
               $("#mcid-tag").css("display", "none");
               $("#mcid-selector").css("display", "none");
           }





        }

        $scope.changeWorkCenter = function () {
            var select_mctype = $('#select_mctype option:selected').text().toLowerCase();
            var select_wc = $('#select_wc option:selected').text().toLowerCase();

            console.log("selector_wc", select_mctype + " " + select_wc);
           $http.post(config.baseUrlApi + 'HMLVTS/generateMcIDInPriority',
                {
                    "McType": select_mctype,
                    "WorkCenter": select_wc
                }
            )
            .then(function (response) {
                console.log("resulthahaha1", response.data.result);
              // $scope.global[select_mctype][data[i]] = response.data.result;
                //generateMcID();
                console.log("wc", response.data.result);
                cleanSelect("mcid");
                createSelect(response.data.result,"mcid" );

            });


          // GenerateToolDescription();
        }


        //'*******************************************************************
        //'Title     :  makeTable1
        //'Function  :  to make the first table
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function makeTable1(data,wc) {

            for(var i = 0;i <data.length;i++){
                data[i]["workCentre"] = wc;
            }

            $("#priority-table1").kendoGrid({

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
                sortable: true,
                pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: [              
                 {
                     field: "woid", title: "Work Order", width: 150

                 },
                 {
                     field: "partID", title: "Part ID", width: 150

                 },
                 {
                     field: "releaseProdQty", title: "Actual Prod Qty", width: 150

                 },
                 {
                     field: "requestedDeliveryDate", title: "Req'ed Del'y Date", width: 150

                 },
                 {
                     field: "workCentre", title: "Work Center", width: 150

                 },
                 {
                     field: "routeID", title: "Route ID", width: 150

                 },
                 {
                     field: "routeName", title: "Route Name", width: 150

                 },
                 {
                     field: "seqNo", title: "OpSeq", width: 150

                 },
                 {
                     field: "procSeqNo", title: "Proc OpSeq", width: 150

                 }

                ]
            })
        }

        //'*******************************************************************
        //'Title     :  buttonRefresh_ClickPriority2
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function buttonRefresh_ClickPriority2(macID, centreID, macType) {
                    $http.post(config.baseUrlApi + 'HMLVTS/buttonRefresh_ClickPriority2',
                    {
                        "MacCode": macID,
                        "CentreID": centreID,
                        "MacType": macType
                    }
                    )
                    .then(function (response) {
                        console.log("refresh2", response.data.result);
                        makeTable1(response.data.result, centreID);
                        
                    });
        }



        //'*******************************************************************
        //'Title     :  buttonRefresh_ClickPriority4
        //'Function  :  
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        function buttonRefresh_ClickPriority4(macID, centreID, macType, description) {
                   $http.post(config.baseUrlApi + 'HMLVTS/buttonRefresh_ClickPriority4',
                   {
                       "MacCode": macID,
                       "CentreID": centreID,
                       "MacType": macType,
                       "ToolDescription":description
                   }
                   )
                   .then(function (response) {
                       console.log("refresh4", response.data.result);
                       //todo:buttonRefresh_ClickPriority4
                       makeTable1(response.data.result, centreID);
                      // makeTable3()
                       
                   });
        }



        //'*******************************************************************
        //'Title     :  getDiv
        //'Function  :  get the div when click on the table
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.getDiv = function (e) {
            //var item = this.dataSource.get(1); //Get by ID or any other preferred method
            //this.tbody.find("tr[data-uid='" + item.uid + "']").hide();

            console.log("this", this);

            var grid = $('#priority-table1').data('kendoGrid');
            var items = grid.dataSource.view();
            var item1 = grid.select();

            console.log("this grid", grid);
            console.log("this items", items);
            console.log("this item1",item1);
            console.log("this uid", $(item1).attr("data-uid"));
           // $(item1).hide();
            rowSelected = $(item1).attr("data-uid");

            //for (var i = 0; i < items.length; i++) {
            //var $row = $('#grid').find("[data-uid='"+items[i].uid+"']"); 

            //}



            


            //console.log("this", this);
            //console.log("this", $(this).find("tr"));
            //console.log($($(this).find("tr")).attr("class"));
            //var grid = $("#priority-table1").data("kendoGrid");
            //console.log("this grid", grid);
        }

        //'*******************************************************************
        //'Title     :  undo
        //'Function  :  undo the assignment
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.undo = function () {
            if (undoList.length > 0) {
                var undoRow = undoList.pop();
                $("[data-uid=" + undoRow + "]").show();
                $("#" + undoRow).hide();
            }

        }


        //'*******************************************************************
        //'Title     :  moveUp
        //'Function  :  shift the selected item/row up 
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.moveUp = function () {
            //$(this).index()
            var currenDiv = $("[data-uid=" + rowSelected + "]").clone();
            var index = $("[data-uid=" + rowSelected + "]").index();
            var siblingNo = $("[data-uid=" + rowSelected + "]").siblings().length;
            console.log("move", index);
            console.log("move sibling", siblingNo);
            if (index != 0) {//if first child, dont move up
                var swoppingIndex = index - 1;
                var parent = $("[data-uid=" + rowSelected + "]");
                $($("[data-uid=" + rowSelected + "]").siblings()[swoppingIndex]).before(currenDiv);

                $($("[data-uid=" + rowSelected + "]").siblings()[index + 1]).remove();

               // $("[data-uid=" + rowSelected + "]").remove();

                //parent.insertBefore(currenDiv, $("[data-uid=" + rowSelected + "]").siblings()[swoppingIndex]);
                //parent.insertBefore(new,pivot);

               // $("#" + firstContainer + ">li:nth-child(" + colIndex + ")").before(test);
            } 
        }


        //'*******************************************************************
        //'Title     :  moveDown
        //'Function  :  shift the selected item/row down
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.moveDown = function () {
            //$(this).index()
            var currenDiv = $("[data-uid=" + rowSelected + "]").clone();
            var index = $("[data-uid=" + rowSelected + "]").index();
            var siblingNo = $("[data-uid=" + rowSelected + "]").siblings().length;
            console.log("move", index);
            console.log("move sibling", siblingNo);
            if (index != siblingNo) {//if first child, dont move up
                var swoppingIndex = index + 1;
                var parent = $("[data-uid=" + rowSelected + "]");

                $($("[data-uid=" + rowSelected + "]").siblings()[swoppingIndex]).before(currenDiv);

                $($("[data-uid=" + rowSelected + "]").siblings()[index]).remove();


            }

        }



        //'*******************************************************************
        //'Title     :  reAssign
        //'Function  :  reAssign to another WC
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************
        $scope.reAssign = function () {

            // alert("reAssign");

            if(rowSelected != ""){
                 console.log("assign data uid", rowSelected);
                 $("[data-uid=" + rowSelected + "]").hide();

                 var cloned = $("[data-uid=" + rowSelected + "]").clone();
                 cloned.attr("data-uid", "");
                 cloned.show();
                 cloned.attr("id", rowSelected);
                 $("#priority-table2-body").append(cloned);
                 undoList.push(rowSelected);
            }

            //alert("reAssign",rowSelected);
            // $(rowSelected).hide();

            //var grid = $("#priority-table1").data("kendoGrid");
            //var selectedItem = grid.dataItem(grid.select());
            //console.log("selected row", selectedItem);

            ////to hide:http://www.telerik.com/forums/how-to-hide-a-specific-row-in-kendo-ui-grid

        }

        //'*******************************************************************
        //'Title     :  refresh
        //'Function  :  Refresh button on click
        //'Input     :  
        //'Output    :  
        //'Remark    :
        //'*******************************************************************


        $scope.refresh = function () {

            document.getElementById("priority-table2-body").innerHTML = "";
            undoList = [];
            
            var macID = $('#select_mcid option:selected').text();
            var centreID  = $('#select_wc option:selected').text();
            var macType = $('#select_mctype option:selected').text();

            console.log("refresh", macID + " " + centreID + " " + macType);

            //GenerateToolDescription();
            // console.log("description", $scope.description);

            var mctype = $('#select_mctype option:selected').text().toLowerCase();

            if (macType == norStr_inhouse || macType == norStr_subcon) {

            $http.post(config.baseUrlApi + 'HMLVTS/GenerateToolDescription',
                   {
                       "McType": mctype,
                       "WorkCenter": centreID
                   }
               )
               .then(function (response) {
                   console.log("resulthahaha3", response.data.result);
                   //$scope.description = response.data.result[0]["toolDescription"];

                   

                   var description = response.data.result[0]["toolDescription"];
                   if (description.trim() == "") {



                       //execute command1 line 288
                       $http.post(config.baseUrlApi + 'HMLVTS/buttonRefresh_ClickPriority1',
                        {
                            "MacCode": macID,
                            "CentreID": centreID,
                            "MacType": macType
                        }
                        )
                        .then(function (response) {
                            console.log("refresh1", response.data.result);
                            buttonRefresh_ClickPriority2(macID, centreID, macType);
                        });
                   } else {
                       console.log("refresh3.0",macID + " " + centreID + " " + macType + " " + description);
                       $http.post(config.baseUrlApi + 'HMLVTS/buttonRefresh_ClickPriority3',
                   {
                       "MacCode": macID,
                       "CentreID": centreID,
                       "MacType": macType,
                       "ToolDescription":description
                   }
                   )
                   .then(function (response) {
                       console.log("refresh3", response.data.result);                      
                       buttonRefresh_ClickPriority4(macID, centreID, macType, description);
                   });


                   }
               

               });
        }


            
            //$http.post(config.baseUrlApi + 'HMLVTS/buttonRefresh_ClickPriority1',
            //{
            //    "MacCode": macID,
            //    "CentreID": centreID,
            //    "MacType": macType
            //}
            //)
            //.then(function (response) {
            //       console.log("resulthahaha2", response.data.result);

            //});


            
        }

        $scope.changeMcType = function () {
            var select_mctype = $('#select_mctype option:selected').text().toLowerCase();
            // alert(select_mctype);
            var isQC = false;
            if(select_mctype == str_qc){
                    //change to lower case
                    isQC = true;
             }

            $http.post(config.baseUrlApi + 'HMLVTS/generateWorkCenterInPriority',
                {
                    "McType": select_mctype
                }
            )
            .then(function (response) {
                console.log("resulthahaha", response.data.result);

                $scope.global[select_mctype] = response.data.result;

                createSelect(response.data.result, "wc");

                generateFirstMcID(select_mctype, response.data.result,isQC);
                

            });

            console.log("global now", $scope.global);
        }


    }
    })();