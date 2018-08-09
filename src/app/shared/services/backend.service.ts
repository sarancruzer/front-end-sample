import { Observable } from 'rxjs/Rx';

import { Http, Response, Headers, URLSearchParams } from '@angular/http';

import { environment } from './../../../environments/environment';

export class BackendService {

  private baseUrl: string;

  constructor(private http: Http, baseName: string) {
    this.baseUrl = environment.apiBaseUrl + baseName;
  }

  buildEndpoint(endpoint: string) {
    return this.baseUrl + endpoint;
  }

  get(endpoint: string, params: any): Observable<Response> {

    const finalUrl = this.buildEndpoint(endpoint);
    const parameters = new URLSearchParams();

    Object.keys(params).forEach(key => {
        parameters.set(key, params[key]);
    });

    return this.http.get(finalUrl, { search: parameters });
  }

  post(endpoint: string, body: any, headers: any = {'Content-Type': 'application/json'}, custom = false): Observable<Response> {
    const headersObj = new Headers();
    headersObj.append('Authorization', localStorage.getItem('token'));
    let finalUrl = this.buildEndpoint(endpoint);
    if (custom) {
      finalUrl = endpoint;
      return this.http.post(finalUrl, body, headers);
    }

    Object.keys(headers).forEach(key => {
        headersObj.append(key, headers[key]);
    });

    return this.http.post(finalUrl, body, {
      headers: headersObj
    });
  }

}
