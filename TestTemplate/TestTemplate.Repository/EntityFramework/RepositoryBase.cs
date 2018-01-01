using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nexus.Infrastructure.Domain;
using TestTemplate.Repository.EntityFramework.DBContexts.Test;
using TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM;

namespace TestTemplate.Repository.EntityFramework
{
    public abstract class RepositoryBase
    {

        //Create DbContext      
        internal HMLVTSDB HMLVTSDb;
        internal SIMAPS_MOM SIMAPS_MOMDb;
    }
}
