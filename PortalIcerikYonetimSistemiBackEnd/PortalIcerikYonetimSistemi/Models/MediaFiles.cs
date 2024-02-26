namespace PortalIcerikYonetimSistemi.Models
{
    public class MediaFiles
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string Description { get; set; }
        public string filePath { get; set; }
        public int ContentId { get; set; }
        public byte Status { get; set; }

        public byte[] file { get; set; }

    }
}
