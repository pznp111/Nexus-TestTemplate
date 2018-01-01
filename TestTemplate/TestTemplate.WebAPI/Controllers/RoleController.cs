using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Nexus.Infrastructure.TokenEncryption;
using Nexus.Net.Api;
using Nexus.Net.Extensions;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    [RoutePrefix("api/Role")]
    [TokenAuthorize]
    public class RoleController : ApiController
    {
        [HttpGet]
        [Route("ReadAllRoles")]
        public async Task<List<TenantRole>> ReadAllRoles()
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.Role.ReadAllRolesByTenantId(tenantId);
        }

        [HttpPost]
        [Route("UpdateRole")]
        public async Task<Role> UpdateRole(Role role)
        {
            return await NexusService.Role.UpdateRole(role);
        }
    }
}