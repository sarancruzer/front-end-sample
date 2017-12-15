/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChunkPipe } from '../pipes';
import { VehicleType } from '../../models';
import { VehicleTypesChooserComponent } from './vehicle-types-chooser.component';
import {
  VehicleTypesService,
  MaterialDashboardProService,
  WindowRefService,
} from '../services';

describe('VehicleTypesChooserComponent', () => {
  let component: VehicleTypesChooserComponent;
  let fixture: ComponentFixture<VehicleTypesChooserComponent>;
  let mdp: MaterialDashboardProService;

  beforeEach(async(() => {
    const windowRef = new WindowRefService();
    mdp = new MaterialDashboardProService(windowRef);
    spyOn(mdp, 'enablePerfectScrollbar');
    spyOn(mdp, 'initMdp');
    spyOn(mdp, 'isWindows').and.returnValue(false);

    TestBed.configureTestingModule({
      declarations: [ VehicleTypesChooserComponent, ChunkPipe ],
      providers: [
        VehicleTypesService,
        {provide: MaterialDashboardProService, useValue: mdp}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypesChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#toggleChoice() should output the choices', () => {
    let choices: VehicleType[];
    component.chosen.subscribe((result: VehicleType[]) => {
      choices = result;
    });
    const t = component.vehicleTypes[0];
    component.toggleChoice(t);
    expect(choices).toEqual([t]);
  });

  it('#toggleChoice() should output the choices when unchoosing', () => {
    let choices: VehicleType[];
    component.chosen.subscribe((result: VehicleType[]) => {
      choices = result;
    });

    const t = component.vehicleTypes[0];
    component.toggleChoice(t);
    expect(choices).toEqual([t]);

    component.toggleChoice(t);
    expect(choices).toEqual([]);
  });

});
