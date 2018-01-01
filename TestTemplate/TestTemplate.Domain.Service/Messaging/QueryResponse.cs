using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace TestTemplate.Domain.Service.Messaging
{
    public class QueryResponse : ResponseBase
    {
        public DataTable Result;
        public int TotalRecords { get; set; }
    }
}
