import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { SessionService } from './../../shared/services';

@Injectable()
export class UserGuardService implements CanActivate, CanActivateChild {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionService.getUser()) {
      return true;
    }

    this.sessionService.setRedirectUrl(state.url);
    this.router.navigate(['/']);

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
