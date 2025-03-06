using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IOrderRepository
{
    Task<Order> GetByIdAsync(int id);
    Task<Order> AddAsync(Order order);
    Task<PaginatedList<Order>> GetPaginatedOrdersAsync(int page, int limit);
}
