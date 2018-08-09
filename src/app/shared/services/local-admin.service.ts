import { LocalAdmin } from './../../models/local-admin';
import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Location } from '../../models';
import { SessionService } from './session.service';
import { BackendService } from './backend.service';
import JsonToModelTransformers from '../../utils/json.to.model';

@Injectable()
export class LocalAdminService extends BackendService{

 
  static endpointName = '/api';

  locations: Location[];

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, LocalAdminService.endpointName);

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

  create(params: any): Observable<LocalAdmin> {
    const body: any = {
      'org_id': this.sessionService.getOrganisation().id
    };

    params['org_id'] = this.sessionService.getOrganisation().id;

    return this.post('/localAdmin/create', {"info":params})
      .map(response => {
        
        return response.json();
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  edit(id: any): Observable<LocalAdmin> {
       
    
    return this.post('/localAdmin/edit/'+id, '')
      .map(response => {
        
        return response.json();
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  update(params: any,id: any): Observable<LocalAdmin> {
    const body: any = {
      'info': params
    };
    

    return this.post('/localAdmin/update/'+id,body)
      .map(response => {
        
        return response.json();
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

  list(page: any,params: any): Observable<Location[]> {
    // const body: any = {
    //      'info': params
    // };

    return this.post('/localAdmin/list?page='+page, params)
      .map(response => {        
        return response.json();
      })
      .catch(error => Observable.throw(error))
    ;
  }

}