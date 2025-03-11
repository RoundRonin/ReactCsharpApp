import { orderServiceInstance as orderService } from "@/Presentation/container";
import { ClientTable } from "@/Presentation/components/client";
import { TableModel } from "@/Domain";
import { QueryProvider } from "@/Presentation/components/client";
import { Label } from "@/components/ui/label";

export default async function OrdersPage() {
    let initialData: TableModel | undefined;
    try {
        initialData = await orderService.getOrders(1, 10);
        console.log(initialData)
    } catch (e) {
        console.log(e)
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Label className="text-3xl">Orders</Label>
            <QueryProvider>
                <ClientTable initialData={initialData} />
            </QueryProvider>
        </div>
    );
}
