using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Nexus.Infrastructure;
using Nexus.Infrastructure.TokenEncryption;
using Nexus.Net.Api;
using Nexus.Net.Models.Request;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    [RoutePrefix("api/Tenant")]
    [TokenAuthorize]
    public class TenantController : ApiController
    {
        [HttpPost]
        [Route("AddRole")]
        public async Task<Role> AddRole(AddRole addRole)
        {
            addRole.TenantId = User.Identity.GetTenantId().ToString();
            return await NexusService.Tenant.AddRole(addRole);
        }

        [HttpDelete]
        [Route("DeleteRole/{roleId}")]
        public async Task<bool> DeleteRole(Guid roleId)
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.Tenant.DeleteRole(tenantId, roleId);
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<TenantUser> AddUser(AddUser addUser)
        {
            addUser.TenantId = User.Identity.GetTenantId().ToString();
            return await NexusService.Tenant.AddUser(addUser);
        }

        [HttpDelete]
        [Route("DeleteUser/{userId}")]
        public async Task<bool> DeleteUser(Guid userId)
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.Tenant.DeleteUser(tenantId, userId);
        }


        [HttpGet]
        [Route("ReadTenant")]
        public async Task<Tenant> ReadTenant()
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.Tenant.ReadTenant(tenantId);
        }


        [HttpPost]
        [Route("UpdateUser")]
        public async Task<TenantUser> UpdateUser(UpdateUser updateUser)
        {
            updateUser.TenantId = User.Identity.GetTenantId().ToString();
            return await NexusService.Tenant.UpdateUser(updateUser);
        }
    }
}