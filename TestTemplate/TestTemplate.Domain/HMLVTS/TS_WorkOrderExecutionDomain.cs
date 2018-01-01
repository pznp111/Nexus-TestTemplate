using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain
{
    public class TS_WorkOrderExecutionDomain
    {
        public string WOID { get; set; }
        public string PartID { get; set; }
        public int ActualRecQty { get; set; }
        public DateTime ActualRecDate { get; set; }

        public int CompletedQty { get; set; }
        public DateTime CompletedDate { get; set; }

        public int OutstandingQty { get; set; }
        public DateTime OutstandingDate { get; set; }

        public int ScrapQty { get; set; }
        public DateTime ScrapDate { get; set; }

        public int AdjustedQty { get; set; }
        public DateTime AdjustedDate { get; set; }

        public string McID { get; set; }
        public string McType { get; set; }

        public int RouteID { get; set; }
        public string WorkCenter { get; set; }

        public int Opseq { get; set; }
        public int ProcOpSeq { get; set; }

        public string WOStatus { get; set; }

        public DateTime SetupStartDate { get; set; }
        public DateTime SetupEndDate { get; set; }

        public DateTime ProdStartDate { get; set; }
        public DateTime ProdEndDate { get; set; }

        public string ParentWOID { get; set; }
        public string Remark { get; set; }

        public float TotalSetupDuration { get; set; }
        public float ProdTotalDuration { get; set; }

        public string OperatorID { get; set; }
        public string OperatorName { get; set; }
        public string ShiftID { get; set; }

        public DateTime SendOutDate { get; set; }
        public DateTime ReceivedDate { get; set; }

        public int QtyUpdated { get; set; }
        public float PlannedDuration { get; set; }
        public string OrderType { get; set; }


    }
}
