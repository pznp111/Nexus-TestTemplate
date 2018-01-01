using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.SIMAPOS_MOM;

namespace TestTemplate.Domain.Service.Mappings
{
    public static class WorkOrderMasterMapper
    {
        public static WorkOrderMasterDto ToDto(this WorkOrderMasterDomain model)
        {
            if (model == null) return null;

            return new WorkOrderMasterDto
            {
                ID = model.ID,
                PartId = model.PartId,
                Qty = model.Qty,
                IssueDate = model.IssueDate,
                DeliveryDate = model.DeliveryDate,
                Status = model.Status,
                Location = model.Location,
                Remark = model.Remark,
                OrderType = model.OrderType,
                RouteID = (int)model.RouteID,
                Customer = model.Customer,
                CreatedDate = model.CreatedDate,
                UserID = model.UserID,
                BalQty = model.BalQty,
                ToStockQty = model.ToStockQty,
                InvQty1 = model.InvQty1,
                InvQty2 = model.InvQty2,
                DrawingStatus = model.DrawingStatus,
                MaterialGrade = model.MaterialGrade,
                MaterialSupplier = model.MaterialSupplier,
                PartNo = model.PartNo
            };

        }

        public static IEnumerable<WorkOrderMasterDto> ToDtos(this IEnumerable<WorkOrderMasterDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }
    }
}
