using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain
{
    public class TS_WorkOrderDomain
    {

        public string WOID { get; set; }
        public string PartID { get; set; }
        public DateTime RequestedDeliveryDate { get; set; }
        public DateTime CommittedDeliveryDate { get; set; }
        public int ReleasedProdQty { get; set; }
        public DateTime ReleasedProdDate { get; set; }
        public int ActualProdQty { get; set; }
        public DateTime ActualProdDate { get; set; }
        public int ActualRecQty { get; set; }
        public DateTime ActualRecDate { get; set; }

        public int CompletedQty { get; set; }
        public DateTime CompletedDate { get; set; }

        public int OutstandingQty { get; set; }
        public DateTime OutstandingDate { get; set; }

        public int AccumulatedScrapQty { get; set; }
        public DateTime AccumulatedScrapDate { get; set; }

        public int TotalActAdjustedQty { get; set; }
        public DateTime TotalActAdjustedDate { get; set; }

        public string WOStatus { get; set; }
        public string ToolDescription { get; set; }
        public string PlannerRemark { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string ParentWOID { get; set; }
        public string Remark { get; set; }

        public int PPID { get; set; }

        public string SalesOrderID { get; set; }

        public DateTime ReleasedDate { get; set; }

        public string AlertStatus { get; set; }
        public string OrderType { get; set; }
        public string OperatorID { get; set; }
        public string OperatorName { get; set; }
        public string ApprovedID { get; set; }
        public string ApprovedName { get; set; }

    }
}
