import { z } from "zod";

export const formSchema = z.object({
    senderCity: z.string(),
    senderAddress: z.string().nullable(),
    recieverCity: z.string(),
    recieverAddress: z.string().nullable(),
    cargoWeight: z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val), { message: "Weight must be a valid number." })
        .refine((val) => val > 0, { message: "Weight must be a positive number" }),
    pickupDate: z.date().min(new Date(Date.now()), {
        message: "Pickup date can't be in the past"
    }),
});

export type FormModel = z.infer<typeof formSchema>;
