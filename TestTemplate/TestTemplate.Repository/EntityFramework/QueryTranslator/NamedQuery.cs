using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework.QueryTranslator
{
    public class NamedQuery
    {
        #region "Sentiment"

        public const string SENTIMENT_SCORE_AVG_BY_PRODUCT_REVIEW_DATE = "usp_Sentiment_Query_AVGSentimentScoreByProductAndReviewDate";
        public const string SENTIMENT_SCORE_AVG_BY_PRODUCT_REVIEW_DATE_MONTH = "usp_Sentiment_Query_AVGSentimentScoreByProductandReviewDate_Month";
        public const string SENTIMENT_SCORE_AVG_BY_REGION = "usp_Sentiment_Query_AVGSentimentScoreByRegion";
        public const string SENTIMENT_SCORE_AVG_YEAR_MONTH_BY_REVIEW_DATE = "usp_Sentiment_Query_AVGYearMonthSentimentScoreByReviewDate";
        public const string SENTIMENT_SCORE_AVG_YEAR_MONTH_BY_REVIEW_DATE_MONTH = "usp_Sentiment_Query_AVGYearMonthSentimentScoreByReviewDate_Month";
        public const string SENTIMENT_SCORE_AVG_GROUP_BY_AGE_GROUP = "usp_Sentiment_Query_AVGSentimentScoreGroupByAgeGroup";
        public const string SENTIMENT_SCORE_AVG_GROUP_BY_REVIEW_DATE = "usp_Sentiment_Query_AVGSentimentScoreGroupByReviewDate";
        public const string SENTIMENT_SCORE_COMMENT_QUERY = "usp_Sentiment_Query_Comment";
        public const string SENTIMENT_SCORE_CUSTOMER_COMMENT = "usp_Sentiment_Query_CustomerCommentScore";
        public const string SENTIMENT_SCORE_CUSTOMER_COMMENT_BY_DATE = "usp_Sentiment_Query_CustomerCommentScoreByDate";
        public const string SENTIMENT_SCORE_CUSTOMER_COMMENT_BY_DATE_YEAR_MONTH = "usp_Sentiment_Query_CustomerCommentScoreByDate_YearMonth";
        public const string SENTIMENT_SCORE_DASHBOARD = "usp_Sentiment_Query_DashBoard";
        public const string SENTIMENT_SCORE = "usp_Sentiment_Query_SentimentScore";
        public const string SENTIMENT_SCORE_BY_AGE_GROUP = "usp_Sentiment_Query_SentimentAgeGroupScore";
        public const string SENTIMENT_SCORE_BY_PRODUCT = "usp_Sentiment_Query_SentimentProductScore";
        public const string SENTIMENT_SCORE_BY_PRODUCT_REVIEW_DATE = "usp_Sentiment_Query_SentimentScoreByProductandReviewDate";
        public const string SENTIMENT_SCORE_BY_REVIEW_DATE = "usp_Sentiment_Query_SentimentScoreByReviewDate";
        public const string SENTIMENT_SCORE_BY_REVIEW_DATE_MONTH = "usp_Sentiment_Query_SentimentScoreByReviewDateMonth";

        public const string fnCheckPrioriftyConfig = "fnCheckPrioriftyConfig";
        public const string CheckAnyChildNotCompleted1 = "CheckAnyChildNotCompleted1";
        public const string CheckAnyChildNotCompleted2 = "CheckAnyChildNotCompleted2";
        public const string CheckAnyChildNotCompleted3 = "CheckAnyChildNotCompleted3";
        public const string CheckAnyChildNotCompleted4 = "CheckAnyChildNotCompleted4";
        public const string CheckAnyChildNotCompleted5 = "CheckAnyChildNotCompleted5";
        public const string CheckAnyChildNotCompleted6 = "CheckAnyChildNotCompleted6";
        public const string CheckAnyChildNotCompleted7 = "CheckAnyChildNotCompleted7";
        public const string CheckAnyChildNotCompleted8 = "CheckAnyChildNotCompleted8";
        public const string CheckAnyChildNotCompleted9 = "CheckAnyChildNotCompleted9";
        public const string CheckAnyChildNotCompleted10 = "CheckAnyChildNotCompleted10";
        public const string CheckAnyChildNotCompleted11 = "CheckAnyChildNotCompleted11";
        public const string CheckAnyChildNotCompleted12 = "CheckAnyChildNotCompleted12";
        public const string CheckAnyChildNotCompleted13 = "CheckAnyChildNotCompleted13";

        public const string cmdUpdateReceived_ClickCase7 = "cmdUpdateReceived_ClickCase7";
        public const string cmdUpdateReceived_ClickCase10_1 = "cmdUpdateReceived_ClickCase10_1";
        public const string cmdUpdateReceived_ClickCase10_2 = "cmdUpdateReceived_ClickCase10_2";
        public const string cmdUpdateReceived_ClickCase30 = "cmdUpdateReceived_ClickCase30";

        public const string cmdUpdateReceived_ClickCase80_1 = "cmdUpdateReceived_ClickCase80_1";
        public const string cmdUpdateReceived_ClickCase80_2 = "cmdUpdateReceived_ClickCase80_2";
        public const string cmdUpdateReceived_ClickCase95_1 = "cmdUpdateReceived_ClickCase95_1";
        public const string cmdUpdateReceived_ClickCase95_2 = "cmdUpdateReceived_ClickCase95_2";
        public const string GenerateMcIDByWorkCenter = "GenerateMcIDByWorkCenter";
        public const string productionPauseCase20_1 = "productionPauseCase20_1";
        public const string productionPauseCase20_1_1 = "productionPauseCase20_1_1";
        public const string setupPauseCase20_1 = "setupPauseCase20_1";
        public const string productionPauseCase20_2 = "productionPauseCase20_2";
        public const string productionPauseCase20_3 = "productionPauseCase20_3";
        public const string CalculateSubconTimeSpan = "CalculateSubconTimeSpan";
        public const string CheckSubconWOOpnStatus = "CheckSubconWOOpnStatus";
        public const string fnGetUserAccessRight = "fnGetUserAccessRight";
        public const string productionResumeCase10_1 = "productionResumeCase10_1";
        public const string productionResumeCase10_1_1 = "productionResumeCase10_1_1";
        public const string setupResumeCase10_1 = "setupResumeCase10_1";
        public const string productionResumeCase10_2 = "productionResumeCase10_2";
        public const string productionResumeCase10_3 = "productionResumeCase10_3";
        public const string productionResumeCase10_4 = "productionResumeCase10_4";
        public const string frmExecutionHistory1 = "frmExecutionHistory1";
        public const string frmExecutionHistory2 = "frmExecutionHistory2";
        public const string setupStartCase10_1 = "setupStartCase10_1";
        public const string setupStartCase10_2 = "setupStartCase10_2";
        public const string productionStopCase10_1 = "productionStopCase10_1";
        public const string productionStopCase10_2 = "productionStopCase10_2";
        public const string productionStopCase10_3 = "productionStopCase10_3";
        public const string cmdConfirm_ClickCase40_1 = "cmdConfirm_ClickCase40_1";
        public const string setupStopCase40_1 = "setupStopCase40_1";
        public const string setupStartCase40_1 = "setupStartCase40_1";
        public const string setupStartCase40_2 = "setupStartCase40_2";
        public const string setupStartCase40_3 = "setupStartCase40_3";
        public const string setupStartCase40_4 = "setupStartCase40_4";
        public const string setupStartCase40_5 = "setupStartCase40_5";
        public const string setupStartCase40_6 = "setupStartCase40_6";
        public const string cmdConfirm_ClickCase30_1 = "cmdConfirm_ClickCase30_1";
        public const string setupStopCase30_1 = "setupStopCase30_1";
        public const string GetGetSalesID = "GetGetSalesID";
        public const string fnTrackSetupConfig = "fnTrackSetupConfig";
        public const string CheckWOOpnStatus1 = "CheckWOOpnStatus1";
        public const string CheckWOOpnStatus2 = "CheckWOOpnStatus2";
        public const string CheckWOOpnStatus2_1 = "CheckWOOpnStatus2_1";
        public const string CheckWOOpnStatus3 = "CheckWOOpnStatus3";
        public const string CheckWOOpnStatus3_1 = "CheckWOOpnStatus3_1";
        public const string fnValidateUserNameMCAssign = "fnValidateUserNameMCAssign";
        public const string fnCheckPriorityConfig = "fnCheckPriorityConfig";
        public const string UpdateQtyFromPreviousProcOpSeq1 = "UpdateQtyFromPreviousProcOpSeq1";
        public const string UpdateQtyFromPreviousProcOpSeq2 = "UpdateQtyFromPreviousProcOpSeq2";
        public const string UpdateWorkOrderQty = "UpdateWorkOrderQty";
        public const string comboWO_Selected_wotraking = "comboWO_Selected_wotraking";
        public const string spGenerateDynamicWOStatusList = "spGenerateDynamicWOStatusList";
        public const string spGenerateDynamicWOStatusListStatement1 = "spGenerateDynamicWOStatusListStatement1";
        public const string spGenerateDynamicWOStatusListStatement = "spGenerateDynamicWOStatusListStatement";
        public const string populatePartIDlist = "populatePartIDlist";
        public const string populateCustomerNamelist = "populateCustomerNamelist";
        public const string populateFGDimensionlist = "populateFGDimensionlist";
        public const string populatePONumberlist = "populatePONumberlist";
        public const string populateSOLineNolist = "populateSOLineNolist";
        public const string populateSORemarklist = "populateSORemarklist";
        public const string populateMachineID = "populateMachineID";
        public const string populateWorkCentre = "populateWorkCentre";
        public const string generatePauseReasonList = "generatePauseReasonList";
        public const string generateTrackingRemarkList = "generateTrackingRemarkList";
        public const string generateScrapReasonList = "generateScrapReasonList";
        public const string AddPauseReason = "AddPauseReason";
        public const string AddScrapRemark = "AddScrapRemark";
        public const string AddTrackingRemark = "AddTrackingRemark";
        public const string RemovePauseReason = "RemovePauseReason";
        public const string RemoveScrapRemark = "RemoveScrapRemark";
        public const string RemoveTrackingRemark = "RemoveTrackingRemark";
        public const string GenerateThreshold = "GenerateThreshold";
        public const string UpdateThreshold = "UpdateThreshold";
        public const string GenerateWOStatusReleaseStartDateThreshold = "GenerateWOStatusReleaseStartDateThreshold";
        public const string UpdateWOStatusReleaseStartDateThreshold = "UpdateWOStatusReleaseStartDateThreshold";
        public const string UpdateWOAlertStatus = "UpdateWOAlertStatus";
        public const string GenerateWOListRelease = "GenerateWOListRelease";
        public const string releasedReportSearch = "releasedReportSearch";
        public const string FunctionUnLockWO = "FunctionUnLockWO";
        public const string FunctionUnLockFunction = "FunctionUnLockFunction";
        public const string GenerateUserIDList = "GenerateUserIDList";
        public const string GenerateUnitCodeList = "GenerateUnitCodeList";
        public const string getWOdetail = "getWOdetail";

        public const string fnGenerateLabel = "fnGenerateLabel";
        public const string fnUpdateRoute = "fnUpdateRoute";

        public const string GenerateMcID = "GenerateMcID";
        public const string GenerateScrapRemark = "GenerateScrapRemark";
        public const string GenerateMCWOList = "GenerateMCWOList";
        public const string ConfirmGCReorder = "ConfirmGCReorder";
        public const string GetEndDate_New = "GetEndDate_New";

        public const string generateWorkCenterInPriority = "generateWorkCenterInPriority";
        public const string generateMcIDInPriority = "generateMcIDInPriority";

        public const string GenerateWOSplitList = "GenerateWOSplitList";

        public const string comboWO_SelectedIndexChanged = "comboWO_SelectedIndexChanged";
        public const string GenerateWODetail1 = "GenerateWODetail1";
        public const string GenerateWODetail2 = "GenerateWODetail2";
        public const string GenerateWOMaterial = "GenerateWOMaterial";
        public const string GenerateWOSummary1 = "GenerateWOSummary1";
        public const string GenerateWOSummary2 = "GenerateWOSummary2";
        public const string GenerateWOSummaryScrap = "GenerateWOSummaryScrap";
        public const string GenerateSubAssemblyWOList = "GenerateSubAssemblyWOList";
        public const string getTSWorkOrder = "getTSWorkOrder";
        public const string addWO = "addWO";
        public const string addWORouteCurrent = "addWORouteCurrent";
        public const string addWORouteQC = "addWORouteQC";
        public const string cmdUpdate_ClickCase15 = "cmdUpdate_ClickCase15";
        public const string addWORouteQC2 = "addWORouteQC2";
        public const string cmdOnHold_ClickCase20_1 = "cmdOnHold_ClickCase20_1";
        public const string cmdOnHold_ClickCase20_2 = "cmdOnHold_ClickCase20_2";
        public const string cmdOnHold_ClickCase20_3 = "cmdOnHold_ClickCase20_3";
        public const string buttonRefresh_ClickPriority1 = "buttonRefresh_ClickPriority1";
        public const string buttonRefresh_ClickPriority2 = "buttonRefresh_ClickPriority2";
        public const string buttonRefresh_ClickPriority3 = "buttonRefresh_ClickPriority3";
        public const string buttonRefresh_ClickPriority4 = "buttonRefresh_ClickPriority4";
        public const string buttonRefresh_ClickPriority5 = "buttonRefresh_ClickPriority5";
        public const string buttonRefresh_ClickPriority6 = "buttonRefresh_ClickPriority6";
        public const string GenerateToolDescription = "GenerateToolDescription";
        public const string addWOExe1 = "addWOExe1";
        public const string addWOExe2 = "addWOExe2";
        public const string addWOExe3 = "addWOExe3";
        public const string addSplitWO = "addSplitWO";

        public const string delWORoute = "delWORoute";
        public const string delWOExe = "delWOExe";
        public const string updateWOExecution = "updateWOExecution";
        public const string CheckWO = "CheckWO";
        public const string GenerateWOLock = "GenerateWOLock";
        public const string GenerateFunctionLock = "GenerateFunctionLock";

        public const string GenerateDispatchWOList1 = "GenerateDispatchWOList1";
        public const string GenerateDispatchWOList2 = "GenerateDispatchWOList2";
        public const string GenerateWOList1= "GenerateWOList1";
        public const string GenerateWOList2 = "GenerateWOList2";
        public const string GenerateWOList3 = "GenerateWOList3";
        public const string GenerateWOList4 = "GenerateWOList4";
        public const string GenerateWOList5 = "GenerateWOList5";
        public const string GenerateWOList6 = "GenerateWOList6";
        public const string GenerateWOList7 = "GenerateWOList7";
        public const string GenerateWOList8 = "GenerateWOList8";
        public const string GenerateWOList9 = "GenerateWOList9";
        public const string GenerateWOList10 = "GenerateWOList10";
        public const string GenerateWOList11 = "GenerateWOList11";
        public const string GenerateWOList12 = "GenerateWOList12";
        public const string GenerateQueuingWOList1 = "GenerateQueuingWOList1";
        public const string GenerateQueuingWOList2 = "GenerateQueuingWOList2";

        public const string GenerateWCList1 = "GenerateWCList1";
        public const string GenerateWCList2 = "GenerateWCList2";
        public const string GenerateWCList3 = "GenerateWCList3";
        public const string GenerateWCList4 = "GenerateWCList4";
        public const string ScrapReport1 = "ScrapReport1";
        public const string ScrapReport2 = "ScrapReport2";
        public const string ScrapReport3 = "ScrapReport3";
        public const string splitReport1 = "splitReport1";
        public const string splitReport2 = "splitReport2";
        public const string splitReport3 = "splitReport3";
        public const string reworkReport1 = "reworkReport1";
        public const string reworkReport2 = "reworkReport2";
        public const string reworkReport3 = "reworkReport3";
        public const string AddWorkOrderRouteDispatch1 = "AddWorkOrderRouteDispatch1";
        public const string AddWorkOrderRouteDispatch2 = "AddWorkOrderRouteDispatch2";
        public const string Generate_ReworkRemarkList = "Generate_ReworkRemarkList";

        public const string fnGenerateRouteDetail1 = "fnGenerateRouteDetail1";
        public const string fnGenerateRouteDetail2 = "fnGenerateRouteDetail2";
        public const string fnGenerateRouteDetail3 = "fnGenerateRouteDetail3";
        public const string fnGenerateRouteDetail4 = "fnGenerateRouteDetail4";
        public const string fnGenerateRouteDetail5 = "fnGenerateRouteDetail5";


        public const string fnAddWO1 = "fnAddWO1";
        public const string fnAddWO2 = "fnAddWO2";

        public const string fnInsertWO = "fnInsertWO";

        public const string fnUpdateWO = "fnUpdateWO";
        public const string fnUpdatePPOrder = "fnUpdatePPOrder";
        public const string fnUpdatePPOrder1 = "fnUpdatePPOrder1";
        public const string fnUpdatePPOrder2 = "fnUpdatePPOrder2";
        public const string fnUpdatePPOrder3 = "fnUpdatePPOrder3";
        public const string fnUpdatePPOrder4 = "fnUpdatePPOrder4";
        public const string fnUpdatePPOrder5 = "fnUpdatePPOrder5";
        public const string fnUpdatePPOrder6 = "fnUpdatePPOrder6";
        public const string fnUpdatePPOrder7 = "fnUpdatePPOrder7";

        public const string GenerateWOListRework = "GenerateWOListRework";
        public const string GenerateWOListRework1 = "GenerateWOListRework1";

        public const string GlobalGenerateWODetail1 = "GlobalGenerateWODetail1";
        public const string GlobalGenerateWODetail2 = "GlobalGenerateWODetail2";
        public const string GlobalGenerateWODetail3 = "GlobalGenerateWODetail3";
        public const string GlobalGenerateWODetail4 = "GlobalGenerateWODetail4";
        public const string GlobalGenerateWOMaterial = "GlobalGenerateWOMaterial";


        public const string GlobalGenerateWOSummary = "GlobalGenerateWOSummary";
        public const string sp_GetAvailMachineListForWO = "sp_GetAvailMachineListForWO";
        public const string fnInsertRoute = "fnInsertRoute";
        public const string fnInsertQCEquipment = "fnInsertQCEquipment";
        public const string fnInsertWOExecution = "fnInsertWOExecution";
        public const string splitReportCellClicked1 = "splitReportCellClicked1";
        public const string splitReportCellClicked2 = "splitReportCellClicked2";
        public const string splitReportCellClicked3 = "splitReportCellClicked3";

        public const string GlobalCurrentWorkOrderRoute = "GlobalCurrentWorkOrderRoute";
        public const string GlobalCurrentWorkOrderRouteWithRouteID = "GlobalCurrentWorkOrderRouteWithRouteID";
        public const string strGetOperatorName = "strGetOperatorName";
        public const string allRoutesName = "allRoutesName";
        public const string GlobalMaxProcOpSeq = "GlobalMaxProcOpSeq";
        public const string currentRoutesName = "currentRoutesName";
        public const string generateReoworkDropDown = "generateReoworkDropDown";
        public const string GenerateMCInfor = "GenerateMCInfor";

        public const string populateCustomer = "populateCustomer";
        public const string regenerateRoutingData = "regenerateRoutingData";
        public const string populateKitType = "populateKitType";
        public const string populateKitType1 = "populateKitType1";
        public const string comboMCList_SelectionChangeCommitted = "comboMCList_SelectionChangeCommitted";
        public const string comboMCList_SelectionChangeCommitted0 = "comboMCList_SelectionChangeCommitted0";
        public const string saveRework1 = "saveRework1";
        public const string saveRework2 = "saveRework2";
        public const string saveRework3 = "saveRework3";
        public const string saveRework4 = "saveRework4";
        public const string saveRework5 = "saveRework5";
        public const string saveRework6 = "saveRework6";
        public const string saveRework7 = "saveRework7";
        public const string saveRework8 = "saveRework8";
        public const string saveRework9 = "saveRework9";
        public const string saveRework10 = "saveRework10";
        public const string saveReworkMac1 = "saveReworkMac1";
        public const string saveReworkMac2 = "saveReworkMac2";
        public const string CalculateTimeSpan1 = "CalculateTimeSpan1";
        public const string CalculateTimeSpan2 = "CalculateTimeSpan2";
        public const string CalculateTimeSpan3 = "CalculateTimeSpan3";
        public const string CalculateTimeSpan4 = "CalculateTimeSpan4";
        public const string CalculateTimeSpan5 = "CalculateTimeSpan5";
        public const string CalculateTimeSpan6 = "CalculateTimeSpan6";
        public const string CalculateTimeSpan7 = "CalculateTimeSpan7";
        public const string GenerateUserNameList = "GenerateUserNameList";

        public const string AddQCEquipment = "AddQCEquipment";
        public const string GenerateOperatorReport = "GenerateOperatorReport";
        public const string CalculateDuration1 = "CalculateDuration1";
        public const string CalculateDuration2 = "CalculateDuration2";
        public const string CalculateDuration3 = "CalculateDuration3";

        public const string populateWOlist = "populateWOlist";
        public const string ChkChild = "ChkChild";
        public const string populateWOinfoTable1 = "populateWOinfoTable1";
        public const string populateWOinfoTable2 = "populateWOinfoTable2";
        public const string populateWOinfoTable3 = "populateWOinfoTable3";
        public const string populateWOExecutionSummary = "populateWOExecutionSummary";
        public const string populateProcessRouteDetails1 = "populateProcessRouteDetails1";
        public const string populateProcessRouteDetails2 = "populateProcessRouteDetails2";
        public const string populateProcessRouteDetails3 = "populateProcessRouteDetails3";
        public const string populateProcessRouteDetails4 = "populateProcessRouteDetails4";
        public const string wodetailTable3Click1 = "wodetailTable3Click1";
        public const string wodetailTable3Click2 = "wodetailTable3Click2";
        public const string GetCurProcOpSeq = "GetCurProcOpSeq";
        public const string GenerateAttachmentList = "GenerateAttachmentList";
        public const string AddQCAttachment1 = "AddQCAttachment1";
        public const string RemoveQCAttachment1 = "RemoveQCAttachment1";
        public const string Generate_RouteDetail1 = "Generate_RouteDetail1";
        public const string Generate_RouteDetail2 = "Generate_RouteDetail2";
        public const string Generate_RouteDetail3 = "Generate_RouteDetail3";
        public const string populateWOSummary = "populateWOSummary";
        public const string getAllWOID = "getAllWOID";
        public const string BackupHMLVTSByYear = "BackupHMLVTSByYear";
        public const string getCurrentWorkOrderByMcID = "getCurrentWorkOrderByMcID";

        public const string ScrapbutConfirm_Click1 = "ScrapbutConfirm_Click1";
        public const string ScrapbutConfirm_Click2 = "ScrapbutConfirm_Click2";
        public const string ScrapbutConfirm_Click3 = "ScrapbutConfirm_Click3";
        public const string btnCancelWO_ClickCase20_1 = "btnCancelWO_ClickCase20_1";
        public const string btnCancelWO_ClickCase20_2 = "btnCancelWO_ClickCase20_2";
        public const string btnCancelWO_ClickCase30_1 = "btnCancelWO_ClickCase30_1";
        public const string btnCancelWO_ClickCase40_1 = "btnCancelWO_ClickCase40_1";
        public const string btnCancelWO_ClickCase40_2 = "btnCancelWO_ClickCase40_2";
        public const string btnCancelWO_ClickCase40_3 = "btnCancelWO_ClickCase40_3";
        public const string butConfirm_Click1 = "butConfirm_Click1";
        public const string butConfirm_Click2 = "butConfirm_Click2";
        public const string butConfirm_Click3 = "butConfirm_Click3";
        public const string Generate_WOSplitDetail = "Generate_WOSplitDetail";
        public const string CheckAnyChildNotCompletedOwn1 = "CheckAnyChildNotCompletedOwn1";
        public const string CheckAnyChildNotCompletedOwn2 = "CheckAnyChildNotCompletedOwn2";
        public const string GenerateOperatorList = "GenerateOperatorList";
        public const string cmdConfirm_ClickCase10 = "cmdConfirm_ClickCase10";
        #endregion "Sentiment"
    }
}