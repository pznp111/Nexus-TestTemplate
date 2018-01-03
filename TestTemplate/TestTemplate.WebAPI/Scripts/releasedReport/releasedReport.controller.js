(function () {
    'use strict';

    angular.module('erp.releasedReport').controller('ReleasedReportCtrl', ReleasedReportCtrl);

    ReleasedReportCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ReleasedReportCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        // alert("");

        $scope.global = [];
        $scope.tenant = tenant;
        $scope.threshold = 0;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'releasedReport-20' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        var promiseArray1 = [];
        promiseArray1.push(
               $http.get(config.baseUrlApi + 'HMLVTS/GenerateThreshold')
                   );


        $q.all(promiseArray1).then(function (response) {
            console.log("GenerateThreshold", response);
            if(response.length!=0){
                $scope.threshold = parseInt(response[0].data.result[0]["threshold"]);
            }
            onload();
        });

        
        

        function onload() {
            var promiseArray1 = [];
            var promiseArray2 = [];
            promiseArray1.push(
               $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOListRelease')
                   );


            $q.all(promiseArray1).then(function (response) {
                console.log("GenerateWOListRelease", response);
                if (response.length != 0) {
                    createSelect(response[0].data.result, "WOID")
                }
            });

          promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/releasedReportSearch', {
                   "WOID":""
               })
                   );


            $q.all(promiseArray2).then(function (response) {
                console.log("releasedReportSearch", response);
                if (response.length != 0) {
                    makeTable(response[0].data.result);
                }
            });



        }

        $scope.Refresh = function () {
            var select_WOID = $('#select_released_WOID option:selected').text();
            var promiseArray2 = [];
            promiseArray2.push(
               $http.post(config.baseUrlApi + 'HMLVTS/releasedReportSearch', {
                   "WOID": select_WOID
               })
                   );


            $q.all(promiseArray2).then(function (response) {
                console.log("releasedReportSearch", response);
                if (response.length != 0) {
                    makeTable(response[0].data.result);
                }
            });
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


        function makeTable(data) {
            convertTime(["releasedDate", "requestedDeliveryDate"], data);

            document.getElementById("table").innerHTML = "";
            console.log("tableData", data);
            for (var i = 0; i < data.length; i++) {
                data[i]["index"] = (i + 1);
            }
            $("#table").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    filterable: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                        var row = sheet.rows[rowIndex];
                        var color = $scope.highlight[rowIndex - 1]
                        //  console.log("kendo color1",rowIndex+ " " + color);
                        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                            row.cells[cellIndex].background = color;
                        }
                    }
                },
                dataSource: {
                    data
                    //,
                    //pageSize: 20
                },
                dataType: "json",
                height: 350,
                //pageable: {
                //    refresh: true,
                //    pageSizes: true,
                //    buttonCount: 5
                //},
                dragAndDrop: true,
               // pageable: true,

                //pageSize: 10,
                // sortable: true,
                resizable: true,
               // pageable: true,
                //groupable: true,
                filterable: true,
                columnMenu: true,
                reorderable: true,
               // resizable: true,
                draggable: true,
                droppable: true,

                columns: [
                 {
                     field: "index", title: "#", width: 50

                 },
                 {
                     field: "woid", title: "Work Order", width: 150

                 },

                 {
                     field: "poNumber", title: "PO Number", width: 150

                 },
                {
                    field: "partID", title: "PartNo.", width: 150
                },
                 {
                     field: "orderType", title: "Order Type", width: 150
                 },
                 {
                     field: "releaseProdQty", title: "Qty", width: 150
                 },
                  {
                      field: "releasedDate", title: "Release Date", width: 150
                  },
                  {
                      field: "requestedDeliveryDate", title: "Request Delivery Date", width: 150
                  },
                 {
                     field: "status", title: "Status", width: 200

                 }
                ]
            })

            highlight();
        }


        function highlight() {
            var grid = $('#table').data('kendoGrid');
            // console.log("HighlighCompleted grid", grid);
            // console.log("HighlighCompleted grid1",grid.dataItem());
            var items = grid.dataSource.view();

            $scope.highlight = [];
            for (var i = 0; i < items.length; i++) {
                var time = items[i]['requestedDeliveryDate'];
                console.log("highlight requestedDeliveryDate", time);
                time = time.substring(0, time.indexOf(" "));
                //var today = new 
                var dateTime = time.split("-");
                //console.log("time1", dateTime);
                var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);
                console.log("highlight requestedDeliveryDate expectedDate", expectedDate);
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                var compareDate = expectedDate;
                compareDate.setDate(compareDate.getDate() - $scope.threshold);
                console.log("highlight compareDate", compareDate);
                console.log("highlight today", today);

                if (today > expectedDate) {
                    //red
                    $scope.highlight.push("#FFCCFF");
                } else {
                    if (today >= compareDate) {
                        //yellow
                        $scope.highlight.push("#ffff00");
                    } else {
                        //white
                        $scope.highlight.push("#ffffff");
                    }
                }

            }

            console.log("highlight scope", $scope.highlight);
            var trs = $("#kendo_body_container > tbody").children();
            console.log("highlight trs", trs);

            // var tbody = document.getElementsByTagName("tbody")[0];
            var tbody = $('tbody')[1];
            console.log("highlight tbody", $(tbody).find('> tbody > tr'));

            var rows = $(tbody).children();
            console.log("highlight rows", rows);
            if (rows.length != 0) {

                for (var i = 0; i < rows.length; i++) {
                    var color = $scope.highlight[i];
                    $(rows[i]).css("background-color", color);


                }
            }
        //    $scope.highlight = [];
        //    var grid = $('#table').data('kendoGrid');
        //    // console.log("HighlighCompleted grid", grid);
        //    //console.log("HighlighCompleted grid1", grid.dataItem());
        //    var items = grid.dataSource.view();

        //    console.log("highlight", grid);
        //    console.log("highlight", items);
        //    // console.log("highlight item1", items1);
        //    for (var i = 0; i < items.length; i++) {
        //        console.log("test items", items[i]['requestedDeliveryDate']);
        //        var time1 = items[i]['requestedDeliveryDate'];
        //        var time = time1.substring(0, time1.indexOf("T"));
        //        // console.log("time is",time);

        //        var dateTime = time.split("-");
        //        //console.log("time1", dateTime);
        //        var expectedDate = new Date(dateTime[0], dateTime[1] - 1, dateTime[2]);
        //        // console.log("time2", expectedDate);

        //        var today = new Date();
        //        var compareDate = new Date(today.getYear(), today.getMonth(), today.getDate() - $scope.threshold);
        //        //console.log("compare date", compareDate);
        //        if (expectedDate < compareDate && expectedDate > today) {
        //           // $(tbody.children().children()[i]).parent().addClass("yellow-background");
        //            $scope.highlight.push("#ffff00");
        //           // currentColor = "#ffff00";
        //        } else if (expectedDate < today) {
        //           // $(tbody.children().children()[i]).parent().addClass("pink-background");
        //            $scope.highlight.push("#FFCCFF");
        //           // currentColor = "#FFCCFF";
        //        }

        //    }

        //    console.log("$scope.highlight", $scope.highlight);

        //    var tbody =  $($("#table").find("tbody"));
        //    for(var i =0; i < tbody.length;i++){
        //      var tr =  $(tbody[i]).find("tr");
        //      console.log("tr", tr);

        //      for (var j = 0; j < tr.length;j++){
        //          $(tr[j]).css("background-color", $scope.highlight[j]);
        //      }
        //    }
        ////    if (items.length!=0) {
        ////        // if (items[0].prevObject.length != 0) {
                
        ////        var trs = $($(items[0]).prevObject[0]).find("tr");
        ////        for (var i = 0; i < trs.length; i++) {
        ////            // $(trs[i]).css("background-color", "yellow");
        ////        }
        ////  //  }
        ////}
        }

        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_released_" + itemName);
            var array = [];
            if (itemName != "WorkCenter") {
                array.push("");
            }


           


            if (itemName == "WOID") {
                for (var i = 0; i < rawData.length; i++) {
                    array.push(rawData[i].woid);
                }
            }

            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                myDiv.appendChild(option);
            }
        }
    }
})();

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});