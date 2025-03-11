"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface NavigationButtonsProps {
    currentId: number;
    numberOfEntries: number | null;
}

export function ClientDetailsNavigation({ currentId, numberOfEntries }: NavigationButtonsProps) {
    const router = useRouter();

    const handleBackToOrders = () => {
        router.push("/orders");
    };

    const handlePrevious = () => {
        if (currentId > 1) {
            router.push(`/orders/${currentId - 1}`);
        }
    };

    const handleNext = () => {
        if (numberOfEntries && currentId < numberOfEntries - 1 || !numberOfEntries) {
            router.push(`/orders/${currentId + 1}`);
        }
    };

    return (
        <div className="flex flex-row gap-4 justify-between items-center">
            <Button onClick={handleBackToOrders} variant="outline">
                Back to Orders
            </Button>
            <div className="flex flex-row justify-end items-center gap-2">
                <Button
                    onClick={handlePrevious}
                    variant="outline"
                    disabled={currentId <= 1}
                    className="w-24"
                >
                    Previous
                </Button>
                <Label className="w-24 text-center">
                    {currentId + (numberOfEntries ? " out of " + numberOfEntries : "")}
                </Label>
                <Button
                    onClick={handleNext}
                    variant="outline"
                    disabled={numberOfEntries ? currentId >= numberOfEntries - 1 : false}
                    className="w-24"
                >
                    Next
                </Button>

            </div>
        </div>
    );
}
