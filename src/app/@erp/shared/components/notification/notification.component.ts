import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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

  isNotification: boolean;

  constructor(
    private _notificationService: NotificationService
  ) {
    this.isNotification = _notificationService.isNotification;
  }
  
  close(){
    this.isNotification = false
  }

}
