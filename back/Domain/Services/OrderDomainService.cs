using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;

namespace Domain.Services;

public class OrderDomainService(IOrderRepository orderRepository) : IOrderDomainService
{
    private readonly IOrderRepository orderRepository = orderRepository;

    public async Task<int> AddOrderAsync(Order order)
    {
        if (!order.IsValid(out var errors))
        {
            throw new DomainValidationException(errors);
        }

        order.OrderNumber = Guid.NewGuid().ToString();

        var id = await orderRepository.AddAsync(order);
        return id;
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        var order = await orderRepository.GetByIdAsync(id);
        if (order == null)
        {
            throw new EntityNotFoundException($"Order with ID {id} not found.");
        }

        return order;
    }

    public async Task<PaginatedList<Order>> GetPaginatedOrdersAsync(int page, int limit)
    {
        return await orderRepository.GetPaginatedOrdersAsync(page, limit);
    }
}