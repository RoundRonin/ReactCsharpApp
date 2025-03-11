"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/Application/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FormModel, formSchema } from "@/Presentation/schemas";
import { Input } from "@/components/ui/input";
import { useCreateOrder } from "@/Presentation/hooks";
import { useRouter } from "next/navigation";

enum FieldType {
    TEXT,
    NUMBER
}

function FormWrapper({
    form,
    name,
    placeholder,
    label,
    fieldType,
    description,
}: {
    form: UseFormReturn<FormModel>;
    name: keyof FormModel;
    placeholder: string;
    label: string;
    fieldType: FieldType;
    description?: string;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={fieldType}
                            value={field.value ?? ""}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ClientForm() {
    const router = useRouter();

    const form = useForm<FormModel>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            senderCity: undefined,
            senderAddress: undefined,
            recieverCity: undefined,
            recieverAddress: undefined,
            cargoWeight: undefined,
            pickupDate: undefined,
        },
    });

    const createOrder = useCreateOrder();

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        createOrder.mutate(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    }

    const handleBackToOrders = () => {
        router.push("/orders");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormWrapper
                    form={form}
                    name="senderCity"
                    placeholder="Enter sender city"
                    label="Sender City"
                    fieldType={FieldType.TEXT}
                />
                <FormWrapper
                    form={form}
                    name="senderAddress"
                    placeholder="Enter sender address"
                    label="Sender Address"
                    fieldType={FieldType.TEXT}
                />
                <FormWrapper
                    form={form}
                    name="recieverCity"
                    placeholder="Enter recipient city"
                    label="Reciever City"
                    fieldType={FieldType.TEXT}
                />
                <FormWrapper
                    form={form}
                    name="recieverAddress"
                    placeholder="Enter recipient address"
                    label="Reciever Address"
                    fieldType={FieldType.TEXT}
                />
                <FormWrapper
                    form={form}
                    name="cargoWeight"
                    placeholder="Enter package weight"
                    label="Package Weight"
                    fieldType={FieldType.NUMBER}
                    description="Weight of the package in grams."
                />
                <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Pickup Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-24" type="submit">Submit</Button>
            </form>
            <Button onClick={handleBackToOrders} variant="outline">
                Back to Orders
            </Button>
        </Form>
    );
}
