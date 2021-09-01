using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RMNCAH_api.Data;
using RMNCAH_api.Models.Security;
using RMNCAH_api.Models.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthFacilityController : ControllerBase
    {
        private readonly ApplicationDBContext _applicationDbContext;

        public HealthFacilityController(ApplicationDBContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet]
        public List<HealthFacilities> getHealthFacilities()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.HealthFacility.OrderBy(c => c.FacilityName).ToList();
            }
        }
    }
}
