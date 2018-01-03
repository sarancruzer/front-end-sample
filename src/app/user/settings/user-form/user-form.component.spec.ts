/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Rx';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserFormComponent } from './user-form.component';
import {
  DepartmentsService,
  SessionService,
  NotificationService,
  LangService,
} from '../../../shared';
import {
  SessionServiceStub,
  DepartmentsServiceStub,
} from '../../../../testing';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    const departmentsServiceStub = new DepartmentsServiceStub();
    spyOn(departmentsServiceStub, 'list').and.returnValue(Observable.from([]));

    const user = {
      userKey: 'foo',
      isAdmin: true
    };
    const sessionServiceStub = new SessionServiceStub();
    spyOn(sessionServiceStub, 'getUser').and.returnValue(user);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ UserFormComponent ],
      providers: [
        { provide: DepartmentsService, useValue: departmentsServiceStub },
        { provide: SessionService, useValue: sessionServiceStub },
        NotificationService,
        LangService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.user = {
      initials: 'AR',
      name: 'Avinash Raj',
      email: 'foo@bar.com',
      phone: '9987654323',
      department: 'Development',
      jobTitle: 'Python Developer',
      isAdmin: true,
      userKey: 'ASJKGDHKGHJSDAjasdlh'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
