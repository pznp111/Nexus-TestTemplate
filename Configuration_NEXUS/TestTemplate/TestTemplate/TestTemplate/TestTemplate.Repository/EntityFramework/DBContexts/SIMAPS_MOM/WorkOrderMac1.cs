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
    
    public partial class WorkOrderMac1
    {
        public int ID { get; set; }
        public string PartNo { get; set; }
        public int RouteID { get; set; }
        public int SeqNo { get; set; }
        public string CentreID { get; set; }
        public string MacCode { get; set; }
        public string MacType { get; set; }
        public string Remark { get; set; }
        public Nullable<int> MacGroup { get; set; }
        public string AttributeGroup { get; set; }
        public string WOID { get; set; }
    }
}
