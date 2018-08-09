export interface User {
    name?: string;
    email?: string;
    phone?: string;
    department?: string;
    jobTitle?: string;
    isAdmin: boolean;
    id?: string;
    initials?: string;
    numberOfBookings?: number;
    userKey?: string;
}

export interface AdminRegistrationData extends User {
    password?: string;
    termsAccepted?: boolean;
}

