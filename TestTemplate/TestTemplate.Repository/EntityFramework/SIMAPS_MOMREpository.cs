using TestTemplate.Domain;
using TestTemplate.Repository.EntityFramework.DBContexts;
using TestTemplate.Repository.EntityFramework.Mapper;
using System.Collections.Generic;
using System.Linq;
using TestTemplate.Repository.EntityFramework.DBContexts.Test;
using TestTemplate.Repository.EntityFramework.DBContexts.SIMAPS_MOM;
namespace TestTemplate.Repository.EntityFramework
{
    public class SIMAPS_MOMREpository : RepositoryBase
    {
        public IEnumerable<WorkOrderMasterDomain> populateCustomerNamelist()
        {

            //string str_select =
            //                   "select distinct a.Customer "
            //                   + "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderMaster a "
            //                   + "inner join TS_WorkOrder b "
            //                   + "on b.WOID = a.ID "
            //                   + "where a.Customer is not null "
            //                   + "Order by a.Customer ";

            using (HMLVTSDb = new HMLVTSDB())
            {
                using (SIMAPS_MOMDb = new SIMAPS_MOM())
                {
                    //return entity.Student.Where(x => x.IsActive == true).ToList();
                    //string str_select = "Select * from Integration.WorkOrderMaster";
                    //var entity1 = HMLVTSDb.TS_WorkOrderExecution.Where(x => x.ParentWOID == null).ToList();

                    var one = HMLVTSDb.TS_WorkOrder.AsEnumerable();
                    var two = SIMAPS_MOMDb.WorkOrderMaster1.AsEnumerable();
                    var entity = (from a in one
                                  join b in two on a.WOID equals b.ID
                                  select b).ToList();


                    //var entity = HMLVTSDb.TS_WorkOrder.ToList();
                    //where a.Customer != null;                   
                    return entity.ToDomainModels();
                    //var entity = from a in SIMAPS_MOMDb.Integration.WorkOrderMaster.;
                    //             join b in HMLVTSDb.
                   // var entity = HMLVTSDb.TS_WorkOrder.SqlQuery(str_select).ToList();
                    //var entity = HMLVTSDb.TS_WorkOrder.ToList();
                    // return entity.ToDomainModels();
                }
            }

        }



        
        public IEnumerable<WorkOrderInfoDomain> populateFGDimensionlist()
        {

            //string str_select =
            //        "select distinct a.FGDimension "
            //        + "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a "
            //        + "inner join TS_WorkOrder b "
            //        + "on b.WOID = a.WOID "
            //        + "where a.FGDimension is not null "
            //        + "Order by a.FGDimension ";

            using (HMLVTSDb = new HMLVTSDB())
            {
                using (SIMAPS_MOMDb = new SIMAPS_MOM())
                {
                    

                    var one = HMLVTSDb.TS_WorkOrder.AsEnumerable();
                    var two = SIMAPS_MOMDb.WorkOrderInfoes.AsEnumerable();
                    var entity = (from a in one
                                  join b in two on a.WOID equals b.WOID
                                  select b).ToList();  
                              
                    return entity.ToDomainModels();

                }
            }

        }



        public IEnumerable<WorkOrderInfoDomain> populatePONumberlist()
        {
            //string str_select =
            //"select distinct a.PONumber "
            //+ "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a "
            //+ "inner join TS_WorkOrder b "
            //+ "on b.WOID = a.WOID "
            //+ "where a.PONumber is not null "
            //+ "Order by a.PONumber ";

            using (HMLVTSDb = new HMLVTSDB())
            {
                using (SIMAPS_MOMDb = new SIMAPS_MOM())
                {


                    var one = HMLVTSDb.TS_WorkOrder.AsEnumerable();
                    var two = SIMAPS_MOMDb.WorkOrderInfoes.AsEnumerable();
                    var entity = (from a in one
                                  join b in two on a.WOID equals b.WOID
                                  where b.PONumber != null
                                  orderby b.PONumber
                                  select b).ToList();

                    return entity.ToDomainModels();

                }
            }

        }

        public IEnumerable<WorkOrderInfoDomain> populateSOLineNolist()
        {
            //string str_select =
            //        "select distinct a.LineNumber "
            //        + "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a "
            //        + "inner join TS_WorkOrder b "
            //        + "on b.WOID = a.WOID "
            //        + "where a.LineNumber is not null "
            //        + "Order by a.LineNumber ";

            using (HMLVTSDb = new HMLVTSDB())
            {
                using (SIMAPS_MOMDb = new SIMAPS_MOM())
                {


                    var one = HMLVTSDb.TS_WorkOrder.AsEnumerable();
                    var two = SIMAPS_MOMDb.WorkOrderInfoes.AsEnumerable();
                    var entity = (from a in one
                                  join b in two on a.WOID equals b.WOID
                                  where b.LineNumber != null
                                  orderby b.LineNumber
                                  select b).ToList();

                    return entity.ToDomainModels();

                }
            }

        }

        public IEnumerable<WorkOrderInfoDomain> populateSORemarklist()
        {
            //string str_select =
            //        "select distinct a.Remark "
            //        + "from " + GlobalVar.WOGlobalPSDatabase + "WorkOrderInfo a "
            //        + "inner join TS_WorkOrder b "
            //        + "on b.WOID = a.WOID "
            //        + "where a.Remark is not null "
            //        + "Order by a.Remark ";

            using (HMLVTSDb = new HMLVTSDB())
            {
                using (SIMAPS_MOMDb = new SIMAPS_MOM())
                {


                    var one = HMLVTSDb.TS_WorkOrder.AsEnumerable();
                    var two = SIMAPS_MOMDb.WorkOrderInfoes.AsEnumerable();
                    var entity = (from a in one
                                  join b in two on a.WOID equals b.WOID
                                  where b.Remark != null
                                  orderby b.Remark
                                  select b).ToList();

                    return entity.ToDomainModels();

                }
            }

        }

        

    }
}
