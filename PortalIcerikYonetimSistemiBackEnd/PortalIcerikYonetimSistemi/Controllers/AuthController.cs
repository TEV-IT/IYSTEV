using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PortalIcerikYonetimSistemi.Models;
using System.Data.SqlClient;

namespace PortalIcerikYonetimSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Login(User user)
        {
            string connectionString = _configuration.GetConnectionString("PortalIcerikYonetim");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM UsersTable WHERE Username=@Username AND Password=@Password"; 
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Password", user.Password);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return Ok(new { Message = "Giriş başarılı" });
                        }
                        else
                        {
                            return Unauthorized();
                        }
                    }
                }
            }
        }

    }
}
