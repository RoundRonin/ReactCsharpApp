"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { DetailModel, TableModel } from "@/Domain";
import { FormModel } from "@/Domain";
import { FormModel as FormSchemaModel } from "@/Presentation/schemas";

import { orderServiceInstance } from "@/Presentation/container";
import { toast } from "sonner";

export function useOrders(page: number, limit: number, initialData?: TableModel) {
    return useQuery<TableModel, Error>({
        queryKey: ['orders', page, limit],
        queryFn: async () => {
            const data = await orderServiceInstance.getOrders(page, limit);
            return data;
        },
        initialData,
        retry: false
    });
}

export function useOrderDetail(id: string) {
    return useQuery<DetailModel, Error>({
        queryKey: ['order', id],
        queryFn: async () => {
            const data = await orderServiceInstance.getOrderDetail(id);
            return data
        },
        retry: false
    });
}

export function useCreateOrder() {
    return useMutation({
        mutationFn: async (suppliedData: FormSchemaModel) => {
            const FormData: FormModel = {
                senderCity: suppliedData.senderCity,
                senderAddress: suppliedData.senderAddress,
                receiverCity: suppliedData.recieverCity,
                receiverAddress: suppliedData.recieverAddress,
                cargoWeight: suppliedData.cargoWeight,
                pickupDate: suppliedData.pickupDate.toISOString()
            }
            return await orderServiceInstance.createOrder(FormData);
        },
        onSuccess: () => {
            console.log("Success!")
            toast("Success!", {
                description: "Order created successfully.",
            });
        },
        onError: (error: any) => {
            toast("Error!", {
                description: error?.message || "Failed to create the order.",
            });
        },
    })

}
