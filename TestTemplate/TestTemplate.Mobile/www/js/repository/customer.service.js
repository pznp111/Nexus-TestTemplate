(function () {
    'use strict';
    angular.module('erp.repository').service('customerService', customerService);
    customerService.$inject = ['$http', 'config', '$q'];

    function customerService($http, config, $q) {

        /*
         * This service is for accessing API endpoints for a model eg. (customer)
         * You can add all the API endpoint methods in here
         * eg.
         *
         * return {
         *   getDashboard: getDashboard,
         *   getDetails, getDetails
         * };
         */

        return {
            getDashboard: getDashboard
        };

        function getDashboard() {

            /*
             * This is a call to the ERP.WebAPI endpoint
             */

            return $http.get(config.baseUrlApi + 'customers').then(function (results) {
                return results.data;
            });


            //return $q(function (resolve, reject) {
            //    resolve([{
            //        CommentPercentage: 0,
            //        MeanScore: 3.55,
            //        NoOfComments: 4918,
            //        NoOfUsers: 3143,
            //        UserPercentage: 0
            //    }]);
            //});

        }
    }
})();