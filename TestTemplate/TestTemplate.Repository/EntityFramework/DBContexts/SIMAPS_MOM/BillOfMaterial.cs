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
    
    public partial class BillOfMaterial
    {
        public int BillOfMaterialId { get; set; }
        public int ProductAssemblyId { get; set; }
        public int ComponentId { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string UOMCode { get; set; }
        public short BOMLevel { get; set; }
        public double PerAssemblyQty { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    
        public virtual Item Item { get; set; }
        public virtual Item Item1 { get; set; }
    }
}
