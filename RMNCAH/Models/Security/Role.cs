using Microsoft.AspNetCore.Identity;
using System;

namespace RMNCAH_api.Models.Security
{
    public class Role : IdentityRole<string>
    {
        public Role()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
