using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using VisualEssence.Domain.Interfaces.Authenticate;
using VisualEssence.Domain.Interfaces.Games;
using VisualEssence.Domain.Interfaces.Games.SystemGamesRepository;
using VisualEssence.Domain.Interfaces.NormalRepositories;
using VisualEssence.Infrasctructure.Mappings;
using VisualEssence.Infrastructure.Context;
using VisualEssence.Infrastructure.Repositories;
using VisualEssence.Infrastructure.Repositories.Games;
using VisualEssence.Infrastructure.Repositories.Identity;
using VisualEssence.Infrastructure.Repositories.SystemGames;
//using VisualEssence.Infrastructure.Service;
using VisualEssenceAPI.Repositories;
using VisualEssenceAPI.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c=>
{
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description= "Utilizando JSON Web Token (JWT) para verificacao de usuarios"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme()
            {
                Reference = new OpenApiReference()
                {
                    Type= ReferenceType.SecurityScheme,
                    Id= "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IUsuarioInstRepository, UsuarioInstRepository>();
builder.Services.AddScoped<IUsuarioPaisRepository, UsuarioPaisRepository>();
builder.Services.AddScoped<IMiopiaGameRepository, JogadaRepository>();
builder.Services.AddScoped<ISystemGamesRepository, SystemGamesRepository>();
builder.Services.AddScoped<ICriancaInstRepository, CriancaInstRepository>();
builder.Services.AddScoped<ICriancaPaisRepository, CriancaPaisRepository>();
builder.Services.AddScoped<ISalaRepository, SalaRepository>();
//builder.Services.AddScoped<IExcelService, ExcelService>();

builder.Services.AddScoped<IContatoRepository, ContatoRepository>();
builder.Services.AddScoped<IAuthenticateInst, AuthenticateInst>();
builder.Services.AddScoped<IAuthenticatePais, AuthenticatePais>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddScoped<CadastroInst>();
builder.Services.AddScoped<CadastroPais>();

var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var jwtSettings = builder.Configuration.GetSection("jwt");
var key = Encoding.ASCII.GetBytes(jwtSettings["secretKey"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["issuer"],
        ValidAudience = jwtSettings["audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAngularApp");

app.Run();
