import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
  NotificationService,
  OrganisationService,
  SessionService,
  WialonService,
  WindowRefService,
  LangService,
} from './../../../../shared/services';

@Component({
  selector: 'nb-wialon-integrator',
  templateUrl: './wialon-integrator.component.html',
  styleUrls: ['./wialon-integrator.component.css']
})
export class WialonIntegratorComponent implements OnInit {

  @Output() integrated: EventEmitter<String>;

  wialonAccessToken: String;

  isBusy: Boolean;

  private window: Window;

  constructor(
    private notificationService: NotificationService,
    private organisationService: OrganisationService,
    private sessionService: SessionService,
    private wialonService: WialonService,
    private windowRef: WindowRefService,
    private lang: LangService
  ) {
    this.window = windowRef.nativeWindow;

    this.integrated = new EventEmitter<String>();

    this.isBusy = false;

    if (this.sessionService.getOrganisation()) {
      this.wialonAccessToken = this.sessionService.getOrganisation().wialon_token;
    }
  }

  ngOnInit() {
  }

  integrate() {
    const url = this.wialonService.getLoginUrl();

    this.window.addEventListener('message', event => this.tokenReceived(event));

    this.window.open(
      url.toString(),
      '_blank',
      'width=760, height=500, top=30, left=50');
  }

  private tokenReceived(event: any) {
    if (this.wialonAccessToken) {
      return;
    }

    try {
      const msg: string = <string>event.data;
      if (msg.indexOf('access_token=') === -1) {
        return;
      }

      const token = msg.replace('access_token=', '');
      if (!token.length) {
        return;
      }

      this.wialonAccessToken = token;

      this.storeToken(token);
    } catch (error) {
      this.notificationService.notifyError(this.lang.get('err_wialon_access_token'));
    }
  }

  private storeToken(token: string) {
    this.isBusy = true;
    this.organisationService.updateWialonAccessToken(token)
      .subscribe(
        response => {
          this.isBusy = false;
          if (this.sessionService.getOrganisation()) {
            this.sessionService.getOrganisation().wialon_token = token;
          }
          this.notificationService.notifySuccess(this.lang.get('msg_wialon_token_stored'));
          this.integrated.emit(token);
        },
        error => {
          this.isBusy = false;
          this.notificationService.notifyError(this.lang.get('err_storing_wialon_token'));
        }
      )
    ;
  }

}
