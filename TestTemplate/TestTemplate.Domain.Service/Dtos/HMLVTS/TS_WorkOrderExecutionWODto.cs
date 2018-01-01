using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace TestTemplate.Domain.Service.Dtos.HMLVTS
{
    public class TS_WorkOrderExecutionWODto
    {
        [DataMember]
        public string WOID { get; set; }
    }
}



