using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain
{
    public class WorkOrderInfoDomain
    {
        public string WOID { get; set; }
        public string CreatedBy { get; set; }
        public string PONumber { get; set; }
        public string PartNum { get; set; }
        public string FGDimension { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }
        public DateTime CommittedDeliveryDate { get; set; }
        public DateTime RequestedDeliveryDate { get; set; }
        public int LineNumber { get; set; }
    }
}
