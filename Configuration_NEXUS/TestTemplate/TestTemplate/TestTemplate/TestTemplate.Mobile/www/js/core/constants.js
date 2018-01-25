(function () {
    'use strict';

    /*
     * Application specific configuration to be set on the config constant
     * eg. 
     *  .constant('config', {
     *      baseUrlApi: '',
     *      configkey: configValue
     *  });
     */

    angular.module('erp.core')
        .constant('toastr', toastr)
        .constant('config', {
            baseUrlApi: 'http://localhost:49524/api/'
        });
})();
