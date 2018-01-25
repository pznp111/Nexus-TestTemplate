using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Dtos.HMLVTS
{
    public class TS_WorkOrderDto : DtoBase
    {
        [DataMember]
        public string WOID { get; set; }
        [DataMember]
        public string PartID { get; set; }
        [DataMember]
        public DateTime RequestedDeliveryDate { get; set; }
        [DataMember]
        public DateTime CommittedDeliveryDate { get; set; }
        [DataMember]
        public int ReleasedProdQty { get; set; }
        [DataMember]
        public DateTime ReleasedProdDate { get; set; }
        [DataMember]
        public int ActualProdQty { get; set; }
        [DataMember]
        public DateTime ActualProdDate { get; set; }
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
        public int AccumulatedScrapQty { get; set; }
        [DataMember]
        public DateTime AccumulatedScrapDate { get; set; }
        [DataMember]
        public int TotalActAdjustedQty { get; set; }
        [DataMember]
        public DateTime TotalActAdjustedDate { get; set; }
        [DataMember]
        public string WOStatus { get; set; }
        [DataMember]
        public string ToolDescription { get; set; }
        [DataMember]
        public string PlannerRemark { get; set; }
        [DataMember]
        public DateTime StartDate { get; set; }
        [DataMember]
        public DateTime EndDate { get; set; }
        [DataMember]
        public string ParentWOID { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public int PPID { get; set; }
        [DataMember]
        public string SalesOrderID { get; set; }
        [DataMember]
        public DateTime ReleasedDate { get; set; }
        [DataMember]
        public string AlertStatus { get; set; }
        [DataMember]
        public string OrderType { get; set; }
        [DataMember]
        public string OperatorID { get; set; }
        [DataMember]
        public string OperatorName { get; set; }
        [DataMember]
        public string ApprovedID { get; set; }
        [DataMember]
        public string ApprovedName { get; set; }
    }
}
