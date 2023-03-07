import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ILinkSideBar } from '@erp-core/interfaces/links.interface';

@Component({
  selector: 'erp-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [ 
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('opacityTranslateX', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({  transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('opacityInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SideBarComponent {

  isOffCanvasMenu = false;
  isOffCanvasMenuDialog = false;

  links: Array<ILinkSideBar>;

  constructor() {
    this.links = [
      {
        name: 'Empleados',
        icon: 'fa-solid fa-people-group',
        route: ['rh', 'employee', '1']
      },
      {
        name: 'Clientes',
        icon: 'fa-solid fa-briefcase',
        route: ['sales', 'client', '1']
      },
      {
        name: 'Productos',
        icon: 'fa-solid fa-tag',
        route: ['sales', 'products', '1']
      },
      {
        name: 'Ordenes',
        icon: 'fa-solid fa-boxes-stacked',
        route: ['cs', 'orders', '1']
      }
    ];
  }


  toggleOffCanvasMenu(){
    this.isOffCanvasMenu = !this.isOffCanvasMenu;
    
    if (this.isOffCanvasMenuDialog){
      setTimeout(() => {
        this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
      },400)
    } else {
      this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
    }
  }

}
