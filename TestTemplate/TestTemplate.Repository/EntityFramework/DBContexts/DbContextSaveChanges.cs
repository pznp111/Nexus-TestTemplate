using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
namespace TestTemplate.Repository.EntityFramework.DBContexts
{
    public static class DbContextSaveChanges
    {
        public static void SaveChanges(ObjectContext objectContext)
        {

            foreach (var entry in
                   objectContext.ObjectStateManager.GetObjectStateEntries(EntityState.Added | EntityState.Modified))
            {
                CurrentValueRecord entryValues = entry.CurrentValues;
                if (entry.State == EntityState.Added)
                {

                    if (entry.Entity.GetType().GetProperty("CreatedOn") != null)
                        entry.Entity.GetType().GetProperty("CreatedOn").SetValue(entry.Entity, DateTime.Now);

                    if (entry.Entity.GetType().GetProperty("ModifiedOn") != null)
                        entry.Entity.GetType().GetProperty("ModifiedOn").SetValue(entry.Entity, null);

                    if (entry.Entity.GetType().GetProperty("ModifiedBy") != null)
                        entry.Entity.GetType().GetProperty("ModifiedBy").SetValue(entry.Entity, null);

                    if (entry.Entity.GetType().GetProperty("IsActive") != null)
                        entry.Entity.GetType().GetProperty("IsActive").SetValue(entry.Entity, true);


                }

                if (entry.State == EntityState.Modified)
                {
                    if (entry.Entity.GetType().GetProperty("CreatedOn") != null)
                        entry.RejectPropertyChanges("CreatedOn");

                    if (entry.Entity.GetType().GetProperty("CreatedBy") != null)
                        entry.RejectPropertyChanges("CreatedBy");

                    if (entry.Entity.GetType().GetProperty("ModifiedOn") != null)
                        entry.Entity.GetType().GetProperty("ModifiedOn").SetValue(entry.Entity, DateTime.Now);



                }


            }

        }
    }
}
