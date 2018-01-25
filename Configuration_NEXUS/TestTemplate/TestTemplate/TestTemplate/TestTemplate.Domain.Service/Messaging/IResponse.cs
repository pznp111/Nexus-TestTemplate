using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Messaging
{
    public interface IResponse
    {
        bool Success { get; set; }
        string Message { get; set; }
    }
}
