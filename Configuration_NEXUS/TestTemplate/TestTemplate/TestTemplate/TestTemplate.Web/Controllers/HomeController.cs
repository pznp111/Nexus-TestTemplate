using Microsoft.AspNet.Identity;
using Nexus.Net.Extensions;
using Nexus.Net.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestTemplate.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        [ChildActionOnly]
        public ActionResult MainMenu()
        {
            // Get Sitemap details of current user logged in
            var mainMenu = User.Identity.GetSitemap().Where(s => s.SiteMapParentId == "00000000-0000-0000-0000-000000000000" && s.ShowInMenu).ToList();
            return PartialView(mainMenu);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}