import { z } from 'zod';

export const createInvoiceSchema = z.object({
  fee: z.number().int(),
  invoiceType: z.enum(["MONTHLY_FEE", "REGISTRATION_FEE"]).optional().default("MONTHLY_FEE"),
  description: z.string().optional(),
  userId: z.string(),
  nextPayment: z.string().min(1, "Next payment is required"),
});

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;
