﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TestTemplate.Domain.Service.Dtos.SIMAPOS_MOM;

namespace TestTemplate.Domain.Service.Messaging
{
    public class populateSORemarklist : ResponseBase
    {
        public IEnumerable<WorkOrderInfoDto> WorkOrderInfo { get; set; }
    }
}
