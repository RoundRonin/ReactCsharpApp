using AutoMapper;
using Application.DTOs;
using Domain.Entities;

namespace Application.MappingProfiles;

public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<CreateOrderDTO, Order>();
        CreateMap<Order, OrderDTO>();
    }
}
