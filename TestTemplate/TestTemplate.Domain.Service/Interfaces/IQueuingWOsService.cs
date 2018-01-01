using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Messaging.MessagingService;
using TestTemplate.Domain.Service.Messaging;

namespace TestTemplate.Domain.Service.Interfaces
{
    public interface IQueuingWOsService
    {
        QueryResponse GeneratePauseReasonList();
        QueryResponse GenerateTrackingRemarkList();
        QueryResponse GenerateScrapRemarkList();
        QueryResponse GenerateThreshold();
        QueryResponse GenerateUserIDList();
        QueryResponse GenerateUnitCodeList();
        QueryResponse GenerateMcID();
        QueryResponse GenerateWOSplitList();
        QueryResponse GenerateWOListRelease();
        QueryResponse GenerateScrapRemark();


        
        QueryResponse cmdUpdate_ClickCase15(MessagingService request);
        QueryResponse cmdOnHold_ClickCase20_1(MessagingService request);
        QueryResponse cmdOnHold_ClickCase20_2(MessagingService request);
        QueryResponse cmdOnHold_ClickCase20_3(MessagingService request);
        QueryResponse GenerateMcIDByWorkCenter(MessagingService request);
        QueryResponse productionPauseCase20_1(MessagingService request);
        QueryResponse productionPauseCase20_1_1(MessagingService request);
        QueryResponse setupPauseCase20_1(MessagingService request);
        
        QueryResponse productionPauseCase20_2(MessagingService request);
        QueryResponse productionPauseCase20_3(MessagingService request);
        QueryResponse cmdConfirm_ClickCase40_1(MessagingService request);
        QueryResponse setupStopCase30_1(MessagingService request);
        
        QueryResponse setupStartCase40_1(MessagingService request);
        QueryResponse setupStartCase40_2(MessagingService request);
        QueryResponse setupStartCase40_3(MessagingService request);
        QueryResponse setupStartCase40_4(MessagingService request);
        QueryResponse setupStartCase40_5(MessagingService request);
        QueryResponse setupStartCase40_6(MessagingService request);
        QueryResponse cmdConfirm_ClickCase30_1(MessagingService request);
        QueryResponse setupStopCase40_1(MessagingService request);
        

        QueryResponse GetGetSalesID(MessagingService request);
        
        QueryResponse GenerateWOList1();
        QueryResponse GenerateWOList2();
        QueryResponse Generate_ReworkRemarkList();
        QueryResponse GenerateWOListRework();
        QueryResponse allRoutesName();
        QueryResponse populateWOlist();
        QueryResponse populateWorkCentre();
        QueryResponse populateMachineID();

        QueryResponse populateCustomer();
        QueryResponse GenerateOperatorReport(MessagingService request);
        QueryResponse GenerateUserNameList();
        QueryResponse getAllWOID();

        QueryResponse populatePartIDlist();
        QueryResponse populateCustomerNamelist();
        QueryResponse populateFGDimensionlist();
        QueryResponse populatePONumberlist();
        QueryResponse populateSOLineNolist();
        QueryResponse populateSORemarklist();
        QueryResponse GenerateWOLock();
        QueryResponse GenerateFunctionLock();



        
        QueryResponse RemoveQCAttachment1(MessagingService request);
        QueryResponse AddQCAttachment1(MessagingService request);

        QueryResponse frmExecutionHistory1(MessagingService request);
        QueryResponse frmExecutionHistory2(MessagingService request);
        QueryResponse setupStartCase10_1(MessagingService request);
        QueryResponse setupStartCase10_2(MessagingService request);
        QueryResponse productionResumeCase10_1(MessagingService request);
        QueryResponse productionResumeCase10_1_1(MessagingService request);
        QueryResponse setupResumeCase10_1(MessagingService request);
        
        QueryResponse productionResumeCase10_2(MessagingService request);
        QueryResponse productionResumeCase10_3(MessagingService request);
        QueryResponse productionResumeCase10_4(MessagingService request);
        QueryResponse productionStopCase10_1(MessagingService request);
        QueryResponse productionStopCase10_2(MessagingService request);
        QueryResponse productionStopCase10_3(MessagingService request);
        QueryResponse fnValidateUserNameMCAssign(MessagingService request);
        QueryResponse fnCheckPriorityConfig(MessagingService request);
        QueryResponse GenerateSubAssemblyWOList(MessagingService request);
        QueryResponse GenerateQueuingWOList1(MessagingService request);
        QueryResponse GenerateQueuingWOList2(MessagingService request);
        QueryResponse CalculateTimeSpan1(MessagingService request);
        QueryResponse CalculateTimeSpan2(MessagingService request);
        QueryResponse CalculateTimeSpan3(MessagingService request);
        QueryResponse CalculateTimeSpan4(MessagingService request);
        QueryResponse CalculateTimeSpan5(MessagingService request);
        QueryResponse CalculateTimeSpan6(MessagingService request);
        QueryResponse CalculateTimeSpan7(MessagingService request);
        QueryResponse CheckSubconWOOpnStatus(MessagingService request);
        QueryResponse CalculateSubconTimeSpan(MessagingService request);
        


