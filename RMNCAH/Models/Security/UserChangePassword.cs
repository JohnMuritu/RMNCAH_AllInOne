using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Models.Security
{
    public class UserChangePassword
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
