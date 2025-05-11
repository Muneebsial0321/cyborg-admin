export type InvoiceType = {
    id: string;
    fee: number;
    invoiceType: "REGISTRATION_FEE" | "MONTHLY_FEE"; 
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        cardio: boolean;
        createdAt: string;
        updatedAt: string;
        nextPayment: string;
    };
};
