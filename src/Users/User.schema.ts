import { z } from "zod";

export const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    // email: z.string().nullable(),
    phone: z.string().min(10, "Phone number is required"),
    registrationFee: z
        .number({ invalid_type_error: "Registration fee must be a number" })
        .nonnegative("Fee must be positive"),
    monthlyFee: z
        .number({ invalid_type_error: "Monthly fee must be a number" })
        .nonnegative("Fee must be positive"),
    cardio: z.boolean(),
    personalTrainer: z.boolean(),
    image: z.any(), // base64 or null
});

export type userCreateSchemaType = z.infer<typeof userCreateSchema>;
