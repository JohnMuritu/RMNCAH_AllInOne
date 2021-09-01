using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Reports
{
    public class ClinicalAggregatedSummary
    {
        public int total_anc1 { get; set; }
        public int total_anc2 { get; set; }
        public int total_anc3 { get; set; }
        public int total_anc4 { get; set; }
        public int total_anc5 { get; set; }
        public int total_edd { get; set; }
        public int total_penta1 { get; set; }
        public int total_penta2 { get; set; }
        public int total_penta3 { get; set; }
        public int total_mr1 { get; set; }
    }
}
