(function () {
    'use strict';

    angular.module('erp.myCompany', [])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {

        $stateProvider
            .state('myCompany',
            {
                url: '/my-company',
                templateUrl: 'Scripts/myCompany/myCompany.html',
                controller: 'MyCompanyCtrl',
                controllerAs: 'myCompanyCtrl',
                resolve: {
                    tenant: function ($stateParams, repo) {
                        return repo.tenant.getTenant();
                    }
                },
                ncyBreadcrumb: {
                    label: '{{tenant.name}}'
                }
            })
            .state('myCompany.roles',
            {
                url: '/roles',
                templateUrl: 'Scripts/myCompany/myCompany.roles.html',
                controller: 'MyCompanyRolesCtrl',
                controllerAs: 'myCompanyRoles',
                ncyBreadcrumb: {
                    label: 'Roles',
                    parent: 'myCompany'
                }
            })
            .state('myCompany.rolesSitemap',
            {
                url: '/role-sitemap',
                templateUrl: 'Scripts/myCompany/myCompany.rolesSitemap.html',
                controller: 'MyCompanyRolesSiteMapCtrl',
                controllerAs: 'myCompanyRolesSitemap',
                resolve: {
                    roles: function ($stateParams, repo) {
                        return repo.tenant.readAllTenantRoles()
                            .then(function (roles) {
                                var roleUniqueId = 'r_';
                                var index = 1;
                                _.forEach(roles,
                                    function (role) {
                                        role['uniqueId'] = roleUniqueId + index;
                                        index++;
                                    });
                                return roles;
                            });
                    }
                },
                ncyBreadcrumb: {
                    label: 'Roles Sitemap Mapping',
                    parent: 'myCompany'
                }
            })
            .state('myCompany.users',
            {
                url: '/users',
                templateUrl: 'Scripts/myCompany/myCompany.users.html',
                controller: 'MyCompanyUsersCtrl',
                controllerAs: 'myCompanyUsers',
                ncyBreadcrumb: {
                    label: 'Users',
                    parent: 'myCompany'
                }
            })
            //.state('erp.splitReport',
            //{
            //    url: '/splitReport',
            //    templateUrl: 'Scripts/splitReport/splitReport.html',
            //    controller: 'SplitReportCtrl',
            //    controllerAs: 'splitReportCtrl',
            //    ncyBreadcrumb: {
            //        label: 'WO Split Report',
            //        parent: 'myCompany'
            //    }
            //})

            .state('myCompany.masterdetail',
            {
                url: '/masterdetail',
                templateUrl: 'Scripts/myCompany/myCompany.masterdatamgmtdetail.html',
                controller: 'MyCompanyMasterDataMgmtDetailCtrl',
                controllerAs: 'MyCompanyMasterDataMgmtDetailCtrls',
                ncyBreadcrumb: {
                    label: 'Master Data Mgmt',
                    parent: 'myCompany'
                }
            });
    }
})();