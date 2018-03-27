(function () {
    'use strict';

    angular.module('erp.layout').controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['authService', '$scope', '$state', 'notificationService'];

    function ForgotPasswordCtrl(authService, $scope, $state, notificationService) {
        $scope.forgotPassword = forgotPassword;
        $scope.acc = {};



        $("#toolbar_rework").hide();
        $("#toolbar_wodetail").hide();

        function forgotPassword() {

            authService.forgotPassword($scope.acc).then(function (result) {
                if (result.status === 200) {
                    notificationService.success('Successfully sent to the registered email!');
                    $state.go('login');
                }
                else
                    notificationService.showError('Not Found Registered email!');
            });


        }

    }
})();