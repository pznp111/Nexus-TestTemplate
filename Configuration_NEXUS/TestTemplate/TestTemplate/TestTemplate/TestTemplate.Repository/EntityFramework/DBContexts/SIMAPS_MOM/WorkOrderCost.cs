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
    
    public partial class WorkOrderCost
    {
        public int WorkOrderCostId { get; set; }
        public int WorkOrderId { get; set; }
        public string WorkOrderNumber { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public double Quantity { get; set; }
        public string CustomerName { get; set; }
        public string Remarks { get; set; }
        public string String1 { get; set; }
        public string String2 { get; set; }
        public string String3 { get; set; }
        public string String4 { get; set; }
        public string MaxString1 { get; set; }
        public string MaxString2 { get; set; }
        public Nullable<bool> Flag1 { get; set; }
        public Nullable<bool> Flag2 { get; set; }
        public Nullable<int> Int1 { get; set; }
        public Nullable<int> Int2 { get; set; }
        public Nullable<double> Float1 { get; set; }
        public Nullable<double> Float2 { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    }
}
