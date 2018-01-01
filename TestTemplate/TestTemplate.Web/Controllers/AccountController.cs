using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Nexus.Net.Extensions;
using TestTemplate.Web.Models;

namespace TestTemplate.Web.Controllers
{
    public class AccountController : Controller
    {
        /*
         * Private property for getting the IAuthenticationManager from Owin
         * This will be used for Login and LogOff
         */
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var authenticated = await AuthenticationManager.NexusSignIn(HttpContext, model.UserName, model.Password);
                if (authenticated)
                {
                    // do stuff here
                    return RedirectToAction("index", "Home");
                }
            }
            return View();
        }
        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Login");
        }
    }
}