using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RMNCAH_api.Models.Client;
using RMNCAH_api.Models.Reports;
using RMNCAH_api.Models.Security;
using RMNCAH_api.Models.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMNCAH_api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User, Role, string, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }
        public ApplicationDBContext() { }

        public virtual DbSet<ClientDetails> ClientDetails { get; set; }
        public virtual DbSet<ClientClinicalDetails> ClientClinicalDetails { get; set; }
        public virtual DbSet<HealthFacilities> HealthFacility { get; set; }
        public virtual DbSet<ClientDetailsAndClinicalData> ClientDetailsAndClinicalReportData { get; set; }
        public virtual DbSet<ClinicalAggregatedSummary> ClinicalAggregatedSummary { get; set; }
        public virtual DbSet<DeliveryOptions> DeliveryOptions { get; set; }
        public virtual DbSet<AdultRemarksOptions> AdultRemarksOptions { get; set; }
        public virtual DbSet<ChildRemarksOptions> ChildRemarksOptions { get; set; }
        public virtual DbSet<UserSignUpResource> UserSignUpResource { get; set; }
        public virtual DbSet<Chvs> Chvs { get; set; }
        public virtual DbSet<Defaulters> Defaulters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseSnakeCaseNamingConvention();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Role>().ToTable("roles");
            builder.Entity<User>().ToTable("users");
            builder.Entity<UserClaim>().ToTable("user_claims");
            builder.Entity<UserRole>().ToTable("user_roles");
            builder.Entity<UserLogin>().ToTable("user_logins");
            builder.Entity<RoleClaim>().ToTable("role_claims");
            builder.Entity<UserToken>().ToTable("user_tokens");
            builder.Entity<DeliveryOptions>().ToTable("delivery_options");
            builder.Entity<AdultRemarksOptions>().ToTable("adult_remarks_options");
            builder.Entity<ChildRemarksOptions>().ToTable("child_remarks_options");
            builder.Entity<HealthFacilities>().ToTable("health_facilities");
            builder.Entity<ClientDetails>().ToTable("client_details");
            builder.Entity<ClientClinicalDetails>().ToTable("client_clinical_details");
            builder.Entity<Chvs>().ToTable("chvs");

            builder.Entity<ClinicalAggregatedSummary>().HasNoKey();

            string ADMIN_ID = Guid.Parse("46ba742f-f729-4bb3-81f3-ad4e07c9cd30").ToString(); // Guid.NewGuid().ToString();
            string ROLE_ID = Guid.Parse("2bb88694-a613-4cb1-b540-61b86713a098").ToString();  //ADMIN_ID;


            builder.Entity<Role>().HasData(new Role
            {
                Id = ROLE_ID,
                Name = "ADMIN",
                NormalizedName = "ADMIN"
            });
            builder.Entity<Role>().HasData(new Role
            {
                Id = Guid.NewGuid().ToString(),
                Name = "REPORT",
                NormalizedName = "REPORT"
            });
            builder.Entity<Role>().HasData(new Role
            {
                Id = Guid.NewGuid().ToString(),
                Name = "USER",
                NormalizedName = "USER"
            });

            var hasher = new PasswordHasher<User>();
            builder.Entity<User>().HasData(new User
            {
                Id = ADMIN_ID,
                FirstName = "Admin",
                LastName = "Admin",
                UserName = "admin@myemail.com",
                NormalizedUserName = "admin@myemail.com".ToUpper(),
                Email = "admin@myemail.com",
                NormalizedEmail = "admin@myemail.com".ToUpper(),
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Password123"),
                SecurityStamp = string.Empty,
                Active = true,
                JobTitle = "System Administrator"
                
            });

            builder.Entity<UserRole>().HasData(new UserRole
            {
                RoleId = ROLE_ID,
                UserId = ADMIN_ID
            });

            builder.Entity<DeliveryOptions>().HasData(new DeliveryOptions
            {
                id = 1,
                option = "SBA"
            });
            builder.Entity<DeliveryOptions>().HasData(new DeliveryOptions
            {
                id = 2,
                option = "HD (home delivery)"
            });
            builder.Entity<DeliveryOptions>().HasData(new DeliveryOptions
            {
                id = 3,
                option = "BBA(Born before arrival)"
            });

            builder.Entity<AdultRemarksOptions>().HasData(new AdultRemarksOptions
            {
                id = 1,
                option = "Abortion"
            });
            builder.Entity<AdultRemarksOptions>().HasData(new AdultRemarksOptions
            {
                id = 2,
                option = "Miscarriage"
            });
            builder.Entity<AdultRemarksOptions>().HasData(new AdultRemarksOptions
            {
                id = 3,
                option = "Still birth"
            });
            builder.Entity<AdultRemarksOptions>().HasData(new AdultRemarksOptions
            {
                id = 4,
                option = "Maternal death"
            });

            builder.Entity<ChildRemarksOptions>().HasData(new ChildRemarksOptions
            {
                id = 1,
                option = "Child death"
            });
        }

    }
}
