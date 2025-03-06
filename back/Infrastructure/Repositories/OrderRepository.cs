using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using System;
using System.Diagnostics;

namespace Infrastructure.Repositories;

public class OrderRepository(IServiceScopeFactory scopedFactroy) : IOrderRepository
{
    public async Task<Order> GetByIdAsync(int id)
    {
        using var scope = scopedFactroy.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        return await context.Orders.FindAsync(id);
    }

    public async Task<Order> AddAsync(Order order)
    {
        using var scope = scopedFactroy.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();

        return order;
    }

    public async Task<PaginatedList<Order>> GetPaginatedOrdersAsync(int page, int limit)
    {
        using var scope = scopedFactroy.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var query = context.Orders.AsQueryable();
        var totalItems = await query.CountAsync();
        var orders = await query.Skip((page - 1) * limit).Take(limit).ToListAsync();

        return new PaginatedList<Order>
        {
            Items = orders,
            TotalItems = totalItems,
            TotalPages = (int)Math.Ceiling(totalItems / (double)limit),
            CurrentPage = page
        };
    }
}
