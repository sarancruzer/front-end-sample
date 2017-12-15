/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, Response, Headers, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from './../../../../models/user';
import { UserEditorComponent } from './user-editor.component';
import {
  SessionService,
  NotificationService,
  UsersService,
  MaterialDashboardProService,
} from './../../../../shared/services';
import {
  SessionServiceStub,
  WindowRefServiceStub,
  UsersServiceStub,
} from './../../../../../testing';

describe('UserEditorComponent', () => {
  let component: UserEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;
  let mdp: MaterialDashboardProService;
  let user: User;

  beforeEach(async(() => {
    user = {
      userKey: 'foo',
      isAdmin: false
    };

    const windowRef = new WindowRefServiceStub();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'initMdp');

    TestBed.configureTestingModule({
      declarations: [ UserEditorComponent ],
      providers: [{
        provide: Http, useFactory: (backend, options) => {
          return new Http(backend, options);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        MockBackend,
        BaseRequestOptions,
        {provide: UsersService, useClass: UsersServiceStub},
        {provide: SessionService, useClass: SessionServiceStub},
        NotificationService,
        {provide: MaterialDashboardProService, useValue: mdp}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
