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
    
    public partial class SalesOrderCancelled
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SalesOrderCancelled()
        {
            this.SalesOrderCancelDets = new HashSet<SalesOrderCancelDet>();
        }
    
        public int ID { get; set; }
        public string OrderNo { get; set; }
        public int OrderDetID { get; set; }
        public Nullable<decimal> OrigQty { get; set; }
        public Nullable<decimal> PlannedQty { get; set; }
        public Nullable<decimal> CancelledQty { get; set; }
        public Nullable<decimal> BalQty { get; set; }
        public Nullable<System.DateTime> GenDate { get; set; }
        public string Remark { get; set; }
        public string status { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SalesOrderCancelDet> SalesOrderCancelDets { get; set; }
    }
}
