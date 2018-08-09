import { Observable, ReplaySubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Department } from '../../models';
import { SessionService } from './session.service';
import { BackendService } from './backend.service';
import JsonToModelTransformers from '../../utils/json.to.model';

@Injectable()
export class DepartmentsService extends BackendService {
  static endpointName: string = '/api';

  private departments: Department[];

  collection: ReplaySubject<Department[]>;

  private cursor: string;

  private more: boolean;

  private fetching: boolean;

  constructor(
    http: Http,
    private sessionService: SessionService
  ) {
    super(http, DepartmentsService.endpointName);

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
    this.collection = new ReplaySubject<Department[]>(1);

    this.departments = [];

    this.cursor = null;

    this.more = true;

    this.fetching = false;
  }

  // list(): Observable<Department[]> {
  //   this.fetch();
  //   return this.collection;
  // }

  fetch() {
    if (this.fetching) return;

    if (!this.more) return;

    let body: any = {
     
      'cursor': this.cursor,
      'size': 10
    };

    this.fetching = true;
    this.post('/department/master', body)
      .map(response => {
        let jsonString = response.json();
        let departments = jsonString.departments ? jsonString.departments : [];
        let transformedDepartments = JsonToModelTransformers.jsonToDepartments(departments);
        this.departments = this.departments.concat(transformedDepartments);

        this.cursor = jsonString.cursor;
        this.more = jsonString.more;

        return  this.departments;
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
          this.fetching = false;
        }
      )
    ;
  }

  hasMore(): boolean {
    return this.more;
  }

  create(department: Department): Observable<Department> {
    const body: any = {     
      'name': department.name
    };

    return this.post('/department/create', {"info":body})
      .map(response => {
        department.key = response.json().department_key;
        this.departments.push(department);

        return department;
      })
      .catch((err: any) => Observable.throw(err))
    ;
  }

  list(): Observable<Department[]> {
    // const body: any = {
    //   'user_key': this.sessionService.getUser().userKey
    // };
    return this.post('/department/masters', '')
      .map(response => {        
        return response.json();
      })
      .catch(error => Observable.throw(error))
    ;
  }

  getAll(): Observable<Department[]> {
    // const body: any = {
    //   'user_key': this.sessionService.getUser().userKey
    // };
    return this.post('/department/getAll', '')
      .map(response => {        
        return response.json();
      })
      .catch(error => Observable.throw(error))
    ;
  }

  delete(department: Department): Observable<Department[]> {
    const body: any = {
      'admin_key': this.sessionService.getUser().userKey,
      'department_key': department.key
    };

    return this.post('/delete', body)
      .map(response => {
        for (var i = 0; i < this.departments.length; i++) {
          var d: Department = this.departments[i];
          if (d.key === department.key) {
            this.departments.splice(i, 1);
          }
        }

        return this.departments;
      })
      .catch((err: any) => Observable.throw(err))
    ;
  };

}
