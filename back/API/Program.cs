using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

using API;
using API.Middleware;

using Application.Interfaces;
using Application.MappingProfiles;

using Infrastructure.Helpers;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Infrastructure.Factories;

using Domain.Interfaces;

using Application.Services;
using Domain.Services;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Database
var connectionString = DbContextConfigurationHelper.BuildConnectionString();
builder.Services.AddDbContext<AppDbContext>(options =>
    DbContextConfigurationHelper.Configure((DbContextOptionsBuilder<AppDbContext>)options, connectionString), ServiceLifetime.Scoped);
builder.Services.AddScoped<DbContextFactory>();
builder.Services.AddSingleton<IServiceScopeFactory>(provider => provider.GetRequiredService<IServiceProvider>().CreateScope().ServiceProvider.GetRequiredService<IServiceScopeFactory>());

// Repos
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

// Services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderDomainService, OrderDomainService>();

builder.Services.AddAutoMapper(typeof(OrderProfile));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});


var app = builder.Build();

// HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NAP API v1"));
}
else
{
    app.UseExceptionHandler("/Error");
    //app.UseHsts();
}

// const string AllowAnyOriginPolicy = "_allowAnyOrigin";
// app.UseCors(AllowAnyOriginPolicy);
// Middleware
app.UseMiddleware<ExceptionHandler>();
//app.UseHttpsRedirection();
app.UseRouting();
// app.Use(async (context, next) =>
// {
//     Debug.WriteLine("Request Headers:");
//     foreach (var header in context.Request.Headers)
//     {
//         Debug.WriteLine($"{header.Key}: {header.Value}");
//     }
//     await next();
// });
app.UseCors("AllowNextJS");
// app.Use(async (context, next) =>
// {
//     context.Response.Headers.Append("Access-Control-Allow-Origin", "http://localhost:3000");
//     await next();
// });

app.UseAuthorization();

app.MapControllers();


app.Run();

