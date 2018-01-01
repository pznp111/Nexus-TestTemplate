using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Nexus.Infrastructure;
using Nexus.Infrastructure.TokenEncryption;
using Nexus.Net.Api;
using Nexus.Net.Extensions;
using Nexus.Net.Models.Request;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    [RoutePrefix("api/User")]
    [TokenAuthorize] // Add token authorize attribute to routes
    public class UserController : ApiController
    {

        [HttpGet]
        [Route("ReadAllUsers")]
        public async Task<List<TenantUser>> ReadAllUsers()
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.User.ReadAllUsersByTenantId(tenantId);
        }


        [HttpGet]
        [Route("ReadPageableUsers")]
        public async Task<PagedTenantUser> ReadPageableUsers()
        {
            var tenantId = User.Identity.GetTenantId();
            var query = Request.RequestUri.Query;
            return await NexusService.User.ReadPageableUsersByTenantId(tenantId, query);
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<string> ChangePassword(ChangePassword changePassword)
        {
            return await NexusService.User.ChangePassword(changePassword);
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<string> ResetPassword(ResetPassword resetPassword)
        {
            return await NexusService.User.ResetPassword(resetPassword);
        }

        [HttpGet]
        [Route("GetCurrentUserDetails")]
        public async Task<User> GetCurrentUserDetails()
        {
            return await NexusService.User.GetUserDetails(User.Identity.GetUserId().AsGuid());
        }

    }
}