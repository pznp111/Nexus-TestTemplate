(function () {
    'use strict';

    angular.module('erp.myCompany').controller('MyCompanyRolesSiteMapCtrl', MyCompanyRolesSiteMapCtrl);

    MyCompanyRolesSiteMapCtrl.$inject = ['$scope', 'tenant', 'authService', 'roles', 'repo', 'kendoGridService'];

    function MyCompanyRolesSiteMapCtrl($scope, tenant, authService, roles, repo, kendoGridService) {

        $scope.tenant = tenant;

        $scope.columnHeaderRoles = {};

        $scope.submitButtonDisabled = true;

        activate();

        function activate() {
            _.forEach(roles,
                function (role) {
                    $scope.columnHeaderRoles[role.uniqueId] = { selectAll: false };
                });
        }

        var treelist = $('[options="applicationSiteMapGrid"]').data('kendoTreeList');

        $scope.applicationSiteMapGrid = {
            dataSource: {
                transport: {
                    read: function (options) {
                        repo.tenant.getSiteMapRoleMappings().then(function (siteMaps) {
                            _(siteMaps).forEach(setRolesAsProperties);
                            return options.success(siteMaps);
                        });
                    }
                },
                schema: {
                    model: {
                        id: 'id',
                        parentId: 'siteMapParentId',
                        fields: {
                            id: { type: 'string' },
                            siteMapParentId: { defaultValue: '00000000-0000-0000-0000-000000000000' }
                        }
                    }
                }
            },
            columnMenu: true,
            resizable: true,
            columns: getColumns(roles),
            dataBound: function (e) {
                treelist = $('[options="applicationSiteMapGrid"]').data('kendoTreeList');
            }
        };


        $scope.updatePermission = updatePermission;
        $scope.updateRolePermission = updateRolePermission;
        $scope.updateChanges = updateChanges;
        $scope.cancelChanges = cancelChanges;


        $scope.submitButtonDisabled = true;

        function updatePermission(id, column) {
            var chagedItem = _.find(treelist.dataSource._data, { 'id': id });
            var siteMapRoleMap = chagedItem[column];
            changeCheckBoxValue(siteMapRoleMap);
            $scope.submitButtonDisabled = true;
            travelThroughSiteMapAndRolesThen(resetUpdateButtonIfNoChange);
            treelist.refresh();
        }

        function updateRolePermission(roleId) {
            _.forEach(treelist.dataSource._data, function (siteMap) {
                if (siteMap[roleId].get('value') !== $scope.columnHeaderRoles[roleId].selectAll) {
                    changeCheckBoxValue(siteMap[roleId]);
                }
                $scope.submitButtonDisabled = true;
                travelThroughSiteMapAndRolesThen(resetUpdateButtonIfNoChange);
            });
            treelist.refresh();
        }

        function updateChanges() {
            var permissionGiven = _.reduce(treelist.dataSource._data, getPermissionGivenSiteMapAndItsRoles, []);
            var permissionRemoved = _(treelist.dataSource._data)
                                        .map(getArrysOfPermissionRemovedSiteMapRoleIds)
                                        .flatten()
                                        .value();

            repo.tenant.updateSiteRoleMapping(permissionGiven, permissionRemoved).then(function (returnedValues) {
                travelThroughSiteMapAndRolesThen(resetIsChangedProperty);
                treelist.refresh();
                $scope.submitButtonDisabled = true;
                if (!_.isEmpty(permissionGiven)) {
                    _.forEach(returnedValues[0].data, setUpdatedSiteMapRoleId);
                }
                authService.updateSiteMap();
            });
        }

        function cancelChanges() {
            travelThroughSiteMapAndRolesThen(resetChanges);
            treelist.refresh();
            $scope.submitButtonDisabled = true;

        }

        function resetUpdateButtonIfNoChange(siteMap, role) {
            var siteMapRoleMap = siteMap[role.uniqueId];
            if (siteMapRoleMap.isChanged) {
                $scope.submitButtonDisabled = false;
            }
        }

        function resetChanges(siteMap, role) {
            var siteMapRoleMap = siteMap[role.uniqueId];
            if (siteMapRoleMap.isChanged) {
                changeCheckBoxValue(siteMapRoleMap);
            }
        }

        function changeCheckBoxValue(siteMapRoleMap) {
            siteMapRoleMap.value = !siteMapRoleMap.value;
            siteMapRoleMap.isChanged = !siteMapRoleMap.isChanged;
            siteMapRoleMap.siteMapRoleId = siteMapRoleMap.siteMapRoleId;
        }

        function getColumns(roles) {
            var columns = [{ field: 'siteMapTitle', title: 'Site Map', locked: true, lockable: false, width: 200 }];
            _.forEach(roles, function (role) {
                var column = {
                    field: role.uniqueId,
                    width: 150,
                    headerTemplate: "  <input type='checkbox' ng-model='columnHeaderRoles[\"" + role.uniqueId + "\"].selectAll' ng-click='updateRolePermission(\"" + role.uniqueId + "\")'/> " + role.roleName,
                    template: "<span  ng-class=\"{'label label-info': #:" + role.uniqueId + ".isChanged #}\"   > <input type='checkbox'  ng-checked='#: " + role.uniqueId + ".value #' ng-click='updatePermission(\"#: id #\",\"" + role.uniqueId + "\")'/> </span >"
                };
                columns.push(column);
            });
            return columns;
        }

        function setRolesAsProperties(siteMap) {
            _(roles).forEach(setDefautRoleValues(siteMap));
            _(siteMap.roles).forEach(setPermissionGivenRoles(siteMap));
        }

        function setPermissionGivenRoles(siteMap) {
            return function (role) {
                var uniqueId = _.find(roles, { 'roleId': role.roleId }).uniqueId;
                siteMap[uniqueId].value = true;
                siteMap[uniqueId].siteMapRoleId = role.id;
            }
        }

        function setDefautRoleValues(siteMap) {
            return function (role) {
                siteMap[role.uniqueId] = { value: false, isChanged: false, siteMapRoleId: '' };
            };
        }

        function setUpdatedSiteMapRoleId(permissionGivenSiteMap) {

            var siteMap = _.find(treelist.dataSource._data, { 'id': permissionGivenSiteMap.id });

            _.forEach(permissionGivenSiteMap.roles,
                function (permissionGivenRole) {
                    var uniqueId = _.find(roles, { 'roleId': permissionGivenRole.roleId }).uniqueId;
                    siteMap[uniqueId].siteMapRoleId = permissionGivenRole.id;
                });
            treelist.refresh();
        }

        function resetIsChangedProperty(siteMap, role) {
            siteMap[role.uniqueId].isChanged = false;
        }

        function getArrysOfPermissionRemovedSiteMapRoleIds(siteMap) {
            return _(roles)
                .filter(function (role) {
                    return siteMap[role.uniqueId].isChanged && !siteMap[role.uniqueId].value;
                })
                .map(function (role) {
                    return siteMap[role.uniqueId].siteMapRoleId;
                })
                .value();
        }

        function getPermissionGivenSiteMapAndItsRoles(memo, siteMap) {
            var changedRoles = _(roles)
                .filter(permissionGivenRoles(siteMap))
                .map('roleId')
                .value();

            if (!_.isEmpty(changedRoles)) {
                memo.push({
                    siteMapId: siteMap.id,
                    roleIds: changedRoles
                });
            }
            return memo;
        }

        function permissionGivenRoles(siteMap) {
            return function (role) {
                return siteMap[role.uniqueId].isChanged && siteMap[role.uniqueId].value;
            };
        }
        function travelThroughSiteMapAndRolesThen(actionMethod) {
            _.forEach(treelist.dataSource._data, function (siteMap) {
                _.forEach(roles, function (role) {
                    actionMethod(siteMap, role);
                });
            });
        }
    }
})();