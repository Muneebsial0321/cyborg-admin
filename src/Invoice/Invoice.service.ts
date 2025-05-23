import api from "../_shared/Configs/Axios"
import { InvoiceType } from "./Invoice.type"
import { CreateInvoiceSchemaType } from "./Invoice.schema"

const createInvoice = async (payload: CreateInvoiceSchemaType) => {
    const { data } = await api.post("/invoices", payload)
    return data
}
const getAllInvoices = async (
    query: string | null,
    invoiceType: string | null,
    createdAt: string | null,
    nextPayment: string | null,
): Promise<InvoiceType[]> => {
    const { data } = await api.get("/invoices", {
        params: {
            ...(query ? { query } : {}),
            ...(invoiceType ? { invoiceType } : {}),
            ...(createdAt ? { createdAt } : {}),
            ...(nextPayment ? { nextPayment } : {}),
        }
    })
    return data
}
const getOneInvoice = async () => { }
const deleteInvoice = async () => { }

export {
    createInvoice,
    getAllInvoices,
    getOneInvoice,
    deleteInvoice,
}