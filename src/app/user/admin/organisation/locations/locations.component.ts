import { Observable } from 'rxjs/Rx';

import { Component, OnInit, Input } from '@angular/core';

import { Location } from './../../../../models/location';
import {
  LocationsService,
  NotificationService,
  LangService,
 } from './../../../../shared/services';
import JsonToModelTransformers from '../../../../utils/json.to.model';

@Component({
  selector: 'nb-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Location[];

  isBusy: boolean;

  constructor(
    private locationsService: LocationsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.locations = [];
    this.isBusy = false;
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.isBusy = true;
    this.locationsService.list().subscribe(
      data => {
        this.isBusy = false;
        console.log("getLocations");
        console.log(data);
        this.locations = data['result']['info'];
      },
      error => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_fetching'));
      }
    );
  }

  onUpdated(locations: Location[]) {
    this.isBusy = true;
    let result: Observable<any>;

    const creators = this.createLocations(locations);
    const deleters = this.deleteLocations(locations);

    if (creators) {
      result = creators;
    }

    if (result && deleters) {
      result = result.concat(deleters);
    } else if (deleters) {
      result = deleters;
    }

    if (!result) {
      this.isBusy = false;

      return this.notificationService.notifyInfo(this.lang.get('msg_nothing_to_save'));
    }

    result.subscribe(
      data => {},
      error => {
        this.isBusy = false;
        this.locations = locations;
      },
      () => {
        this.getLocations();
      }
    );
  }

  private createLocations(locations: Location[]): Observable<any> {
    let resultSeq: Observable<any>;

    const newLocations = locations.filter(
      location => !(location instanceof Location)
    );

    for (const newLocation of newLocations) {
      const location: Location = new Location();
      location.name = newLocation.value;
      const source = this.locationsService.create(location);
      const hot = source.publish();

      hot.subscribe(
        data => {
          let msg = this.lang.get('msg_location_saved');
          msg = msg ? msg.replace('{location}', location.name) : '';
          this.notificationService.notifySuccess(msg);
        },
        error => {
          let msg = this.lang.get('err_failed_saving');
          msg = msg ? msg.replace('{location}', location.name) : '';
          let err = this.lang.get('err_details');
          err = err ? err.replace('{err_msg}', error.status) : '';
          msg += '<br />' + err;
          this.notificationService.notifyError(msg);
        }
      );

      resultSeq = resultSeq ? resultSeq.concat(hot) : hot;
      hot.connect();
    }

    return resultSeq;
  }

  private deleteLocations(locations: Location[]): Observable<any> {
    let resultSeq: Observable<any>;

    for (const location of this.locations) {
      if (locations.indexOf(location) === -1 && location.key) {
        const source = this.locationsService.delete(location);
        const hot = source.publish();

        hot.subscribe(
          data => {
            let msg = this.lang.get('msg_location_deleted');
            msg = msg ? msg.replace('{location}', location.name) : '';
            this.notificationService.notifySuccess(msg);
          },
          error => {
            let msg = this.lang.get('err_failed_deleting');
            msg = msg ? msg.replace('{location}', location.name) : '';
            let err = this.lang.get('err_details');
            err = err ? err.replace('{err_msg}', error.status) : '';
            msg += '<br />' + err;
            this.notificationService.notifyError(msg);
          }
        );

        resultSeq = resultSeq ? resultSeq.concat(hot) : hot;
        hot.connect();
      }
    }

    return resultSeq;
  }
}
