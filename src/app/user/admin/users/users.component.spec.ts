/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { UsersComponent } from './users.component';
import {
  NotificationService,
  UsersService,
  UploadService,
  LangService,
} from './../../../shared/services';
import {
  UsersServiceStub,
  UploadServiceStub
} from './../../../../testing/nb-stubs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: UploadService, useClass: UploadServiceStub },
        NotificationService,
        LangService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
