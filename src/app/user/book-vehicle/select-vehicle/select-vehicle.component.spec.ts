/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import {
  ChunkPipe,
  LocationPipe,
} from './../../../shared/pipes';
import { SelectVehicleComponent } from './select-vehicle.component';
import { VehicleCardComponent } from './../../../shared/vehicle-card/vehicle-card.component';

describe('SelectVehicleComponent', () => {
  let component: SelectVehicleComponent;
  let fixture: ComponentFixture<SelectVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MomentModule ],
      declarations: [
        SelectVehicleComponent,
        VehicleCardComponent,
        ChunkPipe,
        LocationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
