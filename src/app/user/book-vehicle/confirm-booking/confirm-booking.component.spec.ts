/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import { ConfirmBookingComponent } from './confirm-booking.component';
import { VehicleCardComponent } from './../../../shared/vehicle-card/vehicle-card.component';
import { LocationPipe } from '../../../shared/pipes';

describe('ConfirmBookingComponent', () => {
  let component: ConfirmBookingComponent;
  let fixture: ComponentFixture<ConfirmBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MomentModule ],
      declarations: [ 
        ConfirmBookingComponent,
        VehicleCardComponent,
        LocationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBookingComponent);
    component = fixture.componentInstance;

    component.vehicle = {
      image: 'assets/img/vehicle-image-tumbnail.png',
      manufacturer: 'foo',
      model: 'bar',
      key: 'l',
      isAvailable: true,
      location: {
        key: 'loc-key',
        name: 'Location'
      },
      type: {
        id: 1,
        key: 'EL',
        name: 'Electric'
      },
      vehicleId: 'Vehicle IV'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
