"use client";

import { ClientDetails, QueryProvider, ClientDetailsNavigation } from "@/Presentation/components/client";
import * as React from 'react';

import { useParams } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


export default function Details() {
    const params = useParams<{ id: string }>()

    function func() {

        toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })

    }
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <Label className="text-3xl">
                Order details
            </Label>
            <QueryProvider>
                <ClientDetails id={params.id} />
            </QueryProvider>
            <div className="mt-auto">
                <ClientDetailsNavigation currentId={Number(params.id)} numberOfEntries={null} />
            </div>
        </div>
    );
}
