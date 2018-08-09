import { Component, OnInit } from '@angular/core';
import { LeafletService, NotificationService, SessionService, WialonService } from '../../../shared';



@Component({
  selector: 'nb-organisation-wialon-map',
  templateUrl: './organisation-wialon-map.component.html',
  styleUrls: ['./organisation-wialon-map.component.css']
})
export class OrganisationWialonMapComponent implements OnInit {

  isBusy: Boolean;

  constructor(
    private leafletService: LeafletService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private wialonService: WialonService
  ) {
    this.isBusy = false;
  }

  ngOnInit() {
    this.isBusy = true;

    // if (!this.sessionService.getOrganisation()) {
    //   return this.notificationService.notifyError('An unexpected error occurred! Please try again.');
    // }

    if (!localStorage.getItem('wialontoken')) {
      return this.notificationService.notifyError('An unexpected error occurred! Please try again.');
    }

    // const token = this.sessionService.getOrganisation().wialon_token;
    const token = localStorage.getItem('wialontoken');
    console.log("toekn");
    console.log(token);
    this.wialonService.loginToken(token)
      .then(response => {
        this.isBusy = false;
        this.notificationService.notifySuccess('Login to WorldTrack was successful.');
        //this.showVehiclesOnMap();
      })
      .catch(error => {
        this.isBusy = false;
      })
    ;
  }

  private showVehiclesOnMap() {
    this.leafletService.init('map');

    this.wialonService.fetchUnits()
      .then(units => {
        const msg = 'Showing ' + units.length + ' vehicle(s) on the map.';
        this.notificationService.notifyInfo(msg, true);

        units.forEach(unit => {
          this.showVehicleOnMap(unit);
        });
      })
      .catch(error => {
        this.notificationService.notifyError(error);
      })
    ;
  }

  private showVehicleOnMap(vehicle: any) {
    this.wialonService.loadLibrary('itemIcon');

    this.wialonService.fetchUnitById(vehicle.getId())
      .then(unit => {
        const position = unit.getPosition();
        if (!position) {
          const msg = 'Dit not receive any position for: ' + vehicle.getName();
          return this.notificationService.notifyError(msg, true);
        }

        const icon = this.leafletService.buildIcon({
          iconUrl: unit.getIconUrl(32),
          iconAnchor: [16, 16]
        });

        this.leafletService.showMarker(
          {
            lat: position.y,
            lng: position.x
          }, {
            icon: icon
          }
        )
          .then(marker => {
            marker.bindPopup(unit.getName()).openPopup();

            // center the map on the marker
            this.leafletService.setView(position.y, position.x);
          })
        ;

      })
      .catch(error => {
        this.notificationService.notifyWarning(error);
      })
    ;
  }
}
