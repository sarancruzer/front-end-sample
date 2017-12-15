import { Subscription }   from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Notification, NotificationType } from './notification';
import { NotificationService } from './../services';

@Component({
  selector: 'nb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: Notification[];

  subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notifications = [];

    this.subscription = notificationService.notifier.subscribe(notification => {
      if (notification.sticky) {
        this.notifications.push(notification);
      } else {
        this.bootstrapNotify(notification);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setClasses(notification: Notification) {
    let classes = {
      'alert-info': notification.type === NotificationType.Info,
      'alert-success': notification.type === NotificationType.Success,
      'alert-warning': notification.type === NotificationType.Warning,
      'alert-danger': notification.type === NotificationType.Error,
      'alert-with-icon': notification.icon
    };

    return classes;
  }

  remove(notification: Notification) {
    for (let i = 0; i < this.notifications.length; i++) {
      let element = this.notifications[i];
      if (element.message === notification.message) {
        this.notifications.splice(i, 1);

        return;
      }
    }
  }

  private bootstrapNotify(notification: Notification) {
    (<any>$).notify({
      message: notification.message,
      icon: notification.icon
    }, {
      type: (notification.type === NotificationType.Error)
        ? 'danger'
        : NotificationType[notification.type].toLowerCase(),
      delay: 4000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }
}
