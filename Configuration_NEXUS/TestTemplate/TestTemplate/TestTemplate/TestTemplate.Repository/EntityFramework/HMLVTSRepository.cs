using TestTemplate.Domain;
using TestTemplate.Repository.EntityFramework.DBContexts;
using TestTemplate.Repository.EntityFramework.Mapper;
using System.Collections.Generic;
using System.Linq;
using TestTemplate.Repository.EntityFramework.DBContexts.Test;
using Nexus.Infrastructure.Querying;
using System;

namespace TestTemplate.Repository.EntityFramework
{
    public class HMLVTSRepository : RepositoryBase
    {




        public IEnumerable<TS_WorkOrderExecutionDomain> populatePartIDlist()
        {

            //using (TestDB = new CleanNexus.Repository.EntityFramework.DBContexts.TestDB())
            //{
            //    var entity = TestDB.Students.Where(x => x.IsActive == true).ToList();
            //    return entity.ToDomainModels();
            //}


            using (HMLVTSDb = new HMLVTSDB())
            {
                //return entity.Student.Where(x => x.IsActive == true).ToList();
                //string str_select = "SELECT distinct PartID FROM TS_WorkOrderExecution Order by PartID ";
                string str_select = "Select * from dbo.TS_WorkOrderExecution";
                var entity = HMLVTSDb.TS_WorkOrderExecution.SqlQuery(str_select).ToList();
                //var entity = HMLVTSDb.TS_WorkOrder.ToList();
                return entity.ToDomainModels();
            }

        }

        public IEnumerable<TS_WorkOrderDomain> spGenerateDynamicWOStatusList(Query query)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TS_WorkOrderDomain> FindAll()
        {

            //using (TestDB = new CleanNexus.Repository.EntityFramework.DBContexts.TestDB())
            //{
            //    var entity = TestDB.Students.Where(x => x.IsActive == true).ToList();
            //    return entity.ToDomainModels();
            //}


            using (HMLVTSDb = new HMLVTSDB())
            {
                //return entity.Student.Where(x => x.IsActive == true).ToList();
                
                string str_select = "Select * from dbo.TS_WorkOrder";
                var entity = HMLVTSDb.TS_WorkOrder.SqlQuery(str_select).ToList();
                //var entity = HMLVTSDb.TS_WorkOrder.ToList();
                return entity.ToDomainModels();
            }

        }

        public IEnumerable<TS_WorkOrderExecutionWODomain> populateWOlist()
        {

            //string str_select = "SELECT distinct WOID FROM TS_WorkOrderExecution "
            //+ "WHERE ParentWOID IS NULL "
            //+ "OR EXISTS  (select ParentWOID "
            //+ "FROM TS_WorkOrderExecution "
            //+ "WHERE WOID = ParentWOID) Order by WOID "; + "order by McID ";


            using (HMLVTSDb = new HMLVTSDB())
            {
                //return entity.Student.Where(x => x.IsActive == true).ToList();
                //Workflows.Where(w => w.Activities.Any(a => a.Title == "xyz"))
               // var entity = HMLVTSDb.TS_WorkOrderExecution.Where(x => x.ParentWOID == null || x.ParentWOID.Any(w => x.WOID == x.ParentWOID)).ToList();// to do
                //var entity1 = HMLVTSDb.TS_WorkOrderExecution.Where(x => x.ParentWOID.Any(w=>x.WOID == x.ParentWOID)).ToList();
                var entity = HMLVTSDb.TS_WorkOrderExecution                  
                    .Where(x=>x.ParentWOID == null )
                    .ToList();// to do
                return entity.ToDomainMOModels();
            }

        }

        public IEnumerable<TS_WorkOrderExecutionMcIDDomain> populateMachineID()
        {

            //string str_select = "SELECT distinct McID "
            //                        + " FROM TS_WorkOrderExecution "
            //                        + "Where( McID is not null and McID <> '' ) "
            //                        + "order by McID ";


            using (HMLVTSDb = new HMLVTSDB())
            {
                //return entity.Student.Where(x => x.IsActive == true).ToList();

                var entity = HMLVTSDb.TS_WorkOrderExecution.Where(x=>x.McID !=null).ToList();
                return entity.ToDomainMcIDModels();
            }

        }

        public IEnumerable<TS_WorkOrderExecutionWorkCenterDomain> populateWorkCentre()
        {

            //using (TestDB = new CleanNexus.Repository.EntityFramework.DBContexts.TestDB())
            //{
            //    var entity = TestDB.Students.Where(x => x.IsActive == true).ToList();
            //    return entity.ToDomainModels();
            //}
            //"SELECT distinct WorkCenter FROM TS_WorkOrderExecution order by WorkCenter ";
            //string str_select = "SELECT distinct WorkCenter FROM dbo.TS_WorkOrderExecution";
            using (HMLVTSDb = new HMLVTSDB())
            {
                //return entity.Student.Where(x => x.IsActive == true).ToList();

                //var entity = HMLVTSDb.TS_WorkOrderExecution.SqlQuery(str_select).ToList();    
                //var entity = HMLVTSDb.TS_WorkOrderExecution.Select(x=>x.WOID).Distinct().ToList();
                var entity = HMLVTSDb.TS_WorkOrderExecution.ToList();
                return entity.ToDomainWorkCentreModels();
               // return entity.ToDomainWorkCentreModels();
            }

        }

    }
}
