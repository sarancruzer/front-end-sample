import {
    AdminRegistrationData,
    Booking,
    BookVehicleFilter,
    Location,
    Organisation,
    Vehicle,
    VehicleType
} from '../models';
import { VehicleTypesService } from './../shared/services';

import Utils from './utils';

export default class ModelToJsonTransformers {

    static organisationToJson(obj: Organisation): any {
        return {
            'name': obj.name,
            'website': obj.website,
            'phone': '' + obj.phone,
            'address': obj.address,
            'city': obj.city,
            'state': obj.state,
            'postal_code': obj.postal_code,
            'number_of_employees': obj.no_of_employees,
            'country': obj.country
        };
    }

    static userToJson(obj: AdminRegistrationData): any {
        return {
            'name': obj.name,
            'email': obj.email,
            'phone': '' + obj.phone,
            'password': obj.password,
            'job_title': obj.jobTitle,
            'is_admin': obj.isAdmin,
            'department': obj.department,
            'initials': obj.initials,
            'user_key': obj.userKey
        };
    }

    static vehicleToJson(vehicle: Vehicle): any {
        return {
            'vehicle_id': vehicle.vehicleId,
            'type': ModelToJsonTransformers.vehicleTypeToJson(vehicle.type),
            'vehicle_key': vehicle.key,
            'location': ModelToJsonTransformers.locationToJson(vehicle.location),
            'model': vehicle.model,
            'manufacturer': vehicle.manufacturer,
            'tracker_id': '' + vehicle.trackerId,
            'is_available': vehicle.isAvailable,
            'image': vehicle.image
        };
    }

    static vehicleTypeToJson(vehicleType: VehicleType): string {
        if (!vehicleType) {
            return VehicleTypesService.find('OTHER').key;
        }

        return vehicleType.key;
    }

    static locationToJson(location: string|Location): string {
        if (!location) {
            return null;
        }

        return (typeof location === 'string') ? location : location.key;
    }

    static vehicleTypesToJson(vehicleTypes: VehicleType[]) {
        const types: string[] = [];
        for (const type of vehicleTypes) {
            types.push(type.key);
        }

        return types;
    }

    static bookVehicleFilterToJson(filter: BookVehicleFilter): any {
        return {
            'start_time': Utils.formatDateUsingUTC(filter.pickUpTime),
            'end_time': Utils.formatDateUsingUTC(filter.deliveryTime),
            'location': filter.location.name.toLowerCase(),
            'vehicle_types': this.vehicleTypesToJson(filter.vehicleTypes)
        };
    }

    static draftBookingToJson(booking: Booking): any {
        return {
            'start_time': Utils.formatDateUsingUTC(booking.startTime),
            'end_time': Utils.formatDateUsingUTC(booking.endTime),
            'vehicle_key': booking.vehicle.key,
            'user_key': booking.owner.userKey
        };
    }
}
