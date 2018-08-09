import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models';
import {
  UsersService,
  SessionService,
  NotificationService
} from '../../shared/services';

@Component({
  selector: 'nb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;
  isBusy: boolean = false;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
  }

  onUserFormDone(event: any) {
    let user = <User>event;
    this.updateUser(user);
  }

  onChangePasswordDone(event: string) {
    this.changePassword(event);
  }

  updateUser(user: User) {
    this.isBusy = true;
    this.usersService.update(user,'')
      .subscribe(
      data => {
        this.isBusy = false;
        this.notificationService.notifySuccess('Profile updated successfully!');
        this.user = <User>user;
        this.sessionService.setUser(this.user);
      },
      error => {
        this.isBusy = false;
        this.notificationService.notifyError('Profile failed to update!');
      }
      );

  }

  changePassword(password: string) {
    this.isBusy = true;
    this.usersService.changePassword(this.user.userKey, password)
      .subscribe(
      data => {
        this.isBusy = false;
        this.notificationService.notifySuccess('Password updated successfully!');
      },
      error => {
        this.isBusy = false;
        this.notificationService.notifyError('Change Password failed!');
      }
      );
  }


}
