import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Location } from '../../models';
import { SessionService } from './session.service';
import { BackendService } from './backend.service';
import JsonToModelTransformers from '../../utils/json.to.model';

@Injectable()
export class LocationsService extends BackendService {

  static endpointName = '/organisations/locations';

  locations: Location[];

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, LocationsService.endpointName);

    this.reset();

    this.sessionService.onReset
       .subscribe(
         item => {
          this.reset();
        }
      )
    ;
  }

  reset() {
    this.locations = [];
  }

  create(location: Location): Observable<Location> {
    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'name': location.name
    };

    return this.post('/create', body)
      .map(response => {
        location.key = response.json().location_key;
        this.locations.push(location);

        return location;
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  delete(location: Location): Observable<Location[]> {
    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'location_key': location.key
    };

    return this.post('/delete', body)
      .map(response => {
        for (let i = 0; i < this.locations.length; i++) {
          const l: Location = this.locations[i];
          if (l.key === l.key) {
            this.locations.splice(i, 1);
          }
        }

        return this.locations;
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  list(): Observable<Location[]> {
    const body: any = {
      'user_key': this.sessionService.getUser().userKey
    };

    return this.get('/list', body)
      .map(response => {
        this.locations = JsonToModelTransformers.jsonToLocations(
          response.json().locations || []
        );

        return this.locations;
      })
      .catch(error => Observable.throw(error))
    ;
  }

}
