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
    
    public partial class SalesOrder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SalesOrder()
        {
            this.SalesOrderDetails = new HashSet<SalesOrderDetail>();
        }
    
        public int SalesOrderID { get; set; }
        public string SalesOrderNumber { get; set; }
        public byte OrderType { get; set; }
        public string PurchaseOrderNumber { get; set; }
        public System.DateTime OrderDate { get; set; }
        public System.DateTime DueDate { get; set; }
        public Nullable<System.DateTime> ShipDate { get; set; }
        public byte Status { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public string SalesPersonName { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactNo { get; set; }
        public Nullable<int> LocationID { get; set; }
        public Nullable<int> TotalItems { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<double> TotalQuantity { get; set; }
        public Nullable<decimal> BalanceAmount { get; set; }
        public Nullable<double> BalanceQuantity { get; set; }
        public string Comment { get; set; }
        public string String1 { get; set; }
        public string String2 { get; set; }
        public string String3 { get; set; }
        public string String4 { get; set; }
        public string String5 { get; set; }
        public string MaxString1 { get; set; }
        public string MaxString2 { get; set; }
        public Nullable<double> Float1 { get; set; }
        public Nullable<double> Float2 { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    
        public virtual Customer Customer { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SalesOrderDetail> SalesOrderDetails { get; set; }
    }
}