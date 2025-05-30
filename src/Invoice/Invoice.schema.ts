import { z } from 'zod';

export const createInvoiceSchema = z.object({
  fee: z.number().int(),
  invoiceType: z.string().min(1, "Invoice Type is required"),
  description: z.string().optional(),
  userId: z.string(),
  nextPayment: z.string().min(1, "Next payment is required"),
});

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;
