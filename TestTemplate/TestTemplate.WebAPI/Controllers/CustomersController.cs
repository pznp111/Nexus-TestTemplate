using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Antlr.Runtime.Misc;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    [TokenAuthorize]
    public class CustomersController : ApiController
    {
        // GET api/<controller>
        [SitemapFilter("dashboard-9")]
        public List<dynamic> Get()
        {
            var customerDashboard = new ListStack<dynamic>();

            customerDashboard.Add(new
            {
                CommentPercentage = 0,
                MeanScore = 3.55,
                NoOfComments = 4918,
                NoOfUsers = 3143,
                UserPercentage = 0
            });
            return customerDashboard;
        }

    }
}
