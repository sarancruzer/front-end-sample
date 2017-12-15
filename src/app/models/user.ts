export interface User {
    name?: string;
    email?: string;
    phone?: string;
    department?: string;
    jobTitle?: string;
    isAdmin: boolean;
    userKey?: string;
    initials?: string;
    numberOfBookings?: number;
}

export interface AdminRegistrationData extends User {
    password?: string;
    termsAccepted?: boolean;
}

