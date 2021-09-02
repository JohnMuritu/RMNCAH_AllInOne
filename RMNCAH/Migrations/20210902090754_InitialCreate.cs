using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace RMNCAH.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "adult_remarks_options",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    option = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_adult_remarks_options", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "child_remarks_options",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    option = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_child_remarks_options", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "chvs",
                columns: table => new
                {
                    chv_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    chv_name = table.Column<string>(type: "text", nullable: true),
                    active = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_chvs", x => x.chv_id);
                });

            migrationBuilder.CreateTable(
                name: "client_details_and_clinical_report_data",
                columns: table => new
                {
                    client_clinical_details_id = table.Column<Guid>(type: "uuid", nullable: false),
                    chv_name = table.Column<string>(type: "text", nullable: true),
                    dept_client_id = table.Column<string>(type: "text", nullable: true),
                    full_names = table.Column<string>(type: "text", nullable: true),
                    age = table.Column<double>(type: "double precision", nullable: false),
                    village = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    alternative_phone_number = table.Column<string>(type: "text", nullable: true),
                    hf_linked = table.Column<string>(type: "text", nullable: true),
                    other_hf_attended = table.Column<string>(type: "text", nullable: true),
                    baby_name = table.Column<string>(type: "text", nullable: true),
                    anc1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc2 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc3 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc4 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc5 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    edd = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    remarks_parent = table.Column<string>(type: "text", nullable: true),
                    delivery = table.Column<string>(type: "text", nullable: true),
                    penta1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta2 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta3 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    mr1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    remarks_child = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_client_details_and_clinical_report_data", x => x.client_clinical_details_id);
                });

            migrationBuilder.CreateTable(
                name: "clinical_aggregated_summary",
                columns: table => new
                {
                    total_anc1 = table.Column<int>(type: "integer", nullable: false),
                    total_anc2 = table.Column<int>(type: "integer", nullable: false),
                    total_anc3 = table.Column<int>(type: "integer", nullable: false),
                    total_anc4 = table.Column<int>(type: "integer", nullable: false),
                    total_anc5 = table.Column<int>(type: "integer", nullable: false),
                    total_edd = table.Column<int>(type: "integer", nullable: false),
                    total_penta1 = table.Column<int>(type: "integer", nullable: false),
                    total_penta2 = table.Column<int>(type: "integer", nullable: false),
                    total_penta3 = table.Column<int>(type: "integer", nullable: false),
                    total_mr1 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "defaulters",
                columns: table => new
                {
                    client_clinical_details_id = table.Column<Guid>(type: "uuid", nullable: false),
                    full_names = table.Column<string>(type: "text", nullable: true),
                    dept_client_id = table.Column<string>(type: "text", nullable: true),
                    facility_name = table.Column<string>(type: "text", nullable: true),
                    edd = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    delivery = table.Column<string>(type: "text", nullable: true),
                    delivery_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    delivery_defaulter = table.Column<string>(type: "text", nullable: true),
                    penta1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta1_defaulter = table.Column<string>(type: "text", nullable: true),
                    penta3 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta3_defaulter = table.Column<string>(type: "text", nullable: true),
                    mr1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    mr1_defaulter = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_defaulters", x => x.client_clinical_details_id);
                });

            migrationBuilder.CreateTable(
                name: "delivery_options",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    option = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_delivery_options", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "health_facilities",
                columns: table => new
                {
                    mfl_code = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    facility_name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_health_facilities", x => x.mfl_code);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_sign_up_resource",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    user_name = table.Column<string>(type: "text", nullable: true),
                    first_name = table.Column<string>(type: "text", nullable: true),
                    last_name = table.Column<string>(type: "text", nullable: true),
                    job_title = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    password = table.Column<string>(type: "text", nullable: true),
                    user_role = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_sign_up_resource", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    first_name = table.Column<string>(type: "text", nullable: true),
                    last_name = table.Column<string>(type: "text", nullable: true),
                    change_password = table.Column<int>(type: "integer", nullable: false),
                    active = table.Column<bool>(type: "boolean", nullable: false),
                    job_title = table.Column<string>(type: "text", nullable: true),
                    user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: true),
                    security_stamp = table.Column<string>(type: "text", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    access_failed_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "client_clinical_details",
                columns: table => new
                {
                    client_clinical_details_id = table.Column<Guid>(type: "uuid", nullable: false),
                    client_id = table.Column<Guid>(type: "uuid", nullable: false),
                    baby_name = table.Column<string>(type: "text", nullable: true),
                    anc1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc2 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc3 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc4 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    anc5 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    edd = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    remarks_parent = table.Column<int>(type: "integer", nullable: true),
                    remarks_parent_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    delivery = table.Column<int>(type: "integer", nullable: true),
                    delivery_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta2 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    penta3 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    mr1 = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    remarks_child = table.Column<int>(type: "integer", nullable: true),
                    remarks_child_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    created_by = table.Column<string>(type: "text", nullable: true),
                    created_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_by = table.Column<string>(type: "text", nullable: true),
                    updated_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_client_clinical_details", x => x.client_clinical_details_id);
                    table.ForeignKey(
                        name: "fk_client_clinical_details_adult_remarks_options_remarks_parent",
                        column: x => x.remarks_parent,
                        principalTable: "adult_remarks_options",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_client_clinical_details_child_remarks_options_remarks_child",
                        column: x => x.remarks_child,
                        principalTable: "child_remarks_options",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_client_clinical_details_delivery_options_delivery",
                        column: x => x.delivery,
                        principalTable: "delivery_options",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "client_details",
                columns: table => new
                {
                    client_id = table.Column<Guid>(type: "uuid", nullable: false),
                    chv_id = table.Column<int>(type: "integer", nullable: false),
                    dept_client_id = table.Column<string>(type: "text", nullable: true),
                    full_names = table.Column<string>(type: "text", nullable: true),
                    dob = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    village = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    alternative_phone_number = table.Column<string>(type: "text", nullable: true),
                    mfl_code = table.Column<int>(type: "integer", nullable: false),
                    other_hf_attended = table.Column<string>(type: "text", nullable: true),
                    hiv_status_known = table.Column<string>(type: "text", nullable: true),
                    test_done = table.Column<string>(type: "text", nullable: true),
                    created_by = table.Column<string>(type: "text", nullable: true),
                    created_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_by = table.Column<string>(type: "text", nullable: true),
                    updated_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_client_details", x => x.client_id);
                    table.ForeignKey(
                        name: "fk_client_details_chvs_chv_id",
                        column: x => x.chv_id,
                        principalTable: "chvs",
                        principalColumn: "chv_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_client_details_health_facility_mfl_code",
                        column: x => x.mfl_code,
                        principalTable: "health_facilities",
                        principalColumn: "mfl_code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "role_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<string>(type: "text", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_claims_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<string>(type: "text", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_claims_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_logins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    provider_key = table.Column<string>(type: "text", nullable: false),
                    provider_display_name = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_logins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "fk_user_logins_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    role_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_roles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_user_roles_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_roles_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_tokens",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_tokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "fk_user_tokens_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "adult_remarks_options",
                columns: new[] { "id", "option" },
                values: new object[,]
                {
                    { 1, "Abortion" },
                    { 2, "Miscarriage" },
                    { 3, "Still birth" },
                    { 4, "Maternal death" }
                });

            migrationBuilder.InsertData(
                table: "child_remarks_options",
                columns: new[] { "id", "option" },
                values: new object[] { 1, "Child death" });

            migrationBuilder.InsertData(
                table: "delivery_options",
                columns: new[] { "id", "option" },
                values: new object[,]
                {
                    { 1, "SBA" },
                    { 2, "HD (home delivery)" },
                    { 3, "BBA(Born before arrival)" }
                });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[,]
                {
                    { "2bb88694-a613-4cb1-b540-61b86713a098", "c9d8f1ad-2eb7-4ab8-a9ab-c98fe3d97c8b", "ADMIN", "ADMIN" },
                    { "83c56cc9-b22e-415d-b836-1080c8be8e2f", "750ac99b-c156-47cd-9261-a3b76f4787f7", "REPORT", "REPORT" },
                    { "524b2daf-6a49-4492-8a05-d2269454507f", "bc3a9dfb-b83c-4c5a-84fe-41301cf6929d", "USER", "USER" }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "access_failed_count", "active", "change_password", "concurrency_stamp", "email", "email_confirmed", "first_name", "job_title", "last_name", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[] { "46ba742f-f729-4bb3-81f3-ad4e07c9cd30", 0, true, 0, "588ae84b-0124-4cc0-ac66-634b2ad67f42", "admin@myemail.com", true, "Admin", "System Administrator", "Admin", false, null, "ADMIN@MYEMAIL.COM", "ADMIN", "AQAAAAEAACcQAAAAEAvg9aHyAi9arSWNlmRXPZGefFVa7PSyApTuJ2WmI3f1eQacq5sZCsp4a0kxqvTWYA==", null, false, "", false, "admin" });

            migrationBuilder.InsertData(
                table: "user_roles",
                columns: new[] { "role_id", "user_id" },
                values: new object[] { "2bb88694-a613-4cb1-b540-61b86713a098", "46ba742f-f729-4bb3-81f3-ad4e07c9cd30" });

            migrationBuilder.CreateIndex(
                name: "ix_client_clinical_details_delivery",
                table: "client_clinical_details",
                column: "delivery");

            migrationBuilder.CreateIndex(
                name: "ix_client_clinical_details_remarks_child",
                table: "client_clinical_details",
                column: "remarks_child");

            migrationBuilder.CreateIndex(
                name: "ix_client_clinical_details_remarks_parent",
                table: "client_clinical_details",
                column: "remarks_parent");

            migrationBuilder.CreateIndex(
                name: "ix_client_details_chv_id",
                table: "client_details",
                column: "chv_id");

            migrationBuilder.CreateIndex(
                name: "ix_client_details_mfl_code",
                table: "client_details",
                column: "mfl_code");

            migrationBuilder.CreateIndex(
                name: "ix_role_claims_role_id",
                table: "role_claims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "roles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_claims_user_id",
                table: "user_claims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_logins_user_id",
                table: "user_logins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_roles_role_id",
                table: "user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "users",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "users",
                column: "normalized_user_name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "client_clinical_details");

            migrationBuilder.DropTable(
                name: "client_details");

            migrationBuilder.DropTable(
                name: "client_details_and_clinical_report_data");

            migrationBuilder.DropTable(
                name: "clinical_aggregated_summary");

            migrationBuilder.DropTable(
                name: "defaulters");

            migrationBuilder.DropTable(
                name: "role_claims");

            migrationBuilder.DropTable(
                name: "user_claims");

            migrationBuilder.DropTable(
                name: "user_logins");

            migrationBuilder.DropTable(
                name: "user_roles");

            migrationBuilder.DropTable(
                name: "user_sign_up_resource");

            migrationBuilder.DropTable(
                name: "user_tokens");

            migrationBuilder.DropTable(
                name: "adult_remarks_options");

            migrationBuilder.DropTable(
                name: "child_remarks_options");

            migrationBuilder.DropTable(
                name: "delivery_options");

            migrationBuilder.DropTable(
                name: "chvs");

            migrationBuilder.DropTable(
                name: "health_facilities");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
