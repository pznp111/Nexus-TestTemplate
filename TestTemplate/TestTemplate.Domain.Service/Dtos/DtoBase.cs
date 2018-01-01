using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace TestTemplate.Domain.Service.Dtos
{
    [DataContract]
    public abstract class DtoBase
    {
        [DataMember]
        public string Id { get; set; }

    }
}
