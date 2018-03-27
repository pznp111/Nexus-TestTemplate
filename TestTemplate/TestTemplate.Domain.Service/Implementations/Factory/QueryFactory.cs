using Nexus.Infrastructure.Querying;
using TestTemplate.Repository.EntityFramework.QueryTranslator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Messaging.MessagingService;
using System.Diagnostics;

namespace TestTemplate.Domain.Service.Implementations.Factory
{
    public class QueryFactory : QueryFactoryBase
    {
        

        public Query GenerateWOList12()
        {
            _query = new Query(NamedQuery.GenerateWOList12);
            return _query;
        }

        public Query GenerateQCWOList()
        {
            _query = new Query(NamedQuery.GenerateQCWOList);
            return _query;
        }

        

        public Query GenerateWOLock()
        {
            _query = new Query(NamedQuery.GenerateWOLock);
            return _query;
        }

        public Query GenerateFunctionLock()
        {
            _query = new Query(NamedQuery.GenerateFunctionLock);
            return _query;
        }
        public Query GenerateWOListRelease()
        {
            _query = new Query(NamedQuery.GenerateWOListRelease);
            return _query;
        }
        public Query populatePartIDlist()
        {
            _query = new Query(NamedQuery.populatePartIDlist);
            return _query;
        }

        public Query populateCustomerNamelist()
        {
            _query = new Query(NamedQuery.populateCustomerNamelist);
            return _query;
        }
        public Query GenerateUserNameList()
        {
            _query = new Query(NamedQuery.GenerateUserNameList);
            return _query;
        }
        public Query populateFGDimensionlist()
        {
            _query = new Query(NamedQuery.populateFGDimensionlist);
            return _query;
        }
        public Query populatePONumberlist()
        {
            _query = new Query(NamedQuery.populatePONumberlist);
            return _query;
        }
        public Query populateSOLineNolist()
        {
            _query = new Query(NamedQuery.populateSOLineNolist);
            return _query;
        }
        public Query populateSORemarklist()
        {
            _query = new Query(NamedQuery.populateSORemarklist);
            return _query;
        }

        public Query populateMachineID()
        {
            _query = new Query(NamedQuery.populateMachineID);
            return _query;
        }

        public Query populateWorkCentre()
        {
            _query = new Query(NamedQuery.populateWorkCentre);
            return _query;
        }

       // GenerateOperatorReport

        public Query populateCustomer()
        {
            _query = new Query(NamedQuery.populateCustomer);
            return _query;
        }

        public Query populateWOlist()
        {
            _query = new Query(NamedQuery.populateWOlist);
            return _query;
        }

        

        public Query allRoutesName()
        {
            _query = new Query(NamedQuery.allRoutesName);
            return _query;
        }


        public Query GenerateWOListRework()
        {
            _query = new Query(NamedQuery.GenerateWOListRework);

            return _query;
        }

        public Query GenerateWOList1()
        {
            _query = new Query(NamedQuery.GenerateWOList1);

            return _query;
        }

        public Query fnAddWO1()
        {
            _query = new Query(NamedQuery.fnAddWO1);

            return _query;
        }

