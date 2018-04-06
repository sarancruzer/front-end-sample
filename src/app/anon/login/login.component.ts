import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../../models';
import { NotificationService, AuthenticationService, SessionService } from './../../shared/services';
import JsonToModelTransformers from '../../utils/json.to.model';

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isBusy: boolean = false;
  user: User;
  popupToggler: boolean;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private sessionService: SessionService,
  ) {
    this.popupToggler = false;
    let curUser = this.sessionService.getUser();
    if (curUser) {
      this.router.navigate(['/me/book-vehicle']);
    }
  }

  onPopupShown() {
    this.popupToggler = true;
  }

  onPopupHidden() {
    this.popupToggler = false;
  }

  login(f: NgForm) {
    let form: any = f.value;
    this.isBusy = true;
    this.authService.login(form.email, form.password)
      .subscribe(
        data => {
          this.isBusy = false;

          this.user = JsonToModelTransformers.jsonToUser(data);
          this.sessionService.setUser(this.user);

          if (this.user.isAdmin && data.organisation) {
            let organisation = JsonToModelTransformers.jsonToOrganisation(data.organisation);
            this.sessionService.setOrganisation(organisation);
          }

          this.notificationService.notifySuccess('Logged in successfully!');

          let isFirstTimeLogin: string = data.is_first_time_login;
          if (isFirstTimeLogin) {
            this.router.navigate(['/me/settings']);
          } else if (this.sessionService.getRedirectUrl()) {
            this.router.navigate([this.sessionService.getRedirectUrl()]);
          } else {
            this.router.navigate(['/me/book-vehicle']);
          }
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError('Login failed! Please try again.');
        }
      );
  }

}
