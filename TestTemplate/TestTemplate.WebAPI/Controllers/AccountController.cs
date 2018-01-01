using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Nexus.Infrastructure.TokenEncryption;
using Nexus.Net.Api;
using Nexus.Net.Extensions;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    /*
     * Add the TokenAuthorize attribute to every ApiController you want to secure
     */
    [TokenAuthorize]
    public class AccountController : ApiController
    {
        // GET api/<controller>
        /*
         * User will be able to access this endpoint if they have the sitemap privileges
         * eg. 
         * - [SitemapFilter("dashboard-1","dashboard-3")]
         *      should have "dashboard-1" OR "dashboard-3"
         *      
         * - [SiteMapFilter("dashboard-1")]
         *   [SiteMapFilter("dashboard-3")]
         *      should have "dashboard-1" AND "dashboard-3" in order
         */
        [SitemapFilter("dashboard-1")]
        public async Task<Tenant> Get()
        {
            /*
             * Get TenantId of current logged in user. You can also get the following
             * - GetRoles(), GetSitemaps(), GetUserId(), GetUserName(), GetTenantId()
             */
            var tenantId = User.Identity.GetTenantId();

            /*
             * You can access all Nexus endpoints using the NexusService class
             */
            return await NexusService.Tenant.ReadTenant(tenantId);
        }
    }
}