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
    
    public partial class DeliveryOrderDetail
    {
        public int DeliveryOrderLineID { get; set; }
        public int DeliveryOrderID { get; set; }
        public Nullable<int> WorkOrderID { get; set; }
        public Nullable<int> SalesOrderLineID { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public double Quantity { get; set; }
        public string Comment { get; set; }
        public string String1 { get; set; }
        public string String2 { get; set; }
        public string String3 { get; set; }
        public string String4 { get; set; }
        public string String5 { get; set; }
        public string String6 { get; set; }
        public string String7 { get; set; }
        public string String8 { get; set; }
        public string String9 { get; set; }
        public string String10 { get; set; }
        public string String11 { get; set; }
        public string String12 { get; set; }
        public string String13 { get; set; }
        public string String14 { get; set; }
        public string String15 { get; set; }
        public string String16 { get; set; }
        public string String17 { get; set; }
        public string String18 { get; set; }
        public string String19 { get; set; }
        public string String20 { get; set; }
        public string String21 { get; set; }
        public string String22 { get; set; }
        public string String23 { get; set; }
        public string String24 { get; set; }
        public string String25 { get; set; }
        public string String26 { get; set; }
        public string String27 { get; set; }
        public string String28 { get; set; }
        public string String29 { get; set; }
        public string String30 { get; set; }
        public string String31 { get; set; }
        public string String32 { get; set; }
        public string String33 { get; set; }
        public string String34 { get; set; }
        public string String35 { get; set; }
        public string String36 { get; set; }
        public string String37 { get; set; }
        public string String38 { get; set; }
        public string String39 { get; set; }
        public string String40 { get; set; }
        public string String41 { get; set; }
        public string String42 { get; set; }
        public string String43 { get; set; }
        public string String44 { get; set; }
        public string String45 { get; set; }
        public string String46 { get; set; }
        public string String47 { get; set; }
        public string String48 { get; set; }
        public string String49 { get; set; }
        public string String50 { get; set; }
        public string MaxString1 { get; set; }
        public string MaxString2 { get; set; }
        public Nullable<bool> Flag1 { get; set; }
        public Nullable<bool> Flag2 { get; set; }
        public Nullable<bool> Flag3 { get; set; }
        public Nullable<bool> Flag4 { get; set; }
        public Nullable<bool> Flag5 { get; set; }
        public Nullable<bool> Flag6 { get; set; }
        public Nullable<bool> Flag7 { get; set; }
        public Nullable<bool> Flag8 { get; set; }
        public Nullable<bool> Flag9 { get; set; }
        public Nullable<bool> Flag10 { get; set; }
        public Nullable<bool> Flag11 { get; set; }
        public Nullable<bool> Flag12 { get; set; }
        public Nullable<bool> Flag13 { get; set; }
        public Nullable<bool> Flag14 { get; set; }
        public Nullable<bool> Flag15 { get; set; }
        public Nullable<bool> Flag16 { get; set; }
        public Nullable<bool> Flag17 { get; set; }
        public Nullable<bool> Flag18 { get; set; }
        public Nullable<bool> Flag19 { get; set; }
        public Nullable<bool> Flag20 { get; set; }
        public Nullable<bool> Flag21 { get; set; }
        public Nullable<bool> Flag22 { get; set; }
        public Nullable<bool> Flag23 { get; set; }
        public Nullable<bool> Flag24 { get; set; }
        public Nullable<bool> Flag25 { get; set; }
        public Nullable<bool> Flag26 { get; set; }
        public Nullable<bool> Flag27 { get; set; }
        public Nullable<bool> Flag28 { get; set; }
        public Nullable<bool> Flag29 { get; set; }
        public Nullable<bool> Flag30 { get; set; }
        public Nullable<bool> Flag31 { get; set; }
        public Nullable<bool> Flag32 { get; set; }
        public Nullable<bool> Flag33 { get; set; }
        public Nullable<bool> Flag34 { get; set; }
        public Nullable<bool> Flag35 { get; set; }
        public Nullable<bool> Flag36 { get; set; }
        public Nullable<bool> Flag37 { get; set; }
        public Nullable<bool> Flag38 { get; set; }
        public Nullable<bool> Flag39 { get; set; }
        public Nullable<bool> Flag40 { get; set; }
        public Nullable<bool> Flag41 { get; set; }
        public Nullable<bool> Flag42 { get; set; }
        public Nullable<bool> Flag43 { get; set; }
        public Nullable<bool> Flag44 { get; set; }
        public Nullable<bool> Flag45 { get; set; }
        public Nullable<bool> Flag46 { get; set; }
        public Nullable<bool> Flag47 { get; set; }
        public Nullable<bool> Flag48 { get; set; }
        public Nullable<bool> Flag49 { get; set; }
        public Nullable<bool> Flag50 { get; set; }
        public Nullable<int> Int1 { get; set; }
        public Nullable<int> Int2 { get; set; }
        public Nullable<int> Int3 { get; set; }
        public Nullable<int> Int4 { get; set; }
        public Nullable<int> Int5 { get; set; }
        public Nullable<int> Int6 { get; set; }
        public Nullable<double> Float1 { get; set; }
        public Nullable<double> Float2 { get; set; }
        public Nullable<double> Float3 { get; set; }
        public Nullable<double> Float4 { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime ModifiedOn { get; set; }
        public byte[] VersionStamp { get; set; }
    
        public virtual DeliveryOrder DeliveryOrder { get; set; }
        public virtual SalesOrderDetail SalesOrderDetail { get; set; }
        public virtual WorkOrder WorkOrder { get; set; }
    }
}
