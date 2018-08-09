import { Component, OnInit } from '@angular/core';

import { Organisation } from '../../../models';
import { SessionService,
  OrganisationService,
  NotificationService,
  LangService,
} from '../../../shared/services';

@Component({
  selector: 'nb-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

  organisation: Organisation;

  isBusy: boolean;

  constructor(
    private sessionService: SessionService,
    private organisationService: OrganisationService,
    private notificationService: NotificationService,
    private lang: LangService
  ) { }

  ngOnInit() {
     //this.organisation = this.sessionService.getOrganisation();
   
     this.organisation = this.sessionService.getOrganisation();
    
  }

  onOrganisationFormDone(event: any) {

    console.log(event);

    this.isBusy = true;
    this.organisation = <Organisation>event;
    this.organisationService.update(this.organisation).subscribe(
      data => {
        this.isBusy = false;        
        this.notificationService.notifySuccess(this.lang.get('msg_changes_saved'));
      },
      err => {
        this.isBusy = false;
        this.notificationService.notifyError(this.lang.get('err_failed_saving_changes'));
      }
    );
  }

  getOrgFormSubmitName(): string {
    return this.lang.get('org_save_changes');
  }
}
