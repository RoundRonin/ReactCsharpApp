using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services;

public class OrderService(IOrderDomainService orderDomainService, IMapper mapper) : IOrderService
{
    private readonly IOrderDomainService orderDomainService = orderDomainService;
    private readonly IMapper mapper = mapper;

    public async Task<OrderDTO> GetOrderByIdAsync(int id)
    {
        var order = await orderDomainService.GetOrderByIdAsync(id);
        return mapper.Map<OrderDTO>(order);
    }

    public async Task<int> AddOrderAsync(CreateOrderDTO createOrderDTO)
    {
        var order = mapper.Map<Order>(createOrderDTO);
        return await orderDomainService.AddOrderAsync(order);
    }

    public async Task<PaginatedList<OrderDTO>> GetOrdersAsync(int page, int limit)
    {
        var orders = await orderDomainService.GetPaginatedOrdersAsync(page, limit);
        return new PaginatedList<OrderDTO>
        {
            Items = mapper.Map<List<OrderDTO>>(orders.Items),
            TotalItems = orders.TotalItems,
            TotalPages = orders.TotalPages,
            CurrentPage = orders.CurrentPage
        };
    }
}