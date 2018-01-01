using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.HMLVTS;

namespace TestTemplate.Domain.Service.Mappings
{
    public static class TS_WorkOrderExecutionMapper
    {

        public static TS_WorkOrderExecutionDto ToDto(this TS_WorkOrderExecutionDomain model)
        {
            if (model == null) return null;

            return new TS_WorkOrderExecutionDto

            {

                WOID = model.WOID,
                PartID = model.PartID,
                ActualRecQty = model.ActualRecQty,
                ActualRecDate = model.ActualRecDate,
                CompletedQty = model.CompletedQty,
                CompletedDate = model.CompletedDate,
                OutstandingQty = model.OutstandingQty,
                OutstandingDate = model.OutstandingDate,
                ScrapQty = (int)model.ScrapQty,
                ScrapDate = (DateTime)model.ScrapDate,
                AdjustedQty = (int)model.AdjustedQty,
                AdjustedDate = (DateTime)model.AdjustedDate,
                McID = model.McID,
                McType = model.McType,
                RouteID = model.RouteID,
                WorkCenter = model.WorkCenter,
                Opseq = model.Opseq,
                ProcOpSeq = model.ProcOpSeq,
                WOStatus =model.WOStatus,
                SetupStartDate = (DateTime)model.SetupStartDate,
                SetupEndDate = (DateTime)model.SetupEndDate,
                ProdStartDate = (DateTime)model.ProdStartDate,
                ProdEndDate = (DateTime)model.ProdEndDate,
                ParentWOID = model.ParentWOID,
                Remark = model.Remark,
                TotalSetupDuration = (int)model.TotalSetupDuration,
                ProdTotalDuration = (int)model.ProdTotalDuration,
                OperatorID = model.OperatorID,
                OperatorName = model.OperatorName,
                ShiftID = model.ShiftID,
                SendOutDate = (DateTime)model.SendOutDate,
                ReceivedDate = (DateTime)model.ReceivedDate,
                QtyUpdated = (int)model.QtyUpdated,
                PlannedDuration = (int)model.PlannedDuration,
                OrderType = model.OrderType
    };

}


        public static TS_WorkOrderExecutionMcIDDto ToDto(this TS_WorkOrderExecutionMcIDDomain model)
        {
            if (model == null) return null;

            return new TS_WorkOrderExecutionMcIDDto
            {
                McID = model.McID
            };

        }

        public static IEnumerable<TS_WorkOrderExecutionMcIDDto> ToDtos(this IEnumerable<TS_WorkOrderExecutionMcIDDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }



        public static TS_WorkOrderExecutionWorkCenterDto ToDto(this TS_WorkOrderExecutionWorkCenterDomain model)
        {
            if (model == null) return null;

            return new TS_WorkOrderExecutionWorkCenterDto
            {
                WorkCenter = model.WorkCenter
            };

        }

        public static TS_WorkOrderExecutionWODto ToDto(this TS_WorkOrderExecutionWODomain model)
        {
            if (model == null) return null;

            return new TS_WorkOrderExecutionWODto
            {
                WOID = model.WOID
            };

        }

        public static IEnumerable<TS_WorkOrderExecutionWODto> ToDtos(this IEnumerable<TS_WorkOrderExecutionWODomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }

        public static IEnumerable<TS_WorkOrderExecutionWorkCenterDto> ToDtos(this IEnumerable<TS_WorkOrderExecutionWorkCenterDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }

        public static IEnumerable<TS_WorkOrderExecutionDto> ToDtos(this IEnumerable<TS_WorkOrderExecutionDomain> models)
        {
            if (models == null) return null;
            return models.Select(c => ToDto(c));
        }
    }
}
