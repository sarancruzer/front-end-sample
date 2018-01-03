import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  NotificationService,
  UsersService
} from '../../shared/services';

@Component({
  selector: 'nb-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnChanges {

  @Input() visible: boolean;

  @Output() shown: EventEmitter<boolean>;

  @Output() hidden: EventEmitter<boolean>;

  @Output() done: EventEmitter<string>;

  private modal: any;

  email: string;

  constructor(
    private notificationService: NotificationService,
    private usersService: UsersService
  ) {
    this.visible = false;
    this.shown = new EventEmitter<boolean>();
    this.hidden = new EventEmitter<boolean>();
    this.done = new EventEmitter<string>();
    this.email = '';
  }

  ngOnInit() {
    let modal = jQuery('#forgetPasswordPopup');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
      this.modal.on('shown.bs.modal', () => this.shown.emit(true));
      this.modal.on('hidden.bs.modal', () => this.hidden.emit(true));
    }
  }

  ngOnChanges() {
    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    if (!this.modal) {
      return;
    }

    this.modal.modal({
      show: true,
      backdrop: 'static'
    });
  }

  hide() {
    if (!this.modal) {
      return;
    }

    this.modal.modal('hide');
  }

  isValid() {
    if (!this.email) {
      return false;
    }
    if (this.email.match(/.+@.+\..+/)) {
      return true;
    }
    return false;
  }

  onSubmit() {
    let email = this.email;
    this.usersService.sendPasswordResetLink(email).subscribe(
      data => {
        this.notificationService.notifySuccess('A password reset link has been sent to your email address. Please check your spam inbox if you do not receive the email within few minutes.');
      },
      err => {
        this.notificationService.notifyError(err.json().error.message);
      }
    );

    this.hide();
  }

}
