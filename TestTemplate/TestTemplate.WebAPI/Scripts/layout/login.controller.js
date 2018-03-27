(function () {
    'use strict';
    angular.module('erp.layout').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'authService', '$state'];

    function LoginCtrl($scope, authService, $state) {
        var vm = this;
        vm.login = login;




        $scope.userNameKey = function (keyEvent) {
            if (keyEvent.which === 13) {
                console.log("key", keyEvent);
                // console.log("value", $("#test-scanner").val());
                document.getElementById("password").focus();
                document.getElementById("password").select();
                keyEvent.preventDefault();
            }

            // alert("alert");
        }


        function login() {
            console.log("test1");
            var loginData = { UserName: vm.userName, password: vm.password };
            //  $state.go('home', {}, { location: 'replace', reload: true });

            authService.login(loginData).then(function (currentUser) {
                console.log("login", currentUser);
                console.log("test2");
                currentUser.isAuth = true;
                if (currentUser.isAuth) {

                    $state.go('home', {}, { location: 'replace', reload: true });
                }

            }, function (result) {
                console.log("test3");
                console.log("login", result);
                //  console.log("config", config);
                /*
                 * Will return error in the following format:
                 *   {
                 *     "error": {
                 *       "code": "nx10002",
                 *       "message": "Invalid credentials"
                 *     }
                 *   }
                 */
                vm.error = result.data.error.message;
            });
        }
    }
})();