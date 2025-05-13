type TimeOfDay = 'MORNING' | 'NIGHT';

type User = {
    email: string;
    name: string;
    id: string;
    phoneNumber: string;
    nextPayment: string; // ISO 8601 date string
};

export type AttendanceType = {
    id: string;
    userId: string;
    time: TimeOfDay;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    User: User;
};
