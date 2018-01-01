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
using System.Diagnostics;

namespace TestTemplate.Repository.EntityFramework
{
    public class ConnectionStringFactory
    {
        SqlConnectionStringBuilder _sqlConnBuilder;
        EntityConnectionStringBuilder _entityBuilder;



        public ConnectionStringFactory()
        {

            Db db = new Db("TestConn");
            // Db db = new Db("");
           // String decryptString = EncryptionHelper.Decrypt(db.connectionString);
           // db.connectionString = decryptString;
            _sqlConnBuilder = new SqlConnectionStringBuilder(db.connectionString);
            _entityBuilder = new EntityConnectionStringBuilder();
            _entityBuilder.Provider = "System.Data.SqlClient";
            _entityBuilder.ProviderConnectionString = _sqlConnBuilder.ToString();

          //  String result = EncryptionHelper.Encrypt(_entityBuilder.ProviderConnectionString);
          //  Debug.WriteLine("before encrypt",_entityBuilder.ProviderConnectionString);
          //  Debug.WriteLine("after encrypt",result);

        }

        public string GetTestDBConnection()
        {
            //_entityBuilder.Metadata = @"res://*/EntityFramework.DBContexts.Plannings.Planning.csdl|res://*/EntityFramework.DBContexts.Plannings.Planning.ssdl|res://*/EntityFramework.DBContexts.Plannings.Planning.msl";
            _entityBuilder.Metadata = @"res://*/EntityFramework.DBContexts.Test.Test.csdl|res://*/EntityFramework.DBContexts.Test.Test.ssdl|res://*/EntityFramework.DBContexts.Test.Test.msl";
            return _entityBuilder.ConnectionString;
            // <add name="SIMAPS_MOM" connectionString="metadata=res://*/EntityFramework.DBContexts.Test.Model1.csdl|res://*/EntityFramework.DBContexts.Test.Model1.ssdl|res://*/EntityFramework.DBContexts.Test.Model1.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=ST-LINXL-NB;initial catalog=SIMAPS_MOM;user id=sa;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />

        }
    }
}
