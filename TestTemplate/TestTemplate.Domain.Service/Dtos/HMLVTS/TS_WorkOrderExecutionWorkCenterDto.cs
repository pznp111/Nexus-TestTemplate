using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace TestTemplate.Domain.Service.Dtos.HMLVTS
{
    public class TS_WorkOrderExecutionWorkCenterDto
    {
        [DataMember]
        public string WorkCenter { get; set; }
    }
}
