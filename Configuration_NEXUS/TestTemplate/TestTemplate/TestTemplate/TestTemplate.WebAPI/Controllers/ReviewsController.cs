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
    public class ReviewsController : ApiController
    {
        // GET api/<controller>
        [SitemapFilter("reviews-10")]
        public List<dynamic> Get()
        {
            List<dynamic> reviews = new ListStack<dynamic>();

            reviews.Add(new
            {
                CustomerId = 1021,
                Product = "WOODSCENTZ",
                ReviewText = "Brut is a classic mens scent.",
                Score = 4
            });

            reviews.Add(new
            {
                CustomerId = 1022,
                Product = "WOODSCENTZ",
                ReviewText = "I dont dislike this scent by any means - its perfectly nice.",
                Score = 5
            });

            return reviews;
        }
    }
}