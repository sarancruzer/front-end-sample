/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OrganisationFormComponent } from './organisation-form.component';

describe('OrganisationFormComponent', () => {
  let component: OrganisationFormComponent;
  let fixture: ComponentFixture<OrganisationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ OrganisationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationFormComponent);
    component = fixture.componentInstance;
    component.organisation = {
      name: '',
      website: '',
      phone: '',
      address: '',
      province: '',
      city: '',
      zipCode: '',
      country: '',
      numberOfEmployees: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
