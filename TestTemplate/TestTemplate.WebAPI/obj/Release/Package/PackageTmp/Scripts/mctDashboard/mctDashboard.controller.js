(function () {
    'use strict';

    angular.module('erp.mctDashboard').controller('mctDashboardCtrl', mctDashboardCtrl);

    mctDashboardCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService', '$timeout'];

    function mctDashboardCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService, $timeout) {
        //initialise global variable
        //var xml = [];
        // var rowNumber = 0;
        // var dataLength = 0;
        // var rowBoxNo = 12;
        //var nextSplitWONo;

        //*************remark***********//
        //global variables using
        //$scope.finalData and $scope.finalData1 are used to make the first table
        //$scope.DetailResult is used to make the 2nd table
        //$scope.selectorItem and $scope.selectorItemDetail are used to generate selector for Measurement Report(table2)
        //$scope.promiseArray1Data is to store parameter items so that can be combine with $scope.DetailResult in makeTable2/BuildData function


        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'mctDashboard-29' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);


        //define global variable and init
        var colorStructure = {
            "mto_casing": "#934867", "mto_cartridge": "#0B7DA0", "mts": "#BB7E5D"
        }


        //if (window.MobileAccessibility) {
        //    window.MobileAccessibility.usePreferredTextZoom(false);
        //}

        var TYPE = {
            DAILY: 1,
            WEEKLY: 2,
            MONTHLY: 3
        };

        var selectType = TYPE.DAILY;

        $scope.groupButtonClick = selectType;

        $scope.processData = function (option) {
            if (option == 'Daily') {
                selectType = TYPE.DAILY;
            }
            if (option == 'Weekly') {
                selectType = TYPE.WEEKLY;
            }
            if (option == 'Monthly') {
                selectType = TYPE.MONTHLY;
            }

            $scope.groupButtonClick = selectType;
            document.getElementById("chartXAxis").innerHTML = (selectType == 1) ? "Time" : (selectType == 2) ? "Days" : "Months"

            apiCalls();
        };
        apiCalls();

        var barchartData = {
            "data": {
                "Time": [
                  "8:00",
                  "9:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00"
                ],
                "catTarget1": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "catTarget2": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "catTarget3": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "catCompleted1": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "catCompleted2": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ],
                "catCompleted3": [
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ]
            },
            "Success": true,
            "Message": null
        };
        createChart("#chart");
        function createChart(name) {
            $(name).kendoChart({
                renderAs: "canvas",
                title: {
                    text: "Work Order Progress Status",
                    position: "left"
                },
                legend: {
                    position: "top"
                },
                series: [{
                    type: "line",
                    data: barchartData.catTarget1,
                    color: colorStructure.mto_casing,
                    axis: "ax1",
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "bar",
                    data: barchartData.catCompleted1,
                    name: "MTO(Casing)",
                    color: colorStructure.mto_casing,
                    axis: "ax1",
                    overlay: {
                        gradient: "none"
                    }
                },
               {
                   type: "line",
                   data: barchartData.catTarget2,
                   color: colorStructure.mto_cartridge,
                   overlay: {
                       gradient: "none"
                   }
               },
                {
                    type: "bar",
                    data: barchartData.catCompleted2,
                    name: "MTO(Cartridge)",
                    color: colorStructure.mto_cartridge,
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "line",
                    data: barchartData.catTarget3,
                    color: colorStructure.mts,
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "bar",
                    data: barchartData.catCompleted3,
                    name: "MTS",
                    color: colorStructure.mts,
                    overlay: {
                        gradient: "none"
                    }
                }],
                valueAxes: [{
                    name: "ax1",
                    color: "#000000",
                    line: {
                        visible: false
                    },

                    labels: {
                        template: ""
                    },
                    title: {
                        text: "Total Quantity (pcs)",
                        font: "14px Arial,Helvetica,sans-serif"
                    }

                }],

                categoryAxis: {
                    font: "25px Arial,Helvetica,sans-serif",
                    categories: barchartData.Time,
                    // Align the first two value axes to the left
                    // and the last two to the right.
                    //
                    // Right alignment is done by specifying a
                    // crossing value greater than or equal to
                    // the number of categories.
                    justified: true
                },
                tooltip: {
                    visible: true,
                    format: "{0}",
                    template: "#= category #/03: #= value #"
                }
            });
        }

        var nulldata = {
            "data": [
              {
                  "MCID": "",
                  "ActualRecQty": 0,
                  "CompletedQty": 0,
                  "OutstandingQty": 0,
                  "ScrapQty": 0,
                  "WO_TTL": 1,
                  "WO_Completed": 0,
                  "Id": "1"
              },
                 {
                     "MCID": "",
                     "ActualRecQty": 0,
                     "CompletedQty": 0,
                     "OutstandingQty": 0,
                     "ScrapQty": 0,
                     "WO_TTL": 1,
                     "WO_Completed": 0,
                     "Id": "2"
                 },
                    {
                        "MCID": "",
                        "ActualRecQty": 0,
                        "CompletedQty": 0,
                        "OutstandingQty": 0,
                        "ScrapQty": 0,
                        "WO_TTL": 1,
                        "WO_Completed": 0,
                        "Id": "3"
                    },
            ],
            "Success": true,
            "Message": null
        };

        function detailInit(e) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "OrderID", width: "110px" },
                    { field: "ShipCountry", title: "Ship Country", width: "110px" },
                    { field: "ShipAddress", title: "Ship Address" },
                    { field: "ShipName", title: "Ship Name", width: "300px" }
                ]
            });
        }

        function apiCalls() {
            barchartData = { "Time": ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", ">18:00"], "catTarget1": [0, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6], "catTarget2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "catTarget3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "catCompleted1": [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], "catCompleted2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "catCompleted3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "Id": null }
            createChart("#chart");

            //sample data
            $scope.machines = [{ "MCID": "Inkjet Printer", "ActualRecQty": 3, "CompletedQty": 3, "OutstandingQty": 0, "ScrapQty": 0, "WO_TTL": 2, "WO_Completed": 2, "Id": "1" }, { "MCID": "LEAN Packaging", "ActualRecQty": 1, "CompletedQty": 1, "OutstandingQty": 0, "ScrapQty": 0, "WO_TTL": 1, "WO_Completed": 1, "Id": "2" }, { "MCID": "Scent Filling", "ActualRecQty": 2, "CompletedQty": 2, "OutstandingQty": 0, "ScrapQty": 0, "WO_TTL": 1, "WO_Completed": 1, "Id": "3" }];


            for (var i = 0; i < $scope.machines.length; i++) {
                createMachineCell($scope.machines[i]);
            }



            //sample data
            var one = [{ "x": 3, "y": 30, "size": 1, "content": "0001.02", "Id": null }, { "x": 3, "y": 40, "size": 1, "content": "0002", "Id": null }, { "x": 3, "y": 20, "size": 1, "content": "0002.01", "Id": null }, { "x": 3, "y": 10, "size": 1, "content": "0002.01.01", "Id": null }, { "x": 3, "y": 50, "size": 1, "content": "0002.02", "Id": null }, { "x": 1, "y": 30, "size": 1, "content": "783 WOs", "Id": null }, { "x": 2, "y": 30, "size": 1, "content": "8 WOs", "Id": null }];
            var two = [{ "x": 9, "y": 30, "size": 1, "content": "470 WOs", "Id": null }];
            var three = [{ "x": 5, "y": 30, "size": 1, "content": "0001.01.01", "Id": null }, { "x": 5, "y": 10, "size": 1, "content": "0007.02", "Id": null }, { "x": 5, "y": 20, "size": 1, "content": "0003", "Id": null }, { "x": 5, "y": 40, "size": 1, "content": "0005", "Id": null }];

            createChartBubble("#chartLeft", "Ahead Of Schedule", one, "#9d9696", 0.5, 3.5, true);
            createChartBubble("#chartMiddle", "On Schedule", two, "#9d9696", 8, 10, false);
            createChartBubble("#chartRight", "Behind Schedule", three, "#9d9696", 4.5, 7.5, true);

        }

        function createChart(name) {
            $(name).kendoChart({
                renderAs: "canvas",
                title: {
                    text: "Work Order Progress Status",
                    position: "left"
                },
                legend: {
                    position: "top"
                },
                series: [{
                    type: "line",
                    data: barchartData.catTarget1,
                    color: colorStructure.mto_casing,
                    axis: "ax1",
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "bar",
                    data: barchartData.catCompleted1,
                    name: "MTO(Casing)",
                    color: colorStructure.mto_casing,
                    axis: "ax1",
                    overlay: {
                        gradient: "none"
                    }
                },
               {
                   type: "line",
                   data: barchartData.catTarget2,
                   color: colorStructure.mto_cartridge,
                   overlay: {
                       gradient: "none"
                   }
               },
                {
                    type: "bar",
                    data: barchartData.catCompleted2,
                    name: "MTO(Cartridge)",
                    color: colorStructure.mto_cartridge,
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "line",
                    data: barchartData.catTarget3,
                    color: colorStructure.mts,
                    overlay: {
                        gradient: "none"
                    }
                },
                {
                    type: "bar",
                    data: barchartData.catCompleted3,
                    name: "MTS",
                    color: colorStructure.mts,
                    overlay: {
                        gradient: "none"
                    }
                }],
                valueAxes: [{
                    name: "ax1",
                    color: "#000000",
                    line: {
                        visible: false
                    },

                    labels: {
                        template: ""
                    },
                    title: {
                        text: "Total Quantity (pcs)",
                        font: "14px Arial,Helvetica,sans-serif"
                    }

                }],

                categoryAxis: {
                    font: "25px Arial,Helvetica,sans-serif",
                    categories: barchartData.Time,
                    // Align the first two value axes to the left
                    // and the last two to the right.
                    //
                    // Right alignment is done by specifying a
                    // crossing value greater than or equal to
                    // the number of categories.
                    justified: true
                },
                tooltip: {
                    visible: true,
                    format: "{0}",
                    template: "#= category #/03: #= value #"
                }
            });
        }

        function createMachineCell(machine) {
            console.log("ID ==" + machine.Id);
            console.log("WO_Completed ==" + machine.WO_Completed);
            console.log("WO_TTL ==" + machine.WO_TTL);

            $timeout(function () {
                $(document).ready(function () {
                    var percentage = (machine.WO_Completed * 100) / machine.WO_TTL;
                    var data = [{
                        value: percentage,
                        color: "#0d4207"
                    }, {
                        value: (percentage - 100),
                        color: "#9d9696"
                    }]

                    var ds = new kendo.data.DataSource({
                        data: data
                    });


                    $("#" + machine.Id).kendoChart({
                        title: {
                            visible: false
                        },
                        dataSource: ds,
                        legend: {
                            visible: false
                        },
                        chartArea: {
                            background: ""
                        },
                        seriesDefaults: {
                            type: "donut",
                            startAngle: 90,
                            holeSize: 70,
                        },
                        series: [{
                            name: "2011",
                            field: "value"
                        }],
                        tooltip: {
                            visible: false,
                            template: "#= category # (#= series.name #): #= value #%"
                        }
                    });

                    // var text = "Custom   <br />    Text"
                    //  $(".inner-content").html(text);
                });

            }, 50);

        }

        function createChartBubble(name, title, data, bgcolor, min, max, isXAxisLine) {



            $(name).kendoChart({
                title: {
                    text: title
                },
                legend: {
                    visible: false
                },
                dataSource: {
                    data: data
                },

                seriesClick: onBubbleClick,

                seriesDefaults: {
                    type: "bubble",
                    border: {
                        color: "#ffffff",
                        opacity: 1,
                        width: 2
                    },
                    color: "#0d4207",
                    opacity: 1,
                    labels: {
                        visible: true,
                        font: "bold 12px  Times New Roman,Times,serif",
                        color: "#ffffff"


                    }


                },

                series: [{

                    xField: "x",
                    yField: "y",
                    sizeField: "size",
                    categoryField: "content"


                }],
                xAxis: {
                    visible: true,
                    min: min,
                    max: max,

                    majorGridLines: {
                        visible: isXAxisLine
                    },
                    majorUnit: 1,
                    labels: {
                        template: kendo.template("# if (value == '0.5'){ # Day(s) # } else if(value == '1.5') { # 7 # }  else if(value == '2.5') { # 1 # } else if(value == '9') { # Within Same Day # } else if(value == '5.5') { # 1 # } else if(value == '6.5') { # 7 # }   else if(value == '7.5') { # Day(s) # } else { #  # }#")
                    },

                    plotBands: [{
                        from: min,
                        to: max,
                        color: bgcolor,
                        opacity: 0.5,
                        text: "WWW"
                    }
                    ]

                },


                yAxis: {

                    visible: false,
                    min: 0,
                    max: 60,
                    majorGridLines: {
                        visible: false
                    }


                },
                chartArea: {
                    background: "transparent"
                }
            });



        }

        function onBubbleClick(e) {
            kendoConsole.log(kendo.format("Plot area click :: {0} : {1:N0}",
                e.category, e.value
            ));


            $('#gridWOStatusBasicModal').modal('show');
            console.log("Click bubble" + JSON.stringify(e.value));


            $(document).ready(function () {
                var element = $("#gridWOStatus").kendoGrid({
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                        },
                        pageSize: 6,
                        serverPaging: true,
                        serverSorting: true
                    },
                    height: 600,
                    sortable: true,
                    pageable: true,
                    detailInit: detailInit,
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                    },
                    columns: [
                        {
                            field: "FirstName",
                            title: "First Name",
                            width: "110px"
                        },
                        {
                            field: "LastName",
                            title: "Last Name",
                            width: "110px"
                        },
                        {
                            field: "Country",
                            width: "110px"
                        },
                        {
                            field: "City",
                            width: "110px"
                        },
                        {
                            field: "Title"
                        }
                    ]
                });
            });

            $('#gridWOStatusBasicModal').modal('show');
        }







    }
})();