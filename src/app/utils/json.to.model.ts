import { Organisation } from './../models/organisation';
import { User } from '../models/user';
import { Vehicle } from '../models/vehicle';
import { Location } from '../models/location';
import { Department } from '../models/department';
import { Booking, Event } from '../models';
import { BookingState } from '../models/booking-state.enum';
import { VehicleTypesService } from './../shared/services';

import Utils from './utils';

export default class JsonToModelTransformers {

    static jsonToUser(obj: any): User {
        return {
            jobTitle: obj.job_title || '',
            name: obj.name || '',
            email: obj.email || '',
            phone: obj.phone || '',
            department: obj.department || '',
            isAdmin: obj.is_admin,
            userKey: obj.user_key || '',
            initials: obj.initials || ''
        };
    }

    static jsonToVehicle(obj: any): Vehicle {
        return {
            image: obj ? obj.image : '',
            isAvailable: obj ? obj.is_available : false,
            key: obj ? obj.vehicle_key : '',
            location: obj && obj.location ? obj.location : null,
            manufacturer: obj && obj.manufacturer ? obj.manufacturer : '',
            model: obj && obj.model ? obj.model : '',
            trackerId: obj && obj.tracker_id ? obj.tracker_id : '',
            type: obj ? VehicleTypesService.find(obj.type) : VehicleTypesService.find('OTHER'),
            vehicleId: obj ? obj.vehicle_id : ''
        };
    }

    static jsonToVehicles(objList: any): Vehicle[] {
        const vehicles: Vehicle[] = [];
        for (const vehicle of objList) {
            vehicles.push(this.jsonToVehicle(vehicle));
        }

        return vehicles;
    }


    static jsonToLocation(obj: any): Location {
        const location = new Location();
        location.key = obj.location_key;
        location.value = obj.name;
        return location;
    }

    static jsonToDepartment(obj: any): Department {
        const deptartment = new Department();
        deptartment.key = obj.department_key;
        deptartment.value = obj.name;
        return deptartment;
    }

    static jsonToLocations(objList: any): Location[] {
        const locations: Location[] = [];
        for (const loc of objList) {
            locations.push(this.jsonToLocation(loc));
        }

        return locations;
    }

    static jsonToDepartments(objList: any): Department[] {
        const departments: Department[] = [];
        for (const dept of objList) {
            departments.push(this.jsonToDepartment(dept));
        }

        return departments;
    }

    static jsonToUsers(objList: any): User[] {
        const users: User[] = [];
        for (const user of objList) {
            users.push(this.jsonToUser(user));
        }

        return users;
    }

    static bookingToEvent(booking: Booking): Event {
        return {
            title: booking.vehicle.manufacturer + ' - ' + booking.vehicle.vehicleId,
            start: booking.startTime,
            end: booking.endTime,
            allDay: false,
            className: Utils.resolveEventClassName(booking)
        };
    }

    static bookingsToEvents(bookings: Booking[]): Event[] {
        const events: Event[] = [];
        for (const booking of bookings) {
            const event: Event = this.bookingToEvent(booking);
            events.push(event);
        }
        return events;
    }

    static jsonToBooking(obj: any): Booking {
        const booking: Booking = {
            key: obj.booking_key,
            startTime: Utils.parseDate(obj.start_time),
            endTime: Utils.parseDate(obj.end_time),
            state: Utils.parseBookingState(obj.state),
            vehicle: obj.vehicle ? this.jsonToVehicle(obj.vehicle) : null,
            owner: obj.owner ? this.jsonToUser(obj.owner) : null
        };

        return Utils.resolveBookingState(booking);
    }

    static jsonToBookings(objList: any, user?: User): Booking[] {
        const bookings: Booking[] = [];
        for (const booking of objList) {
            const bookingObj = this.jsonToBooking(booking);
            if (user) {
                bookingObj.owner = user;
            }
            bookings.push(bookingObj);
        }

        return bookings;
    }

    static jsonToOrganisation(obj: any): Organisation {
        const org: Organisation = {};       
        org.name = obj.name;
        org.website = obj.website;
        org.phone = obj.phone;
        org.address = obj.address;
        org.state = obj.state;
        org.city = obj.city;
        org.postal_code = obj.postal_code;
        org.country = obj.country;
        org.no_of_employees = obj.no_of_employees;
        org.wialon_token = obj.wialon_token;

        return org;
    }

}
