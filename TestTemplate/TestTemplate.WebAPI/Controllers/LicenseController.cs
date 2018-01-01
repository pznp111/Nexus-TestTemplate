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
using Nexus.Net.Models.Response;
using Nexus.Net.Security;

namespace TestTemplate.WebAPI.Controllers
{
    [RoutePrefix("api/License")]
    [TokenAuthorize]
    public class LicenseController : ApiController
    {
        [HttpGet]
        [Route("CheckAllLicenseCount")]
        public async Task<License> CheckAllLicenseCount()
        {
            var tenantId = User.Identity.GetTenantId().AsGuid();
            return await NexusService.License.CheckAllLicenseCountByTenantId(tenantId);
        }
    }
}