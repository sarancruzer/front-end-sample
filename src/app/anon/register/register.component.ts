import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Organisation,
  AdminRegistrationData,
  User
} from '../../models';
import {
  NotificationService,
  OrganisationService,
  SessionService
} from '../../shared/services';
import JsonToModelTransformers from '../../utils/json.to.model';

@Component({
  selector: 'nb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  forms: any;

  organisation: Organisation;

  admin: AdminRegistrationData;

  user: User;

  isBusy: boolean;

  constructor(
    private notificationService: NotificationService,
    private organisationService: OrganisationService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.organisation = {};

    this.user = {
      isAdmin: true
    };

    this.isBusy = false;

    this.admin = {
      isAdmin: true,
      termsAccepted: true
    };

    this.forms = {
      organisation: true,
      admin: false
    };
  }

  ngAfterViewInit() {
  }

  
  // onOrganisationFormDone(event: any) {
  //   this.organisation = <Organisation>event;
  //   this.forms.organisation = false;
  //   this.forms.admin = true;
  // }

  // onAdminFormDone(event: any) {
  //   this.admin = <AdminRegistrationData>event;
  //   this.forms.admin = false;
  //   this.doRegister();
  // }

  // private doRegister() {
  //   this.isBusy = true;
  //   this.organisationService.create(this.organisation, this.admin)
  //     .subscribe(
  //       data => {
  //         this.isBusy = false;

  //         this.organisation.key = data.organisation_key;

  //         this.user = <User>this.admin;
  //         this.user.userKey = data.admin_key;
  //         this.user.isAdmin = true;

  //         this.sessionService.setOrganisation(this.organisation);
  //         this.sessionService.setUser(this.user);

  //         this.notificationService.notifySuccess('You have been successfully registered.');

  //         this.router.navigate(['/me/admin/organisation']);
  //       },
  //       error => {
  //         this.isBusy = false;
  //         let temp =error.json()
  //         let msg = 'Registration was not possible due to an error! Please try again. '
  //           + ' Error to report:' + temp.error.message;
  //         // console.log(temp.error.message)
  //         this.notificationService.notifyError(msg);
  //         this.forms.organisation = true;
  //       }
  //     );
  // }
}
