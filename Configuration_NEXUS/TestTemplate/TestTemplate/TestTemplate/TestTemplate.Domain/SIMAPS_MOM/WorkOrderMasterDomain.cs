using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain
{
    public class WorkOrderMasterDomain
    {
        
      public string ID { get; set; }
      public string PartNo { get; set; }
      public double Qty { get; set; }
      public DateTime IssueDate { get; set; }
      public DateTime DeliveryDate { get; set; }
      public string Status { get; set; }
      public string Location { get; set; }
      public string Remark { get; set; }
      public string OrderType { get; set; }
      public int RouteID { get; set; }
      public string Customer { get; set; }
      public DateTime CreatedDate { get; set; }
      public string UserID { get; set; }
      public double BalQty { get; set; }
      public int ToStockQty { get; set; }
      public int InvQty1 { get; set; }
      public int InvQty2 { get; set; }
      public string DrawingStatus { get; set; }
      public string MaterialGrade { get; set; }
      public string MaterialSupplier { get; set; }
      public int PartId { get; set; }
    }
}
