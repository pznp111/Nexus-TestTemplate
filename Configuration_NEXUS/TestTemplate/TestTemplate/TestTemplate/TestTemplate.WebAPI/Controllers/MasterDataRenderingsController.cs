using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Nexus.Net.Api;
using Nexus.Net.Models.Request;
using Nexus.Net.Models.Response;
using Nexus.Net.Security;
using System.Data;

namespace TestTemplate.WebAPI.Controllers
{
    [RoutePrefix("api/MasterDataRenderings")]
    [TokenAuthorize]
    public class MasterDataRenderingsController : ApiController
    {
        [HttpGet]
        [Route("ReadAllEntitiesByAppId")]
        public async Task<List<Entity>> ReadAllEntitiesByAppId()
        {
            return await NexusService.MasterDataRenderings.ReadAllEntitiesByAppId();
        }

        [HttpGet]
        [Route("ReadAllEntityAttrsByEntityId/{entityId}")]
        public async Task<List<EntityAttribute>> ReadAllEntityAttrsByEntityId(string entityId)
        {
            return await NexusService.MasterDataRenderings.ReadAllEntityAttrsByEntityId(entityId);
        }

        [HttpGet]
        [Route("ReadTableNameByEntityId/{entityId}")]
        public async Task<string> ReadTableNameByEntityId(string entityId)
        {
            return await NexusService.MasterDataRenderings.ReadTableNameByEntityId(entityId);
        }

        [HttpGet]
        [Route("ReadAllTableValueByTblNameColName")]
        public async Task<dynamic> ReadAllTableValueByTblNameColName([FromUri]GetTableValues getTableValues)
        {
            return await NexusService.MasterDataRenderings.ReadAllTableValueByTblNameColName(getTableValues);
        }

        [HttpPost]
        [Route("ExecuteDeleteQueryFor")]
        public async Task ExecuteDeleteQueryFor(dynamic masterDataRender)
        {
            masterDataRender.UserName = User.Identity.GetUserName();
            await NexusService.MasterDataRenderings.ExecuteDeleteQueryFor(masterDataRender);
        }

        [HttpPost]
        [Route("ExecuteInsertQueryFor")]
        public async Task ExecuteInsertQueryFor(dynamic masterDataRender)
        {
            masterDataRender.userName = User.Identity.GetUserName();
            await NexusService.MasterDataRenderings.ExecuteInsertQueryFor(masterDataRender);
        }

        [HttpPost]
        [Route("ExecuteUpdateQueryFor")]
        public async Task ExecuteUpdateQueryFor(dynamic masterDataRender)
        {
            masterDataRender.userName = User.Identity.GetUserName();
            await NexusService.MasterDataRenderings.ExecuteUpdateQueryFor(masterDataRender);
        }

        [HttpPost]
        [Route("ExecuteSelectRowCount")]
        public async Task<int> ExecuteSelectRowCount(ReadRowCountRequest request)
        {
            return await NexusService.MasterDataRenderings.ExecuteSelectRowCount(request);
        }

        [HttpPost]
        [Route("ExecuteSelectQueryPaginationFor")]
        public async Task<dynamic> ExecuteSelectQueryPaginationFor(ReadPaginationDataRequest request)
        {
            return await NexusService.MasterDataRenderings.ExecuteSelectQueryPaginationFor(request);
        }

        [HttpPost]
        [Route("ExecuteSelectFilterQueryFor")]
        public async Task<dynamic> ExecuteSelectFilterQueryFor(ReadFilterDataRequest request)
        {
            return await NexusService.MasterDataRenderings.ExecuteSelectFilterQueryFor(request);
        }
    }
}
