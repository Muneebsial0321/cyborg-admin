export type UsersType = {
    id?: string
    name: string
    email: string
    phoneNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    nextPayment?: Date | null
    hasAttendanceToday: "Present" | "Absent",
    hasPaid: "paid" | "due" | "finishing",
    presonalTrainer: boolean
    cardio: boolean
    image: string | null
}
