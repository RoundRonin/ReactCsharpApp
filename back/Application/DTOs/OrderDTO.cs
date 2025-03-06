namespace Application.DTOs;

public class OrderDTO : CreateOrderDTO
{
    public required int Id { get; set; }
    public required string OrderNumber { get; set; }
}

