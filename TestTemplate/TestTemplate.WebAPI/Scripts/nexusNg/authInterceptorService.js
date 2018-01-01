(function () {
    'use strict';
    angular.module('nexusNg.auth').factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$q', '$injector', '$localStorage', 'nexusConfig', 'config'];

    function authInterceptorService($q, $injector, $localStorage, nexusConfig, config) {

        var authInterceptorServiceFactory = {};
        var $state, $http;

        var _request = function (request) {

            request.headers = request.headers || {};

            if ($localStorage.currentUser) {
                var url = request.url;
                if (url.indexOf(config.baseUrlApi) >= 0 || url.indexOf(nexusConfig.baseUrlNexusApi) >= 0) {
                    request.headers.Authenticationtoken = $localStorage.currentUser.token;
                }
            }
            return request;
        }

        var _responseError = function (rejection) {
            var deferred = $q.defer();
            var authService = $injector.get('authService');
            $state = $state || $injector.get('$state');

            var url = rejection.config.url;
            if (url.indexOf(config.baseUrlApi) >= 0 || url.indexOf(nexusConfig.baseUrlNexusApi) >= 0) {
                if (rejection.status === 401) {
                    authService.refreshToken().then(function (response) {
                        _retryHttpRequest(rejection.config, deferred);
                    }, function () {
                        authService.logOut();
                        $state.go('login');
                        deferred.reject(rejection);
                    });
                } else {
                    deferred.reject(rejection);
                }
                return deferred.promise;
            }
            return $q.reject(rejection);
        }

        var _retryHttpRequest = function (config, deferred) {
            $http = $http || $injector.get('$http');
            $http(config).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }

})();