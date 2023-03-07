import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ViewService } from '@erp-core/services/common/view.service';
import { IView } from '@erp-core/interfaces/common/view.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'erp-view',
  templateUrl: './view.component.html',
  animations: [
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('translateX', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({  transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})
export class ViewComponent {

  public view$: Observable<IView>;

  constructor(
    public _viewService: ViewService
  ) {
    this.view$ = _viewService.viewObservable;
  }

}
