"use client";

import { useState, useEffect } from "react";
import { useOrders } from "../../hooks";
import { TableModel } from "@/Domain";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Tooltip
} from "@/components/ui/tooltip";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";

export function TooltipWrapper({ data }: { data: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{data}</span>
                </TooltipTrigger>
                <TooltipContent>
                    {data}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function DataManager(data: string | null) {
    if (!data) { return null }
    try {
        const date = new Date(data);
        const formattedDate = date.toLocaleString();
        return formattedDate
    } catch (error) {
        return null
    }
}

export function ClientTable({ initialData }: { initialData: TableModel | undefined }) {
    const router = useRouter()
    const [page, setPage] = useState(initialData?.currentPage || 1);
    const pageSize = initialData?.items.length || 10;

    const { data, isLoading, isError, error } = useOrders(page, pageSize, initialData);

    useEffect(() => {
        if (isError && error) {
            toast("Error loading orders", {
                description: error.message || "An unexpected error occurred.",
            });
        }
    }, [isError, error]);


    if (isLoading) return <div>Loading orders...</div>;
    if (isError) return <div>Error loading orders.</div>;
    if (!data) return <div>No orders to display.</div>;

    const orders: TableModel = data;

    const nextPage = () => setPage((prev) => Math.min(prev + 1, orders.totalPages));
    const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleRowClick = (id: number) => {
        router.push(`/orders/${id}`);
    }

    const handleNewOrder = () => {
        router.push("/orders/create");
    };


    return (
        <div className="flex flex-col gap-4 h-full">
            <Table className="table-fixed w-full h-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="truncate w-1/4"><TooltipWrapper data={"Order Number"} /></TableHead>
                        <TableHead className="truncate w-1/12"><TooltipWrapper data={"Sender City"} /></TableHead>
                        <TableHead className="truncate w-1/12"><TooltipWrapper data={"Sender Address"} /></TableHead>
                        <TableHead className="truncate w-1/12"><TooltipWrapper data={"Recipient City"} /></TableHead>
                        <TableHead className="truncate w-1/12"><TooltipWrapper data={"Recipient Address"} /></TableHead>
                        <TableHead className="truncate w-1/12"><TooltipWrapper data={"Weight"} /></TableHead>
                        <TableHead className="truncate w-1/6 text-right"><TooltipWrapper data={"Pickup Date"} /></TableHead>
                        <TableHead className="truncate w-1/12"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.items.map((order) => (
                        <TableRow
                            key={order.id}
                        >
                            <TableCell className="truncate w-1/4">
                                <TooltipWrapper data={order.orderNumber} />
                            </TableCell>
                            {Object.keys(order).slice(2, -1).map(key => (
                                <TableCell className="truncate w-1/12" key={key}>
                                    <TooltipWrapper data={order[key] ?? "N/A"} />
                                </TableCell>
                            ))}
                            <TableCell className="truncate w-1/4 text-right">
                                <TooltipWrapper data={DataManager(order.pickupDate) ?? "N/A"} />
                            </TableCell>
                            <TableCell
                                className="text-center cursor-pointer transition-colors bg-zinc-50 hover:bg-zinc-200/50 data-[state=selected]:bg-zinc-200 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800 "
                                onClick={() => handleRowClick(Number(order.id))}
                            >
                                Details
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>Total Orders</TableCell>
                        <TableCell className="text-right">{orders.totalItems}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="w-full flex flex-row items-center justify-between mt-auto">
                <Button onClick={handleNewOrder}>
                    Create a new order
                </Button>
                <div className="flex items-center gap-2 justify-end space-x-2 w-full">
                    <Button className="w-24" onClick={prevPage}>
                        {"<"} Prev
                    </Button>
                    <Label className="w-24 text-center">
                        Page {orders.currentPage} of {orders.totalPages}
                    </Label>
                    <Button className="w-24" onClick={nextPage}>
                        Next {">"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

