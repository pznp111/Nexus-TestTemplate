using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Messaging
{
    public class QueryRequestBase
    {
        public string LoadOption { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public string OrderBy { get; set; }
    }
}