        QueryResponse fnTrackSetupConfig(MessagingService request);
        QueryResponse CheckWOOpnStatus1(MessagingService request);
        QueryResponse CheckWOOpnStatus2(MessagingService request);
        QueryResponse CheckWOOpnStatus2_1(MessagingService request);
        QueryResponse CheckWOOpnStatus3(MessagingService request);
        QueryResponse CheckWOOpnStatus3_1(MessagingService request);
        QueryResponse UpdateQtyFromPreviousProcOpSeq1(MessagingService request);
        QueryResponse UpdateQtyFromPreviousProcOpSeq2(MessagingService request);

        QueryResponse comboWO_Selected_wotraking(MessagingService request);
        QueryResponse fnUpdateRoute(MessagingService request);
        QueryResponse getWOdetail(MessagingService request);
        QueryResponse FunctionUnLockWO(MessagingService request);
        QueryResponse FunctionUnLockFunction(MessagingService request);

        QueryResponse fnGetUserAccessRight(MessagingService request);
        QueryResponse releasedReportSearch(MessagingService request);
        QueryResponse BackupHMLVTSByYear(MessagingService request);
        QueryResponse populateWOinfoTable1(MessagingService request);
        QueryResponse populateWOinfoTable2(MessagingService request);
        QueryResponse populateWOinfoTable3(MessagingService request);
        QueryResponse ChkChild(MessagingService request);
        QueryResponse populateWOExecutionSummary(MessagingService request);

        QueryResponse populateProcessRouteDetails1(MessagingService request);
        QueryResponse populateProcessRouteDetails2(MessagingService request);
        QueryResponse populateProcessRouteDetails3(MessagingService request);
        QueryResponse populateProcessRouteDetails4(MessagingService request);

        QueryResponse populateWOSummary(MessagingService request);
        QueryResponse wodetailTable3Click1(MessagingService request);
        QueryResponse wodetailTable3Click2(MessagingService request);
        QueryResponse GetCurProcOpSeq(MessagingService request);
        QueryResponse GenerateAttachmentList(MessagingService request);


        QueryResponse Generate_RouteDetail1(MessagingService request);
        QueryResponse Generate_RouteDetail2(MessagingService request);
        QueryResponse Generate_RouteDetail3(MessagingService request);
        QueryResponse CalculateDuration1(MessagingService request);
        QueryResponse CalculateDuration2(MessagingService request);
        QueryResponse CalculateDuration3(MessagingService request);


        //scrap
        QueryResponse GenerateWOList3(MessagingService request);
        QueryResponse GenerateWOList4(MessagingService request);
        QueryResponse GenerateWOList5(MessagingService request);
        QueryResponse GenerateWOList6(MessagingService request);
        QueryResponse GenerateWOList7(MessagingService request);
        QueryResponse GenerateWOList8(MessagingService request);
        QueryResponse GenerateWOList9(MessagingService request);
        QueryResponse GenerateWOList10(MessagingService request);
        QueryResponse GenerateWOList11(MessagingService request);
        QueryResponse GenerateWOList12();
        QueryResponse GenerateWCList1(MessagingService request);
        QueryResponse GenerateWCList2(MessagingService request);
        QueryResponse GenerateWCList3(MessagingService request);
        QueryResponse GenerateWCList4(MessagingService request);

        QueryResponse ScrapReport1(MessagingService request);
        QueryResponse ScrapReport2(MessagingService request);
        QueryResponse ScrapReport3(MessagingService request);
        QueryResponse reworkReport1(MessagingService request);
        QueryResponse reworkReport2(MessagingService request);
        QueryResponse reworkReport3(MessagingService request);
        QueryResponse splitReport1(MessagingService request);
        QueryResponse splitReport2(MessagingService request);
        QueryResponse splitReport3(MessagingService request);




