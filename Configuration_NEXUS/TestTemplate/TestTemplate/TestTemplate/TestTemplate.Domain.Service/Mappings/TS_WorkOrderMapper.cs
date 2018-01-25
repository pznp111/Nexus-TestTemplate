using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos;
using TestTemplate.Domain.Service.Dtos.HMLVTS;

namespace TestTemplate.Domain.Service.Mappings
{
    public static class TS_WorkOrderMapper
    {

        public static TS_WorkOrderDto ToDto(this TS_WorkOrderDomain model)
        {
            if (model == null) return null;

            return new TS_WorkOrderDto
            {
                WOID = model.WOID,
                PartID = model.PartID,
                RequestedDeliveryDate = model.RequestedDeliveryDate,
                CommittedDeliveryDate = model.CommittedDeliveryDate,
                ReleasedProdQty = model.ReleasedProdQty,
                ReleasedProdDate = model.ReleasedProdDate,
                ActualProdQty = model.ActualProdQty,
                ActualProdDate = model.ActualProdDate,
                ActualRecDate = model.ActualRecDate,
                ActualRecQty = model.ActualRecQty,
                CompletedDate = (DateTime)model.CompletedDate,
                CompletedQty = (int)model.CompletedQty,
                OutstandingDate = model.OutstandingDate,
                OutstandingQty = model.OutstandingQty,
                AccumulatedScrapDate = (DateTime)model.AccumulatedScrapDate,
                AccumulatedScrapQty = (int)model.AccumulatedScrapQty,
                TotalActAdjustedQty = (int)model.TotalActAdjustedQty,
                TotalActAdjustedDate = (DateTime)model.TotalActAdjustedDate,
                WOStatus = model.WOStatus,
                ToolDescription = model.ToolDescription,
                PlannerRemark = model.PlannerRemark,
                StartDate = (DateTime)model.StartDate,
                EndDate = (DateTime)model.EndDate,
                ParentWOID = model.ParentWOID,
                Remark = model.Remark,
                PPID = model.PPID,
                SalesOrderID = model.SalesOrderID,
                ReleasedDate = (DateTime)model.ReleasedDate,
                AlertStatus = model.AlertStatus,
                OrderType = model.OrderType,
                OperatorID = model.OperatorID,
                OperatorName = model.OperatorName,
                ApprovedID = model.ApprovedID,
                ApprovedName = model.ApprovedName


            };
        }

        public static IEnumerable<TS_WorkOrderDto> ToDtos(this IEnumerable<TS_WorkOrderDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }



    }
}


