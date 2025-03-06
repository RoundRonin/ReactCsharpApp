using Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Factories;

public class DbContextFactory(IServiceProvider serviceProvider)
{
    public AppDbContext CreateDbContext()
    {
        return serviceProvider.GetRequiredService<AppDbContext>();
    }
}
