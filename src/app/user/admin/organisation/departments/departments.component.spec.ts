/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';

import { DepartmentsComponent } from './departments.component';
import {
  DepartmentsService,
  SessionService,
  NotificationService,
  LangService,
} from './../../../../shared/services';
import { SessionServiceStub } from './../../../../../testing';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ DepartmentsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        DepartmentsService,
        NotificationService,
        {provide: SessionService, useClass: SessionServiceStub },
        LangService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
