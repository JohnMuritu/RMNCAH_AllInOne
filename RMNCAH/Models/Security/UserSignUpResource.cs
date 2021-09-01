using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Security
{
    public class UserSignUpResource
    {
        [Key]
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserRole { get; set; }
        //public string OrgUnitLevel { get; set; }
        //public string Province { get; set; }
        //public string District { get; set; }
        //public string SubDistrict { get; set; }
        //public string Facility { get; set; }
        //public bool ChangePwdOnLogin { get; set; }
        //public string UserRole { get; set; }
        //public string[] UserAssignedReports { get; set; }
        //public int LDAPUser { get; set; }
    }
}
