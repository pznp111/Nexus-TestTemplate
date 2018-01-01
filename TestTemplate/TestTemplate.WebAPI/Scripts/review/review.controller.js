var global = [];
(function () {
    'use strict';

    angular.module('erp.review').controller('ReviewCtrl', ReviewCtrl);

    ReviewCtrl.$inject = ['$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ReviewCtrl($scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable
        var xml = [];
        

        $scope.tenant = tenant;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'review-1' });

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

        $scope.tenant = tenant;


        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          //  tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById("PauseReason").style.display = "block";


        $http.get(config.baseUrlApi + 'HMLVTS/GeneratePauseReasonList')
        .then(function (response) {
            //studentData = response.data.result;
            makeTable(response.data.result,"#pause-reason-table");
        });


        $http.get(config.baseUrlApi + 'HMLVTS/GenerateScrapRemarkList')
        .then(function (response) {
            //studentData = response.data.result;
            console.log(response.data.result);
            makeTable(response.data.result, "#scrap-remark-table");
        });

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateTrackingRemarkList')
        .then(function (response) {
            //studentData = response.data.result;
            console.log("ts",response.data.result);
            makeTable(response.data.result, "#tracking-remark-table");
        });


        
        function addIndex(data) {
            for(var i in data){
                data[i]["index"] = parseInt(i) + 1;
            }
            console.log(data);
            return data;
        }

        function makeTable(data, id) {
            console.log("data", data);
            data = addIndex(data);
            if (id == "#pause-reason-table") {
                var record = 0;
        $(id).kendoGrid({
               
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
                    title: "#",
                    field:"index",
                    width: 35
                },
             {
                 field: "reason", title: "Pause Reason", width: 150

             }
            ],
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            }
        })  
            }

            if (id == "#scrap-remark-table") {
                $(id).kendoGrid({

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
                    filterable: true,
                    columnMenu: true,
                    reorderable: true,
                    resizable: true,
                    columns: [
                    {
                    title: "#",
                    field:"index",
                    width: 35
                },
                     {
                         field: "scrapRemark", title: "Scrap Remark", width: 150

                     }
                    ]
                })
            }

            if (id == "#tracking-remark-table") {
                $(id).kendoGrid({

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
                    title: "#",
                    field:"index",
                    width: 35
                },
                     {
                         field: "remark", title: "Scrap Remark", width: 150

                     }
                    ]
                })
            }
        }
   
        $scope.addScrapRemark = function addScrapRemark() {
            var scrapRemark = $('#scrap-remark').val();

            

            $http.post(config.baseUrlApi + 'HMLVTS/AddScrapRemark',
                {
                    "reason": scrapRemark
                }
                )
        .then(function (response) {


            $http.get(config.baseUrlApi + 'HMLVTS/GenerateScrapRemarkList')
            .then(function (response) {
                //studentData = response.data.result;
                //console.log(response.data.result);
                makeTable(response.data.result, "#scrap-remark-table");
            });
        });


        }

        $scope.addPausedReason = function addPausedReason() {          
            var pausedReason = $('#pause-reason').val();

            //todo:check pausedReason not empty string

            $http.post(config.baseUrlApi + 'HMLVTS/AddPauseReason',
                {
                    "reason": pausedReason
                }
                )
        .then(function (response) {

            $http.get(config.baseUrlApi + 'HMLVTS/GeneratePauseReasonList')
            .then(function (response) {
                //studentData = response.data.result;
                makeTable(response.data.result, "#pause-reason-table");
            });
        });

         
        }

        $scope.addTrackingRemark = function addTrackingRemark() {
            var pausedReason = $('#tracking-remark').val();

            //todo:check pausedReason not empty string

            $http.post(config.baseUrlApi + 'HMLVTS/addTrackingRemark',
                {
                    "reason": pausedReason
                }
                )
        .then(function (response) {

            $http.get(config.baseUrlApi + 'HMLVTS/GenerateTrackingRemarkList')
            .then(function (response) {
                //studentData = response.data.result;
                makeTable(response.data.result, "#tracking-remark-table");
            });
        });


        }

        $scope.removeScrapRemark = function removeScrapRemark() {

            var grid = $("#scrap-remark-table").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            //console.log(selectedItem);
           // console.log(selectedItem["scrapRemark"]);
           // console.log(selectedItem.scrapRemark);
           // console.log("selected row", selectedItem.scrapRemark);

            //todo: check a value is selected
            if (selectedItem.reason != "") {
                $http.post(config.baseUrlApi + 'HMLVTS/RemoveScrapRemark',
                        {
                            "reason": selectedItem.scrapRemark
                        }
                        )
                .then(function (response) {

                    $http.get(config.baseUrlApi + 'HMLVTS/GenerateScrapRemarkList')
                    .then(function (response) {
                        //studentData = response.data.result;
                        makeTable(response.data.result,"#scrap-remark-table");
                    });
                });
            }


        }

        $scope.removePausedReason = function removePausedReason() {

            var grid = $("#pause-reason-table").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem.reason);

            //todo: check a value is selected
            if (selectedItem.reason !="") {
            $http.post(config.baseUrlApi + 'HMLVTS/RemovePauseReason',
                    {
                        "reason": selectedItem.reason
                    }
                    )
            .then(function (response) {

                $http.get(config.baseUrlApi + 'HMLVTS/GeneratePauseReasonList')
                .then(function (response) {
                    //studentData = response.data.result;
                    makeTable(response.data.result,"#pause-reason-table");
                });
            });
        }

            
        }

        $scope.removeTrackingRemark = function removeTrackingRemark() {

            var grid = $("#tracking-remark-table").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            console.log("selected row", selectedItem.remark);

            //todo: check a value is selected
            if (selectedItem.reason != "") {
                $http.post(config.baseUrlApi + 'HMLVTS/RemoveTrackingRemark',
                        {
                            "reason": selectedItem.remark
                        }
                        )
                .then(function (response) {

                    $http.get(config.baseUrlApi + 'HMLVTS/GenerateTrackingRemarkList')
                    .then(function (response) {
                        //studentData = response.data.result;
                        console.log("ts", response.data.result);
                        makeTable(response.data.result, "#tracking-remark-table");
                    });
                });
            }


        }

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateThreshold')
        .then(function (response) {
            
            $('#current-value-alert').val(response.data.result[0]["threshold"]);
        });

        $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOStatusReleaseStartDateThreshold')
        .then(function (response) {
           // console.log(response.data.result[0]);
            $('#current-value-wostatus').val(response.data.result[0]["woStatusThreshold"]);
        });


        
        

        $scope.UpdateReleaseThreshold = function UpdateReleaseThreshold() {

            var value = $("#new-value-wostatus").val();

            //alert(value +" "+isNaN(Number(value)));
            if (!isNaN(Number(value)) && value.replace(/\s+/, "") != "") {

                $http.post(config.baseUrlApi + 'HMLVTS/UpdateWOStatusReleaseStartDateThreshold',
                {
                    "releaseThreshold": value
                }
                )
                .then(function (response) {

                    $http.get(config.baseUrlApi + 'HMLVTS/GenerateWOStatusReleaseStartDateThreshold')
                    .then(function (response) {
                        $('#current-value-wostatus').val(response.data.result[0]["woStatusThreshold "]);
                    });
                });
            }
        }

        $scope.UpdateThreshold = function UpdateThreshold() {
            
            var value = $("#new-value-alert").val();
            
            //alert(value +" "+isNaN(Number(value)));
            if (!isNaN(Number(value)) && value.replace(/\s+/, "") !="") {
                
            $http.post(config.baseUrlApi + 'HMLVTS/UpdateThreshold',
            {
                "threshold": value
            }
            )
            .then(function (response) {

                $http.get(config.baseUrlApi + 'HMLVTS/GenerateThreshold')
                .then(function (response) {
                    $('#current-value-alert').val(response.data.result[0]["threshold"]);
                });
            });
        }
        }

       

    }


    
})();



function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].className = tablinks[i].className.replace(" custbtn", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active custbtn";
}



