using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configurations;

public class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedOnAdd();
        builder.Property(o => o.OrderNumber).ValueGeneratedOnAdd().HasMaxLength(50);
        builder.Property(o => o.SenderCity).IsRequired().HasMaxLength(100);
        builder.Property(o => o.SenderAddress).IsRequired().HasMaxLength(200);
        builder.Property(o => o.ReceiverCity).IsRequired().HasMaxLength(100);
        builder.Property(o => o.ReceiverAddress).IsRequired().HasMaxLength(200);
        builder.Property(o => o.CargoWeight).IsRequired();
        builder.Property(o => o.PickupDate).IsRequired();
    }
}
