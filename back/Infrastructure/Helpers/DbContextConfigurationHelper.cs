using Microsoft.EntityFrameworkCore;

using Infrastructure.Data;

namespace Infrastructure.Helpers;

public static class DbContextConfigurationHelper
{
    public static void Configure(DbContextOptionsBuilder<AppDbContext> optionsBuilder, string connectionString)
    {
        optionsBuilder.UseNpgsql(connectionString);
    }

    public static string BuildConnectionString()
    {
        // Load environment variables from .env file, checks are provided
        var rootEnvPath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, ".env");
        DotNetEnv.Env.Load(rootEnvPath);

        var host = Environment.GetEnvironmentVariable("HOST") ?? throw new ArgumentNullException("HOST environment variable is not set");
        var port = Environment.GetEnvironmentVariable("PORT") ?? throw new ArgumentNullException("PORT environment variable is not set");
        var db = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? throw new ArgumentNullException("POSTGRES_DB environment variable is not set");
        var user = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? throw new ArgumentNullException("POSTGRES_USER environment variable is not set");
        var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? throw new ArgumentNullException("POSTGRES_PASSWORD environment variable is not set");

        return $"Host={host};Port={port};Database={db};Username={user};Password={password}";
    }
}
