//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM
//{
//    public partial class SIMAPS_MOMDB : DbContext
//    {
//        //constructor
//        public SIMAPS_MOMDB() : base(GetConnString())
//        { }

//        //methods
//        private static string GetConnString()
//        {
//            var conn = new ConnectionStringFactory1();
//            return conn.GetTestDBConnection1();
//        }
//        public override int SaveChanges()
//        {
//            ChangeTracker.DetectChanges();
//            DbContextSaveChanges.SaveChanges(((IObjectContextAdapter)this).ObjectContext);

//            return base.SaveChanges();
//        }
//    }
//}
