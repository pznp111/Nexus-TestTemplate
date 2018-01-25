using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Mappings;
using TestTemplate.Domain.Service.Messaging;
using TestTemplate.Repository.EntityFramework;
using System.Data;
using TestTemplate.Domain.Service.Implementations.Factory;
using TestTemplate.Repository;
using TestTemplate.Domain.Service.Interfaces;

namespace TestTemplate.Domain.Service.Implementations
{
    public class HMLVTSService : ITS_WorkOrderService
    {
        #region "Properties"
        private readonly HMLVTSRepository _HMLVTSRepository;
        //private readonly IStoredQueryRepository iStoredQueryRepository;
        //private readonly SIMAPS_MOMREpository _SIMAPOS_MOMRepository;

        #endregion "Properties"

        public HMLVTSService()
        {
            _HMLVTSRepository = new HMLVTSRepository();
            //iStoredQueryRepository = new IStoredQueryRepository();
            //_SIMAPOS_MOMRepository = new SIMAPS_MOMREpository();

        }








        public Messaging.populateMachineID populateMachineID()
        {
            populateMachineID response = new populateMachineID();
            IEnumerable<TS_WorkOrderExecutionMcIDDomain> models;
            //        public static TS_WorkOrderExecutionWorkCenterDto ToDto(this TS_WorkOrderExecutionWorkCenterDomain model)
            try
            {
                models = _HMLVTSRepository.populateMachineID();
                response.TS_WorkOrderExecutionMcID = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populateWorkCentre populateWorkCentre()
        {
            populateWorkCentre response = new populateWorkCentre();
            IEnumerable<TS_WorkOrderExecutionWorkCenterDomain> models;
            //        public static TS_WorkOrderExecutionWorkCenterDto ToDto(this TS_WorkOrderExecutionWorkCenterDomain model)
            try
            {
                models = _HMLVTSRepository.populateWorkCentre();
                response.TS_WorkOrderExecutionWorkCenter = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populateWOlist populateWOlist()
        {
            populateWOlist response = new populateWOlist();
            IEnumerable<TS_WorkOrderExecutionWODomain> models;
            //        public static TS_WorkOrderExecutionWorkCenterDto ToDto(this TS_WorkOrderExecutionWorkCenterDomain model)
            try
            {
                models = _HMLVTSRepository.populateWOlist();
                response.TS_WorkOrderExecutionWO = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.ReadAllTS_WorkOrderREsponse ReadAllTS_WorkOrderREsponse()
        {
            ReadAllTS_WorkOrderREsponse response = new ReadAllTS_WorkOrderREsponse();
            IEnumerable<TS_WorkOrderDomain> models;

            try
            {
                models = _HMLVTSRepository.FindAll();
                response.TS_WorkOrder = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populatePartIDlist populatePartIDlist()
        {
            populatePartIDlist response = new populatePartIDlist();
            IEnumerable<TS_WorkOrderExecutionDomain> models;

            try
            {
                models = _HMLVTSRepository.populatePartIDlist();
                response.TS_WorkOrderExecution = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }
    }
}
