using TestTemplate.Domain;
using TestTemplate.Repository.EntityFramework.DBContexts;
using TestTemplate.Repository.EntityFramework.DBContexts.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework.Mapper
{
    public static class HMLVTSMapper
    {

        public static Domain.TS_WorkOrderExecutionWODomain ToDomainWOModel(this TS_WorkOrderExecution entity)
        {
            if (entity == null) return null;
            return new Domain.TS_WorkOrderExecutionWODomain
            {
                WOID = entity.WOID
            };
        }

        public static IEnumerable<TS_WorkOrderExecutionWODomain> ToDomainMOModels(this ICollection<TS_WorkOrderExecution> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainWOModel(c));

        }



        public static Domain.TS_WorkOrderExecutionMcIDDomain ToDomainMcIDModel(this TS_WorkOrderExecution entity)
        {
            if (entity == null) return null;
            return new Domain.TS_WorkOrderExecutionMcIDDomain
            {
                McID = entity.McID
            };
        }

        public static IEnumerable<TS_WorkOrderExecutionMcIDDomain> ToDomainMcIDModels(this ICollection<TS_WorkOrderExecution> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainMcIDModel(c));

        }

        public static Domain.TS_WorkOrderExecutionWorkCenterDomain ToDomainWorkCentreModel(this TS_WorkOrderExecution entity)
        {
            if (entity == null) return null;
            return new Domain.TS_WorkOrderExecutionWorkCenterDomain
            {
                WorkCenter = entity.WorkCenter
            };
        }

        public static IEnumerable<TS_WorkOrderExecutionWorkCenterDomain> ToDomainWorkCentreModels(this ICollection<TS_WorkOrderExecution> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainWorkCentreModel(c));

        }


        public static Domain.TS_WorkOrderExecutionDomain ToDomainModel(this TS_WorkOrderExecution entity)
        {

            if (entity.QtyUpdated == null)
            {
                entity.QtyUpdated = 0;
            }

            if (entity.PlannedDuration == null)
            {
                entity.PlannedDuration = 0;
            }



            if (entity.ScrapQty == null)
            {
                entity.ScrapQty = 0;
            }

            if (entity.ProdTotalDuration == null)
            {
                entity.ProdTotalDuration = 0;
            }

            if (entity.TotalSetupDuration == null)
            {
                entity.TotalSetupDuration = 0;
            }

            if (entity.AdjustedQty == null)
            {
                entity.AdjustedQty = 0;
            }

            if (entity == null) return null;
            return new Domain.TS_WorkOrderExecutionDomain
            {

                WOID = entity.WOID,
                PartID = entity.PartID,
                ActualRecQty = entity.ActualRecQty,
                ActualRecDate = entity.ActualRecDate,
                CompletedQty = entity.CompletedQty,
                CompletedDate = entity.CompletedDate,
                OutstandingQty = entity.OutstandingQty,
                OutstandingDate = entity.OutstandingDate,
                ScrapQty = (int)entity.ScrapQty,
                ScrapDate = entity.ScrapDate.HasValue ? entity.ScrapDate.Value : new DateTime(),
                AdjustedQty = (int)entity.AdjustedQty,
                AdjustedDate = entity.AdjustedDate.HasValue ? entity.AdjustedDate.Value : new DateTime(),
                McID = entity.McID,
                McType = entity.McType,
                RouteID = entity.RouteID,
                WorkCenter = entity.WorkCenter,
                Opseq = entity.Opseq,
                ProcOpSeq = entity.ProcOpSeq,
                WOStatus =entity.WOStatus,
                SetupStartDate = entity.SetupStartDate.HasValue ? entity.SetupStartDate.Value : new DateTime(),
                SetupEndDate = entity.SetupEndDate.HasValue ? entity.SetupEndDate.Value : new DateTime(),
                ProdStartDate = entity.ProdStartDate.HasValue ? entity.ProdStartDate.Value : new DateTime(),
                ProdEndDate = entity.ProdEndDate.HasValue ? entity.ProdEndDate.Value : new DateTime(),
                ParentWOID = entity.ParentWOID,
                Remark = entity.Remark,
                TotalSetupDuration = (int)entity.TotalSetupDuration,
                ProdTotalDuration = (int)entity.ProdTotalDuration,
                OperatorID = entity.OperatorID,
                OperatorName = entity.OperatorName,
                ShiftID = entity.ShiftID,
                SendOutDate = entity.SendOutDate.HasValue ? entity.SendOutDate.Value : new DateTime(),
                ReceivedDate = entity.ReceivedDate.HasValue ? entity.ReceivedDate.Value : new DateTime(),
                QtyUpdated = (int)entity.QtyUpdated,
                PlannedDuration = (int)entity.PlannedDuration,
                OrderType = entity.OrderType
            };

        }

        public static IEnumerable<TS_WorkOrderExecutionDomain> ToDomainModels(this ICollection<TS_WorkOrderExecution> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainModel(c));

        }

        public static Domain.TS_WorkOrderDomain ToDomainModel(this TS_WorkOrder entity)
        {
            if (entity == null) return null;

            if (entity.CompletedQty == null) {
                entity.CompletedQty = 0;
                    }

            if (entity.AccumulatedScrapQty == null)
            {
                entity.AccumulatedScrapQty = 0;
            }

            if (entity.TotalActAdjustedQty == null)
            {
                entity.TotalActAdjustedQty = 0;
            }

            return new Domain.TS_WorkOrderDomain
            {
                WOID = entity.WOID,
                PartID = entity.PartID,
                RequestedDeliveryDate = entity.RequestedDeliveryDate,
                CommittedDeliveryDate = entity.CommittedDeliveryDate,
                ReleasedProdQty = entity.ReleasedProdQty,
                ReleasedProdDate = entity.ReleasedProdDate,
                ActualProdQty = entity.ActualProdQty,
                ActualProdDate = entity.ActualProdDate,
                ActualRecDate = entity.ActualRecDate,
                ActualRecQty = entity.ActualRecQty,
                CompletedDate = entity.CompletedDate.HasValue ? entity.CompletedDate.Value : new DateTime(),                          
                CompletedQty = (int)entity.CompletedQty,    
                OutstandingDate = entity.OutstandingDate,
                OutstandingQty = entity.OutstandingQty,
                AccumulatedScrapDate = entity.AccumulatedScrapDate.HasValue ? entity.AccumulatedScrapDate.Value : new DateTime(),
                AccumulatedScrapQty = (int)entity.AccumulatedScrapQty,
                TotalActAdjustedQty = (int)entity.TotalActAdjustedQty,
                TotalActAdjustedDate = entity.TotalActAdjustedDate.HasValue ? entity.TotalActAdjustedDate.Value : new DateTime(),
                WOStatus = entity.WOStatus,
                ToolDescription = entity.ToolDescription,
                PlannerRemark = entity.PlannerRemark,
                StartDate = entity.StartDate.HasValue ? entity.StartDate.Value : new DateTime(),
                EndDate = entity.EndDate.HasValue ? entity.EndDate.Value : new DateTime(),
                ParentWOID = entity.ParentWOID,
                Remark = entity.Remark,
                PPID = entity.PPID,
                SalesOrderID = entity.SalesOrderID,
                ReleasedDate = entity.ReleasedDate.HasValue ? entity.ReleasedDate.Value : new DateTime(),
                AlertStatus = entity.AlertStatus,
                OrderType = entity.OrderType,
                OperatorID = entity.OperatorID,
                OperatorName = entity.OperatorName,
                ApprovedID = entity.ApprovedID,
                ApprovedName = entity.ApprovedName
            };
        }


        public static IEnumerable<TS_WorkOrderDomain> ToDomainModels(this ICollection<TS_WorkOrder> entities)
        {
            if (entities == null) return null;
            return entities.Select(c => ToDomainModel(c));

        }
    }
}
