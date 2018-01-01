(function () {
    'use strict';

    angular.module('erp.myCompany').controller('MyCompanyUsersCtrl', MyCompanyUsersCtrl);

    MyCompanyUsersCtrl.$inject = ['$scope', '$http', 'config', 'tenant', 'repo', 'kendoGridService', 'notificationService'];

    function MyCompanyUsersCtrl($scope, $http, config, tenant, repo, kendoGridService, notificationService) {

        $scope.customStyle = {};
        window.remainingCount = 0;

        function disabledButton(flag) {
            if (!flag) {
                $("a.k-button.k-grid-add").addClass("k-state-disabled").removeClass("k-grid-add")
                  .on("click", function (e) { e.preventDefault(); });
            }
            else {
                $("a.k-button.k-state-disabled").addClass("k-grid-add").removeClass("k-state-disabled");
            }
        }

        function checkLicenseCountFunc() {
            repo.tenant.checkLicenseCount().then(function (data) {
                $scope.noLicenseCount = data.licenseCount;
                $scope.noActiveUser = data.activeUserCount;

                window.remainingCount = parseInt(data.licenseCount) - parseInt(data.activeUserCount);
                if (window.remainingCount > 0) {
                    $scope.noRemainingLicense = window.remainingCount;
                } else {
                    $scope.noRemainingLicense = 0;
                }

                if (window.remainingCount > 5) {
                    $scope.customStyle.style = { "color": "green" };
                }
                else {
                    $scope.customStyle.style = { "color": "red" };
                }

                if (window.remainingCount === 0 || window.remainingCount < 0) {
                    disabledButton(false);
                }
                else {
                    disabledButton(true);
                }

            });
        }


        $scope.tenant = tenant;

        var userGridMetaData = {
            name: 'FormAuthUser',
            controller: 'User',
            endPoints: {
                read: function (options) {
                    var webapi = new kendo.data.transports.webapi({ prefix: "" });
                    var params = webapi.parameterMap(options.data);

                    repo.tenant.readPageableUsers(params).then(function (data) {
                        _(data.data.data).forEach(function (user) {
                            _(user.roles).forEach(function (role) {
                                role.roleId = role.id;
                            });
                        });
                        return options.success(data.data);
                    }, function (data) {
                        return options.error(data);
                    });
                },
                create: function (options) {
                    var params = options.data;
                    repo.tenant.addTenantUser(params).then(function (data) {
                        _(data.roles).forEach(function (role) {
                            role.roleId = role.id;
                        });
                        checkLicenseCountFunc();
                        return options.success(data);
                    }, function (data) {
                        data.retainParentView = true;
                        return options.error(data);
                    });
                },
                update: function (options) {
                    var params = options.data;
                    repo.tenant.updateTenantUser(params).then(function (data) {
                        data.userId = data.userId;
                        data.emailId = data.emailId;
                        _(data.roles).forEach(function (role) {
                            role.roleId = role.id;
                        });
                        checkLicenseCountFunc();
                        return options.success(data);
                    }, function (data) {
                        data.retainParentView = true;
                        return options.error(data);
                    });
                },
                destroy: function (options) {
                    var params = options.data;
                    repo.tenant.deleteTenantUser(params).then(function (data) {
                        checkLicenseCountFunc();
                        return options.success(data);
                    }, function (data) {
                        return options.error(data);
                    });
                }
            },
            id: 'userId',
            fields: [
              {
                  field: 'userName',
                  title: 'Name',
                  //template: '<a ui-sref="user.details({id:\'#: userId #\'})">#: userName #</a>',
                  model: { validation: { required: true, maxlength: 50 } }
              },
              {
                  field: 'roles',
                  sortable: false,
                  template: '# if (roles) { # #= _.map(roles, function(obj){ return obj.roleName; }).join(", ") #  #}#',
                  control: {
                      type: 'multiSelect',
                      parent: {
                          dataSource: 'Role/ReadAllRoles',
                          valueField: 'roleId',
                          textField: 'roleName',
                          label: 'Select Roles...'
                      }
                  },
                  editor: kendoGridService.editors.multiSelect,
                  filterable: {
                      ui: kendoGridService.filters.dropDown
                  },
                  model: { defaultValue: { roleId: '', roleName: '' }, validation: { required: true } }
              },
              { field: 'loginId', model: { validation: { required: true, maxlength: 20, alphaNumericPeriod: kendoGridService.validations.alphaNumericPeriod } } },
              { field: 'phoneNumber', editor: kendoGridService.editors.numeric, model: { validation: { maxlength: 20 } } },
              { field: 'emailId', model: { validation: { email: true, required: true, maxlength: 50 } } },
              { field: 'remarks', model: { validation: { required: false, maxlength: 500 } } }
            ],
            dataBound: function () {
                checkLicenseCountFunc();
            },
            edit: function (e) {
                if (e.model.isNew() === false) {
                    $(e.container).find('input[name="loginId"]').prop("disabled", true).addClass("k-state-disabled");
                }
            }
        };
        var gridSettings = kendoGridService.getGridSettings(userGridMetaData);
        gridSettings.dataSource.serverPaging = true;
        gridSettings.dataSource.serverFiltering = true;
        gridSettings.dataSource.serverSorting = true;
        gridSettings.dataSource.schema = $.extend(gridSettings.dataSource.schema, kendo.data.schemas.webapi, { data: "data", total: "total", errors: "errors" });
        $scope.userGridByTenant = gridSettings;

        $scope.filterInit = function (e) {
            if (e.field == 'roles') {
                e.container.data('kendoPopup').bind("open", function () {
                    e.container.find('.k-filter-help-text').hide();
                    var operatorDropdown = e.container.find('[data-role=dropdownlist]:eq(0)');
                    var beginOperator = operatorDropdown.data('kendoDropDownList');
                    beginOperator.value('eq');
                    beginOperator.trigger('change');
                    operatorDropdown.parent().hide();
                });
            }

        };

    }
})();