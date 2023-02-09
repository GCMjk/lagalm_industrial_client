import { Component, OnInit } from '@angular/core';
import { ILinkSideBar } from '@erp-core/interfaces/links.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<ILinkSideBar>, 
    accessLink: Array<ILinkSideBar> 
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<ILinkSideBar> = []

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Dashboard',
        icon: 'flaticon-dashboard',
        router: ['../app', 'home']
      },
      {
        name: 'Mi Perfil',
        icon: 'flaticon-profile-1',
        router: ['../app', 'my-profile', '1']
      },
      {
        name: 'Configuración',
        icon: 'flaticon2-gear',
        router: ['../app', 'config']
      }
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Empleados',
        icon: 'flaticon-network',
        router: ['rh', 'employees', '1']
      },
      {
        name: 'Clientes',
        icon: 'flaticon-diagram',
        router: ['sales', 'clients', '1']
      },
      {
        name: 'Productos',
        icon: 'flaticon-interface-9',
        router: ['sales', 'products', '1']
      },
      {
        name: 'Ordenes',
        icon: 'flaticon-truck',
        router: ['cs', 'orders', '1']
      }
    ];

    this.customOptions = [
      {
        name: '',
        router: ['/']
      }
    ]
  }

}
