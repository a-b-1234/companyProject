using copanyProject.Models;
using copanyProject.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader().AllowAnyMethod();
                      });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddScoped<TokenService>();

builder.Services.AddDbContext<CompanySystemContext>(options => options.UseSqlServer("Server=DESKTOP-FVA15IL;Database=company_system;Trusted_Connection=True;TrustServerCertificate=true;"));
using (var context = new CompanySystemContext())
{
    context.Database.EnsureCreated();//todo
    context.Database.Migrate();
    if (!context.Personals.Any())
    {
        context.Personals.AddRange(
                new Personal
                {
                    Id = 1,
                    Name = "Ayala",
                    Team = "Fullstack Developer",
                    Avatar = "",
                    JoinedAt = DateTime.Now,
                    EmailAddress = "a.a@gmail.com",
                    Password = "aAbb1234!"
                },
                new Personal
                {
                    Id = 2,
                    Name = "Shani",
                    Team = "Backend Developer",
                    Avatar = "",
                    JoinedAt = DateTime.Now,
                    EmailAddress = "b.b@gmail.com",
                    Password = "aAbb1234!!"
                }
            );

        context.Projects.AddRange(
                new Project { Id = "1", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 1, Name = "abc", Score = 100 },
                new Project { Id = "2", BugsCount = 5, DurationInDays = 2, MadeDadeline = true, PersonalId = 1, Name = "abc1", Score = 90 },
                new Project { Id = "3", BugsCount = 1, DurationInDays = 1, MadeDadeline = false, PersonalId = 1, Name = "abc2", Score = 80 },
                new Project { Id = "4", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 1, Name = "abc3", Score = 70 },
                new Project { Id = "5", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 2, Name = "abc", Score = 50 },
                new Project { Id = "6", BugsCount = 5, DurationInDays = 2, MadeDadeline = true, PersonalId = 2, Name = "abc1", Score = 90 },
                new Project { Id = "7", BugsCount = 1, DurationInDays = 1, MadeDadeline = false, PersonalId = 2, Name = "abc2", Score = 80 },
                new Project { Id = "8", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 2, Name = "abc3", Score = 70 },
                new Project { Id = "9", BugsCount = 1, DurationInDays = 2, MadeDadeline = false, PersonalId = 2, Name = "abc4", Score = 60 },
                new Project { Id = "10", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 2, Name = "abc5", Score = 100 },
                new Project { Id = "11", BugsCount = 7, DurationInDays = 4, MadeDadeline = false, PersonalId = 2, Name = "abc6", Score = 100 },
                new Project { Id = "12", BugsCount = 1, DurationInDays = 1, MadeDadeline = true, PersonalId = 2, Name = "abc7", Score = 100 }
                );

        context.SaveChanges();
    }
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes("fhytrbryy1tr56u465b1u6r")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
