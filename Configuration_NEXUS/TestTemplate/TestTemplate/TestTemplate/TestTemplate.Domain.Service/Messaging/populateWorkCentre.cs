using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestTemplate.Domain.Service.Dtos.HMLVTS;

namespace TestTemplate.Domain.Service.Messaging
{
    public class populateWorkCentre: ResponseBase
    {
        public IEnumerable<TS_WorkOrderExecutionWorkCenterDto> TS_WorkOrderExecutionWorkCenter { get; set; }
    }
}
