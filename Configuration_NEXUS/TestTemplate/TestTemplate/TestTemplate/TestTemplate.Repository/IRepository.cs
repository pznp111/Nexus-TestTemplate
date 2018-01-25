using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nexus.Infrastructure.Querying;
namespace TestTemplate.Repository
{
    public interface IRepository<T> where T : class
    {
        void Add(T Entity);
        void Save(T Entity);
        void Delete(T Entity);

        T FindBy(int id);
        IEnumerable<T> FindBy(Query query);
        IEnumerable<T> FindAll();

        int GetAllCount();
        int GetCountBy(Query query);
    }
}
