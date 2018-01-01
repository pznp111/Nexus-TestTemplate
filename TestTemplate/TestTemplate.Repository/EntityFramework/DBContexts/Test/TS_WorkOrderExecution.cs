//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestTemplate.Repository.EntityFramework.DBContexts.Test
{
    using System;
    using System.Collections.Generic;
    
    public partial class TS_WorkOrderExecution
    {
        public string WOID { get; set; }
        public string PartID { get; set; }
        public int ActualRecQty { get; set; }
        public System.DateTime ActualRecDate { get; set; }
        public int CompletedQty { get; set; }
        public System.DateTime CompletedDate { get; set; }
        public int OutstandingQty { get; set; }
        public System.DateTime OutstandingDate { get; set; }
        public Nullable<int> ScrapQty { get; set; }
        public Nullable<System.DateTime> ScrapDate { get; set; }
        public Nullable<int> AdjustedQty { get; set; }
        public Nullable<System.DateTime> AdjustedDate { get; set; }
        public string McID { get; set; }
        public string McType { get; set; }
        public int RouteID { get; set; }
        public string WorkCenter { get; set; }
        public int Opseq { get; set; }
        public int ProcOpSeq { get; set; }
        public string WOStatus { get; set; }
        public Nullable<System.DateTime> SetupStartDate { get; set; }
        public Nullable<System.DateTime> SetupEndDate { get; set; }
        public Nullable<System.DateTime> ProdStartDate { get; set; }
        public Nullable<System.DateTime> ProdEndDate { get; set; }
        public string ParentWOID { get; set; }
        public string Remark { get; set; }
        public Nullable<decimal> TotalSetupDuration { get; set; }
        public Nullable<decimal> ProdTotalDuration { get; set; }
        public string OperatorID { get; set; }
        public string OperatorName { get; set; }
        public string ShiftID { get; set; }
        public Nullable<System.DateTime> SendOutDate { get; set; }
        public Nullable<System.DateTime> ReceivedDate { get; set; }
        public Nullable<int> QtyUpdated { get; set; }
        public Nullable<decimal> PlannedDuration { get; set; }
        public string OrderType { get; set; }
    
        public virtual TS_WorkOrder TS_WorkOrder { get; set; }
    }
}
