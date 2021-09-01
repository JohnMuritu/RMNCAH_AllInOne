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
    public class UtilsController : ControllerBase
    {
        private readonly ApplicationDBContext _applicationDbContext;

        public UtilsController(ApplicationDBContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet("deliveryoptions")]
        public List<DeliveryOptions> getDeliveryOptions()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.DeliveryOptions.ToList();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet("adultremarks")]
        public List<AdultRemarksOptions> getAdultRemarksOptions()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.AdultRemarksOptions.ToList();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet("childremarks")]
        public List<ChildRemarksOptions> getChildRemarksOptions()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.ChildRemarksOptions.ToList();
            }
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpGet("chvs")]
        public List<Chvs> getChvs()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.Chvs.ToList();
            }
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpPost("AddChvs")]
        public Chvs AddClientDetails(Chvs cd)
        {
            using (_applicationDbContext)
            {
                _applicationDbContext.Chvs.Add(cd);
                _applicationDbContext.SaveChanges();
                return _applicationDbContext.Chvs.Where(_r => _r.chv_id == cd.chv_id).FirstOrDefault();
            }
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpPost("UpdateChvs")]
        public Chvs UpdateClientDetails(Chvs cd)
        {
            using (_applicationDbContext)
            {
                Chvs details = _applicationDbContext.Chvs
                    .Where(r => r.chv_id == cd.chv_id)
                    .FirstOrDefault();
                details.chv_name = cd.chv_name;
                details.active = cd.active;

                _applicationDbContext.SaveChanges();
                return _applicationDbContext.Chvs.Where(_r => _r.chv_id == cd.chv_id).FirstOrDefault();
            }
        }
    }
}
