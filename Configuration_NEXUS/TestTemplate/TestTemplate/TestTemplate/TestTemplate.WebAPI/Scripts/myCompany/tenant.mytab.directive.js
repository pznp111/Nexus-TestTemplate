(function () {

    'use strict';

    angular.module('erp')
        .directive('myTabDirective',
            function myTabDirective() {
                return {
                    templateUrl: 'Scripts/myCompany/mytab.directive.template.html',
                    scope: {

                    },
                    controller: function (kendoGridService, myCompanyMasterDataMgmtService, notificationService) {
                        var vm = this;
                        var fieldsArr = [];
                        var fieldObj = { model: { validation: { required: false } } };
                        var modelObj = {};

                        vm.btnSearch = function () {
                            $('#kendoTabGrid-' + vm.entityId).data('kendoGrid').dataSource.read();
                            $('#kendoTabGrid-' + vm.entityId).data('kendoGrid').refresh();

                        }

                        vm.btnReset = function () {
                            vm.selectedColumn = "";
                            vm.searchWord = "";
                        }

                        initLoad(vm.entityId);

                        function asynLoad(tenantIdParam, currAttrNameParam, currDatasourceEntityParam) {
                            return myCompanyMasterDataMgmtService.readTableNameByDataSourceEntityId(currDatasourceEntityParam)
                                .then(function (results) {
                                    var entityName = results;
                                    var selectAllJson = {
                                        tenantId: tenantIdParam,
                                        tblName: entityName,
                                        colName: currAttrNameParam
                                    };

                                    return myCompanyMasterDataMgmtService.readAllTableValueByTblNameColName(selectAllJson)
                                        .then(function (results) {
                                            return results;
                                        });
                                });
                        }

                        function initLoad(entityId) {
                            var labelList = [];
                            var labelObj = {};

                            myCompanyMasterDataMgmtService.readTableNameByDataSourceEntityId(entityId)
                                 .then(function (tableNameResults) {
                                     myCompanyMasterDataMgmtService.readPrimaryKeyColumn(vm.tenantId, tableNameResults)
                                       .then(function (primaryKeyResult) {
                                           myCompanyMasterDataMgmtService.readAllEntityAttrsByEntityId(entityId)
                                             .then(function (results) {
                                                 for (var i = 0; i < results.length; i++) {

                                                     labelObj = {};
                                                     labelObj.name = results[i].label;
                                                     labelList.push(labelObj);

                                                     if (results[i].isActive) {

                                                         if (results[i].name !== 'IsActive') {

                                                             fieldObj = {};
                                                             modelObj = {};

                                                             if (results[i].length != null || results[i].length != '')
                                                                 fieldObj.maxLength = results[i].length;

                                                             fieldObj.field = results[i].controlid;
                                                             fieldObj.title = results[i].label;

                                                             modelObj.validation = { required: results[i].isRequired };

                                                             if (results[i].dataType === 'Integer' ||
                                                                 results[i].dataType === 'Float' ||
                                                                 results[i].dataType === 'Numberic') {
                                                                 fieldObj.type = 'number';
                                                                 fieldObj.maxLength = 5;
                                                             } else if (results[i].dataType === 'Boolean') {
                                                                 fieldObj.type = 'boolean';
                                                             } else if (results[i].dataType === 'Datetime') {
                                                                 fieldObj.type = 'date';
                                                             } else {
                                                                 fieldObj.type = 'text'; // String, GUID
                                                             }


                                                             fieldObj.controlType = results[i].control;
                                                             fieldObj.controlId = results[i].controlid;


                                                             if (fieldObj.type === 'date') {
                                                                 fieldObj.format = '{0:dd-MM-yyyy}';
                                                                 modelObj.type = 'date';
                                                             } else if (fieldObj.type === 'number') {
                                                                 fieldObj.editor = kendoGridService.editors.numeric;
                                                             }

                                                             fieldObj.model = modelObj;
                                                             if (!results[i].isAutoIncrement) { // by client config
                                                                 fieldsArr.push(fieldObj);
                                                             }


                                                         }
                                                     }
                                                 }

                                                 vm.columnList = labelList;
                                                 vm.rowCount = 0;

                                                 function asyncRowCount() {
                                                     myCompanyMasterDataMgmtService
                                                            .selectExecuteRowCount({
                                                                   keyId: entityId,
                                                                   tenantId: vm.tenantId
                                                                })
                                                               .then(function (results) {
                                                                   vm.rowCount = results;
                                                               });
                                                 }


                                                 asyncRowCount();

                                                 var gridSettings = {
                                                     name: 'MasterData',
                                                     id: primaryKeyResult,
                                                     serverPaging: true,
                                                     totalRowCount: function (d) {
                                                         return vm.rowCount;
                                                     },
                                                     endPoints: {
                                                         read: function (options) {
                                                             var paginationData = {
                                                                 pageNumber: options.data.page,
                                                                 pageSize: options.data.pageSize
                                                             };

                                                             if (vm.searchWord == "" || typeof vm.searchWord == 'undefined') {
                                                                 myCompanyMasterDataMgmtService
                                                                     .selectPaginationExecuteDyanmicQuery({
                                                                         keyId: entityId,
                                                                         tenantId: vm.tenantId,
                                                                         pageNumber: paginationData.pageNumber,
                                                                         pageSize: paginationData.pageSize
                                                                     })
                                                                     .then(function (results) {
                                                                         return options.success(results);
                                                                     });
                                                             } else {
                                                                 myCompanyMasterDataMgmtService
                                                                     .selectFilterExecuteDyanmicQuery({
                                                                         keyId: entityId,
                                                                         tenantId: vm.tenantId,
                                                                         columnName: vm.selectedColumn,
                                                                         columnValue: vm.searchWord
                                                                     })
                                                                     .then(function (results) {
                                                                         return options.success(results);
                                                                     });
                                                             }


                                                         },
                                                         create: function (options) {
                                                             var paramJson = { keyId: entityId, tenantId: vm.tenantId };
                                                             $.each(options.data,
                                                                 function (key, value) {
                                                                     if (key !== primaryKeyResult && key !== 'Id') {
                                                                         paramJson[key] = value;
                                                                     }
                                                                 });
                                                             myCompanyMasterDataMgmtService.insertExecuteDyanmicQuery(paramJson)
                                                                 .then(function (results) {
                                                                     // need to modified.
                                                                     notificationService.success('Successfully insert row');
                                                                     asyncRowCount();
                                                                     //$window.location.reload();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').dataSource.read();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').refresh();
                                                                     return options.success(true);
                                                                 });

                                                         },
                                                         update: function (options) {
                                                             var paramJson = { keyId: entityId, tenantId: vm.tenantId };
                                                             $.each(options.data,
                                                                 function (key, value) {
                                                                     if (key === primaryKeyResult) {
                                                                         var objPrimary = {};
                                                                         objPrimary[primaryKeyResult] = value;
                                                                         paramJson["primaryKey"] = objPrimary;

                                                                     } else {
                                                                         paramJson[key] = value;
                                                                     }

                                                                 });

                                                             myCompanyMasterDataMgmtService.updateExecuteDyanmicQuery(paramJson)
                                                                 .then(function (results) {
                                                                     // need to modified.
                                                                     notificationService.success('Successfully update row');
                                                                     asyncRowCount();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').dataSource.read();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').refresh();
                                                                     return options.success(true);
                                                                 });
                                                         },
                                                         destroy: function (options) {
                                                             var paramJson =
                                                                 { keyId: entityId, tenantId: vm.tenantId };
                                                             $.each(options.data,
                                                                 function (key, value) {
                                                                     if (key === primaryKeyResult) {
                                                                         var objPrimary = {};
                                                                         objPrimary[primaryKeyResult] = value;
                                                                         paramJson["primaryKey"] = objPrimary;
                                                                     }
                                                                 });

                                                             myCompanyMasterDataMgmtService.deleteExecuteDyanmicQuery(paramJson)
                                                                 .then(function (results) {
                                                                     // need to modified.
                                                                     notificationService.success('Successfully delete row');
                                                                     asyncRowCount();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').dataSource.read();
                                                                     $("#kendoTabGrid-" + entityId).data('kendoGrid').refresh();
                                                                     return options.success(true);
                                                                 });
                                                         },
                                                     },
                                                     fields: [],

                                                 };

                                                 for (var i = 0; i < results.length; i++) {

                                                     if (results[i].dataSourceEntity != null &&
                                                         results[i].dataSourceEntity !== '00000000-0000-0000-0000-000000000000' &&
                                                         results[i].control === 'DropdownList') {
                                                         results[i].type = 'datasource';
                                                     } else if (results[i].defaultValue != null &&
                                                         results[i].control === 'DropdownList') {
                                                         results[i].type = 'defaultvalue';
                                                     } else {
                                                         results[i].type = 'normaltext';
                                                     }
                                                 }

                                                 var populateElementArrForDataSource = [];
                                                 var populateElementArrForDefaultValue = [];

                                                 for (var x = 0; x < results.length; x++) {

                                                     if (results[x].type === 'datasource') {

                                                         gridSettings.editable = {
                                                             createAt: 'bottom',
                                                             windows: { title: 'Add New Records' },
                                                             template: '#masterPopupTemplate'
                                                         };

                                                         var currentColumnName = results[x].name;
                                                         var currentControlId = results[x].controlid;
                                                         var currentDisplayMember = results[x].displayMember;
                                                         var currentValueMember = results[x].valueMember;

                                                         asynLoad(vm.tenantId, results[x].name, results[x].dataSourceEntity)
                                                             .then(function (dataSourceResult) {
       
                                                                 var populateElementObj = {};

                                                                 populateElementObj.columnName = currentColumnName;
                                                                 populateElementObj.controlId = currentControlId;
                                                                 populateElementObj.displayName = currentDisplayMember;
                                                                 populateElementObj.valueName = currentValueMember;
                                                                 populateElementObj.resultsArr = dataSourceResult;
                                                                 populateElementArrForDataSource.push(populateElementObj);

                                                             });
                                                     } else if (results[x].type === 'defaultvalue') {

                                                         gridSettings.editable = {
                                                             createAt: 'bottom',
                                                             windows: { title: 'Add New Records' },
                                                             template: '#masterPopupTemplate'
                                                         };

                                                         var splitDefaultValue = results[x].defaultValue.split(',');
                                                         var currJsonSplitArr = [];

                                                         if (results[x].dataType === 'bit') {
                                                             for (var j = 0; j < splitDefaultValue.length; j++) {
                                                                 var obj = {};
                                                                 if (splitDefaultValue[j] === 0)
                                                                     obj[results[x].name] = false;
                                                                 else if (splitDefaultValue[j] == 1)
                                                                     obj[results[x].name] = true;
                                                                 currJsonSplitArr.push(obj);

                                                             }
                                                         } else {
                                                             for (var j = 0; j < splitDefaultValue.length; j++) {
                                                                 var obj = {};
                                                                 obj[results[x].name] = splitDefaultValue[j];
                                                                 currJsonSplitArr.push(obj);
                                                             }
                                                         }

                                                         var populateElementObj = {};
                                                         populateElementObj.columnName = results[x].name;
                                                         populateElementObj.controlId = results[x].controlid;
                                                         populateElementObj.resultsArr = currJsonSplitArr;
                                                         populateElementArrForDefaultValue.push(populateElementObj);

                                                     } else {

                                                         gridSettings.editable = {
                                                             createAt: 'bottom',
                                                             windows: { title: 'Add New Records' },
                                                             template: '#masterPopupTemplate'
                                                         };
                                                     }
                                                 }

                                                 vm.currentGridColumn = fieldsArr;
                                                 vm.currentGridId = entityId;
                                                 gridSettings.edit = function (e) {

                                                     $(e.container).find('input[name="' + primaryKeyResult + '"]').prop("disabled", true).addClass("k-state-disabled");

                                                     for (var a = 0; a < results.length; a++) {
                                                         if (results[a].dataType === 'Integer' ||
                                                             results[a].dataType === 'Float' ||
                                                             results[a].dataType === 'Numberic') {
                                                             kendoGridService.helpers.digitize($('input[name="' + results[a].controlid + '"]'));
                                                         }
                                                     }

                                                     if (populateElementArrForDataSource.length > 0) {
                                                         for (var i = 0; i < populateElementArrForDataSource.length; i++) {
                                                             var key = Object.keys(populateElementArrForDataSource[i].resultsArr[i]);
                                                             $('#' + populateElementArrForDataSource[i].controlId).kendoDropDownList({
                                                                 optionLabel: 'Select ',
                                                                 dataTextField: key[0],
                                                                 dataValueField: key[0],
                                                                 dataSource: populateElementArrForDataSource[i].resultsArr,
                                                             }).data('kendoDropDownList');

                                                             $('[aria-owns^="' + populateElementArrForDataSource[i].controlId + '"]')
                                                                 .removeClass('k-textbox k-input');
                                                         }
                                                     }

                                                     if (populateElementArrForDefaultValue.length > 0) {
                                                         for (var i = 0; i < populateElementArrForDefaultValue.length; i++) {
                                                             $('#' + populateElementArrForDefaultValue[i].controlId).kendoDropDownList({
                                                                 optionLabel: 'Select ',
                                                                 dataTextField: populateElementArrForDefaultValue[i].columnName,
                                                                 dataValueField: populateElementArrForDefaultValue[i].columnName,
                                                                 dataSource: populateElementArrForDefaultValue[i].resultsArr,
                                                             }).data('kendoDropDownList');
                                                             $('[aria-owns^="' + populateElementArrForDefaultValue[i].controlId + '"]')
                                                                 .removeClass('k-textbox k-input');
                                                         }
                                                     }

                                                 };
                                                 gridSettings.fields = fieldsArr;
                                                 gridSettings.pageable = {
                                                     refresh: true,
                                                     pageSizes: true,
                                                     buttonCount: 5,
                                                     change: function (e) {
                                                         console.log(e);
                                                     }
                                                 };
                                                 gridSettings.dataBound = function (e) {
                                                     var grid = e.sender;
                                                     var items = grid.items();
                                                     var itemsToSelect = [];
                                                     //console.log(items);
                                                 };

                                                 vm.tabgrid = kendoGridService.getGridSettings(gridSettings);
                                             });
                                       });
                                 });
                        }

                    },
                    controllerAs: 'tabsCtrl',
                    bindToController: {
                        entityId: '@',
                        tenantId: '@'
                    }
                };
            });
})();