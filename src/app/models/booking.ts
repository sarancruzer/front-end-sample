import { BookingState } from './booking-state.enum';
import { User } from './user';
import { Vehicle } from './vehicle';

export interface Booking {
    key?: string;
    startTime: Date;
    endTime: Date;
    state: BookingState;
    owner: User;
    vehicle: Vehicle;
}
