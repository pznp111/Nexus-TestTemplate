(function () {
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

       // console.log("test",authService.currentUser.siteMap);

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


        //$scope.toggleleft = function() {
            
        //    $("#left-side-bar").toggle();

        //    var margin = $("#main-container-page").css("margin-left");
        //    if(margin == "260px"){
        //        $("#main-container-page").css("margin-left","80px")
        //    } else if((margin == "80px")){
        //        $("#main-container-page").css("margin-left","260px")
        //    }
        //   // alert(margin);
        //}

        $scope.toggleleft = function () {
            //alert("toggle");
            $("#sidebar").toggle();

            //var margin = $("#main-container-page").css("margin-left");
            //if (margin == "260px") {
            //    $("#main-container-page").css("margin-left", "80px")
            //} else if ((margin == "80px")) {
            //    $("#main-container-page").css("margin-left", "260px")
            //}
        }
    }
})();