import { FormModel } from "@/Domain";

export const FormMapper = (data: any): FormModel => {
    return {
        senderCity: data.senderCity,
        senderAddress: data.senderAddress,
        receiverCity: data.receiverCity,
        receiverAddress: data.receiverAddress,
        cargoWeight: data.weight,
        pickupDate: data.pickupDate,
    };
};
