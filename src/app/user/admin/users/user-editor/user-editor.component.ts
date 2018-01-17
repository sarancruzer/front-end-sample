import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { User } from './../../../../models';
import {
  UsersService,
  SessionService,
  NotificationService,
  MaterialDashboardProService,
} from './../../../../shared/services';
import ModelToJsonTransformers from './../../../../utils/model.to.json';

@Component({
  selector: 'nb-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit, OnChanges {

  @Input() user: User;

  @Input() visible: boolean;

  @Output() shown: EventEmitter<boolean>;

  @Output() hidden: EventEmitter<boolean>;

  @Output() update: EventEmitter<User>;

  modal: any;

  buttonText: string;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private mdp: MaterialDashboardProService
  ) {
    this.visible = false;
    this.shown = new EventEmitter<boolean>();
    this.hidden = new EventEmitter<boolean>();
    this.update = new EventEmitter<User>();
    this.buttonText = 'Create';
  }

  setBTAsUpdate() {
    this.buttonText = 'Update';
  }

  setBTAsCreate() {
    this.buttonText = 'Create';
  }

  ngOnInit() {
    const modal = jQuery('#userEditor');
    if (modal) {
      this.modal = (<any>modal);
      this.modal.appendTo('body');
      this.modal.on('shown.bs.modal', () => this.shown.emit(true));
      this.modal.on('hidden.bs.modal', () => this.hidden.emit(true));
    }
    this.mdp.initMdp();
  }

  ngOnChanges() {
    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }

    // reset user
    if (!this.user) {
      this.user = this.createUser();
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

  onUserFormDone(event: any) {
    const user: User = <User>event;
    user.isAdmin = this.user.isAdmin;

    if (!user.userKey) {
      this.usersService.create(user).subscribe(
        data => {
          user.userKey = data.user_key;
          this.update.emit(user);
          this.user = null;
          this.hide();
        },
        err => {
          console.log(err)
          this.notificationService.notifyError('Email already registered!');
        }
      );
    } else {
      this.usersService.updateUser(user).subscribe(
        data => {
          this.update.emit(user);
          this.hide();
        },
        err => {
         
          this.notificationService.notifyError('Failed to update the user');
        }
      );
    }
  }

  private createUser(): User {
    return {
      isAdmin: false
    };
  }

}
