(function () {
    'use strict';

    angular.module('erp.common').service('notificationService', notificationService);
    notificationService.$inject = ['toastr'];

    function notificationService(toastr) {

        return {
            showError: showError,
            showConfirm: showConfirm,
            success: success
        }

        function showError(error) {
            swal({
                title: 'Error',
                text: error,
                type: 'error'
            });
        }

        function showConfirm(data, grid) {
            // reject/resolve promise handlers is mandatory in swal
            // that is the reason for empty promise handlers else this will throw an error
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true,
                allowOutsideClick: false
            }).then(function () {
                grid.dataSource.remove(data);  // prepare a "destroy" request
                grid.dataSource.sync().then(function (e) {
                    swal({
                        title: 'Deleted!',
                        text: 'Your record has been deleted.',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function () { }, function () { });
                });
            }, function () { });
        }


        function success(message) {
            toastr.success(message);
        }
    }
})();

