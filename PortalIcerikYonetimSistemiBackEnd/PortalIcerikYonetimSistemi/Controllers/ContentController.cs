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
    public class ContentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ContentController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select caption, body, categoryId from 
                            dbo.ContentTable
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
        public JsonResult Post(Content cont)
        {
            string query = @"
                            insert into dbo.ContentTable
                            (caption, body, categoryId, Status)
                            values (@caption, @body, @categoryId, 1)
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@caption", cont.Caption);
                    myCommand.Parameters.AddWithValue("@body", cont.Body);
                    myCommand.Parameters.AddWithValue("@categoryId", cont.CategoryId);
                    myCommand.Parameters.AddWithValue("@Status", cont.Status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Eklendi.");

        }

        [HttpPut]
        public JsonResult Put(Content cont)
        {
            string query = @"
                            update dbo.ContentTable
                            set caption= @caption, body= @body
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
                    myCommand.Parameters.AddWithValue("@caption", cont.Caption);
                    myCommand.Parameters.AddWithValue("@body", cont.Body);
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
                            delete dbo.ContentTable
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
