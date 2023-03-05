import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ViewService } from '@erp-core/services/common/view.service';
import { IView } from '@erp-core/interfaces/common/view.interface';

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
    ])
  ]
})
export class ViewComponent implements OnInit {

  view!: IView;
  loading = false;

  constructor(
    public _viewService: ViewService
  ) {}

  ngOnInit(): void {
    this._viewService.getView.subscribe(
      v => {
        this.view = v;
      }
    )
  }

}
