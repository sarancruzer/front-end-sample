import { LocalAdmin } from './../../models/local-admin';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Organisation, User } from '../../models';
import { stringify } from '@angular/core/src/util';

@Injectable()
export class SessionService {

  private user: User;

  private organisation: Organisation;

  private localAdmin: LocalAdmin;

  private redirectUrl: string;

  private wialontoken: string;

  onReset = new Subject<number>();

  constructor() { }

  reset(date: number) {
    this.onReset.next(date);
    this.setUser(null);
    this.setOrganisation(null);
    this.setLocalAdmin(null);
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

  // getUser(): User {
  //  if (!(this.user)) {
  //   if(localStorage.getItem('user')) {
  //   var tempUser  = JSON.parse(localStorage.getItem('user'));
  //   this.user     = tempUser;
  //   }else{
  //     this.user =null;
  //   }
  //   console.log(this.user);
  //   } 
  //   return this.user;
  // }

  getUser(): User {
    if (!(this.user)) {
     if(localStorage.getItem('user')) {
     var tempUser  = JSON.parse(localStorage.getItem('user'));
     this.user     = tempUser;
     }else{
       this.user =null;
     }
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
      this.organisation  = JSON.parse(localStorage.getItem('org'));
      console.log(this.organisation);
    }
    
    return this.organisation;

  }

  setWialonToken(wialontoken) {
    if(wialontoken){
      localStorage.setItem("wialontoken",wialontoken);
    }else{
      localStorage.setItem("wialontoken","");
    }
    this.wialontoken = wialontoken;
  }

  getWialonToken() {
    if(!(this.wialontoken)){    
      this.wialontoken  = localStorage.getItem('wialontoken');
      console.log(this.wialontoken);
    }    
    return this.wialontoken;
  }
  

  setLocalAdmin(localAdmin: Organisation) {
    if(localAdmin){

      localStorage.setItem("localAdmin",JSON.stringify(localAdmin));

    }else{

      localStorage.setItem("localAdmin","");

    }
    this.localAdmin = localAdmin;
  }

  getLocalAdmin(): Organisation {

    if(!(this.localAdmin)){    
      this.localAdmin  = JSON.parse(localStorage.getItem('localAdmin'));
      console.log(this.localAdmin);
    }
    
    return this.localAdmin;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

}
