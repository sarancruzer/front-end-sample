import { VehicleType } from './vehicle-type';
import { Location } from './location';

export interface Vehicle {
    image?: string;
    isAvailable: boolean;
    key?: string;
    location?: Location|string;
    manufacturer?: string;
    model?: string;
    trackerId?: string;
    type: VehicleType;
    vehicleId: string;
    numberOfBookings?: number;
}
