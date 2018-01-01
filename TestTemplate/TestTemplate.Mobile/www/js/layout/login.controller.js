(function () {
    'use strict';
    angular.module('erp.layout').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['authService', '$state'];

    function LoginCtrl(authService, $state) {
        var vm = this;
        vm.login = login;

        function login() {
            var loginData = { UserName: vm.userName, password: vm.password };
            authService.login(loginData).then(function (currentUser) {
                if (currentUser.isAuth) {
                    $state.go('home', {}, { location: 'replace', reload: true });
                }
            }, function (result) {
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