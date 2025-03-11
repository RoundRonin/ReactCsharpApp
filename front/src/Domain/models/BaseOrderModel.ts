export interface BaseOrderModel {
    senderCity: string | null;
    senderAddress: string | null;
    receiverCity: string | null;
    receiverAddress: string | null;
    cargoWeight: number | null;
    pickupDate: string | null;
}