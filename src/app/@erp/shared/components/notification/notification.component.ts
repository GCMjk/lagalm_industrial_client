import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

import { INotification } from '@erp-core/interfaces/common/notification.interface';
import { NotificationService } from '@erp-core/services/common/notification.service';

@Component({
  selector: 'erp-notification',
  templateUrl: './notification.component.html',
  animations: [ 
    trigger('opacityTranslateY', [
      transition(':enter', [
        style({ transform: 'translateY(0.5rem)', opacity: 0 }),
        animate('300ms ease-out', style({  transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('100ms ease-in', style({ transform: 'translateY(0.5rem)', opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent {

  notification: Observable<INotification>;

  constructor(
    public _notificationService: NotificationService
  ) {
    this.notification = _notificationService.notificationObservable;
  }

}
