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
    
    public partial class PPOrder1
    {
        public int ID { get; set; }
        public Nullable<int> MeltingOrderID { get; set; }
        public string GoldContent { get; set; }
        public string Size { get; set; }
        public string BasicChainType { get; set; }
        public decimal AllocWeight { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public Nullable<System.DateTime> IssueDate { get; set; }
        public string status { get; set; }
        public Nullable<System.DateTime> GenDate { get; set; }
    }
}