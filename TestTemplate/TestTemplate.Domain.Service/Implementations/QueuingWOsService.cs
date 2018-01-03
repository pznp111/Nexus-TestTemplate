using TestTemplate.Domain.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Messaging;
using TestTemplate.Repository;
using System.Data;
using TestTemplate.Domain.Service.Implementations.Factory;
using Nexus.Infrastructure.DbAccess.AdoNet;
using TestTemplate.Repository.EntityFramework;

namespace TestTemplate.Domain.Service.Implementations
{
    public class QueuingWOsService : IQueuingWOsService
    {
        private readonly IStoredQueryRepository iStoredQueryRepository;
        public QueuingWOsService() : this(new StoredQueryRepository())
        {

        }
        public QueuingWOsService(IStoredQueryRepository storedQueryRepository)
        {
            iStoredQueryRepository = storedQueryRepository;
        }
        

        public QueryResponse GenerateWOList12()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList12());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateQCWOList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateQCWOList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOLock()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOLock());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateFunctionLock()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateFunctionLock());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOListRelease()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOListRelease());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populatePartIDlist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populatePartIDlist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateCustomerNamelist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateCustomerNamelist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateFGDimensionlist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateFGDimensionlist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populatePONumberlist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populatePONumberlist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateSOLineNolist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateSOLineNolist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateSORemarklist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateSORemarklist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        //QueryResponse GenerateUserNameList();
        public QueryResponse GenerateUserNameList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateUserNameList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse populateMachineID()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateMachineID());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWorkCentre()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWorkCentre());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWOlist()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOlist());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse populateCustomer()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateCustomer());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse getAllWOID()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().getAllWOID());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnAddWO1()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnAddWO1());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse allRoutesName()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().allRoutesName());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        


        public QueryResponse GenerateWOListRework()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOListRework());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }




        public QueryResponse Generate_ReworkRemarkList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_ReworkRemarkList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList1()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList1());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList2()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList2());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        public QueryResponse GenerateMcID()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateMcID());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateScrapRemark()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateScrapRemark());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOSplitList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOSplitList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        

        public QueryResponse GenerateWOStatusReleaseStartDateThreshold()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOStatusReleaseStartDateThreshold());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse GenerateUserIDList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateUserIDList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateUnitCodeList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateUnitCodeList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        



        public QueryResponse GenerateThreshold()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateThreshold());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse GenerateScrapRemarkList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_ScrapRemarkList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateTrackingRemarkList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_TrackingRemarkList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse GeneratePauseReasonList()
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_PauseReasonList());
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse spGenerateDynamicWOStatusList()
        {
            QueryResponse response = new QueryResponse();
           // DataTable result;
            //try
            //{
            //    result = iStoredQueryRepository.Translate(new QueryFactory().spGenerateDynamicWOStatusListStatement1());
            //    response.Success = true;
            //    response.Result = result;
            //    response.TotalRecords = result.Rows.Count;
            //}
            //catch (Exception e)
            //{
            //    response.Success = false;
            //    response.Message = e.Message;
            //}
            return response;
        }
        public QueryResponse CheckWOOpnStatus1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWOOpnStatus1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CheckWOOpnStatus2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWOOpnStatus2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CheckWOOpnStatus2_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWOOpnStatus2_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CheckWOOpnStatus3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWOOpnStatus3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CheckWOOpnStatus3_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWOOpnStatus3_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse fnValidateUserNameMCAssign(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnValidateUserNameMCAssign(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        
        public QueryResponse cmdOnHold_ClickCase20_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdOnHold_ClickCase20_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse cmdOnHold_ClickCase20_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdOnHold_ClickCase20_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse cmdUpdate_ClickCase15(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdate_ClickCase15(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse cmdOnHold_ClickCase20_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdOnHold_ClickCase20_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateMcIDByWorkCenter(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateMcIDByWorkCenter(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse productionPauseCase20_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionPauseCase20_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionPauseCase20_1_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionPauseCase20_1_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse setupPauseCase20_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupPauseCase20_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        

        public QueryResponse productionPauseCase20_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionPauseCase20_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionPauseCase20_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionPauseCase20_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse fnCheckPriorityConfig(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnCheckPriorityConfig(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse UpdateQtyFromPreviousProcOpSeq1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateQtyFromPreviousProcOpSeq1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse UpdateQtyFromPreviousProcOpSeq2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateQtyFromPreviousProcOpSeq2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse comboWO_Selected_wotraking(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().comboWO_Selected_wotraking(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse releasedReportSearch(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().releasedReportSearch(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse reworkReport1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().reworkReport1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse reworkReport2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().reworkReport2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse reworkReport3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().reworkReport3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse ScrapReport1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapReport1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse ScrapReport2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapReport2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse ScrapReport3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapReport3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        

        public QueryResponse getWOdetail(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().getWOdetail(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        
        public QueryResponse productionResumeCase10_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionResumeCase10_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        


        public QueryResponse setupResumeCase10_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupResumeCase10_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse productionResumeCase10_1_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionResumeCase10_1_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        

        public QueryResponse productionResumeCase10_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionResumeCase10_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        
        public QueryResponse setupStartCase10_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase10_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse setupStartCase10_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase10_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse productionResumeCase10_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionResumeCase10_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionResumeCase10_4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionResumeCase10_4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse RemoveQCAttachment1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().RemoveQCAttachment1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse AddQCAttachment1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddQCAttachment1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }





        public QueryResponse frmExecutionHistory1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().frmExecutionHistory1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse frmExecutionHistory2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().frmExecutionHistory2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionStopCase10_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionStopCase10_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionStopCase10_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionStopCase10_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse productionStopCase10_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().productionStopCase10_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        
        public QueryResponse setupStartCase40_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        
        public QueryResponse setupStopCase40_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStopCase40_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse cmdConfirm_ClickCase40_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdConfirm_ClickCase40_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse cmdConfirm_ClickCase30_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdConfirm_ClickCase30_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse setupStartCase40_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse setupStopCase30_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStopCase30_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        

        public QueryResponse setupStartCase40_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse setupStartCase40_4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse setupStartCase40_5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse setupStartCase40_6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().setupStartCase40_6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GetGetSalesID(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GetGetSalesID(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse splitReportCellClicked1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReportCellClicked1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse splitReportCellClicked2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReportCellClicked2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse splitReportCellClicked3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReportCellClicked3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse GenerateWCList1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWCList1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWCList2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWCList2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWCList3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWCList3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWCList4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWCList4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
         public QueryResponse fnUpdateRoute(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdateRoute(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse Generate_RouteDetail1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_RouteDetail1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse getCurrentWorkOrderByMcID(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().getCurrentWorkOrderByMcID(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse BackupHMLVTSByYear(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().BackupHMLVTSByYear(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse FunctionUnLockWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().FunctionUnLockWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse CheckSubconWOOpnStatus(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckSubconWOOpnStatus(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.ToString();
            }
            return response;

        }


        public QueryResponse CalculateTimeSpan1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.ToString() ;
            }
            return response;

        }

        public QueryResponse CalculateTimeSpan2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse CalculateTimeSpan3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        

        public QueryResponse CalculateTimeSpan4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CalculateTimeSpan5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CalculateTimeSpan6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CalculateTimeSpan7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateTimeSpan7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
         public QueryResponse CalculateSubconTimeSpan(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateSubconTimeSpan(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse FunctionUnLockFunction(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().FunctionUnLockFunction(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse Generate_RouteDetail2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_RouteDetail2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse Generate_RouteDetail3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_RouteDetail3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse GenerateQueuingWOList1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateQueuingWOList1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateQueuingWOList2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateQueuingWOList2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateAttachmentList(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateAttachmentList(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse CalculateDuration1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateDuration1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CalculateDuration2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateDuration2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CalculateDuration3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CalculateDuration3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse GenerateWOList3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse GenerateWOList6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList8(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList8(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList9(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList9(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList10(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList10(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateWOList11(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOList11(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse UpdateWOAlertStatus(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateWOAlertStatus(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        

        public QueryResponse GetCurProcOpSeq(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GetCurProcOpSeq(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse populateWOSummary(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOSummary(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse wodetailTable3Click1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().wodetailTable3Click1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse wodetailTable3Click2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().wodetailTable3Click2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse splitReport1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReport1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse splitReport2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReport2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse splitReport3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().splitReport3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        
        public QueryResponse populateProcessRouteDetails1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateProcessRouteDetails1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateProcessRouteDetails2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateProcessRouteDetails2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateProcessRouteDetails3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateProcessRouteDetails3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateProcessRouteDetails4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateProcessRouteDetails4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWOExecutionSummary(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOExecutionSummary(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWOinfoTable1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOinfoTable1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWOinfoTable2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOinfoTable2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse populateWOinfoTable3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateWOinfoTable3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        public QueryResponse ChkChild(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ChkChild(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse fnInsertQCEquipment(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnInsertQCEquipment(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnInsertWOExecution(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnInsertWOExecution(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse comboMCList_SelectionChangeCommitted(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().comboMCList_SelectionChangeCommitted(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse comboMCList_SelectionChangeCommitted0(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().comboMCList_SelectionChangeCommitted0(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateMCInfor(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateMCInfor(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse generateReoworkDropDown(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().generateReoworkDropDown(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GlobalGenerateWOMaterial(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWOMaterial(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGetUserAccessRight(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGetUserAccessRight(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
                response.Message = e.ToString();
            }
            return response;

        }


        public QueryResponse GlobalGenerateWODetail1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWODetail1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GlobalGenerateWODetail2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWODetail2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        
        public QueryResponse fnTrackSetupConfig(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnTrackSetupConfig(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GlobalGenerateWODetail3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWODetail3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GlobalGenerateWODetail4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWODetail4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnInsertWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnInsertWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        public QueryResponse fnAddWO2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnAddWO2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGenerateRouteDetail1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateRouteDetail1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGenerateRouteDetail2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateRouteDetail2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGenerateRouteDetail3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateRouteDetail3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGenerateRouteDetail4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateRouteDetail4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse fnGenerateRouteDetail5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateRouteDetail5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }



        public QueryResponse AddWorkOrderRouteDispatch1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddWorkOrderRouteDispatch1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse AddWorkOrderRouteDispatch2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddWorkOrderRouteDispatch2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateDispatchWOList1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateDispatchWOList1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GenerateDispatchWOList2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateDispatchWOList2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse CheckWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse saveReworkMac1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveReworkMac1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveReworkMac2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveReworkMac2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        


        public QueryResponse currentRoutesName(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().currentRoutesName(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse addSplitWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addSplitWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse updateWOExecution(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().updateWOExecution(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse delWOExe(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().delWOExe(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse sp_GetAvailMachineListForWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().sp_GetAvailMachineListForWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        

        public QueryResponse strGetOperatorName(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().strGetOperatorName(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse GenerateOperatorReport(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateOperatorReport(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse delWORoute(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().delWORoute(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        
        public QueryResponse GlobalCurrentWorkOrderRoute(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalCurrentWorkOrderRoute(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        

        public QueryResponse GlobalCurrentWorkOrderRouteWithRouteID(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalCurrentWorkOrderRouteWithRouteID(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse strGetRouteName(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().strGetRouteName(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        
        public QueryResponse regenerateRoutingData(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().regenerateRoutingData(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse addWOExe1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWOExe1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse addWOExe2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWOExe2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse addWOExe3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWOExe3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GlobalGenerateWOSummary(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalGenerateWOSummary(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        

        public QueryResponse addWORouteQC(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWORouteQC(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse addWORouteQC2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWORouteQC2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse addWORouteCurrent(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWORouteCurrent(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GlobalMaxProcOpSeq(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GlobalMaxProcOpSeq(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        


         public QueryResponse GenerateWOListRework1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOListRework1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse populateKitType(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateKitType(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse populateKitType1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().populateKitType1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateToolDescription(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateToolDescription(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnInsertRoute(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnInsertRoute(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        
        public QueryResponse AddQCEquipment(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddQCEquipment(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        
        public QueryResponse saveRework1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework8(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework8(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework9(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework9(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse saveRework10(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().saveRework10(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse buttonRefresh_ClickPriority6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().buttonRefresh_ClickPriority6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse addWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().addWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        

        public QueryResponse fnUpdateWO(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdateWO(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnUpdatePPOrder7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnUpdatePPOrder7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse getTSWorkOrder(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().getTSWorkOrder(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateWOSummaryScrap(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOSummaryScrap(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateSubAssemblyWOList(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateSubAssemblyWOList(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }



        public QueryResponse GenerateWOSummary1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOSummary1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateWOSummary2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOSummary2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateWOMaterial(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWOMaterial(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateWODetail1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWODetail1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateWODetail2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateWODetail2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse comboWO_SelectedIndexChanged(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().comboWO_SelectedIndexChanged(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse generateMcIDInPriority(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().generateMcIDInPriority(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse generateWorkCenterInPriority(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().generateWorkCenterInPriority(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GetEndDate_New(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GetEndDate_New(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }


        public QueryResponse ConfirmGCReorder(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ConfirmGCReorder(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse GenerateMCWOList(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateMCWOList(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse fnGenerateLabel(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().fnGenerateLabel(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse AddTrackingRemark(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddTrackingRemark(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse AddScrapRemark(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddScrapRemark(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse AddPauseReason(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().AddPauseReason(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        
        public QueryResponse cmdUpdateReceived_ClickCase7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase10_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase10_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase10_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase10_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase30(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase30(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse cmdUpdateReceived_ClickCase80_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase80_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase80_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase80_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase95_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase95_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }
        public QueryResponse cmdUpdateReceived_ClickCase95_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdUpdateReceived_ClickCase95_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse UpdateWorkOrderQty(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateWorkOrderQty(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted4(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted4(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted5(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted5(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted6(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted6(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted7(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted7(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted8(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted8(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted9(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted9(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted10(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted10(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted11(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted11(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted12(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted12(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse CheckAnyChildNotCompleted13(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompleted13(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        

        public QueryResponse RemoveTrackingRemark(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().RemoveTrackingRemark(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse RemovePauseReason(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().RemovePauseReason(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse RemoveScrapRemark(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().RemoveScrapRemark(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        

        public QueryResponse UpdateThreshold(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateThreshold(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        public QueryResponse UpdateWOStatusReleaseStartDateThreshold(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().UpdateWOStatusReleaseStartDateThreshold(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;
        }

        






        public String hashPassWord(String password)
        {
           // Db db = new Db("TestConn");
            // Db db = new Db("");
            String decryptString = EncryptionHelper.Encrypt(password);
            return decryptString;
        }

        public QueryResponse spGenerateDynamicWOStatusListStatement(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().spGenerateDynamicWOStatusListStatement(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse spGenerateDynamicWOStatusListStatement1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().spGenerateDynamicWOStatusListStatement1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        
        public QueryResponse spGenerateDynamicWOStatusListStatement2()
        {
            QueryResponse response = new QueryResponse();
            //DataTable result;
            //try
            //{
            //    result = iStoredQueryRepository.Translate(new QueryFactory().spGenerateDynamicWOStatusListStatement1());
            //    response.Success = true;
            //    response.Result = result;
            //    response.TotalRecords = result.Rows.Count;
            //}
            //catch (Exception e)
            //{
            //    response.Success = false;
            //    response.Message = e.Message;
            //}
            return response;

        }
        public QueryResponse spGenerateDynamicWOStatusListStatement3()
        {
            QueryResponse response = new QueryResponse();
           // DataTable result;
            //try
            //{
            //    result = iStoredQueryRepository.Translate(new QueryFactory().spGenerateDynamicWOStatusListStatement1());
            //    response.Success = true;
            //    response.Result = result;
            //    response.TotalRecords = result.Rows.Count;
            //}
            //catch (Exception e)
            //{
            //    response.Success = false;
            //    response.Message = e.Message;
            //}
            return response;

        }


        public QueryResponse ScrapbutConfirm_Click1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapbutConfirm_Click1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse ScrapbutConfirm_Click2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapbutConfirm_Click2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse ScrapbutConfirm_Click3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().ScrapbutConfirm_Click3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase20_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase20_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase20_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase20_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase30_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase30_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase40_1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase40_1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase40_2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase40_2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse btnCancelWO_ClickCase40_3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().btnCancelWO_ClickCase40_3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }
        //butConfirm_Click1
        public QueryResponse butConfirm_Click1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().butConfirm_Click1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse butConfirm_Click2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().butConfirm_Click2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse butConfirm_Click3(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().butConfirm_Click3(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse Generate_WOSplitDetail(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().Generate_WOSplitDetail(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse CheckAnyChildNotCompletedOwn1(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompletedOwn1(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse CheckAnyChildNotCompletedOwn2(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().CheckAnyChildNotCompletedOwn2(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }


        public QueryResponse GenerateOperatorList(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GenerateOperatorList(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse cmdConfirm_ClickCase10(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().cmdConfirm_ClickCase10(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        public QueryResponse GetCurrentShiftID(Messaging.MessagingService.MessagingService request)
        {
            QueryResponse response = new QueryResponse();
            DataTable result;
            try
            {
                result = iStoredQueryRepository.Translate(new QueryFactory().GetCurrentShiftID(request));
                response.Success = true;
                response.Result = result;
                response.TotalRecords = result.Rows.Count;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Message = e.Message;
            }
            return response;

        }

        







    }
}
