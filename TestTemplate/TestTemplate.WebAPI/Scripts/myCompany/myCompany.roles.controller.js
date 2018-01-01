(function () {
    'use strict';

    angular.module('erp.myCompany').controller('MyCompanyRolesCtrl', MyCompanyRolesCtrl);

    MyCompanyRolesCtrl.$inject = ['$scope', 'tenant', 'repo', 'kendoGridService'];

    function MyCompanyRolesCtrl($scope, tenant, repo, kendoGridService) {

        $scope.tenant = tenant;

        var gridMetaData = {
            name: 'Role',
            endPoints: {
                read: 'Role/ReadAllRoles',
                create: function (options) {
                    var params = options.data;
                    delete params.roleId;
                    repo.tenant.addTenantRole(params).then(function (data) {
                        return options.success(data);
                    }, function (data) {
                        return options.error(data);
                    });
                },
                update: function (options) {
                    var params = options.data;
                    params.id = options.roleId;
                    delete params.tenantRoleId;
                    repo.tenant.updateTenantRole(params).then(function (data) {
                        data.roleId = data.id;
                        return options.success(data);
                    }, function (data) {
                        return options.error(data);
                    });
                },
                destroy: function (options) {
                    var params = options.data;
                    repo.tenant.deleteTenantRole(params).then(function (data) {
                        return options.success(data);
                    }, function (data) {
                        return options.error(data);
                    });
                }
            },
            id: 'roleId',
            fields: [
              { field: 'roleName', model: { validation: { required: true, maxlength: 50 } } },
              { field: 'remarks', model: { validation: { required: false, maxlength: 500 } } }
            ]
        };

        $scope.roleGridByTenant = kendoGridService.getGridSettings(gridMetaData);

    }
})();