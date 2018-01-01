using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nexus.Infrastructure.Querying;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Reflection;
using System.Linq.Expressions;
using TestTemplate.Repository.EntityFramework;
using System.Data;
using System.Data.Entity;
using Nexus.Infrastructure.DbAccess.AdoNet;

namespace TestTemplate.Repository.EntityFramework.QueryTranslator
{
    public abstract class QueryTranslator
    {
        protected string sqlQuery;
        protected string EntityName;

        public QueryTranslator() :
            this("", "")
        { }

        public QueryTranslator(string sqlquery, string Entityname)
        {

            sqlQuery = sqlquery;
            EntityName = Entityname;

        }
        public IEnumerable<T> Translate<T>(Query query, ObjectContext context,
                     params System.Linq.Expressions.Expression<Func<T, object>>[] navigationproperties)
        {
            ObjectQuery<T> objectQuery = null;

            if (query.IsNamedQuery())
            {
                return FindNamedQueryFor<T>(query, context);
            }
            else
            {

                /*Variables*/
                var queryBuilder = new StringBuilder();
                var sbQuery = new StringBuilder();
                List<ObjectParameter> paraColl = new List<ObjectParameter>();

                /*Query Generator*/
                CreateQueryAndObjectParameters(query, queryBuilder, paraColl);


                string criteia = queryBuilder.ToString();
                sbQuery.Append(sqlQuery + " WHERE " + criteia.ToString());

                if (query.OrderByProperty != null)
                    sbQuery.Append(GenerateOrderByClauseFrom(query.OrderByProperty));
                if (query.IsPaging)
                    sbQuery.Append(" SKIP @Skip LIMIT @Limit");

                context.Connection.Open();

                /*Include Properties*/
                ObjectQuery<T> objQuery = new ObjectQuery<T>(sbQuery.ToString(), context)
                                              .IncludeProperty(navigationproperties);
                /*Object Parameters*/
                paraColl.ForEach(s => objQuery.Parameters.Add(s));

                /*Paging*/
                if (query.IsPaging)
                {
                    objQuery.Parameters.Add(new ObjectParameter("Skip", query.PageIndex * query.PageSize));
                    objQuery.Parameters.Add(new ObjectParameter("Limit", query.PageSize));
                }

                objectQuery = objQuery;

            }
            try
            {
                return objectQuery.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public DataTable Translate(Query query, Db db)
        {
            return db.GetDataTable(query.Name, CreateParameters(query));

        }
        #region "abstract methods"



        protected abstract string FindTableColumnFor(string propertyname);
        protected abstract string FindNavigationNameFor(string propertyname);

        #endregion "end abstract methods"

        #region "private methods"
        private IEnumerable<T> FindNamedQueryFor<T>(Query query, ObjectContext context)
        {
            return context.ExecuteStoreQuery<T>(query.Name, CreateSqlParameters(query).ToArray());
        }
        private string FindPropertyName(string propertyname)
        {

            if (propertyname.IndexOf(".") > 0)
            {
                return FindNavigationNameFor(propertyname);
            }
            else
            {
                return FindTableColumnFor(propertyname);
            }

        }

        private void CreateQueryAndObjectParameters(Query query, StringBuilder querybuilder, IList<ObjectParameter> paracoll)
        {

            bool isFirstCriteria = true;
            string propertyName = String.Empty;

            foreach (Criterion criterion in query.Criteria)
            {
                if (!isFirstCriteria) querybuilder.Append(" " + query.QueryOperator.ToString() + " ");

                isFirstCriteria = false;
                propertyName = FindPropertyName(criterion.PropertyName);
                CreateQueryBuilder(querybuilder, propertyName, criterion);
                paracoll.Add(new ObjectParameter(propertyName.Replace(".", ""), criterion.Value));
            }


        }

        private void CreateQueryAndSqlParameters(Query query, StringBuilder querybuilder, IList<SqlParameter> paracoll)
        {

            bool isFirstCriteria = true;
            string propertyName = String.Empty;

            foreach (Criterion criterion in query.Criteria)
            {

                if (!isFirstCriteria) querybuilder.Append(" " + query.QueryOperator.ToString() + " ");


                isFirstCriteria = false;
                propertyName = FindPropertyName(criterion.PropertyName);
                CreateQueryBuilder(querybuilder, propertyName, criterion);
                paracoll.Add(new SqlParameter(criterion.PropertyName, criterion.Value));
            }

        }
        private List<SqlParameter> CreateSqlParameters(Query query)
        {
            if (query.Criteria.Count() == 0) return null;

            List<SqlParameter> paracoll = new List<SqlParameter>();
            foreach (Criterion criterion in query.Criteria)
            {
                paracoll.Add(new SqlParameter(criterion.PropertyName, criterion.Value));
            }
            return paracoll;

        }
        private Object[] CreateParameters(Query query)
        {
            if (query.Criteria.Count() == 0) return null;

            List<object> paracoll = new List<object>();
            foreach (Criterion criterion in query.Criteria)
            {
                paracoll.Add(criterion.PropertyName);
                paracoll.Add(criterion.Value);
            }
            return paracoll.ToArray();

        }
        private void CreateQueryBuilder(StringBuilder querybuilder, string propertyName, Criterion criterion)
        {


            switch (criterion.criteriaOperator)
            {
                case CriteriaOperator.Equal:
                    querybuilder.Append(String.Format("{0} = @{1}", propertyName, propertyName.Replace(".", "")));
                    break;
                case CriteriaOperator.LessThanOrEqual:
                    querybuilder.Append(String.Format("{0} <= @{1}", propertyName, propertyName.Replace(".", "")));
                    break;
                case CriteriaOperator.LessThan:
                    querybuilder.Append(String.Format("{0} < @{1}", propertyName, propertyName.Replace(".", "")));
                    break;
                case CriteriaOperator.GreaterThanOrEqual:
                    querybuilder.Append(String.Format("{0} >= @{1}", propertyName, propertyName.Replace(".", "")));
                    break;
                case CriteriaOperator.GreaterThan:
                    querybuilder.Append(String.Format("{0} > @{1}", propertyName, propertyName.Replace(".", "")));
                    break;
                case CriteriaOperator.Contains:
                    querybuilder.Append(String.Format("{0} LIKE '%'+ @{1} +'%'", propertyName, propertyName.Replace(".", "")));
                    break;
                default:
                    throw new ApplicationException("No operator defined");
            }
        }

        private string GenerateOrderByClauseFrom(OrderByClause orderByClause)
        {
            return String.Format(" ORDER BY {0} {1}",
                FindPropertyName(orderByClause.PropertyName), orderByClause.Desc ? "DESC" : "ASC");
        }

        #endregion "end private methods"


    }
}
