using Microsoft.EntityFrameworkCore;
using Infrastructure.Configurations;
using Domain.Entities;

namespace Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new OrderEntityTypeConfiguration());
    }
}
