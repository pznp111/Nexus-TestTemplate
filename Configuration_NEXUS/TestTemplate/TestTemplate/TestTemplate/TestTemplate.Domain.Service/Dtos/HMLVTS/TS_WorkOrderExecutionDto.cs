using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace TestTemplate.Domain.Service.Dtos.HMLVTS
{
    public class TS_WorkOrderExecutionDto : DtoBase
    {
        [DataMember]
        public string WOID { get; set; }
        [DataMember]
        public string PartID { get; set; }
        [DataMember]
        public int ActualRecQty { get; set; }
        [DataMember]
        public DateTime ActualRecDate { get; set; }
        [DataMember]
        public int CompletedQty { get; set; }
        [DataMember]
        public DateTime CompletedDate { get; set; }
        [DataMember]
        public int OutstandingQty { get; set; }
        [DataMember]
        public DateTime OutstandingDate { get; set; }
        [DataMember]
        public int ScrapQty { get; set; }
        [DataMember]
        public DateTime ScrapDate { get; set; }
        [DataMember]
        public int AdjustedQty { get; set; }
        [DataMember]
        public DateTime AdjustedDate { get; set; }
        [DataMember]
        public string McID { get; set; }
        [DataMember]
        public string McType { get; set; }
        [DataMember]
        public int RouteID { get; set; }
        [DataMember]
        public string WorkCenter { get; set; }
        [DataMember]
        public int Opseq { get; set; }
        [DataMember]
        public int ProcOpSeq { get; set; }
        [DataMember]
        public string WOStatus { get; set; }
        [DataMember]
        public DateTime SetupStartDate { get; set; }
        [DataMember]
        public DateTime SetupEndDate { get; set; }
        [DataMember]
        public DateTime ProdStartDate { get; set; }
        [DataMember]
        public DateTime ProdEndDate { get; set; }
        [DataMember]
        public string ParentWOID { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public float TotalSetupDuration { get; set; }
        [DataMember]
        public float ProdTotalDuration { get; set; }
        [DataMember]
        public string OperatorID { get; set; }
        [DataMember]
        public string OperatorName { get; set; }
        [DataMember]
        public string ShiftID { get; set; }
        [DataMember]
        public DateTime SendOutDate { get; set; }
        [DataMember]
        public DateTime ReceivedDate { get; set; }
        [DataMember]
        public int QtyUpdated { get; set; }
        [DataMember]
        public float PlannedDuration { get; set; }
        [DataMember]
        public string OrderType { get; set; }
    }
}
