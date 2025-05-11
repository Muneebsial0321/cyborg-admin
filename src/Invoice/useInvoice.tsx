import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllInvoices } from "./Invoice.service";
import { InvoiceType } from "./Invoice.type";

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
      queryKey: ["get-invoices",query,invoiceType,createdAt,nextPayment]
   })

   return { getInvoices }
}