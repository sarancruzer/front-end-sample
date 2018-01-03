import { Observable } from 'rxjs/Rx';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { User } from './../models';
import { UserComponent } from './user.component';
import {
  DepartmentsService,
  LocationsService,
  NotificationService,
  SessionService,
  VehiclesService,
  LangService,
  MaterialDashboardProService,
} from './../shared/services';

import {
  ActivatedRouteStub,
  DepartmentsServiceStub,
  LocationsServiceStub,
  RouterLinkActiveStubDirective,
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStub,
  SessionServiceStub,
  VehiclesServiceStub,
  WindowRefServiceStub,
} from '../../testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let routeStub: ActivatedRouteStub;
  let routerStub: RouterStub;
  let sessionServiceStub: SessionServiceStub;
  let locationsServiceStub: LocationsServiceStub;
  let departmentsServiceStub: DepartmentsServiceStub;
  let vehiclesServiceStub: VehiclesServiceStub;
  let user: User;
  let mdp: MaterialDashboardProService;

  beforeEach(async(() => {
    routeStub = new ActivatedRouteStub();
    routerStub = new RouterStub();
    sessionServiceStub = new SessionServiceStub();
    locationsServiceStub = new LocationsServiceStub();
    departmentsServiceStub = new DepartmentsServiceStub();
    vehiclesServiceStub = new VehiclesServiceStub();

    user = {isAdmin: false};
    spyOn(sessionServiceStub, 'getUser').and.returnValue(user);
    spyOn(sessionServiceStub, 'onReset').and.returnValue(Observable.of(1));

    const windowRef = new WindowRefServiceStub();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'initMdp');

    TestBed.configureTestingModule({
      declarations: [
        UserComponent,
        RouterOutletStubComponent,
        RouterLinkStubDirective,
        RouterLinkActiveStubDirective
      ],
      providers: [
        {provide: ActivatedRoute, useValue: routeStub},
        {provide: Router, useValue: routerStub},
        {provide: SessionService, useValue: sessionServiceStub},
        {provide: LocationsService, useValue: locationsServiceStub},
        {provide: DepartmentsService, useValue: departmentsServiceStub},
        {provide: VehiclesService, useValue: vehiclesServiceStub},
        NotificationService,
        LangService,
        {provide: MaterialDashboardProService, useValue: mdp}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.activatedRouteData = {
      title: 'User'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
