using Domain.Entities;

namespace Domain.Interfaces;

public interface IOrderDomainService
{
    public Task<Order> AddOrderAsync(Order order);
    public Task<Order> GetOrderByIdAsync(int id);
    public Task<PaginatedList<Order>> GetPaginatedOrdersAsync(int page, int limit);
}