using System;
using System.Collections.Generic;

namespace Domain.Entities;

public class Order
{
    public int Id { get; set; }
    public string SenderCity { get; set; } = string.Empty;
    public string SenderAddress { get; set; } = string.Empty;
    public string ReceiverCity { get; set; } = string.Empty;
    public string ReceiverAddress { get; set; } = string.Empty;
    public double CargoWeight { get; set; }
    public DateTime PickupDate { get; set; }
    public string OrderNumber { get; set; } = string.Empty;

    public bool IsValid(out List<string> errors)
    {
        errors = [];

        if (PickupDate < DateTime.Now)
            errors.Add("Pickup date cannot be in the past.");

        if (CargoWeight <= 0)
            errors.Add("Cargo weight must be positive.");

        return errors.Count == 0;
    }
}
