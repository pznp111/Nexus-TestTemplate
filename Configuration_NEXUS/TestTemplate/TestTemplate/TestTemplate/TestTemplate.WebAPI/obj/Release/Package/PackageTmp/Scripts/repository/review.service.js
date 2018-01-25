(function () {
    'use strict';
    angular.module('erp.repository').service('reviewService', customerService);
    customerService.$inject = ['$http', 'config', '$q'];


    function parameterService(){
    var savedData = [];
        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }
        return {
            set: set,
            get: get
        }
    }


    function customerService($http, config, $q) {

        /*
         * This service is for accessing API endpoints for a model eg. (review)
         * You can add all the API endpoint methods in here
         * eg.
         *
         * return {
         *   getScore: getScore,
         *   getDetails, getDetails
         * };
         */

        return {
            getScore: getScore
        };

        function getScore() {

            /*
             * This is a call to the $safeprojectname$ endpoint
             */

            return $http.get(config.baseUrlApi + 'reviews').then(function (results) {
                return results.data;
            });

            //return $q(function (resolve, reject) {
            //    resolve([{
            //        CustomerId: 1021,
            //        Product: "WOODSCENTZ",
            //        ReviewText: "Brut is a classic mens scent. What I liked about it most was that I could put it on in the morning before leaving for the day, and the scent was still there at night when I got home. Brut has a woodsy smell that isnt too overpowering. Its refreshing and the girls like it too!",
            //        Score: 4
            //    }, {
            //        CustomerId: 1209,
            //        Product: "WOODSCENTZ",
            //        ReviewText: "Its a very unique bottle and packing to begin with. But like all other Armani products, it is in a class of its own.The scent is not too strong, but linger and has a positve smell. I am sure, this might charm up your night...Emporio Armani can definately command the price that it asks.",
            //        Score: 5
            //    }, {
            //        CustomerId: 1201,
            //        Product: "WOODSCENTZ",
            //        ReviewText: "thiz product came in on time n i luv tha packing..tha colonge was safe n not broke like stuff i have gotten fr other dealers..n well i really didnt know wut kind of colonge to get but how tha dealer discribes it i wanted to try it n well tha dealer was right...i really love it..i get girls coming p to me all tha time askin wut am i whereing n guys to lol i really do recomend thiz itemand dealer",
            //        Score: 5
            //    }, {
            //        CustomerId: 1204,
            //        Product: "WOODSCENTZ",
            //        ReviewText: "I am so disappointed I am unable to find this product in any stores! I am glad I am able to find it on line!!! Truth is a light & refreshing essence! Unlike so many of Calvins other products--which I find too heavy--truth envelopes me with light floral aromas! I need to find lotion!",
            //        Score: 5
            //    }, {
            //        CustomerId: 1210,
            //        Product: "WOODSCENTZ",
            //        ReviewText: "I was surprised to see this offered for $15 when several other vendors were selling the same thing for $45 or more. But when I got it, it was the actual Havana cologne. I have liked the fragrance for years and to get it for a third of the cost elsewhere was icing on the cake.",
            //        Score: 5
            //    }]);
            //});
        }
    }
})();