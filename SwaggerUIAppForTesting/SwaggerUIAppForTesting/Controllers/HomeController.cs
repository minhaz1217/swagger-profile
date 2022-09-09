using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwaggerUIAppForTesting;
using System.Net;
using System.Net.Sockets;

namespace simple_dotnet_app.Controllers
{
    [Route("/")]
    [ApiController]
    [CustomAuthenticationFilter]
    [Authorize]
    public class HomeController : ControllerBase
    {

        private static int livenessHitCount = 0;
        private static int HitCount = 0;

        [HttpGet]
        public IActionResult Get()
        {
            //return Ok(.Select(x=>x.Address.ToString()).ToList());
            return Ok(Dns.GetHostName() + "\n");

        }

        [HttpGet("get-ip")]
        public IActionResult GetIP()
        {
            var address = Dns.GetHostAddresses(
                Dns.GetHostName())
                .FirstOrDefault(ha => ha.AddressFamily == AddressFamily.InterNetwork)?
                .ToString();
            return Ok(address);
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok("healthy");
        }

        [HttpGet("hit")]
        public IActionResult Hit()
        {
            HitCount++;
            return Ok(HitCount);
        }

        [HttpGet("reset-hit-count")]
        public IActionResult ResetHitCount()
        {
            HitCount = 0;
            return Ok(HitCount);
        }

        [HttpGet("liveness")]
        public IActionResult Liveness()
        {
            livenessHitCount++;
            if (livenessHitCount >= 5)
            {
                return StatusCode(500);
            }
            return Ok("live");
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok("ok");
        }
    }
}
