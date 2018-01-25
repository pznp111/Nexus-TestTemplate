using Nexus.Infrastructure.DbAccess.AdoNet;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework
{
    public class ConnectionStringFactory1
    {
        SqlConnectionStringBuilder _sqlConnBuilder;
        EntityConnectionStringBuilder _entityBuilder;

        public ConnectionStringFactory1()
        {
            Db db = new Db("TestConn1");
            _sqlConnBuilder = new SqlConnectionStringBuilder(db.connectionString);
            _entityBuilder = new EntityConnectionStringBuilder();
            _entityBuilder.Provider = "System.Data.SqlClient";
            _entityBuilder.ProviderConnectionString = _sqlConnBuilder.ToString();
        }

        public string GetTestDBConnection1()
        {
            //_entityBuilder.Metadata = @"res://*/EntityFramework.DBContexts.Plannings.Planning.csdl|res://*/EntityFramework.DBContexts.Plannings.Planning.ssdl|res://*/EntityFramework.DBContexts.Plannings.Planning.msl";
            _entityBuilder.Metadata = @"res://*/EntityFramework.DBContexts.SIMAPS_MOM.Model1.csdl|res://*/EntityFramework.DBContexts.SIMAPS_MOM.Model1.ssdl|res://*/EntityFramework.DBContexts.SIMAPS_MOM.Model1.msl";
            return _entityBuilder.ConnectionString;
            // <add name="SIMAPS_MOM" connectionString="metadata=res://*/EntityFramework.DBContexts.Test.Model1.csdl|res://*/EntityFramework.DBContexts.Test.Model1.ssdl|res://*/EntityFramework.DBContexts.Test.Model1.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=ST-LINXL-NB;initial catalog=SIMAPS_MOM;user id=sa;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />

        }

    }
}
