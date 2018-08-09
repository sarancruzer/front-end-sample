import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import ModelToJsonTransformers from '../../utils/model.to.json';
import JsonToModelTransformers from '../../utils/json.to.model';
import { Booking, Organisation, AdminRegistrationData } from '../../models';

import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable()
export class OrganisationService extends BackendService {

  static endpointName: string = '/api';

  constructor(http: Http, private sessionService: SessionService) {
    super(http, OrganisationService.endpointName);
  }

  create(organisation: Organisation): Observable<any> {
    const body: any = {
      'info': organisation,
    };

    return this.post('/organisation/create', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  update(organisation: Organisation): Observable<any> {
    const body: any = organisation;
    const userId = this.sessionService.getUser().id;
    const orgId = this.sessionService.getOrganisation().id;

    return this.post('/organisation/update/'+userId+'/'+orgId, {info:body})
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  list(page: any,params: any): Observable<Location[]> {
    // const body: any = {
    //      'info': params
    // };

    return this.post('/organisation/list?page='+page, params)
      .map(response => {        
        return response.json();
      })
      .catch(error => Observable.throw(error))
    ;
  }

  updateWialonAccessToken(token: string): Observable<any> {
    let body: any = {      
      'token': token,
      'org_id': this.sessionService.getOrganisation().id
    };

    return this.post('/integrations/wialon/token', body);
  }

  updateWialonAccessTokenNew(token: string,id: number): Observable<any> {
    let body: any = {      
      'token': token,
      'org_id': id 
    };

    return this.post('/integrations/wialon/token', body);
  }

}
