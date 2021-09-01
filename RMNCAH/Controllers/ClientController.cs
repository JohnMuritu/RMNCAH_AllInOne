using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RMNCAH_api.Data;
using RMNCAH_api.Models.Client;
using RMNCAH_api.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace RMNCAH_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDBContext _applicationDbContext;
        private readonly UserManager<User> _userManager;

        public ClientController(ApplicationDBContext applicationDbContext, UserManager<User> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet("ClientDetails")]
        public List<ClientDetails> getClientDetails()
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.ClientDetails
                    .Include(c => c.chv)
                    .Include(h => h.HFLinked)
                    .OrderBy(c => c.FullNames).ToList();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpPost("AddClientDetails")]
        public ClientDetails AddClientDetails(ClientDetails cd)
        {
            using (_applicationDbContext)
            {
                cd.CreatedBy = User.FindFirst(ClaimTypes.NameIdentifier).Value; // _userManager.GetUserId(User);
                cd.CreatedDate = DateTime.Now;

                _applicationDbContext.Chvs.Attach(cd.chv);
                _applicationDbContext.HealthFacility.Attach(cd.HFLinked);
                _applicationDbContext.ClientDetails.Add(cd);
                _applicationDbContext.SaveChanges();
                return _applicationDbContext.ClientDetails.Where(_r => _r.ClientId == cd.ClientId).FirstOrDefault();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpPost("UpdateClientDetails")]
        public ClientDetails UpdateClientDetails(ClientDetails cd)
        {
            using (_applicationDbContext)
            {
                ClientDetails details = _applicationDbContext.ClientDetails
                    .Where(r => r.ClientId == cd.ClientId)
                    .FirstOrDefault();
                details.chv_id = cd.chv_id;
                details.deptClientId = cd.deptClientId;
                details.FullNames = cd.FullNames;
                details.DOB = cd.DOB;
                details.Village = cd.Village;
                details.PhoneNumber = cd.PhoneNumber;
                details.AlternativePhoneNumber = cd.AlternativePhoneNumber;
                //details.HFLinked = cd.HFLinked;
                details.mfl_code = cd.mfl_code;
                details.OtherHFAttended = cd.OtherHFAttended;
                details.HIVStatusKnown = cd.HIVStatusKnown;
                details.testDone = cd.testDone;
                details.UpdatedBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                details.UpdatedDate = DateTime.Now;

                _applicationDbContext.SaveChanges();
                return _applicationDbContext.ClientDetails.Where(_r => _r.ClientId == cd.ClientId).FirstOrDefault();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpGet("ClientClinicalDetails/{clientId}")]
        public List<ClientClinicalDetails> getClientClinicaltDetails(Guid clientId)
        {
            using (_applicationDbContext)
            {
                return _applicationDbContext.ClientClinicalDetails
                    .Include(h => h.AdultRemarksOptions)
                    .Include(h => h.deliveryOptions)
                    .Include(h => h.ChildRemarksOptions)
                    .Where(a => a.ClientId == clientId).ToList();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpPost("AddClientClinicalDetails")]
        public ClientClinicalDetails AddClientClinicalDetails(ClientClinicalDetails cd)
        {
            using (_applicationDbContext)
            {
                cd.CreatedBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                cd.CreatedDate = DateTime.Now;

                if (cd.remarksChild == 0)
                    cd.remarksChild = null;
                if (cd.remarksParent == 0)
                    cd.remarksParent = null;
                if (cd.delivery == 0)
                    cd.delivery = null;

                _applicationDbContext.ClientClinicalDetails.Add(cd);
                _applicationDbContext.SaveChanges();
                return _applicationDbContext.ClientClinicalDetails.Where(_r => _r.ClientClinicalDetailsId == cd.ClientClinicalDetailsId).FirstOrDefault();
            }
        }

        [Authorize(Policy = Policies.User)]
        [HttpPost("UpdateClientClinicalDetails")]
        public ClientClinicalDetails UpdateClientClinicalDetails(ClientClinicalDetails cd)
        {
            using (_applicationDbContext)
            {
                ClientClinicalDetails details = _applicationDbContext.ClientClinicalDetails
                    .Where(r => r.ClientClinicalDetailsId == cd.ClientClinicalDetailsId)
                    .FirstOrDefault();
                details.BabyName = cd.BabyName;
                details.anc1 = cd.anc1;
                details.anc2 = cd.anc2;
                details.anc3 = cd.anc3;
                details.anc4 = cd.anc4;
                details.anc5 = cd.anc5;
                details.edd = cd.edd;
                details.remarksParent = cd.remarksParent == 0 ? null : cd.remarksParent;
                details.remarksParentDate = cd.remarksParentDate;
                details.delivery = cd.delivery == 0 ? null : cd.delivery;
                details.deliveryDate = cd.deliveryDate;
                details.penta1 = cd.penta1;
                details.penta2 = cd.penta2;
                details.penta3 = cd.penta3;
                details.mr1 = cd.mr1;
                details.remarksChild = cd.remarksChild == 0 ? null : cd.remarksChild;
                details.remarksChildDate = cd.remarksChildDate;
                details.UpdatedBy = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                details.UpdatedDate = DateTime.Now;

                _applicationDbContext.SaveChanges();
                return _applicationDbContext.ClientClinicalDetails.Where(_r => _r.ClientClinicalDetailsId == cd.ClientClinicalDetailsId).FirstOrDefault();
            }
        }
    }
}
