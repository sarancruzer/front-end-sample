import { Injectable, Inject } from '@angular/core';

import { WindowRefService } from './window-ref.service';

@Injectable()
export class WialonService {

  private dns: String = 'https://hosting.wialon.com';

  private api: String = 'https://hst-api.wialon.com';

  private wialon: any;

  private session: any;

  private units: any[];

  private loggedIn: Boolean;

  constructor(
    private windowRef: WindowRefService
  ) {
    this.wialon = windowRef.nativeWindow['wialon'];

    if (this.wialon && this.wialon.core && this.wialon.core.Session) {
      this.session = this.wialon.core.Session.getInstance();
    }

    this.units = [];

    this.loggedIn = false;
  }

  getLoginUrl(redirectUri?: String): String {
    let url = this.dns + '/login.html';
    url += '?client_id=' + 'WorldTrack Booking';
    url += '&access_type=' + 0x100;	// 0x100 = 'Online tracking only'
    url += '&activation_time=' + 0;	// 0 = immediately
    url += '&duration=' + 0; // 0 = unlimited
    url += '&flags=' + 0x1; // 0x1 = add username in response

    url += '&redirect_uri=' + (redirectUri ? redirectUri : this.dns + '/post_token.html');

    return url;
  }

  private init() {
    if (!this.session) {
      throw new Error('Wialon session is not available!');
    }

    this.session.initSession(this.api);
  }

  loginToken(token: string): Promise<any> {
    this.init();

    return new Promise<any>((resolve, reject) => {
      this.session.loginToken(
        token,
        code => {
          if (code) {
            let msg = 'Failed to login due to: ' + this.wialon.core.Errors.getErrorText(code);
            return reject(msg);
          }

          this.loggedIn = true;
          resolve(true);
        }
      );
    });
  }

  loadLibrary(name: string) {
    if (!this.session) {
      throw new Error('Wialon session is not available!');
    }

    this.session.loadLibrary(name);
  }

  fetchUnits(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      // if we have cached units, return them
      if (this.units.length) {
        return resolve(this.units);
      }

      // load items to current session
      let flags = this.wialon.item.Item.dataFlag.base;
      this.session.updateDataFlags(
        [{type: 'type', data: 'avl_unit', flags: flags, mode: 0}],
        (code) => {
          if (code) {
            let msg = 'Failed to fetch units from Wialon due to: '
              + this.wialon.core.Errors.getErrorText(code)
            ;
            return reject(msg);
          }

          this.units = this.session.getItems('avl_unit');
          resolve(this.units);
        }
      );
    });
  }

  fetchUnitById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Unit id is not defined!');
      }

      let flags = this.wialon.item.Unit.dataFlag.lastMessage;
      this.session.updateDataFlags(
        [{type: 'id', data: id, flags: flags, mode: 1}],
        (code) => {
          if (code) {
            let msg = 'Failed to fetch unit with id '
              + id
              + ' from Wialon due to: '
              + this.wialon.core.Errors.getErrorText(code)
            ;
            return reject(msg);
          }

          let unit = this.session.getItem(id);
          if(!unit) {
            let msg = 'Got no unit for id ' + id;
            return reject(msg);
          }

          resolve(unit);
        }
      );
    });
  }

  logout() {
    if (!this.wialon || !this.session) {
      return;
    }

    if (!this.session.getId()) {
      return;
    }

    this.session.logout(() => {
      this.units = [];
      this.loggedIn = false;
    });
  }

  isLoggedIn(): Boolean {
    return this.loggedIn;
  }

}
