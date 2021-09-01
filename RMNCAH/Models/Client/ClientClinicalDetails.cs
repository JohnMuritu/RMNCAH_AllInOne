using RMNCAH_api.Models.Security;
using RMNCAH_api.Models.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Client
{
    public class ClientClinicalDetails
    {
        public ClientClinicalDetails()
        {
            ClientClinicalDetailsId = Guid.NewGuid();
        }

        [Key]
        public Guid ClientClinicalDetailsId { get; set; }
        public Guid ClientId { get; set; }
        public string BabyName { get; set; }
        public DateTime? anc1 { get; set; }
        public DateTime? anc2 { get; set; }
        public DateTime? anc3 { get; set; }
        public DateTime? anc4 { get; set; }
        public DateTime? anc5 { get; set; }
        public DateTime? edd { get; set; }
        public int? remarksParent { get; set; }
        [ForeignKey("remarksParent")]
        public AdultRemarksOptions AdultRemarksOptions { get; set; }
        public DateTime? remarksParentDate { get; set; }
        public int? delivery { get; set; }
        [ForeignKey("delivery")]
        public DeliveryOptions deliveryOptions { get; set; }
        public DateTime? deliveryDate { get; set; }
        public DateTime? penta1 { get; set; }
        public DateTime? penta2 { get; set; }
        public DateTime? penta3 { get; set; }
        public DateTime? mr1 { get; set; }
        public int? remarksChild { get; set; }
        [ForeignKey("remarksChild")]
        public ChildRemarksOptions ChildRemarksOptions { get; set; }
        public DateTime? remarksChildDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