        QueryResponse cmdUpdateReceived_ClickCase7(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase10_1(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase10_2(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase30(MessagingService request);

        QueryResponse cmdUpdateReceived_ClickCase80_1(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase80_2(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase95_1(MessagingService request);
        QueryResponse cmdUpdateReceived_ClickCase95_2(MessagingService request);
        QueryResponse UpdateWorkOrderQty(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted1(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted2(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted3(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted4(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted5(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted6(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted7(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted8(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted9(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted10(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted11(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted12(MessagingService request);
        QueryResponse CheckAnyChildNotCompleted13(MessagingService request);
        


        QueryResponse ConfirmGCReorder(MessagingService request);
        QueryResponse GenerateMCWOList(MessagingService request);
        QueryResponse fnGenerateLabel(MessagingService request);
        QueryResponse AddScrapRemark(MessagingService request);
        QueryResponse AddTrackingRemark(MessagingService request);
        QueryResponse AddPauseReason(MessagingService request);
        QueryResponse RemoveScrapRemark(MessagingService request);
        QueryResponse RemovePauseReason(MessagingService request);
        QueryResponse RemoveTrackingRemark(MessagingService request);
        QueryResponse GetEndDate_New(MessagingService request);

        QueryResponse regenerateRoutingData(MessagingService request);
        


        QueryResponse UpdateThreshold(MessagingService request);
        QueryResponse GenerateWOStatusReleaseStartDateThreshold();
        QueryResponse UpdateWOStatusReleaseStartDateThreshold(MessagingService request);

        QueryResponse generateWorkCenterInPriority(MessagingService request);
        QueryResponse generateMcIDInPriority(MessagingService request);

        QueryResponse comboWO_SelectedIndexChanged(MessagingService request);
        QueryResponse GenerateWODetail1(MessagingService request);
        QueryResponse GenerateWODetail2(MessagingService request);
        QueryResponse GenerateWOMaterial(MessagingService request);
        QueryResponse GenerateWOSummary1(MessagingService request);
        QueryResponse GenerateWOSummary2(MessagingService request);
        QueryResponse GenerateWOSummaryScrap(MessagingService request);
        QueryResponse getTSWorkOrder(MessagingService request);
        QueryResponse addWO(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority1(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority2(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority3(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority4(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority5(MessagingService request);
        QueryResponse buttonRefresh_ClickPriority6(MessagingService request);
        QueryResponse GenerateToolDescription(MessagingService request);
        QueryResponse addWORouteQC(MessagingService request);
        QueryResponse addWORouteQC2(MessagingService request);
        QueryResponse addWORouteCurrent(MessagingService request);
        QueryResponse addWOExe1(MessagingService request);
        QueryResponse addWOExe2(MessagingService request);
        QueryResponse addWOExe3(MessagingService request);
        QueryResponse addSplitWO(MessagingService request);
        QueryResponse fnInsertRoute(MessagingService request);
        

        QueryResponse delWORoute(MessagingService request);
        QueryResponse delWOExe(MessagingService request);
        QueryResponse updateWOExecution(MessagingService request);
        QueryResponse CheckWO(MessagingService request);

        QueryResponse GenerateDispatchWOList1(MessagingService request);
        QueryResponse GenerateDispatchWOList2(MessagingService request);


        QueryResponse AddWorkOrderRouteDispatch1(MessagingService request);
        QueryResponse AddWorkOrderRouteDispatch2(MessagingService request);






        QueryResponse fnGenerateRouteDetail1(MessagingService request);
        QueryResponse fnGenerateRouteDetail2(MessagingService request);
        QueryResponse fnGenerateRouteDetail3(MessagingService request);
        QueryResponse fnGenerateRouteDetail4(MessagingService request);
        QueryResponse fnGenerateRouteDetail5(MessagingService request);

        QueryResponse sp_GetAvailMachineListForWO(MessagingService request);


        QueryResponse fnAddWO1();
        QueryResponse fnAddWO2(MessagingService request);


        QueryResponse fnInsertWO(MessagingService request);

        QueryResponse fnUpdateWO(MessagingService request);
        QueryResponse fnUpdatePPOrder(MessagingService request);
        QueryResponse fnUpdatePPOrder1(MessagingService request);
        QueryResponse fnUpdatePPOrder2(MessagingService request);
        QueryResponse fnUpdatePPOrder3(MessagingService request);
        QueryResponse fnUpdatePPOrder4(MessagingService request);
        QueryResponse fnUpdatePPOrder5(MessagingService request);
        QueryResponse fnUpdatePPOrder6(MessagingService request);
        QueryResponse fnUpdatePPOrder7(MessagingService request);
        QueryResponse GenerateWOListRework1(MessagingService request);


        QueryResponse GlobalGenerateWODetail1(MessagingService request);
        QueryResponse GlobalGenerateWODetail2(MessagingService request);
        QueryResponse GlobalGenerateWODetail3(MessagingService request);
        QueryResponse GlobalGenerateWODetail4(MessagingService request);
        QueryResponse GlobalGenerateWOMaterial(MessagingService request);

        QueryResponse GlobalGenerateWOSummary(MessagingService request);
        
        QueryResponse GlobalCurrentWorkOrderRoute(MessagingService request);
        QueryResponse GlobalCurrentWorkOrderRouteWithRouteID(MessagingService request);
        
        QueryResponse strGetRouteName(MessagingService request);
        QueryResponse strGetOperatorName(MessagingService request);

        QueryResponse GlobalMaxProcOpSeq(MessagingService request);

        QueryResponse currentRoutesName(MessagingService request);
        QueryResponse generateReoworkDropDown(MessagingService request);
        QueryResponse GenerateMCInfor(MessagingService request);
        QueryResponse populateKitType(MessagingService request);
        QueryResponse populateKitType1(MessagingService request);
        QueryResponse comboMCList_SelectionChangeCommitted(MessagingService request);
        QueryResponse comboMCList_SelectionChangeCommitted0(MessagingService request);
        QueryResponse saveRework1(MessagingService request);
        QueryResponse saveRework2(MessagingService request);
        QueryResponse saveRework3(MessagingService request);
        QueryResponse saveRework4(MessagingService request);
        QueryResponse saveRework5(MessagingService request);
        QueryResponse saveRework6(MessagingService request);
        QueryResponse saveRework7(MessagingService request);
        QueryResponse saveRework8(MessagingService request);
        QueryResponse saveRework9(MessagingService request);
        QueryResponse saveRework10(MessagingService request);
        QueryResponse saveReworkMac1(MessagingService request);
        QueryResponse saveReworkMac2(MessagingService request);
        
        QueryResponse AddQCEquipment(MessagingService request);
        

        QueryResponse fnInsertQCEquipment(MessagingService request);
        QueryResponse fnInsertWOExecution(MessagingService request);


        QueryResponse splitReportCellClicked1(MessagingService request);
        QueryResponse splitReportCellClicked2(MessagingService request);
        QueryResponse splitReportCellClicked3(MessagingService request);
        QueryResponse UpdateWOAlertStatus(MessagingService request);

        QueryResponse spGenerateDynamicWOStatusList();
        QueryResponse spGenerateDynamicWOStatusListStatement(MessagingService request);
        QueryResponse spGenerateDynamicWOStatusListStatement1(MessagingService request);
        QueryResponse spGenerateDynamicWOStatusListStatement2();
        QueryResponse spGenerateDynamicWOStatusListStatement3();

        QueryResponse getCurrentWorkOrderByMcID(MessagingService request);
        QueryResponse ScrapbutConfirm_Click1(MessagingService request);
        QueryResponse ScrapbutConfirm_Click2(MessagingService request);
        QueryResponse ScrapbutConfirm_Click3(MessagingService request);

        QueryResponse btnCancelWO_ClickCase20_1(MessagingService request);
        QueryResponse btnCancelWO_ClickCase20_2(MessagingService request);
        QueryResponse btnCancelWO_ClickCase30_1(MessagingService request);
        QueryResponse btnCancelWO_ClickCase40_1(MessagingService request);
        QueryResponse btnCancelWO_ClickCase40_2(MessagingService request);
        QueryResponse btnCancelWO_ClickCase40_3(MessagingService request);
        QueryResponse butConfirm_Click1(MessagingService request);
        QueryResponse butConfirm_Click2(MessagingService request);
        QueryResponse butConfirm_Click3(MessagingService request);
        QueryResponse Generate_WOSplitDetail(MessagingService request);
        QueryResponse CheckAnyChildNotCompletedOwn1(MessagingService request);
        QueryResponse CheckAnyChildNotCompletedOwn2(MessagingService request);
        QueryResponse GenerateOperatorList(MessagingService request);
        QueryResponse cmdConfirm_ClickCase10(MessagingService request);
        





        String hashPassWord(String password);
    }
}
