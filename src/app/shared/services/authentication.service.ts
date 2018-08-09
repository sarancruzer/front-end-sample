import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';

import ModelToJsonTransformers from '../../utils/model.to.json';

import { BackendService } from './backend.service';
import { OrganisationService } from './organisation.service';

@Injectable()
export class AuthenticationService extends BackendService {

  static endpointName: string = '/api';

  constructor(http: Http) {
    super(http, OrganisationService.endpointName);
  }

  login(email: string, password: string): Observable<any> {
    let body: any = { 'email': email, 'password': password };
    return this.post('/authenticate', body)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(error);
      })
    ;
  }

}
