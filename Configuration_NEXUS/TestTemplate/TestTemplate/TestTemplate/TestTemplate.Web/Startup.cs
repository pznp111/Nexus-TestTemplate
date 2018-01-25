using System;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;

[assembly: OwinStartupAttribute(typeof(TestTemplate.Web.Startup))]
namespace TestTemplate.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Enable the application to use a cookie to store information for the signed in user
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                CookieHttpOnly = true,
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
                SlidingExpiration = true
            });
        }
    }
}
