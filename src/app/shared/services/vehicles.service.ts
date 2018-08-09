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

  static endpointName = '/api';

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

  // list(): Observable<Vehicle[]> {
  //   this.fetch();

  //   return this.collection.asObservable();
  // }

  list(page: any,params: any): Observable<Vehicle[]> {
    // const body: any = {
    //      'info': params
    // };
    return this.post('/vehicle/list?page='+page, params)
      .map(response => {        
        return response.json();
      })
      .catch(error => Observable.throw(error))
    ;
  }

  edit(id: any): Observable<Vehicle> {      
    
    return this.post('/vehicle/edit/'+id, '')
      .map(response => {
        
        return response.json();
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  fetch() {
    if (this.fetching) {
      return;
    }

    if (!this.more) {
      return;
    }

    const body: any = {
      'id': this.sessionService.getUser().id,
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

  create(vehicle: any): Observable<any> {
    const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
    // body.id = this.sessionService.getOrganisation().id;

    return this.post('/vehicle/create', {info:vehicle})
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

  createBuilkVechile(vehicle: any): Observable<any> {

    return this.post('/vehicle/create/bulk', {info:vehicle})
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      })
    ;
  }

  // delete(vehicle: Vehicle): Observable<any> {
  //   const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
  //   body.id = this.sessionService.getUser().id;

  //   return this.post('/delete', body)
  //     .map(response => {
  //       return response.json();
  //     })
  //     .catch(err => {
  //       return Observable.throw(err);
  //     })
  //   ;
  // }

  
  delete(params: any,id:any): Observable<any> {
    const body: any = { info:params };

    return this.post('/vehicle/delete/'+id, body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  // update(vehicle: Vehicle): Observable<any> {
  //   const body: any = ModelToJsonTransformers.vehicleToJson(vehicle);
  //   body.id = this.sessionService.getUser().id;

  //   return this.post('/update', body)
  //     .map(response => {
  //       return response.json();
  //     })
  //     .catch(err => {
  //       return Observable.throw(err);
  //     })
  //   ;
  // }


  update(params: any,id:any) {
    // const body: any = ModelToJsonTransformers.userToJson(user);
    const body: any = {"info":params};
    
    return this.post('/vehicle/update/'+id, body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
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
    body.id = this.sessionService.getUser().id;

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
