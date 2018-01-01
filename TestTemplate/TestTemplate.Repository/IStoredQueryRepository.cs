using Nexus.Infrastructure.DbAccess.AdoNet;
using Nexus.Infrastructure.Querying;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository
{
    public interface IStoredQueryRepository
    {
        DataTable Translate(Nexus.Infrastructure.Querying.Query query);
    }
}
