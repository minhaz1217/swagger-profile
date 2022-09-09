using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// For swagger.
//builder.Services.AddSwaggerDocument();
builder.Services.AddSwaggerGen(c =>
                {
                    c.AddSecurityDefinition(
                        JwtBearerDefaults.AuthenticationScheme, //Name the security scheme
                        new OpenApiSecurityScheme
                        {
                            Description = "JWT Authorization header using the Bearer scheme.",
                            Type = SecuritySchemeType.Http, //We set the scheme type to http since we're using bearer authentication
                            Scheme = "bearer"               //The name of the HTTP Authorization scheme to be used in the Authorization header. In this case "bearer".
                        });

                    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                        {
                            new OpenApiSecurityScheme {
                                Reference = new OpenApiReference{
                                    Id = JwtBearerDefaults.AuthenticationScheme,
                                    Type = ReferenceType.SecurityScheme
                                }
                            },
                            new List<string>()
                        }
                    });
                });
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// NSwag configs
//app.UseOpenApi();
//app.UseSwaggerUi(config =>
//{
//    // https://localhost:7139/swagger/v1/swagger.json
//    config.DocumentPath = "/swagger/v1/swagger.json";
//    config.Path = "/swagger-old";
//});
//app.UseSwaggerUi3();


//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
