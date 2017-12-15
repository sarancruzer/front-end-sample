/* tslint:disable:no-unused-variable */
import { Observable } from 'rxjs/Rx';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SelectDepartmentComponent } from './select-department.component';
import {
  DepartmentsService
} from '../../../../shared/services';

import {
  DepartmentsServiceStub,
} from '../../../../../testing';

describe('SelectDepartmentComponent', () => {
  let component: SelectDepartmentComponent;
  let fixture: ComponentFixture<SelectDepartmentComponent>;

  beforeEach(async(() => {
    const departmentsServiceStub = new DepartmentsServiceStub();
    spyOn(departmentsServiceStub, 'list').and.returnValue(Observable.from([]));

    TestBed.configureTestingModule({
      declarations: [SelectDepartmentComponent],
      providers: [
        { provide: DepartmentsService, useValue: departmentsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
