(function () {
    'use strict';
    angular.module('erp.common').service('utilityService', utilityService);
    utilityService.$inject = ['$http', 'config'];

    function utilityService($http, config) {

        return {
            getDateRange: getDateRange
        };

        function getDateRange(startDate, endDate) {
            var date = {};
            date.startDate = processDate(startDate);
            date.endDate = processDate(endDate, true);
            return date;
        }

        function processDate(date, end) {

            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var newDate, zString;

            if (end) {
                newDate = new Date(year, month, day, '23', '59', '59', '997');
                zString = 'T23:59:59.997Z';
            } else {
                newDate = new Date(year, month, day, '00', '00', '00', '000');
                zString = 'T00:00:00.000Z';
            }

            newDate = newDate.toLocaleDateString();
            newDate = newDate.split('/');
            return newDate[2] + '-' + newDate[0] + '-' + newDate[1] + zString;
        }

    }
})();