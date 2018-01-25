using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Nexus.Net.Api;
using System.Web.Helpers;
using System.Security.Claims;

namespace TestTemplate.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Initialize Nexus.Net SDK
            ApplicationContext.InitializeToken();

            // Need to set this in order for ValidateAntiForgeryToken to work properly
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
        }
    }
}
