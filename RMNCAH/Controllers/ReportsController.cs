using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RMNCAH_api.Data;
using RMNCAH_api.Models.Client;
using RMNCAH_api.Models.Reports;
using RMNCAH_api.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDBContext _applicationDbContext;
        private readonly UserManager<User> _userManager;

        public ReportsController(ApplicationDBContext applicationDbContext, UserManager<User> userManager)
        {
            _applicationDbContext = applicationDbContext;
            _userManager = userManager;
        }

        [Authorize(Policy = Policies.Report)]
        [HttpGet("clientLongitudinalList")]
        public List<ClientDetailsAndClinicalData> getClientDetails()
        {
            using (_applicationDbContext)
            {
                string sqlQuery = "select client_clinical_details_id, chvs.chv_name, dept_client_id, full_names, " +
                    "ROUND((DATE_PART('day', CURRENT_DATE - DOB) / 365.25)::NUMERIC, 2) Age, dob, village, phone_number, " +
                    "alternative_phone_number, hf.facility_name \"hf_linked\", other_hf_attended, " +
                    "baby_name, anc1, anc2, anc3, anc4, anc5, edd, aro.option remarks_parent, del.option delivery, penta1, " +
                    "penta2, penta3, mr1, cro.option remarks_child " +
                    "from public.client_details cd " +
                    "inner join public.client_clinical_details ccd on cd.client_id = ccd.client_id " +
                    "inner join public.health_facilities hf on cd.mfl_code = hf.mfl_code " +
                    "left join public.adult_remarks_options aro on aro.id = ccd.remarks_parent " +
                    "left join public.delivery_options del on del.id = ccd.delivery " +
                    "left join public.child_remarks_options cro on cro.id = ccd.remarks_child " +
                    "left join public.chvs on chvs.chv_id = cd.chv_id";

                return _applicationDbContext.ClientDetailsAndClinicalReportData.FromSqlRaw(sqlQuery).ToList();
            }
        }

        [Authorize(Policy = Policies.Report)]
        [HttpGet("clinicalAggregatedSummary")]
        public List<ClinicalAggregatedSummary> getClinicalAggregatedSummary()
        {
            using (_applicationDbContext)
            {
                string sqlQuery = "select count(anc1) total_anc1, count(anc2) total_anc2, count(anc3) total_anc3, count(anc4) total_anc4, " +
                    "count(anc5) total_anc5, count(edd) total_edd, count(penta1) total_penta1, count(penta2) total_penta2, " +
                    "count(penta3) total_penta3, count(mr1) total_mr1 " +
                    "from public.client_details cd " +
                    "inner join public.client_clinical_details ccd on cd.client_id = ccd.client_id " +
                    "inner join public.health_facilities hf on cd.mfl_code = hf.mfl_code";

                return _applicationDbContext.ClinicalAggregatedSummary.FromSqlRaw(sqlQuery).ToList();
            }
        }

        [Authorize(Policy = Policies.Report)]
        [HttpGet("defaulters")]
        public List<Defaulters> getDefaulters()
        {
            using (_applicationDbContext)
            {
                string sqlQuery = "select distinct client_clinical_details_id, full_names, dept_client_id, hf.facility_name, edd, " +
                    "del.option delivery, delivery_date, " +
                    "case " +
                    "when edd is not null and delivery_date is not null and DATE_PART('day', edd - delivery_date) > 14 then 'Defaulter' " +
                    "when edd is not null and delivery_date is not null and DATE_PART('day', delivery_date - edd) > 14 then 'Defaulter' " +
                    "when edd is not null and delivery_date is null and DATE_PART('day', CURRENT_DATE - edd) > 14 then 'Defaulter' " +
                    "end delivery_defaulter, " +
                    "penta1, " +
                    "case " +
                    "when delivery_date is not null and penta1 is not null and DATE_PART('day', penta1 - delivery_date) > 42 then 'Defaulter' " +
                    "when delivery_date is not null and penta1 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 42 then 'Defaulter' " +
                    "end penta1_defaulter, " +
                    "penta3, " +
                    "case " +
                    "when delivery_date is not null and penta3 is not null and DATE_PART('day', penta3 - delivery_date) > 98 then 'Defaulter' " +
                    "when delivery_date is not null and penta3 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 98 then 'Defaulter' " +
                    "end penta3_defaulter, " +
                    "mr1, " +
                    "case " +
                    "when delivery_date is not null and mr1 is not null and DATE_PART('day', mr1 - delivery_date) > 274 then 'Defaulter' " +
                    "when delivery_date is not null and mr1 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 274 then 'Defaulter' " +
                    "end mr1_defaulter " +
                    "from public.client_details cd " +
                    "inner join public.client_clinical_details ccd on cd.client_id = ccd.client_id " +
                    "inner join public.health_facilities hf on cd.mfl_code = hf.mfl_code " +
                    "left join public.delivery_options del on del.id = ccd.delivery "  +
                    "where " +
                    "case " +
                    "when edd is not null and delivery_date is not null and DATE_PART('day', edd - delivery_date) > 14 then 'Defaulter' " +
                    "when edd is not null and delivery_date is not null and DATE_PART('day', delivery_date - edd) > 14 then 'Defaulter' " +
                    "when edd is not null and delivery_date is null and DATE_PART('day', CURRENT_DATE - edd) > 14 then 'Defaulter' " +
                    "end is not null " +
                    "or " +
                    "case " +
                    "when delivery_date is not null and penta1 is not null and DATE_PART('day', penta1 - delivery_date) > 42 then 'Defaulter' " +
                    "when delivery_date is not null and penta1 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 42 then 'Defaulter' " +
                    "end is not null " +
                    "or " +
                    "case " +
                    "when delivery_date is not null and penta3 is not null and DATE_PART('day', penta3 - delivery_date) > 98 then 'Defaulter' " +
                    "when delivery_date is not null and penta3 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 98 then 'Defaulter' " +
                    "end is not null " +
                    "or " +
                    "case " +
                    "when delivery_date is not null and mr1 is not null and DATE_PART('day', mr1 - delivery_date) > 274 then 'Defaulter' " +
                    "when delivery_date is not null and mr1 is null and DATE_PART('day', CURRENT_DATE - delivery_date) > 274 then 'Defaulter' " +
                    "end is not null";

                return _applicationDbContext.Defaulters.FromSqlRaw(sqlQuery).ToList();
            }
        }
    }
}