        public Query getAllWOID()
        {
            _query = new Query(NamedQuery.getAllWOID);
            return _query;
        }

        
        public Query GenerateMcIDByWorkCenter(MessagingService request)
        {

            _query = new Query(NamedQuery.GenerateMcIDByWorkCenter);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter+"%"));
            return _query;
        }

        public Query productionPauseCase20_1(MessagingService request)
        {

            _query = new Query(NamedQuery.productionPauseCase20_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));


            return _query;
        }

        public Query productionPauseCase20_1_1(MessagingService request)
        {

            _query = new Query(NamedQuery.productionPauseCase20_1_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));


            return _query;
        }

        public Query setupPauseCase20_1(MessagingService request)
        {

            _query = new Query(NamedQuery.setupPauseCase20_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));


            return _query;
        }


        public Query cmdQCResume_ClickCase10(MessagingService request)
        {

            _query = new Query(NamedQuery.cmdQCResume_ClickCase10);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@McID", request.McID));



            return _query;
        }
        

        public Query QCPauseCase20_1(MessagingService request)
        {

            _query = new Query(NamedQuery.QCPauseCase20_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@McID", request.McID));


            return _query;
        }

        



        public Query productionPauseCase20_2(MessagingService request)
        {
            _query = new Query(NamedQuery.productionPauseCase20_2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@StartDateTime", request.StartDateTime));
            _query.Add(new Criterion("@StartType", request.StartType));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@Reason", request.reason));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            return _query;
        }

        public Query productionPauseCase20_3(MessagingService request)
        {

            _query = new Query(NamedQuery.productionPauseCase20_3);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ExStatus", Int32.Parse(request.ExStatus)));
            _query.Add(new Criterion("@UpdatedDate", request.UpdatedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));




//            @WOID varchar(50),
//@ProcOpSeq int,
//@ExStatus int,
//@UpdatedDate datetime,
//@OperatorID char(16),
//@OperatorName char(64),
//@Reason varchar(max)
            return _query;
        }
        
        public Query setupStartCase40_1(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@StartDateTime", request.StartDateTime));
            _query.Add(new Criterion("@StartType", request.StartType));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@Reason", request.reason));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));



            return _query;
        }

        public Query productionResumeCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.productionResumeCase10_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            return _query;
        }

        public Query productionResumeCase10_1_1(MessagingService request)
        {
            _query = new Query(NamedQuery.productionResumeCase10_1_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            return _query;
        }

        public Query setupResumeCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.setupResumeCase10_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            return _query;
        }

        

        public Query productionResumeCase10_2(MessagingService request)
        {
            _query = new Query(NamedQuery.productionResumeCase10_2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@StartDateTime", request.StartDateTime));
            _query.Add(new Criterion("@StartType", request.StartType));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@Reason", request.reason));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));

            return _query;
        }

        public Query productionResumeCase10_3(MessagingService request)
        {
            _query = new Query(NamedQuery.productionResumeCase10_3);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
          //  _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }
        public Query setupStartCase10(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase10);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;

        }
        public Query setupStartCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase10_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;

        }
        public Query setupStartCase10_2(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase10_2);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
              _query.Add(new Criterion("@ProdStartDate", request.ProdStartDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            //_query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        
        public Query productionResumeCase10_4(MessagingService request)
        {
            _query = new Query(NamedQuery.productionResumeCase10_4);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ExStatus", Int32.Parse(request.ExStatus)));
            _query.Add(new Criterion("@UpdatedDate", request.UpdatedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));
            return _query;
        }

        
         public Query frmExecutionHistory1(MessagingService request)
        {
            _query = new Query(NamedQuery.frmExecutionHistory1);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }

        public Query frmExecutionHistory2(MessagingService request)
        {
            _query = new Query(NamedQuery.frmExecutionHistory2);

            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }

        public Query productionStopCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.productionStopCase10_1);
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@EndType", request.endType));
            return _query;
        }

        public Query productionStopCase10_2(MessagingService request)
        {
            _query = new Query(NamedQuery.productionStopCase10_2);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdEndDate", request.ProdEndDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            //_query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query QCStopCase10_2(MessagingService request)
        {
            _query = new Query(NamedQuery.QCStopCase10_2);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdEndDate", request.ProdEndDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        

        public Query productionStopCase10_3(MessagingService request)
        {
            _query = new Query(NamedQuery.productionStopCase10_3);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ExStatus", Int32.Parse(request.ExStatus)));
            _query.Add(new Criterion("@UpdatedDate", request.UpdatedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));
            return _query;
        }


        
        public Query setupStopCase40_1(MessagingService request)
        {

            _query = new Query(NamedQuery.setupStopCase40_1);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@SetupEndDate", request.SetupEndDate));
            _query.Add(new Criterion("@ProdStartDate", request.ProdStartDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }



        public Query cmdConfirm_ClickCase40_1(MessagingService request)
        {

            Debug.WriteLine("remark", "|" + request.TrackingRemark + "|");
            _query = new Query(NamedQuery.cmdConfirm_ClickCase40_1);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ReceivedDate", request.ReceivedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Type", request.Type));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query cmdConfirm_ClickCase30_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdConfirm_ClickCase30_1);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@SendOutDate", request.SendOutDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }
        
        public Query setupStopCase30_1(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStopCase30_1);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@SetupEndDate", request.SetupEndDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query setupStartCase40_2(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_2);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query setupStartCase40_2_1(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_2_1);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query setupStartCase40_3(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_3);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query setupStartCase40_4(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_4);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query setupStartCase40_5(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_5);
            _query.Add(new Criterion("@Status", request.Status));
            _query.Add(new Criterion("@ID", Int32.Parse(request.id)));
            return _query;
        }

        public Query setupStartCase40_6(MessagingService request)
        {
            _query = new Query(NamedQuery.setupStartCase40_6);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ExStatus", Int32.Parse(request.ExStatus)));
            _query.Add(new Criterion("@UpdatedDate", request.UpdatedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));
            return _query;
        }

        public Query GetGetSalesID(MessagingService request)
        {
            _query = new Query(NamedQuery.GetGetSalesID);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }
        

        public Query fnGetUserAccessRight(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGetUserAccessRight);
            Debug.WriteLine("strUserID", "!" + request.strUserID + "!");
            Debug.WriteLine("strMenuName", "!" + request.strMenuName + "!");
            _query.Add(new Criterion("@strUserID", request.strUserID));
            _query.Add(new Criterion("@strMenuName", request.strMenuName));

            return _query;

        }

        public Query fnTrackSetupConfig(MessagingService request)
        {
            _query = new Query(NamedQuery.fnTrackSetupConfig);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query GenerateQueuingWOList1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateQueuingWOList1);
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }

        public Query GenerateQueuingWOList2(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateQueuingWOList2);
            Debug.WriteLine("GenerateQueuingWOList2",request.McID);
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }

        public Query GenerateQueuingWOList3(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateQueuingWOList3);
            Debug.WriteLine("GenerateQueuingWOList3", request.WorkCenter);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query GenerateQueuingWOList4(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateQueuingWOList4);
            Debug.WriteLine("GenerateQueuingWOList2", request.WorkCenter);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }


        public Query CalculateTimeSpan1(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@startType1", request.startType1 + "%"));
            _query.Add(new Criterion("@startType2", request.startType2 + "%"));
            return _query;
        }

        public Query CalculateTimeSpan2(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@startType1", request.startType1+"%"));
            _query.Add(new Criterion("@startType2", request.startType2+"%"));
            return _query;
        }

        public Query CalculateTimeSpan3(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan3);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CalculateTimeSpan3_1(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan3_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CalculateTimeSpan4(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan4);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        public Query CalculateTimeSpan5(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan5);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        public Query CalculateTimeSpan6(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan6);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        public Query CalculateTimeSpan7(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan7);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            return _query;
        }

        public Query CalculateTimeSpan7_1(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateTimeSpan7);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            return _query;
        }

        public Query CalculateSubconTimeSpan(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateSubconTimeSpan);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            return _query;
        }

        

        public Query CheckSubconWOOpnStatus(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckSubconWOOpnStatus);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }
        


        public Query CheckWOOpnStatus1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOOpnStatus1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckWOOpnStatus2(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOOpnStatus2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckQCWOOpnStatus1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckQCWOOpnStatus1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckQCWOOpnStatus2(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckQCWOOpnStatus2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckWOOpnStatus2_1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOOpnStatus2_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            return _query;
        }

        public Query CheckWOOpnStatus3(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOOpnStatus3);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckWOOpnStatus3_1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOOpnStatus3_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            return _query;
        }

        public Query fnCheckPriorityConfig(MessagingService request)
        {
            _query = new Query(NamedQuery.fnCheckPrioriftyConfig);

            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query CheckAnyChildNotCompleted1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted1);

            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckAnyChildNotCompleted2(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted2);

            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckAnyChildNotCompleted3(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted3);

            _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted4(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted4);

            _query.Add(new Criterion("@ProdEndDate", request.ProdEndDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted5(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted5);
            _query.Add(new Criterion("@SendOutDate", request.SendOutDate));
            _query.Add(new Criterion("@ReceivedDate", request.ReceivedDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted6(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted6);

            _query.Add(new Criterion("@ReceivedDate", request.ReceivedDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted7(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted7);

            _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted8(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted8);

            _query.Add(new Criterion("@SetupEndDate", request.SetupEndDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted9(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted9);

            _query.Add(new Criterion("@ProdStartDate", request.ProdStartDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted10(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted10);

            _query.Add(new Criterion("@ProdEndDate", request.ProdEndDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted11(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted11);

            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query CheckAnyChildNotCompleted12(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted12);

            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckAnyChildNotCompleted13(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompleted13);

            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }
        public Query fnValidateUserNameMCAssign(MessagingService request)
        {
            _query = new Query(NamedQuery.fnValidateUserNameMCAssign);

            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }
        


        public Query UpdateQtyFromPreviousProcOpSeq1(MessagingService request)
        {
            _query = new Query(NamedQuery.UpdateQtyFromPreviousProcOpSeq1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query UpdateQtyFromPreviousProcOpSeq2(MessagingService request)
        {
            _query = new Query(NamedQuery.UpdateQtyFromPreviousProcOpSeq2);
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@QtyUpdated", Int32.Parse(request.QtyUpdated)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));

            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query UpdateWorkOrderQty(MessagingService request)
        {
            _query = new Query(NamedQuery.UpdateWorkOrderQty);
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        

        public Query comboWO_Selected_wotraking(MessagingService request)
        {
            _query = new Query(NamedQuery.comboWO_Selected_wotraking);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query comboWO_Selected_wotraking1(MessagingService request)
        {
            _query = new Query(NamedQuery.comboWO_Selected_wotraking1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query fnUpdateRoute(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateRoute);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@PrioritizedNo", request.PrioritizedNo));
            _query.Add(new Criterion("@ProcOpSeq", request.ProcOpSeq));
            return _query;
        }


        public Query getWOdetail(MessagingService request)
        {
            _query = new Query(NamedQuery.getWOdetail);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }

        public Query releasedReportSearch(MessagingService request)
        {
            _query = new Query(NamedQuery.releasedReportSearch);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            return _query;
        }


        public Query FunctionUnLockWO(MessagingService request)
        {
            _query = new Query(NamedQuery.FunctionUnLockWO);
            _query.Add(new Criterion("@woid", request.WOID ));
            return _query;
        }

        public Query FunctionUnLockFunction(MessagingService request)
        {
            _query = new Query(NamedQuery.FunctionUnLockFunction);
            _query.Add(new Criterion("@MutexFunction", request.MutexFunction));
            return _query;
        }


        public Query UpdateWOAlertStatus(MessagingService request)
        {
            _query = new Query(NamedQuery.UpdateWOAlertStatus);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            return _query;
        }


        public Query reworkReport1(MessagingService request)
        {
            _query = new Query(NamedQuery.reworkReport1);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query reworkReport2(MessagingService request)
        {
            _query = new Query(NamedQuery.reworkReport2);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query reworkReport3(MessagingService request)
        {
            _query = new Query(NamedQuery.reworkReport3);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReportCellClicked1(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReportCellClicked1);
            _query.Add(new Criterion("@woid", request.WOID ));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReportCellClicked2(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReportCellClicked2);
            _query.Add(new Criterion("@woid", request.WOID ));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReportCellClicked3(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReportCellClicked3);
            _query.Add(new Criterion("@woid", request.WOID ));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        
        public Query ScrapReport1(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapReport1);
            _query.Add(new Criterion("@woid", request.WOID+"%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter+"%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query ScrapReport2(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapReport2);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query ScrapReport3(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapReport3);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@workcenter", request.WorkCenter + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReport1(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReport1);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReport2(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReport2);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query splitReport3(MessagingService request)
        {
            _query = new Query(NamedQuery.splitReport3);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }
        
        public Query GenerateWCList1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWCList1);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWCList2(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWCList2);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWCList3(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWCList3);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWCList4(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWCList4);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query BackupHMLVTSByYear(MessagingService request)
        {
            _query = new Query(NamedQuery.BackupHMLVTSByYear);
            Debug.WriteLine("BackupHMLVTSByYear" + request.StartDate + "||" + request.Type);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.Type));
            return _query;
        }

        public Query getCurrentWorkOrderByMcID(MessagingService request)
        {
            _query = new Query(NamedQuery.getCurrentWorkOrderByMcID);
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }


        

        public Query Generate_RouteDetail1(MessagingService request)
        {
            _query = new Query(NamedQuery.Generate_RouteDetail1);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }

        public Query Generate_RouteDetail2(MessagingService request)
        {
            _query = new Query(NamedQuery.Generate_RouteDetail2);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }

        public Query Generate_RouteDetail3(MessagingService request)
        {
            _query = new Query(NamedQuery.Generate_RouteDetail3);
            _query.Add(new Criterion("@woid", request.WOID+"%"));
            return _query;
        }
        public Query GenerateAttachmentList(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateAttachmentList);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }


        public Query AddQCAttachment1(MessagingService request)
        {
            _query = new Query(NamedQuery.AddQCAttachment1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@Directory", request.Directory));
            _query.Add(new Criterion("@Filename", request.Filename));
            _query.Add(new Criterion("@AttachedDate", request.AttachedDate));
            _query.Add(new Criterion("@FileStatus", request.FileStatus));
            _query.Add(new Criterion("@CheckDate", request.CheckDate));
            _query.Add(new Criterion("@AttachedDate", request.AttachedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            return _query;
        }

        public Query RemoveQCAttachment1(MessagingService request)
        {
            _query = new Query(NamedQuery.RemoveQCAttachment1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@Directory", request.Directory));
            _query.Add(new Criterion("@Filename", request.Filename));
            _query.Add(new Criterion("@AttachedDate", request.AttachedDate));
            return _query;
        }


        
        public Query populateWOSummary(MessagingService request)
        {
            _query = new Query(NamedQuery.populateWOSummary);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }

        public Query GetCurProcOpSeq(MessagingService request)
        {
            _query = new Query(NamedQuery.GetCurProcOpSeq);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }

        


        public Query wodetailTable3Click1(MessagingService request)
        {
            _query = new Query(NamedQuery.wodetailTable3Click1);
            _query.Add(new Criterion("@woid", request.WOID+'%'));
            _query.Add(new Criterion("@workcenter", request.WorkCenter));
            _query.Add(new Criterion("@procopseq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query wodetailTable3Click2(MessagingService request)
        {
            _query = new Query(NamedQuery.wodetailTable3Click2);
            _query.Add(new Criterion("@woid", request.WOID + '%'));
            _query.Add(new Criterion("@workcenter", request.WorkCenter));
            _query.Add(new Criterion("@procopseq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }
        public Query populateProcessRouteDetails1(MessagingService request)
        {
            _query = new Query(NamedQuery.populateProcessRouteDetails1);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }
        public Query populateProcessRouteDetails2(MessagingService request)
        {
            _query = new Query(NamedQuery.populateProcessRouteDetails2);
            _query.Add(new Criterion("@woid", request.WOID));
            _query.Add(new Criterion("@procopseq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }
        public Query populateProcessRouteDetails3(MessagingService request)
        {
            _query = new Query(NamedQuery.populateProcessRouteDetails3);
            _query.Add(new Criterion("@woid", request.WOID));
            _query.Add(new Criterion("@procopseq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query populateProcessRouteDetails4(MessagingService request)
        {
            _query = new Query(NamedQuery.populateProcessRouteDetails4);
            _query.Add(new Criterion("@woid", request.WOID));
            
            return _query;
        }
        public Query populateWOExecutionSummary(MessagingService request)
        {
            _query = new Query(NamedQuery.populateWOExecutionSummary);
            _query.Add(new Criterion("@woid", request.WOID ));
            _query.Add(new Criterion("@procopseq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }
        public Query populateWOinfoTable1(MessagingService request)
        {
            _query = new Query(NamedQuery.populateWOinfoTable1);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            return _query;
        }
        public Query populateWOinfoTable2(MessagingService request)
        {
            _query = new Query(NamedQuery.populateWOinfoTable2);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            return _query;
        }
        public Query populateWOinfoTable3(MessagingService request)
        {
            _query = new Query(NamedQuery.populateWOinfoTable3);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }
        public Query ChkChild(MessagingService request)
        {
            _query = new Query(NamedQuery.ChkChild);
            _query.Add(new Criterion("@woid", request.WOID));
            return _query;
        }


        public Query regenerateRoutingData(MessagingService request)
        {
            _query = new Query(NamedQuery.regenerateRoutingData);
            _query.Add(new Criterion("@routeName", request.RouteName));
            return _query;
        }


        public Query GenerateOperatorReport(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateOperatorReport);
            _query.Add(new Criterion("@OperatorName", request.OperatorName+"%"));
            _query.Add(new Criterion("@startTime", request.StartDate));
            _query.Add(new Criterion("@endTime", request.EndDate));
            return _query;
        }

        
        public Query CalculateDuration1(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateDuration1);
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            return _query;
        }

        public Query CalculateDuration2(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateDuration2);
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            return _query;
        }


        public Query CalculateQCDuration(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateQCDuration);
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            return _query;
        }

        
        public Query CalculateDuration3(MessagingService request)
        {
            _query = new Query(NamedQuery.CalculateDuration3);
            _query.Add(new Criterion("@PlannedDuration", decimal.Parse(request.PlannedDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.RouteID)));
            return _query;
        }

        public Query GenerateWOList3(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList3);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWOList4(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList4);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWOList5(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList5);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWOList6(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList6);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }
        public Query GenerateWOList7(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList7);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }
        public Query GenerateWOList8(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList8);
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }


        public Query GenerateWOList9(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList9);
            _query.Add(new Criterion("@woid", request.WOID+"%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWOList10(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList10);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query GenerateWOList11(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOList11);
            _query.Add(new Criterion("@woid", request.WOID + "%"));
            _query.Add(new Criterion("@start", request.StartDate));
            _query.Add(new Criterion("@end", request.EndDate));
            return _query;
        }

        public Query saveRework1(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@strExecProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            
            return _query;
        }

        public Query fnInsertQCEquipment(MessagingService request)
        {
            _query = new Query(NamedQuery.fnInsertQCEquipment);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
          


            return _query;
        }

        public Query fnInsertRoute(MessagingService request)
        {
            _query = new Query(NamedQuery.fnInsertRoute);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));

            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@PrioritizedNo", Int32.Parse(request.PrioritizedNo)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@RouteName", request.RouteName));
            _query.Add(new Criterion("@MacGroup", Int32.Parse(request.MacGroup)));
            _query.Add(new Criterion("@AttributeGroup", request.AttributeGroup));


            return _query;
        }
        


        public Query fnInsertWOExecution(MessagingService request)
        {
            _query = new Query(NamedQuery.fnInsertWOExecution);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));//date
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));//date
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));//date
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@MCType", request.McType));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//date
            _query.Add(new Criterion("@WOStatus", request.WOStatus));//date


            //_query.Add(new Criterion("@RequestedDeliveryDate", request.RequestedDeliveryDate));//date
            //_query.Add(new Criterion("@CommittedDeliveryDate", request.CommittedDeliveryDate));//date
            //_query.Add(new Criterion("@ReleasedProdQty", Int32.Parse(request.ReleasedProdQty)));
            //_query.Add(new Criterion("@ReleasedProdDate", request.ReleasedProdDate));//date
            //_query.Add(new Criterion("@tempactprodqty", Int32.Parse(request.ActualProdQty)));
            //_query.Add(new Criterion("@ActualProdDate", request.ActualProdDate));//date


            //_query.Add(new Criterion("@WOStatus", request.WOStatus));
            //_query.Add(new Criterion("@PPID", Int32.Parse(request.PPID)));
            //_query.Add(new Criterion("@SalesOrderID", request.SalesOrderID));
            //_query.Add(new Criterion("@ToolDescription", request.ToolDescription));
            //_query.Add(new Criterion("@ReleasedDate", request.ReleasedDate));//date
            //_query.Add(new Criterion("@OrderType", request.OrderType));
            //_query.Add(new Criterion("@PlannerRemark", request.PlannerRemark));


            return _query;
        }

        public Query saveReworkMac1(MessagingService request)
        {
            _query = new Query(NamedQuery.saveReworkMac1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@WorkCenterID", request.WorkCenter));
            _query.Add(new Criterion("@comboAllRoutesID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@m", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ReRouteSpreadOpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@comboAllRoutesName", request.RouteName));
            _query.Add(new Criterion("@AttributeGroup", request.AttributeGroup));
            return _query;
        }

        public Query saveReworkMac2(MessagingService request)
        {
            _query = new Query(NamedQuery.saveReworkMac1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@WorkCenterID", request.WorkCenter));
            _query.Add(new Criterion("@comboAllRoutesID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@m", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ReRouteSpreadOpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@comboAllRoutesName", request.RouteName));
            _query.Add(new Criterion("@MacGroupValue", Int32.Parse(request.MacGroup)));
            _query.Add(new Criterion("@AttributeGroup", request.AttributeGroup));
            return _query;
        }

        public Query saveRework2(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework2);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        

        public Query saveRework3(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework3);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@CurProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query saveRework4(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework4);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        public Query saveRework5(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework5);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@CurProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query saveRework6(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework6);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@comboAllRoutesID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@m", Int32.Parse(request.SeqNo)));
            _query.Add(new Criterion("@WorkCenterID", request.CentreID));
            return _query;
        }

        public Query saveRework7(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework7);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@tablePartID", request.PartID));
            _query.Add(new Criterion("@tableActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@tableActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@tableCompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@tableCompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@tableOutstandingQty", Int32.Parse(request.OutstandingQty)));

            _query.Add(new Criterion("@tableOutstandingDate", request.OutstandingDate));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@comboAllRoutesID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@WorkCenterID", request.WorkCenter));
            _query.Add(new Criterion("@m", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ReRouteSpreadOpSeq", Int32.Parse(request.OpSeq)));


            return _query;
            //WOID, PartID, ActualRecQty, ActualRecDate, CompletedQty, CompletedDate, OutstandingQty, OutstandingDate, 
            //                        McID, McType, RouteID, WorkCenter, ProcOpSeq, OpSeq, WOStatus

            //            @selectedWO varchar(50),
            //@tablePartID varchar(50),
            //@tableActualRecQty int,
            //@tableActualRecDate datetime,
            //@tableCompletedQty int,
            //@tableCompletedDate datetime,
            //@tableOutstandingQty int,
            //@tableOutstandingDate datetime,
            //@McID char(32),
            //@McType char(10),
            //@comboAllRoutesID int,
            //@WorkCenterID nvarchar(32),
            //@m int,
            //@ReRouteSpreadOpSeq int



        }

        public Query saveRework8(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework8);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@CurWorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@comboRouteId", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@CurProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@CurOpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@comboAllRoutesID", Int32.Parse(request.ReworkRouteID)));
            _query.Add(new Criterion("@WorkCenterID", request.ReworkStartWC));
            _query.Add(new Criterion("@CurProcOpSeq_plus_m", Int32.Parse(request.ReworkStartProcOpSeq)));
            _query.Add(new Criterion("@ReRouteSpreadOpSeq", Int32.Parse(request.ReworkStartOpSeq)));
            _query.Add(new Criterion("@CurReworkQty", Int32.Parse(request.ReworkQty)));
            _query.Add(new Criterion("@GETDate", request.ReworkDate));
            _query.Add(new Criterion("@OperatorID", request.UserID));
            _query.Add(new Criterion("@OperatorName", request.UserName));
            _query.Add(new Criterion("@ApprovedID", request.ApprovedID));
            _query.Add(new Criterion("@ApprovedName", request.ApprovedName));
            _query.Add(new Criterion("@Remark", request.Remark));

            _query.Add(new Criterion("@comboAllRoutesName", request.RouteName));
            _query.Add(new Criterion("@strProblemWC", request.ProblemWC));
            _query.Add(new Criterion("@strProblemOpSeq", Int32.Parse(request.ProblemOpSeq)));
            _query.Add(new Criterion("@strProblemProcOpSeq", Int32.Parse(request.ProblemProcOpSeq)));
            _query.Add(new Criterion("@strProblemOperatorID", request.ProblemOperatorID));
            _query.Add(new Criterion("@strProblemOperatorName", request.ProblemOperatorName));

            return _query;

        }

        public Query saveRework9(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework9);
            _query.Add(new Criterion("@selectedWO", request.WOID));
           

            return _query;

        }

        public Query saveRework10(MessagingService request)
        {
            _query = new Query(NamedQuery.saveRework10);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@CurProcOpSeq", Int32.Parse(request.ProcOpSeq)));

            return _query;

        }

        public Query comboMCList_SelectionChangeCommitted(MessagingService request)
        {
            _query = new Query(NamedQuery.comboMCList_SelectionChangeCommitted);
            _query.Add(new Criterion("@intKitTypeID", float.Parse(request.ItemID)));
            _query.Add(new Criterion("@intCustomerID", float.Parse(request.CustomerID)));
            return _query;
        }

        public Query comboMCList_SelectionChangeCommitted0(MessagingService request)
        {
            _query = new Query(NamedQuery.comboMCList_SelectionChangeCommitted0);
            _query.Add(new Criterion("@custID", float.Parse(request.CustomerID)));
            _query.Add(new Criterion("@strKityType", float.Parse(request.ItemName)));
            return _query;
        }

        public Query populateKitType(MessagingService request)
        {
            _query = new Query(NamedQuery.populateKitType);
            // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@comboWCList", request.CustomerName));
            return _query;
        }

        public Query populateKitType1(MessagingService request)
        {
            _query = new Query(NamedQuery.populateKitType1);
            // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@custID", request.CustomerName));
            return _query;
        }



        public Query GlobalGenerateWOMaterial(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWOMaterial);
            // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }


        public Query GlobalGenerateWODetail1(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWODetail1);
           // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        
        public Query AddQCEquipment(MessagingService request)
        {
            _query = new Query(NamedQuery.AddQCEquipment);
            _query.Add(new Criterion("@strWO", request.WOID));
            _query.Add(new Criterion("@strCentreID", request.WorkCenter));
            _query.Add(new Criterion("@strRouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@s", request.McID));
            return _query;
        }

        public Query GlobalMaxProcOpSeq(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalMaxProcOpSeq);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        public Query currentRoutesName(MessagingService request)
        {
            _query = new Query(NamedQuery.currentRoutesName);
            _query.Add(new Criterion("@CurRouteID", Int32.Parse(request.id)));
            return _query;
        }

        public Query generateReoworkDropDown(MessagingService request)
        {
            _query = new Query(NamedQuery.generateReoworkDropDown);
            _query.Add(new Criterion("@selectedWOParentWO", request.WOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.SeqNo)));
            _query.Add(new Criterion("@CenterID", request.CentreID));
            return _query;
        }

        public Query GenerateMCInfor(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateMCInfor);
            _query.Add(new Criterion("@selectedWOParentWO", request.WOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.SeqNo)));
            _query.Add(new Criterion("@CenterID", request.CentreID));
            _query.Add(new Criterion("@@MacCode", request.MacCode));
            return _query;
        }

        public Query cmdUpdateReceived_ClickCase7(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase7);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@QtyUpdated", Int32.Parse(request.QtyUpdated)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));

            return _query;
        }
        public Query cmdUpdateReceived_ClickCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase10_1);
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));


            return _query;
        }

        public Query cmdScrap_ClickCase10_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdScrap_ClickCase10_1);
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        

        public Query cmdUpdateReceived_ClickCase10_1_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase10_1_1);
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));


            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            //  _query.Add(new Criterion("@SetupStartDate", request.SetupStartDate));
            //_query.Add(new Criterion("@OperatorID", request.OperatorID));
            //_query.Add(new Criterion("@OperatorName", request.OperatorName));
            //_query.Add(new Criterion("@ShiftID", request.ShiftID));
            //_query.Add(new Criterion("@McID", request.McID));

            //_query.Add(new Criterion("@Remark", request.Remark));

            return _query;
        }
        public Query cmdUpdateReceived_ClickCase10_2(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase10_2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ExStatus", Int32.Parse(request.ExStatus)));
            _query.Add(new Criterion("@UpdatedDate", request.UpdatedDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));
            return _query;
        }
        public Query cmdUpdateReceived_ClickCase30(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase30);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query cmdUpdateReceived_ClickCase80_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase80_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            return _query;
        }
        public Query cmdUpdateReceived_ClickCase80_2(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase80_2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            return _query;
        }
        public Query cmdUpdateReceived_ClickCase95_1(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase95_1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@Status", request.Status));
            return _query;
        }
        public Query cmdUpdateReceived_ClickCase95_2(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase95_2);
            _query.Add(new Criterion("@ID", Int32.Parse(request.id)));
            _query.Add(new Criterion("@Status", request.Status));
            return _query;
        }

        public Query cmdUpdateReceived_ClickCase95_3(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdUpdateReceived_ClickCase95_3);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }




        public Query GlobalCurrentWorkOrderRoute(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalCurrentWorkOrderRoute);
            // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        public Query GlobalCurrentWorkOrderRouteWithRouteID(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalCurrentWorkOrderRouteWithRouteID);
            // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@routeID", request.RouteID));
            return _query;
        }

        


        public Query strGetOperatorName(MessagingService request)
        {
            _query = new Query(NamedQuery.strGetOperatorName);
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@selectedWC", request.WorkCenter));
            _query.Add(new Criterion("@selectedProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }


        public Query GlobalGenerateWODetail2(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWODetail2);
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query GlobalGenerateWOSummary(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWOSummary);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@strExecProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }


        

        public Query GlobalGenerateWODetail3(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWODetail3);
           // Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        public Query GlobalGenerateWODetail4(MessagingService request)
        {
            _query = new Query(NamedQuery.GlobalGenerateWODetail4);
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }
        public Query fnAddWO2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnAddWO2);
            Debug.WriteLine("WOID: " + request.WOID + "||");
            _query.Add(new Criterion("@strWOID", request.WOID));
            _query.Add(new Criterion("@index", request.Index));
            return _query;
        }

        public Query GenerateWOListRework1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOListRework1);
            _query.Add(new Criterion("@WOIDcheck", request.WOID));
            _query.Add(new Criterion("@proc", request.ProcOpSeq));
            return _query;
        }

        



        public Query Generate_ReworkRemarkList()
        {
            _query = new Query(NamedQuery.Generate_ReworkRemarkList);

            return _query;
        }

        public Query fnUpdateWO(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateWO);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder);
            _query.Add(new Criterion("@selectedWOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder1(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder1);
            _query.Add(new Criterion("@selectedWOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder2);
            _query.Add(new Criterion("@selectedWOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder3(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder3);
            _query.Add(new Criterion("@selectedWOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder4(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder4);
            _query.Add(new Criterion("@selectedWOID", request.WOID));

            return _query;
        }

        public Query fnUpdatePPOrder5(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder5);
            _query.Add(new Criterion("@PPID", request.PPID));

            return _query;
        }

        public Query fnUpdatePPOrder6(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder6);
            _query.Add(new Criterion("@PPID", request.PPID));
            return _query;
        }

        public Query fnUpdatePPOrder7(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdatePPOrder7);
            _query.Add(new Criterion("@PPID", request.PPID));
            return _query;
        }



        public Query fnGenerateRouteDetail1(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateRouteDetail1);
            _query.Add(new Criterion("@selectedWO", request.WOID));

            return _query;
        }

        public Query fnGenerateRouteDetail2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateRouteDetail2);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@index", request.Index));
            return _query;
        }

        public Query fnGenerateRouteDetail3(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateRouteDetail3);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@index", request.Index));

            return _query;
        }

        public Query fnGenerateRouteDetail4(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateRouteDetail4);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@index", request.Index));

            return _query;
        }

        public Query fnGenerateRouteDetail5(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateRouteDetail5);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@index", request.Index));

            return _query;
        }

        public Query AddWorkOrderRouteDispatch1(MessagingService request)
        {
            _query = new Query(NamedQuery.AddWorkOrderRouteDispatch1);
            _query.Add(new Criterion("@selectedWO", request.WOID ));
            
            return _query;
        }


        public Query sp_GetAvailMachineListForWO(MessagingService request)
        {
            _query = new Query(NamedQuery.sp_GetAvailMachineListForWO);
            _query.Add(new Criterion("@workOrderID", Int32.Parse(request.WOID)));
            _query.Add(new Criterion("@routeID", Int32.Parse(request.RouteID)));
            return _query;
        }
        

        public Query AddWorkOrderRouteDispatch2(MessagingService request)
        {
            _query = new Query(NamedQuery.AddWorkOrderRouteDispatch2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@PrioritizedNo", Int32.Parse(request.PrioritizedNo)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@RouteName", request.RouteName));
            _query.Add(new Criterion("@MacGroup", Int32.Parse(request.MacGroup)));
            _query.Add(new Criterion("@AttributeGroup", request.AttributeGroup));

            _query.Add(new Criterion("@McType", request.McType));
            return _query;
        }

        
         public Query strGetRouteName(MessagingService request)
        {
            _query = new Query(NamedQuery.AddWorkOrderRouteDispatch2);

            _query.Add(new Criterion("@CurRouteID", Int32.Parse(request.RouteID)));
            return _query;
        }

        public Query GenerateWOList2()
        {
            _query = new Query(NamedQuery.GenerateWOList2);
            return _query;
        }


        public Query GenerateWOSplitList()
        {
            _query = new Query(NamedQuery.GenerateWOSplitList);
            return _query;
        }

        public Query GenerateWOStatusReleaseStartDateThreshold()
        {
            _query = new Query(NamedQuery.GenerateWOStatusReleaseStartDateThreshold);
            return _query;
        }

        
        public Query GenerateMcID()
        {
            _query = new Query(NamedQuery.GenerateMcID);
            return _query;
        }

        public Query GenerateScrapRemark()
        {
            _query = new Query(NamedQuery.GenerateScrapRemark);
            return _query;
        }

        

        public Query GenerateUserIDList()
        {
            _query = new Query(NamedQuery.GenerateUserIDList);
            return _query;
        }


        public Query GenerateUnitCodeList()
        {
            _query = new Query(NamedQuery.GenerateUnitCodeList);
            return _query;
        }

        


        public Query GenerateThreshold()
        {
            _query = new Query(NamedQuery.GenerateThreshold);
            return _query;
        }

        public Query Generate_PauseReasonList()
        {
            _query = new Query(NamedQuery.generatePauseReasonList);
            return _query;
        }

        public Query Generate_TrackingRemarkList()
        {
            _query = new Query(NamedQuery.generateTrackingRemarkList);
            return _query;
        }

        public Query Generate_ScrapRemarkList()
        {
            _query = new Query(NamedQuery.generateScrapReasonList);
            return _query;
        }


        public Query GenerateDispatchWOList1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateDispatchWOList1);
            _query.Add(new Criterion("@WOID", request.WOID + "%"));
            return _query;
        }


        public Query GenerateDispatchWOList2(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateDispatchWOList2);
            _query.Add(new Criterion("@WOID", request.WOID + "%"));

            return _query;
        }

        public Query GenerateWOMaterial(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOMaterial);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }

        public Query CheckWO(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWO);
            _query.Add(new Criterion("@WOSelected", request.WOID));

            return _query;
        }

        



        public Query addSplitWO(MessagingService request)
        {
            _query = new Query(NamedQuery.addSplitWO);
            _query.Add(new Criterion("@ParentWOID", request.ParentWOID));
            _query.Add(new Criterion("@ChildWOID", request.ChildWOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@Type", request.Type));

            return _query;
        }

        public Query GenerateToolDescription(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateToolDescription);
            _query.Add(new Criterion("@workcentre", request.WorkCenter));
            _query.Add(new Criterion("@McType", request.McType));

            return _query;
        }


        public Query delWORoute(MessagingService request)
        {
            _query = new Query(NamedQuery.delWORoute);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@tempProcOpSeq", request.ProcOpSeq));

            return _query;
        }

        public Query delWOExe(MessagingService request)
        {
            _query = new Query(NamedQuery.delWOExe);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@tempProcOpSeq", request.ProcOpSeq));

            return _query;
        }

        public Query updateWOExecution(MessagingService request)
        {
            _query = new Query(NamedQuery.updateWOExecution);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@tempProcOpSeq", request.ProcOpSeq));

            return _query;
        }

        public Query buttonRefresh_ClickPriority1(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority1);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));

            return _query;
        }

        public Query buttonRefresh_ClickPriority2(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority2);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));


            return _query;
        }

        public Query buttonRefresh_ClickPriority3(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority3);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));
            _query.Add(new Criterion("@toolDes", request.ToolDescription));


            return _query;
        }

        public Query buttonRefresh_ClickPriority4(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority4);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));
            _query.Add(new Criterion("@toolDes", request.ToolDescription));


            return _query;
        }

        public Query buttonRefresh_ClickPriority5(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority5);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));
            _query.Add(new Criterion("@toolDes", request.ToolDescription));


            return _query;
        }

        public Query buttonRefresh_ClickPriority6(MessagingService request)
        {
            _query = new Query(NamedQuery.buttonRefresh_ClickPriority6);
            _query.Add(new Criterion("@macID", request.MacCode));
            _query.Add(new Criterion("@centreID", request.CentreID));
            _query.Add(new Criterion("@macType", request.MacType));
            _query.Add(new Criterion("@toolDes", request.ToolDescription));


            return _query;
        }



        public Query GenerateWODetail1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWODetail1);
            _query.Add(new Criterion("@selectedWO", request.WOID));

            return _query;
        }

        public Query getTSWorkOrder(MessagingService request)
        {
            _query = new Query(NamedQuery.getTSWorkOrder);
            _query.Add(new Criterion("@tempwo", request.WOID));
            return _query;
        }

        

        public Query GenerateWODetail2(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWODetail2);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query GenerateWOSummaryScrap(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOSummaryScrap);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query GenerateSubAssemblyWOList(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateSubAssemblyWOList);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        


        public Query addWORouteCurrent(MessagingService request)
        {
            Debug.WriteLine("addWORouteCurrent");
            Debug.WriteLine("WOID: " + request.WOID + "||");
            Debug.WriteLine("ProcOpSeq: " + request.ProcOpSeq + "||");
            Debug.WriteLine("________");
            _query = new Query(NamedQuery.addWORouteCurrent);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }


        public Query addWORouteNext(MessagingService request)
        {
            //Debug.WriteLine("addWORouteCurrent");
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            //Debug.WriteLine("ProcOpSeq: " + request.ProcOpSeq + "||");
            //Debug.WriteLine("________");
            _query = new Query(NamedQuery.addWORouteNext);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }


        


        public Query cmdOnHold_ClickCase20_1(MessagingService request)
        {

            _query = new Query(NamedQuery.cmdOnHold_ClickCase20_1);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query cmdOnHold_ClickCase20_2(MessagingService request)
        {

            _query = new Query(NamedQuery.cmdOnHold_ClickCase20_2);

            _query.Add(new Criterion("@ShiftID", request.ShiftID));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@Reason", request.reason));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@StartType", request.StartType));
            _query.Add(new Criterion("@StartDateTime", request.StartDateTime));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query cmdOnHold_ClickCase20_3(MessagingService request)
        {

            _query = new Query(NamedQuery.cmdOnHold_ClickCase20_3);
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@TotalSetupDuration", decimal.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", decimal.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query cmdUpdate_ClickCase15(MessagingService request)
        {

            _query = new Query(NamedQuery.cmdUpdate_ClickCase15);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }
        


        public Query addWORouteQC(MessagingService request)
        {
            Debug.WriteLine("addWORouteQC");
            Debug.WriteLine("WOID: " + request.WOID + "||");
            Debug.WriteLine("WorkCenter: " + request.WorkCenter + "||");
            Debug.WriteLine("RouteID: " + request.RouteID + "||");
            Debug.WriteLine("OpSeq: " + request.OpSeq + "||");
            Debug.WriteLine("ProcOpSeq: " + request.ProcOpSeq + "||");
            Debug.WriteLine("McID: " + request.McID + "||");
            Debug.WriteLine("McType: " + request.McType + "||");
            Debug.WriteLine("Remark: " + request.Type + "||");
            Debug.WriteLine("RouteName: " + request.RouteName + "||");
            Debug.WriteLine("________");


            _query = new Query(NamedQuery.addWORouteQC);
            _query.Add(new Criterion("@subwo", request.WOID));
            _query.Add(new Criterion("@tempworkcenter", request.WorkCenter));
            _query.Add(new Criterion("@temprouteid", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@tempopseq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@newProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@tempmcid", request.McID));
            _query.Add(new Criterion("@tempmctype", request.McType));
            _query.Add(new Criterion("@tempremark", request.Type));
            _query.Add(new Criterion("@temproutename", request.RouteName));
            return _query;
        }

        public Query addWORouteQC2(MessagingService request)
        {
            Debug.WriteLine("addWORouteQC2");
            Debug.WriteLine("WOID: " + request.WOID + "||");
            Debug.WriteLine("WorkCenter: " + request.WorkCenter + "||");
            Debug.WriteLine("RouteID: " + request.RouteID + "||");
            Debug.WriteLine("OpSeq: " + request.OpSeq + "||");
            Debug.WriteLine("ProcOpSeq: " + request.ProcOpSeq + "||");
            Debug.WriteLine("McID: " + request.McID + "||");
            Debug.WriteLine("McType: " + request.McType + "||");
            Debug.WriteLine("Remark: " + request.Remark + "||");
            Debug.WriteLine("RouteName: " + request.RouteName + "||");
            Debug.WriteLine("________");

            _query = new Query(NamedQuery.addWORouteQC);
            _query.Add(new Criterion("@subwo", request.WOID));
            _query.Add(new Criterion("@tempworkcenter", request.WorkCenter));
            _query.Add(new Criterion("@temprouteid", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@tempopseq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@newProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@tempmcid", request.McID));
            _query.Add(new Criterion("@tempmctype", request.McType));
            _query.Add(new Criterion("@tempremark", request.Remark));
            _query.Add(new Criterion("@temproutename", request.RouteName));
            return _query;
        }

        public Query addWO(MessagingService request)
        {
            //"":,
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            //Debug.WriteLine("PartID: " + request.PartID + "||");
            //Debug.WriteLine("RequestedDeliveryDate: " + request.RequestedDeliveryDate + "||");
            //Debug.WriteLine("CommittedDeliveryDate: " + request.CommittedDeliveryDate + "||");
            //Debug.WriteLine("ReleasedProdQty: " + request.ReleasedProdQty + "||");
            //Debug.WriteLine("ReleasedProdDate: " + request.ReleasedProdDate + "||");
            //Debug.WriteLine("ActualProdQty: " + request.ActualProdQty + "||");
            //Debug.WriteLine("ActualProdDate: " + request.ActualProdDate + "||");
            //Debug.WriteLine("ActualRecQty: " + request.ActualRecQty + "||");
            //Debug.WriteLine("CompletedQty: " + request.CompletedQty + "||");
            //Debug.WriteLine("CompletedDate: " + request.CompletedDate + "||");
            //Debug.WriteLine("OutstandingQty: " + request.OutstandingQty + "||");
            //Debug.WriteLine("OutstandingDate: " + request.OutstandingDate + "||");
            //Debug.WriteLine("WOStatus: " + request.WOStatus + "||");
            //Debug.WriteLine("ToolDescription: " + request.ToolDescription + "||");
            //Debug.WriteLine("PlannerRemark: " + request.PlannerRemark + "||");
            //Debug.WriteLine("ParentWOID: " + request.ParentWOID + "||");
            //Debug.WriteLine("Remark: " + request.Remark + "||");
            //Debug.WriteLine("SalesOrderID: " + request.SalesOrderID + "||");
            //Debug.WriteLine("OperatorID: " + request.OperatorID + "||");
            //Debug.WriteLine("OperatorName: " + request.OperatorName + "||");
            //Debug.WriteLine("ApprovedID: " + request.ApprovedID + "||");
            //Debug.WriteLine("ApprovedName: " + request.ApprovedName + "||");
            //Debug.WriteLine("ReleasedDate: " + request.ReleasedDate + "||");
            //Debug.WriteLine("OrderType: " + request.OrderType + "||");


            _query = new Query(NamedQuery.addWO);
            _query.Add(new Criterion("@subwo", request.WOID));
            _query.Add(new Criterion("@temppartid", request.PartID));
            _query.Add(new Criterion("@tempreqdate", request.RequestedDeliveryDate));//date
            _query.Add(new Criterion("@tempcommitdate", request.CommittedDeliveryDate));//date
            _query.Add(new Criterion("@temprelprodqty", Int32.Parse(request.ReleasedProdQty)));
            _query.Add(new Criterion("@temprelproddate", request.ReleasedProdDate));//date
            _query.Add(new Criterion("@tempactprodqty", Int32.Parse(request.ActualProdQty)));
            _query.Add(new Criterion("@tempactproddate", request.ActualProdDate));//date
            _query.Add(new Criterion("@tempactrecqty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@tempactrecdate", request.ActualRecDate));//date
            _query.Add(new Criterion("@tempcomqty", Int32.Parse(request.CompletedQty)));
            _query.Add(new Criterion("@tempcomdate", request.CompletedDate));//date
            _query.Add(new Criterion("@tempoutsqty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@tempoutsdate", request.OutstandingDate));//date
            _query.Add(new Criterion("@tempwostatus", request.WOStatus));
            _query.Add(new Criterion("@temptooldesc", request.ToolDescription));
            _query.Add(new Criterion("@tempplannremark", request.PlannerRemark));
            _query.Add(new Criterion("@tempparwo", request.ParentWOID));
            _query.Add(new Criterion("@tempremark", request.Remark));
            _query.Add(new Criterion("@tempppid", Int32.Parse(request.PPID)));
            _query.Add(new Criterion("@tempsaleid", request.SalesOrderID));
            _query.Add(new Criterion("@tempoperatorid", request.OperatorID));
            _query.Add(new Criterion("@tempoperatorname", request.OperatorName));

            _query.Add(new Criterion("@tempapprovedid", request.ApprovedID));
            _query.Add(new Criterion("@tempapprovedname", request.ApprovedName));
            _query.Add(new Criterion("@tempreleaseddate", request.ReleasedDate));//date
            _query.Add(new Criterion("@tempordertype", request.OrderType));

            return _query;
        }

        public Query fnInsertWO(MessagingService request)
        {
            //"":,
            //Debug.WriteLine("WOID: " + request.WOID + "||");
            //Debug.WriteLine("PartID: " + request.PartID + "||");
            //Debug.WriteLine("RequestedDeliveryDate: " + request.RequestedDeliveryDate + "||");
            //Debug.WriteLine("CommittedDeliveryDate: " + request.CommittedDeliveryDate + "||");
            //Debug.WriteLine("ReleasedProdQty: " + request.ReleasedProdQty + "||");
            //Debug.WriteLine("ReleasedProdDate: " + request.ReleasedProdDate + "||");
            //Debug.WriteLine("ActualProdQty: " + request.ActualProdQty + "||");
            //Debug.WriteLine("ActualProdDate: " + request.ActualProdDate + "||");
            //Debug.WriteLine("ActualRecQty: " + request.ActualRecQty + "||");
            //Debug.WriteLine("CompletedQty: " + request.CompletedQty + "||");
            //Debug.WriteLine("CompletedDate: " + request.CompletedDate + "||");
            //Debug.WriteLine("OutstandingQty: " + request.OutstandingQty + "||");
            //Debug.WriteLine("OutstandingDate: " + request.OutstandingDate + "||");
            //Debug.WriteLine("WOStatus: " + request.WOStatus + "||");
            //Debug.WriteLine("ToolDescription: " + request.ToolDescription + "||");
            //Debug.WriteLine("PlannerRemark: " + request.PlannerRemark + "||");
            //Debug.WriteLine("ParentWOID: " + request.ParentWOID + "||");
            //Debug.WriteLine("Remark: " + request.Remark + "||");
            //Debug.WriteLine("SalesOrderID: " + request.SalesOrderID + "||");
            //Debug.WriteLine("OperatorID: " + request.OperatorID + "||");
            //Debug.WriteLine("OperatorName: " + request.OperatorName + "||");
            //Debug.WriteLine("ApprovedID: " + request.ApprovedID + "||");
            //Debug.WriteLine("ApprovedName: " + request.ApprovedName + "||");
            //Debug.WriteLine("ReleasedDate: " + request.ReleasedDate + "||");
            //Debug.WriteLine("OrderType: " + request.OrderType + "||");


            _query = new Query(NamedQuery.fnInsertWO);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@RequestedDeliveryDate", request.RequestedDeliveryDate));//date
            _query.Add(new Criterion("@CommittedDeliveryDate", request.CommittedDeliveryDate));//date
            _query.Add(new Criterion("@ReleasedProdQty", Int32.Parse(request.ReleasedProdQty)));
            _query.Add(new Criterion("@ReleasedProdDate", request.ReleasedProdDate));//date
            _query.Add(new Criterion("@ActualProdQty", Int32.Parse(request.ActualProdQty)));
            _query.Add(new Criterion("@ActualProdDate", request.ActualProdDate));//date
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));//date
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));//date
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@PPID", Int32.Parse(request.PPID)));
            _query.Add(new Criterion("@SalesOrderID", request.SalesOrderID));
            _query.Add(new Criterion("@ToolDescription", request.ToolDescription));
            _query.Add(new Criterion("@ReleasedDate", request.ReleasedDate));//date
            _query.Add(new Criterion("@OrderType", request.OrderType));
            _query.Add(new Criterion("@PlannerRemark", request.PlannerRemark));

            return _query;
        }

        









        public Query GenerateWOSummary1(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOSummary1);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            return _query;
        }

        public Query GenerateWOSummary2(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateWOSummary2);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        

        public Query fnGenerateLabel(MessagingService request)
        {
            _query = new Query(NamedQuery.fnGenerateLabel);
            _query.Add(new Criterion("@id", request.id));

            return _query;
        }


        public Query addWOExe1(MessagingService request)
        {
            _query = new Query(NamedQuery.addWOExe1);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@tempProcOpSeq", request.ProcOpSeq));
            return _query;
        }

        public Query addWOExe2(MessagingService request)
        {
            _query = new Query(NamedQuery.addWOExe2);
            _query.Add(new Criterion("@tempwo", request.WOID));
            _query.Add(new Criterion("@tempProcOpSeq", request.ProcOpSeq));

            return _query;
        }

        public Query addWOExe3(MessagingService request)
        {
            _query = new Query(NamedQuery.addWOExe3);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@PartID", request.PartID));
            _query.Add(new Criterion("@ActualRecQty", Int32.Parse(request.ActualRecQty)));//int
            _query.Add(new Criterion("@ActualRecDate", request.ActualRecDate));//date
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));//int
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));//date
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty)));//int
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate));//date
            _query.Add(new Criterion("@McID", request.McID));//date
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@Type", request.Type));
            _query.Add(new Criterion("@ParentWOID", request.ParentWOID));
            _query.Add(new Criterion("@QtyUpdated", Int32.Parse(request.QtyUpdated)));

            return _query;
        }

        public Query AddScrapRemark(MessagingService request)
        {
            _query = new Query(NamedQuery.AddScrapRemark);
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query generateWorkCenterInPriority(MessagingService request)
        {
            _query = new Query(NamedQuery.generateWorkCenterInPriority);
            _query.Add(new Criterion("@McType", request.McType));

            return _query;
        }

        public Query generateMcIDInPriority(MessagingService request)
        {
            _query = new Query(NamedQuery.generateMcIDInPriority);
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        public Query comboWO_SelectedIndexChanged(MessagingService request)
        {
            _query = new Query(NamedQuery.comboWO_SelectedIndexChanged);
            _query.Add(new Criterion("@selectedWO", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));

            return _query;
        }

        






        public Query ConfirmGCReorder(MessagingService request)
        {

            if (request.McID == "")
            {
                request.McID = " ";
            }
            _query = new Query(NamedQuery.ConfirmGCReorder);
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@McType", request.McType));
            _query.Add(new Criterion("@PrioritizedNo", Int32.Parse(request.PrioritizedNo)));
            _query.Add(new Criterion("@WOID",request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query GenerateMCWOList(MessagingService request)
        {

            if (request.McID == "" ||request.McID == null) {
                Debug.WriteLine("");
                Debug.WriteLine("McID: |" + request.McID + "|");
                Debug.WriteLine("workCenter: |" + request.WorkCenter + "||");
                Debug.WriteLine("");
                request.McID = " ";
            }


            _query = new Query(NamedQuery.GenerateMCWOList);
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query GetEndDate_New(MessagingService request)
        {
            _query = new Query(NamedQuery.GetEndDate_New);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        



        public Query AddTrackingRemark(MessagingService request)
        {
            _query = new Query(NamedQuery.AddTrackingRemark);
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query AddPauseReason(MessagingService request)
        {
            _query = new Query(NamedQuery.AddPauseReason);
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query RemovePauseReason(MessagingService request)
        {
            _query = new Query(NamedQuery.RemovePauseReason);
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query RemoveTrackingRemark(MessagingService request)
        {
            _query = new Query(NamedQuery.RemoveTrackingRemark);
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query RemoveScrapRemark(MessagingService request)
        {
            _query = new Query(NamedQuery.RemoveScrapRemark);
            Debug.WriteLine("remark: " + request.reason + "||");
            _query.Add(new Criterion("@reason", request.reason));

            return _query;
        }

        public Query UpdateThreshold(MessagingService request)
        {
            //Debug.WriteLine("threshold: " + request.threshold + "||");
            _query = new Query(NamedQuery.UpdateThreshold);
            _query.Add(new Criterion("@value", Int32.Parse(request.threshold)));

            return _query;
        }


        public Query UpdateWOStatusReleaseStartDateThreshold(MessagingService request)
        {
            //Debug.WriteLine("threshold: " + request.threshold + "||");
            _query = new Query(NamedQuery.UpdateWOStatusReleaseStartDateThreshold);
            _query.Add(new Criterion("@value", Int32.Parse(request.releaseThreshold)));

            return _query;
        }









        public Query spGenerateDynamicWOStatusListStatement(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamicWOStatusListStatement);
            // _query.Add(new Criterion("@Test", "Select * From SIMAPS_MOM.dbo.WorkOrderInfo"));
            //_query.Add(new Criterion("@McID", "LASER"));
            //_query.Add(new Criterion("@WOID", "2017050001"));
            //_query.Add(new Criterion("@WorkCenter", "Laser"));
            //_query.Add(new Criterion("@Remark", ""));
            //_query.Add(new Criterion("@PartID", "14VS078A201-01"));
            //_query.Add(new Criterion("@PartNO", "301718-TESTING"));
            //_query.Add(new Criterion("@CustomerList", "MAKINO"));
            //_query.Add(new Criterion("@SONO", "1"));//
            //_query.Add(new Criterion("@FGDimension", "REPEAT"));
            //_query.Add(new Criterion("@WOStatus", "Queuing"));

            Debug.WriteLine("McID: " + request.McID + "||");
            Debug.WriteLine("WOID: " + request.WOID + "||");
            Debug.WriteLine("WorkCenter: " + request.WorkCenter + "||");

            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//todo
            _query.Add(new Criterion("@McID", request.McID + "%"));
            _query.Add(new Criterion("@WOID", request.WOID + "%"));

            //Debug.WriteLine("WorkCenter: "+request.WorkCenter+"||");

            //_query.Add(new Criterion("@WorkCenter", request.WorkCenter+"%"));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));

            _query.Add(new Criterion("@PartID", request.PartID + "%"));
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));

            _query.Add(new Criterion("@SONO", request.SONO + "%"));//

            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));

            // _query.Add(new Criterion("@StartDate", "20150101"));
            // _query.Add(new Criterion("@EndDate", "20170630"));
            return _query;
        }

        public Query spGenerateDynamic12(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic12);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic13(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic13);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic14(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic14);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic2(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic2);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic3(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic3);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic4(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic4);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic5(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic5);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic6(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic6);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic7(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic7);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic8(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic8);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic9(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic9);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic10(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic10);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic11(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic11);
            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }

        public Query spGenerateDynamic1(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamic1);
            Debug.WriteLine("McID: ||" + request.McID + "||");
            Debug.WriteLine("WOID: ||" + request.WOID + "||");
            Debug.WriteLine("WorkCenter: ||" + request.WorkCenter + "||");
            Debug.WriteLine("Start: ||" + request.StartDate + "||");
            Debug.WriteLine("End: ||" + request.EndDate + "||");

            if (request.radio == null)
            {
                request.radio = "";
            }
            if (request.McID == null)
            {
                request.McID = "";
            }
            if (request.WOID == null)
            {
                request.WOID = "";
            }
            if (request.WorkCenter == null)
            {
                request.WorkCenter = "";
            }
            if (request.PartID == null)
            {
                request.PartID = "";
            }
            if (request.PartNO == null)
            {
                request.PartNO = "";
            }
            if (request.CustomerList == null)
            {
                request.CustomerList = "";
            }
            if (request.SONO == null)
            {
                request.SONO = "";
            }
            if (request.FGDimension == null)
            {
                request.FGDimension = "";
            }
            if (request.StartDate == null)
            {
                request.StartDate = "";
            }

            if (request.EndDate == null)
            {
                request.EndDate = "";
            }

            if (request.Remark1 == null)
            {
                request.Remark1 = "";
            }


            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//
            _query.Add(new Criterion("@McID", request.McID + "%"));//
            _query.Add(new Criterion("@WOID", request.WOID + "%"));//
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter+"%"));//
            _query.Add(new Criterion("@PartID", request.PartID + "%"));//
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));//
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));//
            _query.Add(new Criterion("@SONO", request.SONO + "%"));//
            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));//
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate ));
            _query.Add(new Criterion("@EndDate", request.EndDate ));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));
            return _query;
        }


        public Query spGenerateDynamicWOStatusListStatement1(MessagingService request)
        {
            _query = new Query(NamedQuery.spGenerateDynamicWOStatusListStatement1);


            Debug.WriteLine("McID: " + request.McID + "||");
            Debug.WriteLine("WOID: " + request.WOID + "||");
            Debug.WriteLine("WorkCenter: " + request.WorkCenter + "||");

            _query.Add(new Criterion("@radio", request.radio + "%"));//todo
            _query.Add(new Criterion("@Remark", "%"));//todo
            _query.Add(new Criterion("@McID", request.McID + "%"));
            _query.Add(new Criterion("@WOID", request.WOID + "%"));

            //Debug.WriteLine("WorkCenter: "+request.WorkCenter+"||");

            //_query.Add(new Criterion("@WorkCenter", request.WorkCenter+"%"));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter + "%"));

            _query.Add(new Criterion("@PartID", request.PartID + "%"));
            _query.Add(new Criterion("@PartNO", request.PartNO + "%"));
            _query.Add(new Criterion("@CustomerList", request.CustomerList + "%"));

            _query.Add(new Criterion("@SONO", request.SONO + "%"));//

            _query.Add(new Criterion("@FGDimension", request.FGDimension + "%"));
            _query.Add(new Criterion("@WOStatus", request.radio + "%"));
            _query.Add(new Criterion("@StartDate", request.StartDate));
            _query.Add(new Criterion("@EndDate", request.EndDate));
            _query.Add(new Criterion("@Remark1", request.Remark1 + "%"));

            // _query.Add(new Criterion("@StartDate", "20150101"));
            // _query.Add(new Criterion("@EndDate", "20170630"));
            return _query;
        }

        public Query ScrapbutConfirm_Click1(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapbutConfirm_Click1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq) ));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));

            return _query;
        }

        public Query ScrapbutConfirm_Click2(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapbutConfirm_Click2);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@ScrapQty", Int32.Parse(request.ScrapQty)));
            _query.Add(new Criterion("@Remark", request.Remark));
            _query.Add(new Criterion("@ScrapType", request.ScrapType));
            _query.Add(new Criterion("@ScrapDate", request.ScrapDate));
            _query.Add(new Criterion("@UserID", request.UserID));
            _query.Add(new Criterion("@UserName", request.UserName));
            _query.Add(new Criterion("@Status", request.Status));






            return _query;
        }

        public Query ScrapbutConfirm_Click3(MessagingService request)
        {
            _query = new Query(NamedQuery.ScrapbutConfirm_Click3);



            Debug.WriteLine("OutstandingQty: " + request.OutstandingQty + "||");
            _query.Add(new Criterion("@AccumulatedScrapQty", Int32.Parse(request.AccumulatedScrapQty)));//todo
            _query.Add(new Criterion("@AccumulatedScrapDate", request.AccumulatedScrapDate));//todo
            _query.Add(new Criterion("@OutstandingQty", Int32.Parse(request.OutstandingQty) ));
            _query.Add(new Criterion("@OutstandingDate", request.OutstandingDate ));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query btnCancelWO_ClickCase20_1(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase20_1);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@StopDateTime", request.StopDateTime));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query btnCancelWO_ClickCase20_2(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase20_2);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdEndDate ", request.ProdEndDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@TotalSetupDuration", float.Parse(request.TotalSetupDuration)));
            _query.Add(new Criterion("@ProdTotalDuration", float.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query btnCancelWO_ClickCase20_2_1(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase20_2_1);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@ProdEndDate ", request.ProdEndDate));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@ProdTotalDuration", float.Parse(request.ProdTotalDuration)));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query btnCancelWO_ClickCase30_1(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase30_1);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query btnCancelWO_ClickCase30_1_1(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase30_1_1);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@OperatorName", request.OperatorName));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query btnCancelWO_ClickCase40_1(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase40_1);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query btnCancelWO_ClickCase40_2(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase40_2);

            _query.Add(new Criterion("@DiscardReason", request.DiscardReason));//todo
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            return _query;
        }

        public Query btnCancelWO_ClickCase40_3(MessagingService request)
        {
            _query = new Query(NamedQuery.btnCancelWO_ClickCase40_3);

            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@StopDateTime ", request.StopDateTime));
            _query.Add(new Criterion("@EndType", request.endType));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query butConfirm_Click1(MessagingService request)
        {
            _query = new Query(NamedQuery.butConfirm_Click1);

            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));//todo
            _query.Add(new Criterion("@ScrapQty", Int32.Parse(request.ScrapQty)));//todo
            _query.Add(new Criterion("@Remark", request.Type));
            _query.Add(new Criterion("@ScrapType", request.ScrapType));
            _query.Add(new Criterion("@ScrapDate", request.ScrapDate));
            _query.Add(new Criterion("@UserID", request.UserID));
            _query.Add(new Criterion("@UserName", request.UserName));
            _query.Add(new Criterion("@Status", request.Status));
            _query.Add(new Criterion("@ApprovedID", request.ApprovedID));
            _query.Add(new Criterion("@ApprovedName", request.ApprovedName));
            return _query;
        }

        public Query butConfirm_Click2(MessagingService request)
        {
            _query = new Query(NamedQuery.butConfirm_Click2);

            _query.Add(new Criterion("@ScrapQty", Int32.Parse(request.ScrapQty)));//todo
            _query.Add(new Criterion("@AccumulatedScrapDate ", request.AccumulatedScrapDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query butConfirm_Click3(MessagingService request)
        {
            _query = new Query(NamedQuery.butConfirm_Click3);
            _query.Add(new Criterion("@ScrapQty", Int32.Parse(request.ScrapQty)));//todo
            _query.Add(new Criterion("@AccumulatedScrapDate ", request.AccumulatedScrapDate));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//todo
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query Generate_WOSplitDetail(MessagingService request)
        {
            _query = new Query(NamedQuery.Generate_WOSplitDetail);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckAnyChildNotCompletedOwn1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompletedOwn1);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckAnyChildNotCompletedOwn2(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckAnyChildNotCompletedOwn2);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query GenerateOperatorList(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateOperatorList);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq))); 
            return _query;
        }

        public Query cmdConfirm_ClickCase10(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdConfirm_ClickCase10);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }


        public Query GetCurrentShiftID(MessagingService request)
        {
            _query = new Query(NamedQuery.GetCurrentShiftID);
            _query.Add(new Criterion("@CurrentTime", request.CurrentTime));
            return _query;
        }

        public Query GenerateQCEquipmentList(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateQCEquipmentList);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            return _query;
        }

        public Query GenerateSeletedQCEquipmentList(MessagingService request)
        {
            _query = new Query(NamedQuery.GenerateSeletedQCEquipmentList);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query cmdAdd_Click(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdAdd_Click);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }

        public Query cmdDelete_Click(MessagingService request)
        {
            _query = new Query(NamedQuery.cmdDelete_Click);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@RouteID", Int32.Parse(request.RouteID)));
            _query.Add(new Criterion("@OpSeq", Int32.Parse(request.OpSeq)));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }

        public Query fnUpdateOperator1(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query fnUpdateOperator2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator2);
            _query.Add(new Criterion("@ReceivedDate", request.ReceivedDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query fnUpdateOperator3(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator3);
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query fnUpdateOperator4(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator4);
            _query.Add(new Criterion("@OperatorStatus", request.OperatorStatus));
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@OperatorID", request.OperatorID));
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));
            return _query;
        }

        public Query fnUpdateOperator5(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator5);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));//
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//
            _query.Add(new Criterion("@WOID", request.WOID));//
            _query.Add(new Criterion("@McID", request.McID));//
            _query.Add(new Criterion("@OperatorID", request.OperatorID));//
            _query.Add(new Criterion("@McType", request.McType));//
            _query.Add(new Criterion("@OperatorName", request.OperatorName));//
            _query.Add(new Criterion("@ReceivedQty", Int32.Parse(request.ReceivedQty)));//
            _query.Add(new Criterion("@ReceivedDate", request.ReceivedDate));//
            return _query;
        }

        public Query fnUpdateOperator6(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator6);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));//
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//
            _query.Add(new Criterion("@WOID", request.WOID));//
            _query.Add(new Criterion("@McID", request.McID));//
            _query.Add(new Criterion("@OperatorID", request.OperatorID));//
            _query.Add(new Criterion("@McType", request.McType));//
            _query.Add(new Criterion("@OperatorName", request.OperatorName));//
            _query.Add(new Criterion("@CompletedQty", Int32.Parse(request.CompletedQty)));//
            _query.Add(new Criterion("@CompletedDate", request.CompletedDate));//
            return _query;
        }

        public Query fnUpdateOperator7(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateOperator7);
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));//
            _query.Add(new Criterion("@ProcOpSeq", Int32.Parse(request.ProcOpSeq)));//
            _query.Add(new Criterion("@WOID", request.WOID));//
            _query.Add(new Criterion("@McID", request.McID));//
            _query.Add(new Criterion("@OperatorID", request.OperatorID));//
            _query.Add(new Criterion("@McType", request.McType));//
            _query.Add(new Criterion("@OperatorName", request.OperatorName));//
            _query.Add(new Criterion("@OperatorStatus", request.OperatorStatus));//
            return _query;
        }


        public Query CheckWOReady1(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOReady1);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckWOReady2(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOReady2);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query CheckWOReady3(MessagingService request)
        {
            _query = new Query(NamedQuery.CheckWOReady3);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }


        public Query populateOperatorID(MessagingService request)
        {
            _query = new Query(NamedQuery.populateOperatorID);
            _query.Add(new Criterion("@WOID", request.WOID));
            return _query;
        }

        public Query fnUpdateWOExecution(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateWOExecution);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", request.RouteID));
            _query.Add(new Criterion("@ProcOpSeq", request.ProcOpSeq));
            _query.Add(new Criterion("@McID", request.McID));
            return _query;
        }

        public Query fnUpdateWOExecution1(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateWOExecution1);
            _query.Add(new Criterion("@WOID", request.WOID));
            _query.Add(new Criterion("@WorkCenter", request.WorkCenter));
            _query.Add(new Criterion("@RouteID", request.RouteID));
            _query.Add(new Criterion("@ProcOpSeq", request.ProcOpSeq));
            _query.Add(new Criterion("@McID", request.McID));
            _query.Add(new Criterion("@WOStatus", request.WOStatus));
            
            return _query;
        }

        public Query fnUpdateWOExecution2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateWOExecution2);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }

        public Query fnUpdateWOExecution3(MessagingService request)
        {
            _query = new Query(NamedQuery.fnUpdateWOExecution3);
            _query.Add(new Criterion("@WOID", request.WOID));

            return _query;
        }


        public Query getOperatorName(MessagingService request)
        {
            _query = new Query(NamedQuery.getOperatorName);
            _query.Add(new Criterion("@OperatorID", request.OperatorID));

            return _query;
        }

        public Query fnAddFGInventory1(MessagingService request)
        {
            _query = new Query(NamedQuery.fnAddFGInventory1);
            _query.Add(new Criterion("@woid", request.WOID));

            return _query;
        }

        public Query fnAddFGInventory2(MessagingService request)
        {
            _query = new Query(NamedQuery.fnAddFGInventory2);
            _query.Add(new Criterion("@Location", request.Location));
            _query.Add(new Criterion("@DateIn", request.DateIn));
            _query.Add(new Criterion("@InvType", request.InvType));
            _query.Add(new Criterion("@PartNo", request.PartNo));
            _query.Add(new Criterion("@WorkOrder", request.WOID));
            _query.Add(new Criterion("@Customer", request.Customer));
            _query.Add(new Criterion("@SeqNo", Int32.Parse(request.SeqNo)));
            _query.Add(new Criterion("@CenterID", request.CenterID));
            _query.Add(new Criterion("@Qty", Int32.Parse(request.Qty)));
            _query.Add(new Criterion("@BalQty",Int32.Parse(request.BalQty)));
            _query.Add(new Criterion("@Status", request.Status));


            return _query;
        }

        







    }
}

//@Test VARCHAR(50),
//@WOID VARCHAR(50),
//@WorkCenter VARCHAR(50),
//@McID VARCHAR(50),
//@Remark VARCHAR(50),
//@PartID VARCHAR(50),
//@PartNO VARCHAR(50),
//@CustomerList VARCHAR(50),
//@SONO VARCHAR(50),
//@FGDimension VARCHAR(50),
//@WOStatus VARCHAR(50)
