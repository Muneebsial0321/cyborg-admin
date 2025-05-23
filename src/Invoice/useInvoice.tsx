import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { createInvoice, getAllInvoices } from "./Invoice.service";
import { InvoiceType } from "./Invoice.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoiceSchema, CreateInvoiceSchemaType } from "./Invoice.schema";
import { useSnackbar } from "../context/SnackBar";

export default function useInvoices() {
   const [searchParams] = useSearchParams();
   const query = searchParams.get('query');
   const invoiceType = searchParams.get('invoiceType');
   const createdAt = searchParams.get('createdAt');
   const nextPayment = searchParams.get('nextPayment');

   const { data: getInvoices } = useQuery<InvoiceType[]>({
      queryFn: () => getAllInvoices(
         query,
         invoiceType,
         createdAt,
         nextPayment
      ),
      queryKey: ["get-invoices", query, invoiceType, createdAt, nextPayment]
   })

   return { getInvoices }
}

export const useCreateInvoiceForm = () => {
   const { showSnackbar } = useSnackbar()
   const form = useForm<CreateInvoiceSchemaType>({
      resolver: zodResolver(createInvoiceSchema),
      defaultValues: {
         fee: 0,
         invoiceType: "MONTHLY_FEE",
         description: '',
         userId: '',
         nextPayment: '',
      },
   });
   const onSubmit = async (data: CreateInvoiceSchemaType) => {
      try {
         await createInvoice(data)
         showSnackbar(
            "Invoice Created Successfully",
            "success"
         )
      } catch (error) {
         console.log({ error });
         showSnackbar(
            "Some Error Occured",
            "error"
         )

      }
   };
   return {form, onSubmit};
};