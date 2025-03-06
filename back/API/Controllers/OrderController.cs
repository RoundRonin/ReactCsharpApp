using Microsoft.AspNetCore.Mvc;
using Application.DTOs;
using Application.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        private readonly IOrderService _orderService = orderService;

        [HttpGet("{id}", Name = "GetOrderById")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDTO createOrderDTO)
        {
            var orderDTO = await _orderService.AddOrderAsync(createOrderDTO);
            return CreatedAtAction(nameof(GetById), new { id = orderDTO.Id }, orderDTO);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var orders = await _orderService.GetOrdersAsync(page, limit);
            return Ok(orders);
        }
    }
}