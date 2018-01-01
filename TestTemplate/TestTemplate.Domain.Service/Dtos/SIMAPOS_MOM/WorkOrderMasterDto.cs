using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace TestTemplate.Domain.Service.Dtos.SIMAPOS_MOM
{
    public class WorkOrderMasterDto
    {
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string PartNo { get; set; }
        [DataMember]
        public double Qty { get; set; }
        [DataMember]
        public DateTime IssueDate { get; set; }
        [DataMember]
        public DateTime DeliveryDate { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string Location { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string OrderType { get; set; }
        [DataMember]
        public int RouteID { get; set; }
        [DataMember]
        public string Customer { get; set; }
        [DataMember]
        public DateTime CreatedDate { get; set; }
        [DataMember]
        public string UserID { get; set; }
        [DataMember]
        public double BalQty { get; set; }
        [DataMember]
        public int ToStockQty { get; set; }
        [DataMember]
        public int InvQty1 { get; set; }
        [DataMember]
        public int InvQty2 { get; set; }
        [DataMember]
        public string DrawingStatus { get; set; }
        [DataMember]
        public string MaterialGrade { get; set; }
        [DataMember]
        public string MaterialSupplier { get; set; }
        [DataMember]
        public int PartId { get; set; }
       
}
}
