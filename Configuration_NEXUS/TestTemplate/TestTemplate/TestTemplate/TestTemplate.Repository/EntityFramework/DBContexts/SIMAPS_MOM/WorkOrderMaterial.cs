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
    
    public partial class WorkOrderMaterial
    {
        public int ID { get; set; }
        public int WOID { get; set; }
        public string Name { get; set; }
        public string Supplier { get; set; }
        public string Grade { get; set; }
        public string MatType { get; set; }
        public Nullable<int> ReqQty { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
        public string Diameter { get; set; }
        public string Length { get; set; }
        public string Thinkness { get; set; }
        public string Width { get; set; }
        public string OutsideDiameter { get; set; }
        public string InsideDiameter { get; set; }
        public string Availability { get; set; }
        public Nullable<int> sodID { get; set; }
        public string QtyLength { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
    }
}