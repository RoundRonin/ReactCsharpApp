"use client";

import { useState, useEffect } from "react";
import { useOrderDetail } from "../../hooks";
import { orderServiceInstance } from "../../container";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { API } from "@/Infrastructure";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";

interface Pair {
    Label: string;
    Value: string;
}

interface ClientDetailsProps {
    id: string;
}

export function ClientDetails({ id }: ClientDetailsProps) {
    const { data: details, isLoading, isError, error } = useOrderDetail(id);

    const information: Pair[] | null = details
        ? [
            { Label: "Order number", Value: details.orderNumber },
            { Label: "Pickup date", Value: details.pickupDate },
            { Label: "Recipient address", Value: details.receiverAddress },
            { Label: "Recipient city", Value: details.receiverCity },
            { Label: "Sender address", Value: details.senderAddress },
            { Label: "Sender city", Value: details.senderCity },
            { Label: "Weight", Value: String(details.cargoWeight) },
        ]
        : null;

    const detailsHTML = information
        ? information.map((pair) => (
            <div className="flex flex-row gap-10 justify-between items-center" key={pair.Label}>
                <TooltipProvider>
                    <Label className="min-w-fit">{pair.Label}</Label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Label className="text-right truncate">{pair.Value ?? "N/A"}</Label>
                        </TooltipTrigger>
                        <TooltipContent>
                            <Label className="text-right">{pair.Value ?? "N/A"}</Label>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        ))
        : null;

    useEffect(() => {
        if (isError && error) {
            toast("Error loading order", {
                description: error.message || "An unexpected error occurred.",
            });
        }
    }, [isError, error]);

    if (isLoading) return <div>Loading…</div>;
    if (details === null) return <div>No details found.</div>;

    return <div className="flex flex-col gap-4">{detailsHTML}</div>;
}
