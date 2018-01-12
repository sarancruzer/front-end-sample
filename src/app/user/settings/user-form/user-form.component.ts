import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { User } from '../../../models';
import {
  DepartmentsService,
  NotificationService,
  SessionService,
  LangService,
} from '../../../shared/services';
import { SelectDepartmentComponent } from './select-department/select-department.component';

@Component({
  selector: 'nb-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() user: User;

  @Input() buttonText: string;

  @Output() done: EventEmitter<any>;

  @ViewChild(SelectDepartmentComponent)
  private selectDepartmentComponent: SelectDepartmentComponent;

  departments: any;

  userForm: FormGroup;

  loggedInUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private departmentsService: DepartmentsService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.done = new EventEmitter<any>();
    this.loggedInUser = this.sessionService.getUser();
  }

  ngOnInit() {
    this.getDepartments();
    this.buildForm();
  }

  getDepartments() {
    this.departmentsService.list().subscribe(
      data => {
        this.departments = data;
      },
      error => {
        this.notificationService.notifyError(this.lang.get('err_failed_fetching_departments'));
      }
    );
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      'initials': [this.user.initials, [
        ]
      ],
      'name': [this.user.name, [
        ]
      ],
      'email': [this.user.email, [
          Validators.required, Validators.pattern('.+@.+')
        ]
      ],
      'phone': [this.user.phone, [
        ]
      ],
      'department': [this.user.department, [
        ]
      ],
      'jobTitle': [this.user.jobTitle, [
        ]
      ]
    });

    // disable the `Job Title` field if logged in user is not an admin
    if (!this.loggedInUser.isAdmin) {
      this.userForm.get('jobTitle').disable();
    }
  }

  ngOnChanges() {
    this.buildForm();
    if (this.selectDepartmentComponent && this.user.department) {
      // TODO: we have to find a way to set user's department (if exists) as default department in the
      // departments dropdown list. Current approach is not working.
      this.selectDepartmentComponent.setPreviousDepartment(this.user.department);
    }
  }

  onSubmit() {
    const user = this.userForm.value;
    user.userKey = this.user.userKey;
    user.isAdmin = this.user.isAdmin;
    this.done.emit(user);
  }

  onSelectDeperatmentDone(event: any) {
    this.user.department = event.name;
    this.userForm.patchValue({ department: event.name });
  }
}
