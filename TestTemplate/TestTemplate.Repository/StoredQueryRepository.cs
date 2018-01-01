using TestTemplate.Repository.EntityFramework.QueryTranslator;
using Nexus.Infrastructure.DbAccess.AdoNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using TestTemplate.Repository.EntityFramework;


namespace TestTemplate.Repository
{
    public class StoredQueryRepository : QueryTranslator, IStoredQueryRepository
    {
        private Db db;

        public StoredQueryRepository()
            : this(new Db()) { }

        public StoredQueryRepository(Db db)
        {
            //connection string in config file(eg. web.config) need to be encrypt or decrypt
            //here, use EncryptionHelper.Encrypt and EncryptionHelper.Decrypt before assign the string back to db
            String decryptString = EncryptionHelper.Decrypt(db.connectionString);
            db.connectionString = decryptString;
            db.SetCommandTimeOut(360);
            this.db = db;
            
        }

        public System.Data.DataTable Translate(Nexus.Infrastructure.Querying.Query query)
        {
            return base.Translate(query, db);
        }

        protected override string FindTableColumnFor(string propertyname)
        {
            throw new NotImplementedException();
        }

        protected override string FindNavigationNameFor(string propertyname)
        {
            throw new NotImplementedException();
        }
    }
}
