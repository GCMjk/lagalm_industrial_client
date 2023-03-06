import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { INotification } from '@erp-core/interfaces/common/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationObservablePrivate: BehaviorSubject<INotification> = new BehaviorSubject<INotification>({
    title: 'Titulo de la notificación',
    text: 'Texto de la notificación',
    icon: 'info'
  });

  isNotification = false;
  constructor() { }

  close(){
    this.isNotification = false
  }

  get notificationObservable() {
    return this.notificationObservablePrivate.asObservable();
  }

  notificationObservableData(notification: INotification) {
    this.notificationObservablePrivate.next(notification);
    this.isNotification = true;
  }

}
