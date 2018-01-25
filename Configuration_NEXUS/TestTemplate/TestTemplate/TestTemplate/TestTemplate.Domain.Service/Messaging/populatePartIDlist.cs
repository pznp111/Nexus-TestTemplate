using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.HMLVTS;

namespace TestTemplate.Domain.Service.Messaging
{
    public class populatePartIDlist : ResponseBase
    {
        public IEnumerable<TS_WorkOrderExecutionDto> TS_WorkOrderExecution { get; set; }
    }
}
