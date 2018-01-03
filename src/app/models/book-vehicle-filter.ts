import { VehicleType } from './vehicle-type';
import { Location } from './location';

export interface BookVehicleFilter {
    pickUpTime: Date;
    deliveryTime: Date;
    location: Location;
    vehicleTypes?: VehicleType[];
}
