import { Component, OnInit } from '@angular/core';
import { ILinkSideBar } from '@erp-core/interfaces/links.interface';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  links: Array<ILinkSideBar> = []

  constructor() { }

  ngOnInit(): void {
    this.links = [
      {
        name: 'Empleados',
        icon: 'fa-solid fa-people-group',
        router: ['rh', 'employee', '1']
      },
      {
        name: 'Clientes',
        icon: 'fa-solid fa-briefcase',
        router: ['sales', 'clients', '1']
      },
      {
        name: 'Productos',
        icon: 'fa-solid fa-tag',
        router: ['sales', 'products', '1']
      },
      {
        name: 'Ordenes',
        icon: 'fa-solid fa-boxes-stacked',
        router: ['cs', 'orders', '1']
      }
    ];
  }

}
