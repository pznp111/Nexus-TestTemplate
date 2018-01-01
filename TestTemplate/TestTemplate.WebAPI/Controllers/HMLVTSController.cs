using TestTemplate.Domain.Service.Implementations;
using TestTemplate.Domain.Service.Interfaces;
using TestTemplate.Domain.Service.Messaging;
using TestTemplate.Domain.Service.Messaging.MessagingService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Nexus.Infrastructure;
using TestTemplate.Repository.EntityFramework;
using System.Net;
using System.Net.Http;

namespace TestTemplate.WebAPI.Controllers
{
    

    public class HMLVTSController : ApiController
    {

        public readonly HMLVTSService _HMLVTSService;
        public readonly SIMAPS_MOMService _SIMAPOS_MOMService;

        public HMLVTSController()
        {
            _HMLVTSService = new HMLVTSService();
            _SIMAPOS_MOMService = new SIMAPS_MOMService();
        }

        [HttpGet]
        public System.Web.Http.Results.JsonResult<ReadAllTS_WorkOrderREsponse> ReadAllTS_WorkOrderREsponse()
        {

            ReadAllTS_WorkOrderREsponse response = _HMLVTSService.ReadAllTS_WorkOrderREsponse();
            if (!response.Success) throw new Exception(response.Message);
            return Json(response);

        }

        //[HttpGet]
        //public System.Web.Http.Results.JsonResult<populateWorkCentre> populateWorkCentre()
        //{

        //    populateWorkCentre response = _HMLVTSService.populateWorkCentre();
        //    if (!response.Success) throw new Exception(response.Message);
        //    return Json(response);

        //}

        //[HttpGet]
        //public System.Web.Http.Results.JsonResult<populateMachineID> populateMachineID()
        //{

        //    populateMachineID response = _HMLVTSService.populateMachineID();
        //    if (!response.Success) throw new Exception(response.Message);
        //    return Json(response);

        //}

        //[HttpGet]
        //public System.Web.Http.Results.JsonResult<populateWOlist> populateWOlist()
        //{

        //    populateWOlist response = _HMLVTSService.populateWOlist();
        //    if (!response.Success) throw new Exception(response.Message);
        //    return Json(response);

        //}

