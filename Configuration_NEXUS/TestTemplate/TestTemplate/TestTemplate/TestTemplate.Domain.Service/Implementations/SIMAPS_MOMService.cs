using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Mappings;
using TestTemplate.Domain.Service.Messaging;
using TestTemplate.Repository.EntityFramework;

namespace TestTemplate.Domain.Service.Implementations
{
    public class SIMAPS_MOMService
    {
        #region "Properties"
        private readonly SIMAPS_MOMREpository _SIMAPOS_MOMRepository;
        #endregion "Properties"

        public SIMAPS_MOMService() {           
            _SIMAPOS_MOMRepository = new SIMAPS_MOMREpository();
        }

        public Messaging.populateCustomerNamelist populateCustomerNamelist()
        {
            populateCustomerNamelist response = new populateCustomerNamelist();
            IEnumerable<WorkOrderMasterDomain> models;

            try
            {
                models = _SIMAPOS_MOMRepository.populateCustomerNamelist();
                response.WorkOrderMaster = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populateFGDimensionlist populateFGDimensionlist()
        {
            populateFGDimensionlist response = new populateFGDimensionlist();
            IEnumerable<WorkOrderInfoDomain> models;

            try
            {
                models = _SIMAPOS_MOMRepository.populateFGDimensionlist();
                response.WorkOrderInfo = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populatePONumberlist populatePONumberlist()
        {
            populatePONumberlist response = new populatePONumberlist();
            IEnumerable<WorkOrderInfoDomain> models;

            try
            {
                models = _SIMAPOS_MOMRepository.populatePONumberlist();
                response.WorkOrderInfo = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populateSOLineNolist populateSOLineNolist()
        {
            populateSOLineNolist response = new populateSOLineNolist();
            IEnumerable<WorkOrderInfoDomain> models;

            try
            {
                models = _SIMAPOS_MOMRepository.populateSOLineNolist();
                response.WorkOrderInfo = models.ToDtos();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.ToString();
            }

            return response;

        }

        public Messaging.populateSORemarklist populateSORemarklist()
        {
            populateSORemarklist response = new populateSORemarklist();
            IEnumerable<WorkOrderInfoDomain> models;

            try
            {
                models = _SIMAPOS_MOMRepository.populateSORemarklist();
                response.WorkOrderInfo = models.ToDtos();
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
