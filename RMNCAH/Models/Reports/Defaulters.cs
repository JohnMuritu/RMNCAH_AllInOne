using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Reports
{
    public class Defaulters
    {
        [Key]
        public Guid ClientClinicalDetailsId { get; set; }
        public string full_names { get; set; }
        public string dept_client_id { get; set; }
        public string facility_name { get; set; }
        public DateTime? edd { get; set; }
        public string delivery { get; set; }
        public DateTime? delivery_date { get; set; }
        public string delivery_defaulter { get; set; }
        public DateTime? penta1 { get; set; }
        public string penta1_defaulter { get; set; }
        public DateTime? penta3 { get; set; }
        public string penta3_defaulter { get; set; }
        public DateTime? mr1 { get; set; }
        public string mr1_defaulter { get; set; }
    }
}
