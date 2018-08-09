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
    // let curUser = this.sessionService.getUser();
    // if (curUser) {
    //   this.router.navigate(['/me/book-vehicle']);
    // }

    const curUser = localStorage.getItem("authentication");
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

          const res = data.result;

          this.user = res.info
          localStorage.setItem('token','Bearer '+res.token);
          //localStorage.setItem('user',JSON.stringify(res.info));
          localStorage.setItem("authentication",JSON.stringify(true));
          localStorage.setItem("user_type",res.info.user_type);


         // this.user = JsonToModelTransformers.jsonToUser(data);
          this.sessionService.setUser(this.user);
          console.log("ress");
          console.log(res.organisation);

          if (res.organisation !== null) {
            let organisation = res.organisation
            this.sessionService.setOrganisation(organisation);
          }

          if (res.localadmin !== null) {
            let localadmin = res.localadmin
            this.sessionService.setLocalAdmin(localadmin);
          }

          this.notificationService.notifySuccess('Logged in successfully!');

          let isFirstTimeLogin: string = res.info.is_first_time_login;
          if (isFirstTimeLogin) {
            this.router.navigate(['/me/settings']);
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
