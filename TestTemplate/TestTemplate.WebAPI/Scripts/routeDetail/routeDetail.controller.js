(function () {
    'use strict';

    angular.module('erp.routeDetail').controller('RouteDetailCtrl', RouteDetailCtrl);

    RouteDetailCtrl.$inject = ['$q', '$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function RouteDetailCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable


        $scope.global = [];
        $scope.tenant = tenant;

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'routeDetail-15' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);

        //console.log("customerService", authService.parameter);
        //alert(authService.parameter);
        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();
        $("#main-container-page").css('margin-top', 0)
        onload();
        //Generate_RouteDetail1

        function onload() {

            
            var promiseArray = [];
            promiseArray.push(
            $http.get(config.baseUrlApi + 'HMLVTS/getAllWOID')
         );

            $q.all(promiseArray).then(function (response) {
                console.log("getAllWOID", response);
                if (response.length != 0) {
                    if(response[0].data.success && response[0].data.result.length !=0){
                        createSelect(response[0].data.result, "routewoid")
                    }
                }
            });

            if (authService.parameter != "") {
                worouteSelectedfromWODetail(authService.parameter);
                authService.parameter = "";
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
            // console.log("rawdata", rawData);
            var myDiv = document.getElementById("select_" + itemName);
            myDiv.innerHTML = "";


            if (itemName == "routewoid") {
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


        function worouteSelectedfromWODetail(woid) {
           // var woid = String($('#select_routewoid option:selected').text()).trim();
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail1', {
                'WOID': woid
            })
         );

            $q.all(promiseArray).then(function (response) {
                console.log("Generate_RouteDetail1", response);
                if (response.length != 0) {
                    if (response[0].data.success) {

                        if (response[0].data.result.length != 0) {

                            for (var i = 0; i < response[0].data.result.length; i++) {
                                var routeid = response[0].data.result[i]['routeID'];
                                promiseArray1.push(
                                    $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail2', {
                                        'WOID': routeid
                                    })
                                );


                            }

                            $q.all(promiseArray1).then(function (response1) {
                                console.log("Generate_RouteDetail2", response1);
                                if (response1.length != 0) {

                                    for (var i = 0; i < response1.length; i++) {
                                        if (response1[i].data.success && response1[i].data.result.length != 0) {

                                            response[0].data.result[i]["name"] = response1[i].data.result[0]["name"];
                                        } else {
                                            response[0].data.result[i]["name"] = "";
                                        }
                                    }

                                }

                                console.log("final response", response);
                                maketable1(response[0].data.result);
                            });

                        } else {
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail3', {
                                    'WOID': woid
                                })
                            );

                            $q.all(promiseArray).then(function (response1) {
                                if (response.length != 0) {
                                    if (response[0].data.success) {

                                        if (response[0].data.result.length != 0) {
                                            for (var i = 0; i < response[0].data.result.length; i++) {
                                                var routeid = response[0].data.result[i]['routeID'];
                                                promiseArray3.push(
                                                    $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail2', {
                                                        'WOID': routeid
                                                    })
                                                );


                                            }

                                            $q.all(promiseArray3).then(function (response1) {
                                                console.log("Generate_RouteDetail2", response1);
                                                if (response1.length != 0) {

                                                    for (var i = 0; i < response1.length; i++) {
                                                        if (response1[i].data.success && response1[i].data.result.length != 0) {

                                                            response[0].data.result[i]["name"] = response1[i].data.result[0]["name"];
                                                        } else {
                                                            response[0].data.result[i]["name"] = "";
                                                        }
                                                    }

                                                }

                                                console.log("final response", response);
                                                maketable1(response[0].data.result);
                                            });
                                        }

                                    }
                                }
                            });
                        }
                    }
                }

            });

        }


        $scope.worouteSelected = function () {
            var woid = String($('#select_routewoid option:selected').text()).trim();
            var promiseArray = [];
            var promiseArray1 = [];
            var promiseArray2 = [];
            var promiseArray3 = [];
            promiseArray.push(
            $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail1', {
                'WOID': woid
            })
         );

            $q.all(promiseArray).then(function (response) {
                console.log("Generate_RouteDetail1", response);
                if (response.length != 0) {
                    if (response[0].data.success ) {

                        if( response[0].data.result.length != 0){

                        for (var i = 0; i < response[0].data.result.length; i++) {
                            var routeid = response[0].data.result[i]['routeID'];
                            promiseArray1.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail2', {
                                    'WOID': routeid
                                })
                            );


                        }

                        $q.all(promiseArray1).then(function (response1) {
                            console.log("Generate_RouteDetail2", response1);
                            if (response1.length != 0) {

                                for (var i = 0; i < response1.length; i++) {
                                    if (response1[i].data.success && response1[i].data.result.length != 0) {

                                        response[0].data.result[i]["name"] = response1[i].data.result[0]["name"];
                                    } else {
                                        response[0].data.result[i]["name"] = "";
                                    }
                                }

                            }

                            console.log("final response", response);
                            maketable1(response[0].data.result);
                        });

                        } else {
                            promiseArray2.push(
                                $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail3', {
                                    'WOID': woid
                                })
                            );

                            $q.all(promiseArray).then(function (response1) {
                                if (response.length != 0) {
                                    if (response[0].data.success) {

                                        if (response[0].data.result.length != 0) {
                                            for (var i = 0; i < response[0].data.result.length; i++) {
                                                var routeid = response[0].data.result[i]['routeID'];
                                                promiseArray3.push(
                                                    $http.post(config.baseUrlApi + 'HMLVTS/Generate_RouteDetail2', {
                                                        'WOID': routeid
                                                    })
                                                );


                                            }

                                            $q.all(promiseArray3).then(function (response1) {
                                                console.log("Generate_RouteDetail2", response1);
                                                if (response1.length != 0) {

                                                    for (var i = 0; i < response1.length; i++) {
                                                        if (response1[i].data.success && response1[i].data.result.length != 0) {

                                                            response[0].data.result[i]["name"] = response1[i].data.result[0]["name"];
                                                        } else {
                                                            response[0].data.result[i]["name"] = "";
                                                        }
                                                    }

                                                }

                                                console.log("final response", response);
                                                maketable1(response[0].data.result);
                                            });
                                        }

                                    }
                                }
                            });
                        }
                    }
                }

            });

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


            var selectedwoid = String($('#select_routewoid option:selected').text()).trim();



            var promiseArray = [];

            promiseArray.push(
                $http.post(config.baseUrlApi + 'HMLVTS/GetCurProcOpSeq', {
                    'WOID': selectedwoid
                })
                    );

            $q.all(promiseArray).then(function (response) {
                console.log("GetCurProcOpSeq", response);
                if (response.length != 0) {
                    if (response[0].data.success && response[0].data.result.length != 0) {
                        $scope.selectedprocopseq = String(response[0].data.result[0]['maxProcOpSeq']).trim();
                        if (response[0].data.result[0]['maxProcOpSeq'] == null) {
                            $scope.selectedprocopseq = "0";                        
                        }
                        //****************************
                        var grid = $('#routeDetail-table').data('kendoGrid');
                       // console.log("HighlighCompleted grid", grid);
                       // console.log("HighlighCompleted grid1", grid.dataItem());
                        var items = grid.dataSource.view();
                        var item1 = grid.select();
                       // console.log("HighlighCompleted item1", $(item1.prevObject[0]).find("tr"));
                        //console.log("HighlighCompleted uid", $(item1).attr("data-uid"));
                        //console.log("HighlighCompleted parent", $(item1).parent());
                       // console.log("Highlight each tr", $(item1).find("tr"));
                        //console.log("HighlighCompleted items", items);


                       // var grid = $('#wodetail-table3').data('kendoGrid');
                       // var item1 = grid.select();
                       // var items = grid.dataSource.view();
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


                        //****************************
                       
                    }
                }



            });









            // var grid = $('#wodetail-table1').data('kendoGrid');
            //  var items = grid.dataSource.view();


            // console.log("this grid", grid);
            //  console.log("this items", items);


        }


        function maketable1(data) {
            // console.log("kendo data correct", data.slice(0));
            console.log("maketable1",data);
          //  var temp = data.slice(0);
            document.getElementById("routeDetail-table").innerHTML = "";

            $("#routeDetail-table").kendoGrid(
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
                            field: "workCenter", title: "Work Center", width: 150
                        },
                        {
                            field: "name", title: "Route Name", width: 150

                        },
                        {
                            field: "opSeq", title: "Op Seq", width: 150
                        },
                         {
                             field: "procOpSeq", title: "Proc Op Seq", width: 150
                         },
                         {
                             field: "mcID", title: "Machine ID", width: 150
                         },
                         {
                             field: "mcType", title: "Machine Type", width: 150
                         },
                         {
                             field: "remark", title: "Remark", width: 150
                         }
                                          ,
                     {
                         field: "prioritizedNo", title: "Dispatch State", width: 150,
                         template: "# if (prioritizedNo != null) { #" +
                     "<div class='table-checkbox' ><input type = 'checkbox' checked disabled></div>" +
                     "# } else { #" +
                     "<div class='table-checkbox'><input type = 'checkbox' disabled></div>" +
                     "# } #"

                 }
                    ]
                })


            HighlighCompleted();
        }



    }
})();