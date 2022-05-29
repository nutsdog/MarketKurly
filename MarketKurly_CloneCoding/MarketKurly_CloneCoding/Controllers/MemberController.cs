using Microsoft.AspNetCore.Mvc;

namespace MarketKurly_CloneCoding.Controllers
{
    public class MemberController : Controller
    {
        public IActionResult Join()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }
    }
}
