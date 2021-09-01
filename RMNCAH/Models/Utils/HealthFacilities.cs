using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Utils
{
    public class HealthFacilities
    {
        [Key]
        public int MFLCode { get; set; }
        public string FacilityName { get; set; }
    }
}
