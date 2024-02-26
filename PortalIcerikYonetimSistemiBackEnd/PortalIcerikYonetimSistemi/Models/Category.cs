namespace PortalIcerikYonetimSistemi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string category { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public byte Status { get; set; }
        public string categoryUrl { get; set; }
    }
}
