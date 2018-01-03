/* tslint:disable:no-unused-variable */

import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SessionService } from './session.service';
import { DepartmentsService } from './departments.service';
import { SessionServiceStub } from '../../../testing';
import { Department } from '../../models';
import JsonToModelTransformers from '../../utils/json.to.model';

const DEPARTMENTS = [
  {
    'name': 'Transport',
    'department_key': 'fgsadhghgsadjhjgsad'
  },
  {
    'name': 'Billing',
    'department_key': 'sadfvsdsfgdgbvfgdbgfb'
  }
];

describe('DepartmentsService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: SessionService, useClass: SessionServiceStub },
      Http,
      DepartmentsService,
    ]);
    this.departmentService = this.injector.get(DepartmentsService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('list() should return departments', fakeAsync(() => {
    let departments: any;
    this.departmentService.list().subscribe(resp => departments = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: { departments : DEPARTMENTS},
    })));
    tick();

    expect(this.lastConnection.request.url).toMatch(/\/departments\/list/);
    expect(departments).toEqual(JsonToModelTransformers.jsonToDepartments(DEPARTMENTS));
  }));

  it('create() should create a new department', fakeAsync(() => {
    const dept = new Department();
    dept.name = 'Admin';
    let department: any;
    this.departmentService.create(dept).subscribe( (resp: any) => department = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ department_key : 'jhdsfjhkbdsjkfhbvjhdfbv'}),
    })));
    tick();

    expect(department.name).toEqual('Admin');
  }));

  it('delete() should delete a department', fakeAsync(() => {
    const dept = new Department();
    dept.name = 'Admin';
    let result: any;

    this.departmentService.delete(dept).subscribe(resp => result = resp);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: {},
    })));
    tick();

    expect(result).toEqual([]);
  }));
});
