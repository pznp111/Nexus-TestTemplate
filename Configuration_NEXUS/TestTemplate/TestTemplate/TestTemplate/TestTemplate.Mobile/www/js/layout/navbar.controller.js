﻿(function () {
    'use strict';

    angular.module('erp.layout').controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = ['$scope', '$state', '$rootScope', 'authService'];

    function NavbarCtrl($scope, $state, $rootScope, authService) {
        $scope.logOut = function () {
            authService.logOut();
            $state.go('login');
        };

        $scope.myAccount = function () {
            $state.go('myAccount');
        };

        $scope.currentUser = authService.currentUser;
        $scope.topMenuBar = [];

        $rootScope.$on('authService:siteMapChanged', function siteMapChanged(event, value) {
            $scope.topMenuBar = _.filter(authService.currentUser.siteMap,
                function (siteMap) {
                    return siteMap.siteMapParentId === '00000000-0000-0000-0000-000000000000' && siteMap.showInMenu;
                });

            //$scope.topMenuBar[0].tag = JSON.parse($scope.topMenuBar[0].tag);

            _.forEach($scope.topMenuBar, function (value, key) {
                if (typeof value.tag === 'string') {
                    try {
                        value.tag = JSON.parse(value.tag);
                    } catch (e) {
                    }

                }
            });
        });

    }
})();