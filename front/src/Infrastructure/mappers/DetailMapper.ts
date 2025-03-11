import { DetailModel } from "@/Domain";

export const DetailMapper = (data: any): DetailModel => {
    return {
        id: data.id,
        orderNumber: data.orderNumber,
        senderCity: data.senderCity,
        senderAddress: data.senderAddress,
        receiverCity: data.recieverCity,
        receiverAddress: data.receiverAddress,
        cargoWeight: data.cargoWeight,
        pickupDate: data.pickupDate,
    };
};
