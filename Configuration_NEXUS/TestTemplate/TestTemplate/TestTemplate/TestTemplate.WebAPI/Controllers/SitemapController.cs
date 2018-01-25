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
    [RoutePrefix("api/SiteMap")]
    [TokenAuthorize]
    public class SitemapController : ApiController
    {
        [HttpGet]
        [Route("ReadAllSiteMaps")]
        public async Task<List<Sitemap>> ReadAllSiteMaps()
        {
            var tenantId = User.Identity.GetTenantId();
            return await NexusService.Sitemap.ReadAllSiteMapsByTenantId(tenantId);
        }

        [HttpPost]
        [Route("AddSiteMapRole")]
        public async Task<List<Sitemap>> AddSitemapRole(List<AddSitemapRole> addSitemapRole)
        {
            return await NexusService.Sitemap.AddSitemapRole(addSitemapRole);
        }

        [HttpPost]
        [Route("DeleteSiteMapRole")]
        public async Task<bool> AddSitemapRole(DeleteSitemapRole deleteSitemapRole)
        {
            return await NexusService.Sitemap.DeleteSitemapRole(deleteSitemapRole);
        }
    }
}