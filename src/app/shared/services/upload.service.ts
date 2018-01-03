import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { BackendService } from './backend.service';
import { environment } from './../../../environments/environment';
import { SessionService } from './session.service';

@Injectable()
export class UploadService {

  static baseUrl = environment.baseUrl + '/import';

  constructor(
    private http: Http,
    private sessionService: SessionService
  ) { }

  uploadUsers(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('admin_key', this.sessionService.getUser().userKey);

    return this.http.post(UploadService.baseUrl + '/users', formData)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
    ;
  }

  uploadVehicles(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('admin_key', this.sessionService.getUser().userKey);

    return this.http.post(UploadService.baseUrl + '/vehicles', formData)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
    ;
  }

}
