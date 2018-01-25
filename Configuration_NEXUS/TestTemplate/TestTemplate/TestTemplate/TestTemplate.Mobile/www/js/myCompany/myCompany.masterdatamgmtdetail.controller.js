(function () {
    'use strict';

    angular.module('erp.myCompany').controller('MyCompanyMasterDataMgmtDetailCtrl', MyCompanyMasterDataMgmtDetailCtrl);

    MyCompanyMasterDataMgmtDetailCtrl.$inject = ['$scope', 'tenant', 'repo', 'kendoGridService', 'myCompanyMasterDataMgmtService', 'notificationService'];

    function MyCompanyMasterDataMgmtDetailCtrl($scope, tenant, repo, kendoGridService, myCompanyMasterDataMgmtService, notificationService) {
        
        $scope.tenantId = "92036299-DC52-E611-AF90-F01FAF1CE20C";
        $scope.checkConnectionByTenantIdAppId = function (tenantId) {
            return myCompanyMasterDataMgmtService.readAllConnectionByTenantIdAppId(tenantId)
	            .then(function (result) {
	                if (result.connectionList.length > 0) return true;
	                else return false;
	            });
        }

        $scope.checkConnectionByTenantIdAppId($scope.tenantId)
         .then(function (result) {
             if (result) {
                 $scope.toggleShow = false;
                 $scope.toggleShowTab = true;
             } else {
                 $scope.toggleShow = true;
                 $scope.toggleShowTab = false;
             }
         });

        $scope.layout.tenantMaster = true;
        $scope.vm = {};

        var description = '';
        var modelIdByAppId = '';

        myCompanyMasterDataMgmtService.readAllEntitiesByApplicationId().then(function (result) {
            var entitiesLength = result.length;
            var modelArr = [];
            var modelObj = {};

            for (var i = 0; i < entitiesLength; i++) {
                if (typeof result[i].description != 'undefined' &&
	                typeof result[i].modelId != 'undefined' &&
	                result[i].description != null &&
	                result[i].modelId != null) {

                    description = result[i].description;
                    modelIdByAppId = result[i].modelId;

                    modelObj = {
                        "modelId": modelIdByAppId,
                        "Description": description,
                        "Grid": '<my-tab-directive model-id="' + modelIdByAppId + '" tenant-id="' + $scope.tenantId + '"></my-tab-directive>'
                    }
                    modelArr.push(modelObj);
                }
                else {
                    notificationService.showError('Database cannot render');
                }
            }
            displayTab(modelArr);
        });

        function displayTab(modelArrParam) {
            $scope.vm.tabOptions = {
                select: function (e) {
                    //console.log("--------------------------------------------------------------------------");
                    //console.log("Selected: " + e.item.innerText);
                    //console.log("Current model ID: " + modelArrParam[$(e.item).index()].modelId);
                },
                activate: function (e) {
                    //console.log("Activated: " + e.item.innerText);
                    console.log('Current model ID: ' + modelArrParam[$(e.item).index()].modelId);
                },
                show: function (e) {
                    //console.log("Shown: " + e.item.innerText);
                    //console.log("--------------------------------------------------------------------------");
                },
                contentLoad: function (e) {
                    //console.log("Content loaded in " + e.item.innerText);
                },
                error: function (e) {
                    //console.log("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
                },

                dataTextField: 'Description',
                dataContentField: 'Grid',
                dataSource: modelArrParam,
                animation: {
                    open: {
                        effects: 'fadeIn'
                    }
                }
            };

            $scope.$watch('vm.tabstrip', function () {
                $scope.vm.tabstrip.select(0);
            });

        }
    }
})();