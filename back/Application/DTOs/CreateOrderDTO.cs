using System;
using System.ComponentModel.DataAnnotations;
namespace Application.DTOs;


public class CreateOrderDTO
{
    [Required(ErrorMessage = "Sender city is required.")]
    [StringLength(100, ErrorMessage = "Sender city must not exceed 100 characters.")]
    public string SenderCity { get; set; } = string.Empty;

    [Required(ErrorMessage = "Sender address is required.")]
    public string SenderAddress { get; set; } = string.Empty;

    [Required(ErrorMessage = "Receiver city is required.")]
    public string ReceiverCity { get; set; } = string.Empty;

    [Required(ErrorMessage = "Receiver address is required.")]
    public string ReceiverAddress { get; set; } = string.Empty;

    [Range(0.001, double.MaxValue, ErrorMessage = "Cargo weight must be a positive number.")]
    public decimal CargoWeight { get; set; }

    [Required(ErrorMessage = "Pickup date is required.")]
    public DateTime PickupDate { get; set; }
}