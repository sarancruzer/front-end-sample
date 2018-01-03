/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NotificationService,
  MaterialDashboardProService,
  LangService,
  WindowRefService,
} from './../services';
import { AdminFormComponent } from './admin-form.component';

describe('AdminFormComponent', () => {
  let component: AdminFormComponent;
  let fixture: ComponentFixture<AdminFormComponent>;
  let mdp: MaterialDashboardProService;

  beforeEach(async(() => {
    const windowRef = new WindowRefService();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'initMdp');

    TestBed.configureTestingModule({
      imports : [ ReactiveFormsModule ],
      declarations: [ AdminFormComponent ],
      providers: [
        {provide: MaterialDashboardProService, useValue: mdp},
        NotificationService,
        LangService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormComponent);
    component = fixture.componentInstance;
    component.admin = {
      name: '',
      email: '',
      phone: '',
      department: '',
      jobTitle: '',
      password: '',
      termsAccepted: true,
      isAdmin: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
