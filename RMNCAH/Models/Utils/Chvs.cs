using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Utils
{
    public class Chvs
    {
        [Key]
        public int chv_id { get; set; }
        public string chv_name { get; set; }
        public string active { get; set; }
    }
}
