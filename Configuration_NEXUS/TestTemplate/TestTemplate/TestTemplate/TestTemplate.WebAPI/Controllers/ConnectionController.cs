using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Nexus.Net.Api;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    /*
     * Add the TokenAuthorize attribute to every ApiController you want to secure
     */
    [RoutePrefix("api/Connection")]
    [TokenAuthorize]
    public class ConnectionController : ApiController
    {
        [HttpGet]
        [Route("GetConnectionCfgByTenantIdAppIdFor/{tenantId}")]
        public async Task<ConnectionResponse> GetConnectionCfgByTenantIdAppIdFor(string tenantId)
        {
            return await NexusService.Connection.GetConnectionCfgByTenantIdAppIdFor(tenantId);
        }
    }
}