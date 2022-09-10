using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwaggerUIAppForTesting.Auth.Models;
using System.ComponentModel.DataAnnotations;

namespace SwaggerUIAppForTesting.Auth
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtSettings jwtSettings;
        public AuthController(JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
        }

        [HttpPost]
        public IActionResult GetToken(UserLogins userLogins)
        {
            try
            {
                var Token = new UserTokens();
                var Valid = logins.Any(x => x.UserName.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                if (Valid)
                {
                    var user = logins.FirstOrDefault(x => x.UserName.Equals(userLogins.UserName, StringComparison.OrdinalIgnoreCase));
                    Token = JwtHelpers.GenenrateTokenkey(new UserTokens()
                    {
                        EmailId = user.EmailId,
                        GuidId = Guid.NewGuid(),
                        UserName = user.UserName,
                        Id = user.Id,
                    }, jwtSettings);
                }
                else
                {
                    return BadRequest($"wrong password");
                }
                return Ok(Token);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        /// <summary>
        /// Get List of UserAccounts
        /// </summary>
        /// <returns>List Of UserAccounts</returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetList()
        {
            return Ok(logins);
        }


        private IEnumerable<Users> logins = new List<Users>() {
            new Users() {
                    Id = Guid.NewGuid(),
                    EmailId = "adminakp@gmail.com",
                    UserName = "Admin",
                    Password = "Admin",
                },
                new Users() {
                    Id = Guid.NewGuid(),
                    EmailId = "adminakp@gmail.com",
                    UserName = "User",
                    Password = "Admin",
                }
        };
        public class UserLogins
        {
            [Required]
            public string UserName { get; set; }
            [Required]
            public string Password { get; set; }
            public UserLogins() { }
        }
        public class Users
        {
            public string UserName { get; set; }
            public Guid Id { get; set; }
            public string EmailId { get; set; }
            public string Password { get; set; }
        }
    }
}