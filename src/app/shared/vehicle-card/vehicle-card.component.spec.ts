/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';

import { Location } from './../../models';
import { LocationPipe } from './../pipes';
import { VehicleCardComponent } from './vehicle-card.component';

describe('VehicleCardComponent', () => {
  let component: VehicleCardComponent;
  let fixture: ComponentFixture<VehicleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleCardComponent,
        LocationPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCardComponent);
    component = fixture.componentInstance;

    const location: Location = {
      key: 'loc-key',
      name: 'loc'
    };

    component.vehicle = {
      image: null,
      manufacturer: 'foo',
      model: 'bar',
      key: 'k',
      isAvailable: true,
      location: location,
      type: {
        id: 1,
        key: 'EL',
        name: 'Electric'
      },
      vehicleId: 'IF 1988'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show image based on vehicle type if vehicle does not have image', () => {
    const el = fixture.debugElement.query(By.css('img'));
    expect(el.nativeElement.src).toContain('assets/img/el.png');
  });

  it('should show image of the vehicle if one is provided', () => {
    component.vehicle.image = 'https://example.com/serving-img';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('img'));
    expect(el.nativeElement.src).toEqual(component.vehicle.image);
  });

  it('should show vehicle location (object)', () => {
    const elements = fixture.debugElement.queryAll(By.css('p.category'));
    expect(elements.length).toEqual(2);
    expect(elements[1].nativeElement.textContent).toContain('loc');
  });

  it('should show vehicle location (string)', () => {
    component.vehicle.location = 'bar';
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('p.category'));
    expect(elements.length).toEqual(2);
    expect(elements[1].nativeElement.textContent).toContain('bar');
  });

});
