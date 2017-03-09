using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShenZhenGrainWeb3._0.Controllers
{
    public class GrainController : Controller
    {
        // GET: Grain
        public ActionResult Index()
        {
            return View("grainIndex");
        }
        public ActionResult confirmLogin()
        {
            string userName = Request.Form["userName"];
            string userPassword = Request.Form["userPassword"];
            if (userName == "admin" && userPassword == "admin")
            {
                return View("grainIndex");
            }
            else
            {
                ViewBag.Message = "账号或密码错误";
                Response.Write("<script>alert('账号或密码错误')</script>");
                return View("Login");
            }

        }
    }
}