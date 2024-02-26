using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PortalIcerikYonetimSistemi.Models;
using System.Data;
using System.Data.SqlClient;

namespace PortalIcerikYonetimSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select Category, description, Status, id from 
                            dbo.CategoryTable
                            where CategoryId =0 
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(Category cat)
        {
            string query = @"
                            insert into dbo.CategoryTable
                            (Category, description, categoryId)
                            values (@Category, @description, 0)
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Category", cat.category);
                    myCommand.Parameters.AddWithValue("@description", cat.Description);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eklendi.");

        }

        [HttpPut("{id}")]
        public JsonResult Put(Category cat, int id)
        {
            string query = @"
                            update dbo.CategoryTable
                            set CategoryTable.category= @Category, CategoryTable.description = @description
                            where CategoryTable.id=  @id
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCommand.Parameters.AddWithValue("@Category", cat.category);
                    myCommand.Parameters.AddWithValue("@description", cat.Description);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Güncellendi");

        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete dbo.CategoryTable
                            where id=  @id
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Silindi.");

        }
    }
}
