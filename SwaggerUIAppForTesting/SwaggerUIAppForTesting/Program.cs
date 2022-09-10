using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SwaggerUIAppForTesting.Auth.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthJWTTokenServices(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthSwaggerGen(builder.Configuration);

// For swagger.
//builder.Services.AddSwaggerDocument();

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
