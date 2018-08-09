import { Observable } from 'rxjs/Rx';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Department } from '../../../../models';
import {
  DepartmentsService,
} from '../../../../shared/services';

@Component({
  selector: 'nb-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.css']
})
export class SelectDepartmentComponent implements OnInit {

  @Output() done: EventEmitter<any>;

  departments: Department[];

  selectedDepartment: Department;

  isBusy: boolean;

  constructor(
    private departmentsService: DepartmentsService
  ) {
    this.done = new EventEmitter<any>();
    this.departments = [];
    this.isBusy = false;
  }

  ngOnInit() {
    this.getDepartments();

    (<any>$)('.selectpicker').selectpicker();

  }

  getDepartments() {
    // if (this.departments.length > 0) {
    //   this.selectedDepartment = this.departments[0];
    //   return;
    // }

    this.isBusy = true;
    this.departmentsService.getAll().subscribe(
      data => {
        this.isBusy = false;
        this.departments = data['result']['info'];
        console.log(this.departments);
        this.selectedDepartment = this.departments[0];
      },
      error => {
        this.isBusy = false;
      }
    );
  }

  setPreviousDepartment(departmentName: string) {
    if (departmentName === '' || departmentName === undefined || departmentName == null) {
      this.selectedDepartment = null;
    } else {
      for (const department of this.departments) {
        if (department.name === departmentName) {
          this.selectedDepartment = department;
        }
      }
    }
  }

  onChangeDepartment(event: Department) {
    this.selectedDepartment = event;
    this.done.emit(this.selectedDepartment);
  }
}
