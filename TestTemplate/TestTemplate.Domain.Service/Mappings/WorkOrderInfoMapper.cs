using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.SIMAPOS_MOM;

namespace TestTemplate.Domain.Service.Mappings
{
    public static class WorkOrderInfoMapper
    {
        public static WorkOrderInfoDto ToDto(this WorkOrderInfoDomain model)
        {
            if (model == null) return null;
            return new WorkOrderInfoDto
            {
                WOID = model.WOID,
                CreatedBy = model.CreatedBy,
                PONumber = model.PONumber,
                PartNum = model.PartNum,
                FGDimension = model.FGDimension,
                Description = model.Description,
                Remark = model.Remark,
                CommittedDeliveryDate = model.CommittedDeliveryDate,
                RequestedDeliveryDate = model.RequestedDeliveryDate,
                LineNumber = (int)model.LineNumber
            };
        }

        public static IEnumerable<WorkOrderInfoDto> ToDtos(this IEnumerable<WorkOrderInfoDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }
    }
}
