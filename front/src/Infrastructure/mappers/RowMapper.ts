import { RowModel } from "@/Domain";

export const RowMapper = (data: any): RowModel => {
    return {
        id: data.id,
        orderNumber: data.orderNumber ?? null,
        senderCity: data.senderCity ?? null,
        senderAddress: data.senderAddress ?? null,
        receiverCity: data.recieverCity ?? null,
        receiverAddress: data.receiverAddress ?? null,
        cargoWeight: data.cargoWeight ?? null,
        pickupDate: data.pickupDate ?? null,
    };
};