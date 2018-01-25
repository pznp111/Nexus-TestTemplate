using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace TestTemplate.Domain.Service.Dtos.SIMAPOS_MOM
{
    public class WorkOrderInfoDto
    {
        [DataMember]
        public string WOID { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public string PONumber { get; set; }
        [DataMember]
        public string PartNum { get; set; }
        [DataMember]
        public string FGDimension { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public DateTime CommittedDeliveryDate { get; set; }
        [DataMember]
        public DateTime RequestedDeliveryDate { get; set; }
        [DataMember]
        public int LineNumber { get; set; }
    }
}
