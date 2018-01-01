//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace TestTemplate.Repository.EntityFramework.DBContexts.Test
//{
//    public partial class HMLVTSDB : DbContext
//    {
//        //constructor
//        public HMLVTSDB() : base(GetConnString())
//        { }

//        //methods
//        private static string GetConnString()
//        {
//            var conn = new ConnectionStringFactory();
//            return conn.GetTestDBConnection();
//        }
//        public override int SaveChanges()
//        {
//            ChangeTracker.DetectChanges();
//            DbContextSaveChanges.SaveChanges(((IObjectContextAdapter)this).ObjectContext);

//            return base.SaveChanges();
//        }
//    }
//}
