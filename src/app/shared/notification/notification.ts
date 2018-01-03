export enum NotificationType {
    Info,
    Success,
    Warning,
    Error
}

export interface Notification {
    message: string;
    type: NotificationType;
    icon?: string;
    sticky?: boolean;
}
