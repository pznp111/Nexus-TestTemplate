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
    
    public partial class OperationRate
    {
        public int OperationRateId { get; set; }
        public Nullable<int> RouteID { get; set; }
        public Nullable<int> RouteOperationId { get; set; }
        public Nullable<int> OperationID { get; set; }
        public Nullable<int> ResourceID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public string Instruction { get; set; }
        public Nullable<double> Cost { get; set; }
        public Nullable<double> Pretime { get; set; }
        public Nullable<double> Posttime { get; set; }
        public Nullable<double> RunTime { get; set; }
        public Nullable<int> UOM { get; set; }
        public Nullable<bool> IsDefault { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    }
}