import { Observable, Subscription } from 'rxjs/Rx';

import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Data,
  Event,
  NavigationEnd
} from '@angular/router';

import { User } from './../models';
import {
  DepartmentsService,
  LocationsService,
  NotificationService,
  SessionService,
  VehiclesService,
  LangService,
  MaterialDashboardProService,
} from './../shared/services';
import { ConfirmPopupComponent } from './../shared/confirm-popup/confirm-popup.component';

@Component({
  selector: 'nb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {

  activatedRouteData: Data;

  departmentListSubscription: Subscription;

  user: User;

  year: number;

  confirmLogoutTitle: string;

  confirmLogoutMsg: string;

  @ViewChild(ConfirmPopupComponent)
  private confirmPopupComponent: ConfirmPopupComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private departmentsService: DepartmentsService,
    private locationsService: LocationsService,
    private vehiclesService: VehiclesService,
    private lang: LangService,
    private mdp: MaterialDashboardProService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.updateActivatedRouteData();
        this.mdp.scrollToTop();
      }
    });

    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.updateActivatedRouteData();
    this.user = this.sessionService.getUser();

    if (this.user.isAdmin) {
      this.notifyAdmin();
    }
  }

  ngAfterViewInit() {
    this.confirmLogoutTitle = this.lang.get('ttl_confirm_logout');
    this.confirmLogoutMsg = this.lang.get('msg_confirm_logout');
  }

  ngOnDestroy() {
    if (this.departmentListSubscription) {
      this.departmentListSubscription.unsubscribe();
    }
  }

  logout() {
    this.confirmPopupComponent.show();
  }

  onLogoutConfirmed() {
    this.sessionService.reset(new Date().getTime());
    const msg = this.lang.get('msg_logged_out');
    this.router.navigate(['/']).then(() => {
      this.notificationService.notifySuccess(msg);
    });
  }

  private updateActivatedRouteData() {
    const childRoute = this.route.firstChild;
    if (!childRoute) {
      return;
    }

    childRoute.data
      .subscribe((data: Data) => this.activatedRouteData = data);

    const grandChildRoute = childRoute.firstChild;
    if (!grandChildRoute) {
      return;
    }

    grandChildRoute.data.subscribe((data: Data) => this.activatedRouteData = data);
  }

  private notifyAdmin() {
    // notify if organisation has no departments
    this.departmentsService.list()
    .subscribe(list => {
      if (list && list.length === 0) {
        const msg = this.lang.get('msg_no_departments');
        this.notificationService.notifyWarning(msg, true);
      }
    });

    // notify if organisation has no locations
    this.locationsService.list().subscribe(
      list => {
        if (list && list.length === 0) {
          const msg = this.lang.get('msg_no_locations');
          this.notificationService.notifyWarning(msg, true);
        }
      },
      error => { /* ignore */ }
    );

    // notify if organisation has no vehicles
    let vehiclesCount = 0;
    this.vehiclesService.list().subscribe(
      list => {
        if (list.length === 0) {
          return this.vehiclesService.fetch();
        }

        vehiclesCount = list.length;
      },
      error => {},
      () => {
        if (vehiclesCount > 0) {
          return;
        }

        const msg = this.lang.get('msg_no_vehicles');
        this.notificationService.notifyWarning(msg, true);
      }
    );
  }

}