        [HttpPost]
        public HttpResponseMessage CalculateDuration1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateDuration1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateDuration2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateDuration2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateDuration3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateDuration3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage GenerateWOList3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnUpdateRoute([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdateRoute(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        
        [HttpPost]
        public HttpResponseMessage GenerateWOList5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList8([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList8(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList9([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList9(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList10([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList10(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage UpdateWOAlertStatus([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateWOAlertStatus(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage splitReportCellClicked1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReportCellClicked1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage splitReportCellClicked2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReportCellClicked2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage splitReportCellClicked3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReportCellClicked3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList11([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList11(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOList12()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList12();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage comboWO_Selected_wotraking([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.comboWO_Selected_wotraking(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage UpdateQtyFromPreviousProcOpSeq1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateQtyFromPreviousProcOpSeq1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage UpdateQtyFromPreviousProcOpSeq2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateQtyFromPreviousProcOpSeq2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage CheckWOOpnStatus1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWOOpnStatus1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckWOOpnStatus2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWOOpnStatus2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage CheckWOOpnStatus2_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWOOpnStatus2_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage CheckWOOpnStatus3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWOOpnStatus3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CheckWOOpnStatus3_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWOOpnStatus3_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnTrackSetupConfig([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnTrackSetupConfig(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage GenerateQueuingWOList1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateQueuingWOList1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateQueuingWOList2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateQueuingWOList2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage CalculateTimeSpan3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateTimeSpan3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CheckSubconWOOpnStatus([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckSubconWOOpnStatus(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CalculateSubconTimeSpan([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CalculateSubconTimeSpan(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        






        [HttpPost]
        public HttpResponseMessage GenerateWCList1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWCList1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage GenerateWCList2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWCList2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage GenerateWCList3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWCList3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWCList4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWCList4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        
        [HttpPost]
        public HttpResponseMessage splitReport1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReport1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage splitReport2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReport2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage splitReport3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.splitReport3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage ScrapReport1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapReport1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnGetUserAccessRight([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGetUserAccessRight(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage ScrapReport2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapReport2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage ScrapReport3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapReport3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage reworkReport1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.reworkReport1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage reworkReport2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.reworkReport2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage reworkReport3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.reworkReport3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage spGenerateDynamicWOStatusListStatement([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.spGenerateDynamicWOStatusListStatement(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage spGenerateDynamicWOStatusListStatement1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();
            
            var result = service.spGenerateDynamicWOStatusListStatement1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public string hashPassword([FromBody]MessagingService request)
        {
            string input = request.Index;
            IQueuingWOsService service = new QueuingWOsService();
            var result = service.hashPassWord(input);

            return result;
        }

        [HttpGet]
        public HttpResponseMessage GenerateWOLock()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOLock();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateFunctionLock()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateFunctionLock();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpGet]
        public HttpResponseMessage GenerateWOListRelease()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOListRelease();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage populatePartIDlist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populatePartIDlist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpGet]
        public HttpResponseMessage populateCustomerNamelist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateCustomerNamelist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpGet]
        public HttpResponseMessage populateFGDimensionlist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateFGDimensionlist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpGet]
        public HttpResponseMessage populatePONumberlist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populatePONumberlist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage populateSOLineNolist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateSOLineNolist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage populateSORemarklist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateSORemarklist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateThreshold()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateThreshold();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateWOStatusReleaseStartDateThreshold()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOStatusReleaseStartDateThreshold();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpGet]
        public HttpResponseMessage populateWOlist()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOlist();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpGet]
        public HttpResponseMessage GeneratePauseReasonList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GeneratePauseReasonList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        


        [HttpGet]
        public HttpResponseMessage GenerateScrapRemarkList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateScrapRemarkList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateTrackingRemarkList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateTrackingRemarkList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage populateWorkCentre()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWorkCentre();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage populateMachineID()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateMachineID();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        







        [HttpGet]
        public HttpResponseMessage GenerateUserIDList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateUserIDList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateUnitCodeList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateUnitCodeList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateWOList2()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList2();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateWOList1()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOList1();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //tracking report, rework
        [HttpGet]
        public HttpResponseMessage Generate_ReworkRemarkList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.Generate_ReworkRemarkList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }






        
        [HttpGet]
        public HttpResponseMessage GenerateScrapRemark()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateScrapRemark();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateMcID()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateMcID();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateWOSplitList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOSplitList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GenerateUserNameList()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateUserNameList();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        




        [HttpPost]
        public HttpResponseMessage GenerateOperatorReport([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateOperatorReport(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
        [HttpPost]
        public HttpResponseMessage populateWOExecutionSummary([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOExecutionSummary(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        

        [HttpPost]
        public HttpResponseMessage populateWOSummary([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOSummary(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage populateProcessRouteDetails1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateProcessRouteDetails1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage populateProcessRouteDetails2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateProcessRouteDetails2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage populateProcessRouteDetails3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateProcessRouteDetails3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage populateProcessRouteDetails4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateProcessRouteDetails4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage GetCurProcOpSeq([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GetCurProcOpSeq(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateAttachmentList([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateAttachmentList(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage Generate_RouteDetail1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.Generate_RouteDetail1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage Generate_RouteDetail2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.Generate_RouteDetail2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage Generate_RouteDetail3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.Generate_RouteDetail3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        

        [HttpPost]
        public HttpResponseMessage wodetailTable3Click1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.wodetailTable3Click1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage wodetailTable3Click2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.wodetailTable3Click2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage ChkChild([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ChkChild(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage populateWOinfoTable1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOinfoTable1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage populateWOinfoTable2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOinfoTable2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage populateWOinfoTable3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateWOinfoTable3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        


        [HttpPost]
        public HttpResponseMessage GenerateDispatchWOList1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateDispatchWOList1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
            [HttpPost]
        public HttpResponseMessage AddWorkOrderRouteDispatch1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddWorkOrderRouteDispatch1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage AddWorkOrderRouteDispatch2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddWorkOrderRouteDispatch2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage GenerateDispatchWOList2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateDispatchWOList2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage comboWO_SelectedIndexChanged([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.comboWO_SelectedIndexChanged(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage fnGenerateLabel([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateLabel(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        
        [HttpPost]
        public HttpResponseMessage addWORouteCurrent([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWORouteCurrent(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWORouteQC([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWORouteQC(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWORouteQC2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWORouteQC2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage GenerateToolDescription([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateToolDescription(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage buttonRefresh_ClickPriority6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.buttonRefresh_ClickPriority6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        

        [HttpPost]
        public HttpResponseMessage CheckWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWOExe1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWOExe1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWOExe2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWOExe2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage addWOExe3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addWOExe3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage delWORoute([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.delWORoute(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage delWOExe([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.delWOExe(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage updateWOExecution([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.updateWOExecution(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage addSplitWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.addSplitWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        


        [HttpPost]
        public HttpResponseMessage getTSWorkOrder([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.getTSWorkOrder(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOSummary1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOSummary1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOSummaryScrap([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOSummaryScrap(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateSubAssemblyWOList([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateSubAssemblyWOList(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
        [HttpPost]
        public HttpResponseMessage GenerateMcIDByWorkCenter([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateMcIDByWorkCenter(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdOnHold_ClickCase20_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdOnHold_ClickCase20_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdOnHold_ClickCase20_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdOnHold_ClickCase20_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdOnHold_ClickCase20_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdOnHold_ClickCase20_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdate_ClickCase15([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdate_ClickCase15(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        

        [HttpPost]
        public HttpResponseMessage productionPauseCase20_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionPauseCase20_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage productionPauseCase20_1_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionPauseCase20_1_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage setupPauseCase20_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupPauseCase20_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage productionPauseCase20_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionPauseCase20_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage productionPauseCase20_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionPauseCase20_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnCheckPriorityConfig([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnCheckPriorityConfig(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnValidateUserNameMCAssign([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnValidateUserNameMCAssign(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
        [HttpPost]
        public HttpResponseMessage productionResumeCase10_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionResumeCase10_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage productionResumeCase10_1_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionResumeCase10_1_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupResumeCase10_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupResumeCase10_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage productionResumeCase10_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionResumeCase10_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage productionResumeCase10_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionResumeCase10_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase10_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase10_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase10_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase10_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage productionResumeCase10_4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionResumeCase10_4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage RemoveQCAttachment1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.RemoveQCAttachment1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage AddQCAttachment1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddQCAttachment1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage productionStopCase10_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionStopCase10_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage frmExecutionHistory1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.frmExecutionHistory1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage frmExecutionHistory2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.frmExecutionHistory2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage productionStopCase10_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionStopCase10_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage productionStopCase10_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.productionStopCase10_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage setupStartCase40_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase40_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStopCase30_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStopCase30_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage cmdConfirm_ClickCase30_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdConfirm_ClickCase30_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        

        [HttpPost]
        public HttpResponseMessage cmdConfirm_ClickCase40_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdConfirm_ClickCase40_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStopCase40_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStopCase40_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage setupStartCase40_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase40_4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase40_5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage setupStartCase40_6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.setupStartCase40_6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage GetGetSalesID([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GetGetSalesID(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        


        [HttpPost]
        public HttpResponseMessage GenerateWOSummary2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOSummary2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWOMaterial([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOMaterial(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWODetail1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWODetail1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateWODetail2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWODetail2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage generateWorkCenterInPriority([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.generateWorkCenterInPriority(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage generateMcIDInPriority([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.generateMcIDInPriority(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnInsertRoute([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnInsertRoute(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        




        [HttpPost]
        public HttpResponseMessage GetEndDate_New([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GetEndDate_New(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage AddPauseReason([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddPauseReason(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnInsertQCEquipment([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnInsertQCEquipment(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage fnInsertWOExecution([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnInsertWOExecution(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage AddScrapRemark([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddScrapRemark(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage AddTrackingRemark([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddTrackingRemark(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateMCWOList([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateMCWOList(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage ConfirmGCReorder([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ConfirmGCReorder(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        




        [HttpPost]
        public HttpResponseMessage RemovePauseReason([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.RemovePauseReason(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage RemoveTrackingRemark([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.RemoveTrackingRemark(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase10_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase10_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase10_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase10_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase30([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase30(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase80_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase80_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase80_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase80_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage UpdateWorkOrderQty([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateWorkOrderQty(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted8([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted8(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted9([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted9(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted10([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted10(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted11([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted11(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted12([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted12(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompleted13([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompleted13(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase95_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase95_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage cmdUpdateReceived_ClickCase95_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdUpdateReceived_ClickCase95_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        [HttpPost]
        public HttpResponseMessage RemoveScrapRemark([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.RemoveScrapRemark(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage UpdateThreshold([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateThreshold(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage UpdateWOStatusReleaseStartDateThreshold([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.UpdateWOStatusReleaseStartDateThreshold(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnGenerateRouteDetail1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateRouteDetail1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnGenerateRouteDetail2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateRouteDetail2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnGenerateRouteDetail3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateRouteDetail3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnGenerateRouteDetail4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateRouteDetail4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        //dispatch
        [HttpPost]
        public HttpResponseMessage fnGenerateRouteDetail5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnGenerateRouteDetail5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage releasedReportSearch([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.releasedReportSearch(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage FunctionUnLockWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.FunctionUnLockWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage getWOdetail([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.getWOdetail(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage FunctionUnLockFunction([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.FunctionUnLockFunction(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        




        //dispatch
        [HttpGet]
        public HttpResponseMessage fnAddWO1()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnAddWO1();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage getAllWOID()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.getAllWOID();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnAddWO2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnAddWO2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnInsertWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnInsertWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdatePPOrder7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdatePPOrder7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //dispatch
        [HttpPost]
        public HttpResponseMessage fnUpdateWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.fnUpdateWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GenerateWOListRework1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOListRework1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpGet]
        public HttpResponseMessage GenerateWOListRework()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateWOListRework();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWODetail1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWODetail1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWODetail2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWODetail2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWODetail3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWODetail3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWODetail4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWODetail4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWOMaterial([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWOMaterial(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalGenerateWOSummary([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalGenerateWOSummary(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalCurrentWorkOrderRoute([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalCurrentWorkOrderRoute(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalCurrentWorkOrderRouteWithRouteID([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalCurrentWorkOrderRouteWithRouteID(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage regenerateRoutingData([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.regenerateRoutingData(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        //rework
        [HttpPost]
        public HttpResponseMessage strGetRouteName([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.strGetRouteName(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //rework
        [HttpPost]
        public HttpResponseMessage strGetOperatorName([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.strGetOperatorName(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GlobalMaxProcOpSeq([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GlobalMaxProcOpSeq(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //rework
        [HttpPost]
        public HttpResponseMessage AddQCEquipment([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.AddQCEquipment(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        


        //rework
        [HttpPost]
        public HttpResponseMessage saveRework1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage saveRework2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage saveRework3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage saveRework4([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework4(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage saveReworkMac1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveReworkMac1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage saveReworkMac2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveReworkMac2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        [HttpPost]
        public HttpResponseMessage saveRework5([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework5(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage saveRework6([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework6(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage saveRework7([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework7(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpPost]
        public HttpResponseMessage saveRework8([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework8(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage saveRework9([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework9(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage saveRework10([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.saveRework10(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage sp_GetAvailMachineListForWO([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.sp_GetAvailMachineListForWO(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        

        //rework
        [HttpPost]
        public HttpResponseMessage currentRoutesName([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.currentRoutesName(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        //rework
        [HttpPost]
        public HttpResponseMessage generateReoworkDropDown([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.generateReoworkDropDown(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //rework
        [HttpPost]
        public HttpResponseMessage GenerateMCInfor([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.generateReoworkDropDown(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        



        //rework
        [HttpGet]
        public HttpResponseMessage allRoutesName()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.allRoutesName();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //TrackingReport
        [HttpGet]
        public HttpResponseMessage populateCustomer()
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateCustomer();
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }




        //TrackingReport
        [HttpPost]
        public HttpResponseMessage populateKitType([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateKitType(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //TrackingReport
        [HttpPost]
        public HttpResponseMessage populateKitType1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.populateKitType1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //TrackingReport
        [HttpPost]
        public HttpResponseMessage comboMCList_SelectionChangeCommitted([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.comboMCList_SelectionChangeCommitted(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        //TrackingReport
        [HttpPost]
        public HttpResponseMessage comboMCList_SelectionChangeCommitted0([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.comboMCList_SelectionChangeCommitted0(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }



        //backup
        [HttpPost]
        public HttpResponseMessage BackupHMLVTSByYear([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.BackupHMLVTSByYear(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage getCurrentWorkOrderByMcID([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.getCurrentWorkOrderByMcID(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage ScrapbutConfirm_Click1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapbutConfirm_Click1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage ScrapbutConfirm_Click2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapbutConfirm_Click2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage ScrapbutConfirm_Click3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.ScrapbutConfirm_Click3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase20_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase20_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase20_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase20_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase30_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase30_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase40_1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase40_1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase40_2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase40_2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage btnCancelWO_ClickCase40_3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.btnCancelWO_ClickCase40_3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage butConfirm_Click1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.butConfirm_Click1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage butConfirm_Click2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.butConfirm_Click2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage butConfirm_Click3([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.butConfirm_Click3(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage Generate_WOSplitDetail([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.Generate_WOSplitDetail(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompletedOwn1([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompletedOwn1(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage CheckAnyChildNotCompletedOwn2([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.CheckAnyChildNotCompletedOwn2(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public HttpResponseMessage GenerateOperatorList([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.GenerateOperatorList(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }


        [HttpPost]
        public HttpResponseMessage cmdConfirm_ClickCase10([FromBody]MessagingService request)
        {
            //ITS_WorkOrderService service = new TS_WorkOrderService();
            IQueuingWOsService service = new QueuingWOsService();

            var result = service.cmdConfirm_ClickCase10(request);
            if (result == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        


        //Tracking Report

        //[HttpPost]
        //public HttpResponseMessage GetallMeasurementParameters([FromBody]MessagingService request)
        //{
        //    //ITS_WorkOrderService service = new TS_WorkOrderService();
        //    IQueuingWOsService service = new QueuingWOsService();

        //    var result = service.GetallMeasurementParameters(request);
        //    if (result == null)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotFound);
        //    }
        //    return Request.CreateResponse(HttpStatusCode.OK, result);
        //}




    }
}