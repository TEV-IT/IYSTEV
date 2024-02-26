using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PortalIcerikYonetimSistemi.Models;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PortalIcerikYonetimSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaFilesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public MediaFilesController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        /*
        [Route("SaveFile")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public JsonResult SaveFile([FromForm] IFormFile file, [FromForm] MediaFiles media)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    string filename = file.FileName;
                    var physicalPath = _env.ContentRootPath + "/Media/" + filename;

                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    string connectionString = _configuration.GetConnectionString("PortalIcerikYonetim");

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();

                        string query = "INSERT INTO MediaFilesTable (fileName, fileType, contentId, description, filePath, [file]) VALUES (@fileName, @fileType, @contentId, @description, @filePath, CONVERT(varbinary(max), @file))";

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@FileName", filename);
                            command.Parameters.AddWithValue("@filePath", physicalPath);
                            command.Parameters.AddWithValue("@file", file.FileName);
                            command.Parameters.AddWithValue("@contentId", 1);
                            command.Parameters.AddWithValue("@description", media.Description);
                            command.Parameters.AddWithValue("@fileType", media.FileType);
                            command.ExecuteNonQuery();
                        }

                        connection.Close();
                    }

                    return new JsonResult(filename);
                }
                else
                {
                    return new JsonResult("Hata: Dosya boş veya hatalı.");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Hata: " + ex.Message);
            }
        }
        */


        [HttpGet("GetPdf/{contentId}")]
        public JsonResult GetPdf(int contentId)
        {
            string query = @"
                    SELECT  TOP 1 filePath
                    FROM dbo.MediaFilesTable
                    WHERE contentId = @ContentId
                    ORDER BY createDateTime DESC";
                    

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ContentId", contentId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [Route("SaveFile")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public JsonResult SaveFile([FromForm] IFormFile file, [FromForm] MediaFiles media)
        {
            try
            {
                if (file != null && file.Length > 0)
                {
                    string filename = file.FileName;

                    string destinationDirectory = @"\\tevsrvweb\c$\inetpub\wwwroot\ASPNETCOREApplication\ClientApp\build\IYS_Media\";

                var physicalPath = Path.Combine(destinationDirectory, filename);

                    string path = Path.Combine("https://portal.tev.org.tr/IYS_Media/", filename);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    string connectionString = _configuration.GetConnectionString("PortalIcerikYonetim");

                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        connection.Open();

                        string query = "INSERT INTO MediaFilesTable (fileName, fileType, contentId, description, filePath, [file]) VALUES (@fileName, @fileType, @contentId, @description, @filePath, CONVERT(varbinary(max), @file))";

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@FileName", filename);
                            command.Parameters.AddWithValue("@filePath", path);
                            command.Parameters.AddWithValue("@file", file.FileName);
                            command.Parameters.AddWithValue("@contentId", media.ContentId);
                            command.Parameters.AddWithValue("@description", media.Description);
                            command.Parameters.AddWithValue("@fileType", media.FileType);
                            command.ExecuteNonQuery();
                        }

                        connection.Close();
                    }

                    return new JsonResult(filename);
                }
                else
                {
                    return new JsonResult("Hata: Dosya boş veya hatalı.");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Hata: " + ex.Message);
            }
        }

       
        }

    }




