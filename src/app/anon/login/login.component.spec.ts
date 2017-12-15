/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthenticationService, SessionService, NotificationService } from './../../shared/services';

import { RouterStub } from '../../../testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    let routerStub = new RouterStub();

    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule],
      declarations: [
        LoginComponent
      ],
      providers: [{
        provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        MockBackend,
        BaseRequestOptions,
        AuthenticationService,
        SessionService,
        NotificationService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
