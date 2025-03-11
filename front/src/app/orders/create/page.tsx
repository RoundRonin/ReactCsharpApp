"use client";

import { QueryProvider } from "@/Presentation/components/client";
import { ClientForm } from "@/Presentation/components/client";
import { Label } from "@/components/ui/label";

export default function OrderPage() {
    return (
        <QueryProvider>
            <Label className="text-3xl">Create a New Order</Label>
            <ClientForm />
        </QueryProvider>
    );
}
