import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminRegistrationData } from '../../models';
import {
  MaterialDashboardProService,
  NotificationService,
  LangService,
} from './../services';

@Component({
  selector: 'nb-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  @Input() admin: AdminRegistrationData;

  @Output() done: EventEmitter<AdminRegistrationData>;

  adminForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mdpService: MaterialDashboardProService,
    private notificationService: NotificationService,
    private lang: LangService
  ) {
    this.done = new EventEmitter<AdminRegistrationData>();
  }

  ngOnInit() {
    this.buildForm();
    this.mdpService.initMdp();
  }

  buildForm(): void {
    this.adminForm = this.formBuilder.group({
      'name': [this.admin.name, [
          Validators.required
        ]
      ],
      'email': [this.admin.email, [
          Validators.required
        ]
      ],
      'phone': [this.admin.phone, [
          Validators.required
        ]
      ],
      'jobTitle': [this.admin.jobTitle, []
      ],
      'password': [this.admin.password, [
          Validators.required
        ]
      ],
      'confirmPassword': ['', [
          Validators.required
        ]
      ],
      'termsAccepted': [this.admin.termsAccepted, [
          Validators.required
        ]
      ]
    });
  }

  isFormControlDirty(controlName: string): boolean {
    if (!this.adminForm) {
      return false;
    }

    const form = this.adminForm;
    const control = form.get(controlName);

    return control && control.dirty;
  }

  isFormControlValid(controlName: string): boolean {
    if (!this.adminForm) {
      return false;
    }

    const form = this.adminForm;
    const control = form.get(controlName);

    return control && control.valid;
  }

  onSubmit() {
    if (!this.isPasswordValid()) {
      const err = this.lang.get('err_pass_no_match');
      return this.notificationService.notifyError(err);
    }

    this.admin = this.adminForm.value;
    this.done.emit(this.admin);
  }

  private isPasswordValid(): boolean {
    const confirmPassword = this.adminForm.get('confirmPassword');
    if (!confirmPassword) {
      return false;
    }

    const password = this.adminForm.get('password');
    if (!password) {
      return false;
    }

    return confirmPassword.value
      && password.value
      && password.value === confirmPassword.value;
  }

}
