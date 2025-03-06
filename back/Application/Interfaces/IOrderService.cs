using Domain.Entities;
using Application.DTOs;
using System.Threading.Tasks;

namespace Application.Interfaces;

public interface IOrderService
{
    Task<OrderDTO> GetOrderByIdAsync(int id);
    Task<OrderDTO> AddOrderAsync(CreateOrderDTO createOrderDTO);
    Task<PaginatedList<OrderDTO>> GetOrdersAsync(int page, int limit);
}
