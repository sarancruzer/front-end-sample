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

  static endpointName: string = '/organisations';

  constructor(http: Http, private sessionService: SessionService) {
    super(http, OrganisationService.endpointName);
  }

  create(organisation: Organisation, admin: AdminRegistrationData): Observable<any> {
    const body: any = {
      'organisation': ModelToJsonTransformers.organisationToJson(organisation),
      'admin': ModelToJsonTransformers.userToJson(admin)
    };

    return this.post('/create', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  update(organisation: Organisation): Observable<any> {
    const body: any = ModelToJsonTransformers.organisationToJson(organisation);
    body.admin_key = this.sessionService.getUser().userKey;

    return this.post('/update', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

  updateWialonAccessToken(token: string): Observable<any> {
    let body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'token': token
    };

    return this.post('/integrations/wialon/token', body);
  }

}
