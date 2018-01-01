using Nexus.Infrastructure.DbAccess.AdoNet;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Repository.EntityFramework
{
    public static class EFExtensions
    {
        public static ObjectQuery<T> IncludeProperty<T>(this ObjectQuery<T> objectquery, List<string> includes)
        {
            ObjectQuery<T> query = objectquery;
            if (includes != null) includes.
                      ForEach(s =>
                      {
                          if (!string.IsNullOrEmpty(s))
                              query = query.Include(s);
                      }

                          );


            return query;
        }
        public static ObjectQuery<T> IncludeProperty<T>(this ObjectQuery<T> objectquery,
                                  params System.Linq.Expressions.Expression<Func<T, object>>[] includes)
        {
            ObjectQuery<T> query = objectquery;

            foreach (Expression<Func<T, object>> include in includes)
            {
                var expression = (MemberExpression)include.Body;
                query = query.Include(expression.Member.Name);

            }
            return query;
        }
        public static void DontUpdateProperty<T>(this DbContext context, string propertyname)
        {
            var objectContext = ((IObjectContextAdapter)context).ObjectContext;
            foreach (var entry in
                objectContext.ObjectStateManager.GetObjectStateEntries(EntityState.Modified)
                .Where(Entity => Entity.Entity.GetType() == typeof(T)))
            {
                entry.RejectPropertyChanges(propertyname);

            }
        }
        public static void DontUpdateProperties<T>(this DbContext context, params string[] properties)
        {
            var objectContext = ((IObjectContextAdapter)context).ObjectContext;
            foreach (var entry in
                objectContext.ObjectStateManager.GetObjectStateEntries(EntityState.Modified)
                .Where(Entity => Entity.Entity.GetType() == typeof(T)))
            {
                foreach (var prop in properties)
                {
                    entry.RejectPropertyChanges(prop);
                }


            }
        }

    }
}
