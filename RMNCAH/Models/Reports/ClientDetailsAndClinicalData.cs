using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Reports
{
    public class ClientDetailsAndClinicalData
    {
        [Key]
        public Guid ClientClinicalDetailsId { get; set; }
        public string chvName { get; set; }
        public string deptClientId { get; set; }
        public string FullNames { get; set; }
        public double Age { get; set; }
        public string Village { get; set; }
        public string PhoneNumber { get; set; }
        public string AlternativePhoneNumber { get; set; }
        public string HFLinked { get; set; }
        public string OtherHFAttended { get; set; }
        public string BabyName { get; set; }
        public DateTime? anc1 { get; set; }
        public DateTime? anc2 { get; set; }
        public DateTime? anc3 { get; set; }
        public DateTime? anc4 { get; set; }
        public DateTime? anc5 { get; set; }
        public DateTime? edd { get; set; }
        public string remarks_parent { get; set; }
        public string delivery { get; set; }
        public DateTime? penta1 { get; set; }
        public DateTime? penta2 { get; set; }
        public DateTime? penta3 { get; set; }
        public DateTime? mr1 { get; set; }
        public string remarks_child { get; set; }
    }
}
