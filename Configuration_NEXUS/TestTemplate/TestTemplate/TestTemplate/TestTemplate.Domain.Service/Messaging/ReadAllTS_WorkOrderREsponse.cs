using System;
using TestTemplate.Domain.Service.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.HMLVTS;

namespace TestTemplate.Domain.Service.Messaging
{
    public class ReadAllTS_WorkOrderREsponse : ResponseBase
    {
        public IEnumerable<TS_WorkOrderDto> TS_WorkOrder { get; set; }
    }
}
