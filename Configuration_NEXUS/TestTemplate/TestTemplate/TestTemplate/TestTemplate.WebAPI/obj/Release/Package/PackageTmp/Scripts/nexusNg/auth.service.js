(function () {
    'use strict';
    angular.module('nexusNg.auth').factory('authService', authService);

    authService.$inject = ['$http', '$localStorage', '$rootScope', '$cookies', 'nexusConfig', 'config'];

    function authService($http, $localStorage, $rootScope, $cookies, config, appConfig) {

        var currentUser = {
            isAuth: false,
            userName: '',
            userId: '',
            tenantId: '',
            token: '',
            refreshToken: '',
            expiresOn: 0,
            siteMap: {}
        };

        var result = {
            login: login,
            logOut: logOut,
            fillAuthData: fillAuthData,
            currentUser: currentUser,
            updateSiteMap: updateSiteMap,
            changePassword: changePassword,
            forgotPassword: forgotPassword,
            refreshToken: refreshToken,
            authUserInfoByIdAndToken: authUserInfoByIdAndToken,
            changePasswordByIdAndToken: changePasswordByIdAndToken
        };

        var parameter = [];



        // add a listener on a key        
        $rootScope.$watch(function () {
            return result.currentUser.siteMap;
        }, function (newValue, oldValue, scope) {
            $rootScope.$broadcast('authService:siteMapChanged', newValue);
        }, true);

        return result;


        function login(loginData) {
            loginData.GrantType = 'usertoken';
            return $http.post(config.baseUrlNexusApi + 'Token/GetToken', loginData).then(function (results) {
                currentUser.isAuth = results.data.success;
                currentUser.token = results.data.jsonWebToken;
                currentUser.expiresOn = results.data.expiresOn;
                currentUser.refreshToken = results.data.refreshToken;
                $localStorage.currentUser = currentUser;
            }).then(function () {
                return $http.get(appConfig.baseUrlApi + 'user/GetCurrentUserDetails').then(function (results) {
                    currentUser.userName = results.data.userName;
                    currentUser.userId = results.data.id;
                    currentUser.tenantId = results.data.tenantId;
                    currentUser.siteMap = results.data.siteMap;
                    $localStorage.currentUser = currentUser;
                    return $localStorage.currentUser;
                });
            });
        }

        function refreshToken() {
            var currentTime = Math.floor(new Date() / 1000);
            var loginData = {};
            loginData.GrantType = 'refreshtoken';
            if (currentUser && currentUser.isAuth) {
                loginData.RefreshToken = $localStorage.currentUser.refreshToken;
                if ($localStorage.currentUser.expiresOn < currentTime + 20) {
                    return $http.post(config.baseUrlNexusApi + 'Token/GetToken', loginData)
                        .then(function(results) {
                            $localStorage.currentUser.isAuth = results.data.success;
                            $localStorage.currentUser.token = results.data.jsonWebToken;
                            $localStorage.currentUser.expiresOn = results.data.expiresOn;
                            $localStorage.currentUser.refreshToken = results.data.refreshToken;
                        });
                }
            }
        }

        function updateSiteMap() {
            $http.get(appConfig.baseUrlApi + 'user/GetCurrentUserDetails').then(function (results) {
                $localStorage.currentUser.siteMap = results.data.siteMap;
                if ($localStorage.currentUser && $localStorage.currentUser.isAuth) {
                    result.currentUser.siteMap = $localStorage.currentUser.siteMap;
                }
            });
        }

        function logOut() {
            delete $localStorage.currentUser;
            currentUser.isAuth = false;
            currentUser.userName = '';
            currentUser.userId = '';
            currentUser.tenantId = '';
            currentUser.token = '';
            currentUser.refreshToken = '';
            currentUser.expiresOn = '';
            currentUser.siteMap = {}
        }

        function fillAuthData() {
            if ($localStorage.currentUser && $localStorage.currentUser.isAuth) {
                currentUser.isAuth = $localStorage.currentUser.isAuth;
                currentUser.userName = $localStorage.currentUser.userName;
                currentUser.userId = $localStorage.currentUser.userId;
                currentUser.tenantId = $localStorage.currentUser.tenantId;
                currentUser.siteMap = $localStorage.currentUser.siteMap;
                currentUser.token = $localStorage.currentUser.token;
                currentUser.refreshToken = $localStorage.currentUser.refreshToken;
                currentUser.expiresOn = $localStorage.currentUser.expiresOn;
            }
            return $localStorage.currentUser;
        }

        function changePassword(userInfo) {
            return $http.post(config.baseUrlNexusApi + 'User/ChangePassword', userInfo).then(function (results) {
                return results;
            });
        }

        function forgotPassword(accInfo) {

            return $http.post(config.baseUrlNexusApi + 'User/AddForgetPasswordToken/', accInfo).then(function (results) {
                return results;
            });
        }

        function authUserInfoByIdAndToken(tokenInfo)
        {
            return $http.post(config.baseUrlNexusApi + 'User/AuthUserByIdAndToken/', tokenInfo).then(function (results) {
                return results;
            });
        }

        function changePasswordByIdAndToken(userInfo) {
            return $http.post(config.baseUrlNexusApi + 'User/ChangePasswordByIdAndToken', userInfo).then(function (results) {
                return results;
            });
        }

    };
})();