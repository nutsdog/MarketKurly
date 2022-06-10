using MarketKurly_CloneCoding.DataAccess;
using MarketKurly_CloneCoding.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace MarketKurly_CloneCoding.Controllers
{
    public class MemberController : Controller
    {
        private ApplicationDbContext _db;

        public MemberController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult ConfirmId(string id)
        {
            var isFind = _db.Members.FirstOrDefault(d => d.Id.Equals(id)) is null;
            
            return Ok(isFind);
        }

        [HttpGet]
        [Route("/[Controller]/isemail")]
        public IActionResult ConfirmEmail([FromQuery] string email)
        {
            var isEmail = _db.Members.FirstOrDefault(d => d.Email.Equals(email)) is null;
            
            return Ok(isEmail);
        }

        [HttpGet]
        public IActionResult Join()
        {
            return View();
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Join(Member model, string birthDay, IFormCollection forms)
        {
            if(!ModelState.IsValid)
            {
                return View();
            }

            using var sha512 = SHA512.Create();
            var passwordBytes = Encoding.Default.GetBytes(model.Password);
            var passwordHash = sha512.ComputeHash(passwordBytes);
            var hash = BitConverter.ToString(passwordHash).Replace("-", string.Empty);
            
            model.Password = hash;

            await _db.AddAsync(model);
            await _db.SaveChangesAsync();

            return RedirectToAction(nameof(Login));
        }

        public IActionResult Login()
        {
            return View();
        }
    }
}
