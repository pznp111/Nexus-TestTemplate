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
    
    public partial class TS_QC_Equipment
    {
        public string WOID { get; set; }
        public string WorkCenter { get; set; }
        public int RouteID { get; set; }
        public int OpSeq { get; set; }
        public int ProcOpSeq { get; set; }
        public string McID { get; set; }
    
        public virtual TS_WorkOrder TS_WorkOrder { get; set; }
    }
}
