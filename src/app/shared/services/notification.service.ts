import { Subject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Notification, NotificationType } from './../notification/notification';

@Injectable()
export class NotificationService {

  private notifications = new Subject<Notification>();

  notifier: Observable<Notification> = this.notifications.asObservable();

  constructor() {}

  notifyInfo(msg: string, sticky: boolean = false) {
    this.doNotify({
      message: msg,
      type: NotificationType.Info,
      icon: 'info_outline',
      sticky: sticky
    });
  }

  notifySuccess(msg: string, sticky: boolean = false) {
    this.doNotify({
      message: msg,
      type: NotificationType.Success,
      icon: 'check',
      sticky: sticky
    });
  }

  notifyWarning(msg: string, sticky: boolean = false) {
    this.doNotify({
      message: msg,
      type: NotificationType.Warning,
      icon: 'warning',
      sticky: sticky
    });
  }

  notifyError(msg: string, sticky: boolean = false) {
    this.doNotify({
      message: msg,
      type: NotificationType.Error,
      icon: 'error_outline',
      sticky: sticky
    });
  }

  private doNotify(notification: Notification) {
    this.notifications.next(notification);
  }

}
