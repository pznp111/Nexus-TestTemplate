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
            baseUrlNexusApi: 'http://localhost:99/api/',
            baseUrlApi: 'http://localhost:49524/api/',
            BypassPriority: true,
            AllowMultipleWO: true,
            AllowExceedQty: false,
            BypassSetup: true,
            BypassApproval: false,
            BypassReceivedQty: false,
            BypassCompletedQty: false,
            BypassScanOperator: true,
            BypassExecutionStart: false,
            BypassExecutionStop: false,
            TrackingDefaultOK: false,
            DisplaySalesDetail: true,
            ApprovedAllowSame: false,
            ResumeWithApproved: false,
            BypassCheckPassword: true,
            DefaultReceiveQty: true,
            ShowConfirmAlert: false,
            skipReceiveQty: false,
            skipCompletedQty: false,
            ClearEmptyCell: true,
            IncludePreviousSeqNonCompleted: false,
            DisplayPONumber: true,
            strSkipWOTrackingPrompt: false,
            strValidateUserAssginToMC: false,
            paraSkipWOTrackingPrompt: false,
            WOGlobalDefaultCompletedQty: false,
            AllowMultipleOperator: true,
            AssemblyCheckAtLastOnly:true  // false for not checking at last, checking at first
        });

})();
