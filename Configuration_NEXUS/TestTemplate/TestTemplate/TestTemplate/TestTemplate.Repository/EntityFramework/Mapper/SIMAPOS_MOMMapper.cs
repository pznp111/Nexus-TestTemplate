using TestTemplate.Domain;
using TestTemplate.Repository.EntityFramework.DBContexts;
using TestTemplate.Repository.EntityFramework.DBContexts.Test;
using TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework.Mapper
{

    public static class SIMAPOS_MOMMapper
    {


        public static Domain.WorkOrderInfoDomain ToDomainWOModel(this WorkOrderInfo entity)
        {


            if (entity.LineNumber == null)
            {
                entity.LineNumber = 0;
            }
            if (entity == null) return null;
            return new Domain.WorkOrderInfoDomain
            {
                WOID = entity.WOID,
                CreatedBy = entity.CreatedBy,
                PONumber = entity.PONumber,
                PartNum = entity.PartNum,
                FGDimension = entity.FGDimension,
                Description = entity.Description,
                Remark = entity.Remark,
                CommittedDeliveryDate = entity.CommittedDeliveryDate.HasValue ? entity.CommittedDeliveryDate.Value : new DateTime(),
                RequestedDeliveryDate = entity.RequestedDeliveryDate,
                LineNumber = (int)entity.LineNumber

            };
        }

        public static IEnumerable<Domain.WorkOrderInfoDomain> ToDomainModels(this ICollection<WorkOrderInfo> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainWOModel(c));

        }


        public static Domain.WorkOrderMasterDomain ToDomainWOModel(this WorkOrderMaster1 entity)
        {

            if (entity.RouteID == null)
            {
                entity.RouteID = 0;
            }

            if (entity == null) return null;
            return new Domain.WorkOrderMasterDomain
            {
                ID = entity.ID,
                PartId = entity.PartId,
                Qty = entity.Qty,
                IssueDate = entity.IssueDate,
                DeliveryDate = entity.DeliveryDate,
                Status = entity.Status,
                Location  = entity.Location,
                Remark = entity.Remark,
                OrderType = entity.OrderType,
                RouteID = (int)entity.RouteID,
                Customer = entity.Customer,
                CreatedDate = entity.CreatedDate,
                UserID = entity.UserID,
                BalQty = entity.BalQty,
                ToStockQty = entity.ToStockQty,
                InvQty1 = entity.InvQty1,
                InvQty2 = entity.InvQty2,
                DrawingStatus = entity.DrawingStatus,
                MaterialGrade = entity.MaterialGrade,
                MaterialSupplier = entity.MaterialSupplier,
                PartNo = entity.PartNo

    };
        }

        public static IEnumerable<WorkOrderMasterDomain> ToDomainModels(this ICollection<WorkOrderMaster1> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainWOModel(c));

        }
    }
}
