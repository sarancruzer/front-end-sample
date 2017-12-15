import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { BookVehicleFilter, Vehicle } from './../../models';
import ModelToJsonTransformers from '../../utils/model.to.json';
import JsonToModelTransformers from '../../utils/json.to.model';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable()
export class VehiclesService extends BackendService {

  static endpointName = '/organisations/vehicles';

  collection: ReplaySubject<Vehicle[]>;

  private vehicles: Vehicle[];

  private cursor: string;

  private more: boolean;

  private fetching: boolean;

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, VehiclesService.endpointName);

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
    this.vehicles = [];

    this.collection = new ReplaySubject<Vehicle[]>(1);

    this.cursor = null;

    this.more = true;

    this.fetching = false;
  }

  list(): Observable<Vehicle[]> {
    this.fetch();

    return this.collection.asObservable();
  }

  fetch() {
    if (this.fetching) {
      return;
    }

    if (!this.more) {
      return;
    }

    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'cursor': this.cursor,
      'size': 20
    };

    this.fetching = true;
    this.post('/list', body)
      .map(response => {
        const jsonString = response.json();
        const vehicles = jsonString.vehicles ? jsonString.vehicles : [];
        const transformedVehicles = JsonToModelTransformers.jsonToVehicles(vehicles);
        this.vehicles = this.vehicles.concat(transformedVehicles);

        this.cursor = jsonString.cursor;
        this.more = jsonString.more;

        return  this.vehicles;
      })
      .subscribe(
        data => {
          this.collection.next(data);
          this.fetching = false;

          if (!this.more) {
            this.collection.complete();
          }
        },
        error => {
          console.log(error);
          this.fetching = false;
        }
      )
    ;
  }

  hasMore(): boolean {
    return this.more;
  }

  create(vehicle: Vehicle): Observable<any> {
    const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/create', body)
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

  delete(vehicle: Vehicle): Observable<any> {
    const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/delete', body)
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

  update(vehicle: Vehicle): Observable<any> {
    const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/update', body)
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

  uploadImage(file: File, vehicleKey: string, uploadUrl: string): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: headers });

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('vehicle_key', vehicleKey);

    return this.post(uploadUrl, formData, options, true)
      .map(response => response.json())
      .catch(error => Observable.throw(error))
    ;
  }

  findBookable(filter: BookVehicleFilter): Observable<Vehicle[]> {
    const body: any = ModelToJsonTransformers.bookVehicleFilterToJson(filter);
    body.user_key = this.sessionService.getUser().userKey;

    return this.post('/bookable/list', body)
      .map(response => {
        const vehicles = response.json().vehicles;
        if (vehicles) {
          return JsonToModelTransformers.jsonToVehicles(vehicles);
        }

        return [];
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

}
