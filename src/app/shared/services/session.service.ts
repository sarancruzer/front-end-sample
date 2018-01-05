import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Organisation, User } from '../../models';
import { stringify } from '@angular/core/src/util';

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

  getUserLogged(){

    if(localStorage.getItem('user')=='1'){
      
      return true;

    }else{

      return false;

    }

  }

  getUser(): User {
   if (!(this.user)) {
    var tempUser  = JSON.parse(localStorage.getItem('user'));
    this.user     = tempUser;
    console.log(this.user);
    } 
    return this.user;
  }

  setOrganisation(org: Organisation) {
    if(org){

      localStorage.setItem("org",JSON.stringify(org));

    }else{

      localStorage.setItem("org","");

    }
    this.organisation = org;
  }

  getOrganisation(): Organisation {

    if(!(this.organisation)){    
      var tempUser  = JSON.parse(localStorage.getItem('org'));
      this.organisation     = tempUser;
      console.log(this.organisation);
    }
    
    return this.organisation;

  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

}
