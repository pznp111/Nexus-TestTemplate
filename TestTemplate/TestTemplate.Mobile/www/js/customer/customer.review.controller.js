(function () {
    'use strict';

    angular.module('erp.customer').controller('CustomerReviewCtrl', CustomerReviewCtrl);

    CustomerReviewCtrl.$inject = ['$scope', 'repo'];

    function CustomerReviewCtrl($scope, repo) {

        repo.review.getScore().then(function (score) {
            $scope.score = score;
        });

    }
})();