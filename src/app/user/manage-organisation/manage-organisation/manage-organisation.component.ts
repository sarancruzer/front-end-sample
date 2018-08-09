import { OrganisationService } from './../../../shared/services/organisation.service';
import { Organisation } from './../../../models/organisation';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, LangService, BookingsService, SessionService, WialonService, VehiclesService, VehicleTypesService } from '../../../shared';
import { Router } from '@angular/router';
import { Vehicle, Booking } from '../../../models';

@Component({
  selector: 'nb-manage-organisation',
  templateUrl: './manage-organisation.component.html',
  styleUrls: ['./manage-organisation.component.css']
})
export class ManageOrganisationComponent implements OnInit, OnDestroy {

  
  organisation: Organisation;

  isIntegrated: Boolean;

  bookings: Booking[];

  isFetchingBookings: Boolean;

  isBusy: Boolean;

  wialontoken:string;

  vehicleArr: any = [];

  constructor(
    private notificationService: NotificationService,
    private bookingService: BookingsService,
    private sessionService: SessionService,
    private wialonService: WialonService,
    private vehicleService: VehiclesService,
    private vehicleTypesService: VehicleTypesService,
    private lang: LangService
  ) {
    this.isIntegrated = false;
    this.bookings = [];
    this.isFetchingBookings = false;
  }

  ngOnInit() {
    const token = localStorage.getItem('wialontoken');  
    if (token) {
      this.isIntegrated = token != null;
      this.isIntegrated = false;
    }

    console.log('this.isIntegrated');

    console.log(this.isIntegrated);

    if (!this.isIntegrated) {
      return;
    }

     // if (!this.sessionService.getOrganisation()) {
    //   return this.notificationService.notifyError('An unexpected error occurred! Please try again.');
    // }
    
   // this.fetchActiveBookings();
  }


  ngOnDestroy() {
    this.wialonService.logout();
  }


  onIntegrated() {
    this.isIntegrated = true;
    // this.wialontoken = this.sessionService.getWialonToken();
    // this.sessionService.setWialonToken(this.wialontoken );

    this.wialontoken = localStorage.getItem('wialontoken');
    localStorage.setItem('wialontoken',this.wialontoken);
    this.importVehiclesFromWialon();
  }


   private importVehiclesFromWialon() {

    if (!this.wialonService.isLoggedIn()) {
      // We delay the import for 5 seconds recusively until
      // we are logged in
      return setTimeout(() => {
        this.importVehiclesFromWialon();
      }, 5000);
    }

    let i= 0;

     this.isBusy = true;

    // fetch units (vehicles) from Wialon
    this.wialonService.fetchUnits()
      .then(units => {
        
        console.log("units");
        console.log(units);

        const unitLen = units.length;

        console.log('unitLen');
        console.log(unitLen);   
       // this.isBusy = true;

        units.forEach(unit => {

          i++;
          const vehicle = {
            is_available: true,
            vehicle_id: unit.getName(),
            tracker_id: unit.getId(),
            type: this.vehicleTypesService.getByKey('OTHER')
          };
          
          this.vehicleArr.push(vehicle);
          console.log("COMMON");        

          console.log("last success");
        });

         console.log('vehicle arr');
         console.log(this.vehicleArr);         

        this.vehicleService.createBuilkVechile(this.vehicleArr).subscribe(
          response => {

            this.isBusy = false;
            console.log("SUCCESS " + " -- "+ unitLen + "  " + i);
            // if(unitLen === i){
            //   this.notificationService.notifySuccess(response.result.info.msg);
            // }
            this.isIntegrated = false;
            this.notificationService.notifySuccess(response.result.info.msg);
          },
          error => {
            this.isBusy = false;
            console.log("ERROR");
           // this.notificationService.notifyError(error);
          }
        );

       
      //  this.notificationService.notifySuccess('response.result.info.msg');

       



      })
      .catch(error => {
        let msg = this.lang.get('err_wialon_units_import');
        msg = msg ? msg.replace('{err_msg}', error) : '';
        this.notificationService.notifyError(msg);
      })
    ;
  }


  private fetchActiveBookings() {
    this.isFetchingBookings = true;
    this.bookingService.fetchActive().subscribe(
      bookings => {
        this.isFetchingBookings = false;
        this.bookings = bookings;
      },
      error => {
        this.isFetchingBookings = false;
        const msg = this.lang.get('err_fetching_booked_vehicles');
        this.notificationService.notifyError(msg);
      }
    );
  }


}
