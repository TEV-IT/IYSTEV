namespace PortalIcerikYonetimSistemi.Models
{
    public class Content
    {
        public int Id { get; set; }
        public string Caption { get; set; }
        public string Body { get; set; }

        public int CategoryId { get; set; }

        public byte Status { get; set; }


    }
}
