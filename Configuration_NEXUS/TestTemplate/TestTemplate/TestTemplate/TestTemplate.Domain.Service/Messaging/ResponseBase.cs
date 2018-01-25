using TestTemplate.Domain.Service.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Messaging
{
    public class ResponseBase : IResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
