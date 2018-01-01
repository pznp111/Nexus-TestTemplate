var global = [];
(function () {
    'use strict';

    angular.module('erp.report').controller('ReportCtrl', ReportCtrl);

    ReportCtrl.$inject = ['$q','$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        var rowNumber = 0;
        var dataLength = 0;
        var rowBoxNo = 12;

        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'report-4' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        $scope.confirm = function confirm() {
           // alert("reach save");
            $http.get(config.baseUrlApi + 'HMLVTS/GenerateMcID')
             .then(function (response) {

                 saveResult(response.data["result"])
             });
        }

        $scope.reloadRoute = function () {
            location.reload();
        }

        //console.log("test sp", specialChar("content_DELIVERY._1"));
        //resizable might cause draggable to be buggy
        //$(".gc-container").resizable({
        //    minWidth:1400
        //});


        $("#index-row-1").resizable({
            handles: "e",
            stop: function (event, ui) {
                var width = ui.size.width;
                console.log(width);
                var totalWidth = $("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width() + $("#index-row-4").width();
                if (totalWidth > 405) {
                    width = 405 - ($("#index-row-4").width() + $("#index-row-2").width() + $("#index-row-3").width());
                }
                resize(0, width, "GanttChart");
                //$("#wc_1_1").css("width",500);
            }
        });


        $("#index-row-2").resizable({
            handles: "e",
            stop: function (event, ui) {
                var width = ui.size.width;
                var totalWidth = $("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width() + $("#index-row-4").width();
                if (totalWidth > 405) {
                    width = 405 - ($("#index-row-1").width() + $("#index-row-3").width() + $("#index-row-4").width());
                }
                console.log(width);
                resize(1, width, "GanttChart");
                //$("#wc_1_1").css("width",500);
            }
        });

        $("#index-row-3").resizable({
            handles: "e",
            stop: function (event, ui) {
                var width = ui.size.width;
                var totalWidth = $("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width() + $("#index-row-4").width();
                if (totalWidth > 405) {
                    width = 405 - ($("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-4").width());
                }
                console.log(width);
                resize(2, width, "GanttChart");
                //$("#wc_1_1").css("width",500);
            }
        });

        $("#index-row-4").resizable({
            handles: "e",
            stop: function (event, ui) {
                var width = ui.size.width;
                //original width = 400
                var totalWidth = $("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width() + $("#index-row-4").width();
                if(totalWidth > 405){
                    width = 405 - ($("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width());
                }
                console.log("width"+width+" "+totalWidth);
                resize(3, width, "GanttChart");
                //$("#wc_1_1").css("width",500);
            }
        });



        

        function resize(index, width,container) {
           // console.log("resize", $("#GanttChart").children());
            $("#GanttChart").children();
          //  for (var i = 0; i < $("#GanttChart").children().length; i++) {
              //  console.log("resize1", $("#GanttChart").children()[i]);
            for (var j = 0; j < $("#" + container).children().children().children().length; j++) {
                    if (j % 4 == index) {
                        console.log("resize2", $($("#GanttChart").children().children().children()[j]).attr("id"));
                        $("#" + $($("#GanttChart").children().children().children()[j]).attr("id")).css("width",width);
                    }
                    console.log("resize3",j+" "+ $("#GanttChart").children().children().children()[j]);

            }
            var totalWidth = $("#index-row-1").width() + $("#index-row-2").width() + $("#index-row-3").width() + $("#index-row-4").width();
            var marginleft = (404 - totalWidth) * (-1);
            $("#gcTable").css("margin-left", marginleft)
         //   }
        }

        $scope.checkArray = [];
        $scope.tenant = tenant;
        var data1;
        $http.get(config.baseUrlApi + 'HMLVTS/GenerateMcID')
    .then(function (response) {
        data1 = response.data;
        console.log("test21",response);
       // console.log("test21", data1["result"]);
        loadJsonToTable(data1["result"]);
        rowNumber = data1["result"].length;
        $scope.mcidData = data1["result"];
        for (var i = 0; i < $scope.mcidData.length; i++) {
            for (var j = 0; j < rowBoxNo; j++) {
                $scope.mcidData[i][getIndexString(j)] = "";
            }
        }

        

       // var temp = [];
       var temp = makeSortableTable(data1["result"]);
      // console.log("kendo1", $scope.mcidData);
        
       // console.log("test here2",temp);
    });


            $http.get(config.baseUrlApi + 'HMLVTS/GenerateThreshold').then(function (response) {
        var studentData = response.data.result;
        //console.log("student1", response.data.result[0].threshold);
        $scope.threshold = response.data.result[0].threshold;
        });


            function findPosition(mcid, workcenter) {

               // console.log("test here1 content",mcid+" "+workcenter)
                for (var i = 0; i < $scope.mcidData.length;i++){
                    if($scope.mcidData[i].mcID == mcid && $scope.mcidData[i].workCenter == workcenter){
                        return i
                    }
                }

                return -1;
            }

        function makeSortableTable(data1) {

            var promiseArray = [];
            var returnData;


            console.log("tempdata", data1);
            
            for (var k = 0; k < data1.length; k++) {
                //console.log("promise", k);
                var workcentre = data1[k]["workCenter"];
                var mcid = data1[k]["mcID"];
               // console.log(workcentre + " and  |" + mcid + "|");
                var promiseArray = [];
                promiseArray.push(
               $http.post(config.baseUrlApi + 'HMLVTS/GenerateMCWOList',
                {
                    "McID": mcid,
                    "WorkCenter": workcentre
                }
                )
                    );
                var counter = 0;
                var isExecuted = false;
               // console.log("promise", promiseArray);
                $q.all(promiseArray).then(function (response) {
                    // console.log("hhi", response[0].data.result);
                    console.log("hhi",response);
                    /////////////////////////////////////////

                    var eachData = response[0].data.result;
                    console.log("7_12 eachData", eachData)


                    var ol1;
                    if (eachData.length != 0) {
                        var ol1 = document.getElementById(("sortable-row_" + specialChar(eachData[0].mcType.trim().replace(/\s/g, '')) + "_" + specialChar(eachData[0].workCenter.trim().replace(/\s/g, '')) + "_" + specialChar(eachData[0].mcID.trim().replace(/\s/g, ''))));
                    }

                    for (var h = 0; h < eachData.length; h++) {
                        var tempId = (("content_" + specialChar(eachData[h].mcType.trim().replace(/\s/g, '')) + "_"+ specialChar(eachData[h].workCenter.trim().replace(/\s/g, '')) + "_" + specialChar(eachData[h].mcID.trim().replace(/\s/g, '')) + "_" + (h + 1))).replace("__", "_");
                        var appendingDiv = document.getElementById(tempId);
                       // console.log(appendingDiv);
                        var contentDiv = document.createElement("div");
                        contentDiv.setAttribute("class", "text-content");
                        contentDiv.setAttribute("id", ("span_" + specialChar(eachData[h].mcType.trim().replace(/\s/g, ''))+ "_" + specialChar(eachData[h].workCenter.trim().replace(/\s/g, '')) + "_" + specialChar(eachData[h].mcID.trim().replace(/\s/g, '')) + "_" + (h + 1)).replace("__", "_"));
                        var contentStr = eachData[h].woid + " " + "[" + eachData[h].procOpSeq + "/" + eachData[h].maxProcOpSeq + "," + eachData[h].outstandingQty + "]" +
                            "[" + eachData[h].partID + "] " + eachData[h].poNumber;
                        var content = document.createTextNode(contentStr);

                        appendingDiv.setAttribute("data-toggle", "tooltip");
                        appendingDiv.setAttribute("title", contentStr);

                        contentDiv.append(content);
                        $scope.mcidData[findPosition(eachData[h].mcID.trim(), eachData[0].workCenter.trim())][getIndexString(h)] = contentStr;

                        var tooltip = document.createElement("button");
                        tooltip.setAttribute("type", "button");
                        tooltip.setAttribute("class", "btn btn-secondary light-blue-background");
                        tooltip.setAttribute("data-toggle", "tooltip");
                        tooltip.setAttribute("data-placement", "top");
                        tooltip.setAttribute("title", JSON.stringify(eachData[h]));
                        tooltip.setAttribute("style", "left:5%;");
                        tooltip.setAttribute("id", ("tooltip_" + specialChar(eachData[h].mcType.trim().replace(/\s/g, '')) + "_"+ specialChar(eachData[h].workCenter.trim().replace(/\s/g, '')) + "_" + specialChar(eachData[h].mcID.trim().replace(/\s/g, '')) + "_" + (h + 1)).replace("__", "_"));

                        if (parseInt(eachData[h].procOpSeq) == 1) {
                            tooltip.setAttribute("class", "btn btn-secondary mediun-blue-background");
                        }

                        if (eachData[h].previousWOStatus != null) {

                            if ((eachData[h].previousWOStatus.toUpperCase() != "Completed".toUpperCase())) {
                                var dateString = eachData[h].EndDate;
                                if (dateString != null && dateString != "") {
                                    var dateParts = dateString.split("/");
                                    var expectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                                    var compareDate = new Date();
                                    compareDate.setDate(compareDate.getDate() + parseInt($scope.threshold));
                                    if (expectedDate < compareDate) {
                                        $("#" + tempId).addClass("red-background");
                                        document.getElementById(tempId).setAttribute("color", "#ff3300");
                                    }

                                } else {
                                    $("#" + tempId).addClass("red-background");
                                    document.getElementById(tempId).setAttribute("color", "#ff3300");
                                }
                            } else {
                                var dateString = eachData[h].reqDeliveryDate;
                                if (dateString != null && dateString != "") {
                                    var dateParts = dateString.split("/");
                                    var expectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                                    var compareDate = new Date();
                                    compareDate.setDate(compareDate.getDate() + parseInt($scope.threshold));
                                    if (expectedDate < compareDate) {
                                        $("#" + tempId).addClass("gold-background");
                                        document.getElementById(tempId).setAttribute("color", "#ff9966");
                                    }
                                } else {
                                    $("#" + tempId).addClass("gold-background");
                                    document.getElementById(tempId).setAttribute("color", "#ff9966");
                                }
                            }
                        } else {
                            $("#" + tempId).addClass("red-background");
                            document.getElementById(tempId).setAttribute("color", "#ff3300");
                        }


                        appendingDiv.append(tooltip);
                        appendingDiv.append(contentDiv);
                       // console.log("last row1", (k + " " + h));



                    }
                    counter++;
                    ///////////////////////////////////////////
                   // console.log("k is", k);
                    if (counter == (data1.length)) {
                        kendoTable($scope.mcidData);
                    }
                });


            }
           // console.log("json result", $scope.mcidData);
            returnData = $scope.mcidData;
            
            return returnData;
            
        }


        function customiseJson(data) {
            for (var i = 0; i < data.length;i++){
                data[i]["one"] = data[i][0];
                data[i]["two"] = data[i][1];
                data[i]["three"] = data[i][2];
                data[i]["four"] = data[i][3];
                data[i]["five"] = data[i][4];
                data[i]["six"] = data[i][5];
                data[i]["seven"] = data[i][6];
                data[i]["eight"] = data[i][7];
                data[i]["nine"] = data[i][8];
                data[i]["ten"] = data[i][9];
                data[i]["eleven"] = data[i][10];
                data[i]["twelve"] = data[i][11];
            }
            return data;
        }
       
        function kendoTable(data) {
           // console.log("kendo data correct", data.slice(0));
            var temp = data.slice(0);
            $("#table").kendoGrid(
                {
                    toolbar: ["excel"],
                    excel: {
                        fileName: "Kendo UI Grid Export.xlsx",
                        filterable: true,
                    },
                    dataSource: {
                        data
                    },
                    excelExport: function (e) {
                        
                        var sheet = e.workbook.sheets[0];
                       // console.log("sheet",sheet)
                        for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                            var row = sheet.rows[rowIndex];
                            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                                if(cellIndex < 3){
                               // console.log("mctype_" + rowIndex + "_" + (parseInt(cellIndex) + 1));
                                var color = document.getElementById("mctype_" + rowIndex + "_3").getAttribute("color");
                                sheet.rows[rowIndex].cells[cellIndex].background = color;
                                } else {
                                    var wc = specialChar(data[rowIndex - 1].workCenter);
                                    var mcid = specialChar(data[rowIndex - 1].mcID);
                                    var mctype = specialChar(data[rowIndex - 1].mcType);
                                    var tempId = (("content_" + mctype.trim().replace(/\s/g, '') + "_" + wc.trim().replace(/\s/g, '') + "_" + mcid.trim().replace(/\s/g, '') + "_" + (cellIndex - 3))).replace("__", "_");
                                    console.log("test111",tempId);
                                    if ($("#" + tempId).attr("color") != "" && $("#" + tempId).attr("color") != null) {
                                        sheet.rows[rowIndex].cells[cellIndex-1].background = $("#" + tempId).attr("color");
                                    }
                                    
                                }
                                
                            }


                        }
                    },
                    
                    columns: [
                        {
                            field: "mcType", title: "mcType", width: 150
                        },
                        {
                            field: "workCenter", title: "workCenter", width: 150

                        },
                        {
                            field:"mcID", title:"mcID",width:150
                        },
                         {
                             field: "ONE", title: "1", width: 150
                         },
                         {
                             field: "TWO", title: "2", width: 150
                         },
                         {
                             field: "THREE", title: "3", width: 150
                         },
                         {
                             field: "FOUR", title: "4", width: 150
                         },
                         {
                             field: "FIVE", title: "5", width: 150
                         },
                         {
                             field: "SIX", title: "6", width: 150
                         },
                         {
                             field: "SEVEN", title: "7", width: 150
                         },
                        {
                            field: "EIGHT", title: "8", width: 150
                        },
                        {
                            field: "NINE", title: "9", width: 150
                        },
                        {
                            field: "TEN", title: "10", width: 150
                        },
                         {
                             field: "ELEVEN", title: "11", width: 150
                         }, {
                             field: "TWELVE", title: "12", width: 150
                         }
   
   
        
                    ]
                })

            $("#" + "kendo_body_container").addClass("none-display");
            $("." + "k-grid-header").addClass("none-display");
            $(".k-grid-excel").addClass("btn btn-default");
            $("#kendoHead").addClass("invisible");
            
        }
    
        function loadJsonToTable(data) {
            for (var i = 0; i < data.length;i++){
                var li = document.createElement("li");
                li.setAttribute("class", "row none-style no-left-padding");

                var ol = document.createElement("ol");
                ol.setAttribute("class", "row none-style no-left-padding");

                

                var li0 = document.createElement("li");
                li0.setAttribute("class", "col-sm-1 border index-column");
                li0.setAttribute("id", "index_"+(i + 1) + "_1");                
                //li0.innerHTML = (i + 1);
                var li0div = document.createElement("div");
                li0div.setAttribute("style", "padding:5% 5%")
                var li0span = document.createTextNode((i + 1));
                li0div.appendChild(li0span);
                li0.appendChild(li0div);




                var li1 = document.createElement("li");
                li1.setAttribute("class", "col-sm-1 border ");
                li1.setAttribute("id", "wc_" + (i + 1) + "_1");
                li1.setAttribute("value", data[i]["workCenter"]);
                //li1.innerHTML = data[i]["workCenter"];
                li1.setAttribute("data-toggle", "tooltip");
                li1.setAttribute("title", data[i]["workCenter"]);
                var li1div = document.createElement("div");
                li1div.setAttribute("style","padding:5% 5%")
                var li1span = document.createTextNode(data[i]["workCenter"]);
                li1div.appendChild(li1span);
                li1.appendChild(li1div);


                var li2 = document.createElement("li");
                li2.setAttribute("class", "col-sm-1 border ");
                li2.setAttribute("id", "mcid_" + (i + 1) + "_2");
                li2.setAttribute("value", data[i]["mcID"]);
                //li2.innerHTML = data[i]["mcID"];
                li2.setAttribute("data-toggle", "tooltip");
                li2.setAttribute("title", data[i]["mcID"]);
                var li2div = document.createElement("div");
                li2div.setAttribute("style", "padding:5% 5%")
                var li2span = document.createTextNode(data[i]["mcID"]);
                li2div.appendChild(li2span);
                li2.appendChild(li2div);

                var li3 = document.createElement("li");
                li3.setAttribute("class", "col-sm-1 border ");
                li3.setAttribute("id", "mctype_" + (i + 1) + "_3");
                li3.setAttribute("value", data[i]["mcType"]);
               // li3.innerHTML = data[i]["mcType"];
                li3.setAttribute("data-toggle", "tooltip");
                li3.setAttribute("title", data[i]["mcType"]);
                var li3div = document.createElement("div");
                li3div.setAttribute("style", "padding:5% 5%")
                var li3span = document.createTextNode(data[i]["mcType"]);
                li3div.appendChild(li3span);
                li3.appendChild(li3div);

                if (data[i]["mcType"] =="QC" ) {
                    li1.setAttribute("class", "col-sm-1 border green-background ");
                    li2.setAttribute("class", "col-sm-1 border green-background ");
                    li3.setAttribute("class", "col-sm-1 border green-background ");
                    li1.setAttribute("color", "#48f442");
                    li2.setAttribute("color", "#48f442");
                    li3.setAttribute("color", "#48f442");
                    $scope.checkArray.push(("sortable-row_" + specialChar(data[i].mcType.trim().replace(/\s/g, '')) + "_" +  specialChar(data[i]["workCenter"].trim().replace(/\s/g, '')) + "_" + specialChar(data[i]["mcID"].trim().replace(/\s/g, ''))));
                }

                if (data[i]["mcType"] == "INHOUSE") {
                    li1.setAttribute("class", "col-sm-1 border blue-background ");
                    li2.setAttribute("class", "col-sm-1 border blue-background ");
                    li3.setAttribute("class", "col-sm-1 border blue-background ");
                    li1.setAttribute("color", "#ccf2ff");
                    li2.setAttribute("color", "#ccf2ff");
                    li3.setAttribute("color", "#ccf2ff");
                }

                if (data[i]["mcType"] == "SUBCON") {
                    li1.setAttribute("class", "col-sm-1 border pink-background ");
                    li2.setAttribute("class", "col-sm-1 border pink-background ");
                    li3.setAttribute("class", "col-sm-1 border pink-background ");
                    li1.setAttribute("color", "#FFCCFF");
                    li2.setAttribute("color", "#FFCCFF");
                    li3.setAttribute("color", "#FFCCFF");
                }



                ol.appendChild(li0);
                ol.appendChild(li3);
                ol.appendChild(li1);
                ol.appendChild(li2);
                li.appendChild(ol);
                var table = document.getElementById("GanttChart");
                table.appendChild(li);
            }

            for (var ii = 0; ii < data.length; ii++) {
                var li = document.createElement("li");
                li.setAttribute("class", "row none-style no-left-padding");

                var ol1 = document.createElement("ol");
                ol1.setAttribute("class", "row none-style ol-row no-left-padding");
                ol1.setAttribute("id", ("sortable-row_" + specialChar(data[ii].mcType.trim().replace(/\s/g, '')) + "_"+  specialChar(data[ii]["workCenter"].trim().replace(/\s/g, '')) + "_" + specialChar(data[ii]["mcID"].trim().replace(/\s/g, ''))));
                ol1.setAttribute("wc",data[ii]["workCenter"]);
                ol1.setAttribute("mctype", data[ii]["mcType"]);
                ol1.setAttribute("mcid", data[ii]["mcID"]);
               
                for (var j = 0; j < rowBoxNo; j++) {
                    var li1 = document.createElement("li");
                    li1.setAttribute("class", "col-sm-1 border limitedSortable");
                    li1.setAttribute("id", (("content_" + specialChar(data[ii]["mcType"].trim().replace(/\s/g, '')) + "_" + specialChar(data[ii]["workCenter"].trim().replace(/\s/g, '')) + "_" + specialChar(data[ii]["mcID"].trim().replace(/\s/g, '')) + "_" + (j + 1)).replace("__", "_")));
                    li1.setAttribute("value", (ii + 1));




                    ol1.appendChild(li1);
                }
                li.appendChild(ol1);
                var table = document.getElementById("GanttChartTable");
                table.appendChild(li);
            }


            
        }

        function processString(data) {
            var returnObj = [];
            data = data.trim();
           // console.log("final result1",data);
            data = data.replace(/(\r\n|\n|\r)/gm, "");
            var lines = data.split(',');
            for (var i = 0; i < lines.length; i++) {
              //  console.log("index:", i);
                var jsonObj = [];
                var eachLine = lines[i].split("\n")
                eachLine = eachLine.join("\n").replace(/\\n/g, ",");
                var eachEle = eachLine.split(",");
                var counter = 0;
                var Name = "";
                var obj = [];
                for (var j = 0; j < eachEle.length; j++) {
                    
                    var ele = eachEle[j].trim();
                   // console.log(ele);
                    if (ele != "") {
                        if (ele != "\"") {
                            counter ++;
                            if(counter == 1){
                                Name = ele;
                            } else {
                                obj.push(ele);
                            }
                        }
                    }
                }
                jsonObj["name"] = Name;
                jsonObj["data"] = obj;
                returnObj.push(jsonObj);
                Name = "";
                obj = [];

            }

           // console.log("final result", returnObj);
            return returnObj;
        }

        var oldContainer;
        var firstContainer;
        var isAssigned = false;
        var group = $("ol.nested_with_switch").sortable({
            group: 'serialization',
            afterMove: function (placeholder, container) {
                if (isAssigned == false) {
                    firstContainer = $(container.target[0]).attr('id');
                    isAssigned = true;
                } 
                //console.log("aftermove", $(container.target[0]).attr('id'));
                if (oldContainer != container) {
                    if (oldContainer)
                        oldContainer.el.removeClass("active");
                    container.el.addClass("active");

                    oldContainer = container;
                }
                
            },
            onDrop: function ($item, container, _super) {
                isAssigned = false;
                var prevWC = $("#" + firstContainer).attr("wc");
                var nextWC = $("#" + $(container.target[0]).attr('id')).attr("wc")

                //to handle possible bug that caused by conflict btw sortable and bootstrap
                if (prevWC == undefined ) {
                     alert(prevWC + " "+ nextWC);
                    // isMovedToRestricted = true;
                    $('#errModel').modal('show');

                }

                console.log("aftermove1 prevwc nextwc", prevWC + " " + nextWC );
                console.log("aftermove1", container);

                var isMovedToRestricted = false;               
                if ($('#GanttChartTable #' + $(container.target[0]).attr('id')).length ==0) {//if move out from the table field
                    isMovedToRestricted = true;
                }

                if ($(container.target[0]).attr('id') == "top_row_2") {
                    isMovedToRestricted = true;
                }

                if (document.getElementById($($item[0]).attr('id')) != null && document.getElementById($($item[0]).attr('id')).innerHTML == "") {//if empty box 
                    isMovedToRestricted = true;
                }

                if (prevWC != nextWC) {         
                        $('#myModal').modal('show');                   
                        isMovedToRestricted = true;
                }
                if ($.inArray(firstContainer, $scope.checkArray) == -1 && $.inArray($(container.target[0]).attr('id'), $scope.checkArray) != -1) {//if move from normal area to restrict area
                    isMovedToRestricted = true;
                }



                //   if ($.inArray(firstContainer, $scope.checkArray) != -1 || isMovedToRestricted == true) {
                console.log("aftermove isMovedToRestricted", isMovedToRestricted);
                if (isMovedToRestricted == true ) {
                    //if (firstContainer != $(container.target[0]).attr('id') ) {
                    //console.log("aftermove cancelled", this);
                    //console.log("aftermove cancelled1", $($item[0]).attr('id'));
                    // console.log("aftermove cancelled2", $item[0]);
                    // console.log("aftermove cancelled3", $($item[0]).attr('id').lastIndexOf("_"));
                    //console.log("aftermove cancelled4", $($item[0]).attr('id').substring(($($item[0]).attr('id').lastIndexOf("_") + 1), $($item[0]).attr('id').length));

                   

                    var colIndex = $($item[0]).attr('id').substring(($($item[0]).attr('id').lastIndexOf("_") + 1), $($item[0]).attr('id').length);//to change
                    var tempDiv = $item[0];
                    console.log(("aftermove colIndex", colIndex));
                    console.log("tempDiv",tempDiv);

                    var test = document.createElement("li");
                    console.log("aftermove class", $("#" + $($item[0]).attr('id')).attr("class").replace("dragged", ""));
                    test.setAttribute("class", $("#" + $($item[0]).attr('id')).attr("class").replace("dragged",""));
                    test.setAttribute("id", $($item[0]).attr('id'));                    
                    test.setAttribute("value", $($item[0]).attr('value'));
                    test.setAttribute("data-toggle", "tooltip");
                    
                   // test.setAttribute("style", "height:80px;width:120px;");

                    console.log("aftermove tooltip", document.getElementById("tooltip_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length)));
                    var tooltipClass = $("#" + "tooltip_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length)).attr("class"); //to change

                    var tooltipId = "tooltip_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length);
                    if (document.getElementById(tooltipId) != null) {
                        var tooltip = document.createElement("button");
                        tooltip.setAttribute("type", "button");
                        tooltip.setAttribute("class", tooltipClass);
                        tooltip.setAttribute("data-toggle", "tooltip");
                        tooltip.setAttribute("data-placement", "top");
                        
                        tooltip.setAttribute("title", $("#" + tooltipId).attr("title"));
                        tooltip.setAttribute("style", "left:5%;");
                        tooltip.setAttribute("id", tooltipId);

                        test.appendChild(tooltip);
                    }
                    

                    

                    if (document.getElementById("span_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length)) != null) {
                        var contentDiv = document.createElement("div");
                        contentDiv.setAttribute("id", "span_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length));
                        contentDiv.setAttribute("class", "text-content");
                        console.log("aftermove span", "span_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length));

                        var contentSpan = document.getElementById("span_" + $($item[0]).attr('id').substring(8, $($item[0]).attr('id').length)).innerHTML;
                        contentDiv.append(contentSpan);

                        test.setAttribute("title", contentSpan);
                        test.appendChild(contentDiv);
                    }

                    

                    
                    


                    //var cloned = $("#" + ($($item[0]).attr('id'))).clone();
                    //console.log("aftermove clone", cloned);
                    console.log($("#" + firstContainer + ":nth-child(" + colIndex + ")"));
                    console.log("aftermove item", $($item[0]).attr('id'));
                    console.log("aftermove nth","#" + firstContainer + ">li:nth-child(" + colIndex + ")");
                    $("#" + ($($item[0]).attr('id'))).remove();
                    if (colIndex > document.getElementById(firstContainer).childElementCount) {
                        $("#" + firstContainer).append(test);
                    } else {


                        console.log("aftermove count", document.getElementById(firstContainer).childElementCount);
                        $("#" + firstContainer + ">li:nth-child(" + colIndex + ")").before(test);
                    }

                    

                    
                    // $item[0].clone().appendChild("#sortable-row_7");
                    console.log("aftermove","final");

                    $(this).sortable('cancel');
                   // $(ui.sender).sortable('cancel');
                    
                } else {
                    var prevDiv = $("#" + $($item[0]).attr('id')).prevAll();
                    
                    //todo:remove last in new row, add last in last row
                    console.log("aftermove first container", firstContainer);
                    console.log("aftermove final container", $(container.target[0]).attr('id'));

                   // console.log("aftermove prevALL", prevDiv)
                    //shift to left most div
                    for(var i=0;i<prevDiv.length;i++){
                        if (document.getElementById(prevDiv[i].id)!=null && document.getElementById(prevDiv[i].id).innerHTML == "") {
                            var value = prevDiv[i].value;
                            var remake = document.createElement("li");
                            remake.setAttribute("class", "col-sm-1 border limitedSortable");
                            remake.setAttribute("id", prevDiv[i].id);
                            remake.setAttribute("value",value);
                            $("#" + prevDiv[i].id).remove();
                            $("#" + $(container.target[0]).attr('id')).append(remake);
                        }
                    }
                   // console.log("aftermove prev", $("#" + $($item[0]).attr('id')).prevAll());
                    var data = group.sortable("serialize").get();
                   // console.log("aftermove process",data);
                processString(JSON.stringify(data.join("\n"), null, ' '));
                $('#serialize_output').text(
                  group.sortable("serialize").get().join("\n")
                  
                  );
                _super($item, container);
            }
            }, serialize: function (parent, children, isContainer) {
                return isContainer ? children.join() : parent.text();
            }
        });
       
        $(".switch-container").on("click", ".switch", function (e) {
            var method = $(this).hasClass("active") ? "enable" : "disable";
            $(e.delegateTarget).next().sortable(method);
        });

        function getIndexString(index) {
            if(index == 0){
                return "ONE";
            }
            if(index == 1){
                return "TWO";
            }
            if(index == 2){
                return  "THREE";
            }
            if(index == 3){
                return "FOUR";
            }
            if(index == 4){
                return "FIVE";
            }
            if(index == 5){
                return "SIX"
            }
            if(index == 6){
                return "SEVEN"
            }
            if(index == 7){
                return "EIGHT";
            }
            if(index == 8){
                return "NINE"
            }
            if(index == 9){
                return "TEN"
            }
            if(index == 10){
                return "ELEVEN";
            }
            if(index == 11){
                return "TWELVE";
            }
        }


        function saveResult(data) {
            console.log("daatjj",data);
            var rowNumber = data.length;
            for (var i = 0; i < rowNumber; i++) {
                var mcid = data[i].mcID;
                var workcenter = data[i].workCenter;
                var mctype = data[i].mcType;

               // console.log("waaa",$("#GanttChartTable").children().length);
                for (var i = 1; i < $("#GanttChartTable").children().length;i++){//for each row
                    var eleDiv = $("#GanttChartTable").children().children();
                    console.log("save ci", eleDiv[i]);


                    workcenter = $(eleDiv[i]).attr("wc");
                    mcid = $(eleDiv[i]).attr("mcid");
                    mctype = $(eleDiv[i]).attr("mctype");

                    var rowId = $(eleDiv[i]).attr("id");

                    
                    console.log("rowID",rowId);
                    for (var j = 0; j < $(eleDiv[i]).children().length; j++) {
                        console.log("waaa1", $("#" + rowId).children());
                            //var tooltipID = "tooltip_" + workcenter.trim().replace(/\s/g, '') + "_" + mcid.trim().replace(/\s/g, '') + "_" + (j+1);
                        var id = $($(eleDiv[i]).children()[j]).attr("id");
                         var tooltipID = "tooltip_" + id.substring(8,id.length);

                    var card = document.getElementById(id);
                    if (card.innerHTML != "") {
                        var position = (parseInt($("#" + id).index()) + 1).toString();
                        var jsonContent = $("#" + tooltipID)[0].title;
                        var jsonInfo = JSON.parse(jsonContent);
                        var procopseq = jsonInfo.procOpSeq;
                        var woid = jsonInfo.woid;
                        console.log("save info is", "mctype: "+mctype + "| workcenter: " + workcenter + "| mcid: " + mcid+"| position: "+position +"| procopseq: "+ procopseq+"| woid: "+woid);                                               
                        $http.post(config.baseUrlApi + 'HMLVTS/ConfirmGCReorder',
                            {
                                "McID": mcid,
                                "McType":mctype,
                                "PrioritizedNo":position,
                                "WOID":woid,
                                "ProcOpSeq":procopseq
                        }
                    ).then(function (response) {
                        console.log("saving response",response.data);

                    });
                    }
                 }
                   

                }
               
            }
            $('#saveCompleted').modal('show');
        }



        function specialChar(string) {
            
            //string.replace("/", "DU1MMY"); string.replace("\"", "DU2MMY");
            //string.replace("&", "DU3MMY"); string.replace(":", "DU4MMY");
            //string.replace("\\", "DU5MMY"); string.replace("*", "DU6MMY");
            //string.replace("#", "DU7MMY"); string.replace("?", "DU8MMY");
            //string.replace("(", "DU9MMY"); string.replace("<", "DU10MMY");
            //string.replace("$", "DU11MMY"); string.replace(">", "DU12MMY");
            //string.replace("~", "DU13MMY"); string.replace("{", "DU14MMY");
            //string.replace("%", "DU15MMY"); string.replace("}", "DU16MMY");
            //string.replace(".", "DU17MMY"); string.replace("[", "DU18MMY");
            //string.replace("'", "DU19MMY"); string.replace("]", "DU20MMY");
            //return string;

            return string.replace("/", "DU1MMY").replace("\"", "DU2MMY")
            .replace("&", "DU3MMY").replace(":", "DU4MMY")
            .replace("\\", "DU5MMY").replace("*", "DU6MMY")
            .replace("#", "DU7MMY").replace("?", "DU8MMY")
            .replace("(", "DU9MMY").replace("<", "DU10MMY")
            .replace("$", "DU11MMY").replace(">", "DU12MMY")
            .replace("~", "DU13MMY").replace("{", "DU14MMY")
            .replace("%", "DU15MMY").replace("}", "DU16MMY")
            .replace(".", "DU17MMY").replace("[", "DU18MMY")
            .replace("'", "DU19MMY").replace("]", "DU20MMY");
          //  return string;
        }









    }



})();

