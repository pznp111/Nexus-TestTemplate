(function () {
    'use strict';
    angular.module('erp.myCompany').service('myCompanyMasterDataMgmtService', myCompanyMasterDataMgmtService);
    myCompanyMasterDataMgmtService.$inject = ['$http', 'config', '$q'];

    function myCompanyMasterDataMgmtService($http, config, $q) {

        return {
            readAllEntitiesByApplicationId: readAllEntitiesByApplicationId,
            readAllmodelAttrsBymodelId: readAllmodelAttrsBymodelId,
            readAllConnectionByTenantIdAppId: readAllConnectionByTenantIdAppId,
            readTableNameByDataSourcemodelId: readTableNameByDataSourcemodelId,
            readAllTableValueByTblNameColName: readAllTableValueByTblNameColName,
            readPrimaryKeyColumn: readPrimaryKeyColumn,
            selectExecuteRowCount: selectExecuteRowCount,
            insertExecuteDyanmicQuery: insertExecuteDyanmicQuery,
            updateExecuteDyanmicQuery: updateExecuteDyanmicQuery,
            deleteExecuteDyanmicQuery: deleteExecuteDyanmicQuery,
            selectPaginationExecuteDyanmicQuery: selectPaginationExecuteDyanmicQuery,
            selectFilterExecuteDyanmicQuery: selectFilterExecuteDyanmicQuery
        };

        function readAllEntitiesByApplicationId() {
            return $http.get(config.baseUrlApi + 'MasterDataRenderings/ReadAllEntitiesByAppId').then(function (results) {
                return results.data;
            });

        }

        function readAllmodelAttrsBymodelId(modelId) {
            return $http.get(config.baseUrlApi + 'MasterDataRenderings/ReadAllmodelAttrsBymodelId/' + modelId).then(function (results) {
                return results.data;
            });
        }

        function readAllConnectionByTenantIdAppId(tenantId) {
            return $http.get(config.baseUrlApi + 'Connection/GetConnectionCfgByTenantIdAppIdFor/'+tenantId).then(function (results) {
                return results.data;
            });
           
        }

        function readTableNameByDataSourcemodelId(modelId) {
            return $http.get(config.baseUrlApi + 'MasterDataRenderings/ReadTableNameBymodelId/' + modelId).then(function (results) {
                return results.data;
            });
        }

        function readAllTableValueByTblNameColName(tblNameColNameJsonParam) {

            var tblName = tblNameColNameJsonParam.tblName;
            var colName = tblNameColNameJsonParam.colName;
            var tenantId = tblNameColNameJsonParam.tenantId;
            var appId = tblNameColNameJsonParam.appId;

            return $http.get(config.baseUrlApi + 'MasterDataRenderings/ReadAllTableValueByTblNameColName?tblName=' + tblName + '&colName=' + colName + '&tenantId=' + tenantId + '&appId=' + appId).then(function (results) {
                return results.data;
            });
        }

        function readPrimaryKeyColumn(tenantId, tableSchemaName) {

            var json = {};
            json["tenantId"] = tenantId;
            json["tableSchemaName"] = tableSchemaName;

            return $http.post(config.baseUrlApi + 'MasterDataMgmts/ReadPrimaryColumn', json).then(function (results) {
                return results.data;
            });
        }

        function selectExecuteRowCount(jsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteSelectRowCount', jsonParam).then(function (results) {
                return results.data;
            });
        }

        function insertExecuteDyanmicQuery(dynamicAddRequestArrJsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteInsertQueryFor', dynamicAddRequestArrJsonParam).then(function (results) {
                return results.data;
            });
        }

        function updateExecuteDyanmicQuery(dynamicUpdateRequestArrJsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteUpdateQueryFor', dynamicUpdateRequestArrJsonParam).then(function (results) {
                return results.data;
            });
        }

        function deleteExecuteDyanmicQuery(deleteRequestArrJsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteDeleteQueryFor', deleteRequestArrJsonParam).then(function (results) {
                return results.data;
            });
        }

        function selectPaginationExecuteDyanmicQuery(jsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteSelectQueryPaginationFor', jsonParam).then(function (results) {
                return results.data;
            });
        }

        function selectFilterExecuteDyanmicQuery(jsonParam) {
            return $http.post(config.baseUrlApi + 'MasterDataRenderings/ExecuteSelectFilterQueryFor', jsonParam).then(function (results) {
                return results.data;
            });
        }
    }
})();