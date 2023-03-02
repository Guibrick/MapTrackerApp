using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MapTrackerApp.Migrations
{
    public partial class AddLatandLong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    DeliveryId = table.Column<int>(type: "int", nullable: false),
                    Product = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    ProductType = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Size = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    LastName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    FirstName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    StreetName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    StreetNumber = table.Column<int>(type: "int", nullable: true),
                    ZIP = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Packages__626D8FCE51FE5FC8", x => x.DeliveryId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Packages");
        }
    }
}
