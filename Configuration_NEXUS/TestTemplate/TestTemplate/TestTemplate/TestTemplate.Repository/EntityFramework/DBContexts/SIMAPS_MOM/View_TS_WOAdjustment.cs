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
    
    public partial class View_TS_WOAdjustment
    {
        public int WOID { get; set; }
        public string PartID { get; set; }
        public decimal RequestedAdjustedQty { get; set; }
        public Nullable<System.DateTime> GenDate { get; set; }
        public int OrderCancelledID { get; set; }
        public string Status { get; set; }
        public Nullable<int> PPID { get; set; }
    }
}
