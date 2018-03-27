(function () {
    'use strict';
    angular.module('erp.repository').service('tenantService', tenantService);
    tenantService.$inject = ['$http', 'config', '$q'];

    function tenantService($http, config, $q) {

        return {
            getTenant : getTenant,
            getApplications : getApplications,
            getSiteMapRoleMappings : getSiteMapRoleMappings,
            addTenantRole : addTenantRole,
            updateTenantRole : updateTenantRole,
            deleteTenantRole : deleteTenantRole,
            readAllTenantRoles : readAllTenantRoles,
            addTenantUser : addTenantUser,
            updateTenantUser : updateTenantUser,
            deleteTenantUser : deleteTenantUser,
            checkLicenseCount : checkLicenseCount,
            readAllTenantUsers: readAllTenantUsers,
            readPageableUsers: readPageableUsers,
            updateSiteRoleMapping : updateSiteRoleMapping,
            getConfigs: getConfigs,
            updateConfig: updateConfig
        };

        function getTenant() {

            
           // return $http.get(config.baseUrlApi + 'Tenant/ReadTenant').then(function (results) {
            return $http.get('http://localhost:49524/api/HMLVTS/GenerateMcID').then(function (results) {
                console.log('getTenant', results);
                return results.data;
            });
        }

        function getApplications(id) {
            return $http.get(config.baseUrlApi + 'Application/ReadAllApplications').then(function (results) {
                console.log('getApplications', results);
                return results.data;
            });
        }
        function getSiteMapRoleMappings() {
            return $http.get(config.baseUrlApi + 'SiteMap/ReadAllSiteMaps').then(function (results) {
                console.log('getSiteMapRoleMappings', results);
                return results.data;
            });
        }

        // Roles        

        function addTenantRole(tenantRole) {
            return $http.post(config.baseUrlApi + 'Tenant/AddRole', tenantRole).then(function (results) {
                console.log('getSiteMapRoleMappings', addTenantRole);
                return results.data;
            });
        }

        function updateTenantRole(tenantRole) {
            tenantRole.id = tenantRole.roleId;
            return $http.post(config.baseUrlApi + 'Role/UpdateRole', tenantRole).then(function (results) {
                return results.data;
            });
        }

        function deleteTenantRole(tenantRole) {
            return $http.delete(config.baseUrlApi + 'Tenant/DeleteRole/' + tenantRole.roleId ).then(function (results) {
                return results.data;
            });
        }

        function readAllTenantRoles() {
            return $http.get(config.baseUrlApi + 'Role/ReadAllRoles').then(function (results) {
                console.log('readAllTenantRoles', addTenantRole);
                return results.data;
            });
        }

        // Users

        function addTenantUser(tenantUser) {
            
            var user = {};
            user.UserName = tenantUser.userName;
            user.LoginId = tenantUser.loginId;
            user.PhoneNumber = tenantUser.phoneNumber;
            user.Email = tenantUser.emailId;
            user.Remarks = tenantUser.remarks;
            user.TenantId = tenantUser.tenantId;
            user.RoleIds = _.map(tenantUser.roles, function (obj) { return obj.roleId; });

            return $http.post(config.baseUrlApi + 'Tenant/AddUser', user).then(function (results) {
                return results.data;
            });
        }

        function updateTenantUser(tenantUser) {

            var user = {};
            user.UserName = tenantUser.userName;
            user.UserId = tenantUser.userId;
            user.LoginId = tenantUser.loginId;
            user.PhoneNumber = tenantUser.phoneNumber;
            user.Email = tenantUser.emailId;
            user.Remarks = tenantUser.remarks;
            user.TenantId = tenantUser.tenantId;
            user.RoleIds = _.map(tenantUser.roles, function (obj) { return obj.roleId; });

            return $http.post(config.baseUrlApi + 'Tenant/UpdateUser', user).then(function (results) {
                return results.data;
            });
        }

        function deleteTenantUser(tenantUser) {
            return $http.delete(config.baseUrlApi + 'Tenant/DeleteUser/' + tenantUser.userId).then(function (results) {
                return results.data;
            });
        }

        function checkLicenseCount()
        {
            return $http.get(config.baseUrlApi + 'License/CheckAllLicenseCount').then(function (results) {
                return results.data;
            });
        }

        function readAllTenantUsers() {
            return $http.get(config.baseUrlApi + 'User/ReadAllUsers').then(function (results) {
                return results.data;
            });
        }

        function readPageableUsers(params) {
            return $http.get(config.baseUrlApi + 'User/ReadPageableUsers', { params: params })
                .then(function (results) {
                    return results;
                });
        }

        // Sitemap Role Mapping

        function updateSiteRoleMapping(permissionGiven, permissionRemoved) {
            var request = [];
            if (!_.isEmpty(permissionGiven)) {
                request.push($http.post(config.baseUrlApi + 'SiteMap/AddSiteMapRole', permissionGiven));
            }
            if (!_.isEmpty(permissionRemoved)) {

                request.push($http.post(config.baseUrlApi + 'SiteMap/DeleteSiteMapRole', { siteMapRoleIds: permissionRemoved }));
            }
            return $q.all(request);
        }

        // Configs

        function getConfigs(appId) {
            return $http.get(config.baseUrlApi + 'Config/ReadAllTenantConfigsByApplicationId/' + appId).then(function (results) {
                return results.data;
            });
        }

        function updateConfig(params) {
            return $http.post(config.baseUrlApi + 'Config/UpdateConfigByTypeId', params).then(function (results) {
                return results.data;
            });
        }
       
    }
})();