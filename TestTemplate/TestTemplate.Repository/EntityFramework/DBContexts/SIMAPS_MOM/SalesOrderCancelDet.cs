//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM
{
    using System;
    using System.Collections.Generic;
    
    public partial class SalesOrderCancelDet
    {
        public int ID { get; set; }
        public int OrderCancelledID { get; set; }
        public int PPID { get; set; }
        public decimal PlannedWt { get; set; }
        public decimal CancelledWt { get; set; }
        public decimal BalWt { get; set; }
        public string Remark { get; set; }
        public string Status { get; set; }
    
        public virtual SalesOrderCancelled SalesOrderCancelled { get; set; }
    }
}
