import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Organisation, User } from '../../models';

@Injectable()
export class SessionService {

  private user: User;

  private organisation: Organisation;

  private redirectUrl: string;

  onReset = new Subject<number>();

  constructor() { }

  reset(date: number) {
    this.onReset.next(date);
    this.setUser(null);
    this.setOrganisation(null);
  }

  setUser(userObj: User) {
	if(userObj){

        localStorage.setItem("user",JSON.stringify(userObj));

    	}else{

        localStorage.setItem("user","");
        
    	}
    this.user = userObj;
  }

  getUser(): User {
    var tempUser  = JSON.parse(localStorage.getItem('user'));
    this.user     = tempUser;	
    return this.user;
  }

  setOrganisation(org: Organisation) {
    this.organisation = org;
  }

  getOrganisation(): Organisation {
    return this.organisation;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

}
