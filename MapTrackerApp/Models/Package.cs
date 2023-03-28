using System;
using System.Collections.Generic;

namespace MapTrackerApp.Models
{
    public partial class Package
    {
        public int DeliveryId { get; set; }
        public string? Product { get; set; }
        public string? ProductType { get; set; }
        public string? Size { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? StreetName { get; set; }
        public int? StreetNumber { get; set; }
        public string? Zip { get; set; }
        public string? City { get; set; }
    }
}
