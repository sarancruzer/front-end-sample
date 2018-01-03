import { Observable, Subscription } from 'rxjs';

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Department } from './../../../../models';
import {
  DepartmentsService,
  NotificationService,
  LangService,
} from './../../../../shared/services';

@Component({
  selector: 'nb-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments: Department[];

  private departmentListSubscription: Subscription;

  isBusy: boolean;

  constructor(
    private departmentService: DepartmentsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.departments = [];
    this.isBusy = false;
  }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.isBusy = true;
    this.departmentListSubscription = this.departmentService.collection
      .subscribe(
        data => {
          this.isBusy = false;
          this.departments = data;
        },
        err => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_failed_fetching_departments'));
        }
      )
    ;
  }

  loadMore() {
    this.isBusy = true;
    this.departmentService.fetch();
  }

  hasMore() {
    return this.departmentService.hasMore();
  }

  onUpdated(departments: Department[]) {
    this.isBusy = true;
    let result: Observable<any>;

    let creators = this.createDepartments(departments);
    let deleters = this.deleteDepartments(departments);

    if (creators) {
      result = creators;
    }

    if (result && deleters) {
      result = result.concat(deleters);
    } else if (deleters) {
      result = deleters;
    }

    if (!result) {
      this.isBusy = false;

      return this.notificationService.notifyInfo(this.lang.get('msg_nothing_to_save'));
    }

    result.subscribe(
      data => {},
      error => {
        this.isBusy = false;
        this.departments = departments;
      },
      () => {
        this.getDepartments();
      }
    );
  }

  private createDepartments(departments: Department[]): Observable<any> {
    let resultSeq: Observable<any>;

    let newDepartments = departments.filter(
      department => !(department instanceof Department)
    );

    for (let newDepartment of newDepartments) {
      let department: Department = new Department();
      department.name = newDepartment.value;
      let source = this.departmentService.create(department);
      let hot = source.publish();

      hot.subscribe(
        data => {
          let msg = this.lang.get('msg_departments_saved');
          msg = msg ? msg.replace('{department}', department.name) : '';
          this.notificationService.notifySuccess(msg);
        },
        error => {
          let msg = this.lang.get('err_failed_saving_department');
          msg = msg ? msg.replace('{department}', department.name) : '';
          let err = this.lang.get('err_details_department');
          err = err ? err.replace('{err_msg}', error.status) : '';
          msg += '<br />' + err;
          this.notificationService.notifyError(msg);
        }
      );

      resultSeq = resultSeq ? resultSeq.concat(hot) : hot;
      hot.connect();
    }

    return resultSeq;
  }

  private deleteDepartments(departments: Department[]): Observable<any> {
    let resultSeq: Observable<any>;

    for (let department of this.departments) {
      if (departments.indexOf(department) === -1 && department.key) {
        let source = this.departmentService.delete(department);
        let hot = source.publish();

        hot.subscribe(
          data => {
            let msg = this.lang.get('msg_department_deleted');
            msg = msg ? msg.replace('{department}', department.name) : '';
            this.notificationService.notifySuccess(msg);
          },
          error => {
            let msg = this.lang.get('err_failed_deleting_department');
            let err = this.lang.get('err_details_department');
            err = err ? err.replace('{err_msg}', error.status) : '';
            msg += '<br />' + err;

            this.notificationService.notifyError(msg);
          }
        );

        resultSeq = resultSeq ? resultSeq.concat(hot) : hot;
        hot.connect();
      }
    }

    return resultSeq;
  }

  ngOnDestroy() {
    if (this.departmentListSubscription) {
      this.departmentListSubscription.unsubscribe();
    }
  }

}
