(function () {
    'use strict';

    angular.module('erp.common').service('validationService', validationService);

    function validationService() {

        return {
            startWithCapitalLetter: startWithCapitalLetter,
            alphaNumericPeriod: alphaNumericPeriod
        };

        function startWithCapitalLetter(name) {
            var validation = function (input) {
                if (input.val() !== '' && input.is('[name="' + name + "\"]")) {
                    input.attr('data-startWithCapitalLettervalidation-msg', 'Should start with capital letter');
                    return /^[A-Z]/.test(input.val());
                }
                return true;
            };
            return validation;
        }

        function alphaNumericPeriod(name) {
            var validation = function (input) {
                if (input.val() !== '' && input.is('[name="${name}"]')) {
                    input.attr('data-alphaNumericPeriod-msg', 'Should only contain letters, numbers, and period');
                    return /^[A-Za-z0-9\.]+$/.test(input.val());
                }
                return true;
            };
            return validation;
        }
    }
})();

